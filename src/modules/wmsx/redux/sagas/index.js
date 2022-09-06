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
  ])
}
