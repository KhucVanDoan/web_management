import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  retryDataSyncManagementSuccess,
  retryDataSyncManagementFailed,
  WMSX_RETRY_DATA_SYNC_MANAGEMENT_START,
} from '~/modules/wmsx/redux/actions/data-sync-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const retryDataSyncManagementApi = (params) => {
  const uri = `/v1/datasync/jobs/${params}/retry`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doRetryDataSyncManagement(action) {
  try {
    const response = yield call(retryDataSyncManagementApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(retryDataSyncManagementSuccess(response.payload))

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
    yield put(retryDataSyncManagementFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchRetryDataSyncManagement() {
  yield takeLatest(
    WMSX_RETRY_DATA_SYNC_MANAGEMENT_START,
    doRetryDataSyncManagement,
  )
}
