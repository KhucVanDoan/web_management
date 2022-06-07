import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  deleteSOExportFailed,
  deleteSOExportSuccess,
  WMSX_DELETE_SO_EXPORT_START,
} from '../../actions/so-export'

/**
 *
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteSOExportApi = (params) => {
  const uri = `/v1/sales/sale-order-exports/${params}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteSOExport(action) {
  try {
    const response = yield call(deleteSOExportApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteSOExportSuccess(response.data))

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
    yield put(deleteSOExportFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchDeleteSOExport() {
  yield takeLatest(WMSX_DELETE_SO_EXPORT_START, doDeleteSOExport)
}
