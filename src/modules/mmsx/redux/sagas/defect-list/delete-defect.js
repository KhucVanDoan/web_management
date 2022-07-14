import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  deleteDefectFail,
  deleteDefectSuccess,
  MMSX_DELETE_DEFECT_START,
} from '../../actions/defect-list'

const { call, put, takeLatest } = require('redux-saga/effects')

const deleteDefectApi = (params) => {
  const url = `v1/mms/defects/${params}`
  return api.delete(url)
}

function* doDeleteDefect(action) {
  try {
    const response = yield call(deleteDefectApi, action.payload)
    if (response.statusCode === 200) {
      yield put(deleteDefectSuccess())
      if (action.onSuccess) yield action.onSuccess()

      addNotification(response.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(deleteDefectFail())
      if (action.onError) yield action.onError()
    }
  } catch (error) {
    yield put(deleteDefectFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchDeleteDefect() {
  yield takeLatest(MMSX_DELETE_DEFECT_START, doDeleteDefect)
}
