import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmProductionQcPlanFail,
  confirmProductionQcPlanSuccess,
  CONFIRM_PRODUCTION_QUALITY_CONTROL_PLAN_START,
} from '~/modules/qmsx/redux/actions/production-quality-control-plan'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Confirm production quality control plan API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const confirmProductionQcPlanApi = (params) => {
  const uri = `v1/quality-controls/quality-plans/${params.id}/confirm`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doConfirmProductionQcPlan(action) {
  try {
    const response = yield call(confirmProductionQcPlanApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmProductionQcPlanSuccess(response?.payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(
        'qmsx:productionQualityControlPlan.notification.confirmSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(confirmProductionQcPlanFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch confirm production quality control plan
 */
export default function* watchConfirmProductionQcPlan() {
  yield takeLatest(
    CONFIRM_PRODUCTION_QUALITY_CONTROL_PLAN_START,
    doConfirmProductionQcPlan,
  )
}
