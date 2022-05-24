import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteCustomerLevelFailed,
  deleteCustomerLevelSuccess,
  DELETE_CUSTOMER_LEVEL_START,
} from '~/modules/wmsx/redux/actions/define-customer-level'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteCustomerLevelApi = (params) => {
  const uri = `/v1/warehouse-yard/customer-classes/${params}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteCustomerLevel(action) {
  try {
    const response = yield call(deleteCustomerLevelApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteCustomerLevelSuccess(response.results))

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
    yield put(deleteCustomerLevelFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchDeleteCustomerLevel() {
  yield takeLatest(DELETE_CUSTOMER_LEVEL_START, doDeleteCustomerLevel)
}
