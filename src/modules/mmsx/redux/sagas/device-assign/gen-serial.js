import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  getGeneratedSerialSuccess,
  getGeneratedSerialFail,
  MMSX_GET_GENERATED_SERIAL,
} from '../../actions/device-assign'

const genSerial = (params) => {
  const url = `v1/mms/generate-serial`
  return api.post(url, params)
}

function* doGenerateSerial(action) {
  try {
    const response = yield call(genSerial, action.payload)
    if (response.statusCode === 200) {
      yield put(getGeneratedSerialSuccess(response?.data))
      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      } else {
        yield put(getGeneratedSerialFail())
        if (action.onError) {
          yield action.onError()
        }
      }
    }
  } catch (error) {
    yield put(getGeneratedSerialFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGenerateSerial() {
  yield takeLatest(MMSX_GET_GENERATED_SERIAL, doGenerateSerial)
}
