import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateHeaderWarehouseExportReceiptFailed,
  updateHeaderWarehouseExportReceiptSuccess,
  UPDATE_HEADER_WAREHOUSE_EXPORT_RECEIPT_START,
} from '~/modules/wmsx/redux/actions/warehouse-export-receipt'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const updateHeaderWarehouseExportReceiptApi = (params) => {
  const uri = `/v1/sales/sale-order-exports/${params?.id}/update-header`
  const data = { ...params }
  delete data['id']
  let form_data = new FormData()
  for (let key in data) {
    form_data.append(key, data[key])
  }

  return api.put(uri, form_data)
}

function* doUpdateHeaderWarehouseExportReceipt(action) {
  try {
    const response = yield call(
      updateHeaderWarehouseExportReceiptApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(updateHeaderWarehouseExportReceiptSuccess(response.results))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(updateHeaderWarehouseExportReceiptFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError(response)
      }
    }
  } catch (error) {
    yield put(updateHeaderWarehouseExportReceiptFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError(error)
    }
  }
}

export default function* watchUpdateHeaderWarehouseExportReceipt() {
  yield takeLatest(
    UPDATE_HEADER_WAREHOUSE_EXPORT_RECEIPT_START,
    doUpdateHeaderWarehouseExportReceipt,
  )
}
