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
    localStorage.setItem('token', 'Bearer ' + cookieToken)
    localStorage.setItem('userId', userId)
    isAuth = true
  }
  if (!cookieToken && localToken) {
    const token = localToken.replace('Bearer ', '')
    cookies.set('token', token, CONFIG_COOKIES)
    isAuth = true
  }
  return isAuth
}
