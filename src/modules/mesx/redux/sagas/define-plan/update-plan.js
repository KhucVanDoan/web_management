import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updatePlanFailed,
  updatePlanSuccess,
  UPDATE_PLAN_START,
} from '~/modules/mesx/redux/actions/plan'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * update plan API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updatePlanApi = (params) => {
  const uri = `/v1/produces/plans/${params.id}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdatePlan(action) {
  try {
    const response = yield call(updatePlanApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updatePlanSuccess(response.data))

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
    yield put(updatePlanFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch update plan API
 * */
export default function* watchUpdatePlan() {
  yield takeLatest(UPDATE_PLAN_START, doUpdatePlan)
}