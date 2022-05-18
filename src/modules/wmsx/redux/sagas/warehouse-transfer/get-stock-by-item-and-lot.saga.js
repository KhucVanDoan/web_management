import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getStockByItemAndLotNumberFailed,
  getStockByItemAndLotNumberSuccess,
  GET_STOCK_BY_ITEM_AND_LOT_NUMBER_START,
} from '~/modules/wmsx/redux/actions/warehouse-transfer'
import { api } from '~/services/api'

/**
 * Get stock list
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getStockByItemAndLotNumberApi = (payload) => {
  const uri = `/v1/items/${payload.itemId}/lots`
  return api.get(uri, { keyword: payload.keyword })
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetStockByItemAndLotNumber(action) {
  try {
    const response = yield call(getStockByItemAndLotNumberApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getStockByItemAndLotNumberSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getStockByItemAndLotNumberFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get stock by item
 */
export default function* watchGetStockByItemAndLotNumber() {
  yield takeLatest(
    GET_STOCK_BY_ITEM_AND_LOT_NUMBER_START,
    doGetStockByItemAndLotNumber,
  )
}
