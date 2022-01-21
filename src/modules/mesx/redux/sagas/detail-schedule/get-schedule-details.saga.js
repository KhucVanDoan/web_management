import { NOTIFICATION_TYPE } from 'common/constants'
import addNotification from 'utils/toast'
import { call, put, takeLatest } from 'redux-saga/effects'
import { api } from 'services/api'
import {
  getDetailScheduleDetailsByIdFailed,
  getDetailScheduleDetailsByIdSuccess,
  GET_DETAIL_SCHEDULE_DETAILS_START,
} from 'modules/mesx/redux/actions/detail-schedule.action'

/**
 * Search DetailSchedule API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getDetailScheduleDetailsApi = (params) => {
  const uri = `v1/produces/work-orders/${params}/schedules`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetDetailScheduleDetails(action) {
  try {
    const response = yield call(getDetailScheduleDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getDetailScheduleDetailsByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getDetailScheduleDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetDetailScheduleDetails() {
  yield takeLatest(
    GET_DETAIL_SCHEDULE_DETAILS_START,
    doGetDetailScheduleDetails,
  )
}
