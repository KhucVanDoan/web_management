import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createSuppliesRequestFail,
  createSuppliesRequestSuccess,
  CREATE_SUPPLIES_REQUEST,
  UPDATE_SUPPLIES_REQUEST,
  updateSuppliesRequestFail,
  updateSuppliesRequestSuccess,
} from '~/modules/mmsx/redux/actions/supplies-request'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
const callApiCreateRequest = (params) => {
  const url = `v1/mms/supply-request`
  return api.post(url, params)
}

function* doCreateRequest(action) {
  try {
    const response = yield call(callApiCreateRequest, action.payload)
    if (response.statusCode === 200) {
      yield put(createSuppliesRequestSuccess())
      if (action.onSuccess) yield action.onSuccess()

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(createSuppliesRequestFail())
    if (action.onError) yield action.onError()
  }
}

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

export default function* watchCreateRequest() {
  yield takeLatest(CREATE_SUPPLIES_REQUEST, doCreateRequest)
  yield takeLatest(UPDATE_SUPPLIES_REQUEST, doUpdateRequest)
}
