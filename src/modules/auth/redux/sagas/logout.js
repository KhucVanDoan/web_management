import { put, takeLatest } from 'redux-saga/effects'

import { redirectRouter } from '~/utils'

import { logoutFailed, logoutSuccess, LOGOUT_START } from '../actions/auth'

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doLogout(action) {
  try {
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
