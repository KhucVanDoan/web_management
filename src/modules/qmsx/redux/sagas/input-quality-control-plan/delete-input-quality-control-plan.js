import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteInputQcPlanFail,
  deleteInputQcPlanSuccess,
  DELETE_INPUT_QUALITY_CONTROL_PLAN_START,
} from '~/modules/qmsx/redux/actions/input-quality-control-plan'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Delete input quality control plan API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteInputQcPlanApi = (params) => {
  const uri = `/v1/quality-controls/quality-plans/ioqc/${params.id}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteInputQcPlan(action) {
  try {
    const response = yield call(deleteInputQcPlanApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteInputQcPlanSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(
        'qmsx:inputQualityControlPlan.notification.deleteSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(deleteInputQcPlanFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch delete input quality control plan
 */
export default function* watchDeleteInputQcPlan() {
  yield takeLatest(DELETE_INPUT_QUALITY_CONTROL_PLAN_START, doDeleteInputQcPlan)
}
