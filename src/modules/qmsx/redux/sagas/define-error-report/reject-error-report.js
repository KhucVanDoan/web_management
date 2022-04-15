import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  rejectErrorReportFail,
  rejectErrorReportSuccess,
  REJECT_ERROR_REPORT_START,
} from '~/modules/qmsx/redux/actions/define-error-report'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Reject error report API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const rejectErrorReportApi = (params) => {
  const uri = `/v1/quality-controls/error-reports/${params?.endPointPatch}/reject/${params?.id}`
  return api.patch(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doRejectErrorReport(action) {
  try {
    const response = yield call(rejectErrorReportApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(rejectErrorReportSuccess(response?.payload))
      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(
        'qmsx:defineErrorReport.notification.rejectSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(rejectErrorReportFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch reject error-report
 */
export default function* watchRejectErrorReport() {
  yield takeLatest(REJECT_ERROR_REPORT_START, doRejectErrorReport)
}