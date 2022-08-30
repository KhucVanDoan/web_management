import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateUserPermissionFailed,
  updateUserPermissionSuccess,
  UPDATE_USER_PERMISSION_START,
} from '~/modules/configuration/redux/actions/user-permission'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateUserPermissionApi = (params) => {
  const uri = `/v1/users/user-role-settings/departments/permissions`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateUserPermission(action) {
  try {
    const response = yield call(updateUserPermissionApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateUserPermissionSuccess(response.data))

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
    yield put(updateUserPermissionFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchUpdateUserPermission() {
  yield takeLatest(UPDATE_USER_PERMISSION_START, doUpdateUserPermission)
}
