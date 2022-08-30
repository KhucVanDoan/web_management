import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  getDetailUnitFail,
  getDetailUnitSuccess,
  MMSX_GET_DEFINE_UNIT_START,
} from '../../actions/defineUnit'

const getUnitDetailApi = () => {
  const url = ``
  return api.get(url)
}

function* doGetUnitDetail(action) {
  try {
    const response = yield call(getUnitDetailApi, action.payload)
    if (response.statusCode === 200) {
      yield put(getDetailUnitSuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getDetailUnitFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchGetUnitDetail() {
  yield takeLatest(MMSX_GET_DEFINE_UNIT_START, doGetUnitDetail)
}
