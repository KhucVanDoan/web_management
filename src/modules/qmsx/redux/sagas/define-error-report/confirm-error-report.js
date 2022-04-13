import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmErrorReportFail,
  confirmErrorReportSuccess,
  CONFIRM_ERROR_REPORT_START,
} from '~/modules/qmsx/redux/actions/define-error-report'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Confirm error-report API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const confirmErrorReportApi = (params) => {
  const uri = `/v1/quality-controls/error-reports/${params?.endPointPatch}/confirm/${params?.id}`
  return api.patch(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doConfirmErrorReport(action) {
  try {
    const response = yield call(confirmErrorReportApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmErrorReportSuccess(response?.payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(
        'qmsx:defineErrorReport.notification.confirmSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(confirmErrorReportFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch confirm error-report
 */
export default function* watchConfirmErrorReport() {
  yield takeLatest(CONFIRM_ERROR_REPORT_START, doConfirmErrorReport)
}
