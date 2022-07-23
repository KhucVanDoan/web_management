import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  MMSX_UPDATE_DEFECT_START,
  updateDefectFail,
  updateDefectSuccess,
} from '../../actions/defect-list'

const { call, put, takeLatest } = require('redux-saga/effects')

const updateDefectApi = (params) => {
  const url = `v1/mms/defects/${params.id}`
  return api.put(url, params)
}

function* doUpdateDefect(action) {
  try {
    const response = yield call(updateDefectApi, action.payload)
    if (response.statusCode === 200) {
      yield put(updateDefectSuccess())
      if (action.onSuccess) yield action.onSuccess()

      addNotification(response.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(updateDefectFail())
      if (action.onError) yield action.onError()
    }
  } catch (error) {
    yield put(updateDefectFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchUpdateDefect() {
  yield takeLatest(MMSX_UPDATE_DEFECT_START, doUpdateDefect)
}
