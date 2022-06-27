import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  getMoByFactoryFailed,
  getMoByFactorySuccess,
  MMSX_GET_MO_BY_FACTORY,
} from '../../actions/common'

const callApiGetMoByFactory = (params) => {
  const url = `v1/produces/manufacturing-orders/list`
  return api.get(url, params)
}

function* doGetMoByFactory(action) {
  try {
    const response = yield call(callApiGetMoByFactory, action.payload)
    if (response?.statusCode === 200) {
      yield put(getMoByFactorySuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      yield put(getMoByFactoryFailed())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(getMoByFactoryFailed())
    if (action.onError) yield action.onError()
  }
}

export default function* watchGetMo() {
  yield takeLatest(MMSX_GET_MO_BY_FACTORY, doGetMoByFactory)
}
