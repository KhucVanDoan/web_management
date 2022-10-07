import { all } from 'redux-saga/effects'

import watchConfirmBussinessType from './business-type-management/confirm-business-type'
import watchCreateBussinessType from './business-type-management/create-business-type'
import watchDeleteBussinessType from './business-type-management/delete-business-type'
import watchGetBussinessTypeDetails from './business-type-management/get-business-type-details'
import watchRejectBussinessType from './business-type-management/reject-business-type'
import watchSearchBussinessTypes from './business-type-management/search-business-types'
import watchUpdateBussinessType from './business-type-management/update-business-type'
import watchConfirmCompany from './company-management/confirm-company'
import watchCreateCompany from './company-management/create-company'
import watchDeleteCompany from './company-management/delete-company'
import watchGetCompanies from './company-management/get-companies'
import watchGetCompanyDetails from './company-management/get-company-details'
import watchRejectCompany from './company-management/reject-company'
import watchSearchCompanies from './company-management/search-companies'
import watchUpdateCompany from './company-management/update-company'
import watchConfirmConstructionItems from './construction-items-management/confirm-construction-items'
import watchCreateConstructionItems from './construction-items-management/create-construction-items'
import watchDeleteConstructionItems from './construction-items-management/delete-construction-items'
import watchGetConstructionItemsDetails from './construction-items-management/get-construction-items-details'
import watchRejectConstructionItems from './construction-items-management/reject-construction-items'
import watchSearchConstructionItems from './construction-items-management/search-construction-items'
import watchUpdateConstructionItems from './construction-items-management/update-construction-items'
import watchConfirmConstruction from './construction-management/confirm-construction'
import watchCreateConstruction from './construction-management/create-construction'
import watchDeleteConstruction from './construction-management/delete-construction'
import watchGetConstructionDetails from './construction-management/get-construction-details'
import watchRejectConstruction from './construction-management/reject-construction'
import watchSearchConstructions from './construction-management/search-constructions'
import watchUpdateConstruction from './construction-management/update-construction'
import watchDashboard from './dashboard'
import watchConfirmAssembly from './define-assembly/confirm-assembly'
import watchCreateAssembly from './define-assembly/create-assembly'
import watchDeleteAssembly from './define-assembly/delete-assembly'
import watchGetAssemblyDetails from './define-assembly/get-assembly-details'
import watchRejectAssembly from './define-assembly/reject-assembly'
import watchSearchAssembly from './define-assembly/search-assembly'
import watchUpdateAssembly from './define-assembly/update-assembly'
import watchConfirmBin from './define-bin/confirm-bin'
import watchCreateBin from './define-bin/create-bin'
import watchDeleteBin from './define-bin/delete-bin'
import watchGetBinDetails from './define-bin/get-bin-details'
import watchRejectBin from './define-bin/reject-bin'
import watchSearchBin from './define-bin/search-bin'
import watchUpdateBin from './define-bin/update-bin'
import watchConfirmDrawer from './define-drawer/confirm-drawer'
import watchCreateDrawer from './define-drawer/create-drawer'
import watchDeleteDrawer from './define-drawer/delete-drawer'
import watchGetDrawerDetails from './define-drawer/get-drawer-details'
import watchRejectDrawer from './define-drawer/reject-drawer'
import watchSearchDrawer from './define-drawer/search-drawer'
import watchUpdateDrawer from './define-drawer/update-drawer'
import watchConfirmExpenditureOrg from './define-expenditure-org/confirm-expenditure-org'
import watchCreateExpenditureOrg from './define-expenditure-org/create-expenditure-org'
import watchDeleteExpenditureOrg from './define-expenditure-org/delete-expenditure-org'
import watchGetExpenditureOrgDetails from './define-expenditure-org/get-expenditure-org-details'
import watchRejectExpenditureOrg from './define-expenditure-org/reject-expenditure-org'
import watchSearchExpenditureOrg from './define-expenditure-org/search-expenditure-org'
import watchUpdateExpenditureOrg from './define-expenditure-org/update-expenditure-org'
import watchConfirmExpenditureType from './define-expenditure-type/confirm-expenditure-type'
import watchCreateExpenditureType from './define-expenditure-type/create-expenditure-type'
import watchDeleteExpenditureType from './define-expenditure-type/delete-expenditure-type'
import watchGetExpenditureTypeDetails from './define-expenditure-type/get-expenditure-type-details'
import watchRejectExpenditureType from './define-expenditure-type/reject-expenditure-type'
import watchSearchExpenditureType from './define-expenditure-type/search-expenditure-type'
import watchUpdateExpenditureType from './define-expenditure-type/update-expenditure-type'
import watchConfirmMaterialCategory from './define-material-category/confirm-material-category'
import watchCreateMaterialCategory from './define-material-category/create-material-category'
import watchDeleteMaterialCategory from './define-material-category/delete-material-category'
import watchGetMaterialCategoryDetails from './define-material-category/get-material-category-details'
import watchGetMaterialChildDetails from './define-material-category/get-material-child-details'
import watchRejectMaterialCategory from './define-material-category/reject-material-category'
import watchSearchMaterialCategory from './define-material-category/search-material-category'
import watchUpdateMaterialCategory from './define-material-category/update-material-category'
import watchConfirmMaterialQuality from './define-material-quality/confirm-material-quality'
import watchCreateMaterialQuality from './define-material-quality/create-material-quality'
import watchDeleteMaterialQuality from './define-material-quality/delete-material-quality'
import watchGetMaterialQualityDetails from './define-material-quality/get-material-quality-details'
import watchRejectMaterialQuality from './define-material-quality/reject-material-quality'
import watchSearchMaterialQuality from './define-material-quality/search-material-quality'
import watchUpdateMaterialQuality from './define-material-quality/update-material-quality'
import watchConfirmObjectCategory from './define-object-category/confirm-object-category'
import watchCreateObjectCategory from './define-object-category/create-object-category'
import watchDeleteObjectCategory from './define-object-category/delete-object-category'
import watchGetObjectCategoryDetails from './define-object-category/get-object-category-details'
import watchRejectObjectCategory from './define-object-category/reject-object-category'
import watchSearchObjectCategory from './define-object-category/search-object-category'
import watchUpdateObjectCategory from './define-object-category/update-object-category'
import watchConfirmProducingCountry from './define-producing-country/confirm-producing-country'
import watchCreateProducingCountry from './define-producing-country/create-producing-country'
import watchDeleteProducingCountry from './define-producing-country/delete-producing-country'
import watchGetProducingCountryDetails from './define-producing-country/get-producing-country-details'
import watchRejectProducingCountry from './define-producing-country/reject-producing-country'
import watchSearchProducingCountry from './define-producing-country/search-producing-country'
import watchUpdateProducingCountry from './define-producing-country/update-producing-country'
import watchConfirmShelf from './define-shelf/confirm-shelf'
import watchCreateShelf from './define-shelf/create-shelf'
import watchDeleteShelf from './define-shelf/delete-shelf'
import watchGetShelfDetails from './define-shelf/get-shelf-details'
import watchRejectShelf from './define-shelf/reject-shelf'
import watchSearchShelf from './define-shelf/search-shelf'
import watchUpdateShelf from './define-shelf/update-shelf'
import watchConfirmUom from './define-uom/confirm-uom'
import watchCreateUom from './define-uom/create-uom'
import watchDeleteUom from './define-uom/delete-uom'
import watchGetUomDetails from './define-uom/get-uom-details'
import watchRejectUom from './define-uom/reject-uom'
import watchSearchUoms from './define-uom/search-uom'
import watchUpdateUom from './define-uom/update-uom'
import watchConfirmVendor from './define-vendor/confirm-vendor'
import watchCreateVendor from './define-vendor/create-vendor'
import watchDeleteVendor from './define-vendor/delete-vendor'
import watchGetVendorDetails from './define-vendor/get-vendor-details'
import watchImportVendor from './define-vendor/import-vendor'
import watchRejectVendor from './define-vendor/reject-vendor'
import watchSearchVendors from './define-vendor/search-vendors'
import watchUpdateVendor from './define-vendor/updata-vendor'
import watchConfirmWarehouseGroup from './define-warehouse-group/confirm-warehouse-group'
import watchCreateWarehouseGroup from './define-warehouse-group/create-warehouse-group'
import watchDeleteWarehouseGroup from './define-warehouse-group/delete-warehouse-group'
import watchGetWarehouseGroupDetails from './define-warehouse-group/get-warehouse-group-details'
import watchRejectWarehouseGroup from './define-warehouse-group/reject-warehouse-group'
import watchSearchWarehouseGroup from './define-warehouse-group/search-warehouse-group'
import watchUpdateWarehouseGroup from './define-warehouse-group/update-warehouse-group'
import watchConfirmWarehouse from './define-warehouse/confirm-warehouse'
import watchCreateWarehouse from './define-warehouse/create-warehouse'
import watchDeleteWarehouse from './define-warehouse/delete-warehouse'
import watchGetWarehouseDetails from './define-warehouse/get-warehouse-details'
import watchRejectWarehouse from './define-warehouse/reject-warehouse'
import watchSearchWarehouse from './define-warehouse/search-warehouse'
import watchUpdateWarehouse from './define-warehouse/update-warehouse'
import watchApproveInventoryCalendar from './inventory-calendar/approve-inventory-calendar'
import watchCheckItemNotExecuted from './inventory-calendar/check-items-not-executed'
import watchConfirmInventoryCalendar from './inventory-calendar/confirm-inventory-calendar'
import watchCreateInventoryCalendar from './inventory-calendar/create-inventory-calendar'
import watchDeleteInventoryCalendar from './inventory-calendar/delete-inventory-calendar'
import watchGetInventoryCalendarDetails from './inventory-calendar/get-inventory-calendar-details'
import watchGetItem from './inventory-calendar/get-item-detail'
import watchGetItemDetailRecipt from './inventory-calendar/get-item-detail-recipt'
import watchRejectInventoryCalendar from './inventory-calendar/reject-inventory-calendar'
import watchSearchInventoryCalendars from './inventory-calendar/search-inventory-calendars'
import watchUpdateInventoryCalendar from './inventory-calendar/update-inventory-calendar'
import watchCreateInventorySetting from './inventory-setting/create-inventory-setting'
import watchDeleteInventorySetting from './inventory-setting/delete-inventory-setting'
import watchGetDetailInventorySetting from './inventory-setting/get-inventory-setting-detail'
import watchSearchInventorySetting from './inventory-setting/search-inventory-setting'
import watchUpdateInventorySetting from './inventory-setting/update-inventory-setting'
import watchSearchInventoryStatistics from './inventory-statistics/search-inventory-statistics'
import watchSearchInventoryWarning from './inventory-warning/search-inventory-warning'
import watchConfirmLocation from './location-management/confirm-location'
import watchCreateLocation from './location-management/create-location'
import watchDeleteLocation from './location-management/delete-location'
import watchGetItemByLocationId from './location-management/get-item-by-location-id'
import watchGetLocationDetails from './location-management/get-location-details'
import watchRejectLocation from './location-management/reject-location'
import watchSearchLocations from './location-management/search-locations'
import watchUpdateLocation from './location-management/update-location'
import watchConfirmUnitManagement from './management-unit/confirm'
import watchCreateManagementUnit from './management-unit/create'
import watchDeleteManagementUnit from './management-unit/delete'
import watchGetDetailManagementUnit from './management-unit/get-detail'
import watchRejectUnitManagement from './management-unit/reject'
import watchSearchManagementUnit from './management-unit/search'
import watchUpdateUnitManagement from './management-unit/update'
import watchConfirmMaterial from './material-management/confirm-material'
import watchCreateMaterial from './material-management/create-material'
import watchDeleteMaterial from './material-management/delete-material'
import watchGetMaterialDetails from './material-management/get-material-details'
import watchRejectMaterial from './material-management/reject-material'
import watchSearchMaterials from './material-management/search-materials'
import watchUpdateMaterial from './material-management/update-material'
import watchUpdateWarehouseSource from './material-management/update-warehouse-source'
import watchGetMovementsDetails from './movements/get-movement-details.'
import watchSearchMovements from './movements/search-movements'
import watchGetQrCodeDetails from './qr-code/get-qr-code-details'
import watchUpdateQrCode from './qr-code/update-qr-code'
import watchConfirmReasonManagement from './reason-management/confirm'
import watchCreateReasonManagement from './reason-management/create'
import watchDeleteReasonManagement from './reason-management/delete'
import watchGetDetailReasonManagement from './reason-management/get-detail'
import watchRejectReasonManagement from './reason-management/reject'
import watchSearchReasonManagement from './reason-management/search'
import watchUpdateReasonManagement from './reason-management/update'
import watchConfirmReceiptDepartment from './receipt-department-management/confirm-receipt-department'
import watchCreateReceiptDepartment from './receipt-department-management/create-receipt-department'
import watchDeleteReceiptDepartment from './receipt-department-management/delete-receipt-department'
import watchGetReceiptDepartmentDetails from './receipt-department-management/get-receipt-department-details'
import watchRejectReceiptDepartment from './receipt-department-management/reject-receipt-department'
import watchSearchReceiptDepartment from './receipt-department-management/search-receipt-department'
import watchUpdateReceiptDepartment from './receipt-department-management/update-receipt-department'
import watchGetReceiptDetails from './receipt-management/get-receipt-details'
import watchSearchReceipt from './receipt-management/search-receipt'
import watchExportReport from './report-export/export-report'
import watchCreateStoragePeriod from './set-storage-period/create-storage-period'
import watchDeleteStoragePeriod from './set-storage-period/delete-storage-period'
import watchGetStoragePeriodDetails from './set-storage-period/get-storage-period-details'
import watchSearchStoragePeriods from './set-storage-period/search-storage-period'
import watchUpdateStoragePeriod from './set-storage-period/update-storage-period'
import watchGetSignatureConfigurationDetails from './signature-configuration/get-signature-configuration-details'
import watchUpdateSignatureConfiguration from './signature-configuration/update-signature-configuration'
import watchConfirmSourceManagement from './source-management/confirm'
import watchCreateSourceManagement from './source-management/create'
import watchDeleteSourceManagement from './source-management/delete'
import watchGetSourceManagement from './source-management/get-detail'
import watchRejectSourceManagement from './source-management/reject'
import watchSearchSourceManagement from './source-management/search'
import watchUpdateSourceManagement from './source-management/update'
import watchConfirmWarehouseExportProposal from './warehouse-export-proposal/confirm'
import watchCreateWarehouseExportProposal from './warehouse-export-proposal/create'
import watchDeleteWarehouseExportProposal from './warehouse-export-proposal/delete'
import watchGetWarehouseExportProposalDetails from './warehouse-export-proposal/get-details'
import watchRejectWarehouseExportProposal from './warehouse-export-proposal/reject'
import watchRequestItemCode from './warehouse-export-proposal/request-item-code'
import watchSearchWarehouseExportProposal from './warehouse-export-proposal/search'
import watchUpdateWarehouseExportProposal from './warehouse-export-proposal/update'
import watchUpdateWarehouseExportProposalQuantity from './warehouse-export-proposal/update-quantity'
import watchConfirmWarehouseExportReceipt from './warehouse-export-receipt/confirm'
import watchCreateWarehouseExportReceipt from './warehouse-export-receipt/create'
import watchDeleteWarehouseExportReceipt from './warehouse-export-receipt/delete'
import watchGetWarehouseExportReceiptDetails from './warehouse-export-receipt/get-details'
import watchRejectWarehouseExportReceipt from './warehouse-export-receipt/reject'
import watchSearchWarehouseExportReceipt from './warehouse-export-receipt/search'
import watchUpdateWarehouseExportReceipt from './warehouse-export-receipt/update'
import watchGetWarehouseExportDetails from './warehouse-export/get-warehouse-export-details'
import watchSearchWarehouseExport from './warehouse-export/search-warehouse-export'
import watchConfirmWarehouseImportReceipt from './warehouse-import-receipt/confirm'
import watchCreateWarehouseImportReceipt from './warehouse-import-receipt/create'
import watchDeleteWarehouseImportReceipt from './warehouse-import-receipt/delete'
import watchGetAttribuiteBusinessTypeDetails from './warehouse-import-receipt/get-attribute-business-type'
import watchGetWarehouseImportReceiptDetails from './warehouse-import-receipt/get-details'
import watchRejectWarehouseImportReceipt from './warehouse-import-receipt/reject'
import watchSearchWarehouseImportReceipt from './warehouse-import-receipt/search'
import watchUpdateWarehouseImportReceipt from './warehouse-import-receipt/update'
import watchWarehouseImportData from './warehouse-import/get-warehouse-import-list'
/**
 * Root saga
 */
export default function* sagas() {
  yield all([
    // Dashboard
    watchDashboard(),

    // define vendor
    watchCreateVendor(),
    watchDeleteVendor(),
    watchGetVendorDetails(),
    watchImportVendor(),
    watchSearchVendors(),
    watchUpdateVendor(),
    watchConfirmVendor(),
    watchRejectVendor(),

    // management-unit
    watchCreateManagementUnit(),
    watchDeleteManagementUnit(),
    watchGetDetailManagementUnit(),
    watchSearchManagementUnit(),
    watchUpdateUnitManagement(),
    watchConfirmUnitManagement(),
    watchRejectUnitManagement(),
    //company-management
    watchCreateCompany(),
    watchDeleteCompany(),
    watchGetCompanies(),
    watchGetCompanyDetails(),
    watchSearchCompanies(),
    watchUpdateCompany(),
    watchConfirmCompany(),
    watchRejectCompany(),

    //construction-management
    watchCreateConstruction(),
    watchUpdateConstruction(),
    watchSearchConstructions(),
    watchGetConstructionDetails(),
    watchDeleteConstruction(),
    watchConfirmConstruction(),
    watchRejectConstruction(),

    //construction-items-management
    watchCreateConstructionItems(),
    watchUpdateConstructionItems(),
    watchSearchConstructionItems(),
    watchGetConstructionItemsDetails(),
    watchDeleteConstructionItems(),
    watchConfirmConstructionItems(),
    watchRejectConstructionItems(),

    //bussiness-type-management
    watchCreateBussinessType(),
    watchUpdateBussinessType(),
    watchSearchBussinessTypes(),
    watchGetBussinessTypeDetails(),
    watchDeleteBussinessType(),
    watchConfirmBussinessType(),
    watchRejectBussinessType(),

    //source-management
    watchConfirmSourceManagement(),
    watchCreateSourceManagement(),
    watchDeleteSourceManagement(),
    watchGetSourceManagement(),
    watchRejectSourceManagement(),
    watchSearchSourceManagement(),
    watchUpdateSourceManagement(),

    //define-object-category
    watchCreateObjectCategory(),
    watchUpdateObjectCategory(),
    watchSearchObjectCategory(),
    watchGetObjectCategoryDetails(),
    watchConfirmObjectCategory(),
    watchRejectObjectCategory(),
    watchDeleteObjectCategory(),

    //reason-management
    watchCreateReasonManagement(),
    watchDeleteReasonManagement(),
    watchGetDetailReasonManagement(),
    watchSearchReasonManagement(),
    watchUpdateReasonManagement(),
    watchConfirmReasonManagement(),
    watchRejectReasonManagement(),

    //define-uom
    watchSearchUoms(),
    watchCreateUom(),
    watchUpdateUom(),
    watchDeleteUom(),
    watchGetUomDetails(),
    watchConfirmUom(),
    watchRejectUom(),
    //define-material-quality
    watchCreateMaterialQuality(),
    watchUpdateMaterialQuality(),
    watchSearchMaterialQuality(),
    watchGetMaterialQualityDetails(),
    watchDeleteMaterialQuality(),
    watchConfirmMaterialQuality(),
    watchRejectMaterialQuality(),

    //define-material-category
    watchCreateMaterialCategory(),
    watchUpdateMaterialCategory(),
    watchSearchMaterialCategory(),
    watchGetMaterialCategoryDetails(),
    watchDeleteMaterialCategory(),
    watchConfirmMaterialCategory(),
    watchRejectMaterialCategory(),
    watchGetMaterialChildDetails(),

    //receipt-department-management
    watchCreateReceiptDepartment(),
    watchUpdateReceiptDepartment(),
    watchSearchReceiptDepartment(),
    watchGetReceiptDepartmentDetails(),
    watchDeleteReceiptDepartment(),
    watchConfirmReceiptDepartment(),
    watchRejectReceiptDepartment(),

    //define-producing-country
    watchCreateProducingCountry(),
    watchUpdateProducingCountry(),
    watchSearchProducingCountry(),
    watchGetProducingCountryDetails(),
    watchDeleteProducingCountry(),
    watchConfirmProducingCountry(),
    watchRejectProducingCountry(),

    //define-warehouse
    watchCreateWarehouse(),
    watchUpdateWarehouse(),
    watchSearchWarehouse(),
    watchGetWarehouseDetails(),
    watchDeleteWarehouse(),
    watchConfirmWarehouse(),
    watchRejectWarehouse(),
    //inventory-setting
    watchCreateInventorySetting(),
    watchUpdateInventorySetting(),
    watchDeleteInventorySetting(),
    watchSearchInventorySetting(),
    watchGetDetailInventorySetting(),
    //define-warehouse-group
    watchCreateWarehouseGroup(),
    watchUpdateWarehouseGroup(),
    watchSearchWarehouseGroup(),
    watchGetWarehouseGroupDetails(),
    watchDeleteWarehouseGroup(),
    watchConfirmWarehouseGroup(),
    watchRejectWarehouseGroup(),

    //define-shelf
    watchCreateShelf(),
    watchUpdateShelf(),
    watchSearchShelf(),
    watchGetShelfDetails(),
    watchDeleteShelf(),
    watchConfirmShelf(),
    watchRejectShelf(),
    //define-assembly
    watchCreateAssembly(),
    watchUpdateAssembly(),
    watchSearchAssembly(),
    watchGetAssemblyDetails(),
    watchDeleteAssembly(),
    watchConfirmAssembly(),
    watchRejectAssembly(),
    //define-bin
    watchCreateBin(),
    watchUpdateBin(),
    watchSearchBin(),
    watchGetBinDetails(),
    watchDeleteBin(),
    watchConfirmBin(),
    watchRejectBin(),
    //define-drawer
    watchCreateDrawer(),
    watchUpdateDrawer(),
    watchSearchDrawer(),
    watchGetDrawerDetails(),
    watchDeleteDrawer(),
    watchConfirmDrawer(),
    watchRejectDrawer(),
    //define-expenditure-org
    watchCreateExpenditureOrg(),
    watchUpdateExpenditureOrg(),
    watchSearchExpenditureOrg(),
    watchGetExpenditureOrgDetails(),
    watchDeleteExpenditureOrg(),
    watchConfirmExpenditureOrg(),
    watchRejectExpenditureOrg(),
    //define expenditure type
    watchCreateExpenditureType(),
    watchUpdateExpenditureType(),
    watchSearchExpenditureType(),
    watchGetExpenditureTypeDetails(),
    watchDeleteExpenditureType(),
    watchConfirmExpenditureType(),
    watchRejectExpenditureType(),
    // location-management
    watchCreateLocation(),
    watchUpdateLocation(),
    watchSearchLocations(),
    watchGetLocationDetails(),
    watchDeleteLocation(),
    watchConfirmLocation(),
    watchRejectLocation(),
    watchGetItemByLocationId(),

    //set-storage-period
    watchCreateStoragePeriod(),
    watchUpdateStoragePeriod(),
    watchSearchStoragePeriods(),
    watchGetStoragePeriodDetails(),
    watchDeleteStoragePeriod(),

    //material-management
    watchCreateMaterial(),
    watchUpdateMaterial(),
    watchSearchMaterials(),
    watchGetMaterialDetails(),
    watchDeleteMaterial(),
    watchConfirmMaterial(),
    watchRejectMaterial(),
    watchUpdateWarehouseSource(),
    //QR-code
    watchGetQrCodeDetails(),
    watchUpdateQrCode(),
    //warehouse import
    watchWarehouseImportData(),

    // warehouse export
    watchGetWarehouseExportDetails(),
    watchSearchWarehouseExport(),

    //movements
    watchSearchMovements(),
    watchGetMovementsDetails(),

    // inventory statistic
    watchSearchInventoryStatistics(),

    // inventory warning
    watchSearchInventoryWarning(),

    //signature configuration
    watchGetSignatureConfigurationDetails(),
    watchUpdateSignatureConfiguration(),
    //QR-code
    watchGetQrCodeDetails(),
    watchUpdateQrCode(),
    //warehouse-export-receipt
    watchSearchWarehouseExportReceipt(),
    watchCreateWarehouseExportReceipt(),
    watchUpdateWarehouseExportReceipt(),
    watchGetWarehouseExportReceiptDetails(),
    watchDeleteWarehouseExportReceipt(),
    watchConfirmWarehouseExportReceipt(),
    watchRejectWarehouseExportReceipt(),
    // warehouse-export-proposal
    watchSearchWarehouseExportProposal(),
    watchConfirmWarehouseExportProposal(),
    watchCreateWarehouseExportProposal(),
    watchDeleteWarehouseExportProposal(),
    watchGetWarehouseExportProposalDetails(),
    watchRejectWarehouseExportProposal(),
    watchUpdateWarehouseExportProposal(),
    watchUpdateWarehouseExportProposalQuantity(),
    watchRequestItemCode(),

    //receipt-management
    watchGetReceiptDetails(),
    watchSearchReceipt(),
    // export report
    watchExportReport(),
    //inventory-calender
    watchConfirmInventoryCalendar(),
    watchCreateInventoryCalendar(),
    watchDeleteInventoryCalendar(),
    watchGetInventoryCalendarDetails(),
    watchGetItemDetailRecipt(),
    watchGetItem(),
    watchRejectInventoryCalendar(),
    watchSearchInventoryCalendars(),
    watchUpdateInventoryCalendar(),
    watchApproveInventoryCalendar(),
    watchCheckItemNotExecuted(),
    //warehouse-import-receipt
    watchSearchWarehouseImportReceipt(),
    watchCreateWarehouseImportReceipt(),
    watchUpdateWarehouseImportReceipt(),
    watchGetWarehouseImportReceiptDetails(),
    watchDeleteWarehouseImportReceipt(),
    watchConfirmWarehouseImportReceipt(),
    watchRejectWarehouseImportReceipt(),
    watchGetAttribuiteBusinessTypeDetails(),
  ])
}
