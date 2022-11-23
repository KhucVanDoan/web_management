import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  detailLicenseSuccess,
  detailLicenseFailed,
  DETAIL_LICENSE_START,
} from '~/modules/wmsx/redux/actions/license'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

export const detailLicenseApi = (params) => {
  const url = `v1/auth/license/detail`
  return api.get(url, params)
}

function* doDetailLicense(action) {
  try {
    const response = yield call(detailLicenseApi, action?.payload)
    if (response.statusCode === 200) {
      yield put(detailLicenseSuccess(response?.data))
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      // addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(detailLicenseFailed())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchDetailLicense() {
  yield takeLatest(DETAIL_LICENSE_START, doDetailLicense)
}
