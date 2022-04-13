import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchErrorReportFail,
  searchErrorReportSuccess,
  SEARCH_ERROR_REPORT_START,
} from '~/modules/qmsx/redux/actions/define-error-report'
import { api } from '~/services/api'

/**
 * Search error-report API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchErrorReportApi = (params) => {
  const uri = `/v1/quality-controls/error-reports`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchErrorReport(action) {
  try {
    const response = yield call(searchErrorReportApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response?.data?.items,
        total: response?.data?.meta?.total,
      }

      yield put(searchErrorReportSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchErrorReportFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search error-report
 */
export default function* watchSearchErrorReport() {
  yield takeLatest(SEARCH_ERROR_REPORT_START, doSearchErrorReport)
}
