import { Link } from 'react-router-dom'
import { HiPlus, HiPhotograph, HiUserGroup, HiClipboardList, HiCurrencyRupee } from 'react-icons/hi'

export default function BuilderDashboard() {
  const stats = [
    { icon: HiPhotograph, label: 'Active Projects', value: 6, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { icon: HiClipboardList, label: 'Units Available', value: 124, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
    { icon: HiUserGroup, label: 'Total Bookings', value: 89, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
    { icon: HiCurrencyRupee, label: 'Revenue', value: '₹12.5Cr', color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
  ]

  return (
    <div className="min-h-screen bg-dark-50 dark:bg-dark-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold font-heading">Builder Dashboard</h1>
            <p className="text-dark-500">Manage your projects and inventory</p>
          </div>
          <Link to="/add-property" className="btn-primary flex items-center gap-2">
            <HiPlus className="w-5 h-5" /> New Project
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map(stat => (
            <div key={stat.label} className="card p-5">
              <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center mb-3`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-dark-500">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Active Projects</h2>
              <Link to="/projects" className="text-sm text-primary-600">View All</Link>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Green Valley Heights', units: 45, booked: 32, status: 'Ongoing' },
                { name: 'Royal Palm Residency', units: 120, booked: 89, status: 'Ongoing' },
                { name: 'Lake View Towers', units: 60, booked: 12, status: 'New' },
              ].map((project, i) => (
                <div key={i} className="p-4 bg-dark-50 dark:bg-dark-800 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-sm">{project.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      project.status === 'Ongoing' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                      'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    }`}>{project.status}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-dark-500">
                    <span>Total: {project.units} units</span>
                    <span>Booked: {project.booked}</span>
                    <span>Available: {project.units - project.booked}</span>
                  </div>
                  <div className="mt-2 h-1.5 bg-dark-200 dark:bg-dark-700 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-600 rounded-full" style={{ width: `${(project.booked / project.units) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Bookings</h2>
            <div className="space-y-3">
              {[
                { customer: 'Rajesh Gupta', project: 'Green Valley', unit: '3 BHK - 1402', amount: '₹85L', date: 'Today' },
                { customer: 'Anita Desai', project: 'Royal Palm', unit: '4 BHK - 501', amount: '₹1.2Cr', date: 'Yesterday' },
                { customer: 'Vikram Singh', project: 'Lake View', unit: '2 BHK - 908', amount: '₹65L', date: '2 days ago' },
              ].map((booking, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-dark-50 dark:bg-dark-800 rounded-xl text-sm">
                  <div>
                    <div className="font-medium">{booking.customer}</div>
                    <div className="text-xs text-dark-500">{booking.unit} • {booking.project}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-primary-600">{booking.amount}</div>
                    <div className="text-xs text-dark-400">{booking.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
