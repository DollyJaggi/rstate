import { Link } from 'react-router-dom'
import { HiLocationMarker, HiHeart, HiShare, HiPhotograph, HiVideoCamera } from 'react-icons/hi'
import { IoBedOutline, IoWaterOutline } from 'react-icons/io5'
import { TbRulerMeasure } from 'react-icons/tb'
import { formatPrice, formatArea, getPropertyTypeIcon, formatRelativeTime } from '../../utils/helpers'
import { useAuth } from '../../contexts/AuthContext'
import { useProperties } from '../../contexts/PropertyContext'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function PropertyCard({ property }) {
  const { user, userProfile } = useAuth()
  const { toggleSaveProperty } = useProperties()
  const [isSaved, setIsSaved] = useState(
    userProfile?.savedProperties?.includes(property.id) || false
  )
  const [imgError, setImgError] = useState(false)

  const handleSave = (e) => {
    e.preventDefault()
    if (!user) { toast.error('Please login to save properties'); return }
    toggleSaveProperty(user.uid, property.id, isSaved)
    setIsSaved(!isSaved)
    toast.success(isSaved ? 'Removed from saved' : 'Property saved!')
  }

  const handleShare = (e) => {
    e.preventDefault()
    const url = window.location.origin + '/property/' + property.id
    if (navigator.share) {
      navigator.share({ title: property.title, url }).catch(() => {})
    } else {
      navigator.clipboard?.writeText(url)
      toast.success('Link copied!')
    }
  }

  return (
    <Link to={`/property/${property.id}`} className="card-hover overflow-hidden group">
      <div className="relative h-48 overflow-hidden">
        {property.images?.[0] && !imgError ? (
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 flex items-center justify-center">
            <span className="text-5xl">{getPropertyTypeIcon(property.propertyType)}</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        <div className="absolute top-3 left-3 flex gap-2">
          {property.isFeatured && (
            <span className="badge-warning text-xs px-2 py-0.5 bg-yellow-500 text-white">Featured</span>
          )}
          {property.isVerified && (
            <span className="badge-success text-xs px-2 py-0.5 bg-green-500 text-white">Verified</span>
          )}
          {property.isUrgent && (
            <span className="badge-danger text-xs px-2 py-0.5 bg-red-500 text-white">Urgent</span>
          )}
        </div>

        <div className="absolute top-3 right-3 flex gap-2">
          {property.images?.length > 1 && (
            <span className="bg-black/60 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
              <HiPhotograph className="w-3 h-3" /> {property.images.length}
            </span>
          )}
          {property.videos?.length > 0 && (
            <span className="bg-black/60 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
              <HiVideoCamera className="w-3 h-3" />
            </span>
          )}
        </div>

        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <span className="text-white font-bold text-lg">{formatPrice(property.price)}</span>
          <div className="flex gap-2">
            <button onClick={handleSave}
              className={`p-1.5 rounded-full transition-colors ${isSaved ? 'bg-red-500 text-white' : 'bg-white/80 text-dark-600 hover:bg-white'}`}>
              <HiHeart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
            <button onClick={handleShare}
              className="p-1.5 rounded-full bg-white/80 text-dark-600 hover:bg-white transition-colors">
              <HiShare className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-dark-900 dark:text-dark-50 mb-1 line-clamp-1">
          {property.title || `${property.bedrooms ? property.bedrooms + ' BHK ' : ''}${property.propertyType} in ${property.locality || ''}`}
        </h3>
        <p className="text-sm text-dark-500 flex items-center gap-1 mb-3">
          <HiLocationMarker className="w-4 h-4 shrink-0" />
          <span className="line-clamp-1">{property.locality}, {property.city}</span>
        </p>

        <div className="flex items-center gap-4 text-sm text-dark-600 dark:text-dark-400 mb-3">
          {property.bedrooms && (
            <span className="flex items-center gap-1"><IoBedOutline className="w-4 h-4" /> {property.bedrooms} Beds</span>
          )}
          {property.bathrooms && (
            <span className="flex items-center gap-1"><IoWaterOutline className="w-4 h-4" /> {property.bathrooms} Baths</span>
          )}
          {property.area && (
            <span className="flex items-center gap-1"><TbRulerMeasure className="w-4 h-4" /> {formatArea(property.area)}</span>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-dark-100 dark:border-dark-700">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-xs font-medium text-primary-700 dark:text-primary-300">
              {property.ownerName?.[0] || 'O'}
            </div>
            <span className="text-xs text-dark-500">{property.listingType === 'owner' ? 'Owner' : property.listingType === 'broker' ? 'Broker' : 'Builder'}</span>
          </div>
          <span className="text-xs text-dark-400">{formatRelativeTime(property.createdAt)}</span>
        </div>
      </div>
    </Link>
  )
}
