import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  changePasswordFailed,
  changePasswordSuccess,
  CHANGE_PASSWORD_START,
} from '~/modules/configuration/redux/actions/user-info'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const changePasswordApi = (params) => {
  const uri = `/v1/users/change-password-me`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doChangePassword(action) {
  try {
    const response = yield call(changePasswordApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(changePasswordSuccess(response.data))

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
    yield put(changePasswordFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch change password
 */
export default function* watchChangePassword() {
  yield takeLatest(CHANGE_PASSWORD_START, doChangePassword)
}
