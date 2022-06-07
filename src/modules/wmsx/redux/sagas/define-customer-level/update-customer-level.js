import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateCustomerLevelFailed,
  updateCustomerLevelSuccess,
  UPDATE_CUSTOMER_LEVEL_START,
} from '~/modules/wmsx/redux/actions/define-customer-level'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const updateCustomerLevelApi = (body) => {
  const uri = `/v1/warehouse-yard/customer-classes/${body.id}`
  return api.put(uri, body)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateCustomerLevel(action) {
  try {
    const response = yield call(updateCustomerLevelApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateCustomerLevelSuccess(response.results))

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
    yield put(updateCustomerLevelFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchUpdateCustomerLevel() {
  yield takeLatest(UPDATE_CUSTOMER_LEVEL_START, doUpdateCustomerLevel)
}
