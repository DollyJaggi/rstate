import { useEffect, useRef } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../contexts/AuthContext'
import LoadingScreen from '../components/common/LoadingScreen'

export default function VerifyEmail() {
  const { user, loading, verifyEmailCode } = useAuth()
  const location = useLocation()
  const processedLink = useRef(false)

  useEffect(() => {
    if (processedLink.current) return
    const params = new URLSearchParams(location.search)
    if (params.get('mode') !== 'verifyEmail') return
    processedLink.current = true
    const oobCode = params.get('oobCode')
    if (!oobCode) return
    verifyEmailCode(oobCode)
      .then(() => toast.success('Email verified successfully!'))
      .catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) return <LoadingScreen />
  if (!user) return <Navigate to="/login" replace />
  return <Navigate to="/dashboard" replace />
}
