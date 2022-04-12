import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createProductionQcPlanFail,
  createProductionQcPlanSuccess,
  CREATE_PRODUCTION_QUALITY_CONTROL_PLAN_START,
} from '~/modules/qmsx/redux/actions/production-quality-control-plan'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Create production quality control plan API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const createProductionQcPlanApi = (params) => {
  const uri = `/v1/quality-controls/quality-plans`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateProductionQcPlan(action) {
  try {
    const response = yield call(createProductionQcPlanApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createProductionQcPlanSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(
        'qmsx:productionQualityControlPlan.notification.createSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(createProductionQcPlanFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch create production quality control plan
 */
export default function* watchCreateProductionQcPlan() {
  yield takeLatest(
    CREATE_PRODUCTION_QUALITY_CONTROL_PLAN_START,
    doCreateProductionQcPlan,
  )
}
