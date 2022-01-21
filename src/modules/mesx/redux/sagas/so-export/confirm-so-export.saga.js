import { call, put, takeLatest } from 'redux-saga/effects'
import { api } from 'services/api'
import addNotification from 'utils/toast'

import { NOTIFICATION_TYPE } from 'common/constants'
import {
  confirmSOExportByIdFailed,
  confirmSOExportByIdSuccess,
  CONFIRM_SO_EXPORT_START,
} from 'modules/mesx/redux/actions/so-export.action'

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

      addNotification(
        'soExport.confirmSOExportSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
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
  yield takeLatest(CONFIRM_SO_EXPORT_START, doConfirmSOExport)
}
