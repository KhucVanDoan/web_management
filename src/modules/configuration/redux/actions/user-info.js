export const UPDATE_USER_INFO_START = 'CONFIGURATION_UPDATE_USER_INFO_START'
export const UPDATE_USER_INFO_SUCCESS = 'CONFIGURATION_UPDATE_USER_INFO_SUCCESS'
export const UPDATE_USER_INFO_FAILED = 'CONFIGURATION_UPDATE_USER_INFO_FAILED'

export const GET_USER_INFO_START = 'CONFIGURATION_GET_USER_INFO_START'
export const GET_USER_INFO_SUCCESS = 'CONFIGURATION_GET_USER_INFO_SUCCESS'
export const GET_USER_INFO_FAILED = 'CONFIGURATION_GET_USER_INFO_FAILED'

export const CHANGE_PASSWORD_START = 'CONFIGURATION_CHANGE_PASSWORD_START'
export const CHANGE_PASSWORD_SUCCESS = 'CONFIGURATION_CHANGE_PASSWORD_SUCCESS'
export const CHANGE_PASSWORD_FAILED = 'CONFIGURATION_CHANGE_PASSWORD_FAILED'

/**
 * Update user permission
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateUserInfo(payload, onSuccess, onError) {
  return {
    type: UPDATE_USER_INFO_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Update user permission success action
 * @param {*} payload
 * @returns {object}
 */
export function updateUserInfoSuccess(payload) {
  return {
    type: UPDATE_USER_INFO_SUCCESS,
    payload: payload,
  }
}

/**
 * Update user permission failed action
 * @returns {object}
 */
export function updateUserInfoFailed() {
  return {
    type: UPDATE_USER_INFO_FAILED,
  }
}

export function getUserInfo(payload, onSuccess, onError) {
  return {
    type: GET_USER_INFO_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get user permission details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getUserInfoSuccess(payload) {
  return {
    type: GET_USER_INFO_SUCCESS,
    payload: payload,
  }
}

/**
 * Get user permission details by id failed action
 * @returns {object}
 */
export function getUserInfoFailed() {
  return {
    type: GET_USER_INFO_FAILED,
  }
}

export function changePassword(payload, onSuccess, onError) {
  return {
    type: CHANGE_PASSWORD_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Change password success action
 * @param {*} payload
 * @returns {object}
 */
export function changePasswordSuccess(payload) {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
    payload: payload,
  }
}

/**
 * Change password failed action
 * @returns {object}
 */
export function changePasswordFailed() {
  return {
    type: CHANGE_PASSWORD_FAILED,
  }
}

export default {
  updateUserInfo,
  updateUserInfoSuccess,
  updateUserInfoFailed,
  getUserInfo,
  getUserInfoSuccess,
  getUserInfoFailed,
  changePassword,
  changePasswordFailed,
  changePasswordSuccess,
}
