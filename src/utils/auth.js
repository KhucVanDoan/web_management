/**
 * Check user is logged in
 * @returns {boolean}
 */
import Cookies from 'universal-cookie'

import { CONFIG_COOKIES } from '~/common/constants'
const cookies = new Cookies()

export const isAuth = () => {
  const cookieToken = cookies.get('token')
  const cookieRefreshToken = cookies.get('refreshToken')
  const localToken = localStorage.getItem('token')
  const localRefreshToken = localStorage.getItem('refreshToken')

  let isAuth = false
  if (cookieToken && !localToken) {
    localStorage.setItem('token', cookieToken)
    localStorage.setItem('refreshToken', cookieRefreshToken)
    isAuth = true
  }
  if (!cookieToken && localToken) {
    cookies.set('token', localToken, CONFIG_COOKIES)
    cookies.set('refreshToken', localRefreshToken, CONFIG_COOKIES)
    isAuth = true
  }
  if (cookieToken || localToken) {
    isAuth = true
  }
  return isAuth
}
