export const ROUTE = {
  CONFIGURATION: {
    PATH: '/configuration',
    TITLE: 'configuration',
  },
  DECENTRALIZATION: {
    PATH: '/decentralization',
    TITLE: 'decentralization',
  },
  USER_MANAGEMENT: {
    LIST: {
      PATH: '/configuration/user-management',
      TITLE: 'userManagement',
    },
    CREATE: {
      PATH: '/configuration/user-management/create',
      TITLE: 'userManagementCreate',
    },
    DETAIL: {
      PATH: '/configuration/user-management/:id/detail',
      TITLE: 'userManagementDetail',
    },
    EDIT: {
      PATH: '/configuration/user-management/:id/edit',
      TITLE: 'userManagementEdit',
    },
  },
  USER_PERMISSION: {
    PATH: '/configuration/user-permission',
    TITLE: 'userPermission',
  },
  COMPANY_CUSTOMER_SETTING: {
    PATH: '/configuration/company-customer-setting',
    TITLE: 'companyCustomerSetting',
  },
  COMPANY_CHART: {
    LIST: {
      PATH: '/configuration/company-chart',
      TITLE: 'companyChart',
    },
  },
  DEPARTMENT_LIST: {
    LIST: {
      PATH: '/configuration/department-list',
      TITLE: 'defineDepartment',
    },
    ASSIGN: {
      PATH: '/configuration/department-list/:id/assign',
      TITLE: 'departmentAssign',
    },
  },
  ROLE_LIST: {
    LIST: {
      PATH: '/configuration/role-list',
      TITLE: 'defineRole',
    },
  },
  ACCOUNT: {
    DETAIL: {
      PATH: '/configuration/account',
      TITLE: 'userInfoDetail',
    },
    EDIT: {
      PATH: '/configuration/account/edit',
      TITLE: 'userInfoEdit',
    },
    CHANGE_PASSWORD: {
      PATH: '/configuration/account/change-password',
      TITLE: 'changePassword',
    },
  },
}
