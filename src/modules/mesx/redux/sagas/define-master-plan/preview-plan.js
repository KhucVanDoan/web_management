import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  previewGanttMasterPlanFailed,
  previewGanttMasterPlanSuccess,
  PREVIEW_GANTT_MASTER_PLAN_START,
} from '../../actions/master-plan'

/**
 * create plan
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const previewMasterPlansApi = (params) => {
  const uri = `/v1/plans/moderations/evenly/preview`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doPreviewMasterPlan(action) {
  try {
    const response = yield call(previewMasterPlansApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(previewGanttMasterPlanSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(previewGanttMasterPlanFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(previewGanttMasterPlanFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch create plan
 */
export default function* watchPreviewGanttMasterPlan() {
  yield takeLatest(PREVIEW_GANTT_MASTER_PLAN_START, doPreviewMasterPlan)
}
