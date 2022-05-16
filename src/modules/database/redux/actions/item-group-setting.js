export const SEARCH_ITEM_GROUPS_START = 'DATABASE_SEARCH_ITEM_GROUPS_START'
export const SEARCH_ITEM_GROUPS_SUCCESS = 'DATABASE_SEARCH_ITEM_GROUPS_SUCCESS'
export const SEARCH_ITEM_GROUPS_FAILED = 'DATABASE_SEARCH_ITEM_GROUPS_FAILED'

export const CREATE_ITEM_GROUP_START = 'DATABASE_CREATE_ITEM_GROUP_START'
export const CREATE_ITEM_GROUP_SUCCESS = 'DATABASE_CREATE_ITEM_GROUP_SUCCESS'
export const CREATE_ITEM_GROUP_FAILED = 'DATABASE_CREATE_ITEM_GROUP_FAILED'

export const UPDATE_ITEM_GROUP_START = 'DATABASE_UPDATE_ITEM_GROUP_START'
export const UPDATE_ITEM_GROUP_SUCCESS = 'DATABASE_UPDATE_ITEM_GROUP_SUCCESS'
export const UPDATE_ITEM_GROUP_FAILED = 'DATABASE_UPDATE_ITEM_GROUP_FAILED'

export const DELETE_ITEM_GROUP_START = 'DATABASE_DELETE_ITEM_GROUP_START'
export const DELETE_ITEM_GROUP_SUCCESS = 'DATABASE_DELETE_ITEM_GROUP_SUCCESS'
export const DELETE_ITEM_GROUP_FAILED = 'DATABASE_DELETE_ITEM_GROUP_FAILED'

export const GET_ITEM_GROUP_DETAILS_START =
  'DATABASE_GET_ITEM_GROUP_DETAILS_START'
export const GET_ITEM_GROUP_DETAILS_SUCCESS =
  'DATABASE_GET_ITEM_GROUP_DETAILS_SUCCESS'
export const GET_ITEM_GROUP_DETAILS_FAILED =
  'DATABASE_GET_ITEM_GROUP_DETAILS_FAILED'

export const RESET_ITEM_GROUP_DETAILS_STATE =
  'DATABASE_RESET_ITEM_GROUP_DETAILS_STATE'

/**
 * Search user
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchItemGroups(payload, onSuccess, onError) {
  return {
    type: SEARCH_ITEM_GROUPS_START,
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
export function searchItemGroupsSuccess(payload) {
  return {
    type: SEARCH_ITEM_GROUPS_SUCCESS,
    payload: payload,
  }
}

/**
 * Search user failed action
 * @returns {object}
 */
export function searchItemGroupsFailed() {
  return {
    type: SEARCH_ITEM_GROUPS_FAILED,
  }
}

/**
 * Create user
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createItemGroup(payload, onSuccess, onError) {
  return {
    type: CREATE_ITEM_GROUP_START,
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
export function createItemGroupSuccess(payload) {
  return {
    type: CREATE_ITEM_GROUP_SUCCESS,
    payload: payload,
  }
}

/**
 * Create user failed action
 * @returns {object}
 */
export function createItemGroupFailed() {
  return {
    type: CREATE_ITEM_GROUP_FAILED,
  }
}

/**
 * Update user
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateItemGroup(payload, onSuccess, onError) {
  return {
    type: UPDATE_ITEM_GROUP_START,
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
export function updateItemGroupSuccess(payload) {
  return {
    type: UPDATE_ITEM_GROUP_SUCCESS,
    payload: payload,
  }
}

/**
 * Update user failed action
 * @returns {object}
 */
export function updateItemGroupFailed() {
  return {
    type: UPDATE_ITEM_GROUP_FAILED,
  }
}
/**
 * Delete user
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteItemGroup(payload, onSuccess, onError) {
  return {
    type: DELETE_ITEM_GROUP_START,
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
export function deleteItemGroupSuccess(payload) {
  return {
    type: DELETE_ITEM_GROUP_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete user failed action
 * @returns {object}
 */
export function deleteItemGroupFailed() {
  return {
    type: DELETE_ITEM_GROUP_FAILED,
  }
}

/**
 * Get user details
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getItemGroupDetailsById(payload, onSuccess, onError) {
  return {
    type: GET_ITEM_GROUP_DETAILS_START,
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
export function getItemGroupDetailsByIdSuccess(payload) {
  return {
    type: GET_ITEM_GROUP_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get user details by id failed action
 * @returns {object}
 */
export function getItemGroupDetailsByIdFailed() {
  return {
    type: GET_ITEM_GROUP_DETAILS_FAILED,
  }
}

export function resetItemGroupDetailsState() {
  return {
    type: RESET_ITEM_GROUP_DETAILS_STATE,
  }
}

export default {
  searchItemGroups,
  searchItemGroupsSuccess,
  searchItemGroupsFailed,
  createItemGroup,
  createItemGroupSuccess,
  createItemGroupFailed,
  updateItemGroup,
  updateItemGroupSuccess,
  updateItemGroupFailed,
  deleteItemGroup,
  deleteItemGroupSuccess,
  deleteItemGroupFailed,
  getItemGroupDetailsById,
  getItemGroupDetailsByIdSuccess,
  getItemGroupDetailsByIdFailed,
  resetItemGroupDetailsState,
}
