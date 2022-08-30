import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createReasonManagementFailed,
  createReasonManagementSuccess,
  CREATE_REASON_MANAGEMENT_START,
} from '~/modules/wmsx/redux/actions/reason-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
/**
 * Search user API
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const createReasonManagementApi = (body) => {
  const uri = `/v1/sales/reasons/create`
  return api.post(uri, body)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateReasonManagement(action) {
  try {
    const response = yield call(createReasonManagementApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createReasonManagementSuccess(response.data))

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
    yield put(createReasonManagementFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateReasonManagement() {
  yield takeLatest(CREATE_REASON_MANAGEMENT_START, doCreateReasonManagement)
}
