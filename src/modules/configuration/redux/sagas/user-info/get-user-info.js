import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getUserInfoDetailsFailed,
  getUserInfoDetailsSuccess,
  GET_USER_INFO_DETAILS_START,
} from '~/modules/configuration/redux/actions/user-info'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getUserInfoDetailsApi = (params) => {
  const uri = `/v1/users/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetUserInfoDetails(action) {
  try {
    const response = yield call(getUserInfoDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getUserInfoDetailsSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getUserInfoDetailsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetUserInfoDetails() {
  yield takeLatest(GET_USER_INFO_DETAILS_START, doGetUserInfoDetails)
}
