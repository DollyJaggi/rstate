import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { HiX, HiTrash } from 'react-icons/hi'
import { doc, getDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore'
import toast from 'react-hot-toast'
import { useAuth } from '../contexts/AuthContext'
import { db } from '../services/firebase'
import { FIREBASE_COLLECTIONS } from '../utils/constants'
import { loadProperties, updateProperty as saveToStore, deleteProperty as deleteFromStore } from '../services/propertyStore'
import BackButton from '../components/common/BackButton'
import { PROPERTY_TYPES, FURNISHING_TYPES, FACING_TYPES, ALL_CITIES, CITIES_BY_STATE, INDIAN_STATES } from '../utils/constants'

export default function EditProperty() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { userProfile } = useAuth()
  const [loading, setLoading] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [inFirebase, setInFirebase] = useState(false)

  const [form, setForm] = useState({
    title: '', description: '', price: '', propertyType: '', category: 'buy',
    bedrooms: '', bathrooms: '', area: '', furnishing: '', parking: '',
    facing: '', floor: '', totalFloors: '', age: '', city: '', state: '',
    locality: '', pincode: '', ownerName: '', ownerPhone: '',
  })

  useEffect(() => {
    const fillForm = (property) => {
      setForm({
        title: property.title || '',
        description: property.description || '',
        price: property.price?.toString() || '',
        propertyType: property.propertyType || '',
        category: property.category || 'buy',
        bedrooms: property.bedrooms?.toString() || '',
        bathrooms: property.bathrooms?.toString() || '',
        area: property.area?.toString() || '',
        furnishing: property.furnishing || '',
        parking: property.parking?.toString() || '',
        facing: property.facing || '',
        floor: property.floor?.toString() || '',
        totalFloors: property.totalFloors?.toString() || '',
        age: property.age || '',
        city: property.city || '',
        state: property.state || '',
        locality: property.locality || '',
        pincode: property.pincode || '',
        ownerName: property.ownerName || '',
        ownerPhone: property.ownerPhone || '',
      })
    }

    const load = async () => {
      try {
        const docSnap = await getDoc(doc(db, FIREBASE_COLLECTIONS.PROPERTIES, id))
        if (docSnap.exists()) {
          setInFirebase(true)
          fillForm(docSnap.data())
          return
        }
      } catch (e) {
        console.error('Firebase fetch failed:', e)
      }
      const property = loadProperties().find(p => p.id === id)
      if (property) {
        setInFirebase(false)
        fillForm(property)
      } else {
        setNotFound(true)
      }
    }
    load()
  }, [id])

  const dashPath = userProfile?.role === 'super_admin' ? '/dashboard/admin' : `/dashboard/${userProfile?.role || 'seller'}`

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const data = {
      ...form,
      price: Number(form.price) || 0,
      bedrooms: Number(form.bedrooms) || 0,
      bathrooms: Number(form.bathrooms) || 0,
      area: Number(form.area) || 0,
      parking: Number(form.parking) || 0,
      floor: Number(form.floor) || 0,
      totalFloors: Number(form.totalFloors) || 0,
    }
    try {
      if (inFirebase) {
        await updateDoc(doc(db, FIREBASE_COLLECTIONS.PROPERTIES, id), {
          ...data,
          updatedAt: serverTimestamp(),
        })
      } else {
        saveToStore(id, data)
      }
      toast.success('Property updated!')
    } catch (err) {
      console.error('Save error:', err)
      toast.error(err?.code === 'permission-denied' ? 'Permission denied — deploy Firestore rules' : 'Save failed')
    }
    setLoading(false)
    navigate(dashPath, { replace: true })
  }

  const handleDelete = async () => {
    if (!window.confirm('Delete this property permanently?')) return
    try {
      if (inFirebase) {
        await deleteDoc(doc(db, FIREBASE_COLLECTIONS.PROPERTIES, id))
      } else {
        deleteFromStore(id)
      }
      toast.success('Property deleted')
    } catch (err) {
      console.error('Delete error:', err)
      toast.error('Delete failed')
    }
    navigate(dashPath, { replace: true })
  }

  if (notFound) return <div className="text-center py-20"><p>Property not found</p></div>

  return (
    <div className="min-h-screen bg-dark-50 dark:bg-dark-900/50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton className="mb-4" />
        <div className="flex items-start justify-between mb-6">
          <h1 className="text-2xl font-bold font-heading">Edit Property</h1>
          <div className="flex items-center gap-2">
            <button onClick={handleDelete} className="btn-secondary text-sm px-3 py-2 flex items-center gap-1.5 text-red-600">
              <HiTrash className="w-4 h-4" /> Delete
            </button>
            <button onClick={() => navigate(dashPath, { replace: true })} className="p-2 hover:bg-dark-100 dark:hover:bg-dark-700 rounded-lg text-dark-400 hover:text-dark-600">
              <HiX className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1.5">Title</label>
              <input type="text" value={form.title} onChange={(e) => setForm(p => ({ ...p, title: e.target.value }))} className="input-field" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Price (₹)</label>
                <input type="number" value={form.price} onChange={(e) => setForm(p => ({ ...p, price: e.target.value }))} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Type</label>
                <select value={form.propertyType} onChange={(e) => setForm(p => ({ ...p, propertyType: e.target.value }))} className="input-field">
                  {Object.values(PROPERTY_TYPES).map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {['Flat', 'Villa', 'Hostel', 'PG'].includes(form.propertyType) && (
                <><div><label className="block text-sm font-medium mb-1.5">Bedrooms</label><input type="number" value={form.bedrooms} onChange={(e) => setForm(p => ({ ...p, bedrooms: e.target.value }))} className="input-field" /></div>
                <div><label className="block text-sm font-medium mb-1.5">Bathrooms</label><input type="number" value={form.bathrooms} onChange={(e) => setForm(p => ({ ...p, bathrooms: e.target.value }))} className="input-field" /></div></>
              )}
              <div><label className="block text-sm font-medium mb-1.5">Area (sq.ft)</label><input type="number" value={form.area} onChange={(e) => setForm(p => ({ ...p, area: e.target.value }))} className="input-field" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium mb-1.5">City</label>
                <input type="text" value={form.city} onChange={(e) => setForm(p => ({ ...p, city: e.target.value }))} list="editCities" className="input-field" placeholder="Search or type city" />
                <datalist id="editCities">{ALL_CITIES.map(c => <option key={c} value={c} />)}</datalist>
              </div>
              <div><label className="block text-sm font-medium mb-1.5">Locality</label><input type="text" value={form.locality} onChange={(e) => setForm(p => ({ ...p, locality: e.target.value }))} className="input-field" /></div>
            </div>
            <div className="flex gap-4 pt-4">
              <button type="submit" disabled={loading} className="btn-primary">{loading ? 'Saving...' : 'Save Changes'}</button>
              <button type="button" onClick={() => navigate(dashPath, { replace: true })} className="btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
