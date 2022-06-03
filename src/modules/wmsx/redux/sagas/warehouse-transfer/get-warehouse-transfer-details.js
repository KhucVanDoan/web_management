import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getWarehouseTransferDetailsByIdFailed,
  getWarehouseTransferDetailsByIdSuccess,
  GET_WAREHOUSE_TRANSFER_DETAILS_START,
} from '~/modules/wmsx/redux/actions/warehouse-transfer'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getWarehouseTransferDetailsApi = (params) => {
  const uri = `/v1/warehouses/transfers/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetWarehouseTransferDetails(action) {
  try {
    const response = yield call(getWarehouseTransferDetailsApi, action?.payload)
    if (response?.statusCode === 200) {
      yield put(getWarehouseTransferDetailsByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getWarehouseTransferDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetWarehouseTransferDetails() {
  yield takeLatest(
    GET_WAREHOUSE_TRANSFER_DETAILS_START,
    doGetWarehouseTransferDetails,
  )
}
