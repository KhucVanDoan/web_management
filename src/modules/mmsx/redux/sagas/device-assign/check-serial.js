import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  checkSerialSuccess,
  checkSerialFail,
  MMSX_CHECK_SERIAL,
} from '../../actions/device-assign'
const checkSerial = (params) => {
  const url = `v1/mms/validate-serial`
  return api.post(url, params)
}

function* doCheckSerial(action) {
  try {
    const response = yield call(checkSerial, action.payload)
    if (response.statusCode === 200) {
      yield put(checkSerialSuccess(response?.data))
      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      } else {
        yield put(checkSerialFail())
        if (action.onError) {
          yield action.onError()
        }
      }
    }
  } catch (error) {
    yield put(checkSerialFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchCheckSerial() {
  yield takeLatest(MMSX_CHECK_SERIAL, doCheckSerial)
}
