import { all } from 'redux-saga/effects'

import doGetCompanyCustomerSettingDetails from './company-customer-setting/get-company-customer-setting'
import watchUpdateCompanyCustomerSetting from './company-customer-setting/update-company-customer-setting'
import watchGetDepartmentAssignDetails from './department-list/get-department-assign'
import watchSearchDepartmentList from './department-list/search-department-list'
import watchUpdateDepartmentAssign from './department-list/update-department-assign'
import watchGetRoleAssignDetails from './role-list/get-role-assign'
import watchSearchRoleList from './role-list/search-role-list'
import watchUpdateRoleAssign from './role-list/update-role-assign'
import watchChangePassword from './user-info/change-password'
import watchGetUserInfoDetails from './user-info/get-user-info'
import watchUpdateUserInfo from './user-info/update-user-info'
import watchGetUserPermissionDetails from './user-permission/get-user-permission'
import watchUpdateUserPermission from './user-permission/update-user-permission'

/**
 * Root saga
 */
export default function* sagas() {
  yield all([
    doGetCompanyCustomerSettingDetails(),
    watchUpdateCompanyCustomerSetting(),

    //company-chart
    watchSearchDepartmentList(),
    watchGetDepartmentAssignDetails(),
    watchUpdateDepartmentAssign(),

    //role-list
    watchGetRoleAssignDetails(),
    watchSearchRoleList(),
    watchUpdateRoleAssign(),

    //user-permission
    watchGetUserPermissionDetails(),
    watchUpdateUserPermission(),

    //user-info
    watchGetUserInfoDetails(),
    watchUpdateUserInfo(),
    watchChangePassword(),
  ])
}
