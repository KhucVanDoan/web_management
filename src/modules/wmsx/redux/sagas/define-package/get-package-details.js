import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getPackageDetailsByIdFailed,
  getPackageDetailsByIdSuccess,
  GET_PACKAGE_DETAILS_START,
} from '~/modules/wmsx/redux/actions/define-package'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getPackageDetailsApi = (params) => {
  const uri = `/v1/items/packages/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetPackageDetails(action) {
  try {
    const response = yield call(getPackageDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getPackageDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getPackageDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetPackageDetails() {
  yield takeLatest(GET_PACKAGE_DETAILS_START, doGetPackageDetails)
}
