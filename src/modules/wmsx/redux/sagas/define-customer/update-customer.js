import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateCustomerFailed,
  updateCustomerSuccess,
  WMSX_UPDATE_CUSTOMER_START,
} from '~/modules/wmsx/redux/actions/define-customer'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateCustomerApi = (params) => {
  const uri = `/v1/sales/customers/${params.id}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateCustomer(action) {
  try {
    const response = yield call(updateCustomerApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateCustomerSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(
        'defineCustomer.updateCustomerSuccess',
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
    yield put(updateCustomerFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchUpdateCustomer() {
  yield takeLatest(WMSX_UPDATE_CUSTOMER_START, doUpdateCustomer)
}