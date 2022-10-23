import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  activeLicenseSuccess,
  activeLicenseFailed,
  ACTIVE_LICENSE_START,
} from '~/modules/public/redux/actions/license'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

export const activeLicenseApi = (params) => {
  const url = `v1/auth/license/verify`
  return api.post(url, params)
}

function* doActiveLicense(action) {
  try {
    const response = yield call(activeLicenseApi, action?.payload)
    if (response.statusCode === 200) {
      yield put(activeLicenseSuccess(response?.data))
      localStorage.setItem('license', JSON.stringify(response?.data))

      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(
        'Kích hoạt license thành công!',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(
        'License hoặc số hợp đồng không tồn tại',
        NOTIFICATION_TYPE.ERROR,
      )
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(activeLicenseFailed())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchActiveLicense() {
  yield takeLatest(ACTIVE_LICENSE_START, doActiveLicense)
}
