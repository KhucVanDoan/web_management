import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  generateOTPFailed,
  generateOTPSuccess,
  GENERATE_OTP_START,
} from '~/modules/mesx/redux/actions/user-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Generate OTP API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const generateOTPApi = (params) => {
  const uri = `/v1/users/forgot-password/generate`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGenerateOTP(action) {
  try {
    const response = yield call(generateOTPApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(generateOTPSuccess(response.data))
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
    yield put(generateOTPFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search production-orders
 */
export default function* watchGenerateOTP() {
  yield takeLatest(GENERATE_OTP_START, doGenerateOTP)
}
