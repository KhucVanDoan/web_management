import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  getDefineWarehouseShelfByIdFailed,
  getDefineWarehouseShelfByIdSuccess,
  GET_DEFINE_WAREHOUSE_SHELF_START,
} from '../../actions/define-warehouse-shelf'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getDefineWarehouseShelfApi = (params) => {
  const uri = `/v1/warehouses/shelfs/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetDefineWarehouseShelf(action) {
  try {
    const response = yield call(getDefineWarehouseShelfApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getDefineWarehouseShelfByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getDefineWarehouseShelfByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetDefineWarehouseShelf() {
  yield takeLatest(GET_DEFINE_WAREHOUSE_SHELF_START, doGetDefineWarehouseShelf)
}
