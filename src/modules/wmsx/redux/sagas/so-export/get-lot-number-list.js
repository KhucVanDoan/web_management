import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  getLotNumberListSOExportFailed,
  getLotNumberListSOExportSuccess,
  WMSX_GET_LOT_NUMBER_LIST_SO_EXPORT_START,
} from '../../actions/so-export'

/**
 * Get lot number list
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const getLotNumberListSOExportApi = (payload) => {
  const uri = `/v1/sales/sale-order-exports/items/lots`
  return api.get(uri, payload)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetLotNumberListSOExport(action) {
  try {
    const response = yield call(getLotNumberListSOExportApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getLotNumberListSOExportSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getLotNumberListSOExportFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetLotNumberListSOExport() {
  yield takeLatest(
    WMSX_GET_LOT_NUMBER_LIST_SO_EXPORT_START,
    doGetLotNumberListSOExport,
  )
}
