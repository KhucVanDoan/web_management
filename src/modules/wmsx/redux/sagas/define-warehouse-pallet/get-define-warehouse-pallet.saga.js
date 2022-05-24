import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  getDefineWarehousePalletByIdFailed,
  getDefineWarehousePalletByIdSuccess,
  GET_DEFINE_WAREHOUSE_PALLET_START,
} from '../../actions/define-warehouse-pallet'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getDefineWarehousePalletApi = (params) => {
  const uri = `/v1/warehouses/floors/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetDefineWarehousePallet(action) {
  try {
    const response = yield call(getDefineWarehousePalletApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getDefineWarehousePalletByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getDefineWarehousePalletByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetDefineWarehousePallet() {
  yield takeLatest(
    GET_DEFINE_WAREHOUSE_PALLET_START,
    doGetDefineWarehousePallet,
  )
}
