export const GET_NOTIFICATIONS_START = 'GET_NOTIFICATIONS_START'
export const GET_NOTIFICATIONS_SUCCESS = 'GET_NOTIFICATIONS_SUCCESS'
export const GET_NOTIFICATIONS_FAILED = 'GET_NOTIFICATIONS_FAILED'

export const SEEN_ONE_NOTIFICATION_START = 'SEEN_ONE_NOTIFICATION_START'
export const SEEN_ONE_NOTIFICATION_SUCCESS = 'SEEN_ONE_NOTIFICATION_SUCCESS'
export const SEEN_ONE_NOTIFICATION_FAILED = 'SEEN_ONE_NOTIFICATION_FAILED'

export const SEEN_ALL_NOTIFICATIONS_START = 'SEEN_ALL_NOTIFICATIONS_START'
export const SEEN_ALL_NOTIFICATIONS_SUCCESS = 'SEEN_ALL_NOTIFICATIONS_SUCCESS'
export const SEEN_ALL_NOTIFICATIONS_FAILED = 'SEEN_ALL_NOTIFICATIONS_FAILED'

export const ADD_NOTIFICATION = 'ADD_NOTIFICATION'
export const CHANGE_NOTIFICATION_ACTION_TO_VIEW =
  'CHANGE_NOTIFICATION_ACTION_TO_VIEW'

export const CHANGE_NOTIFICATION_STATUS_START =
  'CHANGE_NOTIFICATION_STATUS_START'
export const CHANGE_NOTIFICATION_STATUS_SUCCESS =
  'CHANGE_NOTIFICATION_STATUS_SUCCESS'
export const CHANGE_NOTIFICATION_STATUS_FAILED =
  'CHANGE_NOTIFICATION_STATUS_FAILED'

export function getNotifications(payload, onSuccess, onError) {
  return {
    type: GET_NOTIFICATIONS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getNotificationsSuccess(payload) {
  return {
    type: GET_NOTIFICATIONS_SUCCESS,
    payload: payload,
  }
}

export function getNotificationsFailed() {
  return {
    type: GET_NOTIFICATIONS_FAILED,
  }
}

export function seenOneNotification(payload, onSuccess, onError) {
  return {
    type: SEEN_ONE_NOTIFICATION_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function seenOneNotificationSuccess(payload) {
  return {
    type: SEEN_ONE_NOTIFICATION_SUCCESS,
    payload: payload,
  }
}

export function seenOneNotificationFailed() {
  return {
    type: SEEN_ONE_NOTIFICATION_FAILED,
  }
}

export function seenAllNotifications(onSuccess, onError) {
  return {
    type: SEEN_ALL_NOTIFICATIONS_START,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function seenAllNotificationsSuccess(payload) {
  return {
    type: SEEN_ALL_NOTIFICATIONS_SUCCESS,
    payload: payload,
  }
}

export function seenAllNotificationsFailed() {
  return {
    type: SEEN_ALL_NOTIFICATIONS_FAILED,
  }
}

export function addNotification(payload) {
  return {
    type: ADD_NOTIFICATION,
    payload: payload,
  }
}

export function changeNotificationActionToView(payload) {
  return {
    type: CHANGE_NOTIFICATION_ACTION_TO_VIEW,
    payload: payload,
  }
}

export function changeNotificationStatus(payload, onSuccess, onError) {
  return {
    type: CHANGE_NOTIFICATION_STATUS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function changeNotificationStatusSuccess(payload) {
  return {
    type: CHANGE_NOTIFICATION_STATUS_SUCCESS,
    payload: payload,
  }
}

export function changeNotificationStatusFailed() {
  return {
    type: CHANGE_NOTIFICATION_STATUS_FAILED,
  }
}

export default {
  getNotifications,
  getNotificationsSuccess,
  getNotificationsFailed,
  seenOneNotification,
  seenOneNotificationSuccess,
  seenOneNotificationFailed,
  seenAllNotifications,
  seenAllNotificationsSuccess,
  seenAllNotificationsFailed,
  addNotification,
  changeNotificationActionToView,
  changeNotificationStatus,
  changeNotificationStatusSuccess,
  changeNotificationStatusFailed,
}
