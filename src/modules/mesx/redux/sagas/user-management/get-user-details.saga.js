import { call, put, takeLatest } from 'redux-saga/effects'
import { api } from 'services/api'
import {
  getUserDetailsByIdFailed,
  getUserDetailsByIdSuccess,
  GET_USER_DETAILS_START,
} from 'modules/mesx/redux/actions/user-management.action'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getUserDetailsApi = (params) => {
  const uri = `/v1/users/${params}`
  return api.get(uri)
}
/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetUserDetails(action) {
  try {
    const response = yield call(getUserDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getUserDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getUserDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetUserDetails() {
  yield takeLatest(GET_USER_DETAILS_START, doGetUserDetails)
}
