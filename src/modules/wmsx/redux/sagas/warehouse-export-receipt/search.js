import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchWarehouseExportReceiptFailed,
  searchWarehouseExportReceiptSuccess,
  SEARCH_WAREHOUSE_EXPORT_RECEIPT_START,
} from '~/modules/wmsx/redux/actions/warehouse-export-receipt'
import { api } from '~/services/api'

export const searchWarehouseExportReceiptApi = (params) => {
  const uri = `/v1/sales/sale-order-exports/list`
  return api.get(uri, params)
}

function* doSearchWarehouseExportReceipt(action) {
  try {
    const response = yield call(
      searchWarehouseExportReceiptApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchWarehouseExportReceiptSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchWarehouseExportReceiptFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchSearchWarehouseExportReceipt() {
  yield takeLatest(
    SEARCH_WAREHOUSE_EXPORT_RECEIPT_START,
    doSearchWarehouseExportReceipt,
  )
}
