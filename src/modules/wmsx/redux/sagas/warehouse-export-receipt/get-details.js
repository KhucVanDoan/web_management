import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getWarehouseExportReceiptDetailsByIdFailed,
  getWarehouseExportReceiptDetailsByIdSuccess,
  GET_WAREHOUSE_EXPORT_RECEIPT_DETAILS_START,
} from '~/modules/wmsx/redux/actions/warehouse-export-receipt'
import { api } from '~/services/api'

export const getWarehouseExportReceiptDetailsApi = (params) => {
  const uri = `/v1/sales/sale-order-exports/${params}`
  return api.get(uri)
}

function* doGetWarehouseExportReceiptDetails(action) {
  try {
    const response = yield call(
      getWarehouseExportReceiptDetailsApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(getWarehouseExportReceiptDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getWarehouseExportReceiptDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetWarehouseExportReceiptDetails() {
  yield takeLatest(
    GET_WAREHOUSE_EXPORT_RECEIPT_DETAILS_START,
    doGetWarehouseExportReceiptDetails,
  )
}
