export const SEARCH_CUSTOMER_LEVELS_START = 'WMSX_SEARCH_CUSTOMER_LEVELS_START'
export const SEARCH_CUSTOMER_LEVELS_SUCCESS =
  'WMSX_SEARCH_CUSTOMER_LEVELS_SUCCESS'
export const SEARCH_CUSTOMER_LEVELS_FAILED =
  'WMSX_SEARCH_CUSTOMER_LEVELS_FAILED'

export const CREATE_CUSTOMER_LEVEL_START = 'WMSX_CREATE_CUSTOMER_LEVEL_START'
export const CREATE_CUSTOMER_LEVEL_SUCCESS =
  'WMSX_CREATE_CUSTOMER_LEVEL_SUCCESS'
export const CREATE_CUSTOMER_LEVEL_FAILED = 'WMSX_CREATE_CUSTOMER_LEVEL_FAILED'

export const UPDATE_CUSTOMER_LEVEL_START = 'WMSX_UPDATE_CUSTOMER_LEVEL_START'
export const UPDATE_CUSTOMER_LEVEL_SUCCESS =
  'WMSX_UPDATE_CUSTOMER_LEVEL_SUCCESS'
export const UPDATE_CUSTOMER_LEVEL_FAILED = 'WMSX_UPDATE_CUSTOMER_LEVEL_FAILED'

export const DELETE_CUSTOMER_LEVEL_START = 'WMSX_DELETE_CUSTOMER_LEVEL_START'
export const DELETE_CUSTOMER_LEVEL_SUCCESS =
  'WMSX_DELETE_CUSTOMER_LEVEL_SUCCESS'
export const DELETE_CUSTOMER_LEVEL_FAILED = 'WMSX_DELETE_CUSTOMER_LEVEL_FAILED'

export const GET_CUSTOMER_LEVEL_DETAILS_START =
  'WMSX_GET_CUSTOMER_LEVEL_DETAILS_START'
export const GET_CUSTOMER_LEVEL_DETAILS_SUCCESS =
  'WMSX_GET_CUSTOMER_LEVEL_DETAILS_SUCCESS'
export const GET_CUSTOMER_LEVEL_DETAILS_FAILED =
  'WMSX_GET_CUSTOMER_LEVEL_DETAILS_FAILED'

export const IMPORT_CUSTOMER_LEVEL_START = 'WMSX_IMPORT_CUSTOMER_LEVEL_START'
export const IMPORT_CUSTOMER_LEVEL_SUCCESS =
  'WMSX_IMPORT_CUSTOMER_LEVEL_SUCCESS'
export const IMPORT_CUSTOMER_LEVEL_FAILED = 'WMSX_IMPORT_CUSTOMER_LEVEL_FAILED'

export const CONFIRM_CUSTOMER_LEVEL_SUCCESS =
  'WMSX_CONFIRM_CUSTOMER_LEVEL_SUCCESS'
export const CONFIRM_CUSTOMER_LEVEL_START = 'WMSX_CONFIRM_CUSTOMER_LEVEL_START'
export const CONFIRM_CUSTOMER_LEVEL_FAILED =
  'WMSX_CONFIRM_CUSTOMER_LEVEL_FAILED'

export const RESET_CUSTOMER_LEVEL_DETAILS_STATE =
  'WMSX_RESET_CUSTOMER_LEVEL_DETAILS_STATE'

/**
 * Search user
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchCustomerLevels(payload, onSuccess, onError) {
  return {
    type: SEARCH_CUSTOMER_LEVELS_START,
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
export function searchCustomerLevelsSuccess(payload) {
  return {
    type: SEARCH_CUSTOMER_LEVELS_SUCCESS,
    payload: payload,
  }
}

/**
 * Search user failed action
 * @returns {object}
 */
export function searchCustomerLevelsFailed() {
  return {
    type: SEARCH_CUSTOMER_LEVELS_FAILED,
  }
}

/**
 * Create user
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createCustomerLevel(payload, onSuccess, onError) {
  return {
    type: CREATE_CUSTOMER_LEVEL_START,
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
export function createCustomerLevelSuccess(payload) {
  return {
    type: CREATE_CUSTOMER_LEVEL_SUCCESS,
    payload: payload,
  }
}

/**
 * Create user failed action
 * @returns {object}
 */
export function createCustomerLevelFailed() {
  return {
    type: CREATE_CUSTOMER_LEVEL_FAILED,
  }
}

/**
 * Update user
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateCustomerLevel(payload, onSuccess, onError) {
  return {
    type: UPDATE_CUSTOMER_LEVEL_START,
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
export function updateCustomerLevelSuccess(payload) {
  return {
    type: UPDATE_CUSTOMER_LEVEL_SUCCESS,
    payload: payload,
  }
}

/**
 * Update user failed action
 * @returns {object}
 */
export function updateCustomerLevelFailed() {
  return {
    type: UPDATE_CUSTOMER_LEVEL_FAILED,
  }
}
/**
 * Delete user
 * @param {int} userId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteCustomerLevel(userId, onSuccess, onError) {
  return {
    type: DELETE_CUSTOMER_LEVEL_START,
    payload: userId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete user success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteCustomerLevelSuccess(payload) {
  return {
    type: DELETE_CUSTOMER_LEVEL_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete user failed action
 * @returns {object}
 */
export function deleteCustomerLevelFailed() {
  return {
    type: DELETE_CUSTOMER_LEVEL_FAILED,
  }
}

/**
 * Get user details
 * @param {int} userId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getCustomerLevelDetailsById(id, onSuccess, onError) {
  return {
    type: GET_CUSTOMER_LEVEL_DETAILS_START,
    payload: +id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get user details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getCustomerLevelDetailsByIdSuccess(payload) {
  return {
    type: GET_CUSTOMER_LEVEL_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get user details by id failed action
 * @returns {object}
 */
export function getCustomerLevelDetailsByIdFailed() {
  return {
    type: GET_CUSTOMER_LEVEL_DETAILS_FAILED,
  }
}

/**
 * import customer level
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function importCustomerLevel(payload, onSuccess, onError) {
  return {
    type: IMPORT_CUSTOMER_LEVEL_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * import customer level success
 * @param {*} payload
 * @returns {object}
 */
export function importCustomerLevelSuccess(payload) {
  return {
    type: IMPORT_CUSTOMER_LEVEL_SUCCESS,
    payload: payload,
  }
}

/**
 * import customer level failed
 * @returns {object}
 */
export function importCustomerLevelFailed() {
  return {
    type: IMPORT_CUSTOMER_LEVEL_FAILED,
  }
}

export function confirmCustomerLevelById(ccustomerLevelId, onSuccess, onError) {
  return {
    type: CONFIRM_CUSTOMER_LEVEL_START,
    payload: ccustomerLevelId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get confirm purchased order by id success action
 * @param {*} payload
 * @returns {object}
 */
export function confirmCustomerLevelByIdSuccess(payload) {
  return {
    type: CONFIRM_CUSTOMER_LEVEL_SUCCESS,
    payload: payload,
  }
}

/**
 * Get confirm purchased order by id failed action
 * @returns {object}
 */
export function confirmCustomerLevelByIdFailed() {
  return {
    type: CONFIRM_CUSTOMER_LEVEL_FAILED,
  }
}

export function resetCustomerLevelDetailsState() {
  return {
    type: RESET_CUSTOMER_LEVEL_DETAILS_STATE,
  }
}

export default {
  searchCustomerLevels,
  searchCustomerLevelsSuccess,
  searchCustomerLevelsFailed,
  createCustomerLevel,
  createCustomerLevelSuccess,
  createCustomerLevelFailed,
  updateCustomerLevel,
  updateCustomerLevelSuccess,
  updateCustomerLevelFailed,
  deleteCustomerLevel,
  deleteCustomerLevelSuccess,
  deleteCustomerLevelFailed,
  getCustomerLevelDetailsById,
  getCustomerLevelDetailsByIdSuccess,
  getCustomerLevelDetailsByIdFailed,
  importCustomerLevel,
  importCustomerLevelSuccess,
  importCustomerLevelFailed,
  confirmCustomerLevelById,
  confirmCustomerLevelByIdSuccess,
  confirmCustomerLevelByIdFailed,
  resetCustomerLevelDetailsState,
}
