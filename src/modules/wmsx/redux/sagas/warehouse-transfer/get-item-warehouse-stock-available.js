import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getItemWarehouseStockAvailableFailed,
  getItemWarehouseStockAvailableSuccess,
  ITEM_WAREHOUSE_STOCK_AVAILABLE_START,
} from '~/modules/wmsx/redux/actions/warehouse-transfer'
import { api } from '~/services/api'

/**
 * Get list item warehouse stock
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getItemWarehouseStockAvailableApi = (payload) => {
  const uri = `/v1/items/item-warehouses/stock-available`
  return api.post(uri, payload)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetItemWarehouseStockAvailable(action) {
  try {
    const response = yield call(
      getItemWarehouseStockAvailableApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(getItemWarehouseStockAvailableSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getItemWarehouseStockAvailableFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetItemWarehouseStockAvailable() {
  yield takeLatest(
    ITEM_WAREHOUSE_STOCK_AVAILABLE_START,
    doGetItemWarehouseStockAvailable,
  )
}
