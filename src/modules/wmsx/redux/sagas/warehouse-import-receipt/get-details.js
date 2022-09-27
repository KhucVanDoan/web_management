import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getWarehouseImportReceiptDetailsByIdFailed,
  getWarehouseImportReceiptDetailsByIdSuccess,
  GET_WAREHOUSE_IMPORT_RECEIPT_DETAILS_START,
} from '~/modules/wmsx/redux/actions/warehouse-import-receipt'
import { api } from '~/services/api'

const getWarehouseImportReceiptDetailsApi = (params) => {
  const uri = `/v1/sales/purchased-order-imports/${params}`
  return api.get(uri)
}

function* doGetWarehouseImportReceiptDetails(action) {
  try {
    const response = yield call(
      getWarehouseImportReceiptDetailsApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(getWarehouseImportReceiptDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getWarehouseImportReceiptDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetWarehouseImportReceiptDetails() {
  yield takeLatest(
    GET_WAREHOUSE_IMPORT_RECEIPT_DETAILS_START,
    doGetWarehouseImportReceiptDetails,
  )
}
