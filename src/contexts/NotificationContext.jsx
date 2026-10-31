import { createContext, useContext, useState, useEffect } from 'react'
import { ref, onChildAdded, onChildChanged } from 'firebase/database'
import { rtdb, messaging } from '../services/firebase'
import { getToken, onMessage } from 'firebase/messaging'
import { useAuth } from './AuthContext'

const NotificationContext = createContext()

export function NotificationProvider({ children }) {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [fcmToken, setFcmToken] = useState(null)

  useEffect(() => {
    if (!user || !rtdb) return
    try {
      const notifRef = ref(rtdb, `notifications/${user.uid}`)
      const unsubscribe = onChildAdded(notifRef, (snapshot) => {
        const notif = { id: snapshot.key, ...snapshot.val() }
        setNotifications(prev => [notif, ...prev])
        if (!notif.read) setUnreadCount(prev => prev + 1)
      })
      return () => unsubscribe()
    } catch (e) {
      console.warn('Notification listener failed:', e.message)
    }
  }, [user])

  useEffect(() => {
    if (!user || !rtdb) return
    try {
      const notifRef = ref(rtdb, `notifications/${user.uid}`)
      const unsubscribe = onChildChanged(notifRef, (snapshot) => {
        const updated = { id: snapshot.key, ...snapshot.val() }
        setNotifications(prev => prev.map(n => n.id === updated.id ? updated : n))
      })
      return () => unsubscribe()
    } catch (e) {
      console.warn('Notification change listener failed:', e.message)
    }
  }, [user])

  useEffect(() => {
    if (!user || !messaging) return
    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission()
        if (permission !== 'granted') return
        try {
          const token = await getToken(messaging, {
            vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
          })
          setFcmToken(token)
        } catch (swErr) {
          console.warn('Firebase messaging unavailable (no service worker)')
        }
      } catch (error) {
        console.warn('Notification permission denied')
      }
    }
    requestPermission()
    try {
      const unsubscribeMsg = onMessage(messaging, (payload) => {
        setNotifications(prev => [{
          id: Date.now(),
          title: payload.notification?.title,
          message: payload.notification?.body,
          timestamp: Date.now(),
          read: false,
        }, ...prev])
      })
      return () => unsubscribeMsg()
    } catch (e) {
      console.warn('Firebase onMessage not available')
    }
  }, [user])

  const markAsRead = async (notificationId) => {
    try {
      const { ref: dbRef, update } = await import('firebase/database')
      await update(ref(rtdb, `notifications/${user.uid}/${notificationId}`), { read: true })
      setUnreadCount(prev => Math.max(0, prev - 1))
    } catch (e) {
      console.warn('Failed to mark notification:', e.message)
    }
  }

  const clearNotifications = () => {
    setNotifications([])
    setUnreadCount(0)
  }

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      fcmToken,
      markAsRead,
      clearNotifications,
    }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (!context) throw new Error('useNotifications must be used within NotificationProvider')
  return context
}
