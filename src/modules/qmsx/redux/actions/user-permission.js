export const UPDATE_USER_PERMISSION_START = 'QMSX_UPDATE_USER_PERMISSION_START'
export const UPDATE_USER_PERMISSION_SUCCESS =
  'QMSX_UPDATE_USER_PERMISSION_SUCCESS'
export const UPDATE_USER_PERMISSION_FAIL = 'QMSX_UPDATE_USER_PERMISSION_FAIL'

export const GET_USER_PERMISSION_DETAILS_START =
  'QMSX_GET_USER_PERMISSION_DETAILS_START'
export const GET_USER_PERMISSION_DETAILS_SUCCESS =
  'QMSX_GET_USER_PERMISSION_DETAILS_SUCCESS'
export const GET_USER_PERMISSION_DETAILS_FAIL =
  'QMSX_GET_USER_PERMISSION_DETAILS_FAIL'

export const RESET_USER_PERMISSION_DETAILS_STATE =
  'QMSX_RESET_USER_PERMISSION_DETAILS_STATE'

/**
 * Update user permission
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateUserPermission(payload, onSuccess, onError) {
  return {
    type: UPDATE_USER_PERMISSION_START,
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
export function updateUserPermissionSuccess(payload) {
  return {
    type: UPDATE_USER_PERMISSION_SUCCESS,
    payload: payload,
  }
}

/**
 * Update user permission fail action
 * @returns {object}
 */
export function updateUserPermissionFail() {
  return {
    type: UPDATE_USER_PERMISSION_FAIL,
  }
}

export function getUserPermissionDetails(payload, onSuccess, onError) {
  return {
    type: GET_USER_PERMISSION_DETAILS_START,
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
export function getUserPermissionDetailsSuccess(payload) {
  return {
    type: GET_USER_PERMISSION_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get user permission details by id fail action
 * @returns {object}
 */
export function getUserPermissionDetailsFail() {
  return {
    type: GET_USER_PERMISSION_DETAILS_FAIL,
  }
}

export function resetUserPermissionDetailsState() {
  return {
    type: RESET_USER_PERMISSION_DETAILS_STATE,
  }
}

export default {
  updateUserPermission,
  updateUserPermissionSuccess,
  updateUserPermissionFail,
  getUserPermissionDetails,
  getUserPermissionDetailsSuccess,
  getUserPermissionDetailsFail,
  resetUserPermissionDetailsState,
}
