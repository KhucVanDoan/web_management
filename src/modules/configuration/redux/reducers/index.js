import { combineReducers } from 'redux'

import companyCustomerSetting from './company-customer-setting'
import departmentList from './department-list'
import roleList from './role-list'
import userPermission from './user-permission'

export default combineReducers({
  companyCustomerSetting,
  departmentList,
  roleList,
  userPermission,
})
