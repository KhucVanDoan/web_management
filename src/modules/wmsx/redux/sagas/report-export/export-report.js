import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  exportReportFailed,
  // exportReportSuccess,
  EXPORT_REPORT_START,
} from '~/modules/wmsx/redux/actions/report-export'
import { reportApi } from '~/services/api'
import { getFileNameFromHeader } from '~/utils/api'
import addNotification from '~/utils/toast'

export const exportReportApi = async (params) => {
  const uri = `/v1/reports/export`
  const res = await reportApi.get(uri, params, {
    responseType: 'blob',
    getHeaders: true,
  })
  const filename = getFileNameFromHeader(res)
  const blob = new Blob([res?.data])
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  const nameFile = decodeURI(filename)
  link.setAttribute('download', nameFile)
  document.body.appendChild(link)
  link.click()
  URL.revokeObjectURL(url)
}

function* doExportReport(action) {
  try {
    const response = yield call(exportReportApi, action?.payload)

    if (response?.statusCode === 200) {
      // yield put(exportReportSuccess(response.data))
      // // Call callback action if provided
      // if (action.onSuccess) {
      //   yield action.onSuccess()
      // }
      // addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
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
