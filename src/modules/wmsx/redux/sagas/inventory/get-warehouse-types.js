import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getWarehouseTypeFailed,
  getWarehouseTypeSuccess,
  WMSX_GET_WAREHOUSE_TYPE_START,
} from '~/modules/wmsx/redux/actions/inventory'
import { api } from '~/services/api'

/**
 * Search warehouse inventoryWarning API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getWarehouseTypeApi = (params) => {
  const uri = `/v1/warehouses/warehouse-types`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetWarehouseType(action) {
  try {
    const response = yield call(getWarehouseTypeApi, action?.payload)

    if (response?.statusCode === 200) {
      // Call callback action if provided
      yield put(getWarehouseTypeSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getWarehouseTypeFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search purchased-orders
 */
export default function* watchGetWarehouseType() {
  yield takeLatest(WMSX_GET_WAREHOUSE_TYPE_START, doGetWarehouseType)
}
