import { fork } from 'redux-saga/effects'

import authSagas from '~/modules/auth/redux/sagas'
import configurationSagas from '~/modules/configuration/redux/sagas'
import databaseSagas from '~/modules/database/redux/sagas'
import mesxSagas from '~/modules/mesx/redux/sagas'
import mmsxSagas from '~/modules/mmsx/redux/sagas'
import qmsxSagas from '~/modules/qmsx/redux/sagas'
import sharedSagas from '~/modules/shared/redux/sagas'
import wmsxSagas from '~/modules/wmsx/redux/sagas'

export default function* rootSagas() {
  yield fork(authSagas)
  yield fork(sharedSagas)
  yield fork(mesxSagas)
  yield fork(qmsxSagas)
  yield fork(wmsxSagas)
  yield fork(configurationSagas)
  yield fork(databaseSagas)
  yield fork(mmsxSagas)
}
