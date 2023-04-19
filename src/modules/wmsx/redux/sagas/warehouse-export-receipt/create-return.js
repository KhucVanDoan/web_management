import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createWarehouseExportReceiptReturnFailed,
  createWarehouseExportReceiptReturnSuccess,
  CREATE_WAREHOUSE_EXPORT_RECEIPT_RETURN_START,
} from '~/modules/wmsx/redux/actions/warehouse-export-receipt'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const createWarehouseExportReceiptReturnApi = (params) => {
  const uri = `/v1/sales/sale-order-exports/return/purchased-order-imports`
  return api.post(uri, params)
}

function* doCreateWarehouseExportReceiptReturn(action) {
  try {
    const response = yield call(
      createWarehouseExportReceiptReturnApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(createWarehouseExportReceiptReturnSuccess(response.data))

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
    yield put(createWarehouseExportReceiptReturnFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchCreateWarehouseExportReceiptReturn() {
  yield takeLatest(
    CREATE_WAREHOUSE_EXPORT_RECEIPT_RETURN_START,
    doCreateWarehouseExportReceiptReturn,
  )
}
