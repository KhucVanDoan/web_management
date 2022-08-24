import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  getNotificationsFailed,
  getNotificationsSuccess,
  seenOneNotificationSuccess,
  seenOneNotificationFailed,
  seenAllNotificationsSuccess,
  seenAllNotificationsFailed,
  changeNotificationStatusSuccess,
  changeNotificationStatusFailed,
  GET_NOTIFICATIONS_START,
  SEEN_ONE_NOTIFICATION_START,
  SEEN_ALL_NOTIFICATIONS_START,
  CHANGE_NOTIFICATION_STATUS_START,
} from '../actions/notification'

const getNotificationsApi = (params) => {
  const uri = `v1/notifications/users-notification`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* getNotifications(action) {
  try {
    const response = yield call(getNotificationsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getNotificationsSuccess(response?.data))
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getNotificationsFailed())
    if (action.onError) {
      yield action.onError()
    }
  }
}

const seenOneApi = (id) => {
  const uri = `v1/notifications/notification-users/${id}/seen`
  return api.put(uri, {})
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* seenOne(action) {
  try {
    const response = yield call(seenOneApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(seenOneNotificationSuccess(response?.data))
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(seenOneNotificationFailed())
    if (action.onError) {
      yield action.onError()
    }
  }
}

const seenAllApi = () => {
  const uri = `v1/notifications/notification-users/seen/all`
  return api.put(uri, {})
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* seenAll(action) {
  try {
    const response = yield call(seenAllApi)

    if (response?.statusCode === 200) {
      yield put(seenAllNotificationsSuccess(response?.data))
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(seenAllNotificationsFailed())
    if (action.onError) {
      yield action.onError()
    }
  }
}

const changeStatusApi = ({ userId, statusNotification = false }) => {
  const uri = `v1/users/${userId}/change-status-notification`
  return api.put(uri, { statusNotification: statusNotification })
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* changeStatus(action) {
  try {
    const response = yield call(changeStatusApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(changeNotificationStatusSuccess(response?.data))
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(changeNotificationStatusFailed())
    if (action.onError) {
      yield action.onError()
    }
    addNotification(error?.message, NOTIFICATION_TYPE.ERROR)
  }
}

/**
 * Watch
 */
export function* watchGetNotifications() {
  yield takeLatest(GET_NOTIFICATIONS_START, getNotifications)
}
export function* watchSeenOneNotification() {
  yield takeLatest(SEEN_ONE_NOTIFICATION_START, seenOne)
}
export function* watchSeenAllNotifications() {
  yield takeLatest(SEEN_ALL_NOTIFICATIONS_START, seenAll)
}
export function* watchChangeNotificationStatus() {
  yield takeLatest(CHANGE_NOTIFICATION_STATUS_START, changeStatus)
}
