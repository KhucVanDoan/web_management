import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmInputQcPlanFail,
  confirmInputQcPlanSuccess,
  CONFIRM_INPUT_QUALITY_CONTROL_PLAN_START,
} from '~/modules/qmsx/redux/actions/input-quality-control-plan'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Confirm input quality control plan API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const confirmInputQcPlanApi = (params) => {
  const uri = `v1/quality-controls/quality-plans/ioqc/${params.id}/confirm`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doConfirmInputQcPlan(action) {
  try {
    const response = yield call(confirmInputQcPlanApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmInputQcPlanSuccess(response?.payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(
        'qmsx:inputQualityControlPlan.notification.confirmSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(confirmInputQcPlanFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch confirm input quality control plan
 */
export default function* watchConfirmInputQcPlan() {
  yield takeLatest(
    CONFIRM_INPUT_QUALITY_CONTROL_PLAN_START,
    doConfirmInputQcPlan,
  )
}
