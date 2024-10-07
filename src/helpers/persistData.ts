export const persistData = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data))
}

export const getPersistData = <T>(key: string): T | null => {
  try {
    const serializedState = localStorage.getItem(key)
    if (serializedState) {
      return JSON.parse(serializedState) as T
    }
  } catch (error) {
    console.error('Failed to load state from localStorage', error)
  }
  return null
}

export const removePersistData = (key: string) => {
  localStorage.removeItem(key)
}
