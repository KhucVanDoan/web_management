export const localGet = (key) => JSON.parse(window.localStorage.getItem(key))
export const localSet = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}
export const clear = (key) => {
  window.localStorage.removeItem(key)
}

export const sessionGet = (key) =>
  JSON.parse(window.sessionStorage.getItem(key))
export const sessionSet = (key, value) => {
  window.sessionStorage.setItem(key, JSON.stringify(value))
}

export default {
  localGet,
  localSet,
  clear,
  sessionGet,
  sessionSet,
}
