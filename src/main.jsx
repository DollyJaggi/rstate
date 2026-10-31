import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import App from './App'
import ErrorBoundary from './components/common/ErrorBoundary'
import { AuthProvider } from './contexts/AuthContext'
import { PropertyProvider } from './contexts/PropertyContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { ChatProvider } from './contexts/ChatContext'
import { NotificationProvider } from './contexts/NotificationContext'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter future={{ v7_relativeSplatPath: true }}>
        <HelmetProvider>
          <ThemeProvider>
            <ErrorBoundary>
              <AuthProvider>
                <PropertyProvider>
                  <ErrorBoundary>
                    <ChatProvider>
                      <NotificationProvider>
                        <App />
                        <Toaster
                          position="top-right"
                          toastOptions={{
                            duration: 3000,
                            style: {
                              background: '#1e293b',
                              color: '#f8fafc',
                              borderRadius: '12px',
                            },
                          }}
                        />
                      </NotificationProvider>
                    </ChatProvider>
                  </ErrorBoundary>
                </PropertyProvider>
              </AuthProvider>
            </ErrorBoundary>
          </ThemeProvider>
        </HelmetProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
)
