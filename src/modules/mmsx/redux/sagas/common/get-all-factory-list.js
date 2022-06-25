import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  getFactoryListSuccess,
  getFactoryListFail,
  MMSX_GET_FACTORY_LIST_START,
} from '../../actions/common'

const getAllFactoryList = () => {
  const url = `v1/mms/factory/supplies/list`
  return api.get(url)
}

function* doGetAllFactoryList(action) {
  try {
    const response = yield call(getAllFactoryList)
    if (response.statusCode === 200) {
      yield put(getFactoryListSuccess(response?.data))

      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getFactoryListFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetAllFactoryList() {
  yield takeLatest(MMSX_GET_FACTORY_LIST_START, doGetAllFactoryList)
}
