import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateRoleAssignFailed,
  updateRoleAssignSuccess,
  UPDATE_ROLE_ASSIGN_START,
} from '~/modules/configuration/redux/actions/role-list'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateRoleAssignApi = (params) => {
  const uri = `/v1/users/user-role-settings/departments/permissions`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateRoleAssign(action) {
  try {
    const response = yield call(updateRoleAssignApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateRoleAssignSuccess(response.data))

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
    yield put(updateRoleAssignFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchUpdateRoleAssign() {
  yield takeLatest(UPDATE_ROLE_ASSIGN_START, doUpdateRoleAssign)
}
