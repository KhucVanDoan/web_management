import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getUsersFailed,
  getUsersSuccess,
  GET_USERS_START,
} from '~/modules/qmsx/redux/actions/common'
import { api } from '~/services/api'

/**
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getUsersApi = (params) => {
  const uri = `/v1/users/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetUsers(action) {
  try {
    const response = yield call(getUsersApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getUsersSuccess(response.data.items))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getUsersFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetUsers() {
  yield takeLatest(GET_USERS_START, doGetUsers)
}
