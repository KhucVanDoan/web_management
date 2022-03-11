import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  approveMasterPlanFailed,
  approveMasterPlanSuccess,
  APPROVE_MASTER_PLAN,
} from '~/modules/mesx/redux/actions/master-plan.action'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const approveMasterPlanApi = (params) => {
  const uri = `/v1/plans/master-plans/${params}/approve`
  return api.put(uri)
}

function* doApproveMasterPlan(action) {
  try {
    const response = yield call(approveMasterPlanApi, action?.payload)
    if (response?.statusCode === 200) {
      yield put(approveMasterPlanSuccess(response.data))

      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(
        'defineMasterPlan.approveMasterPlanSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
    }
  } catch (error) {
    yield put(approveMasterPlanFailed())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchApproveMasterPlan() {
  yield takeLatest(APPROVE_MASTER_PLAN, doApproveMasterPlan)
}
