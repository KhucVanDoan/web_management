import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmOutputQcPlanFail,
  confirmOutputQcPlanSuccess,
  CONFIRM_OUTPUT_QUALITY_CONTROL_PLAN_START,
} from '~/modules/qmsx/redux/actions/output-quality-control-plan'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Confirm output quality control plan API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const confirmOutputQcPlanApi = (params) => {
  const uri = `v1/quality-controls/quality-plans/ioqc/${params.id}/confirm`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doConfirmOutputQcPlan(action) {
  try {
    const response = yield call(confirmOutputQcPlanApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmOutputQcPlanSuccess(response?.payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(
        'qmsx:outputQualityControlPlan.notification.confirmSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(confirmOutputQcPlanFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch confirm output quality control plan
 */
export default function* watchConfirmOutputQcPlan() {
  yield takeLatest(
    CONFIRM_OUTPUT_QUALITY_CONTROL_PLAN_START,
    doConfirmOutputQcPlan,
  )
}
