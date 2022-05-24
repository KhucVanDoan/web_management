export const WMSX_SEARCH_TYPE_UNITS_START = 'WMSX_SEARCH_TYPE_UNITS_START'
export const WMSX_SEARCH_TYPE_UNITS_SUCCESS = 'WMSX_SEARCH_TYPE_UNITS_SUCCESS'
export const WMSX_SEARCH_TYPE_UNITS_FAILED = 'WMSX_SEARCH_TYPE_UNITS_FAILED'

export const WMSX_CREATE_TYPE_UNIT_START = 'WMSX_CREATE_TYPE_UNIT_START'
export const WMSX_CREATE_TYPE_UNIT_SUCCESS = 'WMSX_CREATE_TYPE_UNIT_SUCCESS'
export const WMSX_CREATE_TYPE_UNIT_FAILED = 'WMSX_CREATE_TYPE_UNIT_FAILED'

export const WMSX_UPDATE_TYPE_UNIT_START = 'WMSX_UPDATE_TYPE_UNIT_START'
export const WMSX_UPDATE_TYPE_UNIT_SUCCESS = 'WMSX_UPDATE_TYPE_UNIT_SUCCESS'
export const WMSX_UPDATE_TYPE_UNIT_FAILED = 'WMSX_UPDATE_TYPE_UNIT_FAILED'

export const WMSX_DELETE_TYPE_UNIT_START = 'WMSX_DELETE_TYPE_UNIT_START'
export const WMSX_DELETE_TYPE_UNIT_SUCCESS = 'WMSX_DELETE_TYPE_UNIT_SUCCESS'
export const WMSX_DELETE_TYPE_UNIT_FAILED = 'WMSX_DELETE_TYPE_UNIT_FAILED'

export const WMSX_GET_TYPE_UNIT_DETAILS_START =
  'WMSX_GET_TYPE_UNIT_DETAILS_START'
export const WMSX_GET_TYPE_UNIT_DETAILS_SUCCESS =
  'WMSX_GET_TYPE_UNIT_DETAILS_SUCCESS'
export const WMSX_GET_TYPE_UNIT_DETAILS_FAILED =
  'WMSX_GET_TYPE_UNIT_DETAILS_FAILED'

export const WMSX_CONFIRM_TYPE_UNIT_START = 'WMSX_CONFIRM_TYPE_UNIT_START'
export const WMSX_CONFIRM_TYPE_UNIT_SUCCESS = 'WMSX_CONFIRM_TYPE_UNIT_SUCCESS'
export const WMSX_CONFIRM_TYPE_UNIT_FAILED = 'WMSX_CONFIRM_TYPE_UNIT_FAILED'

export const WMSX_IMPORT_TYPE_UNIT_START = 'WMSX_IMPORT_TYPE_UNIT_START'
export const WMSX_IMPORT_TYPE_UNIT_SUCCESS = 'WMSX_IMPORT_TYPE_UNIT_SUCCESS'
export const WMSX_IMPORT_TYPE_UNIT_FAILED = 'WMSX_IMPORT_TYPE_UNIT_FAILED'

export const WMSX_RESET_TYPE_UNIT_STATE = 'WMSX_RESET_TYPE_UNIT_STATE'

/**
 * Search user
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchTypeUnits(payload, onSuccess, onError) {
  return {
    type: WMSX_SEARCH_TYPE_UNITS_START,
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
export function searchTypeUnitsSuccess(payload) {
  return {
    type: WMSX_SEARCH_TYPE_UNITS_SUCCESS,
    payload: payload,
  }
}

/**
 * Search user failed action
 * @returns {object}
 */
export function searchTypeUnitsFailed() {
  return {
    type: WMSX_SEARCH_TYPE_UNITS_FAILED,
  }
}

/**
 * Create user
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createTypeUnit(payload, onSuccess, onError) {
  return {
    type: WMSX_CREATE_TYPE_UNIT_START,
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
export function createTypeUnitSuccess(payload) {
  return {
    type: WMSX_CREATE_TYPE_UNIT_SUCCESS,
    payload: payload,
  }
}

/**
 * Create user failed action
 * @returns {object}
 */
export function createTypeUnitFailed() {
  return {
    type: WMSX_CREATE_TYPE_UNIT_FAILED,
  }
}

/**
 * Update user
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateTypeUnit(payload, onSuccess, onError) {
  return {
    type: WMSX_UPDATE_TYPE_UNIT_START,
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
export function updateTypeUnitSuccess(payload) {
  return {
    type: WMSX_UPDATE_TYPE_UNIT_SUCCESS,
    payload: payload,
  }
}

/**
 * Update user failed action
 * @returns {object}
 */
export function updateTypeUnitFailed() {
  return {
    type: WMSX_UPDATE_TYPE_UNIT_FAILED,
  }
}
/**
 * Delete user
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteTypeUnit(payload, onSuccess, onError) {
  return {
    type: WMSX_DELETE_TYPE_UNIT_START,
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
export function deleteTypeUnitSuccess(payload) {
  return {
    type: WMSX_DELETE_TYPE_UNIT_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete user failed action
 * @returns {object}
 */
export function deleteTypeUnitFailed() {
  return {
    type: WMSX_DELETE_TYPE_UNIT_FAILED,
  }
}

/**
 * Get user details
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getTypeUnitDetailsById(payload, onSuccess, onError) {
  return {
    type: WMSX_GET_TYPE_UNIT_DETAILS_START,
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
export function getTypeUnitDetailsByIdSuccess(payload) {
  return {
    type: WMSX_GET_TYPE_UNIT_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get user details by id failed action
 * @returns {object}
 */
export function getTypeUnitDetailsByIdFailed() {
  return {
    type: WMSX_GET_TYPE_UNIT_DETAILS_FAILED,
  }
}

export function confirmTypeUnitById(typeUnitId, onSuccess, onError) {
  return {
    type: WMSX_CONFIRM_TYPE_UNIT_START,
    payload: typeUnitId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get confirm purchased order by id success action
 * @param {*} payload
 * @returns {object}
 */
export function confirmTypeUnitByIdSuccess(payload) {
  return {
    type: WMSX_CONFIRM_TYPE_UNIT_SUCCESS,
    payload: payload,
  }
}

/**
 * Get confirm purchased order by id failed action
 * @returns {object}
 */
export function confirmTypeUnitByIdFailed() {
  return {
    type: WMSX_CONFIRM_TYPE_UNIT_FAILED,
  }
}

/**
 * import type unit
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function importTypeUnit(payload, onSuccess, onError) {
  return {
    type: WMSX_IMPORT_TYPE_UNIT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * import type unit success
 * @param {*} payload
 * @returns {object}
 */
export function importTypeUnitSuccess(payload) {
  return {
    type: WMSX_IMPORT_TYPE_UNIT_SUCCESS,
    payload: payload,
  }
}

/**
 * import type unit failed
 * @returns {object}
 */
export function importTypeUnitFailed() {
  return {
    type: WMSX_IMPORT_TYPE_UNIT_FAILED,
  }
}

export function resetTypeUnitState() {
  return {
    type: WMSX_RESET_TYPE_UNIT_STATE,
  }
}

export default {
  createTypeUnit,
  createTypeUnitFailed,
  createTypeUnitSuccess,
  deleteTypeUnit,
  deleteTypeUnitFailed,
  deleteTypeUnitSuccess,
  updateTypeUnit,
  updateTypeUnitFailed,
  updateTypeUnitSuccess,
  searchTypeUnits,
  searchTypeUnitsFailed,
  searchTypeUnitsSuccess,
  getTypeUnitDetailsById,
  getTypeUnitDetailsByIdFailed,
  getTypeUnitDetailsByIdSuccess,
  importTypeUnit,
  importTypeUnitFailed,
  importTypeUnitSuccess,
  resetTypeUnitState,
  confirmTypeUnitById,
  confirmTypeUnitByIdFailed,
  confirmTypeUnitByIdSuccess,
}
