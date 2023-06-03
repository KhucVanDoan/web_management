import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  confirmUserByIdFailed,
  confirmUserByIdSuccess,
  CONFIRM_USER_START,
} from '../../actions/user-management'

/**
 * Confirm production order
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const confirmUserApi = (params) => {
  const uri = `/users/${params}/un-lock`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doConfirmUser(action) {
  try {
    const response = yield call(confirmUserApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmUserByIdSuccess(response.payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(confirmUserByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchConfirmUser() {
  yield takeLatest(CONFIRM_USER_START, doConfirmUser)
}
