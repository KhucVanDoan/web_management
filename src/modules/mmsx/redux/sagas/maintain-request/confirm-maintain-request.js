import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmMaintainRequestSuccess,
  confirmMaintainRequestFail,
  CONFIRM_MAINTAIN_REQUEST_START,
} from '~/modules/mmsx/redux/actions/maintain-request'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const confirmMaintainRequestApi = (params) => {
  let url = ''
  if (params?.status === 2 || params.status === 1) {
    url = `v1/mms/maintain-requests/${params.id}/approve`
  } else if (params?.status === 7) {
    url = `v1/mms/maintain-requests/${params.id}/complete`
  }
  return api.put(url)
}

function* doConfirmMaintainRequest(action) {
  try {
    const response = yield call(confirmMaintainRequestApi, action.payload)
    if (response.statusCode === 200) {
      yield put(confirmMaintainRequestSuccess())
      if (action.onSuccess) yield action.onSuccess()
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(confirmMaintainRequestFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchConfirmMaintainRequest() {
  yield takeLatest(CONFIRM_MAINTAIN_REQUEST_START, doConfirmMaintainRequest)
}
