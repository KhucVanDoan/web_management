import { all } from 'redux-saga/effects'

import watchCreateDetail from './define-detail/create-detail'
import watchDeleteDetail from './define-detail/delete-detail'
import watchGetDetailDetails from './define-detail/get-detail-details'
import watchGetDetails from './define-detail/get-details'
import watchSearchDetails from './define-detail/search-detail'
import watchUpdateDetail from './define-detail/update-detail'
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

/**
 * Root saga
 */
export default function* sagas() {
  yield all([
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
  ])
}
