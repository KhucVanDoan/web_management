import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  getProductionPlanDetailFail,
  getProductionPlanDetailSuccess,
  GET_PRODUCTION_PLAN_DETAIL_BY_PRODUCTION_PLAN_ID_START,
} from '~/modules/qmsx/redux/actions/production-quality-control-plan'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Get production-plan-detail (từ bên MESx) API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getProductionPlanDetailApi = (params) => {
  const uri = `v1/quality-controls/quality-plans/${params?.endpointPatch}/${params?.id}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetProductionPlanDetail(action) {
  try {
    const response = yield call(getProductionPlanDetailApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getProductionPlanDetailSuccess(response?.data))
      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getProductionPlanDetailFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get production-plan by production-plan-id
 */
export default function* watchGetProductionPlanDetail() {
  yield takeLatest(
    GET_PRODUCTION_PLAN_DETAIL_BY_PRODUCTION_PLAN_ID_START,
    doGetProductionPlanDetail,
  )
}
