import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-dark-50 dark:bg-dark-950 px-4">
            <div className="max-w-md w-full text-center">
              <div className="text-6xl mb-4">⚠️</div>
              <h1 className="text-2xl font-bold font-heading mb-2">Something went wrong</h1>
              <p className="text-dark-500 mb-6">{this.state.error?.message || 'An unexpected error occurred'}</p>
              <button onClick={() => { this.setState({ hasError: false, error: null }); window.location.reload() }}
                className="btn-primary">
                Reload Page
              </button>
            </div>
          </div>
        )
      )
    }
    return this.props.children
  }
}
