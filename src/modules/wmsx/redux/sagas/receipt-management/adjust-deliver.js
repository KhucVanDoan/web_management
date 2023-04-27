import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  adujustDeliverReceiptFailed,
  adujustDeliverReceiptSuccess,
  WMSX_ADJUST_DELIVER_RECEIPT_START,
} from '~/modules/wmsx/redux/actions/receipt-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const adjustDeliverApi = (params) => {
  const uri = `/v1/sales/receipts/delivery-receipt/${params?.id}`
  return api.put(uri, params)
}

function* doAdjustDeliver(action) {
  try {
    const response = yield call(adjustDeliverApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(adujustDeliverReceiptSuccess(response.data))

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
    yield put(adujustDeliverReceiptFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchDoAdjustDeliver() {
  yield takeLatest(WMSX_ADJUST_DELIVER_RECEIPT_START, doAdjustDeliver)
}
