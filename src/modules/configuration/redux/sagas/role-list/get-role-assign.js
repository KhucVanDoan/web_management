import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getRoleAssignDetailsFailed,
  getRoleAssignDetailsSuccess,
  GET_ROLE_ASSIGN_DETAILS_START,
} from '~/modules/configuration/redux/actions/role-list'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getRoleAssignDetailsApi = (params) => {
  const uri = `/v1/users/user-role-settings/departments/permissions`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetRoleAssignDetails(action) {
  try {
    const response = yield call(getRoleAssignDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getRoleAssignDetailsSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getRoleAssignDetailsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetRoleAssignDetails() {
  yield takeLatest(GET_ROLE_ASSIGN_DETAILS_START, doGetRoleAssignDetails)
}
