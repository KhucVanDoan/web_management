import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  getWarehouseDetailsCanvasByIdFailed,
  getWarehouseDetailsCanvasByIdSuccess,
  GET_WAREHOUSE_DETAILS_CANVAS_START,
} from '../../actions/define-warehouse'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getWarehouseDetailCanvasApi = (params) => {
  const uri = `/v1/warehouses/${params}/structure-design`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetWarehouseDetailsCanvas(action) {
  try {
    const response = yield call(getWarehouseDetailCanvasApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getWarehouseDetailsCanvasByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getWarehouseDetailsCanvasByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetWarehouseDetailsCanvas() {
  yield takeLatest(
    GET_WAREHOUSE_DETAILS_CANVAS_START,
    doGetWarehouseDetailsCanvas,
  )
}
