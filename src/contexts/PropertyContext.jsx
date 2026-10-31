import { createContext, useContext, useState, useCallback } from 'react'
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  serverTimestamp,
  increment,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { db, storage } from '../services/firebase'
import { FIREBASE_COLLECTIONS } from '../utils/constants'
import toast from 'react-hot-toast'

const PropertyContext = createContext()

export function PropertyProvider({ children }) {
  const [properties, setProperties] = useState([])
  const [featuredProperties, setFeaturedProperties] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const [lastDoc, setLastDoc] = useState(null)
  const [filters, setFilters] = useState({
    type: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    furnishing: '',
    city: '',
    locality: '',
    listingType: '',
    status: '',
    sortBy: 'newest',
    search: '',
  })

  const PROPERTIES_PER_PAGE = 12

  const fetchProperties = useCallback(async (reset = true) => {
    setLoading(true)
    try {
      let constraints = [orderBy('createdAt', 'desc')]

      if (filters.type) constraints.push(where('propertyType', '==', filters.type))
      if (filters.city) constraints.push(where('city', '==', filters.city))
      if (filters.furnishing) constraints.push(where('furnishing', '==', filters.furnishing))
      if (filters.listingType) constraints.push(where('listingType', '==', filters.listingType))
      if (filters.status) constraints.push(where('status', '==', filters.status))
      if (filters.bedrooms) {
        const bhk = parseInt(filters.bedrooms)
        constraints.push(where('bedrooms', '==', bhk))
      }
      if (filters.category) constraints.push(where('category', '==', filters.category))

      constraints.push(limit(PROPERTIES_PER_PAGE))

      if (!reset && lastDoc) {
        constraints.push(startAfter(lastDoc))
      }

      const q = query(collection(db, FIREBASE_COLLECTIONS.PROPERTIES), ...constraints)
      const snapshot = await getDocs(q)

      const propertiesList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
      }))

      if (reset) {
        setProperties(propertiesList)
      } else {
        setProperties(prev => [...prev, ...propertiesList])
      }

      setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null)
      setTotalCount(snapshot.size)
    } catch (error) {
      console.error('Error fetching properties:', error)
      toast.error('Failed to load properties')
    } finally {
      setLoading(false)
    }
  }, [filters, lastDoc])

  const fetchFeaturedProperties = useCallback(async () => {
    try {
      const q = query(
        collection(db, FIREBASE_COLLECTIONS.PROPERTIES),
        where('isFeatured', '==', true),
        limit(6)
      )
      const snapshot = await getDocs(q)
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
      if (list.length > 0) setFeaturedProperties(list)
    } catch (error) {
      // Collection may not exist yet - using sample data fallback
    }
  }, [])

  const fetchPropertyById = async (propertyId) => {
    try {
      const docRef = doc(db, FIREBASE_COLLECTIONS.PROPERTIES, propertyId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        await updateDoc(docRef, { views: increment(1) })
        return { id: docSnap.id, ...docSnap.data() }
      }
      return null
    } catch (error) {
      console.error('Error fetching property:', error)
      return null
    }
  }

  const addProperty = async (propertyData, images = []) => {
    setLoading(true)
    try {
      const docRef = await addDoc(collection(db, FIREBASE_COLLECTIONS.PROPERTIES), {
        ...propertyData,
        images: [],
        videos: [],
        brochures: [],
        views: 0,
        leads: 0,
        saves: 0,
        isFeatured: false,
        isVerified: false,
        isActive: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })

      if (images.length > 0) {
        try {
          const imageUrls = []
          for (const image of images) {
            const imageRef = ref(storage, `properties/${docRef.id}_${Date.now()}_${image.name}`)
            await uploadBytes(imageRef, image)
            imageUrls.push(await getDownloadURL(imageRef))
          }
          await updateDoc(docRef, { images: imageUrls })
        } catch (uploadErr) {
          console.error('Image upload failed:', uploadErr)
          toast('Listing saved, but photo upload failed', { icon: '⚠️' })
        }
      }

      toast.success('Property listed successfully!')
      return { id: docRef.id, ...propertyData }
    } catch (error) {
      console.error('Error adding property:', error)
      toast.error(error?.code === 'permission-denied'
        ? 'Permission denied — make sure you are logged in and Firestore rules are deployed'
        : 'Failed to list property')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const updateProperty = async (propertyId, data) => {
    try {
      await updateDoc(doc(db, FIREBASE_COLLECTIONS.PROPERTIES, propertyId), {
        ...data,
        updatedAt: serverTimestamp(),
      })
      toast.success('Property updated successfully!')
    } catch (error) {
      toast.error('Failed to update property')
      throw error
    }
  }

  const deleteProperty = async (propertyId) => {
    try {
      await deleteDoc(doc(db, FIREBASE_COLLECTIONS.PROPERTIES, propertyId))
      setProperties(prev => prev.filter(p => p.id !== propertyId))
      toast.success('Property deleted')
    } catch (error) {
      toast.error('Failed to delete property')
    }
  }

  const toggleSaveProperty = async (userId, propertyId, isSaved) => {
    try {
      const userRef = doc(db, FIREBASE_COLLECTIONS.USERS, userId)
      if (isSaved) {
        await updateDoc(userRef, { savedProperties: arrayRemove(propertyId) })
        try {
          await updateDoc(doc(db, FIREBASE_COLLECTIONS.PROPERTIES, propertyId), { saves: increment(-1) })
        } catch (_) { /* property may be sample data */ }
      } else {
        await updateDoc(userRef, { savedProperties: arrayUnion(propertyId) })
        try {
          await updateDoc(doc(db, FIREBASE_COLLECTIONS.PROPERTIES, propertyId), { saves: increment(1) })
        } catch (_) { /* property may be sample data */ }
      }
    } catch (error) {
      console.error('Error toggling save:', error)
    }
  }

  const searchProperties = async (searchTerm) => {
    if (!searchTerm.trim()) {
      fetchProperties(true)
      return
    }
    setLoading(true)
    try {
      const searchLower = searchTerm.toLowerCase()
      const q = query(
        collection(db, FIREBASE_COLLECTIONS.PROPERTIES),
        orderBy('createdAt', 'desc'),
        limit(20)
      )
      const snapshot = await getDocs(q)
      const results = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(p =>
          p.title?.toLowerCase().includes(searchLower) ||
          p.city?.toLowerCase().includes(searchLower) ||
          p.locality?.toLowerCase().includes(searchLower) ||
          p.description?.toLowerCase().includes(searchLower) ||
          p.propertyType?.toLowerCase().includes(searchLower)
        )
      setProperties(results)
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const resetFilters = () => {
    setFilters({
      type: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      furnishing: '',
      city: '',
      locality: '',
      listingType: '',
      status: '',
      sortBy: 'newest',
      search: '',
    })
  }

  const value = {
    properties,
    featuredProperties,
    loading,
    totalCount,
    filters,
    fetchProperties,
    fetchFeaturedProperties,
    fetchPropertyById,
    addProperty,
    updateProperty,
    deleteProperty,
    toggleSaveProperty,
    searchProperties,
    updateFilters,
    resetFilters,
    setLoading,
  }

  return <PropertyContext.Provider value={value}>{children}</PropertyContext.Provider>
}

export const useProperties = () => {
  const context = useContext(PropertyContext)
  if (!context) throw new Error('useProperties must be used within PropertyProvider')
  return context
}
