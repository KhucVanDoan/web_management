import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  rejectMasterPlanFailed,
  rejectMasterPlanSuccess,
  REJECT_MASTER_PLAN,
} from '~/modules/mesx/redux/actions/master-plan.action'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const rejectMasterPlanApi = (params) => {
  const uri = `/v1/plans/master-plans/${params}/reject`
  return api.put(uri)
}

function* doRejectMasterPlan(action) {
  try {
    const response = yield call(rejectMasterPlanApi, action?.payload)
    if (response?.statusCode === 200) {
      yield put(rejectMasterPlanSuccess(response.data))

      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
    }
  } catch (error) {
    yield put(rejectMasterPlanFailed())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchRejectMasterPlan() {
  yield takeLatest(REJECT_MASTER_PLAN, doRejectMasterPlan)
}
