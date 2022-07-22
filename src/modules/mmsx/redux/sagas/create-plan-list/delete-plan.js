import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  deleteMakePlanFail,
  deleteMakePlanSuccess,
  DELETE_MAKE_PLAN_START,
} from '../../actions/create-plan'
const apiUrl = (params) => {
  const url = `v1/mms/plan/${params}`
  return api.delete(url)
}

function* doDeletePlan(action) {
  try {
    const response = yield call(apiUrl, action?.payload)
    if (response.statusCode === 200) {
      yield put(deleteMakePlanSuccess(action.payload))
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(deleteMakePlanFail())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(deleteMakePlanFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchDeletePlan() {
  yield takeLatest(DELETE_MAKE_PLAN_START, doDeletePlan)
}
