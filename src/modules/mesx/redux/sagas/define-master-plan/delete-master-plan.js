import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  DELETE_MASTER_PLAN_START,
  deleteMasterPlanFailed,
  deleteMasterPlanSuccess,
} from '~/modules/mesx/redux/actions/master-plan'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteMasterPlanApi = (params) => {
  const uri = `/v1/plans/master-plans/${params}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDelete(action) {
  try {
    const response = yield call(deleteMasterPlanApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteMasterPlanSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(deleteMasterPlanFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchDeleteMasterPlan() {
  yield takeLatest(DELETE_MASTER_PLAN_START, doDelete)
}
