import { all } from 'redux-saga/effects'

import watchGetSupplyRequest from './common/get-all-supply-request'
import watchGetBlocks from './common/get-blocks'
import watchGetItemQualityPoint from './common/get-item-quality-point'
import watchGetItems from './common/get-items'
import watchGetMoMaterialPlanDetail from './common/get-mo-material-plan-detail'
import watchGetPackages from './common/get-packages'
import watchGetPallets from './common/get-pallets'
import watchGetTypeServices from './common/get-type-services'
import watchGetWarehouses from './common/get-warehouses'
import watchDashboard from './dashboard'
import watchCompleteBill from './define-bill/complete-bill'
import watchConfirmBill from './define-bill/confirm-bill'
import watchCreateBill from './define-bill/create-bill'
import watchDeleteBill from './define-bill/delete-bill'
import watchGetBillDetails from './define-bill/get-bill-details'
import watchImportBill from './define-bill/import-bill'
import watchRejectBill from './define-bill/reject-bill'
import watchSearchBills from './define-bill/search-bill'
import watchUpdateBill from './define-bill/update-bill'
import watchCreateBlock from './define-block/create-block'
import watchDeleteBlock from './define-block/delete-block'
import watchGetBlockDetails from './define-block/get-block-details'
import watchSearchBlocks from './define-block/search-blocks'
import watchUpdateBlock from './define-block/update-block'
import watchConfirmCurrencyUnit from './define-currency-unit/confirm-currency-unit'
import watchCreateCurrencyUnit from './define-currency-unit/create-currency-unit'
import watchDeleteCurrencyUnit from './define-currency-unit/delete-currency-unit'
import watchGetCurrencyUnitDetails from './define-currency-unit/get-currency-unit-details'
import watchImportCurrencyUnit from './define-currency-unit/import-currency-unit'
import watchRejectCurrencyUnit from './define-currency-unit/reject-currency-unit'
import watchSearchCurrencyUnits from './define-currency-unit/search-currency-unit'
import watchUpdateCurrencyUnit from './define-currency-unit/update-currency-unit'
import watchConfirmCustomerLevel from './define-customer-level/confirm-customer-level'
import watchCreateCustomerLevel from './define-customer-level/create-customer-level'
import watchDeleteCustomerLevel from './define-customer-level/delete-customer-level'
import watchGetCustomerLevelDetails from './define-customer-level/get-customer-level-details'
import watchSearchCustomerLevels from './define-customer-level/search-customer-levels'
import watchUpdateCustomerLevel from './define-customer-level/update-customer-level'
import watchCreateCustomer from './define-customer/create-customer'
import watchDeleteCustomer from './define-customer/delete-customer'
import watchGetCustomerDetails from './define-customer/get-customer-details'
import watchImportCustomer from './define-customer/import-customer'
import watchSearchCustomers from './define-customer/search-customers'
import watchUpdateCustomer from './define-customer/update-customer'
import watchCreateDetail from './define-detail/create-detail'
import watchDeleteDetail from './define-detail/delete-detail'
import watchGetDetailDetails from './define-detail/get-detail-details'
import watchGetDetails from './define-detail/get-details'
import watchSearchDetails from './define-detail/search-detail'
import watchUpdateDetail from './define-detail/update-detail'
import watchCreatePackage from './define-package/create-package'
import watchDeletePackage from './define-package/delete-package'
import watchGetPackageDetails from './define-package/get-package-details'
import watchSearchPackages from './define-package/search-packages'
import watchUpdatePackage from './define-package/update-package'
import watchCreatePallet from './define-pallet/create-pallet'
import watchDeletePallet from './define-pallet/delete-pallet'
import watchGetPalletDetail from './define-pallet/get-pallet-detail'
import watchSearchPallets from './define-pallet/search-pallets'
import watchUpdatePallet from './define-pallet/update-pallet'
import watchConfirmPaymentType from './define-payment-type/confirm-payment-type'
import watchCreatePaymentType from './define-payment-type/create-payment-type'
import watchDeletePaymentType from './define-payment-type/delete-payment-type'
import watchGetPaymentTypeDetails from './define-payment-type/get-payment-type-details'
import watchImportPaymentType from './define-payment-type/import-payment-type'
import watchSearchPaymentTypes from './define-payment-type/search-payment-type'
import watchUpdatePaymentType from './define-payment-type/update-payment-type'
import watchConfirmService from './define-service/confirm-service'
import watchCreateService from './define-service/create-service'
import watchDeleteService from './define-service/delete-service'
import watchGetAllServicesDetail from './define-service/get-all-services-detail'
import watchGetServiceDetail from './define-service/get-service-detail'
import watchRejectService from './define-service/reject-service'
import watchSearchServices from './define-service/search-services'
import watchUpdateService from './define-service/update-service'
import watchCreateTemplateSector from './define-template-sector/create-template-sector'
import watchDeleteTemplateSector from './define-template-sector/delete-template-sector'
import watchGetTemplateDetails from './define-template-sector/get-detail-template-sector'
import watchSearchTemplateSector from './define-template-sector/search-template-sector'
import watchUpdateTemplateSector from './define-template-sector/update-template-sector'
import watchCreateTemplateShelf from './define-template-shelf/create-template-shelf'
import watchDeleteTemplateShelf from './define-template-shelf/delete-template-shelf'
import watchGetTemplateShelfDetail from './define-template-shelf/get-template-shelf-detail'
import watchSearchTemplateShelfs from './define-template-shelf/search-template-shelfs'
import watchUpdateTemplateShelf from './define-template-shelf/update-template-shelf'
import watchConfirmTypeService from './define-type-service/confirm-define-type-service'
import watchCreateTypeService from './define-type-service/create-define-type-service'
import watchDeleteTypeService from './define-type-service/delete-define-type-service'
import watchGetTypeServiceDetails from './define-type-service/get-define-type-service-details'
import watchImportTypeService from './define-type-service/import-type-service'
import watchSearchTypeServices from './define-type-service/search-define-type-services'
import watchUpdateTypeService from './define-type-service/update-define-type-service'
import watchConfirmTypeUnit from './define-type-unit/confirm-define-type-unit'
import watchCreateTypeUnit from './define-type-unit/create-define-type-unit'
import watchDeleteTypeUnit from './define-type-unit/delete-define-type-unit'
import watchGetTypeUnitDetails from './define-type-unit/get-define-type-unit-details'
import watchImportTypeUnit from './define-type-unit/import-type-unit'
import watchSearchTypeUnits from './define-type-unit/search-define-type-units'
import watchUpdateTypeUnit from './define-type-unit/update-define-type-unit'
import watchCreateVendor from './define-vendor/create-vendor'
import watchDeleteVendor from './define-vendor/delete-vendor'
import watchGetVendorDetails from './define-vendor/get-vendor-details'
import watchImportVendor from './define-vendor/import-vendor'
import watchSearchVendors from './define-vendor/search-vendors'
import watchUpdateVendor from './define-vendor/updata-vendor'
import watchGetDefineWarehousePallet from './define-warehouse-pallet/get-define-warehouse-pallet'
import watchSearchDefineWarehousePallet from './define-warehouse-pallet/search-define-warehouse-pallet'
import watchGetDefineWarehouseShelf from './define-warehouse-shelf/get-define-warehouse-shelf'
import watchSearchDefineWarehouseShelf from './define-warehouse-shelf/search-define-warehouse-shelf'
import watchConfirmWarehouse from './define-warehouse/confirm-warehouse'
import watchCreateWarehouse from './define-warehouse/create-warehouse'
import watchDeleteWarehouse from './define-warehouse/delete-warehouse'
import watchGetWarehouseDetails from './define-warehouse/get-warehouse-details'
import watchGetWarehouseDetailsCanvas from './define-warehouse/get-warehouse-details-canvas'
import watchImportWarehouse from './define-warehouse/import-warehouse'
import watchSearchWarehouses from './define-warehouse/search-warehouses'
import watchUpdateWarehouse from './define-warehouse/update-warehouse'
import watchConfirmImportManufacturingOrder from './import-manufacturing-order/confirm-import-manufacturing-order'
import watchCreateImportManufacturingOrder from './import-manufacturing-order/create-import-manufacturing-order'
import watchDeleteImportManufacturingOrder from './import-manufacturing-order/delete-import-manufacturing-order'
import watchGetImportManufacturingOrderDetails from './import-manufacturing-order/get-import-manufacturing-order'
import watchGetLotNumberList from './import-manufacturing-order/get-lot-number-list'
import watchRejectImportManufacturingOrder from './import-manufacturing-order/reject-import-manufacturing-order'
import watchSearchImportManufacturingOrders from './import-manufacturing-order/search-import-manufacturing-order'
import watchUpdateImportManufacturingOrder from './import-manufacturing-order/update-import-manufacturing-order'
import watchConfirmInventoryCalendar from './inventory-calendar/confirm-inventory-calendar'
import watchCreateInventoryCalendar from './inventory-calendar/create-inventory-calendar'
import watchDeleteInventoryCalendar from './inventory-calendar/delete-inventory-calendar'
import watchGetInventoryCalendarDetails from './inventory-calendar/get-inventory-calendar-details'
import watchRejectInventoryCalendar from './inventory-calendar/reject-inventory-calendar'
import watchSearchInventoryCalendars from './inventory-calendar/search-inventory-calendars'
import watchUpdateInventoryCalendar from './inventory-calendar/update-inventory-calendar'
import watchSearchInventoryDeadlineWarning from './inventory-deadline-warning/search-inventory-deadline-warning'
import watchCreateInventoryLimit from './inventory-limit/create-inventory-limit'
import watchDeleteInventoryLimit from './inventory-limit/delete-inventory-limit'
import watchGetInventoryLimitDetails from './inventory-limit/get-inventory-limit-details'
import watchSearchInventoryLimits from './inventory-limit/search-inventory-limits'
import watchUpdateInventoryLimit from './inventory-limit/update-item-group'
import watchSearchInventoryStatistics from './inventory-statistics/search-inventory-statistics'
import watchSearchInventoryWarning from './inventory-warning/search-inventory-warning'
import watchApproveInventory from './inventory/approve-ticket'
import watchSearchInventoryDetail from './inventory/detail-inventory'
import watchGetWarehouseType from './inventory/get-warehouse-types'
import watchSearchInventory from './inventory/search-inventory'
import watchConfirmInvoiceType from './invoice-type/confirm-invoice-type'
import watchCreateInvoiceType from './invoice-type/create-invoice-type'
import watchDeleteInvoiceType from './invoice-type/delete-invoice-type'
import watchGetInvoiceTypeDetail from './invoice-type/get-invoice-type-detail'
import watchImportInvoiceType from './invoice-type/import-invoice-type'
import watchRejectInvoiceType from './invoice-type/reject-invoice-type'
import watchSearchInvoiceTypes from './invoice-type/search-invoice-type'
import watchUpdateInvoiceType from './invoice-type/update-invoice-type'
import watchCreateLocationSetting from './location-setting/create'
import watchDeleteLocationSetting from './location-setting/delete'
import watchGetLocationSettingDetails from './location-setting/get-detail'
import watchSearchLocationSettings from './location-setting/search'
import watchUpdateLocationSetting from './location-setting/update'
import watchGetMovementsDetails from './movements/get-movement-details.'
import watchSearchMovements from './movements/search-movements'
import watchConfirmProductionOrder from './production-order/confirm-production-order'
import watchCreateProductionOrder from './production-order/create-production-order'
import watchDeleteProductionOrder from './production-order/delete-production-order'
import watchGetExportLotNumber from './production-order/get-export-lot-number'
import watchGetImportLotNumber from './production-order/get-import-lot-number'
import watchGetProductionOrderDetails from './production-order/get-production-order-details'
import watchRejectProductionOrder from './production-order/reject-production-order'
import watchSearchProductionOrders from './production-order/search-production-orders'
import watchUpdateProductionOrder from './production-order/update-production-order'
import watchConfirmPOImport from './purchased-orders-import/confirm-purchased-order-imp'
import watchCreatePOSImport from './purchased-orders-import/create-purchased-order-imp'
import watchDeletePOSImport from './purchased-orders-import/delete-purchased-order-imp'
import watchGetPOImpLotNumberList from './purchased-orders-import/get-lot-number-list'
import watchGetPOSImportDetails from './purchased-orders-import/get-purchased-order-imp-details'
import watchGetPurchasedOrderNotCreatePOimp from './purchased-orders-import/get-purchased-order-not-poimp'
import watchRejectPOSImport from './purchased-orders-import/reject-purchased-order-imp'
import watchSearchPOImport from './purchased-orders-import/search-purchased-orders-imp'
import watchUpdatePOImport from './purchased-orders-import/update-purchased-order-imp'
import watchGetRentWarehouseDashboardList from './rent-warehouse-dashboard/get-rent-warehouse-dashboard-list'
import watchConfirmReturnOrder from './return-order/confirm-warehouse-transfer'
import watchCreateReturnOrder from './return-order/create-warehouse-transfer'
import watchDeleteReturnOrder from './return-order/delete-warehouse-transfer'
import watchGetItemsByOrderReturnOrder from './return-order/get-items-by-order-return-order'
import watchGetReturnOrderDetails from './return-order/get-warehouse-transfer-details'
import watchRejectReturnOrder from './return-order/reject-warehouse-transfer'
import watchSearchReturnOrders from './return-order/search-warehouse-transfer'
import watchUpdateReturnOrder from './return-order/update-warehouse-transfer'
import watchConfirmSOExport from './so-export/confirm-so-export'
import watchCreateSOExport from './so-export/create-so-export'
import watchDeleteSOExport from './so-export/delete-so-export'
import watchGetLotNumberListSOExport from './so-export/get-lot-number-list'
import watchGetSOExportDetails from './so-export/get-so-export-details'
import watchRejectSOExport from './so-export/reject-so-export'
import watchSearchSOExport from './so-export/search-so-export'
import watchUpdateSOExport from './so-export/update-so-export'
import watchSaveTemplateSectorTemplateShelf from './template-sector-template-shelf/save-template-sector-template-shelf'
import watchConfirmVoucher from './voucher/confirm-voucher'
import watchCreateVoucher from './voucher/create-voucher'
import watchDeleteVoucher from './voucher/delete-voucher'
import watchGetVoucher from './voucher/get-voucher-detail'
import watchImportVoucher from './voucher/import-voucher'
import watchRejectVoucher from './voucher/reject-voucher'
import watchSearchVouchers from './voucher/search-voucher'
import watchUpdateVoucher from './voucher/update-voucher'
import watchGetWarehouseAreaDetail from './warehouse-area/get-warehouse-area-detail'
import watchSearchWarehouseAreas from './warehouse-area/search-warehouse-areas'
import watchGetWarehouseDesign from './warehouse-design/get-detail'
import watchUpdateWarehouseDesign from './warehouse-design/update'
import watchGetWarehouseExportDetails from './warehouse-export/get-warehouse-export-details'
import watchSearchWarehouseExport from './warehouse-export/search-warehouse-export'
import watchWarehouseImportData from './warehouse-import/get-warehouse-import-list'
import watchCreateWarehouseReport from './warehouse-report/create-warehouse-report'
import watchDeleteWarehouseReport from './warehouse-report/delete-warehouse-report'
import watchGetWarehouseReportDetails from './warehouse-report/get-warehouse-report-detail'
import watchSearchWarehouseReports from './warehouse-report/search-warehouse-report'
import watchUpdateWarehouseReport from './warehouse-report/update-warehouse-report'
import watchCreateWarehouseSetting from './warehouse-setting/create-warehouse-setting'
import watchDeleteWarehouseSetting from './warehouse-setting/delete-warehouse-setting'
import watchGetWarehouseSettingDetails from './warehouse-setting/get-detail-warehouse-setting'
import watchSearchWarehouseSetting from './warehouse-setting/search-warehouse-setting'
import watchUpdateWarehouseSetting from './warehouse-setting/update-warehouse-setting'
import watchGetFactories from './warehouse-space-report/get-factories'
import watchGetDataWarehouseSpaceReport from './warehouse-space-report/search'
import watchGetWarehouseTransferMovementsDetails from './warehouse-transfer-movements/get-movement-details'
import watchSearchWarehouseTransferMovements from './warehouse-transfer-movements/search-movements'
import watchConfirmWarehouseTransfer from './warehouse-transfer/confirm-warehouse-transfer'
import watchCreateWarehouseTransfer from './warehouse-transfer/create-warehouse-transfer'
import watchDeleteWarehouseTransfer from './warehouse-transfer/delete-warehouse-transfer'
import watchGetListItemWarehouseStock from './warehouse-transfer/get-list-item-warehouse-stock'
import watchGetLotNumberListWarehouseTransfer from './warehouse-transfer/get-lot-number-list'
import watchGetStockByItemAndLotNumber from './warehouse-transfer/get-stock-by-item-and-lot'
import watchGetWarehouseTransferDetails from './warehouse-transfer/get-warehouse-transfer-details'
import watchRejectWarehouseTransfer from './warehouse-transfer/reject-warehouse-transfer'
import watchSearchWarehouseTransfers from './warehouse-transfer/search-warehouse-transfer'
import watchUpdateWarehouseTransfer from './warehouse-transfer/update-warehouse-transfer'

/**
 * Root saga
 */
export default function* sagas() {
  yield all([
    //common
    watchGetItemQualityPoint(),
    watchGetItems(),
    watchGetPackages(),
    watchGetBlocks(),
    watchGetWarehouses(),
    watchGetSupplyRequest(),
    watchGetTypeServices(),
    watchGetMoMaterialPlanDetail(),
    watchGetPallets(),

    // Dashboard
    watchDashboard(),

    //define-template-shelf
    watchCreateTemplateShelf(),
    watchDeleteTemplateShelf(),
    watchGetTemplateShelfDetail(),
    watchSearchTemplateShelfs(),
    watchUpdateTemplateShelf(),

    watchCreateWarehouseSetting(),
    watchDeleteWarehouseSetting(),
    watchGetWarehouseSettingDetails(),
    watchSearchWarehouseSetting(),
    watchUpdateWarehouseSetting(),
    // rent warehouse cost
    watchConfirmTypeUnit(),
    watchCreateTypeUnit(),
    watchDeleteTypeUnit(),
    watchGetTypeUnitDetails(),
    watchImportTypeUnit(),
    watchSearchTypeUnits(),
    watchUpdateTypeUnit(),
    watchConfirmService(),
    watchCreateService(),
    watchDeleteService(),
    watchGetServiceDetail(),
    watchGetAllServicesDetail(),
    watchRejectService(),
    watchSearchServices(),
    watchUpdateService(),

    watchConfirmCurrencyUnit(),
    watchCreateCurrencyUnit(),
    watchDeleteCurrencyUnit(),
    watchGetCurrencyUnitDetails(),
    watchImportCurrencyUnit(),
    watchRejectCurrencyUnit(),
    watchSearchCurrencyUnits(),
    watchUpdateCurrencyUnit(),
    // define-detail
    watchCreateDetail(),
    watchDeleteDetail(),
    watchGetDetailDetails(),
    watchGetDetails(),
    watchSearchDetails(),
    watchUpdateDetail(),
    // define pallet
    watchCreatePallet(),
    watchDeletePallet(),
    watchGetPalletDetail(),
    watchSearchPallets(),
    watchUpdatePallet(),
    //define-template-sector
    watchCreateTemplateSector(),
    watchDeleteTemplateSector(),
    watchGetTemplateDetails(),
    watchSearchTemplateSector(),
    watchUpdateTemplateSector(),
    // define warehouse
    watchConfirmWarehouse(),
    watchCreateWarehouse(),
    watchDeleteWarehouse(),
    watchGetWarehouseDetails(),
    watchImportWarehouse(),
    watchSearchWarehouses(),
    watchUpdateWarehouse(),
    watchGetWarehouseDetailsCanvas(),
    //  warehouseReportManagement
    watchSearchInventoryDeadlineWarning(),
    watchSearchInventoryWarning(),
    watchCreateWarehouseReport(),
    watchDeleteWarehouseReport(),
    watchGetWarehouseReportDetails(),
    watchSearchWarehouseReports(),
    watchUpdateWarehouseReport(),
    //warehouse transfer movements
    watchGetWarehouseTransferMovementsDetails(),
    watchSearchWarehouseTransferMovements(),
    ///define vendor
    watchCreateVendor(),
    watchDeleteVendor(),
    watchGetVendorDetails(),
    watchImportVendor(),
    watchSearchVendors(),
    watchUpdateVendor(),
    // inventory limit
    watchCreateInventoryLimit(),
    watchUpdateInventoryLimit(),
    watchSearchInventoryLimits(),
    watchGetInventoryLimitDetails(),
    watchDeleteInventoryLimit(),
    // warehouse export
    watchGetWarehouseExportDetails(),
    watchSearchWarehouseExport(),

    //warehouse-import
    watchWarehouseImportData(),

    //movements
    watchSearchMovements(),
    watchGetMovementsDetails(),
    // inventory statistic
    watchSearchInventoryStatistics(),
    // warehouse transfer
    watchConfirmWarehouseTransfer(),
    watchCreateWarehouseTransfer(),
    watchDeleteWarehouseTransfer(),
    watchGetListItemWarehouseStock(),
    watchGetLotNumberListWarehouseTransfer(),
    watchGetStockByItemAndLotNumber(),
    watchGetWarehouseTransferDetails(),
    watchRejectWarehouseTransfer(),
    watchSearchWarehouseTransfers(),
    watchUpdateWarehouseTransfer(),
    // define customer
    watchCreateCustomer(),
    watchDeleteCustomer(),
    watchGetCustomerDetails(),
    watchImportCustomer(),
    watchSearchCustomers(),
    watchUpdateCustomer(),

    //inventory-calendar
    watchConfirmInventoryCalendar(),
    watchCreateInventoryCalendar(),
    watchDeleteInventoryCalendar(),
    watchGetInventoryCalendarDetails(),
    watchRejectInventoryCalendar(),
    watchSearchInventoryCalendars(),
    watchUpdateInventoryCalendar(),
    //inventory
    watchSearchInventoryDetail(),
    watchSearchInventory(),
    watchGetWarehouseType(),
    watchApproveInventory(),
    //purchased orders import
    watchUpdatePOImport(),
    watchSearchPOImport(),
    watchRejectPOSImport(),
    watchGetPOSImportDetails(),
    watchGetPOImpLotNumberList(),
    watchDeletePOSImport(),
    watchCreatePOSImport(),
    watchConfirmPOImport(),
    watchGetPurchasedOrderNotCreatePOimp(),
    //warehouse-space-report
    watchGetFactories(),
    watchGetDataWarehouseSpaceReport(),
    //warehouse-area
    watchGetWarehouseAreaDetail(),
    watchSearchWarehouseAreas(),
    // import manufacturing order
    watchConfirmImportManufacturingOrder(),
    watchCreateImportManufacturingOrder(),
    watchUpdateImportManufacturingOrder(),
    watchSearchImportManufacturingOrders(),
    watchDeleteImportManufacturingOrder(),
    watchRejectImportManufacturingOrder(),
    watchGetImportManufacturingOrderDetails(),
    watchGetLotNumberList(),

    //define-block
    watchCreateBlock(),
    watchDeleteBlock(),
    watchSearchBlocks(),
    watchUpdateBlock(),
    watchGetBlockDetails(),
    // producion-order
    watchConfirmProductionOrder(),
    watchDeleteProductionOrder(),
    watchCreateProductionOrder(),
    watchGetExportLotNumber(),
    watchGetImportLotNumber(),
    watchGetProductionOrderDetails(),
    watchRejectProductionOrder(),
    watchSearchProductionOrders(),
    watchUpdateProductionOrder(),

    //define-package
    watchCreatePackage(),
    watchDeletePackage(),
    watchSearchPackages(),
    watchUpdatePackage(),
    watchGetPackageDetails(),
    //define-warehouse-shelf
    watchGetDefineWarehouseShelf(),
    watchSearchDefineWarehouseShelf(),

    //define-customer-level
    watchConfirmCustomerLevel(),
    watchCreateCustomerLevel(),
    watchDeleteCustomerLevel(),
    watchSearchCustomerLevels(),
    watchUpdateCustomerLevel(),
    watchGetCustomerLevelDetails(),
    // rent warehouse dashboard
    watchGetRentWarehouseDashboardList(),
    // define voucher
    watchConfirmVoucher(),
    watchCreateVoucher(),
    watchDeleteVoucher(),
    watchGetVoucher(),
    watchImportVoucher(),
    watchRejectVoucher(),
    watchSearchVouchers(),
    watchUpdateVoucher(),
    //template sector template shelf
    watchSaveTemplateSectorTemplateShelf(),
    //define warehouse pallet
    watchSearchDefineWarehousePallet(),
    watchGetDefineWarehousePallet(),
    //define payment type
    watchConfirmPaymentType(),
    watchCreatePaymentType(),
    watchDeletePaymentType(),
    watchGetPaymentTypeDetails(),
    watchImportPaymentType(),
    watchSearchPaymentTypes(),
    watchUpdatePaymentType(),
    //define type service
    watchConfirmTypeService(),
    watchCreateTypeService(),
    watchDeleteTypeService(),
    watchGetTypeServiceDetails(),
    watchImportTypeService(),
    watchSearchTypeServices(),
    watchUpdateTypeService(),
    // invoice type
    watchUpdateInvoiceType(),
    watchSearchInvoiceTypes(),
    watchRejectInvoiceType(),
    watchImportInvoiceType(),
    watchGetInvoiceTypeDetail(),
    watchDeleteInvoiceType(),
    watchCreateInvoiceType(),
    watchConfirmInvoiceType(),
    // define bill
    watchCompleteBill(),
    watchConfirmBill(),
    watchCreateBill(),
    watchDeleteBill(),
    watchGetBillDetails(),
    watchImportBill(),
    watchRejectBill(),
    watchSearchBills(),
    watchUpdateBill(),
    // so export
    watchConfirmSOExport(),
    watchCreateSOExport(),
    watchDeleteSOExport(),
    watchGetLotNumberListSOExport(),
    watchGetSOExportDetails(),
    watchRejectSOExport(),
    watchSearchSOExport(),
    watchUpdateSOExport(),
    // warehouse design
    watchGetWarehouseDesign(),
    watchUpdateWarehouseDesign(),
    // Location setting
    watchCreateLocationSetting(),
    watchDeleteLocationSetting(),
    watchGetLocationSettingDetails(),
    watchSearchLocationSettings(),
    watchUpdateLocationSetting(),

    //return-order
    watchSearchReturnOrders(),
    watchGetItemsByOrderReturnOrder(),
    watchConfirmReturnOrder(),
    watchCreateReturnOrder(),
    watchDeleteReturnOrder(),
    watchGetReturnOrderDetails(),
    watchRejectReturnOrder(),
    watchUpdateReturnOrder(),
  ])
}
