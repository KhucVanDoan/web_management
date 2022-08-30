import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchPackagesFailed,
  searchPackagesSuccess,
  SEARCH_PACKAGES_START,
} from '~/modules/wmsx/redux/actions/define-package'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const searchPackagesApi = (params) => {
  const uri = `/v1/items/packages/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchPackages(action) {
  try {
    const response = yield call(searchPackagesApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchPackagesSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchPackagesFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchSearchPackages() {
  yield takeLatest(SEARCH_PACKAGES_START, doSearchPackages)
}
