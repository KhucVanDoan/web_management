import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateReasonManagementFailed,
  updateReasonManagementSuccess,
  UPDATE_REASON_MANAGEMENT_START,
} from '~/modules/wmsx/redux/actions/reason-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateReasonManagementApi = (params) => {
  const uri = `/v1/sales/reasons/${params?.id}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateReasonManagement(action) {
  try {
    const response = yield call(updateReasonManagementApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateReasonManagementSuccess(response.results))

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
    yield put(updateReasonManagementFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchUpdateReasonManagement() {
  yield takeLatest(UPDATE_REASON_MANAGEMENT_START, doUpdateReasonManagement)
}
