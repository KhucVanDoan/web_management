import { call, put, takeLatest } from 'redux-saga/effects'

import {
  generateWorkCenterPlanFailed,
  generateWorkCenterPlanSuccess,
  GENERATE_WORK_CENTER_PLAN_START,
} from '~/modules/mesx/redux/actions/work-center-plan.action'
import { api } from '~/services/api'

/**
 * Get work center plan detail API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const generateWorkCenterPlanApi = (params) => {
  const { id, workCenterId } = params
  const uri = `/v1/produces/work-centers/${workCenterId}/schedules/work-order-schedule-details/${id}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGenerateWorkCenterPlan(action) {
  try {
    const response = yield call(generateWorkCenterPlanApi, action?.payload)
    if (response?.statusCode === 200) {
      yield put(generateWorkCenterPlanSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(generateWorkCenterPlanFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search WorkCenterPlan details
 */
export default function* watchGenerateWorkCenterPlan() {
  yield takeLatest(GENERATE_WORK_CENTER_PLAN_START, doGenerateWorkCenterPlan)
}
