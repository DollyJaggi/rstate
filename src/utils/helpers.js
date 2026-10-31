import { CURRENCY_SYMBOL } from './constants'

export const formatPrice = (price) => {
  if (!price) return `${CURRENCY_SYMBOL}0`
  if (price >= 10000000) {
    return `${CURRENCY_SYMBOL}${(price / 10000000).toFixed(2)} Cr`
  }
  if (price >= 100000) {
    return `${CURRENCY_SYMBOL}${(price / 100000).toFixed(2)} L`
  }
  if (price >= 1000) {
    return `${CURRENCY_SYMBOL}${(price / 1000).toFixed(1)}K`
  }
  return `${CURRENCY_SYMBOL}${price.toLocaleString('en-IN')}`
}

export const formatArea = (area) => {
  return `${area.toLocaleString('en-IN')} sq.ft`
}

export const formatDate = (timestamp) => {
  if (!timestamp) return ''
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export const formatRelativeTime = (timestamp) => {
  if (!timestamp) return ''
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  const now = new Date()
  const diff = now - date
  const mins = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins} min ago`
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`
  if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`
  return formatDate(timestamp)
}

export const generateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const getPropertyTypeIcon = (type) => {
  const icons = {
    Flat: '🏢',
    Villa: '🏡',
    Plot: '🗺️',
    Commercial: '🏬',
    Office: '🏢',
    Shop: '🏪',
    PG: '🏠',
    Rent: '🔑',
    Hostel: '🏨',
  }
  return icons[type] || '🏠'
}

export const calculateEMI = (principal, rate, tenure) => {
  const monthlyRate = rate / (12 * 100)
  const months = tenure * 12
  const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1)
  return Math.round(emi)
}

export const validatePhone = (phone) => {
  return /^[6-9]\d{9}$/.test(phone)
}

export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export const getInitials = (name) => {
  if (!name) return 'U'
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export const truncateText = (text, length = 100) => {
  if (!text || text.length <= length) return text
  return text.slice(0, length) + '...'
}

export const debounce = (func, wait) => {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export const getIndianPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)
}

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}
