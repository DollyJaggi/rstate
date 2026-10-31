import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HiPhone, HiMail, HiLocationMarker } from 'react-icons/hi'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { getSettings, onSettingsChange } from '../../services/siteSettings'

const iconMap = { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn }

export default function Footer() {
  const [site, setSite] = useState(getSettings())
  useEffect(() => onSettingsChange(s => setSite(s)), [])

  const {
    brandName = 'Rstate',
    tagline = '',
    contactPhone = '',
    contactEmail = '',
    contactAddress = '',
    copyright = '© 2026 Rstate. All rights reserved.',
    socialLinks = [],
  } = site

  return (
    <footer className="bg-dark-900 dark:bg-dark-950 text-dark-300 border-t border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">{brandName?.[0] || 'R'}</span>
              </div>
              <span className="text-xl font-bold text-white">{brandName}</span>
            </Link>
            <p className="text-sm text-dark-400 mb-4">{tagline}</p>
            <div className="flex gap-3">
              {socialLinks.map(s => {
                const Icon = iconMap[s.icon]
                return (
                  <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 bg-dark-800 rounded-lg flex items-center justify-center text-dark-400 hover:bg-primary-600 hover:text-white transition-colors">
                    {Icon ? <Icon /> : s.label}
                  </a>
                )
              })}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { name: 'Buy Property', path: '/properties?category=buy' },
                { name: 'Rent Property', path: '/properties?category=rent' },
                { name: 'Sell Property', path: '/add-property' },
                { name: 'PG / Hostel', path: '/properties?type=PG' },
                { name: 'Commercial', path: '/properties?type=Commercial' },
                { name: 'New Projects', path: '/projects' },
              ].map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm hover:text-primary-400 transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2.5">
              <li><Link to="/home-loan" className="text-sm hover:text-primary-400 transition-colors">Home Loan Calculator</Link></li>
              <li><Link to="/property-valuation" className="text-sm hover:text-primary-400 transition-colors">Property Valuation</Link></li>
              <li><Link to="/rental-agreement" className="text-sm hover:text-primary-400 transition-colors">Rental Agreement</Link></li>
              <li><Link to="/blog" className="text-sm hover:text-primary-400 transition-colors">Blog & News</Link></li>
              <li><Link to="/resources" className="text-sm hover:text-primary-400 transition-colors">Market Trends</Link></li>
              <li><Link to="/resources" className="text-sm hover:text-primary-400 transition-colors">Real Estate Guide</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <HiLocationMarker className="w-5 h-5 text-primary-400 mt-0.5 shrink-0" />
                <span className="text-sm">{contactAddress}</span>
              </div>
              <div className="flex items-center gap-3">
                <HiPhone className="w-5 h-5 text-primary-400 shrink-0" />
                <span className="text-sm">{contactPhone}</span>
              </div>
              <div className="flex items-center gap-3">
                <HiMail className="w-5 h-5 text-primary-400 shrink-0" />
                <span className="text-sm">{contactEmail}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-dark-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-dark-500">{copyright}</p>
          <div className="flex gap-6 text-sm text-dark-500">
            <Link to="/privacy" className="hover:text-primary-400">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary-400">Terms of Service</Link>
            <Link to="/sitemap" className="hover:text-primary-400">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
