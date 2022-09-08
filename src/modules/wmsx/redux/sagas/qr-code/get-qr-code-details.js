import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getQrCodeDetailsFailed,
  getQrCodeDetailsSuccess,
  GET_QR_CODE_DETAILS_START,
} from '~/modules/wmsx/redux/actions/qr-code'
import { api } from '~/services/api'

const getQrCodeDetailsApi = () => {
  const uri = `/v1/settings/setting-qr`
  return api.get(uri)
}

function* doGetQrCodeDetails(action) {
  try {
    const response = yield call(getQrCodeDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getQrCodeDetailsSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getQrCodeDetailsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetQrCodeDetails() {
  yield takeLatest(GET_QR_CODE_DETAILS_START, doGetQrCodeDetails)
}
