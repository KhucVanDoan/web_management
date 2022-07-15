import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  DELETE_SUPPLIES_REQUEST_START,
  deleteSuppliesRequestSuccess,
  deleteSuppliesRequestFail,
} from '~/modules/mmsx/redux/actions/supplies-request'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
const deleteSuppliesRequestApi = (params) => {
  const url = `v1/mms/supply-request/${params}`
  return api.delete(url)
}

function* doDeleteSuppliesRequest(action) {
  try {
    const response = yield call(deleteSuppliesRequestApi, action.payload)
    if (response.statusCode === 200) {
      yield put(deleteSuppliesRequestSuccess())
      if (action.onSuccess) yield action.onSuccess()

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(deleteSuppliesRequestFail())
    }
  } catch (error) {
    yield put(deleteSuppliesRequestFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchDeleteSuppliesRequest() {
  yield takeLatest(DELETE_SUPPLIES_REQUEST_START, doDeleteSuppliesRequest)
}
