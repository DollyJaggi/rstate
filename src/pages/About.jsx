import BackButton from '../components/common/BackButton'

export default function About() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <BackButton />
      </div>
      <div className="bg-gradient-to-r from-primary-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">About Rstate</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">India's most trusted real estate platform, powered by AI to help you find the perfect property.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold font-heading mb-4">Our Mission</h2>
            <p className="text-dark-600 dark:text-dark-400 leading-relaxed mb-4">
              Rstate is on a mission to transform the Indian real estate experience. We combine cutting-edge AI technology with verified listings to create a transparent, efficient, and trustworthy platform for buyers, sellers, brokers, and builders.
            </p>
            <p className="text-dark-600 dark:text-dark-400 leading-relaxed">
              Whether you're looking for your dream home, want to sell property, or invest in real estate, Rstate provides the tools, data, and support you need.
            </p>
          </div>
          <div className="card p-8 text-center">
            <span className="text-6xl block mb-4">🇮🇳</span>
            <h3 className="text-2xl font-bold">Serving India</h3>
            <p className="text-dark-500">500+ cities • 50K+ properties • 2M+ monthly users</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { number: '500+', label: 'Cities Covered' },
            { number: '50K+', label: 'Verified Properties' },
            { number: '2M+', label: 'Monthly Visitors' },
            { number: '15K+', label: 'Properties Sold' },
            { number: '99.5%', label: 'Uptime' },
            { number: '4.8★', label: 'User Rating' },
          ].map((stat, i) => (
            <div key={i} className="card p-6 text-center">
              <div className="text-3xl font-bold text-primary-600">{stat.number}</div>
              <div className="text-dark-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
