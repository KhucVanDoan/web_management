import { call, put, takeLatest } from 'redux-saga/effects'

import { MODAL_MODE, NOTIFICATION_TYPE } from '~/common/constants'
import {
  createWorkCenterPlanFailed,
  createWorkCenterPlanSuccess,
  CREATE_WORK_CENTER_PLAN_START,
} from '~/modules/mesx/redux/actions/work-center-plan.action'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * create work center plan api
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const createWorkCenterPlanApi = (data) => {
  const { workCenterId, params } = data
  const uri = `/v1/produces/work-centers/${workCenterId}/schedules`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateWorkCenterPlan(action) {
  try {
    const response = yield call(createWorkCenterPlanApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createWorkCenterPlanSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      if (action?.payload?.mode === MODAL_MODE.UPDATE)
        addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
      else addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(createWorkCenterPlanFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateWorkCenterPlan() {
  yield takeLatest(CREATE_WORK_CENTER_PLAN_START, doCreateWorkCenterPlan)
}
