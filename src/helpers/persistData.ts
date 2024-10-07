export const persistData = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data))
}

export const getPersistData = (key: string) => {
  return localStorage.getItem(key)
}

export const removePersistData = (key: string) => {
  localStorage.removeItem(key)
}
