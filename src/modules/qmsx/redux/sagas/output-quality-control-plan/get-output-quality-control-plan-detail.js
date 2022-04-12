import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  getOutputQcPlanDetailByIdFail,
  getOutputQcPlanDetailByIdSuccess,
  GET_OUTPUT_QUALITY_CONTROL_PLAN_DETAIL_START,
} from '~/modules/qmsx/redux/actions/output-quality-control-plan'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Get output quality control plan API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getOutputQcPlanDetailApi = (params) => {
  const uri = `v1/quality-controls/quality-plans/ioqc/${params.id}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetOutputQcPlanDetail(action) {
  try {
    const response = yield call(getOutputQcPlanDetailApi, action?.payload)
    if (response?.statusCode === 200) {
      yield put(getOutputQcPlanDetailByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getOutputQcPlanDetailByIdFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get output quality control plan details
 */
export default function* watchGetOutputQcPlanDetail() {
  yield takeLatest(
    GET_OUTPUT_QUALITY_CONTROL_PLAN_DETAIL_START,
    doGetOutputQcPlanDetail,
  )
}
