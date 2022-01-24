import { call, put, takeLatest } from 'redux-saga/effects'


import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteUserFailed,
  deleteUserSuccess,
  DELETE_USER_START,
} from '~/modules/mesx/redux/actions/user-management.action'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteUserApi = (params) => {
  const uri = `/v1/users/${params}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteUser(action) {
  try {
    const response = yield call(deleteUserApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteUserSuccess(response.results))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(
        'userManagement.deleteUserSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(deleteUserFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchDeleteUser() {
  yield takeLatest(DELETE_USER_START, doDeleteUser)
}
