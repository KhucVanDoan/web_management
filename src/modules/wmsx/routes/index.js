import Dashboard from '~/modules/wmsx/features/dashboard'

// import DefineBlockDetail from '~/modules/wmsx/features/define-block/detail'
// import DefineBlockForm from '~/modules/wmsx/features/define-block/form'
// import DefineBlock from '~/modules/wmsx/features/define-block/list'
// import DefineCustomerLevelDetail from '~/modules/wmsx/features/define-customer-level/detail'
// import DefineCustomerLevelForm from '~/modules/wmsx/features/define-customer-level/form'
// import DefineCustomerLevel from '~/modules/wmsx/features/define-customer-level/list'
// import DefineCustomerDetail from '~/modules/wmsx/features/define-customer/detail'
// import DefineCustomerForm from '~/modules/wmsx/features/define-customer/form'
// import DefineCustomer from '~/modules/wmsx/features/define-customer/list'
// import DefineDetailDetail from '~/modules/wmsx/features/define-detail/detail'
// import DefineDetailForm from '~/modules/wmsx/features/define-detail/form'
// import DefineDetail from '~/modules/wmsx/features/define-detail/list'
// import DefinePackageDetail from '~/modules/wmsx/features/define-package/detail'
// import DefinePackageForm from '~/modules/wmsx/features/define-package/form'
// import DefinePackage from '~/modules/wmsx/features/define-package/list'
// import DefineTemplateShelfDetail from '~/modules/wmsx/features/define-template-shelf/detail'
// import DefineTemplateShelfForm from '~/modules/wmsx/features/define-template-shelf/form'
// import DefineTemplateShelf from '~/modules/wmsx/features/define-template-shelf/list'
// import ImportManufacturingOrderDetail from '~/modules/wmsx/features/import-manufacturing-order/detail'
// import ImportManufacturingOrderForm from '~/modules/wmsx/features/import-manufacturing-order/form'
// import ImportManufacturingOrder from '~/modules/wmsx/features/import-manufacturing-order/list'
// import InventoryCalendarDetail from '~/modules/wmsx/features/inventory-calendar/detail'
// import InventoryCalendarForm from '~/modules/wmsx/features/inventory-calendar/form'
// import InventoryCalendar from '~/modules/wmsx/features/inventory-calendar/list'
// import InventoryDeadlineWarning from '~/modules/wmsx/features/inventory-deadline-warning'
// import InventoryStatistics from '~/modules/wmsx/features/inventory-statistics'
// import InventoryWarning from '~/modules/wmsx/features/inventory-warning'
// import PurchasedOrdersImportDetail from '~/modules/wmsx/features/purchased-orders-import/detail'
// import PurchasedOrdersImportForm from '~/modules/wmsx/features/purchased-orders-import/form'
// import PurchasedOrdersImport from '~/modules/wmsx/features/purchased-orders-import/list'
// import WarehouseExport from '~/modules/wmsx/features/warehouse-export'
// import WarehouseExportDetail from '~/modules/wmsx/features/warehouse-export/detail'
// import WarehouseReport from '~/modules/wmsx/features/warehouse-report'
// import WarehouseReportDetail from '~/modules/wmsx/features/warehouse-report/detail'
// import WarehouseReportForm from '~/modules/wmsx/features/warehouse-report/form'

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
import DefineMaterialQualityDetail from '../features/define-material-quality/detail'
import DefineMaterialQualityForm from '../features/define-material-quality/form'
import DefineMaterialQuality from '../features/define-material-quality/list'
import DefineObjectCategoryDetail from '../features/define-object-category/detail'
import DefineObjectCategoryForm from '../features/define-object-category/form'
import DefineObjectCategory from '../features/define-object-category/list'
import ReasonManagementDetail from '../features/reason-management/detail'
import ReasonManagementForm from '../features/reason-management/form'
import ReasonManagement from '../features/reason-management/list'
import SourceManagementDetail from '../features/source-management/detail'
import SourceManagementForm from '../features/source-management/form'
import SourceManagement from '../features/source-management/list'
// import DefineBill from '../features/define-bill'
// import DefineBillDetail from '../features/define-bill/detail'
// import DefineBillForm from '../features/define-bill/form'
// import DefineCurrencyUnitDetail from '../features/define-currency-unit/detail'
// import DefineCurrencyUnitForm from '../features/define-currency-unit/form'
// import DefineCurrencyUnit from '../features/define-currency-unit/list'
// import DefinePalletDetail from '../features/define-pallet/detail'
// import DefinePalletForm from '../features/define-pallet/form'
// import DefinePallet from '../features/define-pallet/list'
// import DefinePaymentTypeDetail from '../features/define-payment-type/detail'
// import DefinePaymentTypeForm from '../features/define-payment-type/form'
// import DefinePaymentType from '../features/define-payment-type/list'
// import DefineServiceDetail from '../features/define-service/detail'
// import DefineServiceForm from '../features/define-service/form'
// import DefineService from '../features/define-service/list'
// import TemplateSectorDetail from '../features/define-template-sector/detail'
// import TemplateSectorForm from '../features/define-template-sector/form'
// import TemplateSector from '../features/define-template-sector/list'
// import DefineTypeServiceDetail from '../features/define-type-service/detail'
// import DefineTypeServiceForm from '../features/define-type-service/form'
// import DefineTypeService from '../features/define-type-service/list'
// import DefineTypeUnitDetail from '../features/define-type-unit/detail'
// import DefineTypeUnitForm from '../features/define-type-unit/form'
// import DefineTypeUnit from '../features/define-type-unit/list'
// import DefineVendorDetail from '../features/define-vendor/detail'
// import DefineVendorForm from '../features/define-vendor/form'
// import DefineVendor from '../features/define-vendor/list'
// import DefineWarehouse from '../features/define-warehouse'
// import DefineWarehousePalletDetail from '../features/define-warehouse-pallet/detail'
// import DefineWarehousePallet from '../features/define-warehouse-pallet/list'
// import DefineWarehouseShelfDetail from '../features/define-warehouse-shelf/detail'
// import DefineWarehouseShelf from '../features/define-warehouse-shelf/list'
// import DefineWarehouseDetail from '../features/define-warehouse/detail'
// import DefineWarehouseFrom from '../features/define-warehouse/form'
// import EstablishLocation from '../features/establish-location'
// import EstablishLocationDetail from '../features/establish-location/detail'
// import EstablishLocationForm from '../features/establish-location/form'
// import {
//   Transactions as ImportManufacturingOrderTransactions,
//   TransactionDetail as ImportManufacturingOrderTransactionDetail,
// } from '../features/import-manufacturing-order/transactions'
// import InventoryLimit from '../features/inventory-limit'
// import InventoryLimitDetail from '../features/inventory-limit/detail'
// import InventoryLimitForm from '../features/inventory-limit/form'
// import InventoryDetail from '../features/inventory/detail'
// import Inventory from '../features/inventory/list'
// import InvoiceType from '../features/invoice-type'
// import InvoiceTypeDetail from '../features/invoice-type/detail'
// import InvoiceTypeForm from '../features/invoice-type/form'
// import LockItemDetail from '../features/lock-item-location/detail/block-item'
// import LockLocationDetail from '../features/lock-item-location/detail/block-location'
// import LockItemLocaionForm from '../features/lock-item-location/form'
// import LockItemLocation from '../features/lock-item-location/list'
// import ProductionOrder from '../features/production-orders'
// import ProductionOrderDetail from '../features/production-orders/detail'
// import ProductionOrderForm from '../features/production-orders/form'
// import {
//   Transactions as ProductionOrderTransactions,
//   TransactionDetail as ProductionOrderTransactionDetail,
// } from '../features/production-orders/transactions'
// import {
//   Transactions as PurchasedOrdersImportTransactions,
//   TransactionDetail as PurchasedOrdersImportTransactionDetail,
// } from '../features/purchased-orders-import/transactions'
// import RentWarehouseDashboard from '../features/rent-warehouse-dashboard'
// import ReturnOrderDetail from '../features/return-order/detail'
// import ReturnOrderForm from '../features/return-order/form'
// import ReturnOrder from '../features/return-order/list'
// import {
//   Transactions as ReturnOrderTransactions,
//   TransactionDetail as ReturnOrderTransactionDetail,
// } from '../features/return-order/transactions'
// import SOExport from '../features/so-export'
// import SOExportDetail from '../features/so-export/detail'
// import SOExportForm from '../features/so-export/form'
// import {
//   Transactions as SOExportTransactions,
//   TransactionDetail as SOExportTransactionDetail,
// } from '../features/so-export/transactions'
import UnitManagementDetail from '../features/unit-management/detail'
import UnitManagementForm from '../features/unit-management/form'
import UnitManagement from '../features/unit-management/list'
// import DefineVoucher from '../features/voucher'
// import DefineVoucherDetail from '../features/voucher/detail'
// import DefineVoucherForm from '../features/voucher/form'
// import WarehouseAreaDetail from '../features/warehouse-area/detail'
// import WarehouseArea from '../features/warehouse-area/list'
// import warehouseDesign from '../features/warehouse-design/index'
// import WarehouseImportDetail from '../features/warehouse-import/detail'
// import WarehouseImport from '../features/warehouse-import/list'
// import WarehouseSettingDetail from '../features/warehouse-setting/detail'
// import WarehouseSettingForm from '../features/warehouse-setting/form'
// import WarehouseSetting from '../features/warehouse-setting/list'
// import WarehouseSpaceReport from '../features/warehouse-space-report'
// import WarehouseTransferMovements from '../features/warehouse-transfer-movements'
// import WarehouseTransferMovementsDetail from '../features/warehouse-transfer-movements/detail'
// import WarehouseTransferDetail from '../features/warehouse-transfer/detail'
// import WarehouseTransferForm from '../features/warehouse-transfer/form'
// import WarehouseTransfer from '../features/warehouse-transfer/list'
// import {
//   Transactions as WarehouseTransferTransactions,
//   TransactionDetail as WarehouseTransferTransactionDetail,
// } from '../features/warehouse-transfer/transactions'
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
    name: ROUTE.DATABASE.TITLE,
    icon: 'database',
    isInSidebar: true,
    subMenu: [
      {
        name: ROUTE.COMPANY_MANAGEMENT.LIST.TITLE,
        path: ROUTE.COMPANY_MANAGEMENT.LIST.PATH,
        component: CompanyManagement,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.COMPANY_MANAGEMENT.CREATE.TITLE,
            path: ROUTE.COMPANY_MANAGEMENT.CREATE.PATH,
            component: CompanyManagementForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.COMPANY_MANAGEMENT.DETAIL.TITLE,
            path: ROUTE.COMPANY_MANAGEMENT.DETAIL.PATH,
            component: CompanyManagementDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.COMPANY_MANAGEMENT.EDIT.TITLE,
            path: ROUTE.COMPANY_MANAGEMENT.EDIT.PATH,
            component: CompanyManagementForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.UNIT_MANAGEMENT.LIST.TITLE,
        path: ROUTE.UNIT_MANAGEMENT.LIST.PATH,
        component: UnitManagement,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.UNIT_MANAGEMENT.CREATE.TITLE,
            path: ROUTE.UNIT_MANAGEMENT.CREATE.PATH,
            component: UnitManagementForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.UNIT_MANAGEMENT.DETAIL.TITLE,
            path: ROUTE.UNIT_MANAGEMENT.DETAIL.PATH,
            component: UnitManagementDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.UNIT_MANAGEMENT.EDIT.TITLE,
            path: ROUTE.UNIT_MANAGEMENT.EDIT.PATH,
            component: UnitManagementForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.RECEIPT_DEPARTMENT_MANAGEMENT.LIST.TITLE,
        path: ROUTE.RECEIPT_DEPARTMENT_MANAGEMENT.LIST.PATH,
        component: () => null,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.RECEIPT_DEPARTMENT_MANAGEMENT.CREATE.TITLE,
            path: ROUTE.RECEIPT_DEPARTMENT_MANAGEMENT.CREATE.PATH,
            component: () => null,
            isInSidebar: false,
          },
          {
            name: ROUTE.RECEIPT_DEPARTMENT_MANAGEMENT.DETAIL.TITLE,
            path: ROUTE.RECEIPT_DEPARTMENT_MANAGEMENT.DETAIL.PATH,
            component: () => null,
            isInSidebar: false,
          },
          {
            name: ROUTE.RECEIPT_DEPARTMENT_MANAGEMENT.EDIT.TITLE,
            path: ROUTE.RECEIPT_DEPARTMENT_MANAGEMENT.EDIT.PATH,
            component: () => null,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.CONSTRUCTION_MANAGEMENT.LIST.TITLE,
        path: ROUTE.CONSTRUCTION_MANAGEMENT.LIST.PATH,
        component: ConstructionManagement,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.CONSTRUCTION_MANAGEMENT.CREATE.TITLE,
            path: ROUTE.CONSTRUCTION_MANAGEMENT.CREATE.PATH,
            component: ConstructionManagementForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.CONSTRUCTION_MANAGEMENT.DETAIL.TITLE,
            path: ROUTE.CONSTRUCTION_MANAGEMENT.DETAIL.PATH,
            component: ConstructionManagementDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.CONSTRUCTION_MANAGEMENT.EDIT.TITLE,
            path: ROUTE.CONSTRUCTION_MANAGEMENT.EDIT.PATH,
            component: ConstructionManagementForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.CONSTRUCTION_ITEMS_MANAGEMENT.LIST.TITLE,
        path: ROUTE.CONSTRUCTION_ITEMS_MANAGEMENT.LIST.PATH,
        component: ConstructionItemsManagement,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.CONSTRUCTION_ITEMS_MANAGEMENT.CREATE.TITLE,
            path: ROUTE.CONSTRUCTION_ITEMS_MANAGEMENT.CREATE.PATH,
            component: ConstructionItemsManagementForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.CONSTRUCTION_ITEMS_MANAGEMENT.DETAIL.TITLE,
            path: ROUTE.CONSTRUCTION_ITEMS_MANAGEMENT.DETAIL.PATH,
            component: ConstructionItemsManagementDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.CONSTRUCTION_ITEMS_MANAGEMENT.EDIT.TITLE,
            path: ROUTE.CONSTRUCTION_ITEMS_MANAGEMENT.EDIT.PATH,
            component: ConstructionItemsManagementForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.SOURCE_MANAGEMENT.LIST.TITLE,
        path: ROUTE.SOURCE_MANAGEMENT.LIST.PATH,
        component: SourceManagement,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.SOURCE_MANAGEMENT.CREATE.TITLE,
            path: ROUTE.SOURCE_MANAGEMENT.CREATE.PATH,
            component: SourceManagementForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.SOURCE_MANAGEMENT.DETAIL.TITLE,
            path: ROUTE.SOURCE_MANAGEMENT.DETAIL.PATH,
            component: SourceManagementDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.SOURCE_MANAGEMENT.EDIT.TITLE,
            path: ROUTE.SOURCE_MANAGEMENT.EDIT.PATH,
            component: SourceManagementForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.REASON_MANAGEMENT.LIST.TITLE,
        path: ROUTE.REASON_MANAGEMENT.LIST.PATH,
        component: ReasonManagement,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.REASON_MANAGEMENT.CREATE.TITLE,
            path: ROUTE.REASON_MANAGEMENT.CREATE.PATH,
            component: ReasonManagementForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.REASON_MANAGEMENT.DETAIL.TITLE,
            path: ROUTE.REASON_MANAGEMENT.DETAIL.PATH,
            component: ReasonManagementDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.REASON_MANAGEMENT.EDIT.TITLE,
            path: ROUTE.REASON_MANAGEMENT.EDIT.PATH,
            component: ReasonManagementForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.DEFINE_UOM.LIST.TITLE,
        path: ROUTE.DEFINE_UOM.LIST.PATH,
        component: () => null,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFINE_UOM.CREATE.TITLE,
            path: ROUTE.DEFINE_UOM.CREATE.PATH,
            component: () => null,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_UOM.DETAIL.TITLE,
            path: ROUTE.DEFINE_UOM.DETAIL.PATH,
            component: () => null,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_UOM.EDIT.TITLE,
            path: ROUTE.DEFINE_UOM.EDIT.PATH,
            component: () => null,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.BUSINESS_TYPE_MANAGEMENT.LIST.TITLE,
        path: ROUTE.BUSINESS_TYPE_MANAGEMENT.LIST.PATH,
        component: BussinessTypeManagement,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.BUSINESS_TYPE_MANAGEMENT.CREATE.TITLE,
            path: ROUTE.BUSINESS_TYPE_MANAGEMENT.CREATE.PATH,
            component: BusinessTypeManagementForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.BUSINESS_TYPE_MANAGEMENT.DETAIL.TITLE,
            path: ROUTE.BUSINESS_TYPE_MANAGEMENT.DETAIL.PATH,
            component: BusinessTypeManagementDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.BUSINESS_TYPE_MANAGEMENT.EDIT.TITLE,
            path: ROUTE.BUSINESS_TYPE_MANAGEMENT.EDIT.PATH,
            component: BusinessTypeManagementForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.DEFINE_OBJECT_CATEGORY.LIST.TITLE,
        path: ROUTE.DEFINE_OBJECT_CATEGORY.LIST.PATH,
        component: DefineObjectCategory,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFINE_OBJECT_CATEGORY.CREATE.TITLE,
            path: ROUTE.DEFINE_OBJECT_CATEGORY.CREATE.PATH,
            component: DefineObjectCategoryForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_OBJECT_CATEGORY.DETAIL.TITLE,
            path: ROUTE.DEFINE_OBJECT_CATEGORY.DETAIL.PATH,
            component: DefineObjectCategoryDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_OBJECT_CATEGORY.EDIT.TITLE,
            path: ROUTE.DEFINE_OBJECT_CATEGORY.EDIT.PATH,
            component: DefineObjectCategoryForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.DEFINE_MATERIAL_CATEGORY.LIST.TITLE,
        path: ROUTE.DEFINE_MATERIAL_CATEGORY.LIST.PATH,
        component: () => null,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFINE_MATERIAL_CATEGORY.CREATE.TITLE,
            path: ROUTE.DEFINE_MATERIAL_CATEGORY.CREATE.PATH,
            component: () => null,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_MATERIAL_CATEGORY.DETAIL.TITLE,
            path: ROUTE.DEFINE_MATERIAL_CATEGORY.DETAIL.PATH,
            component: () => null,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_MATERIAL_CATEGORY.EDIT.TITLE,
            path: ROUTE.DEFINE_MATERIAL_CATEGORY.EDIT.PATH,
            component: () => null,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.DEFINE_MATERIAL_QUALITY.LIST.TITLE,
        path: ROUTE.DEFINE_MATERIAL_QUALITY.LIST.PATH,
        component: DefineMaterialQuality,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFINE_MATERIAL_QUALITY.CREATE.TITLE,
            path: ROUTE.DEFINE_MATERIAL_QUALITY.CREATE.PATH,
            component: DefineMaterialQualityForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_MATERIAL_QUALITY.DETAIL.TITLE,
            path: ROUTE.DEFINE_MATERIAL_QUALITY.DETAIL.PATH,
            component: DefineMaterialQualityDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_MATERIAL_QUALITY.EDIT.TITLE,
            path: ROUTE.DEFINE_MATERIAL_QUALITY.EDIT.PATH,
            component: DefineMaterialQualityForm,
            isInSidebar: false,
          },
        ],
      },
    ],
  },
  // {
  //   name: ROUTE.DEFINE_CATEGORY.TITLE,
  //   icon: 'database',
  //   isInSidebar: true,
  //   subMenu: [
  //     {
  //       name: ROUTE.DEFINE_DETAIL.LIST.TITLE,
  //       path: ROUTE.DEFINE_DETAIL.LIST.PATH,
  //       component: DefineDetail,
  //       isInSidebar: true,
  //       subMenu: [
  //         {
  //           name: ROUTE.DEFINE_DETAIL.CREATE.TITLE,
  //           path: ROUTE.DEFINE_DETAIL.CREATE.PATH,
  //           component: DefineDetailForm,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.DEFINE_DETAIL.DETAIL.TITLE,
  //           path: ROUTE.DEFINE_DETAIL.DETAIL.PATH,
  //           component: DefineDetailDetail,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.DEFINE_DETAIL.EDIT.TITLE,
  //           path: ROUTE.DEFINE_DETAIL.EDIT.PATH,
  //           component: DefineDetailForm,
  //           isInSidebar: false,
  //         },
  //       ],
  //     },

  //     {
  //       name: ROUTE.DEFINE_PACKAGE.LIST.TITLE,
  //       path: ROUTE.DEFINE_PACKAGE.LIST.PATH,
  //       component: DefinePackage,
  //       isInSidebar: true,
  //       subMenu: [
  //         {
  //           name: ROUTE.DEFINE_PACKAGE.CREATE.TITLE,
  //           path: ROUTE.DEFINE_PACKAGE.CREATE.PATH,
  //           component: DefinePackageForm,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.DEFINE_PACKAGE.DETAIL.TITLE,
  //           path: ROUTE.DEFINE_PACKAGE.DETAIL.PATH,
  //           component: DefinePackageDetail,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.DEFINE_PACKAGE.EDIT.TITLE,
  //           path: ROUTE.DEFINE_PACKAGE.EDIT.PATH,
  //           component: DefinePackageForm,
  //           isInSidebar: false,
  //         },
  //       ],
  //     },
  //     {
  //       name: ROUTE.DEFINE_BLOCK.LIST.TITLE,
  //       path: ROUTE.DEFINE_BLOCK.LIST.PATH,
  //       component: DefineBlock,
  //       isInSidebar: true,
  //       subMenu: [
  //         {
  //           name: ROUTE.DEFINE_BLOCK.CREATE.TITLE,
  //           path: ROUTE.DEFINE_BLOCK.CREATE.PATH,
  //           component: DefineBlockForm,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.DEFINE_BLOCK.DETAIL.TITLE,
  //           path: ROUTE.DEFINE_BLOCK.DETAIL.PATH,
  //           component: DefineBlockDetail,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.DEFINE_BLOCK.EDIT.TITLE,
  //           path: ROUTE.DEFINE_BLOCK.EDIT.PATH,
  //           component: DefineBlockForm,
  //         },
  //       ],
  //     },
  //     {
  //       name: ROUTE.DEFINE_PALLET.LIST.TITLE,
  //       path: ROUTE.DEFINE_PALLET.LIST.PATH,
  //       component: DefinePallet,
  //       isInSidebar: true,
  //       subMenu: [
  //         {
  //           name: ROUTE.DEFINE_PALLET.CREATE.TITLE,
  //           path: ROUTE.DEFINE_PALLET.CREATE.PATH,
  //           component: DefinePalletForm,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.DEFINE_PALLET.DETAIL.TITLE,
  //           path: ROUTE.DEFINE_PALLET.DETAIL.PATH,
  //           component: DefinePalletDetail,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.DEFINE_PALLET.EDIT.TITLE,
  //           path: ROUTE.DEFINE_PALLET.EDIT.PATH,
  //           component: DefinePalletForm,
  //           isInSidebar: false,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   name: ROUTE.PRODUCTION_INFORMATION_MANAGENMENT.TITLE,
  //   isInSidebar: true,
  //   icon: 'prettyBag',
  //   subMenu: [
  //     {
  //       name: ROUTE.DEFINE_VENDEOR.LIST.TITLE,
  //       path: ROUTE.DEFINE_VENDEOR.LIST.PATH,
  //       component: DefineVendor,
  //       isInSidebar: true,
  //       subMenu: [
  //         {
  //           name: ROUTE.DEFINE_VENDEOR.CREATE.TITLE,
  //           path: ROUTE.DEFINE_VENDEOR.CREATE.PATH,
  //           component: DefineVendorForm,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.DEFINE_VENDEOR.EDIT.TITLE,
  //           path: ROUTE.DEFINE_VENDEOR.EDIT.PATH,
  //           component: DefineVendorForm,
  //           isInSidebar: true,
  //         },
  //         {
  //           name: ROUTE.DEFINE_VENDEOR.DETAIL.TITLE,
  //           path: ROUTE.DEFINE_VENDEOR.DETAIL.PATH,
  //           component: DefineVendorDetail,
  //           isInSidebar: true,
  //         },
  //       ],
  //     },
  //     {
  //       name: ROUTE.DEFINE_CUSTOMER.LIST.TITLE,
  //       path: ROUTE.DEFINE_CUSTOMER.LIST.PATH,
  //       component: DefineCustomer,
  //       isInSidebar: true,
  //       subMenu: [
  //         {
  //           name: ROUTE.DEFINE_CUSTOMER.CREATE.TITLE,
  //           path: ROUTE.DEFINE_CUSTOMER.CREATE.PATH,
  //           component: DefineCustomerForm,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.DEFINE_CUSTOMER.EDIT.TITLE,
  //           path: ROUTE.DEFINE_CUSTOMER.EDIT.PATH,
  //           component: DefineCustomerForm,
  //           isInSidebar: true,
  //         },
  //         {
  //           name: ROUTE.DEFINE_CUSTOMER.DETAIL.TITLE,
  //           path: ROUTE.DEFINE_CUSTOMER.DETAIL.PATH,
  //           component: DefineCustomerDetail,
  //           isInSidebar: true,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   name: ROUTE.ORDER_MANAGEMENT.TITLE,
  //   isInSidebar: true,
  //   icon: 'prettyBag',
  //   subMenu: [
  //     {
  //       name: ROUTE.PURCHASED_ORDER_IMPORT.LIST.TITLE,
  //       path: ROUTE.PURCHASED_ORDER_IMPORT.LIST.PATH,
  //       component: PurchasedOrdersImport,
  //       isInSidebar: true,
  //       subMenu: [
  //         {
  //           name: ROUTE.PURCHASED_ORDER_IMPORT.CREATE.TITLE,
  //           path: ROUTE.PURCHASED_ORDER_IMPORT.CREATE.PATH,
  //           component: PurchasedOrdersImportForm,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.PURCHASED_ORDER_IMPORT.DETAIL.TITLE,
  //           path: ROUTE.PURCHASED_ORDER_IMPORT.DETAIL.PATH,
  //           component: PurchasedOrdersImportDetail,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.PURCHASED_ORDER_IMPORT.EDIT.TITLE,
  //           path: ROUTE.PURCHASED_ORDER_IMPORT.EDIT.PATH,
  //           component: PurchasedOrdersImportForm,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.PURCHASED_ORDER_IMPORT.TRANSACTIONS.LIST.TITLE,
  //           path: ROUTE.PURCHASED_ORDER_IMPORT.TRANSACTIONS.LIST.PATH,
  //           component: PurchasedOrdersImportTransactions,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.PURCHASED_ORDER_IMPORT.TRANSACTIONS.DETAIL.TITLE,
  //           path: ROUTE.PURCHASED_ORDER_IMPORT.TRANSACTIONS.DETAIL.PATH,
  //           component: PurchasedOrdersImportTransactionDetail,
  //           isInSidebar: false,
  //         },
  //       ],
  //     },
  //     {
  //       name: ROUTE.SO_EXPORT.LIST.TITLE,
  //       path: ROUTE.SO_EXPORT.LIST.PATH,
  //       component: SOExport,
  //       isInSidebar: true,
  //       subMenu: [
  //         {
  //           name: ROUTE.SO_EXPORT.CREATE.TITLE,
  //           path: ROUTE.SO_EXPORT.CREATE.PATH,
  //           component: SOExportForm,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.SO_EXPORT.DETAIL.TITLE,
  //           path: ROUTE.SO_EXPORT.DETAIL.PATH,
  //           component: SOExportDetail,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.SO_EXPORT.EDIT.TITLE,
  //           path: ROUTE.SO_EXPORT.EDIT.PATH,
  //           component: SOExportForm,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.SO_EXPORT.TRANSACTIONS.LIST.TITLE,
  //           path: ROUTE.SO_EXPORT.TRANSACTIONS.LIST.PATH,
  //           component: SOExportTransactions,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.SO_EXPORT.TRANSACTIONS.DETAIL.TITLE,
  //           path: ROUTE.SO_EXPORT.TRANSACTIONS.DETAIL.PATH,
  //           component: SOExportTransactionDetail,
  //           isInSidebar: false,
  //         },
  //       ],
  //     },
  //     {
  //       name: ROUTE.PRODUCTION_ORDER.LIST.TITLE,
  //       path: ROUTE.PRODUCTION_ORDER.LIST.PATH,
  //       component: ProductionOrder,
  //       isInSidebar: true,
  //       subMenu: [
  //         {
  //           name: ROUTE.PRODUCTION_ORDER.CREATE.TITLE,
  //           path: ROUTE.PRODUCTION_ORDER.CREATE.PATH,
  //           component: ProductionOrderForm,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.PRODUCTION_ORDER.DETAIL.TITLE,
  //           path: ROUTE.PRODUCTION_ORDER.DETAIL.PATH,
  //           component: ProductionOrderDetail,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.PRODUCTION_ORDER.EDIT.TITLE,
  //           path: ROUTE.PRODUCTION_ORDER.EDIT.PATH,
  //           component: ProductionOrderForm,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.PRODUCTION_ORDER.TRANSACTIONS.LIST.TITLE,
  //           path: ROUTE.PRODUCTION_ORDER.TRANSACTIONS.LIST.PATH,
  //           component: ProductionOrderTransactions,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.PRODUCTION_ORDER.TRANSACTIONS.DETAIL.TITLE,
  //           path: ROUTE.PRODUCTION_ORDER.TRANSACTIONS.DETAIL.PATH,
  //           component: ProductionOrderTransactionDetail,
  //           isInSidebar: false,
  //         },
  //       ],
  //     },
  //     {
  //       name: ROUTE.IMPORT_MANUFACTURING_ORDER.LIST.TITLE,
  //       path: ROUTE.IMPORT_MANUFACTURING_ORDER.LIST.PATH,
  //       component: ImportManufacturingOrder,
  //       isInSidebar: true,
  //       subMenu: [
  //         {
  //           name: ROUTE.IMPORT_MANUFACTURING_ORDER.CREATE.TITLE,
  //           path: ROUTE.IMPORT_MANUFACTURING_ORDER.CREATE.PATH,
  //           component: ImportManufacturingOrderForm,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.IMPORT_MANUFACTURING_ORDER.DETAIL.TITLE,
  //           path: ROUTE.IMPORT_MANUFACTURING_ORDER.DETAIL.PATH,
  //           component: ImportManufacturingOrderDetail,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.IMPORT_MANUFACTURING_ORDER.EDIT.TITLE,
  //           path: ROUTE.IMPORT_MANUFACTURING_ORDER.EDIT.PATH,
  //           component: ImportManufacturingOrderForm,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.IMPORT_MANUFACTURING_ORDER.TRANSACTIONS.LIST.TITLE,
  //           path: ROUTE.IMPORT_MANUFACTURING_ORDER.TRANSACTIONS.LIST.PATH,
  //           component: ImportManufacturingOrderTransactions,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.IMPORT_MANUFACTURING_ORDER.TRANSACTIONS.DETAIL.TITLE,
  //           path: ROUTE.IMPORT_MANUFACTURING_ORDER.TRANSACTIONS.DETAIL.PATH,
  //           component: ImportManufacturingOrderTransactionDetail,
  //           isInSidebar: false,
  //         },
  //       ],
  //     },
  //     {
  //       name: ROUTE.WAREHOUSE_TRANSFERS.LIST.TITLE,
  //       path: ROUTE.WAREHOUSE_TRANSFERS.LIST.PATH,
  //       component: WarehouseTransfer,
  //       isInSidebar: true,
  //       subMenu: [
  //         {
  //           name: ROUTE.WAREHOUSE_TRANSFERS.CREATE.TITLE,
  //           path: ROUTE.WAREHOUSE_TRANSFERS.CREATE.PATH,
  //           component: WarehouseTransferForm,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.WAREHOUSE_TRANSFERS.EDIT.TITLE,
  //           path: ROUTE.WAREHOUSE_TRANSFERS.EDIT.PATH,
  //           component: WarehouseTransferForm,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.WAREHOUSE_TRANSFERS.DETAIL.TITLE,
  //           path: ROUTE.WAREHOUSE_TRANSFERS.DETAIL.PATH,
  //           component: WarehouseTransferDetail,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.WAREHOUSE_TRANSFERS.TRANSACTIONS.LIST.TITLE,
  //           path: ROUTE.WAREHOUSE_TRANSFERS.TRANSACTIONS.LIST.PATH,
  //           component: WarehouseTransferTransactions,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.WAREHOUSE_TRANSFERS.TRANSACTIONS.DETAIL.TITLE,
  //           path: ROUTE.WAREHOUSE_TRANSFERS.TRANSACTIONS.DETAIL.PATH,
  //           component: WarehouseTransferTransactionDetail,
  //           isInSidebar: false,
  //         },
  //       ],
  //     },
  //     {
  //       name: ROUTE.INVENTORY_CALENDAR.LIST.TITLE,
  //       path: ROUTE.INVENTORY_CALENDAR.LIST.PATH,
  //       component: InventoryCalendar,
  //       isInSidebar: true,
  //       subMenu: [
  //         {
  //           name: ROUTE.INVENTORY_CALENDAR.CREATE.TITLE,
  //           path: ROUTE.INVENTORY_CALENDAR.CREATE.PATH,
  //           component: InventoryCalendarForm,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.INVENTORY_CALENDAR.DETAIL.TITLE,
  //           path: ROUTE.INVENTORY_CALENDAR.DETAIL.PATH,
  //           component: InventoryCalendarDetail,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.INVENTORY_CALENDAR.EDIT.TITLE,
  //           path: ROUTE.INVENTORY_CALENDAR.EDIT.PATH,
  //           component: InventoryCalendarForm,
  //           isInSidebar: false,
  //         },
  //       ],
  //     },
  //     {
  //       name: ROUTE.RETURN_ORDER.LIST.TITLE,
  //       path: ROUTE.RETURN_ORDER.LIST.PATH,
  //       component: ReturnOrder,
  //       isInSidebar: true,
  //       subMenu: [
  //         {
  //           name: ROUTE.RETURN_ORDER.CREATE.TITLE,
  //           path: ROUTE.RETURN_ORDER.CREATE.PATH,
  //           component: ReturnOrderForm,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.RETURN_ORDER.DETAIL.TITLE,
  //           path: ROUTE.RETURN_ORDER.DETAIL.PATH,
  //           component: ReturnOrderDetail,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.RETURN_ORDER.EDIT.TITLE,
  //           path: ROUTE.RETURN_ORDER.EDIT.PATH,
  //           component: ReturnOrderForm,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.RETURN_ORDER.TRANSACTIONS.LIST.TITLE,
  //           path: ROUTE.RETURN_ORDER.TRANSACTIONS.LIST.PATH,
  //           component: ReturnOrderTransactions,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.RETURN_ORDER.TRANSACTIONS.DETAIL.TITLE,
  //           path: ROUTE.RETURN_ORDER.TRANSACTIONS.DETAIL.PATH,
  //           component: ReturnOrderTransactionDetail,
  //           isInSidebar: false,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   name: ROUTE.WAREHOUSE_SETUP.TITLE,
  //   isInSidebar: true,
  //   icon: 'setting',
  //   subMenu: [
  //     {
  //       name: ROUTE.WAREHOUSE_DESIGN.TITLE,
  //       path: ROUTE.WAREHOUSE_DESIGN.PATH,
  //       component: warehouseDesign,
  //       isInSidebar: true,
  //     },
  //     {
  //       name: ROUTE.TEMPLATE_SECTOR.LIST.TITLE,
  //       path: ROUTE.TEMPLATE_SECTOR.LIST.PATH,
  //       component: TemplateSector,
  //       isInSidebar: true,
  //       subMenu: [
  //         {
  //           name: ROUTE.TEMPLATE_SECTOR.CREATE.TITLE,
  //           path: ROUTE.TEMPLATE_SECTOR.CREATE.PATH,
  //           component: TemplateSectorForm,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.TEMPLATE_SECTOR.EDIT.TITLE,
  //           path: ROUTE.TEMPLATE_SECTOR.EDIT.PATH,
  //           component: TemplateSectorForm,
  //           isInSidebar: true,
  //         },
  //         {
  //           name: ROUTE.TEMPLATE_SECTOR.DETAIL.TITLE,
  //           path: ROUTE.TEMPLATE_SECTOR.DETAIL.PATH,
  //           component: TemplateSectorDetail,
  //           isInSidebar: true,
  //         },
  //       ],
  //     },
  //     {
  //       name: ROUTE.DEFINE_TEMPLATE_SHELF.LIST.TITLE,
  //       path: ROUTE.DEFINE_TEMPLATE_SHELF.LIST.PATH,
  //       component: DefineTemplateShelf,
  //       isInSidebar: true,
  //       subMenu: [
  //         {
  //           name: ROUTE.DEFINE_TEMPLATE_SHELF.CREATE.TITLE,
  //           path: ROUTE.DEFINE_TEMPLATE_SHELF.CREATE.PATH,
  //           component: DefineTemplateShelfForm,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.DEFINE_TEMPLATE_SHELF.DETAIL.TITLE,
  //           path: ROUTE.DEFINE_TEMPLATE_SHELF.DETAIL.PATH,
  //           component: DefineTemplateShelfDetail,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.DEFINE_TEMPLATE_SHELF.EDIT.TITLE,
  //           path: ROUTE.DEFINE_TEMPLATE_SHELF.EDIT.PATH,
  //           component: DefineTemplateShelfForm,
  //           isInSidebar: false,
  //         },
  //       ],
  //     },
  //     {
  //       name: ROUTE.WAREHOUSE_SETTING.LIST.TITLE,
  //       path: ROUTE.WAREHOUSE_SETTING.LIST.PATH,
  //       component: WarehouseSetting,
  //       isInSidebar: true,
  //       subMenu: [
  //         {
  //           name: ROUTE.WAREHOUSE_SETTING.CREATE.TITLE,
  //           path: ROUTE.WAREHOUSE_SETTING.CREATE.PATH,
  //           component: WarehouseSettingForm,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.WAREHOUSE_SETTING.EDIT.TITLE,
  //           path: ROUTE.WAREHOUSE_SETTING.EDIT.PATH,
  //           component: WarehouseSettingForm,
  //           isInSidebar: true,
  //         },
  //         {
  //           name: ROUTE.WAREHOUSE_SETTING.DETAIL.TITLE,
  //           path: ROUTE.WAREHOUSE_SETTING.DETAIL.PATH,
  //           component: WarehouseSettingDetail,
  //           isInSidebar: true,
  //         },
  //       ],
  //     },
  //     {
  //       name: ROUTE.DEFINE_WAREHOUSE.LIST.TITLE,
  //       path: ROUTE.DEFINE_WAREHOUSE.LIST.PATH,
  //       component: DefineWarehouse,
  //       isInSidebar: true,
  //       subMenu: [
  //         {
  //           name: ROUTE.DEFINE_WAREHOUSE.CREATE.TITLE,
  //           path: ROUTE.DEFINE_WAREHOUSE.CREATE.PATH,
  //           component: DefineWarehouseFrom,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.DEFINE_WAREHOUSE.DETAIL.TITLE,
  //           path: ROUTE.DEFINE_WAREHOUSE.DETAIL.PATH,
  //           component: DefineWarehouseDetail,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.DEFINE_WAREHOUSE.EDIT.TITLE,
  //           path: ROUTE.DEFINE_WAREHOUSE.EDIT.PATH,
  //           component: DefineWarehouseFrom,
  //           isInSidebar: false,
  //         },
  //       ],
  //     },
  //     {
  //       name: ROUTE.WAREHOUSE_AREA.LIST.TITLE,
  //       path: ROUTE.WAREHOUSE_AREA.LIST.PATH,
  //       component: WarehouseArea,
  //       isInSidebar: true,
  //       subMenu: [
  //         {
  //           name: ROUTE.WAREHOUSE_AREA.DETAIL.TITLE,
  //           path: ROUTE.WAREHOUSE_AREA.DETAIL.PATH,
  //           component: WarehouseAreaDetail,
  //           isInSidebar: false,
  //         },
  //       ],
  //     },
  //     {
  //       name: ROUTE.WAREHOUSE_SHELF.LIST.TITLE,
  //       path: ROUTE.WAREHOUSE_SHELF.LIST.PATH,
  //       component: DefineWarehouseShelf,
  //       isInSidebar: true,
  //       subMenu: [
  //         {
  //           name: ROUTE.WAREHOUSE_SHELF.DETAIL.TITLE,
  //           path: ROUTE.WAREHOUSE_SHELF.DETAIL.PATH,
  //           component: DefineWarehouseShelfDetail,
  //           isInSidebar: false,
  //         },
  //       ],
  //     },
  //     {
  //       name: ROUTE.WAREHOUSE_PALLET.LIST.TITLE,
  //       path: ROUTE.WAREHOUSE_PALLET.LIST.PATH,
  //       component: DefineWarehousePallet,
  //       isInSidebar: true,
  //       subMenu: [
  //         {
  //           name: ROUTE.WAREHOUSE_PALLET.DETAIL.TITLE,
  //           path: ROUTE.WAREHOUSE_PALLET.DETAIL.PATH,
  //           component: DefineWarehousePalletDetail,
  //           isInSidebar: false,
  //         },
  //       ],
  //     },
  //     {
  //       name: ROUTE.ESTABLISH_LOCATION.LIST.TITLE,
  //       path: ROUTE.ESTABLISH_LOCATION.LIST.PATH,
  //       component: EstablishLocation,
  //       isInSidebar: true,
  //       subMenu: [
  //         {
  //           name: ROUTE.ESTABLISH_LOCATION.CREATE.TITLE,
  //           path: ROUTE.ESTABLISH_LOCATION.CREATE.PATH,
  //           component: EstablishLocationForm,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.ESTABLISH_LOCATION.DETAIL.TITLE,
  //           path: ROUTE.ESTABLISH_LOCATION.DETAIL.PATH,
  //           component: EstablishLocationDetail,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.ESTABLISH_LOCATION.EDIT.TITLE,
  //           path: ROUTE.ESTABLISH_LOCATION.EDIT.PATH,
  //           component: EstablishLocationForm,
  //           isInSidebar: false,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   name: ROUTE.WAREHOUSE_IMPORT.LIST.TITLE,
  //   path: ROUTE.WAREHOUSE_IMPORT.LIST.PATH,
  //   component: WarehouseImport,
  //   icon: 'key',
  //   isInSidebar: true,
  //   subMenu: [
  //     {
  //       name: ROUTE.WAREHOUSE_IMPORT.DETAIL.TITLE,
  //       path: ROUTE.WAREHOUSE_IMPORT.DETAIL.PATH,
  //       component: WarehouseImportDetail,
  //       isInSidebar: false,
  //     },
  //   ],
  // },
  // {
  //   name: ROUTE.WAREHOUSE_EXPORT.LIST.TITLE,
  //   path: ROUTE.WAREHOUSE_EXPORT.LIST.PATH,
  //   component: WarehouseExport,
  //   icon: 'export',
  //   isInSidebar: true,
  //   subMenu: [
  //     {
  //       name: ROUTE.WAREHOUSE_EXPORT.DETAIL.TITLE,
  //       path: ROUTE.WAREHOUSE_EXPORT.DETAIL.PATH,
  //       component: WarehouseExportDetail,
  //       isInSidebar: false,
  //     },
  //   ],
  // },
  // {
  //   name: ROUTE.WAREHOUSE_TRANSFER_MOVEMENTS.LIST.TITLE,
  //   path: ROUTE.WAREHOUSE_TRANSFER_MOVEMENTS.LIST.PATH,
  //   component: WarehouseTransferMovements,
  //   icon: 'chevron',
  //   isInSidebar: true,
  //   subMenu: [
  //     {
  //       name: ROUTE.WAREHOUSE_TRANSFER_MOVEMENTS.DETAIL.TITLE,
  //       path: ROUTE.WAREHOUSE_TRANSFER_MOVEMENTS.DETAIL.PATH,
  //       component: WarehouseTransferMovementsDetail,
  //       isInSidebar: false,
  //     },
  //   ],
  // },
  // {
  //   name: ROUTE.WAREHOUSE_REPORT_MANAGEMENT.TITLE,
  //   icon: 'keylock',
  //   isInSidebar: true,
  //   subMenu: [
  //     {
  //       name: ROUTE.WAREHOUSE_REPORT.LIST.TITLE,
  //       path: ROUTE.WAREHOUSE_REPORT.LIST.PATH,
  //       component: WarehouseReport,
  //       isInSidebar: true,
  //       subMenu: [
  //         {
  //           name: ROUTE.WAREHOUSE_REPORT.CREATE.TITLE,
  //           path: ROUTE.WAREHOUSE_REPORT.CREATE.PATH,
  //           component: WarehouseReportForm,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.WAREHOUSE_REPORT.DETAIL.TITLE,
  //           path: ROUTE.WAREHOUSE_REPORT.DETAIL.PATH,
  //           component: WarehouseReportDetail,
  //           isInSidebar: false,
  //         },
  //       ],
  //     },
  //     {
  //       path: ROUTE.INVENTORY_STATISTICS.PATH,
  //       name: ROUTE.INVENTORY_STATISTICS.TITLE,
  //       component: InventoryStatistics,
  //       isInSidebar: true,
  //     },
  //     {
  //       name: ROUTE.INVENTORY.LIST.TITLE,
  //       path: ROUTE.INVENTORY.LIST.PATH,
  //       component: Inventory,
  //       isInSidebar: true,
  //       subMenu: [
  //         {
  //           name: ROUTE.INVENTORY.DETAIL.TITLE,
  //           path: ROUTE.INVENTORY.DETAIL.PATH,
  //           component: InventoryDetail,
  //           isInSidebar: true,
  //         },
  //       ],
  //     },
  //     {
  //       path: ROUTE.INVENTORY_DEADLINE_WARNING.PATH,
  //       name: ROUTE.INVENTORY_DEADLINE_WARNING.TITLE,
  //       component: InventoryDeadlineWarning,
  //       isInSidebar: true,
  //     },
  //     {
  //       path: ROUTE.INVENTORY_WARNING.PATH,
  //       name: ROUTE.INVENTORY_WARNING.TITLE,
  //       component: InventoryWarning,
  //       isInSidebar: true,
  //     },
  //     {
  //       name: ROUTE.WAREHOUSE_SPACE_REPORT.TITLE,
  //       path: ROUTE.WAREHOUSE_SPACE_REPORT.PATH,
  //       component: WarehouseSpaceReport,
  //       isInSidebar: true,
  //     },
  //     {
  //       name: ROUTE.LOCK_ITEM_LOCATION.LIST.TITLE,
  //       path: ROUTE.LOCK_ITEM_LOCATION.LIST.PATH,
  //       component: LockItemLocation,
  //       isInSidebar: true,
  //       subMenu: [
  //         {
  //           name: ROUTE.LOCK_ITEM_LOCATION.CREATE.TITLE,
  //           path: ROUTE.LOCK_ITEM_LOCATION.CREATE.PATH,
  //           component: LockItemLocaionForm,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.LOCK_ITEM_LOCATION.DETAIL_ITEM.TITLE,
  //           path: ROUTE.LOCK_ITEM_LOCATION.DETAIL_ITEM.PATH,
  //           component: LockItemDetail,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.LOCK_ITEM_LOCATION.DETAIL_LOCATION.TITLE,
  //           path: ROUTE.LOCK_ITEM_LOCATION.DETAIL_LOCATION.PATH,
  //           component: LockLocationDetail,
  //           isInSidebar: false,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   name: ROUTE.RENT_WAREHOUSE_COST_MANAGEMENT.TITLE,
  //   isInSidebar: true,
  //   icon: 'database',
  //   subMenu: [
  //     {
  //       name: ROUTE.TYPE_SERVICE.LIST.TITLE,
  //       path: ROUTE.TYPE_SERVICE.LIST.PATH,
  //       component: DefineTypeService,
  //       isInSidebar: true,
  //       subMenu: [
  //         {
  //           name: ROUTE.TYPE_SERVICE.CREATE.TITLE,
  //           path: ROUTE.TYPE_SERVICE.CREATE.PATH,
  //           component: DefineTypeServiceForm,
  //           isInSidebar: true,
  //         },
  //         {
  //           name: ROUTE.TYPE_SERVICE.EDIT.TITLE,
  //           path: ROUTE.TYPE_SERVICE.EDIT.PATH,
  //           component: DefineTypeServiceForm,
  //           isInSidebar: true,
  //         },
  //         {
  //           name: ROUTE.TYPE_SERVICE.DETAILS.TITLE,
  //           path: ROUTE.TYPE_SERVICE.DETAILS.PATH,
  //           component: DefineTypeServiceDetail,
  //           isInSidebar: true,
  //         },
  //       ],
  //     },
  //     {
  //       name: ROUTE.TYPE_UNIT.LIST.TITLE,
  //       path: ROUTE.TYPE_UNIT.LIST.PATH,
  //       component: DefineTypeUnit,
  //       isInSidebar: true,
  //       subMenu: [
  //         {
  //           name: ROUTE.TYPE_UNIT.CREATE.TITLE,
  //           path: ROUTE.TYPE_UNIT.CREATE.PATH,
  //           component: DefineTypeUnitForm,
  //           isInSidebar: true,
  //         },
  //         {
  //           name: ROUTE.TYPE_UNIT.EDIT.TITLE,
  //           path: ROUTE.TYPE_UNIT.EDIT.PATH,
  //           component: DefineTypeUnitForm,
  //           isInSidebar: true,
  //         },
  //         {
  //           name: ROUTE.TYPE_UNIT.DETAIL.TITLE,
  //           path: ROUTE.TYPE_UNIT.DETAIL.PATH,
  //           component: DefineTypeUnitDetail,
  //           isInSidebar: true,
  //         },
  //       ],
  //     },
  //     {
  //       name: ROUTE.DEFINE_CURRENCY_UNIT.LIST.TITLE,
  //       path: ROUTE.DEFINE_CURRENCY_UNIT.LIST.PATH,
  //       component: DefineCurrencyUnit,
  //       isInSidebar: true,
  //       subMenu: [
  //         {
  //           name: ROUTE.DEFINE_CURRENCY_UNIT.CREATE.TITLE,
  //           path: ROUTE.DEFINE_CURRENCY_UNIT.CREATE.PATH,
  //           component: DefineCurrencyUnitForm,
  //           isInSidebar: true,
  //         },
  //         {
  //           name: ROUTE.DEFINE_CURRENCY_UNIT.EDIT.TITLE,
  //           path: ROUTE.DEFINE_CURRENCY_UNIT.EDIT.PATH,
  //           component: DefineCurrencyUnitForm,
  //           isInSidebar: true,
  //         },
  //         {
  //           name: ROUTE.DEFINE_CURRENCY_UNIT.DETAIL.TITLE,
  //           path: ROUTE.DEFINE_CURRENCY_UNIT.DETAIL.PATH,
  //           component: DefineCurrencyUnitDetail,
  //           isInSidebar: true,
  //         },
  //       ],
  //     },
  //     {
  //       name: ROUTE.DEFINE_SERVICE.LIST.TITLE,
  //       path: ROUTE.DEFINE_SERVICE.LIST.PATH,
  //       component: DefineService,
  //       isInSidebar: true,
  //       subMenu: [
  //         {
  //           name: ROUTE.DEFINE_SERVICE.CREATE.TITLE,
  //           path: ROUTE.DEFINE_SERVICE.CREATE.PATH,
  //           component: DefineServiceForm,
  //           isInSidebar: true,
  //         },
  //         {
  //           name: ROUTE.DEFINE_SERVICE.EDIT.TITLE,
  //           path: ROUTE.DEFINE_SERVICE.EDIT.PATH,
  //           component: DefineServiceForm,
  //           isInSidebar: true,
  //         },
  //         {
  //           name: ROUTE.DEFINE_SERVICE.DETAIL.TITLE,
  //           path: ROUTE.DEFINE_SERVICE.DETAIL.PATH,
  //           component: DefineServiceDetail,
  //           isInSidebar: true,
  //         },
  //       ],
  //     },
  //     {
  //       name: ROUTE.DEFINE_VOUCHER.LIST.TITLE,
  //       path: ROUTE.DEFINE_VOUCHER.LIST.PATH,
  //       component: DefineVoucher,
  //       isInSidebar: true,
  //       subMenu: [
  //         {
  //           name: ROUTE.DEFINE_VOUCHER.CREATE.TITLE,
  //           path: ROUTE.DEFINE_VOUCHER.CREATE.PATH,
  //           component: DefineVoucherForm,
  //           isInSidebar: true,
  //         },
  //         {
  //           name: ROUTE.DEFINE_VOUCHER.EDIT.TITLE,
  //           path: ROUTE.DEFINE_VOUCHER.EDIT.PATH,
  //           component: DefineVoucherForm,
  //           isInSidebar: true,
  //         },
  //         {
  //           name: ROUTE.DEFINE_VOUCHER.DETAIL.TITLE,
  //           path: ROUTE.DEFINE_VOUCHER.DETAIL.PATH,
  //           component: DefineVoucherDetail,
  //           isInSidebar: true,
  //         },
  //       ],
  //     },
  //     {
  //       name: ROUTE.DEFINE_CUSTOMER_LEVEL.LIST.TITLE,
  //       path: ROUTE.DEFINE_CUSTOMER_LEVEL.LIST.PATH,
  //       component: DefineCustomerLevel,
  //       isInSidebar: true,
  //       subMenu: [
  //         {
  //           name: ROUTE.DEFINE_CUSTOMER_LEVEL.CREATE.TITLE,
  //           path: ROUTE.DEFINE_CUSTOMER_LEVEL.CREATE.PATH,
  //           component: DefineCustomerLevelForm,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.DEFINE_CUSTOMER_LEVEL.DETAIL.TITLE,
  //           path: ROUTE.DEFINE_CUSTOMER_LEVEL.DETAIL.PATH,
  //           component: DefineCustomerLevelDetail,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.DEFINE_CUSTOMER_LEVEL.EDIT.TITLE,
  //           path: ROUTE.DEFINE_CUSTOMER_LEVEL.EDIT.PATH,
  //           component: DefineCustomerLevelForm,
  //           isInSidebar: false,
  //         },
  //       ],
  //     },
  //     {
  //       name: ROUTE.DEFINE_PAYMENT_TYPE.LIST.TITLE,
  //       path: ROUTE.DEFINE_PAYMENT_TYPE.LIST.PATH,
  //       component: DefinePaymentType,
  //       isInSidebar: true,
  //       subMenu: [
  //         {
  //           name: ROUTE.DEFINE_PAYMENT_TYPE.CREATE.TITLE,
  //           path: ROUTE.DEFINE_PAYMENT_TYPE.CREATE.PATH,
  //           component: DefinePaymentTypeForm,
  //           isInSidebar: true,
  //         },
  //         {
  //           name: ROUTE.DEFINE_PAYMENT_TYPE.EDIT.TITLE,
  //           path: ROUTE.DEFINE_PAYMENT_TYPE.EDIT.PATH,
  //           component: DefinePaymentTypeForm,
  //           isInSidebar: true,
  //         },
  //         {
  //           name: ROUTE.DEFINE_PAYMENT_TYPE.DETAIL.TITLE,
  //           path: ROUTE.DEFINE_PAYMENT_TYPE.DETAIL.PATH,
  //           component: DefinePaymentTypeDetail,
  //         },
  //       ],
  //     },
  //     {
  //       name: ROUTE.INVOICE_TYPE.LIST.TITLE,
  //       path: ROUTE.INVOICE_TYPE.LIST.PATH,
  //       component: InvoiceType,
  //       isInSidebar: true,
  //       subMenu: [
  //         {
  //           name: ROUTE.INVOICE_TYPE.CREATE.TITLE,
  //           path: ROUTE.INVOICE_TYPE.CREATE.PATH,
  //           component: InvoiceTypeForm,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.INVOICE_TYPE.EDIT.TITLE,
  //           path: ROUTE.INVOICE_TYPE.EDIT.PATH,
  //           component: InvoiceTypeForm,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.INVOICE_TYPE.DETAIL.TITLE,
  //           path: ROUTE.INVOICE_TYPE.DETAIL.PATH,
  //           component: InvoiceTypeDetail,
  //           isInSidebar: false,
  //         },
  //       ],
  //     },
  //     {
  //       name: ROUTE.DEFINE_BILL.LIST.TITLE,
  //       path: ROUTE.DEFINE_BILL.LIST.PATH,
  //       component: DefineBill,
  //       isInSidebar: true,
  //       subMenu: [
  //         {
  //           name: ROUTE.DEFINE_BILL.CREATE.TITLE,
  //           path: ROUTE.DEFINE_BILL.CREATE.PATH,
  //           component: DefineBillForm,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.DEFINE_BILL.EDIT.TITLE,
  //           path: ROUTE.DEFINE_BILL.EDIT.PATH,
  //           component: DefineBillForm,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.DEFINE_BILL.DETAIL.TITLE,
  //           path: ROUTE.DEFINE_BILL.DETAIL.PATH,
  //           component: DefineBillDetail,
  //           isInSidebar: false,
  //         },
  //       ],
  //     },
  //     {
  //       name: ROUTE.RENT_WAREHOUSE_DASHBOARD.LIST.TITLE,
  //       path: ROUTE.RENT_WAREHOUSE_DASHBOARD.LIST.PATH,
  //       component: RentWarehouseDashboard,
  //       isInSidebar: true,
  //     },
  //   ],
  // },

  // {
  //   name: ROUTE.SETTING.TITLE,
  //   icon: 'setting',
  //   isInSidebar: true,
  //   subMenu: [
  //     {
  //       name: ROUTE.INVENTORY_LIMIT.LIST.TITLE,
  //       path: ROUTE.INVENTORY_LIMIT.LIST.PATH,
  //       component: InventoryLimit,
  //       isInSidebar: true,
  //       subMenu: [
  //         {
  //           name: ROUTE.INVENTORY_LIMIT.CREATE.TITLE,
  //           path: ROUTE.INVENTORY_LIMIT.CREATE.PATH,
  //           component: InventoryLimitForm,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.INVENTORY_LIMIT.EDIT.TITLE,
  //           path: ROUTE.INVENTORY_LIMIT.EDIT.PATH,
  //           component: InventoryLimitForm,
  //           isInSidebar: false,
  //         },
  //         {
  //           name: ROUTE.INVENTORY_LIMIT.DETAIL.TITLE,
  //           path: ROUTE.INVENTORY_LIMIT.DETAIL.PATH,
  //           component: InventoryLimitDetail,
  //           isInSidebar: false,
  //         },
  //       ],
  //     },
  //   ],
  // },
]

export default routes
