import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  getImportLotNumberFailed,
  getImportLotNumberSuccess,
  WMSX_GET_IMPORT_LOT_NUMBER_START,
} from '../../actions/production-order'

/**
 * Get import lot number API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getImportLotNumberApi = (params) => {
  const uri = `/v1/produces/manufacturing-orders/${params}/item-lots`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetImportLotNumber(action) {
  try {
    const response = yield call(getImportLotNumberApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getImportLotNumberSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getImportLotNumberFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetImportLotNumber() {
  yield takeLatest(WMSX_GET_IMPORT_LOT_NUMBER_START, doGetImportLotNumber)
}
