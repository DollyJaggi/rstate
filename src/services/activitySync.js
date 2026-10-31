import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore'
import { db } from './firebase'
import { FIREBASE_COLLECTIONS } from '../utils/constants'

// Per-user activity stored on the Firestore user doc -> same across devices.
export async function fetchUserActivity(uid) {
  const snap = await getDoc(doc(db, FIREBASE_COLLECTIONS.USERS, uid))
  const data = snap.data() || {}
  return {
    savedIds: data.savedProperties || [],
    viewedIds: data.viewedProperties || [],
    visits: data.visits || [],
  }
}

export async function syncViewed(uid, propertyId) {
  try {
    await updateDoc(doc(db, FIREBASE_COLLECTIONS.USERS, uid), {
      viewedProperties: arrayUnion(propertyId),
    })
  } catch (e) {
    console.error('syncViewed failed:', e)
  }
}

export async function syncVisit(uid, propertyId) {
  try {
    await updateDoc(doc(db, FIREBASE_COLLECTIONS.USERS, uid), {
      visits: arrayUnion({ propertyId, date: new Date().toISOString() }),
    })
  } catch (e) {
    console.error('syncVisit failed:', e)
  }
}
