import mockSubjects from './mockSubjects'

const storageKey = 'studora-subjects'

export function slugifySubject(name) {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export function loadSubjects() {
  try {
    const savedSubjects = window.localStorage.getItem(storageKey)
    if (savedSubjects === null) return mockSubjects

    const parsedSubjects = JSON.parse(savedSubjects)
    if (!Array.isArray(parsedSubjects)) {
      throw new Error('Saved subjects must be an array.')
    }

    return parsedSubjects
  } catch (error) {
    console.error('Could not load saved subjects:', error)
    return mockSubjects
  }
}

export function saveSubjects(subjects) {
  window.localStorage.setItem(storageKey, JSON.stringify(subjects))
}
