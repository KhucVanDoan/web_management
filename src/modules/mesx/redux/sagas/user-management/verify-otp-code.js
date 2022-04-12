import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  verifyOTPFailed,
  verifyOTPSuccess,
  VERIFY_OTP_START,
} from '~/modules/mesx/redux/actions/user-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * verify OTP API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const verifyOTPApi = (params) => {
  const uri = `/v1/users/forgot-password/otp`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doVerifyOTP(action) {
  try {
    const response = yield call(verifyOTPApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(verifyOTPSuccess(response.data))
      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(
        'userManagement.verifyOTPSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(verifyOTPFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch verify OTP
 */
export default function* watchVerifyOTP() {
  yield takeLatest(VERIFY_OTP_START, doVerifyOTP)
}
