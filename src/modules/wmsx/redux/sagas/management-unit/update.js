import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateManagementUnitFailed,
  updateManagementUnitSuccess,
  UPDATE_MANAGEMENT_UNIT_START,
} from '~/modules/wmsx/redux/actions/management-unit'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const updateUnitManagementApi = (params) => {
  const uri = `/v1/users/department-settings/${params?.id}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateUnitManagement(action) {
  try {
    const response = yield call(updateUnitManagementApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateManagementUnitSuccess(response.results))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateManagementUnitFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchUpdateUnitManagement() {
  yield takeLatest(UPDATE_MANAGEMENT_UNIT_START, doUpdateUnitManagement)
}
