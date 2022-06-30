import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  GET_WARNING_DETAIL_START,
  getWarningDetailSuccess,
  getWarningDetailFail,
} from '../../actions/warning-system'
const getWarningList = (id) => {
  const url = `v1/mms/warnings/${id}`
  return api.get(url)
}

function* doGetWarningDetail(action) {
  try {
    const response = yield call(getWarningList, action?.payload)
    if (response.statusCode === 200) {
      yield put(getWarningDetailSuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getWarningDetailFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchGetWarningDetail() {
  yield takeLatest(GET_WARNING_DETAIL_START, doGetWarningDetail)
}
