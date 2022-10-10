import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createRoleFailed,
  createRoleSuccess,
  CREATE_ROLE_START,
} from '~/modules/wmsx/redux/actions/role-list'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Create role API
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const createRoleApi = (body) => {
  const uri = `/v1/users/user-role-settings`
  return api.post(uri, body)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateRole(action) {
  try {
    const response = yield call(createRoleApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createRoleSuccess(response.data))

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
    yield put(createRoleFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch create role
 */
export default function* watchCreateRole() {
  yield takeLatest(CREATE_ROLE_START, doCreateRole)
}
