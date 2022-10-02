import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getReceiptDetailsByIdFailed,
  getReceiptDetailsByIdSuccess,
  WMSX_GET_RECEIPT_DETAILS_START,
} from '~/modules/wmsx/redux/actions/receipt-management'
import { api } from '~/services/api'

export const getReceiptDetailsApi = (params) => {
  // @TODO: update api
  const uri = `/v1/sales/receipts/${params}`
  return api.get(uri)
}

function* doGetReceiptDetails(action) {
  try {
    const response = yield call(getReceiptDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getReceiptDetailsByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getReceiptDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetReceiptDetails() {
  yield takeLatest(WMSX_GET_RECEIPT_DETAILS_START, doGetReceiptDetails)
}
