import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { getAppStore } from '~/modules/auth/redux/actions/app-store'
import {
  deleteCustomerFailed,
  deleteCustomerSuccess,
  DELETE_CUSTOMER_START,
} from '~/modules/mesx/redux/actions/define-customer'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteCustomerApi = (params) => {
  const uri = `/v1/sales/customers/${params}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteCustomer(action) {
  try {
    const response = yield call(deleteCustomerApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteCustomerSuccess(response.results))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      yield put(getAppStore())

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(deleteCustomerFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchDeleteCustomer() {
  yield takeLatest(DELETE_CUSTOMER_START, doDeleteCustomer)
}
