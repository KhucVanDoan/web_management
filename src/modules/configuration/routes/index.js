import UserManagement from '~/modules/mesx/features/user-management'
import UserManagementDetail from '~/modules/mesx/features/user-management/user-detail'
import UserManagementForm from '~/modules/mesx/features/user-management/user-form'

import CompanyChart from '../feature/company-chart/list'
import CompanyCustomerSetting from '../feature/company-customer-setting'
import DepartmentAssign from '../feature/department-list/assign'
import DepartmentList from '../feature/department-list/list'
import DefineRoleDetail from '../feature/role-list/detail'
import DefineRoleForm from '../feature/role-list/form'
import RoleList from '../feature/role-list/list'
import ChangePassword from '../feature/user-info/change-password'
import UserInfoDetail from '../feature/user-info/user-detail'
import UserInfoForm from '../feature/user-info/user-form'
import UserPermission from '../feature/user-permission'
import { ROUTE } from './config'

const routes = [
  {
    name: ROUTE.CONFIGURATION.TITLE,
    icon: 'configuration',
    path: ROUTE.CONFIGURATION.PATH,
    component: UserManagement,
    isInSidebar: false,
  },
  {
    name: ROUTE.COMPANY_CUSTOMER_SETTING.TITLE,
    path: ROUTE.COMPANY_CUSTOMER_SETTING.PATH,
    component: CompanyCustomerSetting,
    isInSidebar: true,
    icon: 'setting',
  },
  {
    name: ROUTE.DECENTRALIZATION.TITLE,
    icon: 'plan',
    isInSidebar: true,
    subMenu: [
      {
        name: ROUTE.COMPANY_CHART.LIST.TITLE,
        path: ROUTE.COMPANY_CHART.LIST.PATH,
        component: CompanyChart,
        isInSidebar: true,
        subMenu: [],
      },
      {
        name: ROUTE.DEPARTMENT_LIST.LIST.TITLE,
        path: ROUTE.DEPARTMENT_LIST.LIST.PATH,
        component: DepartmentList,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEPARTMENT_LIST.ASSIGN.TITLE,
            path: ROUTE.DEPARTMENT_LIST.ASSIGN.PATH,
            component: DepartmentAssign,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.ROLE_LIST.LIST.TITLE,
        path: ROUTE.ROLE_LIST.LIST.PATH,
        component: RoleList,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.ROLE_LIST.CREATE.TITLE,
            path: ROUTE.ROLE_LIST.CREATE.PATH,
            component: DefineRoleForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.ROLE_LIST.DETAIL.TITLE,
            path: ROUTE.ROLE_LIST.DETAIL.PATH,
            component: DefineRoleDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.ROLE_LIST.EDIT.TITLE,
            path: ROUTE.ROLE_LIST.EDIT.PATH,
            component: DefineRoleForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.USER_PERMISSION.TITLE,
        path: ROUTE.USER_PERMISSION.PATH,
        component: UserPermission,
        isInSidebar: true,
      },
      {
        name: ROUTE.USER_MANAGEMENT.LIST.TITLE,
        path: ROUTE.USER_MANAGEMENT.LIST.PATH,
        component: UserManagement,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.USER_MANAGEMENT.CREATE.TITLE,
            path: ROUTE.USER_MANAGEMENT.CREATE.PATH,
            component: UserManagementForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.USER_MANAGEMENT.DETAIL.TITLE,
            path: ROUTE.USER_MANAGEMENT.DETAIL.PATH,
            component: UserManagementDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.USER_MANAGEMENT.EDIT.TITLE,
            path: ROUTE.USER_MANAGEMENT.EDIT.PATH,
            component: UserManagementForm,
            isInSidebar: false,
          },
        ],
      },
    ],
  },
  {
    name: ROUTE.ACCOUNT.DETAIL.TITLE,
    path: ROUTE.ACCOUNT.DETAIL.PATH,
    component: UserInfoDetail,
  },
  {
    name: ROUTE.ACCOUNT.EDIT.TITLE,
    path: ROUTE.ACCOUNT.EDIT.PATH,
    component: UserInfoForm,
  },
  {
    name: ROUTE.ACCOUNT.CHANGE_PASSWORD.TITLE,
    path: ROUTE.ACCOUNT.CHANGE_PASSWORD.PATH,
    component: ChangePassword,
  },
]

export default routes
