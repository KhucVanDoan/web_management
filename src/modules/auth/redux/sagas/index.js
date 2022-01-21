import { all } from 'redux-saga/effects'
// app-init
import watchGetAppStore from './app-store'

import watchLogin from './login'
import watchLogout from './logout'

/**
 * Root saga
 */
export default function* sagas() {
  yield all([watchGetAppStore(), watchLogin(), watchLogout()])
}
