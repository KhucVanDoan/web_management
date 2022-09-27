import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmWarehouseImportReceiptByIdFailed,
  confirmWarehouseImportReceiptByIdSuccess,
  CONFIRM_WAREHOUSE_IMPORT_RECEIPT_START,
} from '~/modules/wmsx/redux/actions/warehouse-import-receipt'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const confirmWarehouseImportReceiptApi = (params) => {
  const uri = `/v1/sales/purchased-order-imports/${params}/confirm`
  return api.put(uri)
}

function* doConfirmWarehouseImportReceipt(action) {
  try {
    const response = yield call(
      confirmWarehouseImportReceiptApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(confirmWarehouseImportReceiptByIdSuccess(response.payload))

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
    yield put(confirmWarehouseImportReceiptByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchConfirmWarehouseImportReceipt() {
  yield takeLatest(
    CONFIRM_WAREHOUSE_IMPORT_RECEIPT_START,
    doConfirmWarehouseImportReceipt,
  )
}
