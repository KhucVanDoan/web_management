import { combineReducers } from 'redux'

import commonManagement from './common'
import defineBlock from './define-block'
import defineCurrencyUnit from './define-currency-unit'
import defineCustomer from './define-customer'
import defineCustomerLevel from './define-customer-level'
import defineDetail from './define-detail'
import definePackage from './define-package'
import defineTemplateShelf from './define-template-shelf'
import defineTypeUnit from './define-type-unit'
import defineVendor from './define-vendor'
import defineWarehouse from './define-warehouse'
import importManufacturingOrder from './import-manufacturing-order'
import inventory from './inventory'
import inventoryCalendar from './inventory-calendar'
import inventoryDeadlineWarning from './inventory-deadline-warning'
import inventoryLimitSetting from './inventory-limit'
import inventoryStatistics from './inventory-statistics'
import inventoryWarning from './inventory-warning'
import movementManagement from './movements'
import productionOrder from './production-order'
import rentWarehouseDashboard from './rent-warehouse-dashboard'
import voucher from './voucher'
import warehouseArea from './warehouse-area'
import warehouseExport from './warehouse-export'
import warehouseImport from './warehouse-import'
import warehouseReport from './warehouse-report'
import warehouseSetting from './warehouse-setting'
import defineWarehouseTransfer from './warehouse-transfer'
import warehouseTransferMovements from './warehouse-transfer-movements'
export default combineReducers({
  commonManagement,
  defineTemplateShelf,
  defineTypeUnit,
  defineCurrencyUnit,
  warehouseSetting,
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
  warehouseArea,
  importManufacturingOrder,
  defineBlock,
  productionOrder,
  definePackage,
  defineCustomerLevel,
  rentWarehouseDashboard,
  voucher,
})
