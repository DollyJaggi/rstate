import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HiHeart, HiEye, HiChat, HiCalendar, HiHome, HiSearch, HiStar } from 'react-icons/hi'
import { useAuth } from '../../contexts/AuthContext'
import BackButton from '../../components/common/BackButton'
import { fetchPropertiesByIds } from '../../services/firestoreProperties'
import { fetchUserActivity } from '../../services/activitySync'
import { getSavedIds, getViewedIds, getVisitCount } from '../../services/userActivityStore'
import { formatPrice } from '../../utils/helpers'

export default function BuyerDashboard() {
  const { user, userProfile } = useAuth()
  const [savedIds, setSavedIds] = useState([])
  const [viewedIds, setViewedIds] = useState([])
  const [savedProperties, setSavedProperties] = useState([])
  const [viewedProperties, setViewedProperties] = useState([])
  const [visitCount, setVisitCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) return
    // guest fallback: local device activity only
    const sIds = getSavedIds()
    const vIds = getViewedIds()
    setSavedIds(sIds)
    setViewedIds(vIds)
    setVisitCount(getVisitCount())
    let cancelled = false
    ;(async () => {
      try {
        const props = await fetchPropertiesByIds([...sIds, ...vIds])
        if (cancelled) return
        setSavedProperties(props.filter(p => sIds.includes(p.id)).slice(0, 4))
        setViewedProperties(props.filter(p => vIds.includes(p.id)))
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => { cancelled = true }
  }, [user])

  useEffect(() => {
    if (!user?.uid) return
    let cancelled = false
    const load = async () => {
      setLoading(true)
      try {
        // fresh read from Firestore so every device sees the same data
        const activity = await fetchUserActivity(user.uid)
        if (cancelled) return
        setSavedIds(activity.savedIds)
        setViewedIds(activity.viewedIds)
        setVisitCount(activity.visits.length)

        const props = await fetchPropertiesByIds([...activity.savedIds, ...activity.viewedIds])
        if (cancelled) return
        setSavedProperties(props.filter(p => activity.savedIds.includes(p.id)).slice(0, 4))
        setViewedProperties(props.filter(p => activity.viewedIds.includes(p.id)))
      } catch (e) {
        console.error('Error loading buyer data:', e)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [user?.uid])

  const stats = [
    { icon: HiHeart, label: 'Saved Properties', value: savedIds.length, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20', path: '/saved-properties' },
    { icon: HiEye, label: 'Viewed Properties', value: viewedIds.length, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20', path: '/properties' },
    { icon: HiCalendar, label: 'Visit Scheduled', value: visitCount, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20', path: '/properties' },
    { icon: HiChat, label: 'Active Chats', value: 0, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20', path: '/chat' },
  ]

  return (
    <div className="min-h-screen bg-dark-50 dark:bg-dark-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <BackButton className="mb-4" />
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold font-heading">Welcome back, {userProfile?.displayName || 'Buyer'}!</h1>
            <p className="text-dark-500">Here's your property overview</p>
          </div>
          <div className="flex gap-3">
            <Link to="/properties" className="btn-primary flex items-center gap-2">
              <HiSearch className="w-5 h-5" /> Browse Properties
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map(stat => (
            <Link key={stat.label} to={stat.path} className="card p-5 hover:shadow-md hover:bg-white dark:hover:bg-dark-800 transition-colors">
              <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center mb-3`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-dark-500">{stat.label}</div>
            </Link>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Saved Properties */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Saved Properties</h2>
              <Link to="/saved-properties" className="text-sm text-primary-600 hover:text-primary-700">View All</Link>
            </div>
            {savedProperties.length > 0 ? (
              <div className="space-y-3">
                {savedProperties.map(p => (
                  <Link key={p.id} to={`/property/${p.id}`} className="card p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="w-20 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 rounded-lg flex items-center justify-center shrink-0">
                      <span className="text-2xl">🏠</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm line-clamp-1">{p.title || `${p.bedrooms} BHK ${p.propertyType}`}</h3>
                      <p className="text-xs text-dark-500">{p.locality}, {p.city}</p>
                      <div className="text-sm font-semibold text-primary-600 mt-1">{formatPrice(p.price)}</div>
                    </div>
                    <HiHeart className="w-5 h-5 text-red-500 shrink-0" />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 card">
                <span className="text-4xl block mb-3">❤️</span>
                <h3 className="font-semibold mb-1">No saved properties</h3>
                <p className="text-dark-500 text-sm mb-4">Save properties you like to find them later</p>
                <Link to="/properties" className="btn-primary">Browse Properties</Link>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="card p-5">
              <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {viewedProperties.slice(0, 5).map(p => (
                  <div key={p.id} className="flex items-start gap-3 text-sm">
                    <div className="p-1.5 bg-dark-100 dark:bg-dark-700 rounded-full">
                      <HiEye className="w-3 h-3" />
                    </div>
                    <div>
                      <p className="text-dark-700 dark:text-dark-300">Viewed {p.title || `${p.bedrooms} BHK ${p.propertyType}`}</p>
                      <p className="text-xs text-dark-400">in {p.city}</p>
                    </div>
                  </div>
                ))}
                {savedIds.length > 0 && (
                  <div className="flex items-start gap-3 text-sm">
                    <div className="p-1.5 bg-dark-100 dark:bg-dark-700 rounded-full">
                      <HiHeart className="w-3 h-3" />
                    </div>
                    <div>
                      <p className="text-dark-700 dark:text-dark-300">{savedIds.length} properties saved</p>
                      <p className="text-xs text-dark-400">Bookmark your favorites</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Links */}
            <div className="card p-5">
              <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
              <div className="space-y-2">
                {[
                  { icon: HiHome, label: 'Home Loan Calculator', path: '/home-loan' },
                  { icon: HiStar, label: 'Property Valuation', path: '/property-valuation' },
                ].map(link => (
                  <Link key={link.label} to={link.path}
                    className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-dark-50 dark:hover:bg-dark-700 text-sm font-medium transition-colors">
                    <link.icon className="w-5 h-5 text-primary-600" /> {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
