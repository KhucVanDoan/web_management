import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getWarehousesFailed,
  getWarehousesSuccess,
  GET_WAREHOUSES_START,
} from '~/modules/qmsx/redux/actions/common'
import { api } from '~/services/api'

/**
 * Get warehouse API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getWarehousesApi = () => {
  const uri = `/v1/warehouses/list`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetWarehouses(action) {
  try {
    const response = yield call(getWarehousesApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getWarehousesSuccess(response.data.items))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getWarehousesFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get warehouses
 */
export default function* watchGetWarehouses() {
  yield takeLatest(GET_WAREHOUSES_START, doGetWarehouses)
}
