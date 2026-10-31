import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { ROLES } from '../utils/constants'
import { storage } from '../services/firebase'
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import toast from 'react-hot-toast'
import { HiCamera, HiCheck, HiX } from 'react-icons/hi'
import BackButton from '../components/common/BackButton'

export default function Profile() {
  const { user, userProfile, updateUserProfile } = useAuth()
  const navigate = useNavigate()
  const fileInputRef = useRef()
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
    displayName: userProfile?.displayName || '',
    phone: userProfile?.phone || '',
    bio: userProfile?.bio || '',
  })
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  const handlePhotoClick = () => fileInputRef.current?.click()

  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) return toast.error('Photo must be under 2MB')
    if (!file.type.startsWith('image/')) return toast.error('Please select an image file')
    setUploading(true)
    try {
      const storagePath = storageRef(storage, `avatars/${user.uid}_${Date.now()}`)
      const uploadTask = uploadBytesResumable(storagePath, file)
      await new Promise((resolve, reject) => {
        uploadTask.on('state_changed', null, reject, resolve)
      })
      const photoURL = await getDownloadURL(uploadTask.snapshot.ref)
      await updateUserProfile({ photoURL })
      toast.success('Photo updated!')
    } catch (err) {
      toast.error('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await updateUserProfile(form)
      setSaved(true)
      toast.success('Profile updated!')
    } catch (error) {
      toast.error('Update failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-50 dark:bg-dark-900/50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton className="mb-4" />
        <h1 className="text-2xl font-bold font-heading mb-6">My Profile</h1>

        <div className="card p-8 relative">
          <button onClick={() => navigate('/')} className="absolute top-3 right-3 p-1.5 hover:bg-dark-100 dark:hover:bg-dark-700 rounded-lg text-dark-400 hover:text-dark-600 transition-colors">
            <HiX className="w-5 h-5" />
          </button>
          <div className="text-center mb-6">
            <div className="relative inline-block">
              {userProfile?.photoURL ? (
                <img src={userProfile.photoURL} alt="avatar" className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-white dark:border-dark-700 shadow-md" />
              ) : (
                <div className="w-24 h-24 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-3xl font-bold text-primary-600 mx-auto border-4 border-white dark:border-dark-700 shadow-md">
                  {userProfile?.displayName?.[0] || 'U'}
                </div>
              )}
              <button type="button" onClick={handlePhotoClick} disabled={uploading}
                className="absolute bottom-0 right-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center shadow-md hover:bg-primary-700 transition-colors disabled:opacity-50">
                <HiCamera className={`w-4 h-4 ${uploading ? 'animate-spin' : ''}`} />
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
            </div>
            <h2 className="text-xl font-bold mt-4">{userProfile?.displayName || 'User'}</h2>
            <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium capitalize mt-1">
              {userProfile?.role || 'buyer'}
            </span>
            {uploading && <p className="text-xs text-primary-600 mt-2">Uploading photo...</p>}
          </div>

          {saved ? (
            <div className="text-center py-8 animate-slide-down">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <HiCheck className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-bold mb-1">Profile Saved!</h2>
              <p className="text-dark-500 text-sm mb-6">Your changes have been saved successfully.</p>
              <div className="space-y-2 mb-6 text-left max-w-xs mx-auto">
                <div className="flex justify-between text-sm"><span className="text-dark-400">Name:</span><span className="font-medium">{form.displayName}</span></div>
                <div className="flex justify-between text-sm"><span className="text-dark-400">Phone:</span><span className="font-medium">{form.phone || '-'}</span></div>
                <div className="flex justify-between text-sm"><span className="text-dark-400">Role:</span><span className="font-medium capitalize">{userProfile?.role}</span></div>
              </div>

            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Full Name</label>
                <input type="text" value={form.displayName} onChange={(e) => setForm(p => ({ ...p, displayName: e.target.value }))} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Email</label>
                <input type="email" value={userProfile?.email || ''} disabled className="input-field opacity-60" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Phone</label>
                <input type="tel" value={form.phone} onChange={(e) => setForm(p => ({ ...p, phone: e.target.value }))} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Account Role</label>
                <select value={userProfile?.role || 'buyer'} onChange={(e) => updateUserProfile({ role: e.target.value }).then(() => toast.success('Role updated!')).catch(() => toast.error('Failed to update role'))}
                  className="input-field">
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                  <option value="broker">Broker</option>
                  <option value="builder">Builder</option>
                  <option value="super_admin">Super Admin</option>
                </select>
                <p className="text-xs text-dark-400 mt-1">Changing your role updates your dashboard access</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Bio</label>
                <textarea value={form.bio} onChange={(e) => setForm(p => ({ ...p, bio: e.target.value }))} rows={3} className="input-field resize-none" placeholder="Tell us about yourself..." />
              </div>
              <button type="submit" disabled={loading || uploading} className="btn-primary w-full">{loading ? 'Saving...' : 'Save Profile'}</button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
