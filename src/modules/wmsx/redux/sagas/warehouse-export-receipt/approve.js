import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  approveWarehouseSuccess,
  approveWarehouseFailed,
  APPROVE_WAREHOUSE_EXPORT_RECEIPT_START,
} from '~/modules/wmsx/redux/actions/warehouse-export-receipt'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

export const approveWarehouseExportReceiptApi = (params) => {
  const uri = `/v1/sales/sale-order-exports/${params}/approve`
  return api.put(uri)
}

function* doApproveWarehouseExportReceipt(action) {
  try {
    const response = yield call(
      approveWarehouseExportReceiptApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(approveWarehouseSuccess(response.payload))

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
    yield put(approveWarehouseFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchApproveWarehouseExportReceipt() {
  yield takeLatest(
    APPROVE_WAREHOUSE_EXPORT_RECEIPT_START,
    doApproveWarehouseExportReceipt,
  )
}
