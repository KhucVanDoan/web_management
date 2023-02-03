import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateWarehouseImportReceiptFailed,
  updateWarehouseImportReceiptSuccess,
  UPDATE_WAREHOUSE_IMPORT_RECEIPT_START,
} from '~/modules/wmsx/redux/actions/warehouse-import-receipt'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const updateWarehouseImportReceiptApi = (params) => {
  const uri = `/v1/sales/purchased-order-imports/${params?.id}`
  const data = { ...params }
  delete data['id']
  let form_data = new FormData()
  for (let key in data) {
    form_data.append(key, data[key])
  }

  return api.put(uri, form_data)
}

function* doUpdateWarehouseImportReceipt(action) {
  try {
    const response = yield call(
      updateWarehouseImportReceiptApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(updateWarehouseImportReceiptSuccess(response.results))

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
      throw new Error(response?.message || response?.payload?.message)
    }
  } catch (error) {
    yield put(updateWarehouseImportReceiptFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchUpdateWarehouseImportReceipt() {
  yield takeLatest(
    UPDATE_WAREHOUSE_IMPORT_RECEIPT_START,
    doUpdateWarehouseImportReceipt,
  )
}
