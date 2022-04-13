import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  getOutputPlanByOrderIdFail,
  getOutputPlanByOrderIdSuccess,
  GET_OUTPUT_PLAN_BY_ORDER_ID_START,
} from '~/modules/qmsx/redux/actions/output-quality-control-plan'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Get output-plan (từ bên MESx) by orderId API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getOutputPlanByOrderIdApi = (params) => {
  const uri = `v1/quality-controls/quality-plans/${params?.endpointPatch}/${params?.id}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetOutputPlanByOrderId(action) {
  try {
    const response = yield call(getOutputPlanByOrderIdApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getOutputPlanByOrderIdSuccess(response?.data))
      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getOutputPlanByOrderIdFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get output-plan by orderId
 */
export default function* watchGetOutputPlanByOrderId() {
  yield takeLatest(GET_OUTPUT_PLAN_BY_ORDER_ID_START, doGetOutputPlanByOrderId)
}
