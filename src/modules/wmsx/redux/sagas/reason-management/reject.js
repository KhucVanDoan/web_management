import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  rejectReasonManagementByIdFailed,
  rejectReasonManagementByIdSuccess,
  WMSX_REJECT_REASON_MANAGEMENT_START,
} from '../../actions/reason-management'

/**
 * Reject production order
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const rejectReasonManagementApi = (params) => {
  const uri = `/v1/sales/reasons/${params}/reject`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doRejectReasonManagement(action) {
  try {
    const response = yield call(rejectReasonManagementApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(rejectReasonManagementByIdSuccess(response.payload))

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
    yield put(rejectReasonManagementByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchRejectReasonManagement() {
  yield takeLatest(
    WMSX_REJECT_REASON_MANAGEMENT_START,
    doRejectReasonManagement,
  )
}
