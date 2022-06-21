import { combineReducers } from 'redux'

import commonManagement from './common'
import dashboard from './dashboard'
import bill from './define-bill'
import defineBlock from './define-block'
import defineCurrencyUnit from './define-currency-unit'
import defineCustomer from './define-customer'
import defineCustomerLevel from './define-customer-level'
import defineDetail from './define-detail'
import definePackage from './define-package'
import definePaymentType from './define-payment-type'
import defineService from './define-service'
import templateSector from './define-template-sector'
import defineTemplateShelf from './define-template-shelf'
import defineTypeService from './define-type-service'
import defineTypeUnit from './define-type-unit'
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
import movementManagement from './movements'
import productionOrder from './production-order'
import purchasedOrdersImport from './purchased-orders-import'
import rentWarehouseDashboard from './rent-warehouse-dashboard'
import soExport from './so-export'
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
})
