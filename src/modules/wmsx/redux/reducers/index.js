import { combineReducers } from 'redux'

import defineDetail from './define-detail'
import warehouseSetting from './warehouse-setting'

export default combineReducers({
  warehouseSetting,
  defineDetail,
})
