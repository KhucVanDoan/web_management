import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  createDefectFail,
  createDefectSuccess,
  MMSX_CREATE_DEFECT_START,
} from '../../actions/defect-list'

const createDefectApi = (params) => {
  const url = `v1/mms/defects`
  return api.post(url, params)
}

function* doCreateDefect(action) {
  try {
    const response = yield call(createDefectApi, action.payload)
    if (response.statusCode === 200) {
      yield put(createDefectSuccess())
      if (action.onSuccess) yield action.onSuccess()

      addNotification(response.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(createDefectFail())
      if (action.onError) yield action.onError()
    }
  } catch (error) {
    yield put(createDefectFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchCreateDefect() {
  yield takeLatest(MMSX_CREATE_DEFECT_START, doCreateDefect)
}
