import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  searchDefineWarehouseShelfFailed,
  searchDefineWarehouseShelfSuccess,
  SEARCH_DEFINE_WAREHOUSE_SHELF_START,
} from '../../actions/define-warehouse-shelf'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const searchDefineWarehouseShelfApi = (params) => {
  const uri = `/v1/warehouses/shelfs/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchDefineWarehouseShelf(action) {
  try {
    const response = yield call(searchDefineWarehouseShelfApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      // Call callback action if provided
      yield put(searchDefineWarehouseShelfSuccess(payload))
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchDefineWarehouseShelfFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchSearchDefineWarehouseShelf() {
  yield takeLatest(
    SEARCH_DEFINE_WAREHOUSE_SHELF_START,
    doSearchDefineWarehouseShelf,
  )
}
