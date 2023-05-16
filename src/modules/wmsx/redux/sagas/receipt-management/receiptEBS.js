import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  receiptEBSByIdFailed,
  receiptEBStByIdSuccess,
  RECEIPT_EBS_START,
} from '~/modules/wmsx/redux/actions/receipt-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const receiptEBSApi = (params) => {
  const uri = `/v1/receipts/sync/${params}/to-ebs`
  return api.post(uri)
}

function* doReceiptEBS(action) {
  try {
    const response = yield call(receiptEBSApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(receiptEBStByIdSuccess(response.payload))

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
    yield put(receiptEBSByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchreceiptEBS() {
  yield takeLatest(RECEIPT_EBS_START, doReceiptEBS)
}
