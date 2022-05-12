export const SEARCH_ITEM_TYPES_START = 'DATABASE_SEARCH_ITEM_TYPES_START'
export const SEARCH_ITEM_TYPES_SUCCESS = 'DATABASE_SEARCH_ITEM_TYPES_SUCCESS'
export const SEARCH_ITEM_TYPES_FAILED = 'DATABASE_SEARCH_ITEM_TYPES_FAILED'

export const CREATE_ITEM_TYPE_START = 'DATABASE_CREATE_ITEM_TYPE_START'
export const CREATE_ITEM_TYPE_SUCCESS = 'DATABASE_CREATE_ITEM_TYPE_SUCCESS'
export const CREATE_ITEM_TYPE_FAILED = 'DATABASE_CREATE_ITEM_TYPE_FAILED'

export const UPDATE_ITEM_TYPE_START = 'DATABASE_UPDATE_ITEM_TYPE_START'
export const UPDATE_ITEM_TYPE_SUCCESS = 'DATABASE_UPDATE_ITEM_TYPE_SUCCESS'
export const UPDATE_ITEM_TYPE_FAILED = 'DATABASE_UPDATE_ITEM_TYPE_FAILED'

export const DELETE_ITEM_TYPE_START = 'DATABASE_DELETE_ITEM_TYPE_START'
export const DELETE_ITEM_TYPE_SUCCESS = 'DATABASE_DELETE_ITEM_TYPE_SUCCESS'
export const DELETE_ITEM_TYPE_FAILED = 'DATABASE_DELETE_ITEM_TYPE_FAILED'

export const GET_ITEM_TYPE_DETAILS_START =
  'DATABASE_GET_ITEM_TYPE_DETAILS_START'
export const GET_ITEM_TYPE_DETAILS_SUCCESS =
  'DATABASE_GET_ITEM_TYPE_DETAILS_SUCCESS'
export const GET_ITEM_TYPE_DETAILS_FAILED =
  'DATABASE_GET_ITEM_TYPE_DETAILS_FAILED'

export const RESET_ITEM_TYPE_DETAILS_STATE =
  'DATABASE_RESET_ITEM_TYPE_DETAILS_STATE'

/**
 * Search user
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchItemTypes(payload, onSuccess, onError) {
  return {
    type: SEARCH_ITEM_TYPES_START,
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
export function searchItemTypesSuccess(payload) {
  return {
    type: SEARCH_ITEM_TYPES_SUCCESS,
    payload: payload,
  }
}

/**
 * Search user failed action
 * @returns {object}
 */
export function searchItemTypesFailed() {
  return {
    type: SEARCH_ITEM_TYPES_FAILED,
  }
}

/**
 * Create user
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createItemType(payload, onSuccess, onError) {
  return {
    type: CREATE_ITEM_TYPE_START,
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
export function createItemTypeSuccess(payload) {
  return {
    type: CREATE_ITEM_TYPE_SUCCESS,
    payload: payload,
  }
}

/**
 * Create user failed action
 * @returns {object}
 */
export function createItemTypeFailed() {
  return {
    type: CREATE_ITEM_TYPE_FAILED,
  }
}

/**
 * Update user
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateItemType(payload, onSuccess, onError) {
  return {
    type: UPDATE_ITEM_TYPE_START,
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
export function updateItemTypeSuccess(payload) {
  return {
    type: UPDATE_ITEM_TYPE_SUCCESS,
    payload: payload,
  }
}

/**
 * Update user failed action
 * @returns {object}
 */
export function updateItemTypeFailed() {
  return {
    type: UPDATE_ITEM_TYPE_FAILED,
  }
}
/**
 * Delete user
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteItemType(payload, onSuccess, onError) {
  return {
    type: DELETE_ITEM_TYPE_START,
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
export function deleteItemTypeSuccess(payload) {
  return {
    type: DELETE_ITEM_TYPE_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete user failed action
 * @returns {object}
 */
export function deleteItemTypeFailed() {
  return {
    type: DELETE_ITEM_TYPE_FAILED,
  }
}

/**
 * Get user details
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getItemTypeDetailsById(payload, onSuccess, onError) {
  return {
    type: GET_ITEM_TYPE_DETAILS_START,
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
export function getItemTypeDetailsByIdSuccess(payload) {
  return {
    type: GET_ITEM_TYPE_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get user details by id failed action
 * @returns {object}
 */
export function getItemTypeDetailsByIdFailed() {
  return {
    type: GET_ITEM_TYPE_DETAILS_FAILED,
  }
}

export function resetItemTypeDetailsState() {
  return {
    type: RESET_ITEM_TYPE_DETAILS_STATE,
  }
}

export default {
  searchItemTypes,
  searchItemTypesSuccess,
  searchItemTypesFailed,
  createItemType,
  createItemTypeSuccess,
  createItemTypeFailed,
  updateItemType,
  updateItemTypeSuccess,
  updateItemTypeFailed,
  deleteItemType,
  deleteItemTypeSuccess,
  deleteItemTypeFailed,
  getItemTypeDetailsById,
  getItemTypeDetailsByIdSuccess,
  getItemTypeDetailsByIdFailed,
  resetItemTypeDetailsState,
}
