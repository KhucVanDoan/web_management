import { all } from 'redux-saga/effects'

import doGetCompanyCustomerSettingDetails from './company-customer-setting/get-company-customer-setting'
import watchUpdateCompanyCustomerSetting from './company-customer-setting/update-company-customer-setting'

/**
 * Root saga
 */
export default function* sagas() {
  yield all([
    doGetCompanyCustomerSettingDetails(),
    watchUpdateCompanyCustomerSetting(),
  ])
}
