export const WMSX_SEARCH_INVENTORY_LIMITS_START =
  'WMSX_SEARCH_INVENTORY_LIMITS_START'
export const WMSX_SEARCH_INVENTORY_LIMITS_SUCCESS =
  'WMSX_SEARCH_INVENTORY_LIMITS_SUCCESS'
export const WMSX_SEARCH_INVENTORY_LIMITS_FAILED =
  'WMSX_SEARCH_INVENTORY_LIMITS_FAILED'

export const WMSX_CREATE_INVENTORY_LIMIT_START =
  'WMSX_CREATE_INVENTORY_LIMIT_START'
export const WMSX_CREATE_INVENTORY_LIMIT_SUCCESS =
  'WMSX_CREATE_INVENTORY_LIMIT_SUCCESS'
export const WMSX_CREATE_INVENTORY_LIMIT_FAILED =
  'WMSX_CREATE_INVENTORY_LIMIT_FAILED'

export const WMSX_UPDATE_INVENTORY_LIMIT_START =
  'WMSX_UPDATE_INVENTORY_LIMIT_START'
export const WMSX_UPDATE_INVENTORY_LIMIT_SUCCESS =
  'WMSX_UPDATE_INVENTORY_LIMIT_SUCCESS'
export const WMSX_UPDATE_INVENTORY_LIMIT_FAILED =
  'WMSX_UPDATE_INVENTORY_LIMIT_FAILED'

export const WMSX_DELETE_INVENTORY_LIMIT_START =
  'WMSX_DELETE_INVENTORY_LIMIT_START'
export const WMSX_DELETE_INVENTORY_LIMIT_SUCCESS =
  'WMSX_DELETE_INVENTORY_LIMIT_SUCCESS'
export const WMSX_DELETE_INVENTORY_LIMIT_FAILED =
  'WMSX_DELETE_INVENTORY_LIMIT_FAILED'

export const WMSX_GET_INVENTORY_LIMIT_DETAILS_START =
  'WMSX_GET_INVENTORY_LIMIT_DETAILS_START'
export const WMSX_GET_INVENTORY_LIMIT_DETAILS_SUCCESS =
  'WMSX_GET_INVENTORY_LIMIT_DETAILS_SUCCESS'
export const WMSX_GET_INVENTORY_LIMIT_DETAILS_FAILED =
  'WMSX_GET_INVENTORY_LIMIT_DETAILS_FAILED'
export const WMSX_RESET_INVENTORY_LIMIT_DETAIL_STATE =
  'WMSX_RESET_INVENTORY_LIMIT_DETAIL_STATE'

/**
 * Search user
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchInventoryLimits(payload, onSuccess, onError) {
  return {
    type: WMSX_SEARCH_INVENTORY_LIMITS_START,
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
export function searchInventoryLimitsSuccess(payload) {
  return {
    type: WMSX_SEARCH_INVENTORY_LIMITS_SUCCESS,
    payload: payload,
  }
}

/**
 * Search user failed action
 * @returns {object}
 */
export function searchInventoryLimitsFailed() {
  return {
    type: WMSX_SEARCH_INVENTORY_LIMITS_FAILED,
  }
}

/**
 * Create user
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createInventoryLimit(payload, onSuccess, onError) {
  return {
    type: WMSX_CREATE_INVENTORY_LIMIT_START,
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
export function createInventoryLimitSuccess(payload) {
  return {
    type: WMSX_CREATE_INVENTORY_LIMIT_SUCCESS,
    payload: payload,
  }
}

/**
 * Create user failed action
 * @returns {object}
 */
export function createInventoryLimitFailed() {
  return {
    type: WMSX_CREATE_INVENTORY_LIMIT_FAILED,
  }
}

/**
 * Update user
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateInventoryLimit(payload, onSuccess, onError) {
  return {
    type: WMSX_UPDATE_INVENTORY_LIMIT_START,
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
export function updateInventoryLimitSuccess(payload) {
  return {
    type: WMSX_UPDATE_INVENTORY_LIMIT_SUCCESS,
    payload: payload,
  }
}

/**
 * Update user failed action
 * @returns {object}
 */
export function updateInventoryLimitFailed() {
  return {
    type: WMSX_UPDATE_INVENTORY_LIMIT_FAILED,
  }
}
/**
 * Delete user
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteInventoryLimit(payload, onSuccess, onError) {
  return {
    type: WMSX_DELETE_INVENTORY_LIMIT_START,
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
export function deleteInventoryLimitSuccess(payload) {
  return {
    type: WMSX_DELETE_INVENTORY_LIMIT_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete user failed action
 * @returns {object}
 */
export function deleteInventoryLimitFailed() {
  return {
    type: WMSX_DELETE_INVENTORY_LIMIT_FAILED,
  }
}

/**
 * Get user details
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getInventoryLimitDetailsById(payload, onSuccess, onError) {
  return {
    type: WMSX_GET_INVENTORY_LIMIT_DETAILS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get user details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getInventoryLimitDetailsByIdSuccess(payload) {
  return {
    type: WMSX_GET_INVENTORY_LIMIT_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get user details by id failed action
 * @returns {object}
 */
export function getInventoryLimitDetailsByIdFailed() {
  return {
    type: WMSX_GET_INVENTORY_LIMIT_DETAILS_FAILED,
  }
}

export function resetInventoryLimitState() {
  return {
    type: WMSX_RESET_INVENTORY_LIMIT_DETAIL_STATE,
  }
}

export default {
  searchInventoryLimits,
  searchInventoryLimitsSuccess,
  searchInventoryLimitsFailed,
  deleteInventoryLimit,
  deleteInventoryLimitSuccess,
  deleteInventoryLimitFailed,
  getInventoryLimitDetailsById,
  getInventoryLimitDetailsByIdFailed,
  getInventoryLimitDetailsByIdSuccess,
  createInventoryLimit,
  createInventoryLimitSuccess,
  createInventoryLimitFailed,
  updateInventoryLimit,
  updateInventoryLimitSuccess,
  updateInventoryLimitFailed,
  resetInventoryLimitState,
}
