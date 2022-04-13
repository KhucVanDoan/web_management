import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteProductionQcPlanFail,
  deleteProductionQcPlanSuccess,
  DELETE_PRODUCTION_QUALITY_CONTROL_PLAN_START,
} from '~/modules/qmsx/redux/actions/production-quality-control-plan'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Delete production quality control plan API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteProductionQcPlanApi = (params) => {
  const uri = `/v1/quality-controls/quality-plans/${params.id}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteProductionQcPlan(action) {
  try {
    const response = yield call(deleteProductionQcPlanApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteProductionQcPlanSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(
        'qmsx:productionQualityControlPlan.notification.deleteSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(deleteProductionQcPlanFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch delete production quality control plan
 */
export default function* watchDeleteProductionQcPlan() {
  yield takeLatest(
    DELETE_PRODUCTION_QUALITY_CONTROL_PLAN_START,
    doDeleteProductionQcPlan,
  )
}
