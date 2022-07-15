import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  getDefectFail,
  getDefectSuccess,
  MMSX_GET_DEFECT_START,
} from '../../actions/defect-list'

const { call, put, takeLatest } = require('redux-saga/effects')

const getDefectApi = (params) => {
  const url = `v1/mms/defects/${params}`
  return api.get(url)
}

function* doGetDefect(action) {
  try {
    const response = yield call(getDefectApi, action.payload)
    if (response.statusCode === 200) {
      yield put(getDefectSuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(getDefectFail())
      if (action.onError) yield action.onError()
    }
  } catch (error) {
    yield put(getDefectFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchGetDefect() {
  yield takeLatest(MMSX_GET_DEFECT_START, doGetDefect)
}
