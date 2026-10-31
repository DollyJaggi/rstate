import { useState } from 'react'
import { Link } from 'react-router-dom'
import { jsPDF } from 'jspdf'
import { HiArrowLeft, HiDocumentText, HiShieldCheck, HiLightningBolt, HiCheck, HiDownload } from 'react-icons/hi'
import toast from 'react-hot-toast'

export default function RentalAgreement() {
  const [generated, setGenerated] = useState(false)
  const [form, setForm] = useState({ landlord: '', tenant: '', address: '', rent: '', deposit: '', duration: '11' })

  const handleGenerate = () => {
    if (!form.landlord || !form.tenant || !form.address || !form.rent) {
      return toast.error('Please fill all required fields')
    }
    setGenerated(true)
    toast.success('Rental agreement generated successfully!')
  }

  const handleDownload = () => {
    const doc = new jsPDF()
    const today = new Date().toLocaleDateString('en-IN')
    const rentAmt = Number(form.rent).toLocaleString('en-IN')
    const depositAmt = form.deposit ? Number(form.deposit).toLocaleString('en-IN') : 'N/A'

    doc.setFontSize(18)
    doc.text('RENTAL AGREEMENT', 105, 25, { align: 'center' })
    doc.setFontSize(10)
    doc.text(`Date: ${today}`, 160, 35)
    doc.text('Agreement No: RST-' + Date.now().toString().slice(-6), 160, 42)

    doc.setFontSize(11)
    const yStart = 55
    const lines = [
      'THIS RENTAL AGREEMENT (the "Agreement") is made on ' + today + ' between:',
      '',
      '1. LANDLORD: ' + form.landlord,
      '2. TENANT: ' + form.tenant,
      '',
      'PROPERTY ADDRESS: ' + form.address,
      '',
      'TERMS & CONDITIONS:',
      '1. The landlord agrees to rent the above property to the tenant.',
      '2. Monthly Rent: \u20B9' + rentAmt + ' payable on or before the 7th of every month.',
      '3. Security Deposit: \u20B9' + depositAmt + ' refundable at the end of the tenancy.',
      '4. Agreement Duration: ' + form.duration + ' months.',
      '5. The tenant shall use the premises only for residential purposes.',
      '6. Any damages to the property will be borne by the tenant.',
      '7. Notice period of 1 month required from either party for termination.',
      '8. The landlord reserves the right to inspect the premises with prior notice.',
      '',
      'IN WITNESS WHEREOF, the parties have signed this Agreement on the date above.',
      '',
      '_________________________              _________________________',
      'Landlord                               Tenant',
    ]

    lines.forEach((line, i) => {
      doc.text(line, 20, yStart + i * 8)
    })

    doc.save('Rental-Agreement-RST-' + Date.now().toString().slice(-6) + '.pdf')
    toast.success('PDF downloaded!')
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/home" className="inline-flex items-center gap-2 text-dark-500 hover:text-primary-600 mb-6">
          <HiArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <div className="card p-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📝</span>
            <div>
              <h1 className="text-2xl font-bold font-heading">Rental Agreement</h1>
              <p className="text-dark-500">Create legally valid rental agreements online</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl text-center cursor-pointer hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                 onClick={() => toast.success('E-Stamping available for all states including Maharashtra, Karnataka, Delhi')}>
              <HiDocumentText className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <h3 className="font-semibold text-sm">E-Stamping</h3>
              <p className="text-xs text-dark-500">Legally valid across all states</p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-center cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                 onClick={() => toast.success('Agreement delivered instantly after e-signature')}>
              <HiLightningBolt className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <h3 className="font-semibold text-sm">Instant Delivery</h3>
              <p className="text-xs text-dark-500">Get agreement in 24 hours</p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-center cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                 onClick={() => toast.success('Drafted by property lawyers with 15+ years experience')}>
              <HiShieldCheck className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <h3 className="font-semibold text-sm">Lawyer Reviewed</h3>
              <p className="text-xs text-dark-500">Drafted by property experts</p>
            </div>
          </div>

          {generated ? (
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl mb-6 text-center">
              <HiDocumentText className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <h2 className="text-lg font-semibold mb-2">Agreement Ready!</h2>
              <div className="text-sm text-dark-600 mb-4 space-y-1">
                <p>Landlord: {form.landlord}</p>
                <p>Tenant: {form.tenant}</p>
                <p>Rent: ₹{Number(form.rent).toLocaleString('en-IN')}/month</p>
                <p>Duration: {form.duration} months</p>
              </div>
              <div className="flex justify-center gap-3">
                <button className="btn-primary flex items-center gap-2" onClick={handleDownload}>
                  <HiDownload className="w-4 h-4" /> Download Agreement
                </button>
                <button className="btn-secondary" onClick={() => { setGenerated(false); toast('Form reset') }}>Create New</button>
              </div>
            </div>
          ) : (
            <div className="bg-dark-50 dark:bg-dark-800 p-6 rounded-xl mb-6">
              <h2 className="font-semibold mb-4">Enter Details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Landlord Name *" className="input-field" value={form.landlord}
                       onChange={e => setForm(f => ({ ...f, landlord: e.target.value }))} />
                <input type="text" placeholder="Tenant Name *" className="input-field" value={form.tenant}
                       onChange={e => setForm(f => ({ ...f, tenant: e.target.value }))} />
                <input type="text" placeholder="Property Address *" className="input-field sm:col-span-2" value={form.address}
                       onChange={e => setForm(f => ({ ...f, address: e.target.value }))} />
                <input type="number" placeholder="Monthly Rent (₹) *" className="input-field" value={form.rent}
                       onChange={e => setForm(f => ({ ...f, rent: e.target.value }))} />
                <input type="number" placeholder="Security Deposit (₹)" className="input-field" value={form.deposit}
                       onChange={e => setForm(f => ({ ...f, deposit: e.target.value }))} />
                <select className="input-field" value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))}>
                  <option value="11">11 months</option>
                  <option value="12">12 months</option>
                  <option value="24">24 months</option>
                  <option value="36">36 months</option>
                </select>
              </div>
              <button className="btn-primary w-full mt-4 flex items-center justify-center gap-2" onClick={handleGenerate}>
                <HiDocumentText className="w-4 h-4" /> Generate Agreement
              </button>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm text-dark-500 justify-center">
            <HiCheck className="w-4 h-4 text-green-500" /> Compliant with Rent Control Acts of all states
          </div>
        </div>
      </div>
    </div>
  )
}
