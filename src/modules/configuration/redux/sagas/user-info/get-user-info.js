import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getUserInfoFailed,
  getUserInfoSuccess,
  GET_USER_INFO_START,
} from '~/modules/configuration/redux/actions/user-info'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getUserInfoApi = () => {
  const uri = `/authentication/me`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetUserInfo(action) {
  try {
    const response = yield call(getUserInfoApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getUserInfoSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getUserInfoFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetUserInfo() {
  yield takeLatest(GET_USER_INFO_START, doGetUserInfo)
}
