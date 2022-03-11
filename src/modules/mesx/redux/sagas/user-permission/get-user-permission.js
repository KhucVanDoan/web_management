import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getUserPermissionDetailsFailed,
  getUserPermissionDetailsSuccess,
  GET_USER_PERMISSION_DETAILS_START,
} from '~/modules/mesx/redux/actions/user-permission'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getUserPermissionDetailsApi = (params) => {
  const uri = `/v1/users/user-permission-settings/departments/${params.department}/roles/${params.role}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetUserPermissionDetails(action) {
  try {
    const response = yield call(getUserPermissionDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getUserPermissionDetailsSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getUserPermissionDetailsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetUserPermissionDetails() {
  yield takeLatest(
    GET_USER_PERMISSION_DETAILS_START,
    doGetUserPermissionDetails,
  )
}
