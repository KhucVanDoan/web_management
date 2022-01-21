import { call, put, takeLatest } from 'redux-saga/effects'
import { api } from 'services/api'
import { getAppStore } from '../actions/app-store'
import { loginFailed, loginSuccess, LOGIN_START } from '../actions/auth'

/**
 * Login
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const loginApi = (params) => {
  const uri = `/v1/auth/login`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doLogin(action) {
  try {
    const response = yield call(loginApi, action?.payload)
    if (response?.statusCode === 200) {
      const { data } = response
      // Save token to local storage
      localStorage.setItem('token', 'Bearer ' + data.accessToken.token)

      // Save refresh to ken to local storage
      localStorage.setItem('refreshToken', 'Bearer ' + data.refreshToken.token)

      // Save user infomation to local storage
      localStorage.setItem('userInfo', data.userInfo)
      yield put(getAppStore())
      yield put(loginSuccess(response.data.userInfo))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw response?.message
    }
  } catch (error) {
    yield put(loginFailed())
    // Call callback action if provided

    if (action.onError) {
      yield action.onError(error)
    }
  }
}

/**
 * Watch login
 */
export default function* watchLogin() {
  yield takeLatest(LOGIN_START, doLogin)
}
