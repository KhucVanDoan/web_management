export const getSessionItem = (key) =>
  JSON.parse(window.sessionStorage.getItem(key))
export const setSessionItem = (key, value) => {
  window.sessionStorage.setItem(key, JSON.stringify(value))
}
export const getLocalItem = (key) =>
  JSON.parse(window.localStorage.getItem(key))
export const setLocalItem = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export default {
  getSessionItem,
  setSessionItem,
  getLocalItem,
  setLocalItem,
}
