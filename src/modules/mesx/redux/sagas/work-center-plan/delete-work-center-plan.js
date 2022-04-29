import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteWorkCenterPlanFailed,
  deleteWorkCenterPlanSuccess,
  DELETE_WORK_CENTER_PLAN_START,
} from '~/modules/mesx/redux/actions/work-center-plan'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Delete work center plan API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteWorkCenterPlanApi = (params) => {
  const { id, wcId } = params
  const uri = `/v1/produces/work-orders/${id}/schedules/work-centers/${wcId}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteWorkCenterPlan(action) {
  try {
    const response = yield call(deleteWorkCenterPlanApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteWorkCenterPlanSuccess(response.data))

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
    yield put(deleteWorkCenterPlanFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchDeleteWorkCenterPlan() {
  yield takeLatest(DELETE_WORK_CENTER_PLAN_START, doDeleteWorkCenterPlan)
}
