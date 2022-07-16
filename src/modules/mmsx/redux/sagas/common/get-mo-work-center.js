import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  getMoByWorkCenterFailed,
  getMoByWorkCenterSuccess,
  GET_MO_BY_WORK_CENTER,
} from '../../actions/common'

const callApiGetMoByWorkCenter = (params) => {
  const url = `v1/mms/device-assignments/mo-information`
  return api.get(url, params)
}

function* doGetMoByWorkCenter(action) {
  try {
    const response = yield call(callApiGetMoByWorkCenter, action.payload)
    if (response?.statusCode === 200) {
      yield put(getMoByWorkCenterSuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getMoByWorkCenterFailed())
    if (action.onError) yield action.onError()
  }
}
export default function* watchGetMoWorkCenter() {
  yield takeLatest(GET_MO_BY_WORK_CENTER, doGetMoByWorkCenter)
}
