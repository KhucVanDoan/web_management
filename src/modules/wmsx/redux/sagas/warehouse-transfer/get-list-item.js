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
export const getListItemWarehouseStockApi = (params) => {
  const uri = `v1/items/warehouse-stock`
  return api.get(uri, params)
}
export const getListStorageDateApi = (params) => {
  const uri = `v1/items/${params?.id}/storage-dates?locatorIds=${params?.locatorId}`
  return api.get(uri)
}
export const checkItemWarehouseImport = (params) => {
  const uri = `v1/items/item-warehouses/get-item-destination-warehouse`
  return api.get(uri, params)
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
