import { combineReducers } from 'redux'

import businessTypeManagement from './business-type-management'
import companyManagement from './company-management'
import constructionItemsManagement from './construction-items-management'
import constructionManagement from './construction-management'
import dashboard from './dashboard'
import defineAssembly from './define-assembly'
import defineBin from './define-bin'
import defineDrawer from './define-drawer'
import defineExpenditureOrg from './define-expenditure-org'
import defineExpenditureType from './define-expenditure-type'
import defineMaterialQuality from './define-material-quality'
import defineObjectCategory from './define-object-category'
import defineProducingCountry from './define-producing-country'
import defineUom from './define-uom'
import defineVendor from './define-vendor'
import defineWarehouse from './define-warehouse'
import managementUnit from './management-unit'
import reasonManagement from './reason-management'
import receiptDepartmentManagement from './receipt-department-management'
import sourceManagement from './source-management'

export default combineReducers({
  dashboard,
  defineVendor,
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
  receiptDepartmentManagement,
  defineProducingCountry,
  defineWarehouse,
  defineAssembly,
  defineBin,
  defineDrawer,
  defineExpenditureOrg,
  defineExpenditureType,
})
