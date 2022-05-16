import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createCustomerFailed,
  createCustomerSuccess,
  WMSX_CREATE_CUSTOMER_START,
} from '~/modules/wmsx/redux/actions/define-customer'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const createCustomerApi = (params) => {
  const uri = `/v1/sales/customers/create`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateCustomer(action) {
  try {
    const response = yield call(createCustomerApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createCustomerSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(
        'defineCustomer.createCustomerSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(createCustomerFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateCustomer() {
  yield takeLatest(WMSX_CREATE_CUSTOMER_START, doCreateCustomer)
}
