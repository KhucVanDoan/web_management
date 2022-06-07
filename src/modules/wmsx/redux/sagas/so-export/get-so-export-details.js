import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  getSOExportDetailsByIdFailed,
  getSOExportDetailsByIdSuccess,
  WMSX_GET_SO_EXPORT_DETAILS_START,
} from '../../actions/so-export'

/**
 * get so export details
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getSOExportDetailsApi = (params) => {
  const uri = `/v1/sales/sale-order-exports/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetSOExportDetails(action) {
  try {
    const response = yield call(getSOExportDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getSOExportDetailsByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getSOExportDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get so export detail
 */
export default function* watchGetSOExportDetails() {
  yield takeLatest(WMSX_GET_SO_EXPORT_DETAILS_START, doGetSOExportDetails)
}
