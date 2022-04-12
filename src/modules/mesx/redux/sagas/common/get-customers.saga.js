import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getCustomersFailed,
  getCustomersSuccess,
  GET_CUSTOMERS_START,
} from '~/modules/mesx/redux/actions/common'
import { api } from '~/services/api'

/**
 * Get all customers API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getCustomersApi = (params) => {
  const uri = `/v1/sales/customers/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetCustomers(action) {
  try {
    const payload = {
      keyword: '',
      filter: [],
      sort: [],
      isGetAll: 1,
    }
    const response = yield call(getCustomersApi, payload)

    if (response?.statusCode === 200) {
      yield put(getCustomersSuccess(response.data.items))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getCustomersFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get all customers
 */
export default function* watchGetCustomers() {
  yield takeLatest(GET_CUSTOMERS_START, doGetCustomers)
}
