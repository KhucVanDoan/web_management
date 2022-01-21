import { call, put, takeLatest } from 'redux-saga/effects'
import { api } from 'services/api'
import addNotification from 'utils/toast'
import {
  updateDetailScheduleFailed,
  updateDetailScheduleSuccess,
  UPDATE_DETAIL_SCHEDULE_START,
} from 'modules/mesx/redux/actions/detail-schedule.action'
import { NOTIFICATION_TYPE } from 'common/constants'

/**
 * Update detail schedule api
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateDetailScheduleApi = (params) => {
  const uri = `/v1/produces/work-orders/${params.workOrderId}/schedules`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateDetailSchedule(action) {
  try {
    const response = yield call(updateDetailScheduleApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateDetailScheduleSuccess(response.data))
      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(
        'detailSchedule.updateDetailScheduleSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateDetailScheduleFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search production-orders
 */
export default function* watchUpdateDetailSchedule() {
  yield takeLatest(UPDATE_DETAIL_SCHEDULE_START, doUpdateDetailSchedule)
}
