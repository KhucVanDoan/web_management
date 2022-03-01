import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createDetailScheduleFailed,
  createDetailScheduleSuccess,
  CREATE_DETAIL_SCHEDULE_START,
} from '~/modules/mesx/redux/actions/detail-schedule'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const createDetailScheduleApi = (params) => {
  const uri = `/v1/produces/work-orders/${params.workOrderId}/schedules`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateDetailSchedule(action) {
  try {
    const response = yield call(createDetailScheduleApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createDetailScheduleSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(
        'detailSchedule.createDetailScheduleSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(createDetailScheduleFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateDetailSchedule() {
  yield takeLatest(CREATE_DETAIL_SCHEDULE_START, doCreateDetailSchedule)
}
