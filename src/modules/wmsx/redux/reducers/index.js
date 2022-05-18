import { combineReducers } from 'redux'

import defineCustomer from './define-customer'
import defineDetail from './define-detail'
import definePackage from './define-package'
import defineTemplateShelf from './define-template-shelf'
import defineVendor from './define-vendor'
import defineWarehouse from './define-warehouse'
import inventory from './inventory'
import inventoryCalendar from './inventory-calendar'
import inventoryDeadlineWarning from './inventory-deadline-warning'
import inventoryLimitSetting from './inventory-limit'
import inventoryStatistics from './inventory-statistics'
import inventoryWarning from './inventory-warning'
import movementManagement from './movements'
import productionOrder from './production-order'
import warehouseExport from './warehouse-export'
import warehouseImport from './warehouse-import'
import warehouseReport from './warehouse-report'
import warehouseSetting from './warehouse-setting'
import warehouseTransferMovements from './warehouse-transfer-movements'

export default combineReducers({
  defineTemplateShelf,
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
  defineCustomer,
  inventoryCalendar,
  productionOrder,
  definePackage,
})
