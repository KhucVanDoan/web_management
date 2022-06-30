import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  confirmWarningSuccess,
  confirmWarningFail,
  CONFIRM_WARNING_START,
} from '../../actions/warning-system'

const confirmApi = (params) => {
  const url = `v1/mms/warning/${params}/approve`
  return api.put(url)
}

function* doConfirm(action) {
  try {
    const response = yield call(confirmApi, action.payload)
    if (response.statusCode === 200) {
      yield put(confirmWarningSuccess())
      if (action.onSuccess) yield action.onSuccess()
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(confirmWarningFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchConfirmWarning() {
  yield takeLatest(CONFIRM_WARNING_START, doConfirm)
}
