/**
 * Check user is logged in
 * @returns {boolean}
 */
export const isAuth = () => {
  const localToken = localStorage.getItem('token')
  let isAuth = false
  if (localToken) {
    isAuth = true
  }
  return isAuth
}
