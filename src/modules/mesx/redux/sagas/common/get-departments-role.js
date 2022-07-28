import { call, put, takeLatest } from 'redux-saga/effects'

import {
  GET_DEPARTMENTS_ROLE_FAILED,
  GET_DEPARTMENTS_ROLE_START,
  GET_DEPARTMENTS_ROLE_SUCCESS,
} from '~/modules/mesx/redux/actions/common'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getDepartmentsRoleApi = (params) => {
  const uri = `/v1/users/departments`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetDepartmentsRole(action) {
  try {
    const response = yield call(getDepartmentsRoleApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put({
        type: GET_DEPARTMENTS_ROLE_SUCCESS,
        payload: response.data,
      })

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put({
      type: GET_DEPARTMENTS_ROLE_FAILED,
    })
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetDepartmentsRole() {
  yield takeLatest(GET_DEPARTMENTS_ROLE_START, doGetDepartmentsRole)
}
