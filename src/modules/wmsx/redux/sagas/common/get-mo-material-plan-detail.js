import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  getMoMaterialPlanDetailSuccess,
  getMoMaterialPlanDetailFailed,
  GET_MO_MATERIAL_PLAN_DETAIL_START,
} from '../../actions/common'

/**
 * Get MoMaterialPlanDetail API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getMoMaterialPlanDetailApi = (params) => {
  const uri = `/v1/produces/material-plans/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetMoMaterialPlanDetail(action) {
  try {
    const response = yield call(getMoMaterialPlanDetailApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getMoMaterialPlanDetailSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getMoMaterialPlanDetailFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get MoMaterialPlanDetail
 */
export default function* watchGetMoMaterialPlanDetail() {
  yield takeLatest(GET_MO_MATERIAL_PLAN_DETAIL_START, doGetMoMaterialPlanDetail)
}
