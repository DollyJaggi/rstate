import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HiSearch, HiLocationMarker, HiChevronRight, HiShieldCheck, HiLightningBolt, HiChartBar, HiCurrencyRupee } from 'react-icons/hi'
import { motion } from 'framer-motion'
import PropertyCard from '../components/common/PropertyCard'
import { PROPERTY_TYPES } from '../utils/constants'
import { sampleProperties, bannerSlides, CITIES_BY_STATE } from '../data/sampleProperties'
import { useProperties } from '../contexts/PropertyContext'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6 },
}

export default function Home() {
  const { featuredProperties, fetchFeaturedProperties } = useProperties()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [searchQuery, setSearchQuery] = useState({ city: '', type: '', budget: '' })
  const navigate = useNavigate()

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchQuery.city) params.set('city', searchQuery.city)
    if (searchQuery.type) params.set('type', searchQuery.type)
    if (searchQuery.budget) {
      const [min, max] = searchQuery.budget.split('-')
      if (min) params.set('minPrice', min)
      if (max) params.set('maxPrice', max)
    }
    navigate(`/properties?${params.toString()}`)
  }

  useEffect(() => {
    fetchFeaturedProperties()
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % bannerSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [fetchFeaturedProperties])

  const displayProperties = featuredProperties

  const stats = [
    { icon: HiShieldCheck, label: 'Verified Properties', value: '50K+' },
    { icon: HiLightningBolt, label: 'Monthly Visitors', value: '2M+' },
    { icon: HiChartBar, label: 'Cities Covered', value: '500+' },
    { icon: HiCurrencyRupee, label: 'Properties Sold', value: '15K+' },
  ]

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {bannerSlides.map((slide, index) => (
          <div key={slide.id} className={`absolute inset-0 bg-gradient-to-r ${slide.bg} transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`} />
        ))}
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading text-white mb-4 leading-tight">
              {bannerSlides[currentSlide].title}
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8">
              {bannerSlides[currentSlide].subtitle}
            </p>

            {/* Search Bar */}
            <div className="bg-white dark:bg-dark-800 rounded-2xl p-3 shadow-2xl max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="relative">
                  <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400 w-5 h-5" />
                  <input type="text" value={searchQuery.city} onChange={(e) => setSearchQuery(prev => ({ ...prev, city: e.target.value }))}
                    placeholder="All Cities" list="home-cities" className="input-field pl-10" />
                  <datalist id="home-cities">{CITIES_BY_STATE.flatMap(s => s.cities.map(c => <option key={c.name} value={c.name} />))}</datalist>
                </div>
                <select value={searchQuery.type} onChange={(e) => setSearchQuery(prev => ({ ...prev, type: e.target.value }))}
                  className="input-field cursor-pointer">
                  <option value="">Property Type</option>
                  {Object.values(PROPERTY_TYPES).map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <select value={searchQuery.budget} onChange={(e) => setSearchQuery(prev => ({ ...prev, budget: e.target.value }))}
                  className="input-field cursor-pointer">
                  <option value="">Budget</option>
                  <option value="0-2500000">&lt; ₹25 Lakhs</option>
                  <option value="2500000-7500000">₹25L - ₹75L</option>
                  <option value="7500000-15000000">₹75L - ₹1.5Cr</option>
                  <option value="15000000-50000000">₹1.5Cr - ₹5Cr</option>
                  <option value="50000000+">₹5Cr+</option>
                </select>
                <button onClick={handleSearch} className="btn-primary flex items-center justify-center gap-2">
                  <HiSearch className="w-5 h-5" /> Search
                </button>
              </div>
            </div>

            {/* Quick Tags */}
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {['Ready to Move', 'Under Construction', 'Luxury', 'New Projects', 'Commercial'].map(tag => (
                <Link key={tag} to={`/properties?tag=${tag.toLowerCase().replace(/\s+/g, '-')}`}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm backdrop-blur-sm transition-colors">
                  {tag}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-dark-50 dark:bg-dark-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} {...fadeUp} transition={{ delay: i * 0.1, duration: 0.6 }}
                className="text-center p-6">
                <stat.icon className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                <div className="text-2xl md:text-3xl font-bold font-heading text-dark-900 dark:text-dark-50">{stat.value}</div>
                <div className="text-sm text-dark-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="flex items-center justify-between mb-8">
            <div>
              <h2 className="section-title">Featured Properties</h2>
              <p className="text-dark-500 mt-1">Handpicked premium properties for you</p>
            </div>
            <Link to="/properties" className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
              View All <HiChevronRight />
            </Link>
          </motion.div>
          {displayProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayProperties.map((property, i) => (
                <motion.div key={property.id} {...fadeUp} transition={{ delay: i * 0.1, duration: 0.6 }}>
                  <PropertyCard property={property} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-dark-500 text-lg">No featured properties available at the moment.</p>
              <Link to="/properties" className="btn-primary mt-4 inline-block">Browse All Properties</Link>
            </div>
          )}
        </div>
      </section>

      {/* Property Types */}
      <section className="py-16 bg-dark-50 dark:bg-dark-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-10">
            <h2 className="section-title">Browse by Property Type</h2>
            <p className="text-dark-500 mt-2">Find properties that match your needs</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {[
              { name: 'Flats', icon: '🏢', count: '25K+', path: '/properties?type=Flat' },
              { name: 'Villas', icon: '🏡', count: '8K+', path: '/properties?type=Villa' },
              { name: 'Plots', icon: '🗺️', count: '12K+', path: '/properties?type=Plot' },
              { name: 'Commercial', icon: '🏬', count: '6K+', path: '/properties?type=Commercial' },
              { name: 'PG/Hostel', icon: '🏠', count: '4K+', path: '/properties?type=PG' },
              { name: 'Rentals', icon: '🔑', count: '15K+', path: '/properties?category=rent' },
              { name: 'Office', icon: '🏢', count: '3K+', path: '/properties?type=Office' },
              { name: 'Shop', icon: '🏪', count: '2K+', path: '/properties?type=Shop' },
            ].map((type, i) => (
              <motion.div key={type.name} {...fadeUp} transition={{ delay: i * 0.05, duration: 0.6 }}>
                <Link to={type.path} className="card-hover p-4 text-center block">
                  <span className="text-3xl block mb-2">{type.icon}</span>
                  <div className="font-semibold text-sm">{type.name}</div>
                  <div className="text-xs text-dark-500">{type.count}</div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-10">
            <h2 className="section-title">Popular Cities</h2>
            <p className="text-dark-500 mt-2">Explore properties in top Indian cities</p>
          </motion.div>
          <div className="space-y-10">
            {CITIES_BY_STATE.map((group, gi) => (
              <div key={group.state}>
                <h3 className="text-lg font-semibold text-dark-800 dark:text-dark-200 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-primary-500 rounded-full"></span>
                  {group.state}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {group.cities.map((city, i) => (
                    <motion.div key={city.name} {...fadeUp} transition={{ delay: i * 0.08 + gi * 0.1, duration: 0.6 }}>
                      <Link to={`/properties?city=${city.name}`} className="card-hover p-5 flex items-center gap-4">
                        <span className="text-3xl">{city.icon}</span>
                        <div>
                          <div className="font-semibold">{city.name}</div>
                          <div className="text-xs text-dark-500">{city.count} properties</div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { icon: HiShieldCheck, title: 'Verified Listings', desc: 'Every property is verified for authenticity' },
              { icon: HiLightningBolt, title: 'AI-Powered Search', desc: 'Smart recommendations based on your preferences' },
              { icon: HiCurrencyRupee, title: 'Zero Brokerage', desc: 'Direct owner listings with NoBroker option' },
            ].map((service, i) => (
              <motion.div key={service.title} {...fadeUp} transition={{ delay: i * 0.15, duration: 0.6 }}
                className="p-8 bg-white/10 rounded-2xl backdrop-blur-sm">
                <service.icon className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-white/70">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeUp}>
            <h2 className="section-title mb-4">Ready to Find Your Dream Property?</h2>
            <p className="text-dark-500 mb-8 max-w-2xl mx-auto">
              Join millions of happy customers. Start your property journey today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register" className="btn-primary text-lg px-8 py-3">Get Started Free</Link>
              <Link to="/properties" className="btn-secondary text-lg px-8 py-3 bg-white dark:bg-dark-700">Browse Properties</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
