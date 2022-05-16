import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getWarehouseTransferMovementsDetailsByIdFailed,
  getWarehouseTransferMovementsDetailsByIdSuccess,
  WMSX_GET_WAREHOUSE_TRANSFER_MOVEMENT_DETAILS_START,
} from '~/modules/wmsx/redux/actions/warehouse-transfer-movements'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getWarehouseTransferMovementsDetailsApi = (params) => {
  const uri = `/v1/warehouses/movements/${params}/mobile`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetWarehouseTransferMovementsDetails(action) {
  try {
    const response = yield call(
      getWarehouseTransferMovementsDetailsApi,
      action?.payload,
    )
    if (response?.statusCode === 200) {
      yield put(getWarehouseTransferMovementsDetailsByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getWarehouseTransferMovementsDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetWarehouseTransferMovementsDetails() {
  yield takeLatest(
    WMSX_GET_WAREHOUSE_TRANSFER_MOVEMENT_DETAILS_START,
    doGetWarehouseTransferMovementsDetails,
  )
}
