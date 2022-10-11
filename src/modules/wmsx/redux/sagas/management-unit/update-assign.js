import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateDepartmentAssignFailed,
  updateDepartmentAssignSuccess,
  UPDATE_DEPARTMENT_ASSIGN_START,
} from '~/modules/wmsx/redux/actions/management-unit'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateDepartmentAssignApi = (params) => {
  const uri = `/v1/users/department-settings/${params.id}/group-permissions`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateDepartmentAssign(action) {
  try {
    const response = yield call(updateDepartmentAssignApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateDepartmentAssignSuccess(response.data))
      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateDepartmentAssignFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchUpdateDepartmentAssign() {
  yield takeLatest(UPDATE_DEPARTMENT_ASSIGN_START, doUpdateDepartmentAssign)
}
