import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HiPlus, HiEye, HiChartBar, HiStar, HiPhotograph, HiTrash } from 'react-icons/hi'
import { collection, query, where, getDocs, addDoc, doc, deleteDoc, serverTimestamp } from 'firebase/firestore'
import { formatPrice } from '../../utils/helpers'
import { useAuth } from '../../contexts/AuthContext'
import { db } from '../../services/firebase'
import { FIREBASE_COLLECTIONS } from '../../utils/constants'
import { loadProperties, deleteProperty as deleteFromStore } from '../../services/propertyStore'
import BackButton from '../../components/common/BackButton'
import toast from 'react-hot-toast'

export default function SellerDashboard() {
  const { userProfile } = useAuth()
  const [listings, setListings] = useState([])

  useEffect(() => {
    if (!userProfile?.id) return
    let cancelled = false
    const load = async () => {
      try {
        // migrate locally-saved properties (created before Firebase sync) into Firestore
        const localProps = loadProperties().filter(p => !p.ownerId)
        for (const p of localProps) {
          const { id, ...data } = p
          try {
            await addDoc(collection(db, FIREBASE_COLLECTIONS.PROPERTIES), {
              ...data,
              ownerId: userProfile.id,
              isActive: true,
              createdAt: p.createdAt ? new Date(p.createdAt) : new Date(),
              updatedAt: serverTimestamp(),
            })
            deleteFromStore(id)
          } catch (e) {
            console.error('Failed to migrate local property:', e)
          }
        }

        const q = query(collection(db, FIREBASE_COLLECTIONS.PROPERTIES), where('ownerId', '==', userProfile.id))
        const snapshot = await getDocs(q)
        if (!cancelled) {
          setListings(snapshot.docs.map(d => ({ id: d.id, ...d.data() })))
        }
      } catch (e) {
        console.error('Error loading listings:', e)
        if (!cancelled) setListings(loadProperties().filter(p => p.listingType === 'owner'))
      }
    }
    load()
    return () => { cancelled = true }
  }, [userProfile?.id])

  const totalViews = listings.reduce((s, p) => s + (p.views || 0), 0)
  const totalLeads = listings.reduce((s, p) => s + (p.leads || 0), 0)
  const inquiries = listings.filter(p => (p.leads || 0) > 0).length

  const stats = [
    { icon: HiPhotograph, label: 'Total Listings', value: listings.length, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { icon: HiEye, label: 'Total Views', value: totalViews.toLocaleString('en-IN'), color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
    { icon: HiStar, label: 'Leads Received', value: totalLeads, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
    { icon: HiChartBar, label: 'Inquiries', value: inquiries, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20' },
  ]

  return (
    <div className="min-h-screen bg-dark-50 dark:bg-dark-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BackButton className="mb-4" />
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold font-heading">Seller Dashboard</h1>
            <p className="text-dark-500">Manage your property listings</p>
          </div>
          <Link to="/add-property" className="btn-primary flex items-center gap-2">
            <HiPlus className="w-5 h-5" /> Add Property
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map(stat => (
            <div key={stat.label} className="card p-5">
              <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center mb-3`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-dark-500">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">My Listings</h2>
            <Link to="/add-property" className="text-sm text-primary-600 font-medium">+ Add New</Link>
          </div>
          {listings.length > 0 ? (
            <div className="space-y-3">
              {listings.map(p => (
                <div key={p.id} className="flex items-center gap-4 p-4 bg-dark-50 dark:bg-dark-800 rounded-xl group">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-2xl">🏠</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm">{p.title || `${p.bedrooms} BHK ${p.propertyType}`}</h3>
                    <p className="text-xs text-dark-500">{p.locality}, {p.city}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-dark-500">
                      <span>{formatPrice(p.price)}</span>
                      <span>{p.views || 0} views</span>
                      <span>{p.leads || 0} leads</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link to={`/edit-property/${p.id}`} className="px-3 py-1.5 text-xs bg-primary-600 text-white rounded-lg hover:bg-primary-700">Edit</Link>
                    <button onClick={async () => {
                      if (!window.confirm('Delete this listing?')) return
                      try {
                        await deleteDoc(doc(db, FIREBASE_COLLECTIONS.PROPERTIES, p.id))
                      } catch (e) {
                        console.error('Firebase delete failed:', e)
                        toast.error('Could not delete from Firebase')
                      }
                      deleteFromStore(p.id)
                      setListings(prev => prev.filter(x => x.id !== p.id))
                      toast.success('Listing deleted')
                    }}
                      className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                      <HiTrash className="w-4 h-4" />
                    </button>
                    <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${p.isVerified ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'}`}>
                      {p.isVerified ? 'Verified' : 'Pending'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <span className="text-4xl block mb-3">📋</span>
              <h3 className="font-semibold mb-1">No listings yet</h3>
              <p className="text-dark-500 text-sm mb-4">Start by adding your first property</p>
              <Link to="/add-property" className="btn-primary">Add Property</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
