import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { HiChat, HiPaperAirplane, HiPhone, HiVideoCamera, HiArrowLeft } from 'react-icons/hi'
import BackButton from '../components/common/BackButton'
import { useChat } from '../contexts/ChatContext'
import { useAuth } from '../contexts/AuthContext'
import { formatRelativeTime, getInitials } from '../utils/helpers'

export default function ChatPage() {
  const { chatId: paramChatId } = useParams()
  const { user, userProfile } = useAuth()
  const { chats, activeChat, messages, setActiveChat, sendMessage, loadMessages } = useChat()
  const [newMessage, setNewMessage] = useState('')
  const [localMessages, setLocalMessages] = useState([])

  useEffect(() => {
    if (paramChatId) {
      setActiveChat(paramChatId)
    }
  }, [paramChatId, setActiveChat])

  useEffect(() => {
    if (activeChat) {
      const unsubscribe = loadMessages(activeChat)
      return () => {
        if (unsubscribe) unsubscribe()
      }
    }
  }, [activeChat, loadMessages])

  useEffect(() => {
    setLocalMessages(messages)
  }, [messages])

  const handleSend = (e) => {
    e.preventDefault()
    if (!newMessage.trim() || !activeChat) return
    sendMessage(activeChat, newMessage)
    setNewMessage('')
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-dark-50 dark:bg-dark-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-[calc(100vh-6rem)]">
        <div className="flex h-full bg-white dark:bg-dark-800 rounded-2xl shadow-sm border border-dark-100 dark:border-dark-700 overflow-hidden">
          {/* Chat List */}
          <div className={`w-full md:w-80 lg:w-96 border-r border-dark-100 dark:border-dark-700 flex flex-col ${activeChat ? 'hidden md:flex' : 'flex'}`}>
            <div className="p-4 border-b border-dark-100 dark:border-dark-700 flex items-center justify-between">
              <h2 className="font-semibold text-lg">Messages</h2>
              <BackButton className="p-2 hover:bg-dark-100 dark:hover:bg-dark-700 rounded-lg" />
            </div>
            <div className="flex-1 overflow-y-auto">
              {chats.length > 0 ? (
                chats.map(chat => (
                  <button key={chat.id} onClick={() => setActiveChat(chat.id)}
                    className={`w-full p-4 flex items-center gap-3 hover:bg-dark-50 dark:hover:bg-dark-700 transition-colors text-left border-b border-dark-50 dark:border-dark-700 ${activeChat === chat.id ? 'bg-primary-50 dark:bg-primary-900/20' : ''}`}>
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-sm font-bold text-primary-600 shrink-0">
                      {getInitials(chat.participantId?.replace('owner-', '') || 'U')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{chat.participantId?.replace('owner-', '') || 'User'}</div>
                      <div className="text-xs text-dark-500 truncate">{chat.lastMessage || 'Start chatting'}</div>
                    </div>
                    {chat.lastMessageTime && (
                      <div className="text-xs text-dark-400 shrink-0">{formatRelativeTime(chat.lastMessageTime)}</div>
                    )}
                  </button>
                ))
              ) : (
                <div className="p-8 text-center">
                  <HiChat className="w-12 h-12 text-dark-300 mx-auto mb-3" />
                  <p className="text-dark-500 text-sm">No conversations yet</p>
                  <p className="text-xs text-dark-400 mt-1">Start chatting with property owners</p>
                </div>
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className={`flex-1 flex flex-col ${!activeChat ? 'hidden md:flex' : 'flex'}`}>
            {activeChat ? (
              <>
                <div className="p-4 border-b border-dark-100 dark:border-dark-700 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button onClick={() => setActiveChat(null)} className="md:hidden p-1 hover:bg-dark-100 dark:hover:bg-dark-700 rounded-lg">
                      <span className="text-lg">←</span>
                    </button>
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-sm font-bold text-primary-600">
                      {getInitials('User')}
                    </div>
                    <div>
                      <div className="font-medium text-sm">Property Owner</div>
                      <div className="text-xs text-green-500">Online</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-dark-100 dark:hover:bg-dark-700 rounded-lg"><HiPhone className="w-5 h-5" /></button>
                    <button className="p-2 hover:bg-dark-100 dark:hover:bg-dark-700 rounded-lg"><HiVideoCamera className="w-5 h-5" /></button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {localMessages.length > 0 ? (
                    localMessages.map(msg => (
                      <div key={msg.id} className={`flex ${msg.senderId === user?.uid ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                          msg.senderId === user?.uid
                            ? 'bg-primary-600 text-white rounded-br-sm'
                            : 'bg-dark-100 dark:bg-dark-700 text-dark-900 dark:text-dark-50 rounded-bl-sm'
                        }`}>
                          <p>{msg.text}</p>
                          <div className={`text-xs mt-1 ${msg.senderId === user?.uid ? 'text-white/70' : 'text-dark-400'}`}>
                            {formatRelativeTime(msg.timestamp)}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <HiChat className="w-12 h-12 text-dark-300 mx-auto mb-2" />
                        <p className="text-dark-500 text-sm">Send a message to start</p>
                      </div>
                    </div>
                  )}
                </div>

                <form onSubmit={handleSend} className="p-4 border-t border-dark-100 dark:border-dark-700">
                  <div className="flex gap-3">
                    <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="input-field flex-1" />
                    <button type="submit" className="btn-primary flex items-center gap-2">
                      <HiPaperAirplane className="w-5 h-5 rotate-90" />
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <HiChat className="w-16 h-16 text-dark-300 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-1">Your Messages</h3>
                  <p className="text-dark-500 text-sm">Select a conversation to start chatting</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
