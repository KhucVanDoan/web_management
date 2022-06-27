import { all } from 'redux-saga/effects'

import watchGetAllFactoryList from './common/get-all-factory-list'
import watchGetListMaintenanceTeam from './common/get-maintencance-list'
import watchGetMo from './common/get-mo-list'
import watchGetSummary from './dashboard'
/**
 * Root saga
 */
export default function* sagas() {
  yield all([
    //Common
    watchGetAllFactoryList(),
    watchGetListMaintenanceTeam(),
    watchGetMo(),
    // Dashboard
    watchGetSummary(),
  ])
}
