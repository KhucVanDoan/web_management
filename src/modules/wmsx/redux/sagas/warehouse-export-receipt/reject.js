import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  rejectWarehouseExportReceiptByIdFailed,
  rejectWarehouseExportReceiptByIdSuccess,
  REJECT_WAREHOUSE_EXPORT_RECEIPT_START,
} from '~/modules/wmsx/redux/actions/warehouse-export-receipt'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const rejectWarehouseExportReceiptApi = (params) => {
  const uri = `/v1/sales/sale-order-exports/${params}/reject`
  return api.put(uri)
}

function* doRejectWarehouseExportReceipt(action) {
  try {
    const response = yield call(
      rejectWarehouseExportReceiptApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(rejectWarehouseExportReceiptByIdSuccess(response.payload))

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
    yield put(rejectWarehouseExportReceiptByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchRejectWarehouseExportReceipt() {
  yield takeLatest(
    REJECT_WAREHOUSE_EXPORT_RECEIPT_START,
    doRejectWarehouseExportReceipt,
  )
}
