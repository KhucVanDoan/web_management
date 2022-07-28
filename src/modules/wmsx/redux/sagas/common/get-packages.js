import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getPackagesFailed,
  getPackagesSuccess,
  WMSX_GET_PACKAGES_START,
} from '~/modules/wmsx/redux/actions/common'
import { api } from '~/services/api'

/**
 * Get all items API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const getPackagesApi = (params) => {
  const uri = `/v1/items/packages/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetPackages(action) {
  try {
    const response = yield call(getPackagesApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getPackagesSuccess(response.data.items))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getPackagesFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get all items
 */
export default function* watchGetPackages() {
  yield takeLatest(WMSX_GET_PACKAGES_START, doGetPackages)
}
