import { combineReducers } from 'redux'

import defineDetail from './define-detail'
import defineWarehouse from './define-warehouse'
import inventoryDeadlineWarning from './inventory-deadline-warning'
import inventoryLimitSetting from './inventory-limit'
import inventoryStatistics from './inventory-statistics'
import inventoryWarning from './inventory-warning'
import warehouseReport from './warehouse-report'
import warehouseSetting from './warehouse-setting'
import warehouseTransferMovements from './warehouse-transfer-movements'

export default combineReducers({
  warehouseSetting,
  defineDetail,
  defineWarehouse,
  inventoryDeadlineWarning,
  inventoryWarning,
  warehouseReport,
  warehouseTransferMovements,
  inventoryLimitSetting,
  inventoryStatistics,
})
