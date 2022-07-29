export const getSessionItem = (key) =>
  JSON.parse(window.sessionStorage.getItem(key))
export const setSessionItem = (key, value) => {
  window.sessionStorage.setItem(key, JSON.stringify(value))
}

export const getLocalItem = (key) => {
  const data = window.localStorage.getItem(key)

  if (!!data && data !== 'undefined') {
    return JSON.parse(data)
  }

  return data
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
