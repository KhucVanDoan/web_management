import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchRoutingVersionsFailed,
  searchRoutingVersionsSuccess,
  SEARCH_ROUTING_VERSIONS_START,
} from '~/modules/mesx/redux/actions/routing-version.action'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchRoutingVersionsApi = (params) => {
  const uri = `/v1/produces/routing-versions/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchRoutingVersions(action) {
  try {
    const response = yield call(searchRoutingVersionsApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchRoutingVersionsSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchRoutingVersionsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchSearchRoutingVersions() {
  yield takeLatest(SEARCH_ROUTING_VERSIONS_START, doSearchRoutingVersions)
}
