import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchWarehouseImportReceiptFailed,
  searchWarehouseImportReceiptSuccess,
  SEARCH_WAREHOUSE_IMPORT_RECEIPT_START,
} from '~/modules/wmsx/redux/actions/warehouse-import-receipt'
import { api } from '~/services/api'

export const searchWarehouseImportReceiptApi = (params) => {
  const uri = `/monitor-orders`
  return api.get(uri, params)
}

function* doSearchWarehouseImportReceipt(action) {
  try {
    const response = yield call(
      searchWarehouseImportReceiptApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchWarehouseImportReceiptSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchWarehouseImportReceiptFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchSearchWarehouseImportReceipt() {
  yield takeLatest(
    SEARCH_WAREHOUSE_IMPORT_RECEIPT_START,
    doSearchWarehouseImportReceipt,
  )
}
