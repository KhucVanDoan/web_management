import { call, put, takeLatest } from 'redux-saga/effects'


import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  rejectSOExportByIdFailed,
  rejectSOExportByIdSuccess,
  REJECT_SO_EXPORT_START,
} from '~/modules/mesx/redux/actions/so-export.action'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Reject so export
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const rejectSOExportApi = (params) => {
  const uri = `/v1/sales/sale-order-exports/${params}/reject`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doRejectSOExport(action) {
  try {
    const response = yield call(rejectSOExportApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(rejectSOExportByIdSuccess(response.payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(
        'soExport.rejectSOExportSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(rejectSOExportByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch reject so export
 */
export default function* watchRejectSOExport() {
  yield takeLatest(REJECT_SO_EXPORT_START, doRejectSOExport)
}
