import { FUNCTION_CODE } from '~/common/constants/functionCode'
import ChangePassword from '~/modules/configuration/feature/user-info/change-password'
import UserInfoDetail from '~/modules/configuration/feature/user-info/user-detail'
import UserInfoForm from '~/modules/configuration/feature/user-info/user-form'
import UserManagement from '~/modules/mesx/features/user-management'
import UserManagementDetail from '~/modules/mesx/features/user-management/user-detail'
import UserManagementForm from '~/modules/mesx/features/user-management/user-form'
import Dashboard from '~/modules/wmsx/features/dashboard'

import WarehouseExportReturn from '../features/warehouse-export-receipt/create-warehouse-export-return'
import WarehouseExportReceiptDetail from '../features/warehouse-export-receipt/detail'
import WarehouseExportReturnDetail from '../features/warehouse-export-receipt/detail/detail-warehouse-export-return'
import WarehouseExportReceiptForm from '../features/warehouse-export-receipt/form'
import WarehouseExportReceipt from '../features/warehouse-export-receipt/list'
import WarehouseExportReceiptPickAndExport from '../features/warehouse-export-receipt/pick-and-export'
import WarehouseImportReceiptDetail from '../features/warehouse-import-receipt/detail'
import WarehouseImportReceive from '../features/warehouse-import-receipt/detail/receive'
import WarehouseImportReceiveAndStorage from '../features/warehouse-import-receipt/detail/receive-and-storage'
import WarehouseImportStorage from '../features/warehouse-import-receipt/detail/storaged'
import WarehouseImportReceiptForm from '../features/warehouse-import-receipt/form'
import WarehouseImportReceipt from '../features/warehouse-import-receipt/list'
import WarehouseTransferDetail from '../features/warehouse-transfer/detail'
import PickupAndWarehouseExport from '../features/warehouse-transfer/detail/pickup-and-warehouse-export'
import ReceiveAndStored from '../features/warehouse-transfer/detail/receive-and-stored'
import WarehouseTransferForm from '../features/warehouse-transfer/form'
import WarehouseTransfer from '../features/warehouse-transfer/list'
import { ROUTE } from './config'

const routes = [
  {
    name: ROUTE.DASHBOARD.TITLE,
    path: ROUTE.DASHBOARD.PATH,
    component: Dashboard,
    icon: 'home',
    isInSidebar: true,
  },
  {
    name: ROUTE.RECEIPT_COMMAND_MANAGEMENT.TITLE,
    icon: 'database',
    isInSidebar: true,
    subMenu: [
      {
        name: ROUTE.WAREHOUSE_IMPORT_RECEIPT.LIST.TITLE,
        path: ROUTE.WAREHOUSE_IMPORT_RECEIPT.LIST.PATH,
        component: WarehouseImportReceipt,
        code: FUNCTION_CODE.SALE_LIST_PURCHASED_ORDER_IMPORT,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.WAREHOUSE_IMPORT_RECEIPT.CREATE.TITLE,
            path: ROUTE.WAREHOUSE_IMPORT_RECEIPT.CREATE.PATH,
            component: WarehouseImportReceiptForm,
            code: FUNCTION_CODE.SALE_CREATE_PURCHASED_ORDER_IMPORT,
            isInSidebar: false,
          },
          {
            name: ROUTE.WAREHOUSE_IMPORT_RECEIPT.DETAIL.TITLE,
            path: ROUTE.WAREHOUSE_IMPORT_RECEIPT.DETAIL.PATH,
            component: WarehouseImportReceiptDetail,
            code: FUNCTION_CODE.SALE_DETAIL_PURCHASED_ORDER_IMPORT,
            isInSidebar: false,
          },
          {
            name: ROUTE.WAREHOUSE_IMPORT_RECEIPT.RECEIVE_AND_STORAGE.TITLE,
            path: ROUTE.WAREHOUSE_IMPORT_RECEIPT.RECEIVE_AND_STORAGE.PATH,
            component: WarehouseImportReceiveAndStorage,
            code: FUNCTION_CODE.SALE_RECEIVE_PURCHASED_ORDER_IMPORT,
            isInSidebar: false,
          },
          {
            name: ROUTE.WAREHOUSE_IMPORT_RECEIPT.RECEIVE.TITLE,
            path: ROUTE.WAREHOUSE_IMPORT_RECEIPT.RECEIVE.PATH,
            component: WarehouseImportReceive,
            code: FUNCTION_CODE.SALE_CREATE_PURCHASED_ORDER_IMPORT_RECEIVE,
            isInSidebar: false,
          },
          {
            name: ROUTE.WAREHOUSE_IMPORT_RECEIPT.STORAGE.TITLE,
            path: ROUTE.WAREHOUSE_IMPORT_RECEIPT.STORAGE.PATH,
            component: WarehouseImportStorage,
            code: FUNCTION_CODE.SALE_RECEIVE_PURCHASED_ORDER_IMPORT,
            isInSidebar: false,
          },
          {
            name: ROUTE.WAREHOUSE_IMPORT_RECEIPT.EDIT.TITLE,
            path: ROUTE.WAREHOUSE_IMPORT_RECEIPT.EDIT.PATH,
            component: WarehouseImportReceiptForm,
            code: FUNCTION_CODE.SALE_UPDATE_PURCHASED_ORDER_IMPORT,
            isInSidebar: false,
          },
          {
            name: ROUTE.WAREHOUSE_IMPORT_RECEIPT.EDIT_HEADER.TITLE,
            path: ROUTE.WAREHOUSE_IMPORT_RECEIPT.EDIT_HEADER.PATH,
            component: WarehouseImportReceiptForm,
            code: FUNCTION_CODE.SALE_UPDATE_HEADER_PURCHASED_ORDER_IMPORT,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.WAREHOUSE_EXPORT_RECEIPT.LIST.TITLE,
        path: ROUTE.WAREHOUSE_EXPORT_RECEIPT.LIST.PATH,
        component: WarehouseExportReceipt,
        code: FUNCTION_CODE.SALE_LIST_SALE_ORDER_EXPORT,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.WAREHOUSE_EXPORT_RECEIPT.CREATE.TITLE,
            path: ROUTE.WAREHOUSE_EXPORT_RECEIPT.CREATE.PATH,
            component: WarehouseExportReceiptForm,
            code: FUNCTION_CODE.SALE_CREATE_SALE_ORDER_EXPORT,
            isInSidebar: false,
          },
          {
            name: ROUTE.WAREHOUSE_EXPORT_RECEIPT.CREATE_RETURN.TITLE,
            path: ROUTE.WAREHOUSE_EXPORT_RECEIPT.CREATE_RETURN.PATH,
            component: WarehouseExportReturn,
            code: FUNCTION_CODE.SALE_SALE_ORDER_EXPORT_RETURN,
            isInSidebar: false,
          },
          {
            name: ROUTE.WAREHOUSE_EXPORT_RECEIPT.DETAIL.TITLE,
            path: ROUTE.WAREHOUSE_EXPORT_RECEIPT.DETAIL.PATH,
            component: WarehouseExportReceiptDetail,
            code: FUNCTION_CODE.SALE_DETAIL_SALE_ORDER_EXPORT,
            isInSidebar: false,
          },
          {
            name: ROUTE.WAREHOUSE_EXPORT_RECEIPT.DETAIL_RETURN.TITLE,
            path: ROUTE.WAREHOUSE_EXPORT_RECEIPT.DETAIL_RETURN.PATH,
            component: WarehouseExportReturnDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.WAREHOUSE_EXPORT_RECEIPT.EDIT.TITLE,
            path: ROUTE.WAREHOUSE_EXPORT_RECEIPT.EDIT.PATH,
            component: WarehouseExportReceiptForm,
            code: FUNCTION_CODE.SALE_UPDATE_SALE_ORDER_EXPORT,
            isInSidebar: false,
          },
          {
            name: ROUTE.WAREHOUSE_EXPORT_RECEIPT.EDIT_HEADER.TITLE,
            path: ROUTE.WAREHOUSE_EXPORT_RECEIPT.EDIT_HEADER.PATH,
            component: WarehouseExportReceiptForm,
            code: FUNCTION_CODE.SALE_UPDATE_HEADER_SALE_ORDER_EXPORT,
            isInSidebar: false,
          },
          {
            name: ROUTE.WAREHOUSE_EXPORT_RECEIPT.PICK_AND_EXPORT.TITLE,
            path: ROUTE.WAREHOUSE_EXPORT_RECEIPT.PICK_AND_EXPORT.PATH,
            component: WarehouseExportReceiptPickAndExport,
            code: FUNCTION_CODE.SALE_COLLECT_SALE_ORDER_EXPORT,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.WAREHOUSE_TRANSFER.LIST.TITLE,
        path: ROUTE.WAREHOUSE_TRANSFER.LIST.PATH,
        component: WarehouseTransfer,
        code: FUNCTION_CODE.WAREHOUSE_LIST_WAREHOUSE_TRANSFER,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.WAREHOUSE_TRANSFER.CREATE.TITLE,
            path: ROUTE.WAREHOUSE_TRANSFER.CREATE.PATH,
            component: WarehouseTransferForm,
            code: FUNCTION_CODE.WAREHOUSE_CREATE_WAREHOUSE_TRANSFER,
            isInSidebar: false,
          },
          {
            name: ROUTE.WAREHOUSE_TRANSFER.DETAIL.TITLE,
            path: ROUTE.WAREHOUSE_TRANSFER.DETAIL.PATH,
            component: WarehouseTransferDetail,
            code: FUNCTION_CODE.WAREHOUSE_DETAIL_WAREHOUSE_TRANSFER,
            isInSidebar: false,
          },
          {
            name: ROUTE.WAREHOUSE_TRANSFER.EDIT.TITLE,
            path: ROUTE.WAREHOUSE_TRANSFER.EDIT.PATH,
            component: WarehouseTransferForm,
            code: FUNCTION_CODE.WAREHOUSE_UPDATE_WAREHOUSE_TRANSFER,
            isInSidebar: false,
          },
          {
            name: ROUTE.WAREHOUSE_TRANSFER.PICKUP.TITLE,
            path: ROUTE.WAREHOUSE_TRANSFER.PICKUP.PATH,
            component: PickupAndWarehouseExport,
            code: FUNCTION_CODE.WAREHOUSE_CONFIRM_EXPORT_WAREHOUSE_TRANSFER,
            isInSidebar: false,
          },
          {
            name: ROUTE.WAREHOUSE_TRANSFER.RECEIVE.TITLE,
            path: ROUTE.WAREHOUSE_TRANSFER.RECEIVE.PATH,
            component: ReceiveAndStored,
            code: FUNCTION_CODE.WAREHOUSE_CONFIRM_IMPORT_WAREHOUSE_TRANSFER,
            isInSidebar: false,
          },
        ],
      },
    ],
  },
  {
    name: ROUTE.SETTING.TITLE,
    icon: 'setting',
    isInSidebar: true,

    subMenu: [
      {
        name: ROUTE.USER_MANAGEMENT.LIST.TITLE,
        path: ROUTE.USER_MANAGEMENT.LIST.PATH,
        component: UserManagement,
        code: FUNCTION_CODE.USER_LIST_USER,
        isInSidebar: true,

        subMenu: [
          {
            name: ROUTE.USER_MANAGEMENT.CREATE.TITLE,
            path: ROUTE.USER_MANAGEMENT.CREATE.PATH,
            component: UserManagementForm,
            code: FUNCTION_CODE.USER_CREATE_USER,
            isInSidebar: false,
          },
          {
            name: ROUTE.USER_MANAGEMENT.DETAIL.TITLE,
            path: ROUTE.USER_MANAGEMENT.DETAIL.PATH,
            component: UserManagementDetail,
            code: FUNCTION_CODE.USER_DETAIL_USER,
            isInSidebar: false,
          },
          {
            name: ROUTE.USER_MANAGEMENT.EDIT.TITLE,
            path: ROUTE.USER_MANAGEMENT.EDIT.PATH,
            component: UserManagementForm,
            code: FUNCTION_CODE.USER_DETAIL_USER,
            isInSidebar: false,
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
        // code: FUNCTION_CODE.USER_CHANGE_PASSWORD_USER,
      },
    ],
  },
]

export default routes
