import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  searchInventoryStatisticsFailed,
  searchInventoryStatisticsSuccess,
  WMSX_SEARCH_INVENTORIES_STATISTICS_START,
} from '~/modules/wmsx/redux/actions/inventory-statistics'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search warehouse inventoryStatistics API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchInventoryStatisticsApi = (params) => {
  const uri = `/v1/items/warehouse-stock?warehouseId=5`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchInventoryStatistics(action) {
  try {
    const response = yield call(searchInventoryStatisticsApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
        totalStock: response.data.meta.totalStock,
        totalCost: response.data.meta.totalCost,
      }
      // Call callback action if provided
      yield put(searchInventoryStatisticsSuccess(payload))

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
    yield put(searchInventoryStatisticsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search purchased-orders
 */
export default function* watchSearchInventoryStatistics() {
  yield takeLatest(
    WMSX_SEARCH_INVENTORIES_STATISTICS_START,
    doSearchInventoryStatistics,
  )
}
