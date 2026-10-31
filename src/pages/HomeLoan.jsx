import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiArrowLeft, HiShieldCheck, HiCalculator, HiDocumentText, HiCheck, HiX, HiPhone } from 'react-icons/hi'
import toast from 'react-hot-toast'

export default function HomeLoan() {
  const [showCalculator, setShowCalculator] = useState(false)
  const [loanAmount, setLoanAmount] = useState(5000000)
  const [rate, setRate] = useState(8.5)
  const [tenure, setTenure] = useState(20)
  const [applied, setApplied] = useState(false)

  const monthlyRate = rate / 12 / 100
  const months = tenure * 12
  const emi = Math.round(loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1))
  const totalInterest = Math.round(emi * months - loanAmount)

  const steps = [
    'Check your credit score (750+ recommended)',
    'Calculate affordable loan amount',
    'Compare interest rates from top banks',
    'Submit documents online',
    'Get in-principle approval in 24 hours',
    'Property verification by bank',
    'Loan disbursement',
  ]
  const banks = [
    { name: 'SBI', rate: '8.40%', processing: '0.35%' },
    { name: 'HDFC', rate: '8.50%', processing: '0.50%' },
    { name: 'ICICI', rate: '8.55%', processing: '0.50%' },
    { name: 'Axis Bank', rate: '8.60%', processing: '0.40%' },
    { name: 'Kotak Mahindra', rate: '8.45%', processing: '0.25%' },
    { name: 'PNB Housing', rate: '8.35%', processing: '0.30%' },
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/home" className="inline-flex items-center gap-2 text-dark-500 hover:text-primary-600 mb-6">
          <HiArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <div className="card p-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🏦</span>
            <div>
              <h1 className="text-2xl font-bold font-heading">Home Loan</h1>
              <p className="text-dark-500">Get the best home loan deals from top Indian banks</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                 onClick={() => setShowCalculator(!showCalculator)}>
              <HiCalculator className="w-6 h-6 text-blue-500 mb-2" />
              <h3 className="font-semibold mb-1">Loan Calculator</h3>
              <p className="text-sm text-dark-500">{showCalculator ? 'Hide calculator' : 'Estimate your monthly EMI and total interest'}</p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl cursor-pointer hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                 onClick={() => toast.success('Interest rates starting at 8.35% from PNB Housing!')}>
              <HiShieldCheck className="w-6 h-6 text-green-500 mb-2" />
              <h3 className="font-semibold mb-1">Lowest Interest Rates</h3>
              <p className="text-sm text-dark-500">Starting from 8.40% p.a. for salaried individuals</p>
            </div>
          </div>

          {showCalculator && (
            <div className="bg-dark-50 dark:bg-dark-800 p-6 rounded-xl mb-8 animate-slide-down">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">EMI Calculator</h3>
                <button onClick={() => setShowCalculator(false)} className="p-1 hover:bg-dark-100 dark:hover:bg-dark-700 rounded">
                  <HiX className="w-4 h-4" />
                </button>
              </div>
              <div className="grid md:grid-cols-3 gap-6 mb-4">
                <div>
                  <label className="text-sm text-dark-500 block mb-1">Loan Amount</label>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-dark-400">₹</span>
                    <input type="number" min={100000} max={50000000} step={100000} value={loanAmount}
                      onChange={e => { const v = Math.min(50000000, Math.max(100000, Number(e.target.value) || 100000)); setLoanAmount(v) }}
                      className="input-field text-sm" />
                  </div>
                  <input type="range" min={100000} max={50000000} step={100000} value={loanAmount} onChange={e => setLoanAmount(Number(e.target.value))} className="w-full accent-primary-600" />
                  <div className="flex justify-between text-xs text-dark-400 mt-1"><span>₹1L</span><span>₹5Cr</span></div>
                </div>
                <div>
                  <label className="text-sm text-dark-500 block mb-1">Interest Rate</label>
                  <div className="flex items-center gap-2 mb-2">
                    <input type="number" min={1} max={30} step={0.1} value={rate}
                      onChange={e => { const v = Math.min(30, Math.max(1, Number(e.target.value) || 1)); setRate(v) }}
                      className="input-field text-sm" />
                    <span className="text-sm text-dark-400">% p.a.</span>
                  </div>
                  <input type="range" min={1} max={30} step={0.1} value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full accent-primary-600" />
                  <div className="flex justify-between text-xs text-dark-400 mt-1"><span>1%</span><span>30%</span></div>
                </div>
                <div>
                  <label className="text-sm text-dark-500 block mb-1">Tenure</label>
                  <div className="flex items-center gap-2 mb-2">
                    <input type="number" min={1} max={30} step={1} value={tenure}
                      onChange={e => { const v = Math.min(30, Math.max(1, Number(e.target.value) || 1)); setTenure(v) }}
                      className="input-field text-sm" />
                    <span className="text-sm text-dark-400">years</span>
                  </div>
                  <input type="range" min={1} max={30} step={1} value={tenure} onChange={e => setTenure(Number(e.target.value))} className="w-full accent-primary-600" />
                  <div className="flex justify-between text-xs text-dark-400 mt-1"><span>1 yr</span><span>30 yrs</span></div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-primary-50 dark:bg-primary-900/20 p-3 rounded-lg">
                  <div className="text-xs text-dark-500">Monthly EMI</div>
                  <div className="text-lg font-bold text-primary-600">₹{emi.toLocaleString('en-IN')}</div>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                  <div className="text-xs text-dark-500">Total Interest</div>
                  <div className="text-lg font-bold text-yellow-600">₹{totalInterest.toLocaleString('en-IN')}</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                  <div className="text-xs text-dark-500">Total Payment</div>
                  <div className="text-lg font-bold text-green-600">₹{(loanAmount + totalInterest).toLocaleString('en-IN')}</div>
                </div>
              </div>
            </div>
          )}

          <h2 className="font-semibold text-lg mb-4">How It Works</h2>
          <div className="space-y-3 mb-8">
            {steps.map((step, i) => (
              <div key={i} className="flex items-start gap-3 cursor-pointer hover:bg-dark-50 dark:hover:bg-dark-800 p-2 rounded-lg transition-colors"
                   onClick={() => toast(`Step ${i + 1}: ${step}`)}>
                <span className="w-7 h-7 bg-primary-100 dark:bg-primary-900 text-primary-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                <span className="text-dark-600 dark:text-dark-400">{step}</span>
              </div>
            ))}
          </div>

          <h2 className="font-semibold text-lg mb-4">Partner Banks</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
            {banks.map(bank => (
              <div key={bank.name}
                   className="p-4 bg-dark-50 dark:bg-dark-800 rounded-lg text-center font-medium text-sm cursor-pointer hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:border-primary-300 border border-transparent transition-all"
                   onClick={() => toast.success(`${bank.name}: ${bank.rate} interest, ${bank.processing} processing fee`)}>
                <div>{bank.name}</div>
                <div className="text-xs text-primary-600 font-semibold mt-1">{bank.rate}</div>
              </div>
            ))}
          </div>

          <div className="bg-primary-50 dark:bg-primary-900/20 p-6 rounded-xl text-center">
            {applied ? (
              <div>
                <HiCheck className="w-10 h-10 text-green-500 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Application Submitted!</h3>
                <p className="text-dark-500 text-sm">Our representative will call you within 24 hours.</p>
                <button className="btn-secondary mt-4" onClick={() => { setApplied(false); toast('Reset application form') }}>Submit Another</button>
              </div>
            ) : (
              <>
                <h3 className="font-semibold mb-2">Ready to Apply?</h3>
                <p className="text-dark-500 text-sm mb-4">Get pre-approved in 5 minutes with zero paperwork</p>
                <div className="flex flex-wrap justify-center gap-3">
                  <button className="btn-primary flex items-center gap-2" onClick={() => { setApplied(true); toast.success('Loan application submitted!') }}>
                    <HiDocumentText className="w-4 h-4" /> Apply Now
                  </button>
                  <button className="btn-secondary flex items-center gap-2" onClick={() => toast.success('Connecting you to a loan advisor...')}>
                    <HiPhone className="w-4 h-4" /> Talk to Advisor
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
