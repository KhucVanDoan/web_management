export const sessionGet = (key) =>
  JSON.parse(window.sessionStorage.getItem(key))
export const sessionSet = (key, value) => {
  window.sessionStorage.setItem(key, JSON.stringify(value))
}

export default {
  sessionGet,
  sessionSet,
}
