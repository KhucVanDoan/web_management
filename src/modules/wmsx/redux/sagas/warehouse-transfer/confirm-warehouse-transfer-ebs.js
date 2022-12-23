import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmWarehouseTransferEBSFailed,
  confirmWarehouseTransferEBSSuccess,
  CONFIRM_WAREHOUSE_TRANSFER_EBS_START,
} from '~/modules/wmsx/redux/actions/warehouse-transfer'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Confirm warehouse transfer
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const confirmWarehouseTransferEbsApi = (params) => {
  const uri = `/v1/warehouses/transfers/${params}/sync/to-ebs`
  return api.post(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doConfirmWarehouseTransferEBS(action) {
  try {
    const response = yield call(confirmWarehouseTransferEbsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmWarehouseTransferEBSSuccess(response.payload))

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
    yield put(confirmWarehouseTransferEBSFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchConfirmWarehouseTransferEBS() {
  yield takeLatest(
    CONFIRM_WAREHOUSE_TRANSFER_EBS_START,
    doConfirmWarehouseTransferEBS,
  )
}
