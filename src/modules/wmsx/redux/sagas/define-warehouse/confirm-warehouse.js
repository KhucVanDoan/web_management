import { call, put, takeLatest } from 'redux-saga/effects'

import {
  confirmWarehouseFailed,
  confirmWarehouseSuccess,
  WMSX_CONFIRM_WAREHOUSE_START,
} from '../../actions/define-warehouse'

/**
 * Confirm purchased order
 * @returns {Promise}
 */
const confirmWarehouseApi = () => {
  // const uri = `/v1/warehouse/${params}/confirm`;
  // return api.put(uri);
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doConfirmWarehouse(action) {
  try {
    const response = yield call(confirmWarehouseApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmWarehouseSuccess(response.payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(confirmWarehouseFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchConfirmWarehouse() {
  yield takeLatest(WMSX_CONFIRM_WAREHOUSE_START, doConfirmWarehouse)
}
