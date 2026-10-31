import { useNavigate } from 'react-router-dom'
import { HiArrowLeft } from 'react-icons/hi'

export default function BackButton({ fallback = '/home', className = '' }) {
  const navigate = useNavigate()

  const handleBack = () => {
    const canGoBack = window.history.state && window.history.state.idx > 0
    if (canGoBack) {
      navigate(-1)
    } else {
      navigate(fallback)
    }
  }

  return (
    <button onClick={handleBack}
      className={`flex items-center gap-1.5 text-sm font-medium text-dark-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors ${className}`}>
      <HiArrowLeft className="w-5 h-5" /> Back
    </button>
  )
}
