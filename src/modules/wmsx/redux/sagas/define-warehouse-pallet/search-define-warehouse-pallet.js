import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  searchDefineWarehousePalletSuccess,
  searchDefineWarehousePalletFailed,
  SEARCH_DEFINE_WAREHOUSE_PALLET_START,
} from '../../actions/define-warehouse-pallet'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const searchDefineWarehousePalletApi = (params) => {
  const uri = `/v1/warehouses/floors/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchDefineWarehousePallet(action) {
  try {
    const response = yield call(searchDefineWarehousePalletApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      // Call callback action if provided
      yield put(searchDefineWarehousePalletSuccess(payload))
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchDefineWarehousePalletFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchSearchDefineWarehousePallet() {
  yield takeLatest(
    SEARCH_DEFINE_WAREHOUSE_PALLET_START,
    doSearchDefineWarehousePallet,
  )
}
