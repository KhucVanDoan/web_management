import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getDepartmentAssignDetailsFailed,
  getDepartmentAssignDetailsSuccess,
  GET_DEPARTMENT_ASSIGN_DETAILS_START,
} from '~/modules/configuration/redux/actions/department-list'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getDepartmentAssignDetailsApi = (params) => {
  const uri = `/v1/users/category-group-permissions/group-permissions?departmentId=${params.departmentId}&page=${params.page}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetDepartmentAssignDetails(action) {
  try {
    const response = yield call(getDepartmentAssignDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getDepartmentAssignDetailsSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getDepartmentAssignDetailsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetDepartmentAssignDetails() {
  yield takeLatest(
    GET_DEPARTMENT_ASSIGN_DETAILS_START,
    doGetDepartmentAssignDetails,
  )
}
