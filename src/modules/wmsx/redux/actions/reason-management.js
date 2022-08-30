export const GET_REASON_MANAGEMENT_START = 'WMSX_GET_REASON_MANAGEMENT_START'
export const GET_REASON_MANAGEMENT_SUCCESS =
  'WMSX_GET_REASON_MANAGEMENT_SUCCESS'
export const GET_REASON_MANAGEMENT_FAILED = 'WMSX_GET_REASON_MANAGEMENT_FAILED'

export const SEARCH_REASON_MANAGEMENT_START =
  'WMSX_SEARCH_REASON_MANAGEMENT_START'
export const SEARCH_REASON_MANAGEMENT_SUCCESS =
  'WMSX_SEARCH_REASON_MANAGEMENT_SUCCESS'
export const SEARCH_REASON_MANAGEMENT_FAILED =
  'WMSX_SEARCH_REASON_MANAGEMENT_FAILED'

export const CREATE_REASON_MANAGEMENT_START =
  'WMSX_CREATE_REASON_MANAGEMENT_START'
export const CREATE_REASON_MANAGEMENT_SUCCESS =
  'WMSX_CREATE_REASON_MANAGEMENT_SUCCESS'
export const CREATE_REASON_MANAGEMENT_FAILED =
  'WMSX_CREATE_REASON_MANAGEMENT_FAILED'

export const UPDATE_REASON_MANAGEMENT_START =
  'WMSX_UPDATE_REASON_MANAGEMENT_START'
export const UPDATE_REASON_MANAGEMENT_SUCCESS =
  'WMSX_UPDATE_REASON_MANAGEMENT_SUCCESS'
export const UPDATE_REASON_MANAGEMENT_FAILED =
  'WMSX_UPDATE_REASON_MANAGEMENT_FAILED'

export const DELETE_REASON_MANAGEMENT_START =
  'WMSX_DELETE_REASON_MANAGEMENT_START'
export const DELETE_REASON_MANAGEMENT_SUCCESS =
  'WMSX_DELETE_REASON_MANAGEMENT_SUCCESS'
export const DELETE_REASON_MANAGEMENT_FAILED =
  'WMSX_DELETE_REASON_MANAGEMENT_FAILED'

export const WMSX_CONFIRM_REASON_MANAGEMENT_START =
  'WMSX_CONFIRM_REASON_MANAGEMENT_START'
export const WMSX_CONFIRM_REASON_MANAGEMENT_SUCCESS =
  'WMSX_CONFIRM_REASON_MANAGEMENT_SUCCESS'
export const WMSX_CONFIRM_REASON_MANAGEMENT_FAILED =
  'WMSX_CONFIRM_REASON_MANAGEMENT_FAILED'

export const WMSX_REJECT_REASON_MANAGEMENT_START =
  'WMSX_REJECT_REASON_MANAGEMENT_START'
export const WMSX_REJECT_REASON_MANAGEMENT_SUCCESS =
  'WMSX_REJECT_REASON_MANAGEMENT_SUCCESS'
export const WMSX_REJECT_REASON_MANAGEMENT_FAILED =
  'WMSX_REJECT_REASON_MANAGEMENT_FAILED'
export const RESET_REASON_MANAGEMENT_STATE =
  'WMSX_RESET_REASON_MANAGEMENT_STATE'

/**
 * Search user
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchReasonManagement(payload, onSuccess, onError) {
  return {
    type: SEARCH_REASON_MANAGEMENT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search user success action
 * @param {*} payload
 * @returns {object}
 */
export function searchReasonManagementSuccess(payload) {
  return {
    type: SEARCH_REASON_MANAGEMENT_SUCCESS,
    payload: payload,
  }
}

/**
 * Search user failed action
 * @returns {object}
 */
export function searchReasonManagementFailed() {
  return {
    type: SEARCH_REASON_MANAGEMENT_FAILED,
  }
}

/**
 * Create user
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createReasonManagement(payload, onSuccess, onError) {
  return {
    type: CREATE_REASON_MANAGEMENT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Create user success action
 * @param {*} payload
 * @returns {object}
 */
export function createReasonManagementSuccess(payload) {
  return {
    type: CREATE_REASON_MANAGEMENT_SUCCESS,
    payload: payload,
  }
}

/**
 * Create user failed action
 * @returns {object}
 */
export function createReasonManagementFailed() {
  return {
    type: CREATE_REASON_MANAGEMENT_FAILED,
  }
}

/**
 * Update user
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateReasonManagement(payload, onSuccess, onError) {
  return {
    type: UPDATE_REASON_MANAGEMENT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Update user success action
 * @param {*} payload
 * @returns {object}
 */
export function updateReasonManagementSuccess(payload) {
  return {
    type: UPDATE_REASON_MANAGEMENT_SUCCESS,
    payload: payload,
  }
}

/**
 * Update user failed action
 * @returns {object}
 */
export function updateReasonManagementFailed() {
  return {
    type: UPDATE_REASON_MANAGEMENT_FAILED,
  }
}
/**
 * Delete user
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteReasonManagement(payload, onSuccess, onError) {
  return {
    type: DELETE_REASON_MANAGEMENT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete user success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteReasonManagementSuccess(payload) {
  return {
    type: DELETE_REASON_MANAGEMENT_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete user failed action
 * @returns {object}
 */
export function deleteReasonManagementFailed() {
  return {
    type: DELETE_REASON_MANAGEMENT_FAILED,
  }
}

/**
 * Get user details
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getDetailReasonManagementById(payload, onSuccess, onError) {
  return {
    type: GET_REASON_MANAGEMENT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getDetailReasonManagementByIdSuccess(payload) {
  return {
    type: GET_REASON_MANAGEMENT_SUCCESS,
    payload: payload,
  }
}

export function getDetailReasonManagementByIdFailed() {
  return {
    type: GET_REASON_MANAGEMENT_FAILED,
  }
}

export function confirmReasonManagementById(
  ReasonManagementId,
  onSuccess,
  onError,
) {
  return {
    type: WMSX_CONFIRM_REASON_MANAGEMENT_START,
    payload: ReasonManagementId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function confirmReasonManagementByIdSuccess(payload) {
  return {
    type: WMSX_CONFIRM_REASON_MANAGEMENT_SUCCESS,
    payload: payload,
  }
}

export function confirmReasonManagementByIdFailed() {
  return {
    type: WMSX_CONFIRM_REASON_MANAGEMENT_FAILED,
  }
}

export function rejectReasonManagementById(
  ReasonManagementId,
  onSuccess,
  onError,
) {
  return {
    type: WMSX_REJECT_REASON_MANAGEMENT_START,
    payload: ReasonManagementId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function rejectReasonManagementByIdSuccess(payload) {
  return {
    type: WMSX_REJECT_REASON_MANAGEMENT_SUCCESS,
    payload: payload,
  }
}

export function rejectReasonManagementByIdFailed() {
  return {
    type: WMSX_REJECT_REASON_MANAGEMENT_FAILED,
  }
}
export function resetReasonManagementState() {
  return {
    type: RESET_REASON_MANAGEMENT_STATE,
  }
}

export default {
  searchReasonManagement,
  searchReasonManagementSuccess,
  searchReasonManagementFailed,
  createReasonManagement,
  createReasonManagementSuccess,
  createReasonManagementFailed,
  updateReasonManagement,
  updateReasonManagementSuccess,
  updateReasonManagementFailed,
  deleteReasonManagement,
  deleteReasonManagementSuccess,
  deleteReasonManagementFailed,
  getDetailReasonManagementById,
  getDetailReasonManagementByIdSuccess,
  getDetailReasonManagementByIdFailed,
  confirmReasonManagementById,
  confirmReasonManagementByIdFailed,
  confirmReasonManagementByIdSuccess,
  rejectReasonManagementById,
  rejectReasonManagementByIdSuccess,
  rejectReasonManagementByIdFailed,
  resetReasonManagementState,
}
