import { call, put, takeLatest } from 'redux-saga/effects'

import {
  GENERATE_JOB_FOR_PLAN_START,
  generateJobForPlanSuccess,
  generateJobForPlanFail,
} from '~/modules/mmsx/redux/actions/job-draft'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */

const generateJobForPlan = (params) => {
  const url = `v1/mms/plan/generate-job`
  return api.post(url, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */

function* doGenerateJobForPlan(action) {
  try {
    const response = yield call(generateJobForPlan, action?.payload)
    if (response.statusCode === 200) {
      yield put(generateJobForPlanSuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(generateJobForPlanFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchGenerateJobForPlan() {
  yield takeLatest(GENERATE_JOB_FOR_PLAN_START, doGenerateJobForPlan)
}
