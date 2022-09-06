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
import watchConfirmBin from './define-bin/confirm'
import watchCreateBin from './define-bin/create'
import watchDeleteBin from './define-bin/delete'
import watchGetBinDetails from './define-bin/get-details'
import watchRejectBin from './define-bin/reject'
import watchSearchBin from './define-bin/search'
import watchUpdateBin from './define-bin/update'
import watchConfirmDrawer from './define-drawer/confirm'
import watchCreateDrawer from './define-drawer/create'
import watchDeleteDrawer from './define-drawer/delete'
import watchGetDrawerDetails from './define-drawer/get-details'
import watchRejectDrawer from './define-drawer/reject'
import watchSearchDrawer from './define-drawer/search'
import watchUpdateDrawer from './define-drawer/update'
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
import watchCreateVendor from './define-vendor/create-vendor'
import watchDeleteVendor from './define-vendor/delete-vendor'
import watchGetVendorDetails from './define-vendor/get-vendor-details'
import watchImportVendor from './define-vendor/import-vendor'
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
import watchCreateInventorySetting from './inventory-setting/create'
import watchDeleteInventorySetting from './inventory-setting/delete'
import watchGetDetailInventorySetting from './inventory-setting/get-detail'
import watchSearchInventorySetting from './inventory-setting/search'
import watchUpdateInventorySetting from './inventory-setting/update'
import watchCreateManagementUnit from './management-unit/create'
import watchDeleteManagementUnit from './management-unit/delete'
import watchGetDetailManagementUnit from './management-unit/get-detail'
import watchSearchManagementUnit from './management-unit/search'
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
import watchCreateStoragePeriod from './set-storage-period/create-construction'
import watchDeleteStoragePeriod from './set-storage-period/delete-construction'
import watchGetStoragePeriodDetails from './set-storage-period/get-construction-details'
import watchSearchStoragePeriods from './set-storage-period/search-constructions'
import watchUpdateStoragePeriod from './set-storage-period/update-construction'
import watchConfirmSourceManagement from './source-management/confirm'
import watchCreateSourceManagement from './source-management/create'
import watchDeleteSourceManagement from './source-management/delete'
import watchGetSourceManagement from './source-management/get-detail'
import watchRejectSourceManagement from './source-management/reject'
import watchSearchSourceManagement from './source-management/search'
import watchUpdateSourceManagement from './source-management/update'

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

    // management-unit
    watchCreateManagementUnit(),
    watchDeleteManagementUnit(),
    watchGetDetailManagementUnit(),
    watchSearchManagementUnit(),

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

    //set-storage-period
    watchCreateStoragePeriod(),
    watchUpdateStoragePeriod(),
    watchSearchStoragePeriods(),
    watchGetStoragePeriodDetails(),
    watchDeleteStoragePeriod(),
  ])
}
