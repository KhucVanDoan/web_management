import { all } from 'redux-saga/effects'

import watchCreateDetail from './define-detail/create-detail'
import watchDeleteDetail from './define-detail/delete-detail'
import watchGetDetailDetails from './define-detail/get-detail-details'
import watchGetDetails from './define-detail/get-details'
import watchSearchDetails from './define-detail/search-detail'
import watchUpdateDetail from './define-detail/update-detail'

/**
 * Root saga
 */
export default function* sagas() {
  yield all([
    // define-detail
    watchCreateDetail(),
    watchDeleteDetail(),
    watchGetDetailDetails(),
    watchGetDetails(),
    watchSearchDetails(),
    watchUpdateDetail(),
  ])
}
