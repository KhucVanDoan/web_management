import { combineReducers } from 'redux'

import defineDetail from './define-detail'
import defineWarehouse from './define-warehouse'
import warehouseSetting from './warehouse-setting'

export default combineReducers({
  warehouseSetting,
  defineDetail,
  defineWarehouse,
})
