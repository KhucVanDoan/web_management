import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  rejectWarehouseTransferByIdFailed,
  rejectWarehouseTransferByIdSuccess,
  REJECT_WAREHOUSE_TRANSFER_START,
} from '~/modules/wmsx/redux/actions/warehouse-transfer'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Reject warehouse transfer
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const rejectWarehouseTransferApi = (params) => {
  const uri = `/v1/warehouses/transfers/${params}/reject`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doRejectWarehouseTransfer(action) {
  try {
    const response = yield call(rejectWarehouseTransferApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(rejectWarehouseTransferByIdSuccess(response.payload))

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
    yield put(rejectWarehouseTransferByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchRejectWarehouseTransfer() {
  yield takeLatest(REJECT_WAREHOUSE_TRANSFER_START, doRejectWarehouseTransfer)
}
