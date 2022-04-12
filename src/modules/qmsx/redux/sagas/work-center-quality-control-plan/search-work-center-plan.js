import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  searchWorkCenterQualityControlPlanFail,
  searchWorkCenterQualityControlPlanSuccess,
  SEARCH_WORK_CENTER_QC_PLAN_START,
} from '~/modules/qmsx/redux/actions/work-center-quality-control-plan'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search work center qc plan by moPlanId
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchWorkCenterQualityControlPlanApi = (params) => {
  const uri = `/v1/quality-controls/quality-plans/${params.id}/work-centers/${params.endpointPatch}`
  return api.get(uri, params?.param)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchWorkCenterQualityControlPlan(action) {
  try {
    const response = yield call(
      searchWorkCenterQualityControlPlanApi,
      action?.payload,
    )
    if (response?.statusCode === 200) {
      const payload = {
        list: response?.data,
        total: response?.data?.length,
      }
      yield put(searchWorkCenterQualityControlPlanSuccess(payload))

      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchWorkCenterQualityControlPlanFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search Work Center Qc Plan by moPlanId
 */
export default function* watchSearchWorkCenterQualityControlPlan() {
  yield takeLatest(
    SEARCH_WORK_CENTER_QC_PLAN_START,
    doSearchWorkCenterQualityControlPlan,
  )
}
