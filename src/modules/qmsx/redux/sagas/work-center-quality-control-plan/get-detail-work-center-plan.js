import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  getWorkCenterQualityControlPlanDetailFail,
  getWorkCenterQualityControlPlanDetailSuccess,
  GET_WORK_CENTER_QC_PLAN_DETAIL_START,
} from '~/modules/qmsx/redux/actions/work-center-quality-control-plan'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Get detail work center plan QC
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getWorkCenterQualityControlPlanDetailApi = (params) => {
  const uri = `v1/quality-controls/quality-plans/${params.productionQcPlanId}/work-order/${params.workOrderId}/work-centers/${params.workCenterId}/${params.endpointPatch}/work-order-schedule-details/${params.workOrderScheduleId}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetWorkCenterQualityControlPlanDetail(action) {
  try {
    const response = yield call(
      getWorkCenterQualityControlPlanDetailApi,
      action?.payload,
    )
    if (response?.statusCode === 200) {
      yield put(getWorkCenterQualityControlPlanDetailSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getWorkCenterQualityControlPlanDetailFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get quality plan details
 */
export default function* watchGetWorkCenterQualityControlPlanDetail() {
  yield takeLatest(
    GET_WORK_CENTER_QC_PLAN_DETAIL_START,
    doGetWorkCenterQualityControlPlanDetail,
  )
}
