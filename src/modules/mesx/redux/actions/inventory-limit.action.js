export const SEARCH_INVENTORY_LIMITS_START = 'SEARCH_INVENTORY_LIMITS_START';
export const SEARCH_INVENTORY_LIMITS_SUCCESS =
  'SEARCH_INVENTORY_LIMITS_SUCCESS';
export const SEARCH_INVENTORY_LIMITS_FAILED = 'SEARCH_INVENTORY_LIMITS_FAILED';

export const CREATE_INVENTORY_LIMIT_START = 'CREATE_INVENTORY_LIMIT_START';
export const CREATE_INVENTORY_LIMIT_SUCCESS = 'CREATE_INVENTORY_LIMIT_SUCCESS';
export const CREATE_INVENTORY_LIMIT_FAILED = 'CREATE_INVENTORY_LIMIT_FAILED';

export const UPDATE_INVENTORY_LIMIT_START = 'UPDATE_INVENTORY_LIMIT_START';
export const UPDATE_INVENTORY_LIMIT_SUCCESS = 'UPDATE_INVENTORY_LIMIT_SUCCESS';
export const UPDATE_INVENTORY_LIMIT_FAILED = 'UPDATE_INVENTORY_LIMIT_FAILED';

export const DELETE_INVENTORY_LIMIT_START = 'DELETE_INVENTORY_LIMIT_START';
export const DELETE_INVENTORY_LIMIT_SUCCESS = 'DELETE_INVENTORY_LIMIT_SUCCESS';
export const DELETE_INVENTORY_LIMIT_FAILED = 'DELETE_INVENTORY_LIMIT_FAILED';

export const GET_INVENTORY_LIMIT_DETAILS_START =
  'GET_INVENTORY_LIMIT_DETAILS_START';
export const GET_INVENTORY_LIMIT_DETAILS_SUCCESS =
  'GET_INVENTORY_LIMIT_DETAILS_SUCCESS';
export const GET_INVENTORY_LIMIT_DETAILS_FAILED =
  'GET_INVENTORY_LIMIT_DETAILS_FAILED';

/**
 * Search user
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchInventoryLimits(payload, onSuccess, onError) {
  return {
    type: SEARCH_INVENTORY_LIMITS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  };
}

/**
 * Search user success action
 * @param {*} payload
 * @returns {object}
 */
export function searchInventoryLimitsSuccess(payload) {
  return {
    type: SEARCH_INVENTORY_LIMITS_SUCCESS,
    payload: payload,
  };
}

/**
 * Search user failed action
 * @returns {object}
 */
export function searchInventoryLimitsFailed() {
  return {
    type: SEARCH_INVENTORY_LIMITS_FAILED,
  };
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
    type: CREATE_INVENTORY_LIMIT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  };
}

/**
 * Create user success action
 * @param {*} payload
 * @returns {object}
 */
export function createInventoryLimitSuccess(payload) {
  return {
    type: CREATE_INVENTORY_LIMIT_SUCCESS,
    payload: payload,
  };
}

/**
 * Create user failed action
 * @returns {object}
 */
export function createInventoryLimitFailed() {
  return {
    type: CREATE_INVENTORY_LIMIT_FAILED,
  };
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
    type: UPDATE_INVENTORY_LIMIT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  };
}
/**
 * Update user success action
 * @param {*} payload
 * @returns {object}
 */
export function updateInventoryLimitSuccess(payload) {
  return {
    type: UPDATE_INVENTORY_LIMIT_SUCCESS,
    payload: payload,
  };
}

/**
 * Update user failed action
 * @returns {object}
 */
export function updateInventoryLimitFailed() {
  return {
    type: UPDATE_INVENTORY_LIMIT_FAILED,
  };
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
    type: DELETE_INVENTORY_LIMIT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  };
}

/**
 * Delete user success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteInventoryLimitSuccess(payload) {
  return {
    type: DELETE_INVENTORY_LIMIT_SUCCESS,
    payload: payload,
  };
}

/**
 * Delete user failed action
 * @returns {object}
 */
export function deleteInventoryLimitFailed() {
  return {
    type: DELETE_INVENTORY_LIMIT_FAILED,
  };
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
    type: GET_INVENTORY_LIMIT_DETAILS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  };
}

/**
 * Get user details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getInventoryLimitDetailsByIdSuccess(payload) {
  return {
    type: GET_INVENTORY_LIMIT_DETAILS_SUCCESS,
    payload: payload,
  };
}

/**
 * Get user details by id failed action
 * @returns {object}
 */
export function getInventoryLimitDetailsByIdFailed() {
  return {
    type: GET_INVENTORY_LIMIT_DETAILS_FAILED,
  };
}
