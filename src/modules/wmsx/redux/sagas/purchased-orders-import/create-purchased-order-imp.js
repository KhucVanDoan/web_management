import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createPOImportFailed,
  createPOImportSuccess,
  CREATE_PO_IMPORT_START,
} from '~/modules/wmsx/redux/actions/purchased-orders-import'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const createPOImportApi = (params) => {
  const uri = `/v1/sales/purchased-order-imports/create`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreatePOSImport(action) {
  try {
    const response = yield call(createPOImportApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createPOImportSuccess(response.data))

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
    yield put(createPOImportFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreatePOSImport() {
  yield takeLatest(CREATE_PO_IMPORT_START, doCreatePOSImport)
}
