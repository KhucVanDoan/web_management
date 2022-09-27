import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  searchReceiptFailed,
  searchReceiptSuccess,
  WMSX_SEARCH_RECEIPT_START,
} from '~/modules/wmsx/redux/actions/receipt-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

export const searchReceiptApi = (params) => {
  // @TODO: update api
  const uri = `/v1/sales/receipts/list`
  return api.get(uri, params)
}

function* doSearchReceipt(action) {
  try {
    const response = yield call(searchReceiptApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchReceiptSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchReceiptFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchSearchReceipt() {
  yield takeLatest(WMSX_SEARCH_RECEIPT_START, doSearchReceipt)
}
