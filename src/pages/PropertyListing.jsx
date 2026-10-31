import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { HiAdjustments, HiSearch, HiX, HiViewGrid, HiViewList } from 'react-icons/hi'
import { collection, getDocs } from 'firebase/firestore'
import PropertyCard from '../components/common/PropertyCard'
import BackButton from '../components/common/BackButton'
import { db } from '../services/firebase'
import { FIREBASE_COLLECTIONS } from '../utils/constants'
import { PROPERTY_TYPES, FURNISHING_TYPES, BHK_TYPES, ALL_CITIES, CITIES_BY_STATE, INDIAN_STATES, AMENITIES } from '../utils/constants'

const norm = (v) => (v ?? '').toString().trim().toLowerCase()

export default function PropertyListing() {
  const [searchParams] = useSearchParams()
  const [allProperties, setAllProperties] = useState([])
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState('grid')
  const [filters, setFilters] = useState({
    search: '', state: '', city: '', type: '', category: '', status: '',
    minPrice: '', maxPrice: '', bedrooms: '', furnishing: '', listingType: '', amenities: [],
  })

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      setLoading(true)
      try {
        const snapshot = await getDocs(collection(db, FIREBASE_COLLECTIONS.PROPERTIES))
        if (!cancelled) {
          const list = snapshot.docs.map(d => ({
            id: d.id,
            ...d.data(),
            createdAt: d.data().createdAt?.toDate?.() || null,
          }))
          list.sort((a, b) => (b.createdAt?.getTime?.() || 0) - (a.createdAt?.getTime?.() || 0))
          setAllProperties(list)
        }
      } catch (error) {
        console.error('Error loading properties:', error)
        if (!cancelled) setAllProperties([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    const tag = searchParams.get('tag') || ''
    const tagType = { commercial: 'Commercial' }[tag] || ''
    const tagStatus = { 'ready-to-move': 'ready_to_move', 'under-construction': 'under_construction' }[tag] || ''
    setFilters({
      search: searchParams.get('search') || '',
      state: searchParams.get('state') || '',
      city: searchParams.get('city') || '',
      type: searchParams.get('type') || tagType,
      category: searchParams.get('category') || '',
      status: searchParams.get('status') || tagStatus,
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      bedrooms: searchParams.get('bedrooms') || '',
      furnishing: searchParams.get('furnishing') || '',
      listingType: searchParams.get('listingType') || '',
      amenities: searchParams.get('amenities')?.split(',').filter(Boolean) || [],
    })
  }, [searchParams])

  const applyFilters = () => {
    let filtered = [...allProperties]

    if (filters.search) {
      const s = norm(filters.search)
      filtered = filtered.filter(p =>
        [p.title, p.city, p.locality, p.state, p.description, p.propertyType]
          .some(v => norm(v).includes(s))
      )
    }
    if (filters.state) {
      const s = norm(filters.state)
      filtered = filtered.filter(p => norm(p.state).includes(s))
    }
    if (filters.city) {
      const c = norm(filters.city)
      filtered = filtered.filter(p => norm(p.city).includes(c))
    }
    if (filters.type) filtered = filtered.filter(p => norm(p.propertyType) === norm(filters.type))
    if (filters.category) filtered = filtered.filter(p => norm(p.category) === norm(filters.category))
    if (filters.status) filtered = filtered.filter(p => norm(p.status) === norm(filters.status))
    if (filters.bedrooms) filtered = filtered.filter(p => Number(p.bedrooms) === parseInt(filters.bedrooms))
    if (filters.furnishing) filtered = filtered.filter(p => norm(p.furnishing) === norm(filters.furnishing))
    if (filters.listingType) filtered = filtered.filter(p => norm(p.listingType) === norm(filters.listingType))
    if (filters.minPrice) filtered = filtered.filter(p => Number(p.price) >= Number(filters.minPrice))
    if (filters.maxPrice) filtered = filtered.filter(p => Number(p.price) <= Number(filters.maxPrice))
    if (filters.amenities.length > 0) {
      filtered = filtered.filter(p => filters.amenities.every(a => (p.amenities || []).includes(a)))
    }

    setProperties(filtered)
  }

  useEffect(() => { applyFilters() }, [filters, allProperties])

  const clearFilters = () => {
    setFilters({
      search: '', state: '', city: '', type: '', category: '', status: '', minPrice: '', maxPrice: '',
      bedrooms: '', furnishing: '', listingType: '', amenities: [],
    })
    setProperties(allProperties)
  }

  const toggleAmenity = (amenity) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity],
    }))
  }

  return (
    <div className="min-h-screen bg-dark-50 dark:bg-dark-900/50">
      {/* Header */}
      <div className="bg-white dark:bg-dark-800 border-b border-dark-100 dark:border-dark-700 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <BackButton className="mb-4" />
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400 w-5 h-5" />
                <input type="text" value={filters.search} onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  placeholder="Search by location, property, or keyword..."
                  className="input-field pl-10" />
              </div>
            </div>
            <div className="relative min-w-[180px]">
              <input type="text" value={filters.state} onChange={(e) => setFilters(prev => ({ ...prev, state: e.target.value, city: '' }))}
                placeholder="All States" list="state-list" className="input-field w-full" />
              <datalist id="state-list">
                {INDIAN_STATES.map(s => <option key={s} value={s} />)}
              </datalist>
            </div>
            <div className="relative min-w-[180px]">
              <input type="text" value={filters.city} onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
                placeholder="All Cities" list="city-list" className="input-field w-full" />
              <datalist id="city-list">
                {(filters.state
                  ? CITIES_BY_STATE.find(s => norm(s.state) === norm(filters.state))?.cities || ALL_CITIES
                  : ALL_CITIES
                ).map(c => <option key={c} value={c} />)}
              </datalist>
            </div>
            <select value={filters.type} onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
              className="input-field w-auto min-w-[130px]">
              <option value="">All Types</option>
              {Object.values(PROPERTY_TYPES).map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            {(!filters.type || ['Flat', 'Villa', 'Hostel', 'PG'].includes(filters.type)) && (
              <select value={filters.bedrooms} onChange={(e) => setFilters(prev => ({ ...prev, bedrooms: e.target.value }))}
                className="input-field w-auto min-w-[100px]">
                <option value="">BHK</option>
                {BHK_TYPES.map(b => <option key={b} value={b.split(' ')[0]}>{b}</option>)}
              </select>
            )}
            <button onClick={() => setShowFilters(!showFilters)}
              className={`btn-secondary flex items-center gap-2 ${showFilters ? 'ring-2 ring-primary-500' : ''}`}>
              <HiAdjustments className="w-5 h-5" /> Filters
            </button>
            <div className="hidden sm:flex border border-dark-200 dark:border-dark-700 rounded-lg overflow-hidden">
              <button onClick={() => setViewMode('grid')} className={`p-2.5 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'hover:bg-dark-50 dark:hover:bg-dark-700'}`}>
                <HiViewGrid className="w-4 h-4" />
              </button>
              <button onClick={() => setViewMode('list')} className={`p-2.5 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'hover:bg-dark-50 dark:hover:bg-dark-700'}`}>
                <HiViewList className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-dark-100 dark:border-dark-700 animate-slide-down">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <div>
                  <label className="text-xs font-medium text-dark-500 block mb-1">Min Price</label>
                  <input type="number" value={filters.minPrice} onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                    placeholder="Min ₹" className="input-field text-sm" />
                </div>
                <div>
                  <label className="text-xs font-medium text-dark-500 block mb-1">Max Price</label>
                  <input type="number" value={filters.maxPrice} onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                    placeholder="Max ₹" className="input-field text-sm" />
                </div>
                <div>
                  <label className="text-xs font-medium text-dark-500 block mb-1">Furnishing</label>
                  <select value={filters.furnishing} onChange={(e) => setFilters(prev => ({ ...prev, furnishing: e.target.value }))}
                    className="input-field text-sm">
                    <option value="">Any</option>
                    {Object.values(FURNISHING_TYPES).map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-dark-500 block mb-1">Listing By</label>
                  <select value={filters.listingType} onChange={(e) => setFilters(prev => ({ ...prev, listingType: e.target.value }))}
                    className="input-field text-sm">
                    <option value="">All</option>
                    <option value="owner">Owner</option>
                    <option value="broker">Broker</option>
                    <option value="builder">Builder</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-dark-500 block mb-1">Category</label>
                  <select value={filters.category} onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                    className="input-field text-sm">
                    <option value="">All</option>
                    <option value="buy">Buy</option>
                    <option value="rent">Rent</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="text-xs font-medium text-dark-500 block mb-2">Amenities</label>
                <div className="flex flex-wrap gap-2">
                  {AMENITIES.slice(0, 15).map(a => (
                    <button key={a} onClick={() => toggleAmenity(a)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                        filters.amenities.includes(a)
                          ? 'bg-primary-600 text-white border-primary-600'
                          : 'border-dark-200 dark:border-dark-700 hover:border-primary-400'
                      }`}>
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button onClick={clearFilters} className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1">
                  <HiX className="w-4 h-4" /> Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-dark-500">
            <span className="font-semibold text-dark-900 dark:text-dark-50">{properties.length}</span> properties found
          </p>
          <div className="flex gap-2">
            {filters.city && <span className="badge-primary flex items-center gap-1">{filters.city} <button onClick={() => setFilters(prev => ({ ...prev, city: '' }))}><HiX className="w-3 h-3" /></button></span>}
            {filters.type && <span className="badge-primary flex items-center gap-1">{filters.type} <button onClick={() => setFilters(prev => ({ ...prev, type: '' }))}><HiX className="w-3 h-3" /></button></span>}
            {filters.bedrooms && <span className="badge-primary flex items-center gap-1">{filters.bedrooms} BHK <button onClick={() => setFilters(prev => ({ ...prev, bedrooms: '' }))}><HiX className="w-3 h-3" /></button></span>}
          </div>
        </div>

        {loading ? (
          <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card overflow-hidden">
                <div className="skeleton h-48 w-full" />
                <div className="p-5 space-y-3">
                  <div className="skeleton h-4 w-3/4 rounded" />
                  <div className="skeleton h-3 w-1/2 rounded" />
                  <div className="skeleton h-5 w-1/3 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : properties.length > 0 ? (
          <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
            {properties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <span className="text-6xl block mb-4">🏠</span>
            <h3 className="text-xl font-semibold mb-2">No properties found</h3>
            <p className="text-dark-500 mb-6">Try adjusting your filters or search criteria</p>
            <button onClick={clearFilters} className="btn-primary">Clear Filters</button>
          </div>
        )}
      </div>
    </div>
  )
}
