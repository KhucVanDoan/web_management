import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createMasterPlanFailed,
  createMasterPlanSuccess,
  CREATE_MASTER_PLAN_START,
} from '~/modules/mesx/redux/actions/master-plan.action'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * create plan
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const createMasterPlansApi = (params) => {
  const uri = `/v1/plans/master-plans/create`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateMasterPlan(action) {
  try {
    const response = yield call(createMasterPlansApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createMasterPlanSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data?.id)
      }
      addNotification('definePlan.createPlanSuccess', NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(createMasterPlanFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch create plan
 */
export default function* watchCreateMasterPlan() {
  yield takeLatest(CREATE_MASTER_PLAN_START, doCreateMasterPlan)
}
