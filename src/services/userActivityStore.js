const STORAGE_KEY = 'rstate_user_activity'

function getActivity() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch (e) {
    console.warn('activity read error:', e)
  }
  return { savedIds: [], viewedIds: [], visits: [] }
}

function saveActivity(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (e) {
    console.warn('activity write error:', e)
  }
}

export function getSavedIds() {
  return getActivity().savedIds
}

export function getViewedIds() {
  return getActivity().viewedIds
}

export function getVisitCount() {
  return getActivity().visits.length
}

export function isSaved(id) {
  return getActivity().savedIds.includes(id)
}

export function toggleSave(id) {
  const data = getActivity()
  const idx = data.savedIds.indexOf(id)
  if (idx === -1) {
    data.savedIds.push(id)
  } else {
    data.savedIds.splice(idx, 1)
  }
  saveActivity(data)
  return idx === -1
}

export function trackView(id) {
  const data = getActivity()
  if (!data.viewedIds.includes(id)) {
    data.viewedIds.push(id)
    saveActivity(data)
  }
}

export function trackVisit(id) {
  const data = getActivity()
  data.visits.push({ propertyId: id, date: new Date().toISOString() })
  saveActivity(data)
}
