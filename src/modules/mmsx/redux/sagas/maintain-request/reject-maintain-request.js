import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  rejectMaintainRequestSuccess,
  rejectMaintainRequestFail,
  REJECT_MAINTAIN_REQUEST_START,
} from '~/modules/mmsx/redux/actions/maintain-request'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const rejectMaintainRequestApi = (params) => {
  let url = ''
  if (params?.status === 2 || params.status === 1) {
    url = `v1/mms/maintain-requests/${params.id}/reject`
  } else if (params?.status === 7) {
    url = `v1/mms/maintain-requests/${params.id}/re-do`
  }
  return api.put(url, params)
}

function* doRejectMaintainRequest(action) {
  try {
    const response = yield call(rejectMaintainRequestApi, action.payload)
    if (response.statusCode === 200) {
      yield put(rejectMaintainRequestSuccess())
      if (action.onSuccess) yield action.onSuccess()
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(rejectMaintainRequestFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchRejectMaintainRequest() {
  yield takeLatest(REJECT_MAINTAIN_REQUEST_START, doRejectMaintainRequest)
}
