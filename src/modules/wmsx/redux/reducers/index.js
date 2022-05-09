import { combineReducers } from 'redux'

import defineDetail from './define-detail'
import defineWarehouse from './define-warehouse'
import warehouseSetting from './warehouse-setting'
import warehouseTransferMovements from './warehouse-transfer-movements'

export default combineReducers({
  warehouseSetting,
  defineDetail,
  defineWarehouse,
  warehouseTransferMovements,
})
