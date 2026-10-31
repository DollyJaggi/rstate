const STORAGE_KEY = 'rstate_projects'

const defaultProjects = [
  { id: 'p1', name: 'Green Valley Heights', builder: 'Prestige Group', location: 'Whitefield, Bangalore', type: 'Apartment', units: 240, price: '₹65L onwards', status: 'Ongoing', image: '🏗️', possession: 'Dec 2027' },
  { id: 'p2', name: 'Royal Palm Residency', builder: 'DLF Limited', location: 'Gurgaon Sector 67', type: 'Villa', units: 120, price: '₹1.5Cr onwards', status: 'Ongoing', image: '🏘️', possession: 'Jun 2028' },
  { id: 'p3', name: 'Lake View Towers', builder: 'Godrej Properties', location: 'Powai, Mumbai', type: 'Apartment', units: 360, price: '₹1.2Cr onwards', status: 'New Launch', image: '🌆', possession: 'Mar 2029' },
  { id: 'p4', name: 'Sunset Bliss', builder: 'Lodha Group', location: 'Thane West, Mumbai', type: 'Apartment', units: 180, price: '₹45L onwards', status: 'Ongoing', image: '🌇', possession: 'Aug 2027' },
]

function getAll() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch (e) {
    console.warn('localStorage read error:', e)
  }
  return null
}

export function loadProjects() {
  const stored = getAll()
  if (stored) return stored
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProjects))
    return [...defaultProjects]
  } catch (e) {
    console.warn('localStorage init error:', e)
    return [...defaultProjects]
  }
}

export function addProject(data) {
  try {
    const projects = getAll() || [...defaultProjects]
    const newProject = { ...data, id: 'proj-' + Date.now() }
    projects.push(newProject)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
    return newProject
  } catch (e) {
    console.error('addProject error:', e)
    return null
  }
}

export function updateProject(id, data) {
  try {
    let projects = getAll() || [...defaultProjects]
    const idx = projects.findIndex(p => p.id === id)
    if (idx === -1) { console.warn('Project not found:', id); return }
    projects[idx] = { ...projects[idx], ...data }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
  } catch (e) {
    console.error('updateProject error:', e)
  }
}

export function deleteProject(id) {
  try {
    let projects = getAll() || [...defaultProjects]
    projects = projects.filter(p => p.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
  } catch (e) {
    console.error('deleteProject error:', e)
  }
}
