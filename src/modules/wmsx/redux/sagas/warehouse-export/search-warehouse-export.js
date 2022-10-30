import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  searchWarehouseExportFailed,
  searchWarehouseExportSuccess,
  WMSX_SEARCH_WAREHOUSE_EXPORT_START,
} from '~/modules/wmsx/redux/actions/warehouse-export'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
/**
 * Search warehouse movements API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchWarehouseExportApi = (params) => {
  const uri = `/v1/warehouses/movements/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchWarehouseExport(action) {
  try {
    const response = yield call(searchWarehouseExportApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchWarehouseExportSuccess(payload))

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
    yield put(searchWarehouseExportFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search purchased-orders
 */
export default function* watchSearchWarehouseExport() {
  yield takeLatest(WMSX_SEARCH_WAREHOUSE_EXPORT_START, doSearchWarehouseExport)
}
