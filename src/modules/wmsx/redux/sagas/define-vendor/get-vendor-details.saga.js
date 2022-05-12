import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  getVendorDetailsByIdFailed,
  getVendorDetailsByIdSuccess,
  GET_VENDOR_DETAILS_START,
} from '../../actions/define-vendor'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getVendorDetailsApi = (params) => {
  const uri = `/v1/sales/vendors/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetVendorDetails(action) {
  try {
    const response = yield call(getVendorDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getVendorDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getVendorDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetVendorDetails() {
  yield takeLatest(GET_VENDOR_DETAILS_START, doGetVendorDetails)
}
