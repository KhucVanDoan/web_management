import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getInventoryDetailFailed,
  getInventoryDetailSuccess,
  WMSX_INVENTORY_DETAIL_START,
} from '~/modules/wmsx/redux/actions/inventory'
import { api } from '~/services/api'

/**
 * Search warehouse inventoryWarning API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getInventoryApiDetail = (params) => {
  const uri = `/v1/warehouses/inventories/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetInventoryDetail(action) {
  try {
    const response = yield call(getInventoryApiDetail, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getInventoryDetailSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getInventoryDetailFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search purchased-orders
 */
export default function* watchSearchInventoryDetail() {
  yield takeLatest(WMSX_INVENTORY_DETAIL_START, doGetInventoryDetail)
}
