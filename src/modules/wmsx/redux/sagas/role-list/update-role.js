import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateRoleFailed,
  updateRoleSuccess,
  UPDATE_ROLE_START,
} from '~/modules/wmsx/redux/actions/role-list'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const updateRoleApi = (body) => {
  const uri = `/v1/users/user-role-settings/${body.id}`
  return api.put(uri, body)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateRole(action) {
  try {
    const response = yield call(updateRoleApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateRoleSuccess(response.data))

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
    yield put(updateRoleFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchUpdateRole() {
  yield takeLatest(UPDATE_ROLE_START, doUpdateRole)
}
