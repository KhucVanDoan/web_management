import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteWarehouseReportFailed,
  deleteWarehouseReportSuccess,
  WMSX_DELETE_WAREHOUSE_REPORT_START,
} from '~/modules/wmsx/redux/actions/warehouse-report'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteWarehouseReportApi = (params) => {
  const uri = `/v1/warehouses/reports/${params}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteWarehouseReport(action) {
  try {
    const response = yield call(deleteWarehouseReportApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteWarehouseReportSuccess(response.results))

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
    yield put(deleteWarehouseReportFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchDeleteWarehouseReport() {
  yield takeLatest(WMSX_DELETE_WAREHOUSE_REPORT_START, doDeleteWarehouseReport)
}
