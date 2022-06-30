import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  rejectWarningSuccess,
  rejectWarningFail,
  REJECT_WARNING_START,
} from '../../actions/warning-system'
const rejectMaintainApi = (params) => {
  const url = `v1/mms/warning/${params.id}/reject`
  return api.put(url, params)
}

function* doReject(action) {
  try {
    const response = yield call(rejectMaintainApi, action.payload)
    if (response.statusCode === 200) {
      yield put(rejectWarningSuccess())
      if (action.onSuccess) yield action.onSuccess()
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(rejectWarningFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchRejectWarning() {
  yield takeLatest(REJECT_WARNING_START, doReject)
}
