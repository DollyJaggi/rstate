import { Link } from 'react-router-dom'
import BackButton from '../components/common/BackButton'

const resources = [
  { icon: '🏦', title: 'Home Loan Calculator', desc: 'Calculate monthly EMI, compare loan options, and check eligibility online.', path: '/home-loan' },
  { icon: '📊', title: 'Property Valuation', desc: 'Get instant property valuation based on market trends and location analysis.', path: '/property-valuation' },
  { icon: '📝', title: 'Rental Agreement Generator', desc: 'Generate legally compliant rental agreements in minutes.', path: '/rental-agreement' },
  { icon: '📈', title: 'Market Trends', desc: 'Analyze price trends, demand patterns, and investment opportunities.', path: '/resources' },
  { icon: '🏠', title: 'Home Buying Guide', desc: 'Step-by-step guide for first-time home buyers.', path: '/resources' },
  { icon: '⚖️', title: 'Legal Resources', desc: 'Understanding property laws, registration, and documentation.', path: '/resources' },
]

export default function Resources() {
  return (
    <div className="min-h-screen bg-dark-50 dark:bg-dark-900/50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton className="mb-4" />
        <h1 className="text-2xl font-bold font-heading mb-2">Resources</h1>
        <p className="text-dark-500 mb-8">Tools and guides to help you make informed decisions</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((r, i) => (
            <Link key={i} to={r.path} className="card-hover p-6 block">
              <span className="text-4xl block mb-4">{r.icon}</span>
              <h3 className="font-bold text-lg mb-2">{r.title}</h3>
              <p className="text-dark-500 text-sm mb-4">{r.desc}</p>
              <span className="text-primary-600 font-medium text-sm hover:text-primary-700">Learn More →</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
