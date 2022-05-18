import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  searchWarehouseReportsFailed,
  searchWarehouseReportsSuccess,
  WMSX_SEARCH_WAREHOUSE_REPORTS_START,
} from '~/modules/wmsx/redux/actions/warehouse-report'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchWarehouseReportsApi = (params) => {
  const uri = `/v1/warehouses/reports`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchWarehouseReports(action) {
  try {
    const response = yield call(searchWarehouseReportsApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchWarehouseReportsSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchWarehouseReportsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchSearchWarehouseReports() {
  yield takeLatest(
    WMSX_SEARCH_WAREHOUSE_REPORTS_START,
    doSearchWarehouseReports,
  )
}