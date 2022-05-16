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

export function seenAllNotifications(payload, onSuccess, onError) {
  return {
    type: SEEN_ALL_NOTIFICATIONS_START,
    payload: payload,
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
}
