import { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  reload,
  applyActionCode,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth'
import { doc, setDoc, getDoc, updateDoc, collection, query, where, getDocs, serverTimestamp } from 'firebase/firestore'
import { auth, db, googleProvider, signInWithPopup } from '../services/firebase'
import { ROLES, FIREBASE_COLLECTIONS } from '../utils/constants'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser)
      if (firebaseUser) {
        await fetchUserProfile(firebaseUser.uid)
      } else {
        setUserProfile(null)
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const fetchUserProfile = async (uid) => {
    try {
      const docRef = doc(db, FIREBASE_COLLECTIONS.USERS, uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const data = docSnap.data()
        const email = auth.currentUser?.email || ''
        const isAdminEmail = email === 'admin@rstate.in' || email === 'punjabfoodsrte@gmail.com'
        if (isAdminEmail && data.role !== ROLES.ADMIN) {
          await updateDoc(docRef, { role: ROLES.ADMIN })
          data.role = ROLES.ADMIN
        }
        const profile = { id: uid, ...data }
        setUserProfile(profile)
        return profile
      } else {
        const email = auth.currentUser?.email || ''
        const isAdminEmail = email === 'admin@rstate.in' || email === 'punjabfoodsrte@gmail.com'
        const userData = {
          uid,
          email,
          displayName: auth.currentUser?.displayName || '',
          phone: auth.currentUser?.phoneNumber || '',
          photoURL: auth.currentUser?.photoURL || '',
          role: isAdminEmail ? ROLES.ADMIN : ROLES.BUYER,
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
          isVerified: false,
          isActive: true,
          subscription: 'basic',
          preferences: {},
          savedProperties: [],
        }
        await setDoc(docRef, userData)
        const profile = { id: uid, ...userData }
        setUserProfile(profile)
        return profile
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
      return null
    }
  }

  const register = async (email, password, name, role = ROLES.BUYER) => {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(result.user, { displayName: name })
    await setDoc(doc(db, FIREBASE_COLLECTIONS.USERS, result.user.uid), {
      uid: result.user.uid,
      email,
      displayName: name,
      phone: '',
      photoURL: '',
      role,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      isVerified: false,
      isActive: true,
      subscription: 'basic',
      preferences: {},
    })
    setUserProfile({
      id: result.user.uid,
      email,
      displayName: name,
      phone: '',
      photoURL: '',
      role,
      isVerified: false,
      isActive: true,
      subscription: 'basic',
      preferences: {},
    })
    return result.user
  }

  const login = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password)
    const profile = await fetchUserProfile(result.user.uid)
    return { user: result.user, profile }
  }

  const loginWithGoogle = async (role = ROLES.BUYER) => {
    googleProvider.setCustomParameters({ prompt: 'select_account' })
    const result = await signInWithPopup(auth, googleProvider)
    const uid = result.user.uid
    const email = result.user.email
    const userDocRef = doc(db, FIREBASE_COLLECTIONS.USERS, uid)
    const userDoc = await getDoc(userDocRef)

    let inheritedData = null
    if (!userDoc.exists() && email) {
      const q = query(collection(db, FIREBASE_COLLECTIONS.USERS), where('email', '==', email))
      const snap = await getDocs(q)
      if (!snap.empty) {
        inheritedData = snap.docs[0].data()
      }
    }

    const isNewAccount = !userDoc.exists() && !inheritedData
    const effectiveRole = inheritedData?.role || role

    if (userDoc.exists()) {
      await setDoc(userDocRef, {
        lastLogin: serverTimestamp(),
      }, { merge: true })
    } else if (inheritedData) {
      await setDoc(userDocRef, {
        uid,
        email,
        displayName: result.user.displayName || inheritedData.displayName || '',
        phone: result.user.phoneNumber || inheritedData.phone || '',
        photoURL: result.user.photoURL || inheritedData.photoURL || '',
        role: effectiveRole,
        createdAt: inheritedData.createdAt || serverTimestamp(),
        lastLogin: serverTimestamp(),
        isVerified: inheritedData.isVerified ?? true,
        isActive: inheritedData.isActive ?? true,
        subscription: inheritedData.subscription || 'basic',
        preferences: inheritedData.preferences || {},
        ...(inheritedData.savedProperties ? { savedProperties: inheritedData.savedProperties } : {}),
        ...(inheritedData.bio ? { bio: inheritedData.bio } : {}),
      })
    } else {
      await setDoc(userDocRef, {
        uid,
        email,
        displayName: result.user.displayName,
        phone: result.user.phoneNumber || '',
        photoURL: result.user.photoURL || '',
        role,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        isVerified: true,
        isActive: true,
        subscription: 'basic',
        preferences: {},
      })
    }
    const profile = await fetchUserProfile(uid)
    return { user: result.user, isNewAccount, profile }
  }

  const logout = async () => {
    await signOut(auth)
    setUser(null)
    setUserProfile(null)
  }

  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email)
  }

  const sendVerificationEmail = async () => {
    const currentUser = auth.currentUser
    if (!currentUser) throw new Error('No authenticated user')
    if (currentUser.emailVerified) return
    await sendEmailVerification(currentUser, {
      url: `${window.location.origin}/verify-email`,
      handleCodeInApp: true,
    })
  }

  const refreshUser = async () => {
    const currentUser = auth.currentUser
    if (!currentUser) return null
    await reload(currentUser)
    setUser({ ...currentUser })
    await fetchUserProfile(currentUser.uid)
    return currentUser
  }

  const verifyEmailCode = async (oobCode) => {
    await applyActionCode(auth, oobCode)
    return refreshUser()
  }

  const setupRecaptcha = (containerId) => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      size: 'invisible',
      callback: () => {},
    })
    return window.recaptchaVerifier
  }

  const sendOTP = async (phoneNumber, recaptchaVerifier) => {
    const confirmation = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
    return confirmation
  }

  const verifyOTP = async (confirmation, code) => {
    const result = await confirmation.confirm(code)
    return result.user
  }

  const registerWithPhone = async (confirmation, code, name, password, role = ROLES.BUYER) => {
    const result = await confirmation.confirm(code)
    const phoneUser = result.user
    const phone = phoneUser.phoneNumber || ''
    const syntheticEmail = `phone_${phone.replace(/[^0-9]/g, '')}@rstate.local`

    await signOut(auth)

    const cred = await createUserWithEmailAndPassword(auth, syntheticEmail, password)
    await updateProfile(cred.user, { displayName: name })
    await setDoc(doc(db, FIREBASE_COLLECTIONS.USERS, cred.user.uid), {
      uid: cred.user.uid,
      email: syntheticEmail,
      displayName: name,
      phone,
      photoURL: '',
      role,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      isVerified: false,
      isActive: true,
      subscription: 'basic',
      preferences: {},
      savedProperties: [],
    })
    await fetchUserProfile(cred.user.uid)
    return cred.user
  }

  const loginWithPhone = async (phone, password) => {
    const q = query(collection(db, FIREBASE_COLLECTIONS.USERS), where('phone', '==', phone))
    const snap = await getDocs(q)
    if (snap.empty) throw new Error('No account found with this phone number')
    const userData = snap.docs[0].data()
    if (!userData.email) throw new Error('No login credentials found for this phone number')
    const result = await signInWithEmailAndPassword(auth, userData.email, password)
    const profile = await fetchUserProfile(result.user.uid)
    return { user: result.user, profile }
  }

  const updateUserRole = async (uid, role) => {
    await setDoc(doc(db, FIREBASE_COLLECTIONS.USERS, uid), { role }, { merge: true })
    setUserProfile(prev => ({ ...prev, role }))
  }

  const updateUserProfile = async (data) => {
    await setDoc(doc(db, FIREBASE_COLLECTIONS.USERS, user.uid), data, { merge: true })
    setUserProfile(prev => ({ ...prev, ...data }))
  }

  const value = {
    user,
    userProfile,
    loading,
    register,
    login,
    loginWithGoogle,
    logout,
    resetPassword,
    sendVerificationEmail,
    refreshUser,
    verifyEmailCode,
    setupRecaptcha,
    sendOTP,
    verifyOTP,
    registerWithPhone,
    loginWithPhone,
    updateUserRole,
    updateUserProfile,
    fetchUserProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
