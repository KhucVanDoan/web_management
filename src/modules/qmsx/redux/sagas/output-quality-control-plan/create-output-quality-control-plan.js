import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createOutputQcPlanFail,
  createOutputQcPlanSuccess,
  CREATE_OUTPUT_QUALITY_CONTROL_PLAN_START,
} from '~/modules/qmsx/redux/actions/output-quality-control-plan'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Create output quality control plan API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const createOutputQcPlanApi = (params) => {
  const uri = `/v1/quality-controls/quality-plans/ioqc`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateOutputQcPlan(action) {
  try {
    const response = yield call(createOutputQcPlanApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createOutputQcPlanSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(
        'qmsx:outputQualityControlPlan.notification.createSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(createOutputQcPlanFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch create output quality control plan
 */
export default function* watchCreateOutputQcPlan() {
  yield takeLatest(
    CREATE_OUTPUT_QUALITY_CONTROL_PLAN_START,
    doCreateOutputQcPlan,
  )
}
