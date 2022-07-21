import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  rejectPlanFail,
  rejectPlanSuccess,
  REJECT_PLAN_START,
} from '../../actions/create-plan'
const rejectMaintainApi = (params) => {
  const url = `v1/mms/plan/${params.id}/reject`
  return api.put(url, params)
}

function* doReject(action) {
  try {
    const response = yield call(rejectMaintainApi, action.payload)
    if (response.statusCode === 200) {
      yield put(rejectPlanSuccess())
      if (action.onSuccess) yield action.onSuccess()
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(rejectPlanFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchRejectPlan() {
  yield takeLatest(REJECT_PLAN_START, doReject)
}
