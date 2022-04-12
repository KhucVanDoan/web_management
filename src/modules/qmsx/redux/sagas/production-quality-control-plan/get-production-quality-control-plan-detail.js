import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  getProductionQcPlanDetailByIdFail,
  getProductionQcPlanDetailByIdSuccess,
  GET_PRODUCTION_QUALITY_CONTROL_PLAN_DETAIL_START,
} from '~/modules/qmsx/redux/actions/production-quality-control-plan'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Get production quality control plan API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getProductionQcPlanDetailApi = (params) => {
  const uri = `v1/quality-controls/quality-plans/${params?.endpointPatch}/${params?.id}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetProductionQcPlanDetail(action) {
  try {
    const response = yield call(getProductionQcPlanDetailApi, action?.payload)
    if (response?.statusCode === 200) {
      yield put(getProductionQcPlanDetailByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getProductionQcPlanDetailByIdFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get production quality control plan details
 */
export default function* watchGetProductionQcPlanDetail() {
  yield takeLatest(
    GET_PRODUCTION_QUALITY_CONTROL_PLAN_DETAIL_START,
    doGetProductionQcPlanDetail,
  )
}
