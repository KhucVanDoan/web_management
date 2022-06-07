import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createCustomerLevelFailed,
  createCustomerLevelSuccess,
  CREATE_CUSTOMER_LEVEL_START,
} from '~/modules/wmsx/redux/actions/define-customer-level'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
/**
 * Search user API
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const createCustomerLevelApi = (body) => {
  const uri = `/v1/warehouse-yard/customer-classes`
  return api.post(uri, body)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateCustomerLevel(action) {
  try {
    const response = yield call(createCustomerLevelApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createCustomerLevelSuccess(response.data))

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
    yield put(createCustomerLevelFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateCustomerLevel() {
  yield takeLatest(CREATE_CUSTOMER_LEVEL_START, doCreateCustomerLevel)
}
