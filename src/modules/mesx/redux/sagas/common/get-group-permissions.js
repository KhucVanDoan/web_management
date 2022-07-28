import { call, put, takeLatest } from 'redux-saga/effects'

import {
  GET_GROUP_PERMISSIONS_FAILED,
  GET_GROUP_PERMISSIONS_START,
  GET_GROUP_PERMISSIONS_SUCCESS,
} from '~/modules/mesx/redux/actions/common'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getGroupPermissionsApi = (params) => {
  const uri = `/v1/users/group-permissions`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetGroupPermissions(action) {
  try {
    const response = yield call(getGroupPermissionsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put({
        type: GET_GROUP_PERMISSIONS_SUCCESS,
        payload: response.data,
      })

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put({
      type: GET_GROUP_PERMISSIONS_FAILED,
    })
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetGroupPermissions() {
  yield takeLatest(GET_GROUP_PERMISSIONS_START, doGetGroupPermissions)
}
