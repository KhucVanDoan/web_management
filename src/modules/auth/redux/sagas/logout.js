import { put, takeLatest } from 'redux-saga/effects'
import Cookies from 'universal-cookie'

import { CONFIG_COOKIES } from '~/common/constants'
import { redirectRouter } from '~/utils'

import { logoutFailed, logoutSuccess, LOGOUT_START } from '../actions/auth'
const cookies = new Cookies()
/**
 * Handle get data request and response
 * @param {object} action
 */
function* doLogout(action) {
  try {
    // remove token info from cookies
    cookies.remove('token', CONFIG_COOKIES)
    cookies.remove('refreshToken', CONFIG_COOKIES)
    cookies.remove('userId', CONFIG_COOKIES)

    // Remove token from local storage
    localStorage.removeItem('token')

    // Save refresh token from local storage
    localStorage.removeItem('refreshToken')

    yield put(logoutSuccess())
    const callbackUrl = action?.callbackUrl
    const params = new URLSearchParams({ callbackUrl }).toString()

    // Redirect to home
    callbackUrl ? redirectRouter(`/login?${params}`) : redirectRouter('/login')
  } catch (error) {
    yield put(logoutFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchLogout() {
  yield takeLatest(LOGOUT_START, doLogout)
}
