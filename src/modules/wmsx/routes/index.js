import { FUNCTION_CODE } from '~/common/constants/functionCode'
import ChangePassword from '~/modules/configuration/feature/user-info/change-password'
import UserInfoDetail from '~/modules/configuration/feature/user-info/user-detail'
import UserInfoForm from '~/modules/configuration/feature/user-info/user-form'
import UserPermission from '~/modules/configuration/feature/user-permission'
import UserManagement from '~/modules/mesx/features/user-management'
import UserManagementDetail from '~/modules/mesx/features/user-management/user-detail'
import UserManagementForm from '~/modules/mesx/features/user-management/user-form'
import Dashboard from '~/modules/wmsx/features/dashboard'

import BusinessTypeManagementDetail from '../features/business-type-management/detail'
import BusinessTypeManagementForm from '../features/business-type-management/form'
import BussinessTypeManagement from '../features/business-type-management/list'
import CompanyManagementDetail from '../features/company-management/detail'
import CompanyManagementForm from '../features/company-management/form'
import CompanyManagement from '../features/company-management/list'
import ConstructionItemsManagementDetail from '../features/construction-items-management/detail'
import ConstructionItemsManagementForm from '../features/construction-items-management/form'
import ConstructionItemsManagement from '../features/construction-items-management/list'
import ConstructionManagementDetail from '../features/construction-management/detail'
import ConstructionManagementForm from '../features/construction-management/form'
import ConstructionManagement from '../features/construction-management/list'
import DataSyncManagement from '../features/data-sync-management'
import DefineAssemblyDetail from '../features/define-assembly/detail'
import DefineAssemblyForm from '../features/define-assembly/form'
import DefineAssembly from '../features/define-assembly/list'
import DefineBinDetail from '../features/define-bin/detail'
import DefineBinForm from '../features/define-bin/form'
import DefineBin from '../features/define-bin/list'
import DefineDrawerDetail from '../features/define-drawer/detail'
import DefineDrawerForm from '../features/define-drawer/form'
import DefineDrawer from '../features/define-drawer/list'
import DefineExpenditureOrgDetail from '../features/define-expenditure-org/detail'
import DefineExpenditureOrgForm from '../features/define-expenditure-org/form'
import DefineExpenditureOrg from '../features/define-expenditure-org/list'
import DefineExpenditureTypeDetail from '../features/define-expenditure-type/detail'
import DefineExpenditureTypeForm from '../features/define-expenditure-type/form'
import DefineExpenditureType from '../features/define-expenditure-type/list'
import DefineMaterialCategoryDetail from '../features/define-material-category/detail'
import DefineMaterialCategoryForm from '../features/define-material-category/form'
import DefineMaterialCategory from '../features/define-material-category/list'
import DefineMaterialQualityDetail from '../features/define-material-quality/detail'
import DefineMaterialQualityForm from '../features/define-material-quality/form'
import DefineMaterialQuality from '../features/define-material-quality/list'
import DefineObjectCategoryDetail from '../features/define-object-category/detail'
import DefineObjectCategoryForm from '../features/define-object-category/form'
import DefineObjectCategory from '../features/define-object-category/list'
import DefineProducingCountryDetail from '../features/define-producing-country/detail'
import DefineProducingCountryForm from '../features/define-producing-country/form'
import DefineProducingCountry from '../features/define-producing-country/list'
import DefineShelfDetail from '../features/define-shelf/detail'
import DefineShelfForm from '../features/define-shelf/form'
import DefineShelf from '../features/define-shelf/list'
import DefineUomDetail from '../features/define-uom/detail'
import DefineUomForm from '../features/define-uom/form'
import DefineUom from '../features/define-uom/list'
import DefineVendorDetail from '../features/define-vendor/detail'
import DefineVendorForm from '../features/define-vendor/form'
import DefineVendor from '../features/define-vendor/list'
import DefineWarehouseGroupDetail from '../features/define-warehouse-group/detail'
import DefineWarehouseGroupForm from '../features/define-warehouse-group/form'
import DefineWarehouseGroup from '../features/define-warehouse-group/list'
import DefineWarehouseDetail from '../features/define-warehouse/detail'
import DefineWarehouseForm from '../features/define-warehouse/form'
import DefineWarehouse from '../features/define-warehouse/list'
// import InventoryAdjustDetail from '../features/inventory-adjust/detail'
// import InventoryAdjustForm from '../features/inventory-adjust/form'
// import InventoryAdjust from '../features/inventory-adjust/list'
import InventoryCalenderDetail from '../features/inventory-calendar/detail'
import InventoryCalenderForm from '../features/inventory-calendar/form'
import InventoryCalender from '../features/inventory-calendar/list'
import ReciptDetail from '../features/inventory-calendar/recipt-transaction'
import InventorySettingDetail from '../features/inventory-setting/detail'
import InventorySettingForm from '../features/inventory-setting/form'
import InventorySetting from '../features/inventory-setting/list'
import InventoryStatistics from '../features/inventory-statistics'
import LicenseDetail from '../features/license-detail'
// import InventoryWarning from '../features/inventory-warning'
import LocationManagementDetail from '../features/location-management/detail'
import LocationManagementForm from '../features/location-management/form'
import LocationManagement from '../features/location-management/list'
import MaterialManagementDetail from '../features/material-management/detail'
import MaterialManagementForm from '../features/material-management/form'
import MaterialManagement from '../features/material-management/list'
import QrCode from '../features/qr-code'
import ReasonManagementDetail from '../features/reason-management/detail'
import ReasonManagementForm from '../features/reason-management/form'
import ReasonManagement from '../features/reason-management/list'
import ReceiptDepartmentManagementDetail from '../features/receipt-department-management/detail'
import ReceiptDepartmentManagementForm from '../features/receipt-department-management/form'
import ReceiptDepartmentManagement from '../features/receipt-department-management/list'
import ReceiptManagementDetail from '../features/receipt-management/detail'
import ReceiptManagement from '../features/receipt-management/list'
import ReportExport from '../features/report-export'
import DefineRoleDetail from '../features/role-list/detail'
import DefineRoleForm from '../features/role-list/form'
import RoleList from '../features/role-list/list'
import SetStoragePeriodDetail from '../features/set-storage-period/detail'
import SetStoragePeriodForm from '../features/set-storage-period/form'
import SetStoragePeriod from '../features/set-storage-period/list'
import SignatureConfiguration from '../features/signature-configuration'
import SourceManagementDetail from '../features/source-management/detail'
import SourceManagementForm from '../features/source-management/form'
import SourceManagement from '../features/source-management/list'
import UnitManagementAssign from '../features/unit-management/assign'
import UnitManagementDetail from '../features/unit-management/detail'
import UnitManagementForm from '../features/unit-management/form'
import UnitManagement from '../features/unit-management/list'
import WarehouseExportProposalDetail from '../features/warehouse-export-proposal/detail'
import WarehouseExportProposalForm from '../features/warehouse-export-proposal/form'
import WarehouseExportProposal from '../features/warehouse-export-proposal/list'
import WarehouseExportReturn from '../features/warehouse-export-receipt/create-warehouse-export-return'
import WarehouseExportReceiptDetail from '../features/warehouse-export-receipt/detail'
import WarehouseExportReturnDetail from '../features/warehouse-export-receipt/detail/detail-warehouse-export-return'
import WarehouseExportReceiptForm from '../features/warehouse-export-receipt/form'
import WarehouseExportReceipt from '../features/warehouse-export-receipt/list'
import WarehouseExportReceiptPickAndExport from '../features/warehouse-export-receipt/pick-and-export'
import {
  Transactions as WarehouseExportReceiptTransactions,
  TransactionDetail as WarehouseExportReceiptTransactionDetail,
} from '../features/warehouse-export-receipt/transactions'
import MovementExportWarehouseDetail from '../features/warehouse-export-receipt/transactions/detailTransactions'
import WarehouseExportDetail from '../features/warehouse-export/detail'
import MovementWarehouseExportDetail from '../features/warehouse-export/detail/detail_warehouse_export'
import WarehouseExport from '../features/warehouse-export/list'
import WarehouseImportReceiptDetail from '../features/warehouse-import-receipt/detail'
import WarehouseImportReceive from '../features/warehouse-import-receipt/detail/receive'
import WarehouseImportReceiveAndStorage from '../features/warehouse-import-receipt/detail/receive-and-storage'
import WarehouseImportStorage from '../features/warehouse-import-receipt/detail/storaged'
import WarehouseImportReceiptForm from '../features/warehouse-import-receipt/form'
import WarehouseImportReceipt from '../features/warehouse-import-receipt/list'
import {
  Transactions as WarehouseImportReceiptTransactions,
  TransactionDetail as WarehouseImportReceiptTransactionDetail,
} from '../features/warehouse-import-receipt/transactions'
import WarehouseImportDetail from '../features/warehouse-import/detail'
import WarehouseImport from '../features/warehouse-import/list'
import WarehouseTransferDetail from '../features/warehouse-transfer/detail'
import PickupAndWarehouseExport from '../features/warehouse-transfer/detail/pickup-and-warehouse-export'
import ReceiveAndStored from '../features/warehouse-transfer/detail/receive-and-stored'
import WarehouseTransferForm from '../features/warehouse-transfer/form'
import WarehouseTransfer from '../features/warehouse-transfer/list'
import {
  Transactions as WarehouseTransferTransactions,
  TransactionDetail as WarehouseTransferTransactionDetail,
} from '../features/warehouse-transfer/transactions'
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
    name: ROUTE.WAREHOUSE_MANAGEMENT.TITLE,
    icon: 'database',
    isInSidebar: true,
    subMenu: [
      {
        name: ROUTE.DEFINE_WAREHOUSE_GROUP.LIST.TITLE,
        path: ROUTE.DEFINE_WAREHOUSE_GROUP.LIST.PATH,
        component: DefineWarehouseGroup,
        code: FUNCTION_CODE.WAREHOUSE_LIST_WAREHOUSE_TYPE_SETTING,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFINE_WAREHOUSE_GROUP.CREATE.TITLE,
            path: ROUTE.DEFINE_WAREHOUSE_GROUP.CREATE.PATH,
            component: DefineWarehouseGroupForm,
            code: FUNCTION_CODE.WAREHOUSE_CREATE_WAREHOUSE_TYPE_SETTING,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_WAREHOUSE_GROUP.EDIT.TITLE,
            path: ROUTE.DEFINE_WAREHOUSE_GROUP.EDIT.PATH,
            component: DefineWarehouseGroupForm,
            code: FUNCTION_CODE.WAREHOUSE_UPDATE_WAREHOUSE_TYPE_SETTING,
            isInSidebar: true,
          },
          {
            name: ROUTE.DEFINE_WAREHOUSE_GROUP.DETAIL.TITLE,
            path: ROUTE.DEFINE_WAREHOUSE_GROUP.DETAIL.PATH,
            component: DefineWarehouseGroupDetail,
            code: FUNCTION_CODE.WAREHOUSE_DETAIL_WAREHOUSE_TYPE_SETTING,
            isInSidebar: true,
          },
        ],
      },
      {
        name: ROUTE.DEFINE_WAREHOUSE.LIST.TITLE,
        path: ROUTE.DEFINE_WAREHOUSE.LIST.PATH,
        component: DefineWarehouse,
        code: FUNCTION_CODE.WAREHOUSE_LIST_WAREHOUSE,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFINE_WAREHOUSE.CREATE.TITLE,
            path: ROUTE.DEFINE_WAREHOUSE.CREATE.PATH,
            component: DefineWarehouseForm,
            code: FUNCTION_CODE.WAREHOUSE_CREATE_WAREHOUSE,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_WAREHOUSE.EDIT.TITLE,
            path: ROUTE.DEFINE_WAREHOUSE.EDIT.PATH,
            component: DefineWarehouseForm,
            code: FUNCTION_CODE.WAREHOUSE_UPDATE_WAREHOUSE,
            isInSidebar: true,
          },
          {
            name: ROUTE.DEFINE_WAREHOUSE.DETAIL.TITLE,
            path: ROUTE.DEFINE_WAREHOUSE.DETAIL.PATH,
            component: DefineWarehouseDetail,
            code: FUNCTION_CODE.WAREHOUSE_DETAIL_WAREHOUSE,
            isInSidebar: true,
          },
        ],
      },
      {
        name: ROUTE.LOCATION_MANAGEMENT.LIST.TITLE,
        path: ROUTE.LOCATION_MANAGEMENT.LIST.PATH,
        component: LocationManagement,
        code: FUNCTION_CODE.WAREHOUSE_LIST_LOCATOR,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.LOCATION_MANAGEMENT.CREATE.TITLE,
            path: ROUTE.LOCATION_MANAGEMENT.CREATE.PATH,
            component: LocationManagementForm,
            code: FUNCTION_CODE.WAREHOUSE_CREATE_LOCATOR,
            isInSidebar: false,
          },
          {
            name: ROUTE.LOCATION_MANAGEMENT.EDIT.TITLE,
            path: ROUTE.LOCATION_MANAGEMENT.EDIT.PATH,
            component: LocationManagementForm,
            code: FUNCTION_CODE.WAREHOUSE_UPDATE_LOCATOR,
            isInSidebar: true,
          },
          {
            name: ROUTE.LOCATION_MANAGEMENT.DETAIL.TITLE,
            path: ROUTE.LOCATION_MANAGEMENT.DETAIL.PATH,
            component: LocationManagementDetail,
            code: FUNCTION_CODE.WAREHOUSE_DETAIL_LOCATOR,
            isInSidebar: true,
          },
        ],
      },
      {
        name: ROUTE.DEFINE_ASSEMBLY.LIST.TITLE,
        path: ROUTE.DEFINE_ASSEMBLY.LIST.PATH,
        code: FUNCTION_CODE.WAREHOUSE_LIST_LOCATION,
        component: DefineAssembly,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFINE_ASSEMBLY.CREATE.TITLE,
            path: ROUTE.DEFINE_ASSEMBLY.CREATE.PATH,
            component: DefineAssemblyForm,
            code: FUNCTION_CODE.WAREHOUSE_CREATE_LOCATION,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_ASSEMBLY.EDIT.TITLE,
            path: ROUTE.DEFINE_ASSEMBLY.EDIT.PATH,
            component: DefineAssemblyForm,
            code: FUNCTION_CODE.WAREHOUSE_UPDATE_LOCATION,
            isInSidebar: true,
          },
          {
            name: ROUTE.DEFINE_ASSEMBLY.DETAIL.TITLE,
            path: ROUTE.DEFINE_ASSEMBLY.DETAIL.PATH,
            component: DefineAssemblyDetail,
            code: FUNCTION_CODE.WAREHOUSE_DETAIL_LOCATION,
            isInSidebar: true,
          },
        ],
      },
      {
        name: ROUTE.DEFINE_SHELF.LIST.TITLE,
        path: ROUTE.DEFINE_SHELF.LIST.PATH,
        component: DefineShelf,
        code: FUNCTION_CODE.WAREHOUSE_LIST_LOCATION,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFINE_SHELF.CREATE.TITLE,
            path: ROUTE.DEFINE_SHELF.CREATE.PATH,
            component: DefineShelfForm,
            code: FUNCTION_CODE.WAREHOUSE_CREATE_LOCATION,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_SHELF.EDIT.TITLE,
            path: ROUTE.DEFINE_SHELF.EDIT.PATH,
            component: DefineShelfForm,
            code: FUNCTION_CODE.WAREHOUSE_UPDATE_LOCATION,
            isInSidebar: true,
          },
          {
            name: ROUTE.DEFINE_SHELF.DETAIL.TITLE,
            path: ROUTE.DEFINE_SHELF.DETAIL.PATH,
            component: DefineShelfDetail,
            code: FUNCTION_CODE.WAREHOUSE_DETAIL_LOCATION,
            isInSidebar: true,
          },
        ],
      },
      {
        name: ROUTE.DEFINE_DRAWER.LIST.TITLE,
        path: ROUTE.DEFINE_DRAWER.LIST.PATH,
        component: DefineDrawer,
        code: FUNCTION_CODE.WAREHOUSE_LIST_LOCATION,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFINE_DRAWER.CREATE.TITLE,
            path: ROUTE.DEFINE_DRAWER.CREATE.PATH,
            component: DefineDrawerForm,
            code: FUNCTION_CODE.WAREHOUSE_CREATE_LOCATION,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_DRAWER.EDIT.TITLE,
            path: ROUTE.DEFINE_DRAWER.EDIT.PATH,
            code: FUNCTION_CODE.WAREHOUSE_UPDATE_LOCATION,
            component: DefineDrawerForm,
            isInSidebar: true,
          },
          {
            name: ROUTE.DEFINE_DRAWER.DETAIL.TITLE,
            path: ROUTE.DEFINE_DRAWER.DETAIL.PATH,
            code: FUNCTION_CODE.WAREHOUSE_DETAIL_LOCATION,
            component: DefineDrawerDetail,
            isInSidebar: true,
          },
        ],
      },
      {
        name: ROUTE.DEFINE_BIN.LIST.TITLE,
        path: ROUTE.DEFINE_BIN.LIST.PATH,
        component: DefineBin,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFINE_BIN.CREATE.TITLE,
            path: ROUTE.DEFINE_BIN.CREATE.PATH,
            component: DefineBinForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_BIN.EDIT.TITLE,
            path: ROUTE.DEFINE_BIN.EDIT.PATH,
            component: DefineBinForm,
            isInSidebar: true,
          },
          {
            name: ROUTE.DEFINE_BIN.DETAIL.TITLE,
            path: ROUTE.DEFINE_BIN.DETAIL.PATH,
            component: DefineBinDetail,
            isInSidebar: true,
          },
        ],
      },
      {
        name: ROUTE.SET_STORAGE_PERIOD.LIST.TITLE,
        path: ROUTE.SET_STORAGE_PERIOD.LIST.PATH,
        component: SetStoragePeriod,
        code: FUNCTION_CODE.WAREHOUSE_LIST_INVENTORY_TIME_LIMIT,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.SET_STORAGE_PERIOD.CREATE.TITLE,
            path: ROUTE.SET_STORAGE_PERIOD.CREATE.PATH,
            component: SetStoragePeriodForm,
            code: FUNCTION_CODE.WAREHOUSE_CREATE_INVENTORY_TIME_LIMIT,
            isInSidebar: false,
          },
          {
            name: ROUTE.SET_STORAGE_PERIOD.DETAIL.TITLE,
            path: ROUTE.SET_STORAGE_PERIOD.DETAIL.PATH,
            component: SetStoragePeriodDetail,
            code: FUNCTION_CODE.WAREHOUSE_DETAIL_INVENTORY_TIME_LIMIT,
            isInSidebar: false,
          },
          {
            name: ROUTE.SET_STORAGE_PERIOD.EDIT.TITLE,
            path: ROUTE.SET_STORAGE_PERIOD.EDIT.PATH,
            component: SetStoragePeriodForm,
            code: FUNCTION_CODE.WAREHOUSE_UPDATE_INVENTORY_TIME_LIMIT,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.INVENTORY_SETTING.LIST.TITLE,
        path: ROUTE.INVENTORY_SETTING.LIST.PATH,
        component: InventorySetting,
        code: FUNCTION_CODE.ITEM_LIST_INVENTORY_QUANTITY_NORM,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.INVENTORY_SETTING.CREATE.TITLE,
            path: ROUTE.INVENTORY_SETTING.CREATE.PATH,
            component: InventorySettingForm,
            code: FUNCTION_CODE.ITEM_CREATE_INVENTORY_QUANTITY_NORM,
            isInSidebar: false,
          },
          {
            name: ROUTE.INVENTORY_SETTING.DETAIL.TITLE,
            path: ROUTE.INVENTORY_SETTING.DETAIL.PATH,
            component: InventorySettingDetail,
            code: FUNCTION_CODE.ITEM_DETAIL_INVENTORY_QUANTITY_NORM,
            isInSidebar: false,
          },
          {
            name: ROUTE.INVENTORY_SETTING.EDIT.TITLE,
            path: ROUTE.INVENTORY_SETTING.EDIT.PATH,
            component: InventorySettingForm,
            code: FUNCTION_CODE.ITEM_UPDATE_INVENTORY_QUANTITY_NORM,
            isInSidebar: false,
          },
        ],
      },
    ],
  },

  {
    name: ROUTE.WAREHOUSE_EXPORT_PROPOSAL.LIST.TITLE,
    path: ROUTE.WAREHOUSE_EXPORT_PROPOSAL.LIST.PATH,
    icon: 'database',
    component: WarehouseExportProposal,
    code: FUNCTION_CODE.WAREHOUSE_LIST_WAREHOUSE_EXPORT_PROPOSAL,
    isInSidebar: true,
    subMenu: [
      {
        name: ROUTE.WAREHOUSE_EXPORT_PROPOSAL.CREATE.TITLE,
        path: ROUTE.WAREHOUSE_EXPORT_PROPOSAL.CREATE.PATH,
        component: WarehouseExportProposalForm,
        code: FUNCTION_CODE.WAREHOUSE_CREATE_WAREHOUSE_EXPORT_PROPOSAL,
        isInSidebar: false,
      },
      {
        name: ROUTE.WAREHOUSE_EXPORT_PROPOSAL.DETAIL.TITLE,
        path: ROUTE.WAREHOUSE_EXPORT_PROPOSAL.DETAIL.PATH,
        component: WarehouseExportProposalDetail,
        code: FUNCTION_CODE.WAREHOUSE_DETAIL_WAREHOUSE_EXPORT_PROPOSAL,
        isInSidebar: false,
      },
      {
        name: ROUTE.WAREHOUSE_EXPORT_PROPOSAL.EDIT.TITLE,
        path: ROUTE.WAREHOUSE_EXPORT_PROPOSAL.EDIT.PATH,
        component: WarehouseExportProposalForm,
        code: FUNCTION_CODE.WAREHOUSE_UPDATE_WAREHOUSE_EXPORT_PROPOSAL,
        isInSidebar: false,
      },
    ],
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
          {
            name: ROUTE.WAREHOUSE_IMPORT_RECEIPT.TRANSACTIONS.LIST.TITLE,
            path: ROUTE.WAREHOUSE_IMPORT_RECEIPT.TRANSACTIONS.LIST.PATH,
            component: WarehouseImportReceiptTransactions,
            isInSidebar: false,
          },

          {
            name: ROUTE.WAREHOUSE_IMPORT_RECEIPT.TRANSACTIONS.DETAIL.TITLE,
            path: ROUTE.WAREHOUSE_IMPORT_RECEIPT.TRANSACTIONS.DETAIL.PATH,
            component: WarehouseImportReceiptTransactionDetail,
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
          {
            name: ROUTE.WAREHOUSE_EXPORT_RECEIPT.TRANSACTIONS.LIST.TITLE,
            path: ROUTE.WAREHOUSE_EXPORT_RECEIPT.TRANSACTIONS.LIST.PATH,
            component: WarehouseExportReceiptTransactions,
            isInSidebar: false,
          },

          {
            name: ROUTE.WAREHOUSE_EXPORT_RECEIPT.TRANSACTIONS.DETAIL.TITLE,
            path: ROUTE.WAREHOUSE_EXPORT_RECEIPT.TRANSACTIONS.DETAIL.PATH,
            component: WarehouseExportReceiptTransactionDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.WAREHOUSE_EXPORT_RECEIPT.TRANSACTIONS.DETAIL_TRANSACTION
              .TITLE,
            path: ROUTE.WAREHOUSE_EXPORT_RECEIPT.TRANSACTIONS.DETAIL_TRANSACTION
              .PATH,
            component: MovementExportWarehouseDetail,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.INVENTORY_CALENDAR.LIST.TITLE,
        path: ROUTE.INVENTORY_CALENDAR.LIST.PATH,
        component: InventoryCalender,
        code: FUNCTION_CODE.WAREHOUSE_LIST_INVENTORY,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.INVENTORY_CALENDAR.CREATE.TITLE,
            path: ROUTE.INVENTORY_CALENDAR.CREATE.PATH,
            component: InventoryCalenderForm,
            code: FUNCTION_CODE.WAREHOUSE_CREATE_INVENTORY,
            isInSidebar: false,
          },
          {
            name: ROUTE.INVENTORY_CALENDAR.DETAIL.TITLE,
            path: ROUTE.INVENTORY_CALENDAR.DETAIL.PATH,
            component: InventoryCalenderDetail,
            code: FUNCTION_CODE.WAREHOUSE_DETAIL_INVENTORY,
            isInSidebar: false,
          },
          {
            name: ROUTE.INVENTORY_CALENDAR.EDIT.TITLE,
            path: ROUTE.INVENTORY_CALENDAR.EDIT.PATH,
            component: InventoryCalenderForm,
            code: FUNCTION_CODE.WAREHOUSE_UPDATE_INVENTORY,
            isInSidebar: false,
          },
          {
            name: ROUTE.INVENTORY_CALENDAR.DETAIL_RECIPT.TITLE,
            path: ROUTE.INVENTORY_CALENDAR.DETAIL_RECIPT.PATH,
            component: ReciptDetail,
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
          {
            name: ROUTE.WAREHOUSE_TRANSFER.TRANSACTIONS.LIST.TITLE,
            path: ROUTE.WAREHOUSE_TRANSFER.TRANSACTIONS.LIST.PATH,
            component: WarehouseTransferTransactions,
            isInSidebar: false,
          },

          {
            name: ROUTE.WAREHOUSE_TRANSFER.TRANSACTIONS.DETAIL.TITLE,
            path: ROUTE.WAREHOUSE_TRANSFER.TRANSACTIONS.DETAIL.PATH,
            component: WarehouseTransferTransactionDetail,
            isInSidebar: false,
          },
        ],
      },
    ],
  },
  {
    name: ROUTE.RECEIPT_MANAGEMENT.LIST.TITLE,
    icon: 'database',
    path: ROUTE.RECEIPT_MANAGEMENT.LIST.PATH,
    component: ReceiptManagement,
    code: FUNCTION_CODE.SALE_LIST_RECEIPT,
    isInSidebar: true,
    subMenu: [
      {
        name: ROUTE.RECEIPT_MANAGEMENT.DETAIL.TITLE,
        path: ROUTE.RECEIPT_MANAGEMENT.DETAIL.PATH,
        component: ReceiptManagementDetail,
        code: FUNCTION_CODE.SALE_DETAIL_RECEIPT,
        isInSidebar: false,
      },
    ],
  },
  {
    name: ROUTE.DATA_SYNC_MANAGEMENT.LIST.TITLE,
    path: ROUTE.DATA_SYNC_MANAGEMENT.LIST.PATH,
    component: DataSyncManagement,
    code: FUNCTION_CODE.DATASYNC_LIST_JOB,
    icon: 'database',
    isInSidebar: true,
  },
  {
    name: ROUTE.WAREHOUSE_REPORT_MANAGEMENT.TITLE,
    icon: 'keylock',
    isInSidebar: true,
    subMenu: [
      {
        path: ROUTE.INVENTORY_STATISTICS.PATH,
        name: ROUTE.INVENTORY_STATISTICS.TITLE,
        component: InventoryStatistics,
        code: FUNCTION_CODE.WAREHOUSE_SEARCH_INVENTORY_MANAGEMENT,
        isInSidebar: true,
      },
      // {
      //   path: ROUTE.INVENTORY_WARNING.PATH,
      //   name: ROUTE.INVENTORY_WARNING.TITLE,
      //   component: InventoryWarning,
      //   code: FUNCTION_CODE.WAREHOUSE_STATISTICAL_OF_OVERDUE_STORAGE_INVENTORY_MANAGEMENT,
      //   isInSidebar: true,
      // },
      // {
      //   name: ROUTE.INVENTORY_ADJUST.LIST.TITLE,
      //   path: ROUTE.INVENTORY_ADJUST.LIST.PATH,
      //   component: InventoryAdjust,
      //   code: FUNCTION_CODE.WAREHOUSE_LIST_INVENTORY_ADJUSTMENT,
      //   isInSidebar: true,
      //   subMenu: [
      //     {
      //       name: ROUTE.INVENTORY_ADJUST.CREATE.TITLE,
      //       path: ROUTE.INVENTORY_ADJUST.CREATE.PATH,
      //       component: InventoryAdjustForm,
      //       code: FUNCTION_CODE.WAREHOUSE_CREATE_INVENTORY_ADJUSTMENT,
      //       isInSidebar: false,
      //     },
      //     {
      //       name: ROUTE.INVENTORY_ADJUST.DETAIL.TITLE,
      //       path: ROUTE.INVENTORY_ADJUST.DETAIL.PATH,
      //       component: InventoryAdjustDetail,
      //       code: FUNCTION_CODE.WAREHOUSE_DETAIL_INVENTORY_ADJUSTMENT,
      //       isInSidebar: false,
      //     },
      //     {
      //       name: ROUTE.INVENTORY_ADJUST.EDIT.TITLE,
      //       path: ROUTE.INVENTORY_ADJUST.EDIT.PATH,
      //       component: InventoryAdjustForm,
      //       code: FUNCTION_CODE.WAREHOUSE_UPDATE_INVENTORY_ADJUSTMENT,
      //       isInSidebar: false,
      //     },
      //   ],
      // },
    ],
  },
  {
    name: ROUTE.REPORT_STATISTICS.TITLE,
    icon: 'export',
    isInSidebar: true,

    subMenu: [
      {
        path: ROUTE.REPORT_EXPORT.PATH,
        name: ROUTE.REPORT_EXPORT.TITLE,
        component: ReportExport,
        code: FUNCTION_CODE.WAREHOUSE_STATISTIC_REPORT,
        isInSidebar: true,
      },
      {
        name: ROUTE.WAREHOUSE_IMPORT.LIST.TITLE,
        path: ROUTE.WAREHOUSE_IMPORT.LIST.PATH,
        component: WarehouseImport,
        code: FUNCTION_CODE.WAREHOUSE_STATISTIC_IMPORT_WAREHOUSE_TRANSACTION,
        icon: 'key',
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.WAREHOUSE_IMPORT.DETAIL.TITLE,
            path: ROUTE.WAREHOUSE_IMPORT.DETAIL.PATH,
            component: WarehouseImportDetail,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.WAREHOUSE_EXPORT.LIST.TITLE,
        path: ROUTE.WAREHOUSE_EXPORT.LIST.PATH,
        component: WarehouseExport,
        code: FUNCTION_CODE.WAREHOUSE_STATISTIC_EXPORT_WAREHOUSE_TRANSACTION,
        icon: 'export',
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.WAREHOUSE_EXPORT.DETAIL.TITLE,
            path: ROUTE.WAREHOUSE_EXPORT.DETAIL.PATH,
            component: WarehouseExportDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.WAREHOUSE_EXPORT.DETAIL_EXPORT.TITLE,
            path: ROUTE.WAREHOUSE_EXPORT.DETAIL_EXPORT.PATH,
            component: MovementWarehouseExportDetail,
            isInSidebar: false,
          },
        ],
      },
    ],
  },
  {
    name: ROUTE.DATABASE.TITLE,
    icon: 'database',
    isInSidebar: true,

    subMenu: [
      {
        name: ROUTE.COMPANY_MANAGEMENT.LIST.TITLE,
        path: ROUTE.COMPANY_MANAGEMENT.LIST.PATH,
        component: CompanyManagement,
        code: FUNCTION_CODE.USER_LIST_COMPANY,
        isInSidebar: true,

        subMenu: [
          {
            name: ROUTE.COMPANY_MANAGEMENT.CREATE.TITLE,
            path: ROUTE.COMPANY_MANAGEMENT.CREATE.PATH,
            component: CompanyManagementForm,
            code: FUNCTION_CODE.USER_CREATE_COMPANY,
            isInSidebar: false,
          },
          {
            name: ROUTE.COMPANY_MANAGEMENT.DETAIL.TITLE,
            path: ROUTE.COMPANY_MANAGEMENT.DETAIL.PATH,
            component: CompanyManagementDetail,
            code: FUNCTION_CODE.USER_DETAIL_COMPANY,
            isInSidebar: false,
          },
          {
            name: ROUTE.COMPANY_MANAGEMENT.EDIT.TITLE,
            path: ROUTE.COMPANY_MANAGEMENT.EDIT.PATH,
            component: CompanyManagementForm,
            code: FUNCTION_CODE.USER_UPDATE_COMPANY,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.RECEIPT_DEPARTMENT_MANAGEMENT.LIST.TITLE,
        path: ROUTE.RECEIPT_DEPARTMENT_MANAGEMENT.LIST.PATH,
        component: ReceiptDepartmentManagement,
        code: FUNCTION_CODE.USER_LIST_DEPARTMENT_RECEIPT,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.RECEIPT_DEPARTMENT_MANAGEMENT.CREATE.TITLE,
            path: ROUTE.RECEIPT_DEPARTMENT_MANAGEMENT.CREATE.PATH,
            component: ReceiptDepartmentManagementForm,
            code: FUNCTION_CODE.USER_CREATE_DEPARTMENT_RECEIPT,
            isInSidebar: false,
          },
          {
            name: ROUTE.RECEIPT_DEPARTMENT_MANAGEMENT.DETAIL.TITLE,
            path: ROUTE.RECEIPT_DEPARTMENT_MANAGEMENT.DETAIL.PATH,
            component: ReceiptDepartmentManagementDetail,
            code: FUNCTION_CODE.USER_DETAIL_DEPARTMENT_RECEIPT,
            isInSidebar: false,
          },
          {
            name: ROUTE.RECEIPT_DEPARTMENT_MANAGEMENT.EDIT.TITLE,
            path: ROUTE.RECEIPT_DEPARTMENT_MANAGEMENT.EDIT.PATH,
            component: ReceiptDepartmentManagementForm,
            code: FUNCTION_CODE.USER_UPDATE_DEPARTMENT_RECEIPT,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.DEFINE_VENDOR.LIST.TITLE,
        path: ROUTE.DEFINE_VENDOR.LIST.PATH,
        component: DefineVendor,
        code: FUNCTION_CODE.SALE_LIST_VENDOR,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFINE_VENDOR.CREATE.TITLE,
            path: ROUTE.DEFINE_VENDOR.CREATE.PATH,
            component: DefineVendorForm,
            code: FUNCTION_CODE.SALE_CREATE_VENDOR,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_VENDOR.EDIT.TITLE,
            path: ROUTE.DEFINE_VENDOR.EDIT.PATH,
            component: DefineVendorForm,
            code: FUNCTION_CODE.SALE_UPDATE_VENDOR,
            isInSidebar: true,
          },
          {
            name: ROUTE.DEFINE_VENDOR.DETAIL.TITLE,
            path: ROUTE.DEFINE_VENDOR.DETAIL.PATH,
            component: DefineVendorDetail,
            code: FUNCTION_CODE.SALE_DETAIL_VENDOR,
            isInSidebar: true,
          },
        ],
      },
      {
        name: ROUTE.CONSTRUCTION_MANAGEMENT.LIST.TITLE,
        path: ROUTE.CONSTRUCTION_MANAGEMENT.LIST.PATH,
        component: ConstructionManagement,
        code: FUNCTION_CODE.SALE_LIST_CONSTRUCTION,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.CONSTRUCTION_MANAGEMENT.CREATE.TITLE,
            path: ROUTE.CONSTRUCTION_MANAGEMENT.CREATE.PATH,
            component: ConstructionManagementForm,
            code: FUNCTION_CODE.SALE_CREATE_CONSTRUCTION,
            isInSidebar: false,
          },
          {
            name: ROUTE.CONSTRUCTION_MANAGEMENT.DETAIL.TITLE,
            path: ROUTE.CONSTRUCTION_MANAGEMENT.DETAIL.PATH,
            component: ConstructionManagementDetail,
            code: FUNCTION_CODE.SALE_DETAIL_CONSTRUCTION,
            isInSidebar: false,
          },
          {
            name: ROUTE.CONSTRUCTION_MANAGEMENT.EDIT.TITLE,
            path: ROUTE.CONSTRUCTION_MANAGEMENT.EDIT.PATH,
            component: ConstructionManagementForm,
            code: FUNCTION_CODE.SALE_UPDATE_CONSTRUCTION,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.CONSTRUCTION_ITEMS_MANAGEMENT.LIST.TITLE,
        path: ROUTE.CONSTRUCTION_ITEMS_MANAGEMENT.LIST.PATH,
        component: ConstructionItemsManagement,
        code: FUNCTION_CODE.SALE_LIST_CATEGORY_CONSTRUCTION,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.CONSTRUCTION_ITEMS_MANAGEMENT.CREATE.TITLE,
            path: ROUTE.CONSTRUCTION_ITEMS_MANAGEMENT.CREATE.PATH,
            component: ConstructionItemsManagementForm,
            code: FUNCTION_CODE.SALE_CREATE_CATEGORY_CONSTRUCTION,
            isInSidebar: false,
          },
          {
            name: ROUTE.CONSTRUCTION_ITEMS_MANAGEMENT.DETAIL.TITLE,
            path: ROUTE.CONSTRUCTION_ITEMS_MANAGEMENT.DETAIL.PATH,
            component: ConstructionItemsManagementDetail,
            code: FUNCTION_CODE.SALE_DETAIL_CATEGORY_CONSTRUCTION,
            isInSidebar: false,
          },
          {
            name: ROUTE.CONSTRUCTION_ITEMS_MANAGEMENT.EDIT.TITLE,
            path: ROUTE.CONSTRUCTION_ITEMS_MANAGEMENT.EDIT.PATH,
            code: FUNCTION_CODE.SALE_UPDATE_CATEGORY_CONSTRUCTION,
            component: ConstructionItemsManagementForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.SOURCE_MANAGEMENT.LIST.TITLE,
        path: ROUTE.SOURCE_MANAGEMENT.LIST.PATH,
        component: SourceManagement,
        code: FUNCTION_CODE.SALE_LIST_SOURCE,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.SOURCE_MANAGEMENT.CREATE.TITLE,
            path: ROUTE.SOURCE_MANAGEMENT.CREATE.PATH,
            component: SourceManagementForm,
            code: FUNCTION_CODE.CREATE_SOURCE,
            isInSidebar: false,
          },
          {
            name: ROUTE.SOURCE_MANAGEMENT.DETAIL.TITLE,
            path: ROUTE.SOURCE_MANAGEMENT.DETAIL.PATH,
            component: SourceManagementDetail,
            code: FUNCTION_CODE.DETAIL_SOURCE,
            isInSidebar: false,
          },
          {
            name: ROUTE.SOURCE_MANAGEMENT.EDIT.TITLE,
            path: ROUTE.SOURCE_MANAGEMENT.EDIT.PATH,
            component: SourceManagementForm,
            code: FUNCTION_CODE.UPDATE_SOURCE,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.REASON_MANAGEMENT.LIST.TITLE,
        path: ROUTE.REASON_MANAGEMENT.LIST.PATH,
        component: ReasonManagement,
        code: FUNCTION_CODE.SALE_LIST_REASON,
        isInSidebar: true,

        subMenu: [
          {
            name: ROUTE.REASON_MANAGEMENT.CREATE.TITLE,
            path: ROUTE.REASON_MANAGEMENT.CREATE.PATH,
            component: ReasonManagementForm,
            code: FUNCTION_CODE.SALE_CREATE_REASON,
            isInSidebar: false,
          },
          {
            name: ROUTE.REASON_MANAGEMENT.DETAIL.TITLE,
            path: ROUTE.REASON_MANAGEMENT.DETAIL.PATH,
            component: ReasonManagementDetail,
            code: FUNCTION_CODE.SALE_DETAIL_REASON,
            isInSidebar: false,
          },
          {
            name: ROUTE.REASON_MANAGEMENT.EDIT.TITLE,
            path: ROUTE.REASON_MANAGEMENT.EDIT.PATH,
            component: ReasonManagementForm,
            code: FUNCTION_CODE.SALE_UPDATE_REASON,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.DEFINE_UOM.LIST.TITLE,
        path: ROUTE.DEFINE_UOM.LIST.PATH,
        component: DefineUom,
        code: FUNCTION_CODE.ITEM_LIST_ITEM_UNIT,
        isInSidebar: true,

        subMenu: [
          {
            name: ROUTE.DEFINE_UOM.CREATE.TITLE,
            path: ROUTE.DEFINE_UOM.CREATE.PATH,
            component: DefineUomForm,
            code: FUNCTION_CODE.ITEM_CREATE_ITEM_UNIT,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_UOM.DETAIL.TITLE,
            path: ROUTE.DEFINE_UOM.DETAIL.PATH,
            component: DefineUomDetail,
            code: FUNCTION_CODE.ITEM_DETAIL_ITEM_UNIT,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_UOM.EDIT.TITLE,
            path: ROUTE.DEFINE_UOM.EDIT.PATH,
            component: DefineUomForm,
            code: FUNCTION_CODE.ITEM_UPDATE_ITEM_UNIT,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.DEFINE_OBJECT_CATEGORY.LIST.TITLE,
        path: ROUTE.DEFINE_OBJECT_CATEGORY.LIST.PATH,
        component: DefineObjectCategory,
        code: FUNCTION_CODE.ITEM_LIST_OBJECT_CATEGORY,
        isInSidebar: true,

        subMenu: [
          {
            name: ROUTE.DEFINE_OBJECT_CATEGORY.CREATE.TITLE,
            path: ROUTE.DEFINE_OBJECT_CATEGORY.CREATE.PATH,
            component: DefineObjectCategoryForm,
            code: FUNCTION_CODE.ITEM_CREATE_OBJECT_CATEGORY,

            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_OBJECT_CATEGORY.DETAIL.TITLE,
            path: ROUTE.DEFINE_OBJECT_CATEGORY.DETAIL.PATH,
            component: DefineObjectCategoryDetail,
            code: FUNCTION_CODE.ITEM_DETAIL_OBJECT_CATEGORY,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_OBJECT_CATEGORY.EDIT.TITLE,
            path: ROUTE.DEFINE_OBJECT_CATEGORY.EDIT.PATH,
            component: DefineObjectCategoryForm,
            code: FUNCTION_CODE.ITEM_UPDATE_OBJECT_CATEGORY,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.DEFINE_MATERIAL_CATEGORY.LIST.TITLE,
        path: ROUTE.DEFINE_MATERIAL_CATEGORY.LIST.PATH,
        component: DefineMaterialCategory,
        code: FUNCTION_CODE.ITEM_LIST_ITEM_TYPE,
        isInSidebar: true,

        subMenu: [
          {
            name: ROUTE.DEFINE_MATERIAL_CATEGORY.CREATE.TITLE,
            path: ROUTE.DEFINE_MATERIAL_CATEGORY.CREATE.PATH,
            component: DefineMaterialCategoryForm,
            code: FUNCTION_CODE.ITEM_CREATE_ITEM_TYPE,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_MATERIAL_CATEGORY.DETAIL.TITLE,
            path: ROUTE.DEFINE_MATERIAL_CATEGORY.DETAIL.PATH,
            component: DefineMaterialCategoryDetail,
            code: FUNCTION_CODE.ITEM_DETAIL_ITEM_TYPE,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_MATERIAL_CATEGORY.EDIT.TITLE,
            path: ROUTE.DEFINE_MATERIAL_CATEGORY.EDIT.PATH,
            component: DefineMaterialCategoryForm,
            code: FUNCTION_CODE.ITEM_UPDATE_ITEM_TYPE,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.DEFINE_MATERIAL_QUALITY.LIST.TITLE,
        path: ROUTE.DEFINE_MATERIAL_QUALITY.LIST.PATH,
        component: DefineMaterialQuality,
        code: FUNCTION_CODE.ITEM_LIST_ITEM_QUALITY,
        isInSidebar: true,

        subMenu: [
          {
            name: ROUTE.DEFINE_MATERIAL_QUALITY.CREATE.TITLE,
            path: ROUTE.DEFINE_MATERIAL_QUALITY.CREATE.PATH,
            component: DefineMaterialQualityForm,
            code: FUNCTION_CODE.ITEM_CREATE_ITEM_QUALITY,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_MATERIAL_QUALITY.DETAIL.TITLE,
            path: ROUTE.DEFINE_MATERIAL_QUALITY.DETAIL.PATH,
            component: DefineMaterialQualityDetail,
            code: FUNCTION_CODE.ITEM_DETAIL_ITEM_QUALITY,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_MATERIAL_QUALITY.EDIT.TITLE,
            path: ROUTE.DEFINE_MATERIAL_QUALITY.EDIT.PATH,
            component: DefineMaterialQualityForm,
            code: FUNCTION_CODE.ITEM_UPDATE_ITEM_QUALITY,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.DEFINE_PRODUCING_COUNTRY.LIST.TITLE,
        path: ROUTE.DEFINE_PRODUCING_COUNTRY.LIST.PATH,
        component: DefineProducingCountry,
        code: FUNCTION_CODE.ITEM_LIST_MANUFACTURING_COUNTRY,
        isInSidebar: true,

        subMenu: [
          {
            name: ROUTE.DEFINE_PRODUCING_COUNTRY.CREATE.TITLE,
            path: ROUTE.DEFINE_PRODUCING_COUNTRY.CREATE.PATH,
            component: DefineProducingCountryForm,
            code: FUNCTION_CODE.ITEM_CREATE_MANUFACTURING_COUNTRY,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_PRODUCING_COUNTRY.DETAIL.TITLE,
            path: ROUTE.DEFINE_PRODUCING_COUNTRY.DETAIL.PATH,
            component: DefineProducingCountryDetail,
            code: FUNCTION_CODE.ITEM_DETAIL_MANUFACTURING_COUNTRY,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_PRODUCING_COUNTRY.EDIT.TITLE,
            path: ROUTE.DEFINE_PRODUCING_COUNTRY.EDIT.PATH,
            component: DefineProducingCountryForm,
            code: FUNCTION_CODE.ITEM_UPDATE_MANUFACTURING_COUNTRY,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.DEFINE_EXPENDITURE_ORG.LIST.TITLE,
        path: ROUTE.DEFINE_EXPENDITURE_ORG.LIST.PATH,
        component: DefineExpenditureOrg,
        code: FUNCTION_CODE.SALE_LIST_ORGANIZATION_PAYMENT,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFINE_EXPENDITURE_ORG.CREATE.TITLE,
            path: ROUTE.DEFINE_EXPENDITURE_ORG.CREATE.PATH,
            component: DefineExpenditureOrgForm,
            code: FUNCTION_CODE.SALE_CREATE_ORGANIZATION_PAYMENT,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_EXPENDITURE_ORG.DETAIL.TITLE,
            path: ROUTE.DEFINE_EXPENDITURE_ORG.DETAIL.PATH,
            component: DefineExpenditureOrgDetail,
            code: FUNCTION_CODE.SALE_DETAIL_ORGANIZATION_PAYMENT,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_EXPENDITURE_ORG.EDIT.TITLE,
            path: ROUTE.DEFINE_EXPENDITURE_ORG.EDIT.PATH,
            component: DefineExpenditureOrgForm,
            code: FUNCTION_CODE.SALE_UPDATE_ORGANIZATION_PAYMENT,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.DEFINE_EXPENDITURE_TYPE.LIST.TITLE,
        path: ROUTE.DEFINE_EXPENDITURE_TYPE.LIST.PATH,
        component: DefineExpenditureType,
        code: FUNCTION_CODE.SALE_LIST_COST_TYPE,
        isInSidebar: true,

        subMenu: [
          {
            name: ROUTE.DEFINE_EXPENDITURE_TYPE.CREATE.TITLE,
            path: ROUTE.DEFINE_EXPENDITURE_TYPE.CREATE.PATH,
            component: DefineExpenditureTypeForm,
            code: FUNCTION_CODE.SALE_CREATE_COST_TYPE,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_EXPENDITURE_TYPE.DETAIL.TITLE,
            path: ROUTE.DEFINE_EXPENDITURE_TYPE.DETAIL.PATH,
            component: DefineExpenditureTypeDetail,
            code: FUNCTION_CODE.SALE_DETAIL_COST_TYPE,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_EXPENDITURE_TYPE.EDIT.TITLE,
            path: ROUTE.DEFINE_EXPENDITURE_TYPE.EDIT.PATH,
            component: DefineExpenditureTypeForm,
            code: FUNCTION_CODE.SALE_UPDATE_COST_TYPE,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.BUSINESS_TYPE_MANAGEMENT.LIST.TITLE,
        path: ROUTE.BUSINESS_TYPE_MANAGEMENT.LIST.PATH,
        component: BussinessTypeManagement,
        code: FUNCTION_CODE.WAREHOUSE_LIST_BUSSINESS_TYPE,
        isInSidebar: true,

        subMenu: [
          {
            name: ROUTE.BUSINESS_TYPE_MANAGEMENT.CREATE.TITLE,
            path: ROUTE.BUSINESS_TYPE_MANAGEMENT.CREATE.PATH,
            component: BusinessTypeManagementForm,
            code: FUNCTION_CODE.WAREHOUSE_CREATE_BUSSINESS_TYPE,
            isInSidebar: false,
          },
          {
            name: ROUTE.BUSINESS_TYPE_MANAGEMENT.DETAIL.TITLE,
            path: ROUTE.BUSINESS_TYPE_MANAGEMENT.DETAIL.PATH,
            component: BusinessTypeManagementDetail,
            code: FUNCTION_CODE.WAREHOUSE_DETAIL_BUSSINESS_TYPE,

            isInSidebar: false,
          },
          {
            name: ROUTE.BUSINESS_TYPE_MANAGEMENT.EDIT.TITLE,
            path: ROUTE.BUSINESS_TYPE_MANAGEMENT.EDIT.PATH,
            component: BusinessTypeManagementForm,
            code: FUNCTION_CODE.WAREHOUSE_UPDATE_BUSSINESS_TYPE,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.MATERIAL_MANAGEMENT.LIST.TITLE,
        path: ROUTE.MATERIAL_MANAGEMENT.LIST.PATH,
        component: MaterialManagement,
        code: FUNCTION_CODE.ITEM_LIST_ITEM,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.MATERIAL_MANAGEMENT.CREATE.TITLE,
            path: ROUTE.MATERIAL_MANAGEMENT.CREATE.PATH,
            component: MaterialManagementForm,
            code: FUNCTION_CODE.ITEM_CREATE_ITEM,
            isInSidebar: false,
          },
          {
            name: ROUTE.MATERIAL_MANAGEMENT.DETAIL.TITLE,
            path: ROUTE.MATERIAL_MANAGEMENT.DETAIL.PATH,
            component: MaterialManagementDetail,
            code: FUNCTION_CODE.ITEM_DETAIL_ITEM,
            isInSidebar: false,
          },
          {
            name: ROUTE.MATERIAL_MANAGEMENT.EDIT_WAREHOUSE_SOURCE.TITLE,
            path: ROUTE.MATERIAL_MANAGEMENT.EDIT_WAREHOUSE_SOURCE.PATH,
            component: MaterialManagementDetail,
            code: FUNCTION_CODE.ITEM_DETAIL_ITEM,
            isInSidebar: false,
          },
          {
            name: ROUTE.MATERIAL_MANAGEMENT.EDIT.TITLE,
            path: ROUTE.MATERIAL_MANAGEMENT.EDIT.PATH,
            component: MaterialManagementForm,
            code: FUNCTION_CODE.ITEM_UPDATE_ITEM,
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
        name: ROUTE.USER_PERMISSION.TITLE,
        path: ROUTE.USER_PERMISSION.PATH,
        component: UserPermission,
        code: FUNCTION_CODE.USER_SET_PERMISSION_USER,
        isInSidebar: true,
      },
      {
        name: ROUTE.QR_CODE.TITLE,
        path: ROUTE.QR_CODE.PATH,
        component: QrCode,
        code: FUNCTION_CODE.REPORT_GET_QR_CODE_SETTING,
        isInSidebar: true,
      },
      {
        name: ROUTE.SIGNATURE_CONFIGURATION.TITLE,
        path: ROUTE.SIGNATURE_CONFIGURATION.PATH,
        component: SignatureConfiguration,
        code: FUNCTION_CODE.REPORT_LIST_CONFIG_SIGNATURE,
        isInSidebar: true, // BA request hide this on the sidebar tempoary
        isInControllingCompany: true,
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
      {
        name: ROUTE.ROLE_LIST.LIST.TITLE,
        path: ROUTE.ROLE_LIST.LIST.PATH,
        component: RoleList,
        code: FUNCTION_CODE.USER_LIST_USER_ROLE_SETTING,
        isInSidebar: true,

        subMenu: [
          {
            name: ROUTE.ROLE_LIST.CREATE.TITLE,
            path: ROUTE.ROLE_LIST.CREATE.PATH,
            component: DefineRoleForm,
            code: FUNCTION_CODE.USER_CREATE_USER_ROLE_SETTING,
            isInSidebar: false,
          },
          {
            name: ROUTE.ROLE_LIST.DETAIL.TITLE,
            path: ROUTE.ROLE_LIST.DETAIL.PATH,
            component: DefineRoleDetail,
            code: FUNCTION_CODE.USER_DETAIL_USER_ROLE_SETTING,
            isInSidebar: false,
          },
          {
            name: ROUTE.ROLE_LIST.EDIT.TITLE,
            path: ROUTE.ROLE_LIST.EDIT.PATH,
            code: FUNCTION_CODE.USER_UPDATE_USER_ROLE_SETTING,
            component: DefineRoleForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.UNIT_MANAGEMENT.LIST.TITLE,
        path: ROUTE.UNIT_MANAGEMENT.LIST.PATH,
        component: UnitManagement,
        code: FUNCTION_CODE.USER_LIST_DEPARTMENT_SETTING,
        isInSidebar: true,

        subMenu: [
          {
            name: ROUTE.UNIT_MANAGEMENT.CREATE.TITLE,
            path: ROUTE.UNIT_MANAGEMENT.CREATE.PATH,
            component: UnitManagementForm,
            code: FUNCTION_CODE.USER_CREATE_DEPARTMENT_SETTING,
            isInSidebar: false,
          },
          {
            name: ROUTE.UNIT_MANAGEMENT.DETAIL.TITLE,
            path: ROUTE.UNIT_MANAGEMENT.DETAIL.PATH,
            component: UnitManagementDetail,
            code: FUNCTION_CODE.USER_DETAIL_DEPARTMENT_SETTING,
            isInSidebar: false,
          },
          {
            name: ROUTE.UNIT_MANAGEMENT.EDIT.TITLE,
            path: ROUTE.UNIT_MANAGEMENT.EDIT.PATH,
            component: UnitManagementForm,
            code: FUNCTION_CODE.USER_UPDATE_DEPARTMENT_SETTING,
            isInSidebar: false,
          },
          {
            name: ROUTE.UNIT_MANAGEMENT.ASSIGN.TITLE,
            path: ROUTE.UNIT_MANAGEMENT.ASSIGN.PATH,
            component: UnitManagementAssign,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.LICENSE.TITLE,
        path: ROUTE.LICENSE.PATH,
        component: LicenseDetail,
        // code: FUNCTION_CODE.USER_LIST_DEPARTMENT_SETTING,
        isInSidebar: true,
      },
    ],
  },
]

export default routes
