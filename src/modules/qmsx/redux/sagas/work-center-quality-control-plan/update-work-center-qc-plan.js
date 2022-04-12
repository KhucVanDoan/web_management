import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateWorkCenterQualityControlPlanFail,
  updateWorkCenterQualityControlPlanSuccess,
  UPDATE_WORK_CENTER_QC_PLAN_START,
} from '~/modules/qmsx/redux/actions/work-center-quality-control-plan'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Update plan API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateWorkCenterQualityControlPlanApi = (params) => {
  const uri = `/v1/quality-controls/work-center-plan-qc-shifts`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateWorkCenterQualityControlPlan(action) {
  try {
    const response = yield call(
      updateWorkCenterQualityControlPlanApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(updateWorkCenterQualityControlPlanSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(
        'qmsx:workCenterQualityControlPlan.notification.updateSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateWorkCenterQualityControlPlanFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch update quality plan
 */
export default function* watchUpdateWorkCenterQualityControlPlan() {
  yield takeLatest(
    UPDATE_WORK_CENTER_QC_PLAN_START,
    doUpdateWorkCenterQualityControlPlan,
  )
}
