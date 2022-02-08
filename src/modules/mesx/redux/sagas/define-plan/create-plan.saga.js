import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createPlanFailed,
  createPlanSuccess,
  CREATE_PLAN_START,
} from '~/modules/mesx/redux/actions/plan'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * create plan
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const createPlansApi = (params) => {
  const uri = `/v1/produces/plans`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreatePlan(action) {
  try {
    const response = yield call(createPlansApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createPlanSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification('definePlan.createPlanSuccess', NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(createPlanFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch create plan
 */
export default function* watchCreateplan() {
  yield takeLatest(CREATE_PLAN_START, doCreatePlan)
}
