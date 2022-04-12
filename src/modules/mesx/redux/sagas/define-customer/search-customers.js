import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchCustomersFailed,
  searchCustomersSuccess,
  SEARCH_CUSTOMERS_START,
} from '~/modules/mesx/redux/actions/define-customer'
import { api } from '~/services/api'

/**
 * Search factory API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchCustomersApi = (params) => {
  const uri = `/v1/sales/customers/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchCustomers(action) {
  try {
    const response = yield call(searchCustomersApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchCustomersSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchCustomersFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search factorys
 */
export default function* watchSearchCustomers() {
  yield takeLatest(SEARCH_CUSTOMERS_START, doSearchCustomers)
}
