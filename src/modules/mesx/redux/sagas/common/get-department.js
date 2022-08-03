import { call, put, takeLatest } from 'redux-saga/effects'

import {
  GET_DEPARTMENTS_START,
  GET_DEPARTMENTS_SUCCESS,
  GET_DEPARTMENTS_FAILED,
} from '~/modules/mesx/redux/actions/common'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getDepartmentsApi = (params) => {
  const uri = `/v1/users/department/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetDepartments(action) {
  try {
    const response = yield call(getDepartmentsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put({
        type: GET_DEPARTMENTS_SUCCESS,
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
      type: GET_DEPARTMENTS_FAILED,
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
export default function* watchGetDepartments() {
  yield takeLatest(GET_DEPARTMENTS_START, doGetDepartments)
}
