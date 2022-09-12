import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  rejectVendorByIdFailed,
  rejectVendorByIdSuccess,
  REJECT_VENDOR_START,
} from '~/modules/wmsx/redux/actions/define-vendor'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const rejectVendorApi = (params) => {
  const uri = `/v1/sales/vendors/${params}/reject`
  return api.put(uri)
}

function* doRejectVendor(action) {
  try {
    const response = yield call(rejectVendorApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(rejectVendorByIdSuccess(response.payload))

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
    yield put(rejectVendorByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchRejectVendor() {
  yield takeLatest(REJECT_VENDOR_START, doRejectVendor)
}
