import { call, put, takeLatest } from 'redux-saga/effects'
import { api } from 'services/api'
import addNotification from 'utils/toast'
import {
  updateSOExportFailed,
  updateSOExportSuccess,
  UPDATE_SO_EXPORT_START,
} from 'modules/mesx/redux/actions/so-export.action'
import { NOTIFICATION_TYPE } from 'common/constants'

/**
 * Update so export API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateSOExportApi = (params) => {
  const uri = `/v1/sales/sale-order-exports/${params.id}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateSOExport(action) {
  try {
    const response = yield call(updateSOExportApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateSOExportSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(
        'soExport.updateSOExportSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateSOExportFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search so export
 */
export default function* watchUpdateSOExport() {
  yield takeLatest(UPDATE_SO_EXPORT_START, doUpdateSOExport)
}
