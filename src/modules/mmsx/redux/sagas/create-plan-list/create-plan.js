import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  createPlanSuccess,
  createPlanFail,
  CREATE_PLAN,
} from '../../actions/create-plan'
const createApi = (params) => {
  const url = `v1/mms/plan`
  return api.post(url, params)
}

function* doCreatePlan(action) {
  try {
    const response = yield call(createApi, action.payload)
    if (response.statusCode === 200) {
      yield put(createPlanSuccess(response?.data))
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(createPlanFail())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(createPlanFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchCreatePlan() {
  yield takeLatest(CREATE_PLAN, doCreatePlan)
}
