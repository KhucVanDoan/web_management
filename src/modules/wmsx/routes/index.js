import ChangePassword from '~/modules/configuration/feature/user-info/change-password'
import UserInfoDetail from '~/modules/configuration/feature/user-info/user-detail'
import UserManagement from '~/modules/mesx/features/user-management'
import UserManagementDetail from '~/modules/mesx/features/user-management/user-detail'
import UserManagementForm from '~/modules/mesx/features/user-management/user-form'

import { ROLE } from '../constants'
import WarehouseImportReceiptDetail from '../features/warehouse-import-receipt/detail'
import WarehouseImportReceiptForm from '../features/warehouse-import-receipt/form'
import WarehouseImportReceipt from '../features/warehouse-import-receipt/list'
import { ROUTE } from './config'

const routes = [
  {
    name: ROUTE.WAREHOUSE_IMPORT_RECEIPT.LIST.TITLE,
    path: ROUTE.WAREHOUSE_IMPORT_RECEIPT.LIST.PATH,
    component: WarehouseImportReceipt,
    role: [ROLE.ADMIN, ROLE.USER, ROLE.DRIVER],
    isInSidebar: true,
  },
  {
    name: ROUTE.WAREHOUSE_IMPORT_RECEIPT.CREATE.TITLE,
    path: ROUTE.WAREHOUSE_IMPORT_RECEIPT.CREATE.PATH,
    component: WarehouseImportReceiptForm,
    role: [ROLE.ADMIN, ROLE.USER, ROLE.DRIVER],
    isInSidebar: false,
  },
  {
    name: ROUTE.WAREHOUSE_IMPORT_RECEIPT.DETAIL.TITLE,
    path: ROUTE.WAREHOUSE_IMPORT_RECEIPT.DETAIL.PATH,
    component: WarehouseImportReceiptDetail,
    role: [ROLE.ADMIN, ROLE.USER, ROLE.DRIVER],
    isInSidebar: false,
  },
  {
    name: ROUTE.WAREHOUSE_IMPORT_RECEIPT.EDIT.TITLE,
    path: ROUTE.WAREHOUSE_IMPORT_RECEIPT.EDIT.PATH,
    component: WarehouseImportReceiptForm,
    role: [ROLE.ADMIN, ROLE.USER, ROLE.DRIVER],
    isInSidebar: false,
  },

  {
    name: ROUTE.USER_MANAGEMENT.LIST.TITLE,
    path: ROUTE.USER_MANAGEMENT.LIST.PATH,
    component: UserManagement,
    role: [ROLE.ADMIN],
    isInSidebar: true,
  },

  {
    name: ROUTE.USER_MANAGEMENT.CREATE.TITLE,
    path: ROUTE.USER_MANAGEMENT.CREATE.PATH,
    component: UserManagementForm,
    role: [ROLE.ADMIN],
    isInSidebar: false,
  },
  {
    name: ROUTE.USER_MANAGEMENT.DETAIL.TITLE,
    path: ROUTE.USER_MANAGEMENT.DETAIL.PATH,
    component: UserManagementDetail,
    role: [ROLE.ADMIN, ROLE.USER, ROLE.DRIVER],
    isInSidebar: false,
  },
  {
    name: ROUTE.USER_MANAGEMENT.EDIT.TITLE,
    path: ROUTE.USER_MANAGEMENT.EDIT.PATH,
    component: UserManagementForm,
    role: [ROLE.ADMIN],
    isInSidebar: false,
  },
  {
    name: ROUTE.ACCOUNT.DETAIL.TITLE,
    path: ROUTE.ACCOUNT.DETAIL.PATH,
    component: UserInfoDetail,
    role: [ROLE.ADMIN, ROLE.USER, ROLE.DRIVER],
  },
  {
    name: ROUTE.ACCOUNT.CHANGE_PASSWORD.TITLE,
    path: ROUTE.ACCOUNT.CHANGE_PASSWORD.PATH,
    component: ChangePassword,
    role: [ROLE.ADMIN, ROLE.USER, ROLE.DRIVER],
  },
]
export default routes
