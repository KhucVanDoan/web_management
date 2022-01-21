const storage = {
  get: (key) => JSON.parse(window.localStorage.getItem(key)),
  set: (key, value) => {
    window.localStorage.setItem(key, JSON.stringify(value))
  },
  clear: (key) => {
    window.localStorage.removeItem(key)
  },
  sessionGet: (key) => JSON.parse(window.sessionStorage.getItem(key)),
  sessionSet: (key, value) => {
    window.sessionStorage.setItem(key, JSON.stringify(value))
  },
}

export default storage
