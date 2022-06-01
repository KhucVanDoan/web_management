import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updatePOImportFailed,
  updatePOImportSuccess,
  UPDATE_PO_IMPORT_START,
} from '~/modules/wmsx/redux/actions/purchased-orders-import'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Update purchased-order API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updatePOImportApi = (params) => {
  const uri = `/v1/sales/purchased-order-imports/${params.id}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdatePOImport(action) {
  try {
    const response = yield call(updatePOImportApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updatePOImportSuccess(response.data))

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
    yield put(updatePOImportFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search purchased-orders
 */
export default function* watchUpdatePOImport() {
  yield takeLatest(UPDATE_PO_IMPORT_START, doUpdatePOImport)
}
