import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchUsersFailed,
  searchUsersSuccess,
  SEARCH_USERS_START,
} from '~/modules/mesx/redux/actions/user-management'
import { api } from '~/services/api'
import { validateStatus } from '~/utils/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const searchUsersApi = (params) => {
  const uri = `/v1/users/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchUsers(action) {
  try {
    const response = yield call(searchUsersApi, action?.payload)

    if (validateStatus(response.statusCode)) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchUsersSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchUsersFailed())
    // Call callback action if provided
    if (action.onError) {
      action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchSearchUsers() {
  yield takeLatest(SEARCH_USERS_START, doSearchUsers)
}
