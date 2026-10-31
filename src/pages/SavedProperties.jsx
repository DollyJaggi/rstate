import { useState, useEffect } from 'react'
import PropertyCard from '../components/common/PropertyCard'
import BackButton from '../components/common/BackButton'
import { fetchPropertiesByIds } from '../services/firestoreProperties'
import { fetchUserActivity } from '../services/activitySync'
import { getSavedIds } from '../services/userActivityStore'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { HiHeart } from 'react-icons/hi'

export default function SavedProperties() {
  const { user } = useAuth()
  const [saved, setSaved] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      setLoading(true)
      try {
        const savedIds = user?.uid
          ? (await fetchUserActivity(user.uid)).savedIds
          : getSavedIds()
        const props = await fetchPropertiesByIds(savedIds)
        if (!cancelled) setSaved(props)
      } catch (e) {
        console.error('Error loading saved properties:', e)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [user?.uid])

  return (
    <div className="min-h-screen bg-dark-50 dark:bg-dark-900/50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton className="mb-4" />
        <h1 className="text-2xl font-bold font-heading mb-6">Saved Properties</h1>
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="card overflow-hidden">
                <div className="skeleton h-48 w-full" />
                <div className="p-5 space-y-3">
                  <div className="skeleton h-4 w-3/4 rounded" />
                  <div className="skeleton h-3 w-1/2 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : saved.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {saved.map(p => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <HiHeart className="w-16 h-16 text-dark-300 mx-auto mb-4" />
            <h2 className="text-lg font-semibold mb-2">No saved properties</h2>
            <p className="text-dark-500 mb-4">Save properties you like by clicking the heart icon</p>
            <Link to="/properties" className="btn-primary">Browse Properties</Link>
          </div>
        )}
      </div>
    </div>
  )
}
