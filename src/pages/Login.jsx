import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { HiMail, HiLockClosed, HiPhone, HiCheck } from 'react-icons/hi'
import toast from 'react-hot-toast'
import { useAuth } from '../contexts/AuthContext'
import { ROLES, getDashboardPath } from '../utils/constants'

export default function Login() {
  const [loginMethod, setLoginMethod] = useState('email')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('+91')
  const [phonePassword, setPhonePassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [pendingRoleUser, setPendingRoleUser] = useState(null)
  const [savingRole, setSavingRole] = useState(false)
  const { login, loginWithGoogle, loginWithPhone, resetPassword, updateUserRole } = useAuth()
  const navigate = useNavigate()

  const handleEmailLogin = async (e) => {
    e.preventDefault()
    if (!email || !password) return toast.error('Please fill all fields')
    setLoading(true)
    try {
      const { profile } = await login(email, password)
      toast.success('Welcome back!')
      navigate(getDashboardPath(profile?.role))
    } catch (error) {
      toast.error(error.message?.replace('Firebase: ', '') || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const handlePhoneLogin = async (e) => {
    e.preventDefault()
    if (!phone || phone.length < 12) return toast.error('Enter a valid phone number')
    if (!phonePassword) return toast.error('Enter your password')
    setLoading(true)
    try {
      const { profile } = await loginWithPhone(phone, phonePassword)
      toast.success('Welcome back!')
      navigate(getDashboardPath(profile?.role))
    } catch (error) {
      toast.error(error.message?.replace('Firebase: ', '') || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      const { user: googleUser, isNewAccount, profile } = await loginWithGoogle()
      if (isNewAccount) {
        setPendingRoleUser(googleUser)
      } else {
        toast.success('Logged in with Google!')
        navigate(getDashboardPath(profile?.role))
      }
    } catch (error) {
      toast.error(error.message?.replace('Firebase: ', '') || 'Google login failed')
    }
  }

  const handleChooseRole = async (role) => {
    if (!pendingRoleUser) return
    setSavingRole(true)
    try {
      await updateUserRole(pendingRoleUser.uid, role)
      toast.success(`Signed in as ${role}`)
      navigate(`/dashboard/${role}`)
    } catch (error) {
      toast.error('Failed to set role. Please try again.')
      setSavingRole(false)
    }
  }

  const roleOptions = [
    { value: ROLES.BUYER, label: 'Buyer', desc: 'Looking to buy/rent a property', icon: '🏠' },
    { value: ROLES.SELLER, label: 'Seller', desc: 'Want to sell your property', icon: '💰' },
    { value: ROLES.BROKER, label: 'Broker', desc: 'Professional real estate agent', icon: '🤝' },
    { value: ROLES.BUILDER, label: 'Builder', desc: 'Real estate developer', icon: '🏗️' },
  ]

  const handleForgotPassword = async () => {
    if (!email) return toast.error('Enter your email first')
    try {
      await resetPassword(email)
      toast.success('Password reset email sent!')
    } catch (error) {
      toast.error(error.message?.replace('Firebase: ', '') || 'Failed to send reset email')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="text-2xl font-bold gradient-text">Rstate</span>
          </Link>
          <h1 className="text-2xl font-bold font-heading">Welcome Back</h1>
          <p className="text-dark-500 mt-1">Sign in to your account</p>
          <div className="mt-3 inline-flex flex-wrap items-center justify-center gap-1 text-xs text-dark-400">
            <span>Demo:</span>
            <button type="button" onClick={() => { setLoginMethod('email'); setEmail('admin@rstate.in'); setPassword('admin123') }} className="text-primary-600 hover:underline">Admin</button>
            <span>·</span>
            <button type="button" onClick={() => { setLoginMethod('email'); setEmail('buyer@test.com'); setPassword('test123') }} className="text-primary-600 hover:underline">Buyer</button>
            <span>·</span>
            <button type="button" onClick={() => { setLoginMethod('email'); setEmail('seller@test.com'); setPassword('test123') }} className="text-primary-600 hover:underline">Seller</button>
          </div>
        </div>

        <div className="card p-8">
          {/* Method Tabs */}
          <div className="flex bg-dark-100 dark:bg-dark-700 rounded-lg p-1 mb-6">
            <button onClick={() => setLoginMethod('email')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-colors ${
                loginMethod === 'email' ? 'bg-white dark:bg-dark-800 shadow-sm text-dark-900 dark:text-dark-50' : 'text-dark-500 hover:text-dark-700 dark:hover:text-dark-300'
              }`}>
              <HiMail className="w-4 h-4" /> Email
            </button>
            <button onClick={() => setLoginMethod('phone')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-colors ${
                loginMethod === 'phone' ? 'bg-white dark:bg-dark-800 shadow-sm text-dark-900 dark:text-dark-50' : 'text-dark-500 hover:text-dark-700 dark:hover:text-dark-300'
              }`}>
              <HiPhone className="w-4 h-4" /> Phone
            </button>
          </div>

          {loginMethod === 'email' ? (
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Email</label>
                <div className="relative">
                  <HiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400 w-5 h-5" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email" className="input-field pl-10" required />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Password</label>
                <div className="relative">
                  <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400 w-5 h-5" />
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password" className="input-field pl-10" required />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-dark-300 text-primary-600 focus:ring-primary-500" />
                  <span className="text-dark-600 dark:text-dark-400">Remember me</span>
                </label>
                <button type="button" onClick={handleForgotPassword} className="text-primary-600 hover:text-primary-700 font-medium">
                  Forgot Password?
                </button>
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          ) : (
            <form onSubmit={handlePhoneLogin} className="space-y-4">
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
                  <input type="password" value={phonePassword} onChange={(e) => setPhonePassword(e.target.value)}
                    placeholder="Enter your password" className="input-field pl-10" required />
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          )}

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-dark-200 dark:border-dark-700" /></div>
            <div className="relative flex justify-center text-sm"><span className="px-3 bg-white dark:bg-dark-800 text-dark-500">Or continue with</span></div>
          </div>

          <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 py-3 border-2 border-dark-200 dark:border-dark-700 rounded-lg hover:bg-dark-50 dark:hover:bg-dark-700 transition-colors font-medium">
            <FcGoogle className="w-5 h-5" /> Google
          </button>
        </div>

        <p className="text-center mt-6 text-sm text-dark-500">
          Don't have an account? <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">Create one</Link>
        </p>
      </div>

      {pendingRoleUser && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-dark-800 rounded-xl max-w-sm w-full p-6 shadow-2xl">
            <div className="text-center mb-5">
              <div className="w-14 h-14 bg-primary-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-3">
                <HiCheck className="w-7 h-7" />
              </div>
              <h2 className="text-lg font-bold">You're Signed In!</h2>
              <p className="text-sm text-dark-500 mt-1">
                Welcome {pendingRoleUser?.displayName || 'to Rstate'}! What do you want to do on Rstate?
              </p>
            </div>
            <div className="space-y-2">
              {roleOptions.map(opt => (
                <button key={opt.value} onClick={() => handleChooseRole(opt.value)} disabled={savingRole}
                  className="w-full flex items-center gap-3 p-3 rounded-xl border-2 border-dark-200 dark:border-dark-700 hover:border-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all text-left disabled:opacity-50">
                  <span className="text-2xl">{opt.icon}</span>
                  <span>
                    <span className="block font-semibold text-sm capitalize">{opt.label}</span>
                    <span className="block text-xs text-dark-500">{opt.desc}</span>
                  </span>
                </button>
              ))}
            </div>
            {savingRole && <p className="text-center text-xs text-primary-600 mt-3">Setting up your account...</p>}
          </div>
        </div>
      )}
    </div>
  )
}
