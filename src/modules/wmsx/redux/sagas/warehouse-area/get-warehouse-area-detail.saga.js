import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getWarehouseAreaDetailByIdFailed,
  getWarehouseAreaDetailByIdSuccess,
  GET_WAREHOUSE_AREA_DETAIL_START,
} from '~/modules/wmsx/redux/actions/warehouse-area'
import { api } from '~/services/api'

/**
 * Search WarehouseArea API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getWarehouseAreaDetailsApi = (params) => {
  const uri = `/v1/warehouses/sectors/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetWarehouseAreaDetails(action) {
  try {
    const response = yield call(getWarehouseAreaDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getWarehouseAreaDetailByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getWarehouseAreaDetailByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search WarehouseArea details
 */
export default function* watchGetWarehouseAreaDetail() {
  yield takeLatest(GET_WAREHOUSE_AREA_DETAIL_START, doGetWarehouseAreaDetails)
}
