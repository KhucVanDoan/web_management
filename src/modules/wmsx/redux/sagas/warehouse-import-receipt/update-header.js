import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateHeaderWarehouseImportReceiptFailed,
  updateHeaderWarehouseImportReceiptSuccess,
  UPDATE_HEADER_WAREHOUSE_IMPORT_RECEIPT_START,
} from '~/modules/wmsx/redux/actions/warehouse-import-receipt'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const updateHeaderWarehouseImportReceiptApi = (params) => {
  const uri = `/v1/sales/purchased-order-imports/${params?.id}/update-header`
  const data = { ...params }
  delete data['id']
  let form_data = new FormData()
  for (let key in data?.attachment) {
    form_data.append('attachment', data?.attachment[key])
  }
  delete data['attachment']
  for (let key in data) {
    form_data.append(key, data[key])
  }
  return api.put(uri, form_data)
}

function* doUpdateHaderWarehouseImportReceipt(action) {
  try {
    const response = yield call(
      updateHeaderWarehouseImportReceiptApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(updateHeaderWarehouseImportReceiptSuccess(response.results))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(
        response?.message || response?.payload?.message,
        NOTIFICATION_TYPE.ERROR,
      )
      yield put(updateHeaderWarehouseImportReceiptFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError(response)
      }
    }
  } catch (error) {
    yield put(updateHeaderWarehouseImportReceiptFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError(error)
    }
  }
}

export default function* watchUpdateHeaderWarehouseImportReceipt() {
  yield takeLatest(
    UPDATE_HEADER_WAREHOUSE_IMPORT_RECEIPT_START,
    doUpdateHaderWarehouseImportReceipt,
  )
}
