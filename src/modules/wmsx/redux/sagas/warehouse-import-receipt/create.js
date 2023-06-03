import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createWarehouseImportReceiptFailed,
  createWarehouseImportReceiptSuccess,
  CREATE_WAREHOUSE_IMPORT_RECEIPT_START,
} from '~/modules/wmsx/redux/actions/warehouse-import-receipt'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const createWarehouseImportReceiptApi = (params) => {
  const uri = `/monitor-orders`
  return api.post(uri, params)
}

function* doCreateWarehouseImportReceipt(action) {
  try {
    const response = yield call(
      createWarehouseImportReceiptApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(createWarehouseImportReceiptSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(
        response?.message || response?.payload?.message,
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(
        response?.message || response?.payload?.message,
        NOTIFICATION_TYPE.ERROR,
      )
      throw new Error(response?.message || response?.payload?.message)
    }
  } catch (error) {
    yield put(createWarehouseImportReceiptFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchCreateWarehouseImportReceipt() {
  yield takeLatest(
    CREATE_WAREHOUSE_IMPORT_RECEIPT_START,
    doCreateWarehouseImportReceipt,
  )
}
