import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createInputQcPlanFail,
  createInputQcPlanSuccess,
  CREATE_INPUT_QUALITY_CONTROL_PLAN_START,
} from '~/modules/qmsx/redux/actions/input-quality-control-plan'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Create input quality control plan API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const createInputQcPlanApi = (params) => {
  const uri = `/v1/quality-controls/quality-plans/ioqc`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateInputQcPlan(action) {
  try {
    const response = yield call(createInputQcPlanApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createInputQcPlanSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(
        'qmsx:inputQualityControlPlan.notification.createSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(createInputQcPlanFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch create input quality control plan
 */
export default function* watchCreateInputQcPlan() {
  yield takeLatest(CREATE_INPUT_QUALITY_CONTROL_PLAN_START, doCreateInputQcPlan)
}
