const isJsonString = (str) => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

export const getSessionItem = (key) => {
  const str = window.sessionStorage.getItem(key)
  if (isJsonString(str)) return JSON.parse(str)
  return undefined
}
export const setSessionItem = (key, value) => {
  window.sessionStorage.setItem(key, JSON.stringify(value))
}

export const getLocalItem = (key) => {
  const str = window.localStorage.getItem(key)
  if (isJsonString(str)) return JSON.parse(str)
  return undefined
}

export const setLocalItem = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export default {
  getSessionItem,
  setSessionItem,
  getLocalItem,
  setLocalItem,
}
