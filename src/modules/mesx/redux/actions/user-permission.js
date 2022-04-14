export const UPDATE_USER_PERMISSION_START = 'MESX_UPDATE_USER_PERMISSION_START'
export const UPDATE_USER_PERMISSION_SUCCESS =
  'MESX_UPDATE_USER_PERMISSION_SUCCESS'
export const UPDATE_USER_PERMISSION_FAILED =
  'MESX_UPDATE_USER_PERMISSION_FAILED'

export const GET_USER_PERMISSION_DETAILS_START =
  'MESX_GET_USER_PERMISSION_DETAILS_START'
export const GET_USER_PERMISSION_DETAILS_SUCCESS =
  'MESX_GET_USER_PERMISSION_DETAILS_SUCCESS'
export const GET_USER_PERMISSION_DETAILS_FAILED =
  'MESX_GET_USER_PERMISSION_DETAILS_FAILED'

export const RESET_USER_PERMISSION_DETAILS_STATE =
  'MESX_RESET_USER_PERMISSION_DETAILS_STATE'

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
 * Update user permission failed action
 * @returns {object}
 */
export function updateUserPermissionFailed() {
  return {
    type: UPDATE_USER_PERMISSION_FAILED,
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
 * Get user permission details by id failed action
 * @returns {object}
 */
export function getUserPermissionDetailsFailed() {
  return {
    type: GET_USER_PERMISSION_DETAILS_FAILED,
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
  updateUserPermissionFailed,
  getUserPermissionDetails,
  getUserPermissionDetailsSuccess,
  getUserPermissionDetailsFailed,
  resetUserPermissionDetailsState,
}
