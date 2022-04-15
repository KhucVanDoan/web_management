/**
 * Check user is logged in
 * @returns {boolean}
 */
import Cookies from 'universal-cookie'

import { CONFIG_COOKIES } from '~/common/constants'
const cookies = new Cookies()

export const isAuth = () => {
  const cookieToken = cookies.get('token')
  const localToken = localStorage.getItem('token')
  const userId = cookies.get('userId')

  let isAuth = false
  if (cookieToken && !localToken) {
    localStorage.setItem('token', cookieToken)
    localStorage.setItem('userId', userId)
    isAuth = true
  }
  if (!cookieToken && localToken) {
    cookies.set('token', token, CONFIG_COOKIES)
    isAuth = true
  }
  if (cookieToken || localToken) {
    isAuth = true
  }
  return isAuth
}
