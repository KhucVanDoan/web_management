import { fork } from 'redux-saga/effects'

import authSagas from '~/modules/auth/redux/sagas'
import mesxSagas from '~/modules/mesx/redux/sagas'
import qmsxSagas from '~/modules/qmsx/redux/sagas'
import wmsxSagas from '~/modules/wmsx/redux/sagas'

export default function* rootSagas() {
  yield fork(authSagas)
  yield fork(mesxSagas)
  yield fork(qmsxSagas)
  yield fork(wmsxSagas)
}
