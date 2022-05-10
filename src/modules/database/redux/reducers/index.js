import { combineReducers } from 'redux'

import defineCompany from './define-company'
import defineItem from './define-item'
import defineFactory from './factory'
import itemGroupSetting from './item-group-setting'
import itemTypeSetting from './item-type-setting'
import itemUnitSetting from './item-unit-setting'
import defineSaleOrder from './sale-order'
export default combineReducers({
  itemGroupSetting,
  defineCompany,
  defineItem,
  defineFactory,
  itemTypeSetting,
  itemUnitSetting,
  defineSaleOrder,
})
