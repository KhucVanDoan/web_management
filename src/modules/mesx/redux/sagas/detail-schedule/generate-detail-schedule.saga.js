import { call, put, takeLatest } from 'redux-saga/effects'
import { api } from 'services/api'
import addNotification from 'utils/toast'
import { NOTIFICATION_TYPE } from 'common/constants'
import {
  generateDetailScheduleFailed,
  generateDetailScheduleSuccess,
  GENERATE_DETAIL_SCHEDULE_START,
} from 'modules/mesx/redux/actions/detail-schedule.action'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const generateDetailScheduleApi = (params) => {
  const uri = `/v1/produces/work-orders/${params}/generate`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGenerateDetailSchedule(action) {
  try {
    const response = yield call(generateDetailScheduleApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(generateDetailScheduleSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(
        'detailSchedule.generateDetailScheduleSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(generateDetailScheduleFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGenerateDetailSchedule() {
  yield takeLatest(GENERATE_DETAIL_SCHEDULE_START, doGenerateDetailSchedule)
}
