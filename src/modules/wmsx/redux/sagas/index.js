import { all } from 'redux-saga/effects'

import watchGetSupplyRequest from './common/get-all-supply-request'
import watchGetItemQualityPoint from './common/get-item-quality-point'
import watchGetItems from './common/get-items'
import watchGetWarehouses from './common/get-warehouses'
import watchCreateBlock from './define-block/create-block'
import watchDeleteBlock from './define-block/delete-block'
import watchGetBlockDetails from './define-block/get-block-details'
import watchSearchBlocks from './define-block/search-blocks'
import watchUpdateBlock from './define-block/update-block'
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
import watchCreateTemplateShelf from './define-template-shelf/create-template-shelf'
import watchDeleteTemplateShelf from './define-template-shelf/delete-template-shelf'
import watchGetTemplateShelfDetail from './define-template-shelf/get-template-shelf-detail'
import watchSearchTemplateShelfs from './define-template-shelf/search-template-shelfs'
import watchUpdateTemplateShelf from './define-template-shelf/update-template-shelf'
import watchCreateVendor from './define-vendor/create-vendor.saga'
import watchDeleteVendor from './define-vendor/delete-vendor.saga'
import watchGetVendorDetails from './define-vendor/get-vendor-details.saga'
import watchImportVendor from './define-vendor/import-vendor.saga'
import watchSearchVendors from './define-vendor/search-vendors.saga'
import watchUpdateVendor from './define-vendor/updata-vendor.saga'
import watchConfirmWarehouse from './define-warehouse/confirm-warehouse'
import watchCreateWarehouse from './define-warehouse/create-warehouse'
import watchDeleteWarehouse from './define-warehouse/delete-warehouse'
import watchGetWarehouseDetails from './define-warehouse/get-warehouse-details'
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
import watchSearchInventoryDetail from './inventory/detail-inventory'
import watchGetWarehouseType from './inventory/get-warehouse-types'
import watchSearchInventory from './inventory/search-inventory'
import watchGetMovementsDetails from './movements/get-movement-details.'
import watchSearchMovements from './movements/search-movements.saga'
import watchConfirmProductionOrder from './production-order/confirm-production-order'
import watchCreateProductionOrder from './production-order/create-production-order'
import watchDeleteProductionOrder from './production-order/delete-production-order'
import watchGetExportLotNumber from './production-order/get-export-lot-number'
import watchGetImportLotNumber from './production-order/get-import-lot-number'
import watchGetProductionOrderDetails from './production-order/get-production-order-details'
import watchRejectProductionOrder from './production-order/reject-production-order'
import watchSearchProductionOrders from './production-order/search-production-orders'
import watchUpdateProductionOrder from './production-order/update-production-order'
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
import watchGetWarehouseTransferMovementsDetails from './warehouse-transfer-movements/get-movement-details'
import watchSearchWarehouseTransferMovements from './warehouse-transfer-movements/search-movements'
import watchConfirmWarehouseTransfer from './warehouse-transfer/confirm-warehouse-transfer.saga'
import watchCreateWarehouseTransfer from './warehouse-transfer/create-warehouse-transfer.saga'
import watchDeleteWarehouseTransfer from './warehouse-transfer/delete-warehouse-transfer.saga'
import watchGetListItemWarehouseStock from './warehouse-transfer/get-list-item-warehouse-stock.saga'
import watchGetLotNumberListWarehouseTransfer from './warehouse-transfer/get-lot-number-list.saga'
import watchGetStockByItemAndLotNumber from './warehouse-transfer/get-stock-by-item-and-lot.saga'
import watchGetWarehouseTransferDetails from './warehouse-transfer/get-warehouse-transfer-details.saga'
import watchRejectWarehouseTransfer from './warehouse-transfer/reject-warehouse-transfer.saga'
import watchSearchWarehouseTransfers from './warehouse-transfer/search-warehouse-transfer.saga'
import watchUpdateWarehouseTransfer from './warehouse-transfer/update-warehouse-transfer.saga'

/**
 * Root saga
 */
export default function* sagas() {
  yield all([
    //common
    watchGetItemQualityPoint(),
    watchGetItems(),
    watchGetWarehouses(),
    watchGetSupplyRequest(),
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
    // define-detail
    watchCreateDetail(),
    watchDeleteDetail(),
    watchGetDetailDetails(),
    watchGetDetails(),
    watchSearchDetails(),
    watchUpdateDetail(),
    // define warehouse
    watchConfirmWarehouse(),
    watchCreateWarehouse(),
    watchDeleteWarehouse(),
    watchGetWarehouseDetails(),
    watchImportWarehouse(),
    watchSearchWarehouses(),
    watchUpdateWarehouse(),
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
  ])
}
