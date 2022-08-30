import { combineReducers } from 'redux'

import blockItemLocation from './block-item-location'
import businessTypeManagement from './business-type-management'
import commonManagement from './common'
import companyManagement from './company-management'
import constructionItemsManagement from './construction-items-management'
import constructionManagement from './construction-management'
import dashboard from './dashboard'
import bill from './define-bill'
import defineBlock from './define-block'
import defineCurrencyUnit from './define-currency-unit'
import defineCustomer from './define-customer'
import defineCustomerLevel from './define-customer-level'
import defineDetail from './define-detail'
import defineMaterialQuality from './define-material-quality'
import defineObjectCategory from './define-object-category'
import definePackage from './define-package'
import definePallet from './define-pallet'
import definePaymentType from './define-payment-type'
import defineService from './define-service'
import templateSector from './define-template-sector'
import defineTemplateShelf from './define-template-shelf'
import defineTypeService from './define-type-service'
import defineTypeUnit from './define-type-unit'
import defineUom from './define-uom'
import defineVendor from './define-vendor'
import defineWarehouse from './define-warehouse'
import defineWarehousePallet from './define-warehouse-pallet'
import defineWarehouseShelf from './define-warehouse-shelf'
import importManufacturingOrder from './import-manufacturing-order'
import inventory from './inventory'
import inventoryCalendar from './inventory-calendar'
import inventoryDeadlineWarning from './inventory-deadline-warning'
import inventoryLimitSetting from './inventory-limit'
import inventoryStatistics from './inventory-statistics'
import inventoryWarning from './inventory-warning'
import invoiceType from './invoice-type'
import locationSetting from './location-setting'
import managementUnit from './management-unit'
import movementManagement from './movements'
import productionOrder from './production-order'
import purchasedOrdersImport from './purchased-orders-import'
import reasonManagement from './reason-management'
import rentWarehouseDashboard from './rent-warehouse-dashboard'
import returnOrder from './return-order'
import soExport from './so-export'
import sourceManagement from './source-management'
import templateSectorTemplateShelf from './template-sector-template-shelf'
import voucher from './voucher'
import warehouseArea from './warehouse-area'
import warehouseDesign from './warehouse-design'
import warehouseExport from './warehouse-export'
import warehouseImport from './warehouse-import'
import warehouseReport from './warehouse-report'
import warehouseSetting from './warehouse-setting'
import warehouseSpaceReport from './warehouse-space-report'
import defineWarehouseTransfer from './warehouse-transfer'
import warehouseTransferMovements from './warehouse-transfer-movements'
export default combineReducers({
  commonManagement,
  dashboard,
  defineTemplateShelf,
  defineTypeUnit,
  defineCurrencyUnit,
  defineService,
  definePallet,
  warehouseSetting,
  templateSector,
  defineDetail,
  defineWarehouse,
  inventoryDeadlineWarning,
  inventoryWarning,
  warehouseReport,
  warehouseTransferMovements,
  inventory,
  defineVendor,
  inventoryLimitSetting,
  warehouseExport,
  warehouseImport,
  movementManagement,
  inventoryStatistics,
  defineWarehouseTransfer,
  defineCustomer,
  inventoryCalendar,
  purchasedOrdersImport,
  warehouseSpaceReport,
  warehouseArea,
  importManufacturingOrder,
  defineBlock,
  productionOrder,
  definePackage,
  defineWarehouseShelf,
  defineCustomerLevel,
  rentWarehouseDashboard,
  voucher,
  templateSectorTemplateShelf,
  defineWarehousePallet,
  definePaymentType,
  defineTypeService,
  invoiceType,
  bill,
  soExport,
  warehouseDesign,
  locationSetting,
  blockItemLocation,
  returnOrder,
  managementUnit,
  companyManagement,
  constructionManagement,
  constructionItemsManagement,
  businessTypeManagement,
  sourceManagement,
  defineObjectCategory,
  reasonManagement,
  defineUom,
  defineMaterialQuality,
})
