import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchDetailsFailed,
  searchDetailsSuccess,
  SEARCH_DETAILS_START,
} from '~/modules/wmsx/redux/actions/define-detail'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchDetailsApi = (params) => {
  const uri = `/v1/items/item-details/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchDetails(action) {
  try {
    const response = yield call(searchDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchDetailsSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchDetailsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchSearchDetails() {
  yield takeLatest(SEARCH_DETAILS_START, doSearchDetails)
}
