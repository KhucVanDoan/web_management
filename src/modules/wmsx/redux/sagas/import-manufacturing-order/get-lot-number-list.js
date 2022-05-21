import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  getLotNumberListFailed,
  getLotNumberListSuccess,
  WMSX_GET_LOT_NUMBER_LIST_START,
} from '../../actions/import-manufacturing-order'

/**
 * Get lot number list
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getLotNumberListApi = (payload) => {
  const uri = `/v1/sales/import-orders/items/lots`
  return api.get(uri, payload)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetLotNumberList(action) {
  try {
    const response = yield call(getLotNumberListApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getLotNumberListSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getLotNumberListFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetLotNumberList() {
  yield takeLatest(WMSX_GET_LOT_NUMBER_LIST_START, doGetLotNumberList)
}
