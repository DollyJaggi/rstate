import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { HiMail, HiLockClosed, HiUser, HiPhone, HiArrowLeft } from 'react-icons/hi'
import toast from 'react-hot-toast'
import { useAuth } from '../contexts/AuthContext'
import { ROLES, getDashboardPath } from '../utils/constants'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', role: ROLES.BUYER })
  const [regMethod, setRegMethod] = useState('email')
  const [phone, setPhone] = useState('+91')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [confirmation, setConfirmation] = useState(null)
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [resendTimer, setResendTimer] = useState(0)
  const recaptchaRef = useRef(null)
  const { register, loginWithGoogle, setupRecaptcha, sendOTP, registerWithPhone, sendVerificationEmail } = useAuth()
  const navigate = useNavigate()

  const updateForm = (key, value) => setForm(prev => ({ ...prev, [key]: value }))

  useEffect(() => {
    if (step === 2 && regMethod === 'phone') {
      setTimeout(() => {
        try {
          recaptchaRef.current = setupRecaptcha('recaptcha-container-register')
        } catch (e) {}
      }, 100)
    }
  }, [step, regMethod])

  useEffect(() => {
    if (resendTimer <= 0) return
    const t = setInterval(() => setResendTimer(prev => prev - 1), 1000)
    return () => clearInterval(t)
  }, [resendTimer])

  const handleEmailRegister = async (e) => {
    e.preventDefault()
    if (!form.name.trim()) return toast.error('Please enter your name')
    if (regMethod === 'email' && !form.email) return toast.error('Please enter your email')
    if (form.password !== form.confirmPassword) return toast.error('Passwords do not match')
    if (form.password.length < 6) return toast.error('Password must be at least 6 characters')
    setLoading(true)
    try {
      await register(form.email, form.password, form.name, form.role)
      sendVerificationEmail().catch(() => {})
      toast.success('Account created!')
      navigate(getDashboardPath(form.role), { replace: true })
    } catch (error) {
      toast.error(error.message?.replace('Firebase: ', '') || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleRegister = async () => {
    try {
      const { profile } = await loginWithGoogle(form.role)
      toast.success('Account created successfully!')
      navigate(getDashboardPath(profile?.role))
    } catch (error) {
      toast.error(error.message?.replace('Firebase: ', '') || 'Google signup failed')
    }
  }

  const handleSendOTP = async (e) => {
    e.preventDefault()
    if (!form.name.trim()) return toast.error('Please enter your name first')
    if (!phone || phone.length < 12) return toast.error('Enter a valid phone number')
    if (form.password.length < 6) return toast.error('Password must be at least 6 characters')
    if (form.password !== form.confirmPassword) return toast.error('Passwords do not match')
    setLoading(true)
    try {
      const conf = await sendOTP(phone, recaptchaRef.current)
      setConfirmation(conf)
      setOtpSent(true)
      setResendTimer(30)
      toast.success('OTP sent!')
    } catch (error) {
      toast.error(error.message?.replace('Firebase: ', '') || 'Failed to send OTP')
      try { recaptchaRef.current = setupRecaptcha('recaptcha-container-register') } catch (e) {}
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async (e) => {
    e.preventDefault()
    if (!otp || otp.length < 6) return toast.error('Enter the 6-digit OTP')
    setLoading(true)
    try {
      await registerWithPhone(confirmation, otp, form.name, form.role)
      toast.success('Account created successfully!')
      navigate(getDashboardPath(form.role))
    } catch (error) {
      toast.error('Invalid OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleResendOTP = async () => {
    if (resendTimer > 0) return
    try {
      const conf = await sendOTP(phone, recaptchaRef.current)
      setConfirmation(conf)
      setResendTimer(30)
      toast.success('OTP resent!')
    } catch (error) {
      toast.error('Failed to resend OTP')
    }
  }

  const roles = [
    { value: ROLES.BUYER, label: 'Buyer', desc: 'Looking to buy/rent a property', icon: '🏠' },
    { value: ROLES.SELLER, label: 'Seller', desc: 'Want to sell your property', icon: '💰' },
    { value: ROLES.BROKER, label: 'Broker', desc: 'Professional real estate agent', icon: '🤝' },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-lg w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="text-2xl font-bold gradient-text">Rstate</span>
          </Link>
          <h1 className="text-2xl font-bold font-heading">Create Your Account</h1>
          <p className="text-dark-500 mt-1">Join India's trusted real estate platform</p>
        </div>

        <div className="card p-8">
          {step === 1 ? (
            <div>
              <h3 className="font-semibold mb-4 text-center">I am a...</h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {roles.map(r => (
                  <button key={r.value} onClick={() => { updateForm('role', r.value); setStep(2) }}
                    className={`p-4 rounded-xl border-2 text-center transition-all hover:shadow-md ${
                      form.role === r.value ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20' : 'border-dark-200 dark:border-dark-700'
                    }`}>
                    <span className="text-2xl block mb-1">{r.icon}</span>
                    <div className="font-semibold text-sm">{r.label}</div>
                    <div className="text-xs text-dark-500">{r.desc}</div>
                  </button>
                ))}
              </div>
              <button onClick={handleGoogleRegister} className="w-full flex items-center justify-center gap-3 py-3 border-2 border-dark-200 dark:border-dark-700 rounded-lg hover:bg-dark-50 dark:hover:bg-dark-700 transition-colors font-medium">
                <FcGoogle className="w-5 h-5" /> Continue with Google
              </button>
              <p className="text-center mt-4 text-xs text-dark-500">
                Already have an account? <Link to="/login" className="text-primary-600 font-medium">Sign in</Link>
              </p>
            </div>
          ) : (
            <div>
              <div className="mb-4 text-center">
                <span className="text-sm text-dark-500">Registering as </span>
                <span className="text-sm font-semibold text-primary-600">{roles.find(r => r.value === form.role)?.label}</span>
                <button type="button" onClick={() => setStep(1)}
                  className="ml-3 inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-primary-600 bg-primary-50 dark:bg-primary-900/20 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors">
                  <HiArrowLeft className="w-3 h-3" /> Change
                </button>
              </div>

              <div className="flex bg-dark-100 dark:bg-dark-700 rounded-lg p-1 mb-6">
                <button onClick={() => { setRegMethod('email'); setOtpSent(false); setOtp('') }}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    regMethod === 'email' ? 'bg-white dark:bg-dark-800 shadow-sm text-dark-900 dark:text-dark-50' : 'text-dark-500 hover:text-dark-700 dark:hover:text-dark-300'
                  }`}>
                  <HiMail className="w-4 h-4" /> Email
                </button>
                <button onClick={() => { setRegMethod('phone'); setOtpSent(false); setOtp('') }}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    regMethod === 'phone' ? 'bg-white dark:bg-dark-800 shadow-sm text-dark-900 dark:text-dark-50' : 'text-dark-500 hover:text-dark-700 dark:hover:text-dark-300'
                  }`}>
                  <HiPhone className="w-4 h-4" /> Phone
                </button>
              </div>

              <div id="recaptcha-container-register" />

              <div>
                <label className="block text-sm font-medium mb-1.5">Full Name</label>
                <div className="relative">
                  <HiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400 w-5 h-5" />
                  <input type="text" value={form.name} onChange={(e) => updateForm('name', e.target.value)}
                    placeholder="Enter your full name" className="input-field pl-10" required />
                </div>
              </div>

              {regMethod === 'email' ? (
                <form onSubmit={handleEmailRegister} className="space-y-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Email</label>
                    <div className="relative">
                      <HiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400 w-5 h-5" />
                      <input type="email" value={form.email} onChange={(e) => updateForm('email', e.target.value)}
                        placeholder="Enter your email" className="input-field pl-10" required />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">Password</label>
                    <div className="relative">
                      <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400 w-5 h-5" />
                      <input type="password" value={form.password} onChange={(e) => updateForm('password', e.target.value)}
                        placeholder="Create a password" className="input-field pl-10" required minLength={6} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">Confirm Password</label>
                    <div className="relative">
                      <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400 w-5 h-5" />
                      <input type="password" value={form.confirmPassword} onChange={(e) => updateForm('confirmPassword', e.target.value)}
                        placeholder="Confirm your password" className="input-field pl-10" required />
                    </div>
                  </div>

                  <button type="submit" disabled={loading} className="btn-primary w-full">
                    {loading ? 'Creating Account...' : `Create ${form.role} Account`}
                  </button>
                </form>
              ) : (
                <div className="space-y-4 mt-4">
                  {!otpSent ? (
                    <form onSubmit={handleSendOTP} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Phone Number</label>
                        <div className="relative">
                          <HiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400 w-5 h-5" />
                          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                            placeholder="+91 98765 43210" className="input-field pl-10" />
                        </div>
                        <p className="text-xs text-dark-400 mt-1">Include country code (e.g. +91)</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Password</label>
                        <div className="relative">
                          <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400 w-5 h-5" />
                          <input type="password" value={form.password} onChange={(e) => updateForm('password', e.target.value)}
                            placeholder="Create a password" className="input-field pl-10" required minLength={6} />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Confirm Password</label>
                        <div className="relative">
                          <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400 w-5 h-5" />
                          <input type="password" value={form.confirmPassword} onChange={(e) => updateForm('confirmPassword', e.target.value)}
                            placeholder="Confirm your password" className="input-field pl-10" required />
                        </div>
                      </div>
                      <button type="submit" disabled={loading || phone.length < 12 || !form.password || form.password !== form.confirmPassword} className="btn-primary w-full">
                        {loading ? 'Sending OTP...' : 'Send OTP'}
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleVerifyOTP} className="space-y-4">
                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-sm text-green-700 dark:text-green-400 text-center">
                        OTP sent to {phone}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Enter OTP</label>
                        <input type="text" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                          placeholder="6-digit OTP" className="input-field text-center text-lg tracking-[0.5em] font-mono" maxLength={6} autoFocus />
                      </div>
                      <button type="submit" disabled={loading || otp.length < 6} className="btn-primary w-full">
                        {loading ? 'Verifying...' : 'Verify & Create Account'}
                      </button>
                      <div className="text-center text-sm">
                        {resendTimer > 0 ? (
                          <span className="text-dark-400">Resend OTP in {resendTimer}s</span>
                        ) : (
                          <button type="button" onClick={handleResendOTP} className="text-primary-600 hover:text-primary-700 font-medium">
                            Resend OTP
                          </button>
                        )}
                      </div>
                      <button type="button" onClick={() => { setOtpSent(false); setOtp('') }}
                        className="text-sm text-dark-500 hover:text-primary-600 w-full text-center">
                        ← Change phone number
                      </button>
                    </form>
                  )}
                </div>
              )}

              <p className="text-center text-xs text-dark-500 mt-4">
                By signing up, you agree to our <Link to="/terms" className="underline">Terms</Link> & <Link to="/privacy" className="underline">Privacy Policy</Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
