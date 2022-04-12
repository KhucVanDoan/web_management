export const SEARCH_ITEM_UNITS_START = 'SEARCH_ITEM_UNITS_START'
export const SEARCH_ITEM_UNITS_SUCCESS = 'SEARCH_ITEM_UNITS_SUCCESS'
export const SEARCH_ITEM_UNITS_FAILED = 'SEARCH_ITEM_UNITS_FAILED'

export const CREATE_ITEM_UNIT_START = 'CREATE_ITEM_UNIT_START'
export const CREATE_ITEM_UNIT_SUCCESS = 'CREATE_ITEM_UNIT_SUCCESS'
export const CREATE_ITEM_UNIT_FAILED = 'CREATE_ITEM_UNIT_FAILED'

export const UPDATE_ITEM_UNIT_START = 'UPDATE_ITEM_UNIT_START'
export const UPDATE_ITEM_UNIT_SUCCESS = 'UPDATE_ITEM_UNIT_SUCCESS'
export const UPDATE_ITEM_UNIT_FAILED = 'UPDATE_ITEM_UNIT_FAILED'

export const DELETE_ITEM_UNIT_START = 'DELETE_ITEM_UNIT_START'
export const DELETE_ITEM_UNIT_SUCCESS = 'DELETE_ITEM_UNIT_SUCCESS'
export const DELETE_ITEM_UNIT_FAILED = 'DELETE_ITEM_UNIT_FAILED'

export const GET_ITEM_UNIT_DETAILS_START = 'GET_ITEM_UNIT_DETAILS_START'
export const GET_ITEM_UNIT_DETAILS_SUCCESS = 'GET_ITEM_UNIT_DETAILS_SUCCESS'
export const GET_ITEM_UNIT_DETAILS_FAILED = 'GET_ITEM_UNIT_DETAILS_FAILED'

export const RESET_ITEM_UNIT_DETAILS_STATE = 'RESET_ITEM_UNIT_DETAILS_STATE'

/**
 * Search user
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchItemUnits(payload, onSuccess, onError) {
  return {
    type: SEARCH_ITEM_UNITS_START,
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
export function searchItemUnitsSuccess(payload) {
  return {
    type: SEARCH_ITEM_UNITS_SUCCESS,
    payload: payload,
  }
}

/**
 * Search user failed action
 * @returns {object}
 */
export function searchItemUnitsFailed() {
  return {
    type: SEARCH_ITEM_UNITS_FAILED,
  }
}

/**
 * Create user
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createItemUnit(payload, onSuccess, onError) {
  return {
    type: CREATE_ITEM_UNIT_START,
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
export function createItemUnitSuccess(payload) {
  return {
    type: CREATE_ITEM_UNIT_SUCCESS,
    payload: payload,
  }
}

/**
 * Create user failed action
 * @returns {object}
 */
export function createItemUnitFailed() {
  return {
    type: CREATE_ITEM_UNIT_FAILED,
  }
}

/**
 * Update user
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateItemUnit(payload, onSuccess, onError) {
  return {
    type: UPDATE_ITEM_UNIT_START,
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
export function updateItemUnitSuccess(payload) {
  return {
    type: UPDATE_ITEM_UNIT_SUCCESS,
    payload: payload,
  }
}

/**
 * Update user failed action
 * @returns {object}
 */
export function updateItemUnitFailed() {
  return {
    type: UPDATE_ITEM_UNIT_FAILED,
  }
}
/**
 * Delete user
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteItemUnit(payload, onSuccess, onError) {
  return {
    type: DELETE_ITEM_UNIT_START,
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
export function deleteItemUnitSuccess(payload) {
  return {
    type: DELETE_ITEM_UNIT_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete user failed action
 * @returns {object}
 */
export function deleteItemUnitFailed() {
  return {
    type: DELETE_ITEM_UNIT_FAILED,
  }
}

/**
 * Get user details
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getItemUnitDetailsById(payload, onSuccess, onError) {
  return {
    type: GET_ITEM_UNIT_DETAILS_START,
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
export function getItemUnitDetailsByIdSuccess(payload) {
  return {
    type: GET_ITEM_UNIT_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get user details by id failed action
 * @returns {object}
 */
export function getItemUnitDetailsByIdFailed() {
  return {
    type: GET_ITEM_UNIT_DETAILS_FAILED,
  }
}

export function resetItemUnitDetailsState() {
  return {
    type: RESET_ITEM_UNIT_DETAILS_STATE,
  }
}

export default {
  searchItemUnits,
  searchItemUnitsFailed,
  searchItemUnitsSuccess,
  createItemUnit,
  createItemUnitFailed,
  createItemUnitSuccess,
  updateItemUnit,
  updateItemUnitFailed,
  updateItemUnitSuccess,
  deleteItemUnit,
  deleteItemUnitFailed,
  deleteItemUnitSuccess,
  getItemUnitDetailsById,
  getItemUnitDetailsByIdFailed,
  getItemUnitDetailsByIdSuccess,
  resetItemUnitDetailsState,
}
