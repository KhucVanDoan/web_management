import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateQrCodeFailed,
  updateQrCodeSuccess,
  UPDATE_QR_CODE_START,
} from '~/modules/wmsx/redux/actions/qr-code'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const updateQrCodeApi = (body) => {
  const uri = `/v1/settings/setting-qr/update`
  return api.post(uri, body)
}

function* doUpdateQrCode(action) {
  try {
    const response = yield call(updateQrCodeApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateQrCodeSuccess(response.data))

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
    yield put(updateQrCodeFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchUpdateQrCode() {
  yield takeLatest(UPDATE_QR_CODE_START, doUpdateQrCode)
}
