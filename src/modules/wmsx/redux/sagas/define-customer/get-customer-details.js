import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getCustomerDetailsByIdFailed,
  getCustomerDetailsByIdSuccess,
  WMSX_GET_CUSTOMER_DETAILS_START,
} from '~/modules/wmsx/redux/actions/define-customer'
import { api } from '~/services/api'
/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getCustomerDetailsApi = (params) => {
  const uri = `/v1/sales/customers/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetCustomerDetails(action) {
  try {
    const response = yield call(getCustomerDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getCustomerDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getCustomerDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetCustomerDetails() {
  yield takeLatest(WMSX_GET_CUSTOMER_DETAILS_START, doGetCustomerDetails)
}
