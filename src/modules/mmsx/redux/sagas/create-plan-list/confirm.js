import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  confirmPlanSuccess,
  confirmPlanFail,
  CONFIRM_PLAN_START,
} from '../../actions/create-plan'
const confirmApi = (params) => {
  const url = `v1/mms/plan/${params?.id}/approve`
  return api.put(url, params)
}

function* doConfirm(action) {
  try {
    const response = yield call(confirmApi, action.payload)
    if (response.statusCode === 200) {
      yield put(confirmPlanSuccess())
      if (action.onSuccess) yield action.onSuccess()
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(confirmPlanFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchConfirmPlan() {
  yield takeLatest(CONFIRM_PLAN_START, doConfirm)
}
