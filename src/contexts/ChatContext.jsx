import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { ref, push, onChildAdded, query, orderByChild, limitToLast, set, serverTimestamp } from 'firebase/database'
import { doc, getDoc, collection, addDoc, query as fq, where, getDocs, orderBy as fbOrderBy } from 'firebase/firestore'
import { rtdb, db } from '../services/firebase'
import { useAuth } from './AuthContext'
import { FIREBASE_COLLECTIONS } from '../utils/constants'

const ChatContext = createContext()

export function ChatProvider({ children }) {
  const { user, userProfile } = useAuth()
  const [chats, setChats] = useState([])
  const [activeChat, setActiveChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user || !rtdb) {
      setChats([])
      setMessages([])
      return
    }
    try {
      const chatsRef = ref(rtdb, `userChats/${user.uid}`)
      const unsubscribe = onChildAdded(chatsRef, (snapshot) => {
        const chatData = snapshot.val()
        if (chatData) {
          setChats(prev => {
            const existing = prev.findIndex(c => c.id === snapshot.key)
            if (existing >= 0) {
              const updated = [...prev]
              updated[existing] = { id: snapshot.key, ...chatData }
              return updated
            }
            return [{ id: snapshot.key, ...chatData }, ...prev]
          })
        }
      })
      return () => unsubscribe()
    } catch (e) {
      console.warn('Chat listener failed:', e.message)
    }
  }, [user])

  const createChat = async (participantId, propertyId) => {
    if (!user) return null
    try {
      const chatId = [user.uid, participantId].sort().join('_')
      const chatRef = ref(rtdb, `chats/${chatId}`)
      await set(chatRef, {
        participants: [user.uid, participantId],
        propertyId: propertyId || '',
        createdAt: Date.now(),
        lastMessage: '',
        lastMessageTime: Date.now(),
        lastSender: user.uid,
      })
      const userChatRef = ref(rtdb, `userChats/${user.uid}/${chatId}`)
      await set(userChatRef, {
        participantId,
        propertyId: propertyId || '',
        lastMessage: '',
        lastMessageTime: Date.now(),
      })
      const participantChatRef = ref(rtdb, `userChats/${participantId}/${chatId}`)
      await set(participantChatRef, {
        participantId: user.uid,
        propertyId: propertyId || '',
        lastMessage: '',
        lastMessageTime: Date.now(),
      })
      return chatId
    } catch (error) {
      console.error('Error creating chat:', error)
      return null
    }
  }

  const sendMessage = async (chatId, text, type = 'text') => {
    if (!user || !chatId || !text.trim()) return
    try {
      const messagesRef = ref(rtdb, `messages/${chatId}`)
      const newMessage = {
        senderId: user.uid,
        senderName: userProfile?.displayName || 'User',
        text: text.trim(),
        type,
        timestamp: Date.now(),
        read: false,
      }
      await push(messagesRef, newMessage)
      const chatRef = ref(rtdb, `chats/${chatId}`)
      await set(chatRef, {
        lastMessage: text.trim(),
        lastMessageTime: Date.now(),
        lastSender: user.uid,
      })
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  const loadMessages = useCallback((chatId) => {
    if (!chatId) return
    setLoading(true)
    const messagesRef = query(ref(rtdb, `messages/${chatId}`), orderByChild('timestamp'), limitToLast(50))
    const unsubscribe = onChildAdded(messagesRef, (snapshot) => {
      setMessages(prev => {
        const existing = prev.findIndex(m => m.id === snapshot.key)
        if (existing >= 0) return prev
        return [...prev, { id: snapshot.key, ...snapshot.val() }]
      })
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const value = {
    chats,
    activeChat,
    messages,
    unreadCount,
    loading,
    setActiveChat,
    createChat,
    sendMessage,
    loadMessages,
  }

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export const useChat = () => {
  const context = useContext(ChatContext)
  if (!context) throw new Error('useChat must be used within ChatProvider')
  return context
}
