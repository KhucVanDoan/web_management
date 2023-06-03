import { all } from 'redux-saga/effects'

import watchCancelWarehouseImportEBS from './warehouse-import-receipt/cancelEBS'
import watchConfirmWarehouseImportReceipt from './warehouse-import-receipt/confirm'
import watchConfirmWarehouseImportEBS from './warehouse-import-receipt/confirmEBS'
import watchCreateWarehouseImportReceipt from './warehouse-import-receipt/create'
import watchDeleteWarehouseImportReceipt from './warehouse-import-receipt/delete'
import watchGetAttribuiteBusinessTypeDetails from './warehouse-import-receipt/get-attribute-business-type'
import watchGetWarehouseImportReceiptDetails from './warehouse-import-receipt/get-details'
import watchImportWarehouse from './warehouse-import-receipt/import-warehouse'
import watchReceiveWarehouse from './warehouse-import-receipt/receive'
import watchRejectWarehouseImportReceipt from './warehouse-import-receipt/reject'
import watchRetry from './warehouse-import-receipt/retry'
import watchReturnWarehouseImportReceipt from './warehouse-import-receipt/return'
import watchSearchWarehouseImportReceipt from './warehouse-import-receipt/search'
import watchSeenToDriver from './warehouse-import-receipt/seenToDriver'
import watchStoredWarehouse from './warehouse-import-receipt/stored'
import watchsuggestLocators from './warehouse-import-receipt/suggesr-locator'
import watchUpdateWarehouseImportReceipt from './warehouse-import-receipt/update'
import watchUpdateHeaderWarehouseImportReceipt from './warehouse-import-receipt/update-header'

/**
 * Root saga
 */
export default function* sagas() {
  yield all([
    //warehouse-import-receipt
    watchSearchWarehouseImportReceipt(),
    watchCreateWarehouseImportReceipt(),
    watchUpdateWarehouseImportReceipt(),
    watchGetWarehouseImportReceiptDetails(),
    watchDeleteWarehouseImportReceipt(),
    watchConfirmWarehouseImportReceipt(),
    watchRejectWarehouseImportReceipt(),
    watchGetAttribuiteBusinessTypeDetails(),
    watchImportWarehouse(),
    watchConfirmWarehouseImportEBS(),
    watchCancelWarehouseImportEBS(),
    watchReturnWarehouseImportReceipt(),
    watchUpdateHeaderWarehouseImportReceipt(),
    watchReceiveWarehouse(),
    watchStoredWarehouse(),
    watchsuggestLocators(),
    watchSeenToDriver(),
    watchRetry(),
  ])
}
