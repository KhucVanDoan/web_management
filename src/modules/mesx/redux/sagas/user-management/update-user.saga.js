import { NOTIFICATION_TYPE } from 'common/constants'
import addNotification from 'utils/toast'
import { call, put, takeLatest } from 'redux-saga/effects'
import { api } from 'services/api'
import {
  updateUserFailed,
  updateUserSuccess,
  UPDATE_USER_START,
} from 'modules/mesx/redux/actions/user-management.action'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateUserApi = (params) => {
  const uri = `/v1/users/${params.id}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateUser(action) {
  try {
    const response = yield call(updateUserApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateUserSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(
        'userManagement.updateUserSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateUserFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchUpdateUser() {
  yield takeLatest(UPDATE_USER_START, doUpdateUser)
}
