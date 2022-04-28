import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateWorkCenterPlanFailed,
  updateWorkCenterPlanSuccess,
  UPDATE_WORK_CENTER_PLAN_START,
} from '~/modules/mesx/redux/actions/work-center-plan'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Update work center plan api
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateWorkCenterPlanApi = (params) => {
  const uri = `/v1/produces/work-centers/${params.id}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateWorkCenterPlan(action) {
  try {
    const response = yield call(updateWorkCenterPlanApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateWorkCenterPlanSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateWorkCenterPlanFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search production-orders
 */
export default function* watchUpdateWorkCenterPlan() {
  yield takeLatest(UPDATE_WORK_CENTER_PLAN_START, doUpdateWorkCenterPlan)
}
