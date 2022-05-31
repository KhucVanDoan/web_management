import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getLotNumberListFailed,
  getLotNumberListSuccess,
  GET_LOT_NUMBER_LIST_START,
} from '~/modules/wmsx/redux/actions/purchased-orders-import'
import { api } from '~/services/api'

/**
 * Get lot number list
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getPOImpLotNumberListApi = (payload) => {
  const uri = `/v1/sales/purchased-order/items/lots`
  return api.get(uri, payload)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetPOImpLotNumberList(action) {
  try {
    const response = yield call(getPOImpLotNumberListApi, action?.payload)

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
export default function* watchGetPOImpLotNumberList() {
  yield takeLatest(GET_LOT_NUMBER_LIST_START, doGetPOImpLotNumberList)
}
