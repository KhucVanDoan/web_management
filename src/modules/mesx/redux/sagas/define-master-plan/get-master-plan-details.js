import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getMasterPlanDetailsByIdFailed,
  getMasterPlanDetailsByIdSuccess,
  GET_MASTER_PLAN_DETAILS_START,
} from '~/modules/mesx/redux/actions/master-plan'
import { api } from '~/services/api'

/**
 * get master plan detail
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getMasterPlanDetailsApi = (params) => {
  const uri = `/v1/plans/master-plans/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetMasterPlanDetails(action) {
  try {
    const response = yield call(getMasterPlanDetailsApi, action?.payload)
    if (response?.data && response?.statusCode === 200) {
      yield put(getMasterPlanDetailsByIdSuccess(response.data))
      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getMasterPlanDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError(error)
    }
  }
}

/**
 * Watch get plan detail
 */
export default function* watchGetMasterPlanDetails() {
  yield takeLatest(GET_MASTER_PLAN_DETAILS_START, doGetMasterPlanDetails)
}
