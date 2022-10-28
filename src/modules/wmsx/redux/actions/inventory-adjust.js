export const SEARCH_INVENTORY_ADJUST_START =
  'WMSX_SEARCH_INVENTORY_ADJUST_START'
export const SEARCH_INVENTORY_ADJUST_SUCCESS =
  'WMSX_SEARCH_INVENTORY_ADJUST_SUCCESS'
export const SEARCH_INVENTORY_ADJUST_FAILED =
  'WMSX_SEARCH_INVENTORY_ADJUST_FAILED'

export const CREATE_INVENTORY_ADJUST_START =
  'WMSX_CREATE_INVENTORY_ADJUST_START'
export const CREATE_INVENTORY_ADJUST_SUCCESS =
  'WMSX_CREATE_INVENTORY_ADJUST_SUCCESS'
export const CREATE_INVENTORY_ADJUST_FAILED =
  'WMSX_CREATE_INVENTORY_ADJUST_FAILED'

export const UPDATE_INVENTORY_ADJUST_START =
  'WMSX_UPDATE_INVENTORY_ADJUST_START'
export const UPDATE_INVENTORY_ADJUST_SUCCESS =
  'WMSX_UPDATE_INVENTORY_ADJUST_SUCCESS'
export const UPDATE_INVENTORY_ADJUST_FAILED =
  'WMSX_UPDATE_INVENTORY_ADJUST_FAILED'

export const DELETE_INVENTORY_ADJUST_START =
  'WMSX_DELETE_INVENTORY_ADJUST_START'
export const DELETE_INVENTORY_ADJUST_SUCCESS =
  'WMSX_DELETE_INVENTORY_ADJUST_SUCCESS'
export const DELETE_INVENTORY_ADJUST_FAILED =
  'WMSX_DELETE_INVENTORY_ADJUST_FAILED'

export const GET_INVENTORY_ADJUST_DETAILS_START =
  'WMSX_GET_INVENTORY_ADJUST_DETAILS_START'
export const GET_INVENTORY_ADJUST_DETAILS_SUCCESS =
  'WMSX_GET_INVENTORY_ADJUST_DETAILS_SUCCESS'
export const GET_INVENTORY_ADJUST_DETAILS_FAILED =
  'WMSX_GET_INVENTORY_ADJUST_DETAILS_FAILED'

export const CONFIRM_INVENTORY_ADJUST_START =
  'WMSX_CONFIRM_INVENTORY_ADJUST_START'
export const CONFIRM_INVENTORY_ADJUST_SUCCESS =
  'WMSX_CONFIRM_INVENTORY_ADJUST_SUCCESS'
export const CONFIRM_INVENTORY_ADJUST_FAILED =
  'WMSX_CONFIRM_INVENTORY_ADJUST_FAILED'

export const REJECT_INVENTORY_ADJUST_START =
  'WMSX_REJECT_INVENTORY_ADJUST_START'
export const REJECT_INVENTORY_ADJUST_SUCCESS =
  'WMSX_REJECT_INVENTORY_ADJUST_SUCCESS'
export const REJECT_INVENTORY_ADJUST_FAILED =
  'WMSX_REJECT_INVENTORY_ADJUST_FAILED'

export const RESET_INVENTORY_ADJUST = 'WMSX_RESET_INVENTORY_ADJUST'
/**
 * Search
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchInventoryAdjust(payload, onSuccess, onError) {
  return {
    type: SEARCH_INVENTORY_ADJUST_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search  success action
 * @param {*} payload
 * @returns {object}
 */
export function searchInventoryAdjustSuccess(payload) {
  return {
    type: SEARCH_INVENTORY_ADJUST_SUCCESS,
    payload: payload,
  }
}

/**
 * Search  failed action
 * @returns {object}
 */
export function searchInventoryAdjustFailed() {
  return {
    type: SEARCH_INVENTORY_ADJUST_FAILED,
  }
}

/**
 * Create
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createInventoryAdjust(payload, onSuccess, onError) {
  return {
    type: CREATE_INVENTORY_ADJUST_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Create  success action
 * @param {*} payload
 * @returns {object}
 */
export function createInventoryAdjustSuccess(payload) {
  return {
    type: CREATE_INVENTORY_ADJUST_SUCCESS,
    payload: payload,
  }
}

/**
 * Create  failed action
 * @returns {object}
 */
export function createInventoryAdjustFailed() {
  return {
    type: CREATE_INVENTORY_ADJUST_FAILED,
  }
}

/**
 * Update
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateInventoryAdjust(payload, onSuccess, onError) {
  return {
    type: UPDATE_INVENTORY_ADJUST_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Update  success action
 * @param {*} payload
 * @returns {object}
 */
export function updateInventoryAdjustSuccess(payload) {
  return {
    type: UPDATE_INVENTORY_ADJUST_SUCCESS,
    payload: payload,
  }
}

/**
 * Update  failed action
 * @returns {object}
 */
export function updateInventoryAdjustFailed() {
  return {
    type: UPDATE_INVENTORY_ADJUST_FAILED,
  }
}
/**
 * Delete
 * @param {int} Id
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteInventoryAdjust(Id, onSuccess, onError) {
  return {
    type: DELETE_INVENTORY_ADJUST_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete  success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteInventoryAdjustSuccess(payload) {
  return {
    type: DELETE_INVENTORY_ADJUST_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete  failed action
 * @returns {object}
 */
export function deleteInventoryAdjustFailed() {
  return {
    type: DELETE_INVENTORY_ADJUST_FAILED,
  }
}

/**
 * Get  details
 * @param {int} Id
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getInventoryAdjustDetailsById(Id, onSuccess, onError) {
  return {
    type: GET_INVENTORY_ADJUST_DETAILS_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get  details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getInventoryAdjustDetailsByIdSuccess(payload) {
  return {
    type: GET_INVENTORY_ADJUST_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get  details by id failed action
 * @returns {object}
 */
export function getInventoryAdjustDetailsByIdFailed() {
  return {
    type: GET_INVENTORY_ADJUST_DETAILS_FAILED,
  }
}

/**
 * Get confirm warehouse transfer
 * @param {int} Id
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function confirmInventoryAdjustById(Id, onSuccess, onError) {
  return {
    type: CONFIRM_INVENTORY_ADJUST_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get confirm warehouse transfer by id success action
 * @param {*} payload
 * @returns {object}
 */
export function confirmInventoryAdjustByIdSuccess(payload) {
  return {
    type: CONFIRM_INVENTORY_ADJUST_SUCCESS,
    payload: payload,
  }
}

/**
 * Get confirm warehouse transfer by id failed action
 * @returns {object}
 */
export function confirmInventoryAdjustByIdFailed() {
  return {
    type: CONFIRM_INVENTORY_ADJUST_FAILED,
  }
}

/**
 * Get reject warehouse transfer
 * @param {int} Id
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function rejectInventoryAdjustById(Id, onSuccess, onError) {
  return {
    type: REJECT_INVENTORY_ADJUST_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get reject warehouse transfer by id success action
 * @param {*} payload
 * @returns {object}
 */
export function rejectInventoryAdjustByIdSuccess(payload) {
  return {
    type: REJECT_INVENTORY_ADJUST_SUCCESS,
    payload: payload,
  }
}

/**
 * Get reject warehouse transfer by id failed action
 * @returns {object}
 */
export function rejectInventoryAdjustByIdFailed() {
  return {
    type: REJECT_INVENTORY_ADJUST_FAILED,
  }
}

/**
 * Get lot number list
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function resetInventoryAdjust() {
  return {
    type: RESET_INVENTORY_ADJUST,
  }
}
export default {
  searchInventoryAdjust,
  searchInventoryAdjustSuccess,
  searchInventoryAdjustFailed,
  createInventoryAdjust,
  createInventoryAdjustSuccess,
  createInventoryAdjustFailed,
  updateInventoryAdjust,
  updateInventoryAdjustSuccess,
  updateInventoryAdjustFailed,
  deleteInventoryAdjust,
  deleteInventoryAdjustSuccess,
  deleteInventoryAdjustFailed,
  getInventoryAdjustDetailsById,
  getInventoryAdjustDetailsByIdSuccess,
  getInventoryAdjustDetailsByIdFailed,
  confirmInventoryAdjustById,
  confirmInventoryAdjustByIdSuccess,
  confirmInventoryAdjustByIdFailed,
  rejectInventoryAdjustById,
  rejectInventoryAdjustByIdSuccess,
  rejectInventoryAdjustByIdFailed,
  resetInventoryAdjust,
}
