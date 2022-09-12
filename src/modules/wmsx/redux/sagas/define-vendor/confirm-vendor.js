import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmVendorByIdFailed,
  confirmVendorByIdSuccess,
  CONFIRM_VENDOR_START,
} from '~/modules/wmsx/redux/actions/define-vendor'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const confirmVendorApi = (params) => {
  const uri = `/v1/sales/vendors/${params}/confirm`
  return api.put(uri)
}

function* doConfirmVendor(action) {
  try {
    const response = yield call(confirmVendorApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmVendorByIdSuccess(response.payload))

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
    yield put(confirmVendorByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchConfirmVendor() {
  yield takeLatest(CONFIRM_VENDOR_START, doConfirmVendor)
}
