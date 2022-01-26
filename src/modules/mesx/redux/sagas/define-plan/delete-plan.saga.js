import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deletePlanFailed,
  deletePlanSuccess,
  DELETE_PLAN_START,
} from '~/modules/mesx/redux/actions/plan'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search plan
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deletePlanApi = (params) => {
  const uri = `/v1/produces/plans/${params}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeletePlan(action) {
  try {
    const response = yield call(deletePlanApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deletePlanSuccess(response.results))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification('definePlan.deletePlanSuccess', NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(deletePlanFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchDeletePlan() {
  yield takeLatest(DELETE_PLAN_START, doDeletePlan)
}
