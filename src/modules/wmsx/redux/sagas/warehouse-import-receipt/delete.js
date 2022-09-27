import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteWarehouseImportReceiptFailed,
  deleteWarehouseImportReceiptSuccess,
  DELETE_WAREHOUSE_IMPORT_RECEIPT_START,
} from '~/modules/wmsx/redux/actions/warehouse-import-receipt'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const deleteWarehouseImportReceiptApi = (params) => {
  const uri = `/v1/sales/purchased-order-imports/${params}`
  return api.delete(uri)
}

function* doDeleteWarehouseImportReceipt(action) {
  try {
    const response = yield call(
      deleteWarehouseImportReceiptApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(deleteWarehouseImportReceiptSuccess(response.results))

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
    yield put(deleteWarehouseImportReceiptFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchDeleteWarehouseImportReceipt() {
  yield takeLatest(
    DELETE_WAREHOUSE_IMPORT_RECEIPT_START,
    doDeleteWarehouseImportReceipt,
  )
}
