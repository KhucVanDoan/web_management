import { call, put, takeLatest } from 'redux-saga/effects'


import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmWorkCenterPlanFailed,
  confirmWorkCenterPlanSuccess,
  CONFIRM_WORK_CENTER_PLAN_START,
} from '~/modules/mesx/redux/actions/work-center-plan.action'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Confirm WorkCenterPlan
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const confirmWorkCenterPlanApi = (params) => {
  const uri = `/v1/produces/work-orders/schedule-details/${params}/approve`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doConfirmWorkCenterPlan(action) {
  try {
    const response = yield call(confirmWorkCenterPlanApi, action?.payload)
    if (response?.statusCode === 200) {
      yield put(confirmWorkCenterPlanSuccess(response.payload))
      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(
        'workCenterPlan.confirmWorkCenterPlanSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(confirmWorkCenterPlanFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchConfirmWorkCenterPlan() {
  yield takeLatest(CONFIRM_WORK_CENTER_PLAN_START, doConfirmWorkCenterPlan)
}
