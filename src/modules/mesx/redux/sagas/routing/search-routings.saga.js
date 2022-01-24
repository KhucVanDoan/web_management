import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchRoutingsFailed,
  searchRoutingsSuccess,
  SEARCH_ROUTINGS_START,
} from '~/modules/mesx/redux/actions/routing.action'
import { api } from '~/services/api'

/**
 * Search routing API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchRoutingsApi = (params) => {
  const uri = `/v1/produces/routings/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchRoutings(action) {
  try {
    const response = yield call(searchRoutingsApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }

      yield put(searchRoutingsSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchRoutingsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search routings
 */
export default function* watchSearchRoutings() {
  yield takeLatest(SEARCH_ROUTINGS_START, doSearchRoutings)
}
