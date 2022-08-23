export const GET_MANAGEMENT_UNIT_START = 'WMSX_GET_MANAGEMENT_UNIT_START'
export const GET_MANAGEMENT_UNIT_SUCCESS = 'WMSX_GET_MANAGEMENT_UNIT_SUCCESS'
export const GET_MANAGEMENT_UNIT_FAILED = 'WMSX_GET_MANAGEMENT_UNIT_FAILED'

export const SEARCH_MANAGEMENT_UNIT_START = 'WMSX_SEARCH_MANAGEMENT_UNIT_START'
export const SEARCH_MANAGEMENT_UNIT_SUCCESS =
  'WMSX_SEARCH_MANAGEMENT_UNIT_SUCCESS'
export const SEARCH_MANAGEMENT_UNIT_FAILED =
  'WMSX_SEARCH_MANAGEMENT_UNIT_FAILED'

export const CREATE_MANAGEMENT_UNIT_START = 'WMSX_CREATE_MANAGEMENT_UNIT_START'
export const CREATE_MANAGEMENT_UNIT_SUCCESS =
  'WMSX_CREATE_MANAGEMENT_UNIT_SUCCESS'
export const CREATE_MANAGEMENT_UNIT_FAILED =
  'WMSX_CREATE_MANAGEMENT_UNIT_FAILED'

export const UPDATE_MANAGEMENT_UNIT_START = 'WMSX_UPDATE_MANAGEMENT_UNIT_START'
export const UPDATE_MANAGEMENT_UNIT_SUCCESS =
  'WMSX_UPDATE_MANAGEMENT_UNIT_SUCCESS'
export const UPDATE_MANAGEMENT_UNIT_FAILED =
  'WMSX_UPDATE_MANAGEMENT_UNIT_FAILED'

export const DELETE_MANAGEMENT_UNIT_START = 'WMSX_DELETE_MANAGEMENT_UNIT_START'
export const DELETE_MANAGEMENT_UNIT_SUCCESS =
  'WMSX_DELETE_MANAGEMENT_UNIT_SUCCESS'
export const DELETE_MANAGEMENT_UNIT_FAILED =
  'WMSX_DELETE_MANAGEMENT_UNIT_FAILED'

export const RESET_MANAGEMENT_UNIT_STATE = 'WMSX_RESET_MANAGEMENT_UNIT_STATE'

/**
 * Search user
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchManagementUnit(payload, onSuccess, onError) {
  return {
    type: SEARCH_MANAGEMENT_UNIT_START,
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
export function searchManagementUnitSuccess(payload) {
  return {
    type: SEARCH_MANAGEMENT_UNIT_SUCCESS,
    payload: payload,
  }
}

/**
 * Search user failed action
 * @returns {object}
 */
export function searchManagementUnitFailed() {
  return {
    type: SEARCH_MANAGEMENT_UNIT_FAILED,
  }
}

/**
 * Create user
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createManagementUnit(payload, onSuccess, onError) {
  return {
    type: CREATE_MANAGEMENT_UNIT_START,
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
export function createManagementUnitSuccess(payload) {
  return {
    type: CREATE_MANAGEMENT_UNIT_SUCCESS,
    payload: payload,
  }
}

/**
 * Create user failed action
 * @returns {object}
 */
export function createManagementUnitFailed() {
  return {
    type: CREATE_MANAGEMENT_UNIT_FAILED,
  }
}

/**
 * Update user
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateManagementUnit(payload, onSuccess, onError) {
  return {
    type: UPDATE_MANAGEMENT_UNIT_START,
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
export function updateManagementUnitSuccess(payload) {
  return {
    type: UPDATE_MANAGEMENT_UNIT_SUCCESS,
    payload: payload,
  }
}

/**
 * Update user failed action
 * @returns {object}
 */
export function updateManagementUnitFailed() {
  return {
    type: UPDATE_MANAGEMENT_UNIT_FAILED,
  }
}
/**
 * Delete user
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteManagementUnit(payload, onSuccess, onError) {
  return {
    type: DELETE_MANAGEMENT_UNIT_START,
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
export function deleteManagementUnitSuccess(payload) {
  return {
    type: DELETE_MANAGEMENT_UNIT_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete user failed action
 * @returns {object}
 */
export function deleteManagementUnitFailed() {
  return {
    type: DELETE_MANAGEMENT_UNIT_FAILED,
  }
}

/**
 * Get user details
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getDetailManagementUnitById(payload, onSuccess, onError) {
  return {
    type: GET_MANAGEMENT_UNIT_START,
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
export function getDetailManagementUnitByIdSuccess(payload) {
  return {
    type: GET_MANAGEMENT_UNIT_SUCCESS,
    payload: payload,
  }
}

/**
 * Get user details by id failed action
 * @returns {object}
 */
export function getDetailManagementUnitByIdFailed() {
  return {
    type: GET_MANAGEMENT_UNIT_FAILED,
  }
}

export function resetManagementUnitState() {
  return {
    type: RESET_MANAGEMENT_UNIT_STATE,
  }
}

export default {
  searchManagementUnit,
  searchManagementUnitSuccess,
  searchManagementUnitFailed,
  createManagementUnit,
  createManagementUnitSuccess,
  createManagementUnitFailed,
  updateManagementUnit,
  updateManagementUnitSuccess,
  updateManagementUnitFailed,
  deleteManagementUnit,
  deleteManagementUnitSuccess,
  deleteManagementUnitFailed,
  getDetailManagementUnitById,
  getDetailManagementUnitByIdSuccess,
  getDetailManagementUnitByIdFailed,
  resetManagementUnitState,
}