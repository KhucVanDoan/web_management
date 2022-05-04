import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  getWarehouseDetailsByIdFailed,
  getWarehouseDetailsByIdSuccess,
  WMSX_GET_WAREHOUSE_DETAILS_START,
} from '../../actions/define-warehouse'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getWarehouseDetailsApi = (params) => {
  const uri = `/v1/warehouses/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetWarehouseDetails(action) {
  try {
    const response = yield call(getWarehouseDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getWarehouseDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getWarehouseDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetWarehouseDetails() {
  yield takeLatest(WMSX_GET_WAREHOUSE_DETAILS_START, doGetWarehouseDetails)
}
