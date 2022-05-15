import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  searchWarehousesFailed,
  searchWarehousesSuccess,
  WMSX_SEARCH_WAREHOUSES_START,
} from '../../actions/define-warehouse'

/**
 * Search warehouse API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const searchWarehousesApi = (params) => {
  const uri = `/v1/warehouses/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchWarehouses(action) {
  try {
    const response = yield call(searchWarehousesApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchWarehousesSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchWarehousesFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search warehouses
 */
export default function* watchSearchWarehouses() {
  yield takeLatest(WMSX_SEARCH_WAREHOUSES_START, doSearchWarehouses)
}
