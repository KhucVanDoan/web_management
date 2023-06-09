import { fork } from 'redux-saga/effects'

import authSagas from '~/modules/auth/redux/sagas'
import configurationSagas from '~/modules/configuration/redux/sagas'
import mesxSagas from '~/modules/mesx/redux/sagas'
import publicSagas from '~/modules/public/redux/sagas'
import sharedSagas from '~/modules/shared/redux/sagas'
import wmsxSagas from '~/modules/wmsx/redux/sagas'

export default function* rootSagas() {
  yield fork(authSagas)
  yield fork(sharedSagas)
  yield fork(mesxSagas)
  yield fork(wmsxSagas)
  yield fork(configurationSagas)
  yield fork(publicSagas)
}
