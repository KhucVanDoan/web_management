import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  rejectUserByIdFailed,
  rejectUserByIdSuccess,
  REJECT_USER_START,
} from '../../actions/user-management'

/**
 * Reject production order
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const rejectUserApi = (params) => {
  const uri = `/v1/users/${params}/reject`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doRejectUser(action) {
  try {
    const response = yield call(rejectUserApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(rejectUserByIdSuccess(response.payload))

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
    yield put(rejectUserByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchRejectUser() {
  yield takeLatest(REJECT_USER_START, doRejectUser)
}
