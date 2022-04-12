import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getDataProductivityReportFailed,
  getDataProductivityReportSuccess,
  GET_DATA_PRODUCTIVITY_REPORT_START,
} from '~/modules/mesx/redux/actions/productivity-report'
import { api } from '~/services/api'

/**
 * get data productivities report
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getDataProductivityReportApi = (params) => {
  const uri = `/v1/produces/reports/productivities`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetDataProductivityReport(action) {
  try {
    const response = yield call(getDataProductivityReportApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getDataProductivityReportSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getDataProductivityReportFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get data
 */
export default function* watchGetDataProductivityReport() {
  yield takeLatest(
    GET_DATA_PRODUCTIVITY_REPORT_START,
    doGetDataProductivityReport,
  )
}
