import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchReasonManagementSuccess,
  searchReasonManagementFailed,
  SEARCH_REASON_MANAGEMENT_START,
} from '~/modules/wmsx/redux/actions/reason-management'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchApi = (params) => {
  const uri = `/v1/sales/reasons/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearch(action) {
  try {
    const response = yield call(searchApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchReasonManagementSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchReasonManagementFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchSearchReasonManagement() {
  yield takeLatest(SEARCH_REASON_MANAGEMENT_START, doSearch)
}
