import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchCustomerLevelsFailed,
  searchCustomerLevelsSuccess,
  SEARCH_CUSTOMER_LEVELS_START,
} from '~/modules/wmsx/redux/actions/define-customer-level'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchCustomerLevelsApi = (params) => {
  const uri = `/v1/warehouse-yard/customer-classes/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchCustomerLevels(action) {
  try {
    const response = yield call(searchCustomerLevelsApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchCustomerLevelsSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchCustomerLevelsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchSearchCustomerLevels() {
  yield takeLatest(SEARCH_CUSTOMER_LEVELS_START, doSearchCustomerLevels)
}
