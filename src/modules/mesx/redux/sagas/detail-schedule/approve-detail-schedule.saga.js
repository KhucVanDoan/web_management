import { call, put, takeLatest } from 'redux-saga/effects'


import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  approveDetailScheduleByIdFailed,
  approveDetailScheduleByIdSuccess,
  APPROVE_DETAIL_SCHEDULE_START,
} from '~/modules/mesx/redux/actions/detail-schedule.action'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Approve detail schedule
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const approveDetailScheduleApi = (params) => {
  const uri = `/v1/produces/work-orders/${params}/schedules/approve`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doApproveDetailSchedule(action) {
  try {
    const response = yield call(approveDetailScheduleApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(approveDetailScheduleByIdSuccess(response.payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(
        'detailSchedule.approveDetailScheduleSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(approveDetailScheduleByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch approve detail schedule
 */
export default function* watchApproveDetailSchedule() {
  yield takeLatest(APPROVE_DETAIL_SCHEDULE_START, doApproveDetailSchedule)
}
