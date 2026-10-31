import { useState, useEffect } from 'react'
import { HiLocationMarker, HiX } from 'react-icons/hi'
import toast from 'react-hot-toast'
import { loadProjects } from '../services/projectStore'
import BackButton from '../components/common/BackButton'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [filters, setFilters] = useState({ status: '', city: '', type: '' })
  const [enquiry, setEnquiry] = useState(null)
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })

  useEffect(() => { setProjects(loadProjects()) }, [])

  const statuses = [...new Set(projects.map(p => p.status))]
  const types = [...new Set(projects.map(p => p.type))]
  const cities = [...new Set(projects.map(p => p.location.split(',').pop().trim()))]

  const filtered = projects.filter(p =>
    (!filters.status || p.status === filters.status) &&
    (!filters.city || p.location.includes(filters.city)) &&
    (!filters.type || p.type === filters.type)
  )

  const handleEnquire = (project) => setEnquiry(project)

  const submitEnquiry = (e) => {
    e.preventDefault()
    if (!form.name || !form.phone) { toast.error('Please fill name and phone'); return }
    toast.success(`Enquiry sent to ${enquiry.builder} for ${enquiry.name}`)
    setEnquiry(null)
    setForm({ name: '', phone: '', email: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-dark-50 dark:bg-dark-900/50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton className="mb-4" />
        <h1 className="text-2xl font-bold font-heading mb-2">New Projects</h1>
        <p className="text-dark-500 mb-6">Explore upcoming and ongoing real estate projects across India</p>

        <div className="flex flex-wrap gap-3 mb-8">
          <select value={filters.status} onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}
            className="input-field w-auto min-w-[130px]">
            <option value="">All Status</option>
            {statuses.map(s => <option key={s}>{s}</option>)}
          </select>
          <select value={filters.type} onChange={e => setFilters(f => ({ ...f, type: e.target.value }))}
            className="input-field w-auto min-w-[130px]">
            <option value="">All Types</option>
            {types.map(t => <option key={t}>{t}</option>)}
          </select>
          <select value={filters.city} onChange={e => setFilters(f => ({ ...f, city: e.target.value }))}
            className="input-field w-auto min-w-[130px]">
            <option value="">All Cities</option>
            {cities.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        {filtered.length === 0 && <p className="text-dark-500 text-center py-12">No projects match your filters.</p>}

        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((project, i) => (
            <div key={i} className="card overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
              <div className="h-48 bg-gradient-to-br from-primary-600 to-blue-800 flex items-center justify-center text-6xl">
                {project.image}
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-lg">{project.name}</h3>
                    <p className="text-sm text-dark-500">{project.builder}</p>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    project.status === 'Ongoing' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                    'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                  }`}>{project.status}</span>
                </div>
                <p className="text-sm text-dark-500 flex items-center gap-1 mb-3">
                  <HiLocationMarker className="w-4 h-4" /> {project.location}
                </p>
                <div className="grid grid-cols-3 gap-2 text-sm mb-4">
                  <div><span className="text-dark-500">Type:</span> {project.type}</div>
                  <div><span className="text-dark-500">Units:</span> {project.units}</div>
                  <div><span className="text-dark-500">Possession:</span> {project.possession}</div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary-600">{project.price}</span>
                  <button onClick={() => handleEnquire(project)} className="btn-primary text-sm">Enquire Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {enquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 w-full max-w-md relative">
            <button onClick={() => setEnquiry(null)} className="absolute top-4 right-4 text-dark-400 hover:text-dark-600"><HiX className="w-5 h-5" /></button>
            <h2 className="text-lg font-bold mb-1">Enquire About</h2>
            <p className="text-primary-600 font-semibold mb-4">{enquiry.name} - {enquiry.builder}</p>
            <form onSubmit={submitEnquiry} className="space-y-3">
              <input type="text" placeholder="Your Name *" className="input-field" value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              <input type="tel" placeholder="Phone Number *" className="input-field" value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
              <input type="email" placeholder="Email" className="input-field" value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              <textarea placeholder="Message (optional)" className="input-field" rows={3} value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
              <button type="submit" className="btn-primary w-full">Send Enquiry</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
