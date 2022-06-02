import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getCompanyCustomerSettingDetailsFailed,
  getCompanyCustomerSettingDetailsSuccess,
  GET_COMPANY_CUSTOMER_SETTING_DETAILS_START,
} from '~/modules/configuration/redux/actions/company-customer-setting'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getCompanyCustomerSettingDetailsApi = () => {
  const uri = `/v1/users`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetCompanyCustomerSettingDetails(action) {
  try {
    const response = yield call(
      getCompanyCustomerSettingDetailsApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(getCompanyCustomerSettingDetailsSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getCompanyCustomerSettingDetailsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetCompanyCustomerSettingDetails() {
  yield takeLatest(
    GET_COMPANY_CUSTOMER_SETTING_DETAILS_START,
    doGetCompanyCustomerSettingDetails,
  )
}
