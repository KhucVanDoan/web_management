import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getLotNumberListWarehouseTransferFailed,
  getLotNumberListWarehouseTransferSuccess,
  GET_LOT_NUMBER_LIST_WAREHOUSE_TRANSFER_START,
} from '~/modules/wmsx/redux/actions/warehouse-transfer'
import { api } from '~/services/api'

/**
 * Get lot number list
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getLotNumberListWarehouseTransferApi = (payload) => {
  const uri = `/v1/items/item-stocks/lots`
  return api.get(uri, payload)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetLotNumberListWarehouseTransfer(action) {
  try {
    const response = yield call(
      getLotNumberListWarehouseTransferApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(getLotNumberListWarehouseTransferSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getLotNumberListWarehouseTransferFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetLotNumberListWarehouseTransfer() {
  yield takeLatest(
    GET_LOT_NUMBER_LIST_WAREHOUSE_TRANSFER_START,
    doGetLotNumberListWarehouseTransfer,
  )
}
