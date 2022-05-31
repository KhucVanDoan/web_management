import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getPOImportDetailsByIdFailed,
  getPOImportDetailsByIdSuccess,
  GET_PO_IMPORT_DETAILS_START,
} from '~/modules/wmsx/redux/actions/purchased-orders-import'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getPOSImportDetailsApi = (params) => {
  const uri = `/v1/sales/purchased-order-imports/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetPOSImportDetails(action) {
  try {
    const response = yield call(getPOSImportDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getPOImportDetailsByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getPOImportDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetPOSImportDetails() {
  yield takeLatest(GET_PO_IMPORT_DETAILS_START, doGetPOSImportDetails)
}
