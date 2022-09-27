import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  rejectWarehouseImportReceiptByIdFailed,
  rejectWarehouseImportReceiptByIdSuccess,
  REJECT_WAREHOUSE_IMPORT_RECEIPT_START,
} from '~/modules/wmsx/redux/actions/warehouse-import-receipt'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const rejectWarehouseImportReceiptApi = (params) => {
  const uri = `/v1/sales/purchased-order-imports/${params}/rejecte`
  return api.put(uri)
}

function* doRejectWarehouseImportReceipt(action) {
  try {
    const response = yield call(
      rejectWarehouseImportReceiptApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(rejectWarehouseImportReceiptByIdSuccess(response.payload))

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
    yield put(rejectWarehouseImportReceiptByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchRejectWarehouseImportReceipt() {
  yield takeLatest(
    REJECT_WAREHOUSE_IMPORT_RECEIPT_START,
    doRejectWarehouseImportReceipt,
  )
}
