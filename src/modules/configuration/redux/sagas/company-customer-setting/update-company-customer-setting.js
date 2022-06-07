import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateCompanyCustomerSettingFailed,
  updateCompanyCustomerSettingSuccess,
  UPDATE_COMPANY_CUSTOMER_SETTING_START,
} from '~/modules/configuration/redux/actions/company-customer-setting'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateCompanyCustomerSettingApi = (params) => {
  const uri = `/v1/users`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateCompanyCustomerSetting(action) {
  try {
    const response = yield call(
      updateCompanyCustomerSettingApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(updateCompanyCustomerSettingSuccess(response.data))

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
    yield put(updateCompanyCustomerSettingFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchUpdateCompanyCustomerSetting() {
  yield takeLatest(
    UPDATE_COMPANY_CUSTOMER_SETTING_START,
    doUpdateCompanyCustomerSetting,
  )
}
