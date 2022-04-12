import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteOutputQcPlanFail,
  deleteOutputQcPlanSuccess,
  DELETE_OUTPUT_QUALITY_CONTROL_PLAN_START,
} from '~/modules/qmsx/redux/actions/output-quality-control-plan'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Delete output quality control plan API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteOutputQcPlanApi = (params) => {
  const uri = `/v1/quality-controls/quality-plans/ioqc/${params.id}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteOutputQcPlan(action) {
  try {
    const response = yield call(deleteOutputQcPlanApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteOutputQcPlanSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(
        'qmsx:outputQualityControlPlan.notification.deleteSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(deleteOutputQcPlanFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch delete output quality control plan
 */
export default function* watchDeleteOutputQcPlan() {
  yield takeLatest(
    DELETE_OUTPUT_QUALITY_CONTROL_PLAN_START,
    doDeleteOutputQcPlan,
  )
}
