import { Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import LoadingScreen from './components/common/LoadingScreen'
import ProtectedRoute from './components/common/ProtectedRoute'
import { useAuth } from './contexts/AuthContext'
import { ROLES, getDashboardPath } from './utils/constants'

const Home = lazy(() => import('./pages/Home'))
const PropertyListing = lazy(() => import('./pages/PropertyListing'))
const PropertyDetail = lazy(() => import('./pages/PropertyDetail'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const VerifyEmail = lazy(() => import('./pages/VerifyEmail'))
const BuyerDashboard = lazy(() => import('./pages/dashboard/BuyerDashboard'))
const SellerDashboard = lazy(() => import('./pages/dashboard/SellerDashboard'))
const BrokerDashboard = lazy(() => import('./pages/dashboard/BrokerDashboard'))
const BrokerClients = lazy(() => import('./pages/dashboard/BrokerClients'))
const BuilderDashboard = lazy(() => import('./pages/dashboard/BuilderDashboard'))
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'))
const AdminDashboard = lazy(() => import('./pages/dashboard/AdminDashboard'))
const AddProperty = lazy(() => import('./pages/AddProperty'))
const EditProperty = lazy(() => import('./pages/EditProperty'))
const ChatPage = lazy(() => import('./pages/ChatPage'))
const SavedProperties = lazy(() => import('./pages/SavedProperties'))
const Profile = lazy(() => import('./pages/Profile'))
const Notifications = lazy(() => import('./pages/Notifications'))
const Projects = lazy(() => import('./pages/Projects'))
const Blog = lazy(() => import('./pages/Blog'))
const Resources = lazy(() => import('./pages/Resources'))
const About = lazy(() => import('./pages/About'))
const HomeLoan = lazy(() => import('./pages/HomeLoan'))
const PropertyValuation = lazy(() => import('./pages/PropertyValuation'))
const RentalAgreement = lazy(() => import('./pages/RentalAgreement'))

export default function App() {
  const { user, userProfile, loading } = useAuth()

  const RootRoute = () => {
    if (loading) return <LoadingScreen />
    if (user) return <Navigate to="/dashboard" replace />
    return <Login />
  }

  const HomeRoute = () => {
    const role = userProfile?.role
    if (user && role && role !== ROLES.BUYER) {
      return <Navigate to={getDashboardPath(role)} replace />
    }
    return <Home />
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<RootRoute />} />
            <Route path="/home" element={<HomeRoute />} />
            <Route path="/properties" element={<PropertyListing />} />
            <Route path="/property/:id" element={<PropertyDetail />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/home-loan" element={<HomeLoan />} />
            <Route path="/property-valuation" element={<PropertyValuation />} />
            <Route path="/rental-agreement" element={<RentalAgreement />} />
            <Route path="/login" element={<RootRoute />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
            <Route path="/chat/:chatId" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
            <Route path="/saved-properties" element={<ProtectedRoute><SavedProperties /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
            <Route path="/add-property" element={<ProtectedRoute><AddProperty /></ProtectedRoute>} />
            <Route path="/edit-property/:id" element={<ProtectedRoute><EditProperty /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard/buyer" element={<ProtectedRoute allowedRoles={['buyer']}><BuyerDashboard /></ProtectedRoute>} />
            <Route path="/dashboard/seller" element={<ProtectedRoute allowedRoles={['seller', 'broker', 'builder', 'super_admin']}><SellerDashboard /></ProtectedRoute>} />
            <Route path="/dashboard/broker" element={<ProtectedRoute allowedRoles={['broker', 'super_admin']}><BrokerDashboard /></ProtectedRoute>} />
            <Route path="/dashboard/broker/clients" element={<ProtectedRoute allowedRoles={['broker', 'super_admin']}><BrokerClients /></ProtectedRoute>} />
            <Route path="/dashboard/builder" element={<ProtectedRoute allowedRoles={['builder', 'super_admin']}><BuilderDashboard /></ProtectedRoute>} />
            <Route path="/dashboard/admin" element={<ProtectedRoute allowedRoles={['super_admin']}><AdminDashboard /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
