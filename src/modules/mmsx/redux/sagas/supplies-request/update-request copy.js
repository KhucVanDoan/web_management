import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  UPDATE_SUPPLIES_REQUEST,
  updateSuppliesRequestFail,
  updateSuppliesRequestSuccess,
} from '~/modules/mmsx/redux/actions/supplies-request'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

// update
const callApiUpdateRequest = (params) => {
  const url = `v1/mms/supply-request/${params.id}`
  return api.put(url, params)
}

function* doUpdateRequest(action) {
  try {
    const response = yield call(callApiUpdateRequest, action.payload)
    if (response.statusCode === 200) {
      yield put(updateSuppliesRequestSuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(updateSuppliesRequestFail())
    }
  } catch (error) {
    yield put(updateSuppliesRequestFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchUpdateRequest() {
  yield takeLatest(UPDATE_SUPPLIES_REQUEST, doUpdateRequest)
}
