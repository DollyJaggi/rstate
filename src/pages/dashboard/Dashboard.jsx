import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import LoadingScreen from '../../components/common/LoadingScreen'
import { getDashboardPath } from '../../utils/constants'

export default function Dashboard() {
  const { user, userProfile, loading } = useAuth()

  if (loading) return <LoadingScreen />
  if (!user) return <Navigate to="/login" replace />

  return <Navigate to={getDashboardPath(userProfile?.role)} replace />
}
