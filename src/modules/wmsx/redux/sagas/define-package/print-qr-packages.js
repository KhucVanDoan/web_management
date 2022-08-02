import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  printQRPackagesFailed,
  printQRPackagesSuccess,
  PRINT_QR_PACKAGES_START,
} from '~/modules/wmsx/redux/actions/define-package'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Print QR packages
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const printQRPackagesApi = (params) => {
  const uri = `/v1/items/qr-code/print`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doPrintQRPackages(action) {
  try {
    const response = yield call(printQRPackagesApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(printQRPackagesSuccess(response.results))

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
    yield put(printQRPackagesFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch print QR packages
 */
export default function* watchPrintQRPackages() {
  yield takeLatest(PRINT_QR_PACKAGES_START, doPrintQRPackages)
}
