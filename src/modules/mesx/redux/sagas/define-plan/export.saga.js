import { call, put, takeLatest } from 'redux-saga/effects'
import { api } from 'services/api'
import {
  EXPORT_PLAN_REPORT,
  exportPlanReportSuccess,
} from 'modules/mesx/redux/actions/plan-report.action'

/**
 * export plan report API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const exportPlanReportApi = (params) => {
  const uri = `/v1/reports/produces/boqs-proccess/reports/export`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doExportPlanReport(action) {
  try {
    const response = yield call(exportPlanReportApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(exportPlanReportSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Get data saga
 */
export default function* watchExportPlanReport() {
  yield takeLatest(EXPORT_PLAN_REPORT, doExportPlanReport)
}
