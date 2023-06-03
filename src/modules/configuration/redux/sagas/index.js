import { all } from 'redux-saga/effects'

import watchChangePassword from './user-info/change-password'
import watchGetUserInfo from './user-info/get-user-info'
import watchUpdateUserInfo from './user-info/update-user-info'

/**
 * Root saga
 */
export default function* sagas() {
  yield all([
    //user-info
    watchGetUserInfo(),
    watchUpdateUserInfo(),
    watchChangePassword(),
  ])
}
