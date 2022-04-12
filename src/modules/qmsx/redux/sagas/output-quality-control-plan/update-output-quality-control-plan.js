import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateOutputQcPlanFail,
  updateOutputQcPlanSuccess,
  UPDATE_OUTPUT_QUALITY_CONTROL_PLAN_START,
} from '~/modules/qmsx/redux/actions/output-quality-control-plan'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Update output quality control plan API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateOutputQcPlanApi = (params) => {
  const uri = `/v1/quality-controls/quality-plans/ioqc/${params.id}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateOutputQcPlan(action) {
  try {
    const response = yield call(updateOutputQcPlanApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateOutputQcPlanSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(
        'qmsx:outputQualityControlPlan.notification.updateSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateOutputQcPlanFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch update output quality control plan
 */
export default function* watchUpdateOutputQcPlan() {
  yield takeLatest(
    UPDATE_OUTPUT_QUALITY_CONTROL_PLAN_START,
    doUpdateOutputQcPlan,
  )
}
