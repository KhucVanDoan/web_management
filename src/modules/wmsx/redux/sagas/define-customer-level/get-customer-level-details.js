import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getCustomerLevelDetailsByIdFailed,
  getCustomerLevelDetailsByIdSuccess,
  GET_CUSTOMER_LEVEL_DETAILS_START,
} from '~/modules/wmsx/redux/actions/define-customer-level'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getCustomerLevelDetailsApi = (params) => {
  const uri = `/v1/warehouse-yard/customer-classes/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetCustomerLevelDetails(action) {
  try {
    const response = yield call(getCustomerLevelDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getCustomerLevelDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getCustomerLevelDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetCustomerLevelDetails() {
  yield takeLatest(GET_CUSTOMER_LEVEL_DETAILS_START, doGetCustomerLevelDetails)
}
