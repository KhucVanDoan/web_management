import { call, put, takeLatest } from 'redux-saga/effects'
import { api } from 'services/api'
import {
  searchDetailScheduleFailed,
  searchDetailScheduleSuccess,
  SEARCH_DETAIL_SCHEDULE_START,
} from 'modules/mesx/redux/actions/detail-schedule.action'

/**
 * Search DetailSchedule API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchDetailScheduleApi = (params) => {
  const uri = `/v1/produces/work-orders/schedules/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchDetailSchedule(action) {
  try {
    const response = yield call(searchDetailScheduleApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data,
        total: response.data.length,
      }

      yield put(searchDetailScheduleSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchDetailScheduleFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search DetailSchedule
 */
export default function* watchSearchDetailSchedule() {
  yield takeLatest(SEARCH_DETAIL_SCHEDULE_START, doSearchDetailSchedule)
}
