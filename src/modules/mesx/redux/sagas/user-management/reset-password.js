import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  resetPasswordFailed,
  resetPasswordSuccess,
  RESET_PASSWORD_START,
} from '~/modules/mesx/redux/actions/user-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * reset password API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const resetPasswordApi = (params) => {
  const uri = `/v1/users/forgot-password/password`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doResetPassword(action) {
  try {
    const response = yield call(resetPasswordApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(resetPasswordSuccess(response.data))
      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(resetPasswordFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch verify OTP
 */
export default function* watchResetPassword() {
  yield takeLatest(RESET_PASSWORD_START, doResetPassword)
}
