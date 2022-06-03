import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateWarehouseTransferFailed,
  updateWarehouseTransferSuccess,
  UPDATE_WAREHOUSE_TRANSFER_START,
} from '~/modules/wmsx/redux/actions/warehouse-transfer'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Update warehouse transfer API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateWarehouseTransferApi = (params) => {
  const uri = `/v1/warehouses/transfers/${params.id}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateWarehouseTransfer(action) {
  try {
    const response = yield call(updateWarehouseTransferApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateWarehouseTransferSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateWarehouseTransferFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch update warehouse transfer
 */
export default function* watchUpdateWarehouseTransfer() {
  yield takeLatest(UPDATE_WAREHOUSE_TRANSFER_START, doUpdateWarehouseTransfer)
}
