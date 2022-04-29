import { all } from 'redux-saga/effects'

import watchCreateDetail from './define-detail/create-detail'
import watchDeleteDetail from './define-detail/delete-detail'
import watchGetDetailDetails from './define-detail/get-detail-details'
import watchGetDetails from './define-detail/get-details'
import watchSearchDetails from './define-detail/search-detail'
import watchUpdateDetail from './define-detail/update-detail'
import watchCreateWarehouseSetting from './warehouse-setting/create-warehouse-setting'
import watchDeleteWarehouseSetting from './warehouse-setting/delete-warehouse-setting'
import watchGetWarehouseSettingDetails from './warehouse-setting/get-detail-warehouse-setting'
import watchSearchWarehouseSetting from './warehouse-setting/search-warehouse-setting'
import watchUpdateWarehouseSetting from './warehouse-setting/update-warehouse-setting'

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
  ])
}
