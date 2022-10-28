import { combineReducers } from 'redux'

import businessTypeManagement from './business-type-management'
import companyManagement from './company-management'
import constructionItemsManagement from './construction-items-management'
import constructionManagement from './construction-management'
import dashboard from './dashboard'
import dataSyncManagement from './data-sync-management'
import defineAssembly from './define-assembly'
import defineBin from './define-bin'
import defineDrawer from './define-drawer'
import defineExpenditureOrg from './define-expenditure-org'
import defineExpenditureType from './define-expenditure-type'
import defineMaterialCategory from './define-material-category'
import defineMaterialQuality from './define-material-quality'
import defineObjectCategory from './define-object-category'
import defineProducingCountry from './define-producing-country'
import defineShelf from './define-shelf'
import defineUom from './define-uom'
import defineVendor from './define-vendor'
import defineWarehouse from './define-warehouse'
import defineWarehouseGroup from './define-warehouse-group'
import inventoryAdjust from './inventory-adjust'
import inventoryCalendar from './inventory-calendar'
import inventorySetting from './inventory-setting'
import inventoryStatistics from './inventory-statistics'
import inventoryWarning from './inventory-warning'
import locationManagement from './location-management'
import managementUnit from './management-unit'
import materialManagement from './material-management'
import movementManagement from './movements'
import qrCode from './qr-code'
import reasonManagement from './reason-management'
import receiptDepartmentManagement from './receipt-department-management'
import receiptManagement from './receipt-management'
import reportExport from './report-export'
import roleList from './role-list'
import setStoragePeriod from './set-storage-period'
import signatureConfiguration from './signature-configuration'
import sourceManagement from './source-management'
import warehouseExport from './warehouse-export'
import warehouseExportProposal from './warehouse-export-proposal'
import warehouseExportReceipt from './warehouse-export-receipt'
import warehouseImport from './warehouse-import'
import warehouseImportReceipt from './warehouse-import-receipt'
import warehouseTransfer from './warehouse-transfer'
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
  defineMaterialCategory,
  receiptDepartmentManagement,
  defineProducingCountry,
  defineWarehouse,
  inventorySetting,
  locationManagement,
  defineWarehouseGroup,
  defineShelf,
  defineAssembly,
  defineBin,
  defineDrawer,
  defineExpenditureOrg,
  defineExpenditureType,
  setStoragePeriod,
  materialManagement,
  qrCode,
  warehouseExportReceipt,
  warehouseImport,
  warehouseExport,
  movementManagement,
  inventoryStatistics,
  inventoryWarning,
  warehouseExportProposal,
  signatureConfiguration,
  receiptManagement,
  reportExport,
  inventoryCalendar,
  warehouseImportReceipt,
  warehouseTransfer,
  roleList,
  dataSyncManagement,
  inventoryAdjust,
})
