import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  cancelWarehouseTransferEBSFailed,
  cancelWarehouseTransferEBSSuccess,
  CANCEL_WAREHOUSE_TRANSFER_EBS_START,
} from '~/modules/wmsx/redux/actions/warehouse-transfer'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Confirm warehouse transfer
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const cancelWarehouseTransferEbsApi = (params) => {
  const uri = `/v1/warehouses/transfers/${params}/cancel-sync`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCancelWarehouseTransferEBS(action) {
  try {
    const response = yield call(cancelWarehouseTransferEbsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(cancelWarehouseTransferEBSSuccess(response.payload))

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
    yield put(cancelWarehouseTransferEBSFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCancelWarehouseTransferEBS() {
  yield takeLatest(
    CANCEL_WAREHOUSE_TRANSFER_EBS_START,
    doCancelWarehouseTransferEBS,
  )
}
