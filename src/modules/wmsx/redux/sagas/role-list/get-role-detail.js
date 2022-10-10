import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getRoleDetailsByIdFailed,
  getRoleDetailsByIdSuccess,
  GET_ROLE_DETAIL_START,
} from '~/modules/wmsx/redux/actions/role-list'
import { api } from '~/services/api'

/**
 * Get role detail API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getRoleDetailsApi = (params) => {
  const uri = `/v1/users/user-role-settings/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetRoleDetails(action) {
  try {
    const response = yield call(getRoleDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getRoleDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getRoleDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetRoleDetails() {
  yield takeLatest(GET_ROLE_DETAIL_START, doGetRoleDetails)
}
