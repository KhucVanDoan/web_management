export const WMSX_SEARCH_TYPE_SERVICE_START = 'WMSX_SEARCH_TYPE_SERVICE_START'
export const WMSX_SEARCH_TYPE_SERVICE_SUCCESS =
  'WMSX_SEARCH_TYPE_SERVICE_SUCCESS'
export const WMSX_SEARCH_TYPE_SERVICE_FAILED = 'WMSX_SEARCH_TYPE_SERVICE_FAILED'

export const WMSX_CREATE_TYPE_SERVICE_START = 'WMSX_CREATE_TYPE_SERVICE_START'
export const WMSX_CREATE_TYPE_SERVICE_SUCCESS =
  'WMSX_CREATE_TYPE_SERVICE_SUCCESS'
export const WMSX_CREATE_TYPE_SERVICE_FAILED = 'WMSX_CREATE_TYPE_SERVICE_FAILED'

export const WMSX_UPDATE_TYPE_SERVICE_START = 'WMSX_UPDATE_TYPE_SERVICE_START'
export const WMSX_UPDATE_TYPE_SERVICE_SUCCESS =
  'WMSX_UPDATE_TYPE_SERVICE_SUCCESS'
export const WMSX_UPDATE_TYPE_SERVICE_FAILED = 'WMSX_UPDATE_TYPE_SERVICE_FAILED'

export const WMSX_DELETE_TYPE_SERVICE_START = 'WMSX_DELETE_TYPE_SERVICE_START'
export const WMSX_DELETE_TYPE_SERVICE_SUCCESS =
  'WMSX_DELETE_TYPE_SERVICE_SUCCESS'
export const WMSX_DELETE_TYPE_SERVICE_FAILED = 'WMSX_DELETE_TYPE_SERVICE_FAILED'

export const WMSX_GET_TYPE_SERVICE_DETAILS_START =
  'WMSX_GET_TYPE_SERVICE_DETAILS_START'
export const WMSX_GET_TYPE_SERVICE_DETAILS_SUCCESS =
  'WMSX_GET_TYPE_SERVICE_DETAILS_SUCCESS'
export const WMSX_GET_TYPE_SERVICE_DETAILS_FAILED =
  'WMSX_GET_TYPE_SERVICE_DETAILS_FAILED'

export const WMSX_CONFIRM_TYPE_SERVICE_START = 'WMSX_CONFIRM_TYPE_SERVICE_START'
export const WMSX_CONFIRM_TYPE_SERVICE_SUCCESS =
  'WMSX_CONFIRM_TYPE_SERVICE_SUCCESS'
export const WMSX_CONFIRM_TYPE_SERVICE_FAILED =
  'WMSX_CONFIRM_TYPE_SERVICE_FAILED'

export const WMSX_IMPORT_TYPE_SERVICE_START = 'WMSX_IMPORT_TYPE_SERVICE_START'
export const WMSX_IMPORT_TYPE_SERVICE_SUCCESS =
  'WMSX_IMPORT_TYPE_SERVICE_SUCCESS'
export const WMSX_IMPORT_TYPE_SERVICE_FAILED = 'WMSX_IMPORT_TYPE_SERVICE_FAILED'

export const WMSX_RESET_TYPE_SERVICE_STATE = 'WMSX_RESET_TYPE_SERVICE_STATE'

/**
 * Search user
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchTypeService(payload, onSuccess, onError) {
  return {
    type: WMSX_SEARCH_TYPE_SERVICE_START,
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
export function searchTypeServiceSuccess(payload) {
  return {
    type: WMSX_SEARCH_TYPE_SERVICE_SUCCESS,
    payload: payload,
  }
}

/**
 * Search user failed action
 * @returns {object}
 */
export function searchTypeServiceFailed() {
  return {
    type: WMSX_SEARCH_TYPE_SERVICE_FAILED,
  }
}

/**
 * Create user
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createTypeService(payload, onSuccess, onError) {
  return {
    type: WMSX_CREATE_TYPE_SERVICE_START,
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
export function createTypeServiceSuccess(payload) {
  return {
    type: WMSX_CREATE_TYPE_SERVICE_SUCCESS,
    payload: payload,
  }
}

/**
 * Create user failed action
 * @returns {object}
 */
export function createTypeServiceFailed() {
  return {
    type: WMSX_CREATE_TYPE_SERVICE_FAILED,
  }
}

/**
 * Update user
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateTypeService(payload, onSuccess, onError) {
  return {
    type: WMSX_UPDATE_TYPE_SERVICE_START,
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
export function updateTypeServiceSuccess(payload) {
  return {
    type: WMSX_UPDATE_TYPE_SERVICE_SUCCESS,
    payload: payload,
  }
}

/**
 * Update user failed action
 * @returns {object}
 */
export function updateTypeServiceFailed() {
  return {
    type: WMSX_UPDATE_TYPE_SERVICE_FAILED,
  }
}
/**
 * Delete user
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteTypeService(payload, onSuccess, onError) {
  return {
    type: WMSX_DELETE_TYPE_SERVICE_START,
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
export function deleteTypeServiceSuccess(payload) {
  return {
    type: WMSX_DELETE_TYPE_SERVICE_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete user failed action
 * @returns {object}
 */
export function deleteTypeServiceFailed() {
  return {
    type: WMSX_DELETE_TYPE_SERVICE_FAILED,
  }
}

/**
 * Get user details
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getTypeServiceDetailsById(payload, onSuccess, onError) {
  return {
    type: WMSX_GET_TYPE_SERVICE_DETAILS_START,
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
export function getTypeServiceDetailsByIdSuccess(payload) {
  return {
    type: WMSX_GET_TYPE_SERVICE_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get user details by id failed action
 * @returns {object}
 */
export function getTypeServiceDetailsByIdFailed() {
  return {
    type: WMSX_GET_TYPE_SERVICE_DETAILS_FAILED,
  }
}

export function confirmTypeServiceById(TypeServiceId, onSuccess, onError) {
  return {
    type: WMSX_CONFIRM_TYPE_SERVICE_START,
    payload: TypeServiceId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get confirm purchased order by id success action
 * @param {*} payload
 * @returns {object}
 */
export function confirmTypeServiceByIdSuccess(payload) {
  return {
    type: WMSX_CONFIRM_TYPE_SERVICE_SUCCESS,
    payload: payload,
  }
}

/**
 * Get confirm purchased order by id failed action
 * @returns {object}
 */
export function confirmTypeServiceByIdFailed() {
  return {
    type: WMSX_CONFIRM_TYPE_SERVICE_FAILED,
  }
}

/**
 * import type unit
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function importTypeService(payload, onSuccess, onError) {
  return {
    type: WMSX_IMPORT_TYPE_SERVICE_START,
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
export function importTypeServiceSuccess(payload) {
  return {
    type: WMSX_IMPORT_TYPE_SERVICE_SUCCESS,
    payload: payload,
  }
}

/**
 * import type unit failed
 * @returns {object}
 */
export function importTypeServiceFailed() {
  return {
    type: WMSX_IMPORT_TYPE_SERVICE_FAILED,
  }
}

export function resetTypeServiceState() {
  return {
    type: WMSX_RESET_TYPE_SERVICE_STATE,
  }
}

export default {
  createTypeService,
  createTypeServiceFailed,
  createTypeServiceSuccess,
  deleteTypeService,
  deleteTypeServiceFailed,
  deleteTypeServiceSuccess,
  updateTypeService,
  updateTypeServiceFailed,
  updateTypeServiceSuccess,
  searchTypeService,
  searchTypeServiceFailed,
  searchTypeServiceSuccess,
  getTypeServiceDetailsById,
  getTypeServiceDetailsByIdFailed,
  getTypeServiceDetailsByIdSuccess,
  importTypeService,
  importTypeServiceFailed,
  importTypeServiceSuccess,
  resetTypeServiceState,
  confirmTypeServiceById,
  confirmTypeServiceByIdFailed,
  confirmTypeServiceByIdSuccess,
}
