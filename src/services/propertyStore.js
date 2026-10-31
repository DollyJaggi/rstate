const STORAGE_KEY = 'rstate_properties'

function getAll() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch (e) {
    console.warn('localStorage read error:', e)
  }
  return null
}

export function loadProperties() {
  const stored = getAll()
  if (stored) {
    const cleaned = stored.filter(p => !p.id?.startsWith('demo-'))
    if (cleaned.length !== stored.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned))
    }
    return cleaned
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify([]))
  return []
}

export function updateProperty(id, data) {
  try {
    let props = getAll() || []
    const idx = props.findIndex(p => p.id === id)
    if (idx === -1) { console.warn('Property not found for update:', id); return }
    props[idx] = { ...props[idx], ...data }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(props))
  } catch (e) {
    console.error('updateProperty error:', e)
  }
}

export function deleteProperty(id) {
  try {
    let props = getAll() || []
    props = props.filter(p => p.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(props))
  } catch (e) {
    console.error('deleteProperty error:', e)
  }
}

export function incrementViews(id) {
  try {
    const props = getAll() || []
    const idx = props.findIndex(p => p.id === id)
    if (idx === -1) return
    props[idx] = { ...props[idx], views: (props[idx].views || 0) + 1 }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(props))
  } catch (e) {
    console.error('incrementViews error:', e)
  }
}

export function incrementLeads(id) {
  try {
    const props = getAll() || []
    const idx = props.findIndex(p => p.id === id)
    if (idx === -1) return
    props[idx] = { ...props[idx], leads: (props[idx].leads || 0) + 1 }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(props))
  } catch (e) {
    console.error('incrementLeads error:', e)
  }
}

export function addProperty(data) {
  try {
    const props = getAll() || []
    const newProp = { ...data, id: 'prop-' + Date.now(), createdAt: new Date().toISOString(), views: 0, saves: 0 }
    props.push(newProp)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(props))
    return newProp
  } catch (e) {
    console.error('addProperty error:', e)
    return null
  }
}
