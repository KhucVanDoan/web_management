import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  confirmSOExportByIdFailed,
  confirmSOExportByIdSuccess,
  WMSX_CONFIRM_SO_EXPORT_START,
} from '../../actions/so-export'

/**
 * Confirm so export
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const confirmSOExportApi = (params) => {
  const uri = `/v1/sales/sale-order-exports/${params}/confirm`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doConfirmSOExport(action) {
  try {
    const response = yield call(confirmSOExportApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmSOExportByIdSuccess(response.payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(confirmSOExportByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch confirm so export
 */
export default function* watchConfirmSOExport() {
  yield takeLatest(WMSX_CONFIRM_SO_EXPORT_START, doConfirmSOExport)
}
