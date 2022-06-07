import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  getExportLotNumberFailed,
  getExportLotNumberSuccess,
  WMSX_GET_EXPORT_LOT_NUMBER_START,
} from '../../actions/production-order'

/**
 * Get import lot number API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getExportLotNumberApi = (params) => {
  const uri = `/v1/sales/export/lots?moId=${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetExportLotNumber(action) {
  try {
    const response = yield call(getExportLotNumberApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getExportLotNumberSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getExportLotNumberFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetExportLotNumber() {
  yield takeLatest(WMSX_GET_EXPORT_LOT_NUMBER_START, doGetExportLotNumber)
}
