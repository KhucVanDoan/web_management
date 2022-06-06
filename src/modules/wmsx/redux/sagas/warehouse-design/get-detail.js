import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  getWarehouseDesignFailed,
  getWarehouseDesignSuccess,
  GET_WAREHOUSE_DESIGN_START,
} from '../../actions/warehouse-design'

/**
 * get warehouse design
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getWarehouseDesignApi = (params) => {
  const uri = `/v1/warehouses/${params}/design`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetWarehouseDesign(action) {
  try {
    const response = yield call(getWarehouseDesignApi, action?.payload)
    if (response?.statusCode === 200) {
      yield put(getWarehouseDesignSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getWarehouseDesignFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get warehouse deisgn
 */
export default function* watchGetWarehouseDesign() {
  yield takeLatest(GET_WAREHOUSE_DESIGN_START, doGetWarehouseDesign)
}
