import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HiUserGroup, HiPhotograph, HiChartBar, HiPlus, HiEye, HiChevronRight } from 'react-icons/hi'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { useAuth } from '../../contexts/AuthContext'
import { useChat } from '../../contexts/ChatContext'
import { db } from '../../services/firebase'
import { FIREBASE_COLLECTIONS, PROPERTY_STATUS } from '../../utils/constants'
import { loadProperties } from '../../services/propertyStore'

export default function BrokerDashboard() {
  const { userProfile } = useAuth()
  const { chats } = useChat()
  const [listings, setListings] = useState([])
  const [clientCount, setClientCount] = useState(0)

  useEffect(() => {
    if (!userProfile?.id) return
    let cancelled = false
    const load = async () => {
      try {
        const snap = await getDocs(query(collection(db, FIREBASE_COLLECTIONS.PROPERTIES), where('ownerId', '==', userProfile.id)))
        if (!cancelled) setListings(snap.docs.map(d => ({ id: d.id, ...d.data() })))
      } catch (e) {
        console.error('Error loading broker listings:', e)
        if (!cancelled) setListings(loadProperties().filter(p => p.listingType === 'broker'))
      }
      try {
        const snap = await getDocs(query(collection(db, FIREBASE_COLLECTIONS.CLIENTS), where('brokerId', '==', userProfile.id)))
        if (!cancelled) setClientCount(snap.docs.length)
      } catch (e) {
        console.error('Error loading broker clients:', e)
      }
    }
    load()
    return () => { cancelled = true }
  }, [userProfile?.id])

  const totalClients = clientCount + chats.length
  const activeListings = listings.filter(p => p.status !== PROPERTY_STATUS.SOLD && p.isActive !== false).length
  const totalViews = listings.reduce((s, p) => s + (p.views || 0), 0)

  const stats = [
    { icon: HiUserGroup, label: 'Total Clients', value: totalClients, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20', path: '/dashboard/broker/clients' },
    { icon: HiPhotograph, label: 'Active Listings', value: activeListings, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20', path: '/dashboard/seller' },
    { icon: HiEye, label: 'Total Views', value: totalViews.toLocaleString('en-IN'), color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/20', path: '/dashboard/seller' },
  ]

  return (
    <div className="min-h-screen bg-dark-50 dark:bg-dark-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold font-heading">Broker Dashboard</h1>
            <p className="text-dark-500">Manage clients, listings, and commissions</p>
          </div>
          <Link to="/add-property" className="btn-primary flex items-center gap-2">
            <HiPlus className="w-5 h-5" /> Add Listing
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map(stat => (
            <Link key={stat.label} to={stat.path} title={`Go to ${stat.label}`}
              className="card-hover p-5 block cursor-pointer group">
              <div className="flex items-start justify-between">
                <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center mb-3`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <HiChevronRight className="w-5 h-5 text-dark-300 group-hover:text-primary-600 transition-colors" />
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-dark-500">{stat.label}</div>
            </Link>
          ))}
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Add Listing', icon: HiPlus, path: '/add-property' },
                { label: 'My Listings', icon: HiPhotograph, path: '/dashboard/seller' },
                { label: 'Browse Properties', icon: HiChartBar, path: '/properties' },
                { label: 'Projects', icon: HiUserGroup, path: '/projects' },
              ].map(action => (
                <Link key={action.label} to={action.path}
                  className="flex items-center gap-3 p-4 rounded-xl border border-dark-200 dark:border-dark-700 hover:bg-dark-50 dark:hover:bg-dark-700 transition-colors">
                  <action.icon className="w-6 h-6 text-primary-600" />
                  <span className="font-medium text-sm">{action.label}</span>
                </Link>
              ))}
            </div>
          </div>
      </div>
    </div>
  )
}
