import { collection, query, where, documentId, getDocs } from 'firebase/firestore'
import { db } from './firebase'
import { FIREBASE_COLLECTIONS } from '../utils/constants'

// Firestore 'in' queries support max 30 values per query, so we chunk.
export async function fetchPropertiesByIds(ids = []) {
  const result = []
  const unique = [...new Set(ids)].filter(Boolean)
  for (let i = 0; i < unique.length; i += 30) {
    const chunk = unique.slice(i, i + 30)
    try {
      const q = query(collection(db, FIREBASE_COLLECTIONS.PROPERTIES), where(documentId(), 'in', chunk))
      const snap = await getDocs(q)
      snap.docs.forEach(d => result.push({ id: d.id, ...d.data() }))
    } catch (e) {
      console.error('fetchPropertiesByIds error:', e)
    }
  }
  return result
}
