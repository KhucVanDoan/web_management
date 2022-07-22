import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  updateMakePlanSuccess,
  updateMakePlanFail,
  UPDATE_MAKE_PLAN_START,
} from '../../actions/create-plan'
const updateApi = (params) => {
  const url = `v1/mms/plan/${params.id}/update`
  return api.put(url, params)
}

function* doUpdate(action) {
  try {
    const response = yield call(updateApi, action.payload)
    if (response.statusCode === 200) {
      yield put(updateMakePlanSuccess(response?.data))
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(updateMakePlanFail())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(updateMakePlanFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchUpdateMakePlan() {
  yield takeLatest(UPDATE_MAKE_PLAN_START, doUpdate)
}
