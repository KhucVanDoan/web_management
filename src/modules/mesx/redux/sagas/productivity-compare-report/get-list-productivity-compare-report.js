import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getReportProductivityCompareFailed,
  getReportProductivityCompareSuccess,
  GET_REPORT_PRODUCTIVITY_COMPARE_START,
} from '~/modules/mesx/redux/actions/productivity-compare'
import { api } from '~/services/api'

/**
 * Search producing step API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getProductivityCompareListApi = (params) => {
  const uri = `/v1/produces/reports/productivity-assessments`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetProductivityCompareList(action) {
  try {
    const response = yield call(getProductivityCompareListApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getReportProductivityCompareSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      yield put(getReportProductivityCompareFailed())
    }
  } catch (error) {
    yield put(getReportProductivityCompareFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetProductivityCompareList() {
  yield takeLatest(
    GET_REPORT_PRODUCTIVITY_COMPARE_START,
    doGetProductivityCompareList,
  )
}
