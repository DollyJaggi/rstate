import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { HiArrowLeft, HiHeart, HiShare, HiPhone, HiCalendar, HiLocationMarker, HiCheck, HiShieldCheck, HiPhotograph, HiVideoCamera, HiX } from 'react-icons/hi'
import { IoBedOutline, IoWaterOutline } from 'react-icons/io5'
import { TbRulerMeasure } from 'react-icons/tb'
import { collection, doc, getDoc, getDocs, limit, query, where, updateDoc, increment } from 'firebase/firestore'
import toast from 'react-hot-toast'
import PropertyCard from '../components/common/PropertyCard'
import { db } from '../services/firebase'
import { FIREBASE_COLLECTIONS } from '../utils/constants'
import { trackView, toggleSave as trackSave, trackVisit, isSaved } from '../services/userActivityStore'
import { syncViewed, syncVisit } from '../services/activitySync'
import { useAuth } from '../contexts/AuthContext'
import { useProperties } from '../contexts/PropertyContext'
import { formatPrice, formatArea, formatDate, calculateEMI, getPropertyTypeIcon } from '../utils/helpers'
import { AMENITIES } from '../utils/constants'

export default function PropertyDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, userProfile, fetchUserProfile } = useAuth()
  const { toggleSaveProperty } = useProperties()
  const [property, setProperty] = useState(null)
  const [similarProperties, setSimilarProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [activeImage, setActiveImage] = useState(0)
  const [showContact, setShowContact] = useState(false)
  const [saved, setSaved] = useState(isSaved(id) || userProfile?.savedProperties?.includes(id) || false)
  const [sidebarVisible, setSidebarVisible] = useState(true)
  const [showEmi, setShowEmi] = useState(false)
  const [emiParams, setEmiParams] = useState({ rate: 8.5, tenure: 20 })
  const [emiResult, setEmiResult] = useState(0)
  const [showVisit, setShowVisit] = useState(false)
  const [visitDate, setVisitDate] = useState('')
  const [visitTime, setVisitTime] = useState('')

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      setLoading(true)
      setNotFound(false)
      try {
        const docRef = doc(db, FIREBASE_COLLECTIONS.PROPERTIES, id)
        const docSnap = await getDoc(docRef)
        if (!docSnap.exists()) {
          if (!cancelled) setNotFound(true)
          return
        }
        const data = { id: docSnap.id, ...docSnap.data(), createdAt: docSnap.data().createdAt?.toDate?.() || null }
        updateDoc(docRef, { views: increment(1) }).catch(() => {})
        trackView(id)
        if (user) syncViewed(user.uid, id)
        if (!cancelled) {
          setProperty(data)
          const q = query(collection(db, FIREBASE_COLLECTIONS.PROPERTIES), where('city', '==', data.city), limit(4))
          const snap = await getDocs(q)
          if (!cancelled) {
            setSimilarProperties(
              snap.docs.filter(d => d.id !== id).slice(0, 3).map(d => ({ id: d.id, ...d.data() }))
            )
          }
        }
      } catch (error) {
        console.error('Error loading property:', error)
        if (!cancelled) setNotFound(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [id])

  const bumpLeads = () => {
    updateDoc(doc(db, FIREBASE_COLLECTIONS.PROPERTIES, id), { leads: increment(1) }).catch(() => {})
  }

  useEffect(() => {
    if (showEmi && property?.price) {
      setEmiResult(calculateEMI(property.price * 0.8, emiParams.rate, emiParams.tenure))
    }
  }, [showEmi, emiParams, property?.price])

  const handleContact = () => {
    if (!user) return toast.error('Please login to contact owner')
    setShowContact(true)
    bumpLeads()
  }

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href)
    toast.success('Link copied!')
  }

  const handleSave = async () => {
    if (!user) return toast.error('Please login to save properties')
    const wasSaved = saved
    setSaved(!wasSaved)
    try {
      await toggleSaveProperty(user.uid, id, wasSaved)
      trackSave(id)
      if (fetchUserProfile) await fetchUserProfile(user.uid)
      toast.success(!wasSaved ? 'Property saved!' : 'Removed from saved')
    } catch (e) {
      console.error('Save toggle failed:', e)
      setSaved(wasSaved)
      toast.error('Could not update saved properties')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="skeleton h-12 w-full rounded-none" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="skeleton h-[300px] md:h-[450px] w-full rounded-xl" />
            <div className="card p-6 space-y-4">
              <div className="skeleton h-7 w-2/3 rounded" />
              <div className="skeleton h-4 w-1/2 rounded" />
              <div className="skeleton h-24 w-full rounded" />
            </div>
          </div>
          <div className="space-y-6">
            <div className="card p-6 space-y-4">
              <div className="skeleton h-12 w-full rounded" />
              <div className="skeleton h-12 w-full rounded" />
              <div className="skeleton h-12 w-full rounded" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (notFound || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <span className="text-6xl block mb-4">🏠</span>
          <h2 className="text-xl font-semibold mb-2">Property not found</h2>
          <p className="text-dark-500 mb-6">This listing may have been removed or is unavailable.</p>
          <Link to="/properties" className="btn-primary">Browse Properties</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-dark-50 dark:bg-dark-900/50 border-b border-dark-100 dark:border-dark-700">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-dark-500">
            <button onClick={() => navigate(-1)} className="p-1 hover:bg-dark-100 dark:hover:bg-dark-700 rounded-lg">
              <HiArrowLeft className="w-4 h-4" />
            </button>
            <Link to="/" className="hover:text-primary-600">Home</Link>
            <span>/</span>
            <Link to="/properties" className="hover:text-primary-600">Properties</Link>
            <span>/</span>
            <span className="text-dark-900 dark:text-dark-50 truncate max-w-[200px] sm:max-w-xs">{property.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="card overflow-hidden">
              <div className="relative h-[150px] md:h-[225px] bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 flex items-center justify-center">
                <span className="text-8xl opacity-50">{getPropertyTypeIcon(property.propertyType)}</span>
                <div className="absolute top-4 left-4 flex gap-2">
                  {property.isFeatured && <span className="px-3 py-1 bg-yellow-500 text-white rounded-lg text-sm font-medium">Featured</span>}
                  {property.isVerified && <span className="px-3 py-1 bg-green-500 text-white rounded-lg text-sm font-medium flex items-center gap-1"><HiShieldCheck /> Verified</span>}
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <button onClick={handleShare} className="p-2.5 bg-white/90 dark:bg-dark-800/90 rounded-full hover:bg-white transition-colors">
                    <HiShare className="w-5 h-5" />
                  </button>
                  <button onClick={handleSave} className={`p-2.5 bg-white/90 dark:bg-dark-800/90 rounded-full hover:bg-white transition-colors ${saved ? 'text-red-500' : ''}`}>
                    <HiHeart className={`w-5 h-5 ${saved ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Property Info */}
            <div className="card p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-2xl font-bold font-heading mb-1">
                    {property.title || `${property.bedrooms ? property.bedrooms + ' BHK ' : ''}${property.propertyType} in ${property.locality}`}
                  </h1>
                  <p className="text-dark-500 flex items-center gap-1">
                    <HiLocationMarker className="w-4 h-4" /> {property.locality}, {property.city}, {property.state}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary-600">{formatPrice(property.price)}</div>
                  {property.category === 'rent' && <span className="text-sm text-dark-500">per month</span>}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 py-4 border-y border-dark-100 dark:border-dark-700 mb-4">
                {property.bedrooms > 0 && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-dark-50 dark:bg-dark-800 rounded-lg">
                    <IoBedOutline className="w-5 h-5 text-primary-600" />
                    <div><div className="font-semibold text-sm">{property.bedrooms}</div><div className="text-xs text-dark-500">Beds</div></div>
                  </div>
                )}
                {property.bathrooms > 0 && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-dark-50 dark:bg-dark-800 rounded-lg">
                    <IoWaterOutline className="w-5 h-5 text-primary-600" />
                    <div><div className="font-semibold text-sm">{property.bathrooms}</div><div className="text-xs text-dark-500">Baths</div></div>
                  </div>
                )}
                {property.area > 0 && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-dark-50 dark:bg-dark-800 rounded-lg">
                    <TbRulerMeasure className="w-5 h-5 text-primary-600" />
                    <div><div className="font-semibold text-sm">{formatArea(property.area)}</div><div className="text-xs text-dark-500">Area</div></div>
                  </div>
                )}
                <div className="flex items-center gap-2 px-3 py-2 bg-dark-50 dark:bg-dark-800 rounded-lg">
                  <span className="text-primary-600">📐</span>
                  <div><div className="font-semibold text-sm">{property.furnishing}</div><div className="text-xs text-dark-500">Furnishing</div></div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {property.facing && <InfoItem label="Facing" value={property.facing} />}
                <InfoItem label="Floor" value={`${property.floor || 'Ground'} of ${property.totalFloors || 'N/A'}`} />
                <InfoItem label="Age" value={property.age || 'New'} />
                <InfoItem label="Parking" value={`${property.parking || 0} spots`} />
                <InfoItem label="Type" value={property.propertyType} />
                <InfoItem label="Status" value={property.category === 'rent' ? 'Rental' : 'Sale'} />
                <InfoItem label="Posted" value={formatDate(property.createdAt)} />
                <InfoItem label="Views" value={`${property.views || 0}`} />
              </div>

              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-dark-600 dark:text-dark-400 leading-relaxed">{property.description}</p>
              </div>
            </div>

            {/* Amenities */}
            <div className="card p-6">
              <h3 className="font-semibold mb-4">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {(property.amenities?.length > 0 ? property.amenities : AMENITIES.slice(0, 8)).map(amenity => (
                  <div key={amenity} className="flex items-center gap-2 text-sm">
                    <HiCheck className="w-4 h-4 text-green-500 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* EMI Calculator */}
            <div className="card p-6">
              <button onClick={() => setShowEmi(!showEmi)} className="flex items-center justify-between w-full">
                <h3 className="font-semibold">EMI Calculator</h3>
                <span className="text-primary-600 text-sm">{showEmi ? 'Hide' : 'Calculate EMI'}</span>
              </button>
              {showEmi && (
                <div className="mt-4 space-y-4 animate-slide-down">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-dark-500 block mb-1">Loan Amount: ₹{(property.price * 0.8).toLocaleString('en-IN')}</label>
                      <input type="range" min={1} max={20} value={emiParams.rate}
                        onChange={(e) => setEmiParams(p => ({ ...p, rate: e.target.value }))} className="w-full" />
                      <span className="text-xs text-dark-500">Rate: {emiParams.rate}%</span>
                    </div>
                    <div>
                      <label className="text-sm text-dark-500 block mb-1">Tenure: {emiParams.tenure} years</label>
                      <input type="range" min={5} max={30} value={emiParams.tenure}
                        onChange={(e) => setEmiParams(p => ({ ...p, tenure: e.target.value }))} className="w-full" />
                    </div>
                  </div>
                  <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg text-center">
                    <div className="text-sm text-dark-500">Monthly EMI</div>
                    <div className="text-3xl font-bold text-primary-600">{formatPrice(emiResult)}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Similar Properties */}
            {similarProperties.length > 0 && (
              <div>
                <h3 className="font-semibold mb-4">Similar Properties in {property.city}</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {similarProperties.map(p => (
                    <PropertyCard key={p.id} property={p} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {!sidebarVisible && (
              <button onClick={() => setSidebarVisible(true)} className="card p-4 w-full text-center text-sm text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 font-medium transition-colors">
                Show Owner Card
              </button>
            )}
            {/* Owner Card */}
            <div className={`card p-6 ${sidebarVisible ? '' : 'hidden'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-xl font-bold text-primary-600">
                    {property.ownerName?.[0] || 'O'}
                  </div>
                  <div>
                    <div className="font-semibold">{property.ownerName || 'Property Owner'}</div>
                    <div className="text-xs text-dark-500 capitalize">{property.listingType}</div>
                  </div>
                </div>
                <button onClick={() => setSidebarVisible(false)} className="p-1.5 hover:bg-dark-100 dark:hover:bg-dark-700 rounded-lg text-dark-400 hover:text-dark-600">
                  <HiX className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                {showContact ? (
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-center relative">
                    <button onClick={() => setShowContact(false)} className="absolute top-1 right-1 p-1 hover:bg-green-100 dark:hover:bg-green-800 rounded">
                      <HiX className="w-4 h-4 text-green-600" />
                    </button>
                    <div className="text-lg font-bold text-green-600">{property.ownerPhone}</div>
                    <div className="text-xs text-green-600 mt-1">✓ Phone number revealed</div>
                  </div>
                ) : (
                  <button onClick={handleContact} className="btn-primary w-full flex items-center justify-center gap-2">
                    <HiPhone className="w-5 h-5" /> Show Contact
                  </button>
                )}

                <button onClick={() => { setShowVisit(true) }}
                  className="btn-secondary w-full flex items-center justify-center gap-2">
                  <HiCalendar className="w-5 h-5" /> Schedule Visit
                </button>
              </div>

              <div className="mt-4 pt-4 border-t border-dark-100 dark:border-dark-700">
                <div className="flex items-center gap-2 text-sm text-dark-500">
                  <HiShieldCheck className="w-4 h-4 text-green-500" />
                  {property.isVerified ? 'Verified Listing' : 'Verification Pending'}
                </div>
                <div className="text-xs text-dark-400 mt-1">
                  Property ID: RST-{property.id?.toString().padStart(6, '0') || '000001'}
                </div>
                <div className="text-xs text-dark-400 mt-1">
                  Views: {property.views || 0} | Saves: {property.saves || 0}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="card p-4">
              <h4 className="font-semibold text-sm mb-3">Need Help?</h4>
              <div className="space-y-2 text-sm">
                <Link to="/home-loan" className="block p-2 hover:bg-dark-50 dark:hover:bg-dark-700 rounded-lg">🏦 Home Loan</Link>
                <Link to="/property-valuation" className="block p-2 hover:bg-dark-50 dark:hover:bg-dark-700 rounded-lg">📊 Property Valuation</Link>
                <Link to="/rental-agreement" className="block p-2 hover:bg-dark-50 dark:hover:bg-dark-700 rounded-lg">📝 Rental Agreement</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Visit Modal */}
      {showVisit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowVisit(false)}>
          <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-2xl w-full max-w-md animate-slide-down" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-dark-100 dark:border-dark-700">
              <div>
                <h3 className="text-lg font-bold font-heading">Schedule Visit</h3>
                <p className="text-xs text-dark-500">{property.title || `${property.bedrooms} BHK ${property.propertyType}`}</p>
              </div>
              <button onClick={() => setShowVisit(false)} className="p-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-700 text-dark-400">
                <HiX className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Preferred Date</label>
                <input type="date" value={visitDate} onChange={(e) => setVisitDate(e.target.value)} min={new Date().toISOString().split('T')[0]} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Preferred Time</label>
                <input type="time" value={visitTime} onChange={(e) => setVisitTime(e.target.value)} className="input-field" />
              </div>
              <button disabled={!visitDate || !visitTime} onClick={() => {
                setShowVisit(false)
                setVisitDate('')
                setVisitTime('')
                toast.success(`Visit scheduled for ${new Date(visitDate).toLocaleDateString('en-IN')} at ${visitTime}`)
                bumpLeads()
                trackVisit(id)
                if (user) syncVisit(user.uid, id)
              }}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed">
                Confirm Visit
              </button>
              <button onClick={() => setShowVisit(false)} className="w-full py-2 text-sm text-dark-500 hover:text-dark-700 dark:hover:text-dark-300 transition-colors">
                ← Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function InfoItem({ label, value }) {
  return (
    <div className="text-sm">
      <div className="text-dark-500">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  )
}
