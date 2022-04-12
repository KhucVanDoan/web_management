import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateInputQcPlanFail,
  updateInputQcPlanSuccess,
  UPDATE_INPUT_QUALITY_CONTROL_PLAN_START,
} from '~/modules/qmsx/redux/actions/input-quality-control-plan'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Update input quality control plan API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateInputQcPlanApi = (params) => {
  // const uri = `/v1/quality-controls/quality-plans/${params.id}`;
  const uri = `/v1/quality-controls/quality-plans/ioqc/${params.id}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateInputQcPlan(action) {
  try {
    const response = yield call(updateInputQcPlanApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateInputQcPlanSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(
        'qmsx:inputQualityControlPlan.notification.updateSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateInputQcPlanFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch update input quality control plan
 */
export default function* watchUpdateInputQcPlan() {
  yield takeLatest(UPDATE_INPUT_QUALITY_CONTROL_PLAN_START, doUpdateInputQcPlan)
}
