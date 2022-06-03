import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteWarehouseTransferFailed,
  deleteWarehouseTransferSuccess,
  DELETE_WAREHOUSE_TRANSFER_START,
} from '~/modules/wmsx/redux/actions/warehouse-transfer'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Delete warehouse transfer
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteWarehouseTransferApi = (params) => {
  const uri = `/v1/warehouses/transfers/${params}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteWarehouseTransfer(action) {
  try {
    const response = yield call(deleteWarehouseTransferApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteWarehouseTransferSuccess(response.data))

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
    yield put(deleteWarehouseTransferFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch delete warehouse area
 */
export default function* watchDeleteWarehouseTransfer() {
  yield takeLatest(DELETE_WAREHOUSE_TRANSFER_START, doDeleteWarehouseTransfer)
}
