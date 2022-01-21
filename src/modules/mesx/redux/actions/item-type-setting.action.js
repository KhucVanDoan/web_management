export const SEARCH_ITEM_TYPES_START = 'SEARCH_ITEM_TYPES_START';
export const SEARCH_ITEM_TYPES_SUCCESS = 'SEARCH_ITEM_TYPES_SUCCESS';
export const SEARCH_ITEM_TYPES_FAILED = 'SEARCH_ITEM_TYPES_FAILED';

export const CREATE_ITEM_TYPE_START = 'CREATE_ITEM_TYPE_START';
export const CREATE_ITEM_TYPE_SUCCESS = 'CREATE_ITEM_TYPE_SUCCESS';
export const CREATE_ITEM_TYPE_FAILED = 'CREATE_ITEM_TYPE_FAILED';

export const UPDATE_ITEM_TYPE_START = 'UPDATE_ITEM_TYPE_START';
export const UPDATE_ITEM_TYPE_SUCCESS = 'UPDATE_ITEM_TYPE_SUCCESS';
export const UPDATE_ITEM_TYPE_FAILED = 'UPDATE_ITEM_TYPE_FAILED';

export const DELETE_ITEM_TYPE_START = 'DELETE_ITEM_TYPE_START';
export const DELETE_ITEM_TYPE_SUCCESS = 'DELETE_ITEM_TYPE_SUCCESS';
export const DELETE_ITEM_TYPE_FAILED = 'DELETE_ITEM_TYPE_FAILED';

export const GET_ITEM_TYPE_DETAILS_START = 'GET_ITEM_TYPE_DETAILS_START';
export const GET_ITEM_TYPE_DETAILS_SUCCESS = 'GET_ITEM_TYPE_DETAILS_SUCCESS';
export const GET_ITEM_TYPE_DETAILS_FAILED = 'GET_ITEM_TYPE_DETAILS_FAILED';

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
  };
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
  };
}

/**
 * Search user failed action
 * @returns {object}
 */
export function searchItemTypesFailed() {
  return {
    type: SEARCH_ITEM_TYPES_FAILED,
  };
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
  };
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
  };
}

/**
 * Create user failed action
 * @returns {object}
 */
export function createItemTypeFailed() {
  return {
    type: CREATE_ITEM_TYPE_FAILED,
  };
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
  };
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
  };
}

/**
 * Update user failed action
 * @returns {object}
 */
export function updateItemTypeFailed() {
  return {
    type: UPDATE_ITEM_TYPE_FAILED,
  };
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
  };
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
  };
}

/**
 * Delete user failed action
 * @returns {object}
 */
export function deleteItemTypeFailed() {
  return {
    type: DELETE_ITEM_TYPE_FAILED,
  };
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
  };
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
  };
}

/**
 * Get user details by id failed action
 * @returns {object}
 */
export function getItemTypeDetailsByIdFailed() {
  return {
    type: GET_ITEM_TYPE_DETAILS_FAILED,
  };
}
