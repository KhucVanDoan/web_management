import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateProductionQcPlanFail,
  updateProductionQcPlanSuccess,
  UPDATE_PRODUCTION_QUALITY_CONTROL_PLAN_START,
} from '~/modules/qmsx/redux/actions/production-quality-control-plan'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Update production quality control plan API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateProductionQcPlanApi = (params) => {
  const uri = `/v1/quality-controls/quality-plans/${params.id}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateProductionQcPlan(action) {
  try {
    const response = yield call(updateProductionQcPlanApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateProductionQcPlanSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(
        'qmsx:productionQualityControlPlan.notification.updateSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateProductionQcPlanFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch update production quality control plan
 */
export default function* watchUpdateProductionQcPlan() {
  yield takeLatest(
    UPDATE_PRODUCTION_QUALITY_CONTROL_PLAN_START,
    doUpdateProductionQcPlan,
  )
}
