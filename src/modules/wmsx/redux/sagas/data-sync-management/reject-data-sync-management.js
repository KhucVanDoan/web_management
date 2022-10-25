import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  rejectDataSyncManagementSuccess,
  rejectDataSyncManagementFailed,
  WMSX_REJECT_DATA_SYNC_MANAGEMENT_START,
} from '~/modules/wmsx/redux/actions/data-sync-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const rejectDataSyncManagementApi = (params) => {
  const uri = `/v1/warehouses/inventories/${params}/approve`
  return api.post(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doRejectDataSyncManagement(action) {
  try {
    const response = yield call(rejectDataSyncManagementApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(rejectDataSyncManagementSuccess(response.payload))

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
    yield put(rejectDataSyncManagementFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchRejectDataSyncManagement() {
  yield takeLatest(
    WMSX_REJECT_DATA_SYNC_MANAGEMENT_START,
    doRejectDataSyncManagement,
  )
}
