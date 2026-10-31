import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, PhoneAuthProvider, signInWithPopup } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getDatabase } from 'firebase/database'
import { getMessaging } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyClgZMRUtPywHinq9t37Bm8641jEzOox2A",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "realstate-339cf.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "realstate-339cf",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "realstate-339cf.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "432127506832",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:432127506832:web:df10e3227f644c0cf71b15",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-F1H6P35W4W",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://realstate-339cf-default-rtdb.firebaseio.com",
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)
const rtdb = getDatabase(app)

let messaging = null
try {
  messaging = getMessaging(app)
} catch (e) {
  console.warn('Firebase Messaging not available:', e.message)
}

const googleProvider = new GoogleAuthProvider()
const phoneProvider = new PhoneAuthProvider(auth)

export {
  app,
  auth,
  db,
  storage,
  rtdb,
  messaging,
  googleProvider,
  phoneProvider,
  signInWithPopup,
}
