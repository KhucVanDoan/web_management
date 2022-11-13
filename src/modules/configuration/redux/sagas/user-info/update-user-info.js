import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateUserInfoFailed,
  updateUserInfoSuccess,
  UPDATE_USER_INFO_START,
} from '~/modules/configuration/redux/actions/user-info'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateUserInfoApi = (params) => {
  const uri = `/v1/users/me`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateUserInfo(action) {
  try {
    const response = yield call(updateUserInfoApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateUserInfoSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateUserInfoFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchUpdateUserInfo() {
  yield takeLatest(UPDATE_USER_INFO_START, doUpdateUserInfo)
}
