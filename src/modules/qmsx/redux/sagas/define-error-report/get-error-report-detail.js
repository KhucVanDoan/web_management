import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getErrorReportDetailByIdFail,
  getErrorReportDetailByIdSuccess,
  GET_ERROR_REPORT_DETAIL_START,
} from '~/modules/qmsx/redux/actions/define-error-report'
import { api } from '~/services/api'

/**
 * Get error-report detail API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getErrorReportDetailApi = (params) => {
  const uri = `/v1/quality-controls/error-reports/web/${params.id}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetErrorReportDetail(action) {
  try {
    const response = yield call(getErrorReportDetailApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getErrorReportDetailByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getErrorReportDetailByIdFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get error-report detail
 */
export default function* watchGetErrorReportDetail() {
  yield takeLatest(GET_ERROR_REPORT_DETAIL_START, doGetErrorReportDetail)
}
