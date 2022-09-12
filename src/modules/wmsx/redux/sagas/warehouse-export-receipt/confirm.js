import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmWarehouseExportReceiptByIdFailed,
  confirmWarehouseExportReceiptByIdSuccess,
  CONFIRM_WAREHOUSE_EXPORT_RECEIPT_START,
} from '~/modules/wmsx/redux/actions/warehouse-export-receipt'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const confirmWarehouseExportReceiptApi = () => {
  const uri = ``
  return api.put(uri)
}

function* doConfirmWarehouseExportReceipt(action) {
  try {
    const response = yield call(
      confirmWarehouseExportReceiptApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(confirmWarehouseExportReceiptByIdSuccess(response.payload))

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
    yield put(confirmWarehouseExportReceiptByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchConfirmWarehouseExportReceipt() {
  yield takeLatest(
    CONFIRM_WAREHOUSE_EXPORT_RECEIPT_START,
    doConfirmWarehouseExportReceipt,
  )
}
