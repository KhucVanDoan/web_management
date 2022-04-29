import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getWorkCenterPlanDetailByIdFailed,
  getWorkCenterPlanDetailByIdSuccess,
  GET_WORK_CENTER_PLAN_DETAILS_START,
} from '~/modules/mesx/redux/actions/work-center-plan'
import { api } from '~/services/api'

/**
 * Get work center plan detail API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getWorkCenterPlanDetailApi = (params) => {
  const uri = `/v1/produces/work-centers/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetWorkCenterPlanDetail(action) {
  try {
    const response = yield call(getWorkCenterPlanDetailApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getWorkCenterPlanDetailByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getWorkCenterPlanDetailByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search WorkCenterPlan details
 */
export default function* watchGetWorkCenterPlanDetail() {
  yield takeLatest(
    GET_WORK_CENTER_PLAN_DETAILS_START,
    doGetWorkCenterPlanDetail,
  )
}
