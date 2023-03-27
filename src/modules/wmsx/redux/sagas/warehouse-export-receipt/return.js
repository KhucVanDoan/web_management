import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  returnWarehouseExportReceiptByIdFailed,
  returnWarehouseExportReceiptByIdSuccess,
  RETURN_WAREHOUSE_EXPORT_RECEIPT_START,
} from '~/modules/wmsx/redux/actions/warehouse-export-receipt'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const returnWarehouseImportReceiptApi = (params) => {
  const uri = `/v1/sales/sale-order-exports/${params}/return`
  return api.put(uri)
}

function* doReturnWarehouseExportReceipt(action) {
  try {
    const response = yield call(
      returnWarehouseImportReceiptApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(returnWarehouseExportReceiptByIdSuccess(response.payload))

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
    yield put(returnWarehouseExportReceiptByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchReturnWarehouseExportReceipt() {
  yield takeLatest(
    RETURN_WAREHOUSE_EXPORT_RECEIPT_START,
    doReturnWarehouseExportReceipt,
  )
}
