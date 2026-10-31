import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore'
import { db } from './firebase'
import { FIREBASE_COLLECTIONS } from '../utils/constants'

export const aiService = {
  getRecommendations: async (userPreferences) => {
    const { budget, preferredCities, propertyType, bedrooms } = userPreferences
    try {
      let constraints = [orderBy('views', 'desc'), limit(10)]

      if (budget?.max) constraints.push(where('price', '<=', budget.max))
      if (budget?.min) constraints.push(where('price', '>=', budget.min))
      if (propertyType) constraints.push(where('propertyType', '==', propertyType))
      if (bedrooms) constraints.push(where('bedrooms', '==', bedrooms))
      if (preferredCities?.length > 0) constraints.push(where('city', 'in', preferredCities.slice(0, 10)))

      const q = query(collection(db, FIREBASE_COLLECTIONS.PROPERTIES), ...constraints)
      const snapshot = await getDocs(q)
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    } catch (error) {
      console.error('AI recommendations error:', error)
      return []
    }
  },

  estimatePrice: (property) => {
    const baseRate = {
      Flat: 5000,
      Villa: 8000,
      Plot: 3000,
      Commercial: 12000,
      Office: 9000,
      Shop: 7000,
      PG: 4000,
      Rent: 30,
      Hostel: 3500,
    }

    const cityMultiplier = {
      Mumbai: 2.5, Delhi: 2.2, Bangalore: 2.0, Hyderabad: 1.5,
      Pune: 1.4, Chennai: 1.3, Kolkata: 1.1, Ahmedabad: 1.0,
    }

    const rate = baseRate[property.propertyType] || 5000
    const multiplier = cityMultiplier[property.city] || 1.0
    const bhkFactor = 1 + ((property.bedrooms || 1) - 1) * 0.15
    const area = property.area || 1000
    let estimatedPrice = rate * area * multiplier * bhkFactor

    if (property.category === 'rent') {
      estimatedPrice = estimatedPrice / 300
    }

    return Math.round(estimatedPrice / 100000) * 100000
  },

  detectFraud: (property) => {
    const flags = []

    if (!property.ownerPhone || property.ownerPhone.length < 10) {
      flags.push({ severity: 'high', reason: 'Invalid or missing phone number' })
    }

    const pricePerSqft = property.area ? property.price / property.area : 0
    if (pricePerSqft < 500 || pricePerSqft > 100000) {
      flags.push({ severity: 'medium', reason: 'Price per sq.ft seems unusual' })
    }

    if (property.description && property.description.length < 20) {
      flags.push({ severity: 'low', reason: 'Very short property description' })
    }

    const phonePattern = /^(\+91)?[6-9]\d{9}$/
    if (property.ownerPhone && !phonePattern.test(property.ownerPhone.replace(/\s/g, ''))) {
      flags.push({ severity: 'high', reason: 'Suspicious phone number format' })
    }

    if ((property.images?.length || 0) === 0) {
      flags.push({ severity: 'medium', reason: 'No images uploaded' })
    }

    return {
      score: flags.length === 0 ? 100 : Math.max(0, 100 - flags.length * 25),
      flags,
      isFraudulent: flags.some(f => f.severity === 'high'),
      needsReview: flags.length >= 2,
    }
  },

  rankLeads: (leads) => {
    return leads
      .map(lead => {
        let score = 50

        if (lead.budget && lead.budget > 10000000) score += 20
        if (lead.lookingFor === 'buy') score += 15
        if (lead.urgent) score += 10
        if (lead.phone) score += 5
        if (lead.email) score += 5
        if (lead.message && lead.message.length > 50) score += 5
        if (lead.preferredLocations?.length > 0) score += 5
        if (lead.timeline === 'immediate') score += 10
        if (lead.timeline === '1-3 months') score += 5

        return { ...lead, score, tier: score >= 75 ? 'Hot' : score >= 50 ? 'Warm' : 'Cold' }
      })
      .sort((a, b) => b.score - a.score)
  },

  getSimilarProperties: (property, allProperties, maxResults = 4) => {
    return allProperties
      .filter(p => p.id !== property.id)
      .map(p => {
        let score = 0
        if (p.city === property.city) score += 30
        if (p.propertyType === property.propertyType) score += 25
        if (p.bedrooms === property.bedrooms) score += 20
        if (p.category === property.category) score += 15
        if (p.furnishing === property.furnishing) score += 10

        const priceDiff = Math.abs(p.price - property.price) / property.price
        if (priceDiff < 0.2) score += 20
        else if (priceDiff < 0.5) score += 10

        return { ...p, similarityScore: score }
      })
      .sort((a, b) => b.similarityScore - a.similarityScore)
      .slice(0, maxResults)
  },

  locationScore: (city, locality) => {
    const scores = {
      'Mumbai': { base: 8.5, localities: { 'Andheri West': 8.0, 'Bandra': 9.5, 'Powai': 8.5 } },
      'Bangalore': { base: 8.0, localities: { 'Whitefield': 7.5, 'Koramangala': 9.0, 'Indiranagar': 8.5 } },
      'Delhi': { base: 8.0, localities: { 'Connaught Place': 9.0, 'Dwarka': 7.5, 'Rohini': 7.0 } },
      'Hyderabad': { base: 7.5, localities: { 'Gachibowli': 8.5, 'Hitech City': 8.0, 'Banjara Hills': 9.0 } },
    }

    const cityData = scores[city]
    if (!cityData) return { score: 6.0, rating: 'Average' }

    const localityScore = cityData.localities?.[locality] || cityData.base
    const rating = localityScore >= 8.5 ? 'Excellent' : localityScore >= 7.5 ? 'Good' : localityScore >= 6.5 ? 'Average' : 'Fair'

    return { score: localityScore, rating }
  },
}
