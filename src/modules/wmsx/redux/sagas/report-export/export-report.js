import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  exportReportFailed,
  exportReportSuccess,
  EXPORT_REPORT_START,
} from '~/modules/wmsx/redux/actions/report-export'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const exportReportApi = (params) => {
  const uri = `/v1/reports/export`
  return api.get(uri, params)
}

function* doExportReport(action) {
  try {
    const response = yield call(exportReportApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(exportReportSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(exportReportFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchExportReport() {
  yield takeLatest(EXPORT_REPORT_START, doExportReport)
}
