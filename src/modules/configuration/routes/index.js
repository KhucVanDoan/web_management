import UserManagement from '~/modules/mesx/features/user-management'
import UserManagementDetail from '~/modules/mesx/features/user-management/user-detail'
import UserManagementForm from '~/modules/mesx/features/user-management/user-form'
import UserPermission from '~/modules/mesx/features/user-permission'

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
  {
    name: ROUTE.USER_PERMISSION.TITLE,
    path: ROUTE.USER_PERMISSION.PATH,
    component: UserPermission,
    isInSidebar: true,
  },
]

export default routes
