import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updatePlanSuccess,
  updatePlanFail,
  UPDATE_PLAN_START,
} from '~/modules/mmsx/redux/actions/job'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const updatePlan = (params) => {
  const url = `v1/mms/jobs/${params.id}/assignments`
  return api.put(url, params)
}

function* doUpdate(action) {
  try {
    const response = yield call(updatePlan, action.payload)
    if (response.statusCode === 200) {
      yield put(updatePlanSuccess(response?.data))
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(updatePlanFail())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(updatePlanFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchUpdatePlan() {
  yield takeLatest(UPDATE_PLAN_START, doUpdate)
}
