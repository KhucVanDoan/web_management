import { fork } from 'redux-saga/effects'

import authSagas from '~/modules/auth/redux/sagas'
import mesxSagas from '~/modules/mesx/redux/sagas'

export default function* rootSagas() {
  yield fork(authSagas)
  yield fork(mesxSagas)
}
