import { all } from 'redux-saga/effects'

import watchLogin from './login'
import watchLogout from './logout'

/**
 * Root saga
 */
export default function* sagas() {
  yield all([watchLogin(), watchLogout()])
}
