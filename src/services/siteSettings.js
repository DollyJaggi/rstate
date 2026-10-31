const STORAGE_KEY = 'rstate_settings'

const defaultSettings = {
  brandName: 'Rstate',
  tagline: "India's most trusted real estate platform. Find your perfect home with AI-powered search and verified listings.",
  description: 'A modern real estate platform connecting buyers, sellers, brokers and builders with AI-powered search and verified listings.',
  contactPhone: '1800-123-4567',
  contactEmail: 'support@rstate.in',
  contactAddress: '91 Springboard, Sector 1, Noida, Uttar Pradesh 201301',
  copyright: '© 2026 Rstate. All rights reserved.',
  socialLinks: [
    { label: 'FB', name: 'Facebook', url: 'https://facebook.com/rstate', icon: 'FaFacebookF' },
    { label: 'TW', name: 'Twitter', url: 'https://twitter.com/rstate', icon: 'FaTwitter' },
    { label: 'IG', name: 'Instagram', url: 'https://instagram.com/rstate', icon: 'FaInstagram' },
    { label: 'LN', name: 'LinkedIn', url: 'https://linkedin.com/company/rstate', icon: 'FaLinkedinIn' },
  ],
}

let settings = loadSettings()

function loadSettings() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      return { ...defaultSettings, ...parsed, socialLinks: parsed.socialLinks || defaultSettings.socialLinks }
    }
  } catch (e) {
    console.warn('localStorage read error:', e)
  }
  return { ...defaultSettings, socialLinks: defaultSettings.socialLinks.map(l => ({ ...l })) }
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  } catch (e) {
    console.warn('localStorage write error:', e)
  }
}

const listeners = new Set()

export function getSettings() {
  return settings
}

export function updateSettings(patch) {
  settings = { ...settings, ...patch, socialLinks: (patch.socialLinks || settings.socialLinks) }
  persist()
  listeners.forEach(fn => fn(settings))
}

export function updateSocialLinks(links) {
  updateSettings({ socialLinks: links })
}

export function resetSettings() {
  settings = { ...defaultSettings, socialLinks: defaultSettings.socialLinks.map(l => ({ ...l })) }
  persist()
  listeners.forEach(fn => fn(settings))
}

export function onSettingsChange(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}