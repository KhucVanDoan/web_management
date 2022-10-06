import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteRoleFailed,
  deleteRoleSuccess,
  DELETE_ROLE_START,
} from '~/modules/configuration/redux/actions/role-list'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
/**
 * Delete role API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteRoleApi = (params) => {
  const uri = `/v1/users/user-role-settings/${params}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteRole(action) {
  try {
    const response = yield call(deleteRoleApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteRoleSuccess(response.results))

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
    yield put(deleteRoleFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchDeleteRole() {
  yield takeLatest(DELETE_ROLE_START, doDeleteRole)
}
