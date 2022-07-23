import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  getLogTimeByMoFail,
  getLogTimeByMoSuccess,
  MMSX_GET_LOG_TIME_BY_MO,
} from '../../actions/device-assign'

const callGetLogTimeApi = (params) => {
  const url = `v1/mms/device-assignments/manufacturing-information`
  return api.get(url, params)
}

function* getLogTime(action) {
  try {
    const response = yield call(callGetLogTimeApi, action.payload)
    if (response.statusCode === 200) {
      yield put(getLogTimeByMoSuccess(response?.data))
      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      yield put(getLogTimeByMoFail())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(getLogTimeByMoFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetLogTimeByMo() {
  yield takeLatest(MMSX_GET_LOG_TIME_BY_MO, getLogTime)
}
