import { useNotifications } from '../contexts/NotificationContext'
import { formatRelativeTime } from '../utils/helpers'
import { HiBell, HiCheck } from 'react-icons/hi'
import BackButton from '../components/common/BackButton'

export default function Notifications() {
  const { notifications, markAsRead, clearNotifications } = useNotifications()

  return (
    <div className="min-h-screen bg-dark-50 dark:bg-dark-900/50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton className="mb-4" />
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold font-heading">Notifications</h1>
          {notifications.length > 0 && (
            <button onClick={clearNotifications} className="text-sm text-red-600 hover:text-red-700 font-medium">Clear All</button>
          )}
        </div>

        <div className="space-y-2">
          {notifications.length > 0 ? (
            notifications.map(notif => (
              <div key={notif.id} className={`card p-4 flex items-start gap-3 ${!notif.read ? 'border-l-4 border-l-primary-600' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${!notif.read ? 'bg-primary-100 dark:bg-primary-900' : 'bg-dark-100 dark:bg-dark-700'}`}>
                  <HiBell className={`w-5 h-5 ${!notif.read ? 'text-primary-600' : 'text-dark-400'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{notif.title || 'Notification'}</p>
                  <p className="text-xs text-dark-500 mt-0.5">{notif.message || ''}</p>
                  <p className="text-xs text-dark-400 mt-1">{formatRelativeTime(notif.timestamp)}</p>
                </div>
                {!notif.read && (
                  <button onClick={() => markAsRead(notif.id)} className="p-1.5 hover:bg-dark-100 dark:hover:bg-dark-700 rounded-lg shrink-0">
                    <HiCheck className="w-4 h-4 text-primary-600" />
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-20 card">
              <HiBell className="w-16 h-16 text-dark-300 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">No notifications</h3>
              <p className="text-dark-500 text-sm">You're all caught up!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
