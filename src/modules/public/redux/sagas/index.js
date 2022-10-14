import { all } from 'redux-saga/effects'

import watchActiveLicense from './license/active-license'

/**
 * Root saga
 */
export default function* sagas() {
  yield all([watchActiveLicense()])
}
