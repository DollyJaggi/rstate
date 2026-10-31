import { Link } from 'react-router-dom'
import BackButton from '../components/common/BackButton'

const posts = [
  { title: '2026 Real Estate Market Trends in India', excerpt: 'Comprehensive analysis of property prices, demand, and emerging trends across major Indian cities.', category: 'Market Trends', date: '28 May 2026', readTime: '5 min read' },
  { title: 'Complete Guide to Home Buying Process', excerpt: 'Step-by-step guide for first-time home buyers in India, from registration to possession.', category: 'Guide', date: '25 May 2026', readTime: '8 min read' },
  { title: 'Top 10 Cities for Real Estate Investment in 2026', excerpt: 'Discover the best Indian cities offering high ROI and growth potential for property investment.', category: 'Investment', date: '22 May 2026', readTime: '6 min read' },
  { title: 'Rental vs Buying: Which is Right for You?', excerpt: 'Detailed comparison of renting versus buying property in the current Indian market scenario.', category: 'Guide', date: '20 May 2026', readTime: '4 min read' },
]

export default function Blog() {
  return (
    <div className="min-h-screen bg-dark-50 dark:bg-dark-900/50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton className="mb-4" />
        <h1 className="text-2xl font-bold font-heading mb-2">Blog & News</h1>
        <p className="text-dark-500 mb-8">Stay updated with the latest in Indian real estate</p>
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post, i) => (
            <div key={i} className="card-hover p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="badge-primary text-xs">{post.category}</span>
                <span className="text-xs text-dark-400">{post.date}</span>
                <span className="text-xs text-dark-400">• {post.readTime}</span>
              </div>
              <h3 className="font-bold text-lg mb-2">{post.title}</h3>
              <p className="text-dark-500 text-sm mb-4">{post.excerpt}</p>
              <Link to="/blog" className="text-primary-600 font-medium text-sm hover:text-primary-700">Read More →</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
