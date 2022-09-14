import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateWarehouseExportReceiptFailed,
  updateWarehouseExportReceiptSuccess,
  UPDATE_WAREHOUSE_EXPORT_RECEIPT_START,
} from '~/modules/wmsx/redux/actions/warehouse-export-receipt'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const updateWarehouseExportReceiptApi = (params) => {
  const uri = ``
  return api.put(uri, params)
}

function* doUpdateWarehouseExportReceipt(action) {
  try {
    const response = yield call(
      updateWarehouseExportReceiptApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(updateWarehouseExportReceiptSuccess(response.results))

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
    yield put(updateWarehouseExportReceiptFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchUpdateWarehouseExportReceipt() {
  yield takeLatest(
    UPDATE_WAREHOUSE_EXPORT_RECEIPT_START,
    doUpdateWarehouseExportReceipt,
  )
}