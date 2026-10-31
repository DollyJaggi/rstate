import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HiUserGroup, HiChat, HiPlus, HiTrash, HiX, HiEye } from 'react-icons/hi'
import { collection, query, where, getDocs, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore'
import toast from 'react-hot-toast'
import BackButton from '../../components/common/BackButton'
import { useAuth } from '../../contexts/AuthContext'
import { useChat } from '../../contexts/ChatContext'
import { db } from '../../services/firebase'
import { FIREBASE_COLLECTIONS } from '../../utils/constants'
import { getInitials, formatRelativeTime } from '../../utils/helpers'

const formatDate = (ts) => {
  if (!ts) return ''
  const d = ts?.toDate ? ts.toDate() : new Date(ts)
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function BrokerClients() {
  const { userProfile } = useAuth()
  const { chats } = useChat()
  const [clients, setClients] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [viewClient, setViewClient] = useState(null)
  const [form, setForm] = useState({ name: '', phone: '', email: '', budget: '', notes: '' })

  useEffect(() => {
    if (!userProfile?.id) return
    let cancelled = false
    const load = async () => {
      try {
        const q = query(collection(db, FIREBASE_COLLECTIONS.CLIENTS), where('brokerId', '==', userProfile.id))
        const snapshot = await getDocs(q)
        if (!cancelled) setClients(snapshot.docs.map(d => ({ id: d.id, ...d.data() })))
      } catch (e) {
        console.error('Error loading clients:', e)
      }
    }
    load()
    return () => { cancelled = true }
  }, [userProfile?.id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim()) { toast.error('Enter a client name'); return }
    setSaving(true)
    try {
      const payload = { ...form, name: form.name.trim(), brokerId: userProfile.id, createdAt: serverTimestamp() }
      const ref = await addDoc(collection(db, FIREBASE_COLLECTIONS.CLIENTS), payload)
      setClients(prev => [{ id: ref.id, ...payload }, ...prev])
      setForm({ name: '', phone: '', email: '', budget: '', notes: '' })
      setShowForm(false)
      toast.success('Client added')
    } catch (err) {
      console.error('Save client error:', err)
      toast.error(err?.code === 'permission-denied' ? 'Permission denied — deploy Firestore rules' : 'Could not add client')
    }
    setSaving(false)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this client?')) return
    try {
      await deleteDoc(doc(db, FIREBASE_COLLECTIONS.CLIENTS, id))
      setClients(prev => prev.filter(c => c.id !== id))
      toast.success('Client removed')
    } catch (e) {
      console.error('Delete error:', e)
      toast.error('Delete failed')
    }
  }

  return (
    <div className="min-h-screen bg-dark-50 dark:bg-dark-900/50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton className="mb-4" />
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold font-heading">Clients</h1>
            <p className="text-dark-500">People you are in touch with</p>
          </div>
          <button onClick={() => setShowForm(s => !s)} className="btn-primary flex items-center gap-2">
            {showForm ? <HiX className="w-5 h-5" /> : <HiPlus className="w-5 h-5" />} {showForm ? 'Cancel' : 'Add Client'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="card p-6 mb-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Name *</label>
                <input type="text" value={form.name} onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))} className="input-field" placeholder="Client name" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Phone</label>
                <input type="tel" value={form.phone} onChange={(e) => setForm(p => ({ ...p, phone: e.target.value }))} className="input-field" placeholder="+91 98765 43210" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Email</label>
                <input type="email" value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))} className="input-field" placeholder="client@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Budget</label>
                <input type="text" value={form.budget} onChange={(e) => setForm(p => ({ ...p, budget: e.target.value }))} className="input-field" placeholder="₹85L" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Notes</label>
              <textarea rows="2" value={form.notes} onChange={(e) => setForm(p => ({ ...p, notes: e.target.value }))} className="input-field" placeholder="Requirement, preferred locality, etc." />
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={saving} className="btn-primary">{saving ? 'Saving...' : 'Save Client'}</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
            </div>
          </form>
        )}

        {clients.length > 0 && (
          <div className="space-y-2 mb-6">
            {clients.map(client => (
              <div key={client.id} className="card p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-sm font-bold text-primary-600 shrink-0">
                  {getInitials(client.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{client.name}</div>
                  <div className="text-xs text-dark-500 truncate">
                    {[client.phone, client.email, client.budget].filter(Boolean).join(' • ') || client.notes || 'No contact details'}
                  </div>
                </div>
                <button onClick={() => setViewClient(client)} className="p-1.5 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg shrink-0" title="View client">
                  <HiEye className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(client.id)} className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg shrink-0" title="Delete client">
                  <HiTrash className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {chats.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-dark-500 uppercase tracking-wide mt-2 mb-1">From Conversations</h2>
            {chats.map(client => {
              const name = client.participantId?.replace('owner-', '') || 'User'
              return (
                <div key={client.id} className="card p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-dark-100 dark:bg-dark-700 rounded-full flex items-center justify-center text-sm font-bold text-dark-600 dark:text-dark-200 shrink-0">
                    {getInitials(name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{name}</div>
                    <div className="text-xs text-dark-500 truncate">{client.lastMessage || 'No messages yet'}</div>
                  </div>
                  {client.lastMessageTime && (
                    <div className="text-xs text-dark-400 shrink-0 hidden sm:block">{formatRelativeTime(client.lastMessageTime)}</div>
                  )}
                  <Link to={`/chat/${client.id}`} className="btn-secondary text-sm px-3 py-1.5 flex items-center gap-1.5 shrink-0">
                    <HiChat className="w-4 h-4" /> Message
                  </Link>
                </div>
              )
            })}
          </div>
        )}

        {clients.length === 0 && chats.length === 0 && (
          <div className="card p-12 text-center">
            <HiUserGroup className="w-12 h-12 text-dark-300 mx-auto mb-3" />
            <h3 className="font-semibold mb-1">No clients yet</h3>
            <p className="text-dark-500 text-sm mb-4">Add a client manually or they appear here when buyers start a conversation.</p>
            <button onClick={() => setShowForm(true)} className="btn-primary inline-flex items-center gap-2">
              <HiPlus className="w-5 h-5" /> Add Client
            </button>
          </div>
        )}
      </div>

      {viewClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setViewClient(null)}>
          <div className="card w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Client Details</h2>
              <button onClick={() => setViewClient(null)} className="p-1.5 hover:bg-dark-100 dark:hover:bg-dark-700 rounded-lg">
                <HiX className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-lg font-bold text-primary-600">
                {getInitials(viewClient.name)}
              </div>
              <div className="font-semibold text-lg">{viewClient.name}</div>
            </div>
            <dl className="space-y-2 text-sm">
              {[
                ['Phone', viewClient.phone],
                ['Email', viewClient.email],
                ['Budget', viewClient.budget],
                ['Notes', viewClient.notes],
                ['Added', formatDate(viewClient.createdAt)],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 border-b border-dark-100 dark:border-dark-700 pb-2">
                  <dt className="text-dark-500">{label}</dt>
                  <dd className="font-medium text-right break-words">{value || '—'}</dd>
                </div>
              ))}
            </dl>
            {(viewClient.phone || viewClient.email) && (
              <div className="flex gap-3 mt-6">
                {viewClient.phone && <a href={`tel:${viewClient.phone}`} className="btn-primary flex-1 text-center">Call</a>}
                {viewClient.email && <a href={`mailto:${viewClient.email}`} className="btn-secondary flex-1 text-center">Email</a>}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
