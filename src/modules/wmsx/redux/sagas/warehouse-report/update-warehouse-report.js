import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateWarehouseReportFailed,
  updateWarehouseReportSuccess,
  WMSX_UPDATE_WAREHOUSE_REPORT_START,
} from '~/modules/wmsx/redux/actions/warehouse-report'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateWarehouseReportApi = (params) => {
  const uri = `/v1/warehouses/reports/${params.id}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateWarehouseReport(action) {
  try {
    const response = yield call(updateWarehouseReportApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateWarehouseReportSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(
        'warehouseReport.updateWarehouseReportSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateWarehouseReportFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchUpdateWarehouseReport() {
  yield takeLatest(WMSX_UPDATE_WAREHOUSE_REPORT_START, doUpdateWarehouseReport)
}
