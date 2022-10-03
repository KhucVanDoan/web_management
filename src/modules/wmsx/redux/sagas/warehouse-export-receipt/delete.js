import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteWarehouseExportReceiptFailed,
  deleteWarehouseExportReceiptSuccess,
  DELETE_WAREHOUSE_EXPORT_RECEIPT_START,
} from '~/modules/wmsx/redux/actions/warehouse-export-receipt'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const deleteWarehouseExportReceiptApi = (params) => {
  const uri = `/v1/sales/sale-order-exports/${params}`
  return api.delete(uri)
}

function* doDeleteWarehouseExportReceipt(action) {
  try {
    const response = yield call(
      deleteWarehouseExportReceiptApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(deleteWarehouseExportReceiptSuccess(response.results))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(deleteWarehouseExportReceiptFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchDeleteWarehouseExportReceipt() {
  yield takeLatest(
    DELETE_WAREHOUSE_EXPORT_RECEIPT_START,
    doDeleteWarehouseExportReceipt,
  )
}
