import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  returnReceiptByIdSuccess,
  returnReceiptByIdFailed,
  WMSX_RETURN_RECEIPT_START,
} from '~/modules/wmsx/redux/actions/receipt-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const rreturnReceiptApi = (params) => {
  const uri = `/v1/sales/receipts/${params}/return`
  return api.put(uri)
}

function* doReturnReceipt(action) {
  try {
    const response = yield call(rreturnReceiptApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(returnReceiptByIdSuccess(response.payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(returnReceiptByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchReturnReceipt() {
  yield takeLatest(WMSX_RETURN_RECEIPT_START, doReturnReceipt)
}