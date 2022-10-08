import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getListItemWarehouseStockFailed,
  getListItemWarehouseStockSuccess,
  GET_LIST_ITEM_WAREHOUSE_STOCK_START,
} from '~/modules/wmsx/redux/actions/warehouse-transfer'
import { api } from '~/services/api'

/**
 * Get list item warehouse stock
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getListItemWarehouseStockApi = (payload) => {
  const uri = `v1/items/warehouse-stock?warehouseId=${payload}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetListItemWarehouseStock(action) {
  try {
    const response = yield call(getListItemWarehouseStockApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getListItemWarehouseStockSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getListItemWarehouseStockFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetListItemWarehouseStock() {
  yield takeLatest(
    GET_LIST_ITEM_WAREHOUSE_STOCK_START,
    doGetListItemWarehouseStock,
  )
}
