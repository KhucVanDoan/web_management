import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  getInputQcPlanDetailByIdFail,
  getInputQcPlanDetailByIdSuccess,
  GET_INPUT_QUALITY_CONTROL_PLAN_DETAIL_START,
} from '~/modules/qmsx/redux/actions/input-quality-control-plan'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Get input quality control plan API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getInputQcPlanDetailApi = (params) => {
  const uri = `v1/quality-controls/quality-plans/ioqc/${params.id}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetInputQcPlanDetail(action) {
  try {
    const response = yield call(getInputQcPlanDetailApi, action?.payload)
    if (response?.statusCode === 200) {
      yield put(getInputQcPlanDetailByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getInputQcPlanDetailByIdFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get input quality control plan details
 */
export default function* watchGetInputQcPlanDetail() {
  yield takeLatest(
    GET_INPUT_QUALITY_CONTROL_PLAN_DETAIL_START,
    doGetInputQcPlanDetail,
  )
}
