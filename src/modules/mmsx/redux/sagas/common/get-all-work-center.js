import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  getAllWorkCenterFailed,
  getAllWorkCenterSuccess,
  GET_ALL_WORK_CENTER_START,
} from '../../actions/common'

const getAllWorkCenterApi = (params) => {
  const url = `v1/mms/device-requests/work-centers`
  return api.get(url, params)
}

function* doGetAllWorkCenter(action) {
  try {
    const response = yield call(getAllWorkCenterApi, action.payload)
    if (response?.statusCode === 200) {
      yield put(getAllWorkCenterSuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getAllWorkCenterFailed())
    if (action.onError) yield action.onError()
  }
}

export default function* watchGetAllWorkCenter() {
  yield takeLatest(GET_ALL_WORK_CENTER_START, doGetAllWorkCenter)
}
