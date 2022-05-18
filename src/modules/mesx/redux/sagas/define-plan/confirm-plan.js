import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmPlanByIdFailed,
  confirmPlanByIdSuccess,
  CONFIRM_PLAN_START,
} from '~/modules/mesx/redux/actions/plan'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Confirm PLAN
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const confirmPlanApi = (params) => {
  const { id, status } = params
  const uri = `/v1/produces/plans/${id}/status/${status}`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doConfirmPlan(action) {
  try {
    const response = yield call(confirmPlanApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmPlanByIdSuccess(response.payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(
        'definePlan.confirmPlanSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(confirmPlanByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchConfirmPlan() {
  yield takeLatest(CONFIRM_PLAN_START, doConfirmPlan)
}