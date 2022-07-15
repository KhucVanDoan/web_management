import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  REJECT_SUPPLIES_REQUEST_START,
  rejectSuppliesRequestSuccess,
  rejectSuppliesRequestFail,
} from '~/modules/mmsx/redux/actions/supplies-request'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
const rejectSuppliesRequestApi = (params) => {
  const url = `v1/mms/supply-request/${params}/reject`
  return api.put(url)
}

function* doRejectSuppliesRequest(action) {
  try {
    const response = yield call(rejectSuppliesRequestApi, action.payload)
    if (response.statusCode === 200) {
      yield put(rejectSuppliesRequestSuccess())
      if (action.onSuccess) yield action.onSuccess()

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(rejectSuppliesRequestFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchRejectSuppliesRequest() {
  yield takeLatest(REJECT_SUPPLIES_REQUEST_START, doRejectSuppliesRequest)
}
