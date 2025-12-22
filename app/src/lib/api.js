const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080'

export async function saveResult(record){
  const payload = {
    studentId: record.studentId,
    name: record.name,
    answers: record.answers,
    scores: record.scores,
    result: record.result,
  }

  try {
    const res = await fetch(`${API_BASE}/api/results`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error(`Save failed: ${res.status}`)
    return await res.json()
  } catch (err) {
    console.warn('API save failed, fallback to local storage', err)
    const key = 'results'
    const existing = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem(key) || '[]') : []
    existing.push(record)
    if (typeof window !== 'undefined') localStorage.setItem(key, JSON.stringify(existing))
    return { status: 'local-saved', error: err.message }
  }
}

export async function fetchResults(){
  try {
    const res = await fetch(`${API_BASE}/api/results`)
    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`)
    return await res.json()
  } catch (err) {
    console.warn('API fetch failed, fallback to local storage', err)
    if (typeof window === 'undefined') return []
    return JSON.parse(localStorage.getItem('results') || '[]')
  }
}
