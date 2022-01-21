import { call, put, takeLatest } from 'redux-saga/effects'
import { api } from 'services/api'
import addNotification from 'utils/toast'

import { NOTIFICATION_TYPE } from 'common/constants'
import {
  rejectDetailScheduleByIdFailed,
  rejectDetailScheduleByIdSuccess,
  REJECT_DETAIL_SCHEDULE_START,
} from 'modules/mesx/redux/actions/detail-schedule.action'

/**
 * Reject detail schedule
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const rejectDetailScheduleApi = (params) => {
  const uri = `/v1/produces/work-orders/${params}/schedules/reject`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doRejectDetailSchedule(action) {
  try {
    const response = yield call(rejectDetailScheduleApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(rejectDetailScheduleByIdSuccess(response.payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(
        'detailSchedule.rejectDetailScheduleSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(rejectDetailScheduleByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch reject detail schedule
 */
export default function* watchRejectDetailSchedule() {
  yield takeLatest(REJECT_DETAIL_SCHEDULE_START, doRejectDetailSchedule)
}
