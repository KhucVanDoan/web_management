import { call, put, takeLatest } from 'redux-saga/effects'

import {
  checkMaterialPlanByIdFailed,
  checkMaterialPlanByIdSuccess,
  CHECK_MATERIAL_PLAN_START,
} from '~/modules/mesx/redux/actions/mo.action'
import { api } from '~/services/api'

/**
 * Check material plan
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const checkMaterialPlanApi = (params) => {
  const uri = `/v1/produces/material-plans/${params}/check`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCheckMaterialPlan(action) {
  try {
    const response = yield call(checkMaterialPlanApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(checkMaterialPlanByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(checkMaterialPlanByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCheckMaterialPlan() {
  yield takeLatest(CHECK_MATERIAL_PLAN_START, doCheckMaterialPlan)
}
