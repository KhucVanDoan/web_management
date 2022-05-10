import { all } from 'redux-saga/effects'

import watchGetAppStore from './app-store'
import {
  watchGetNotifications,
  watchSeenOneNotification,
  watchSeenAllNotifications,
} from './notification'

/**
 * Root saga
 */
export default function* sagas() {
  yield all([
    watchGetAppStore(),
    watchGetNotifications(),
    watchSeenOneNotification(),
    watchSeenAllNotifications(),
  ])
}
