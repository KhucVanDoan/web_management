import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createWarehouseExportReceiptFailed,
  createWarehouseExportReceiptSuccess,
  CREATE_WAREHOUSE_EXPORT_RECEIPT_START,
} from '~/modules/wmsx/redux/actions/warehouse-export-receipt'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const createWarehouseExportReceiptApi = (body) => {
  const uri = ``
  return api.post(uri, body)
}

function* doCreateWarehouseExportReceipt(action) {
  try {
    const response = yield call(
      createWarehouseExportReceiptApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(createWarehouseExportReceiptSuccess(response.data))

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
    yield put(createWarehouseExportReceiptFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchCreateWarehouseExportReceipt() {
  yield takeLatest(
    CREATE_WAREHOUSE_EXPORT_RECEIPT_START,
    doCreateWarehouseExportReceipt,
  )
}
