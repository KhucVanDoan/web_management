import { all } from 'redux-saga/effects'

import watchCreateDetail from './define-detail/create-detail'
import watchDeleteDetail from './define-detail/delete-detail'
import watchGetDetailDetails from './define-detail/get-detail-details'
import watchGetDetails from './define-detail/get-details'
import watchSearchDetails from './define-detail/search-detail'
import watchUpdateDetail from './define-detail/update-detail'
import watchConfirmWarehouse from './define-warehouse/confirm-warehouse'
import watchCreateWarehouse from './define-warehouse/create-warehouse'
import watchDeleteWarehouse from './define-warehouse/delete-warehouse'
import watchGetWarehouseDetails from './define-warehouse/get-warehouse-details'
import watchImportWarehouse from './define-warehouse/import-warehouse'
import watchSearchWarehouses from './define-warehouse/search-warehouses'
import watchUpdateWarehouse from './define-warehouse/update-warehouse'
import watchSearchInventoryDeadlineWarning from './inventory-deadline-warning/search-inventory-deadline-warning'
import watchSearchInventoryWarning from './inventory-warning/search-inventory-warning'
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
  ])
}
