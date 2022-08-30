import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteReasonManagementSuccess,
  deleteReasonManagementFailed,
  DELETE_REASON_MANAGEMENT_START,
} from '~/modules/wmsx/redux/actions/reason-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteApi = (params) => {
  const uri = `/v1/sales/reasons/${params}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDelete(action) {
  try {
    const response = yield call(deleteApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteReasonManagementSuccess(response.results))

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
    yield put(deleteReasonManagementFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchDeleteReasonManagement() {
  yield takeLatest(DELETE_REASON_MANAGEMENT_START, doDelete)
}
