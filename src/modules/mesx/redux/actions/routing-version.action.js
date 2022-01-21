export const SEARCH_ROUTING_VERSIONS_START = 'SEARCH_ROUTING_VERSIONS_START';
export const SEARCH_ROUTING_VERSIONS_SUCCESS =
  'SEARCH_ROUTING_VERSIONS_SUCCESS';
export const SEARCH_ROUTING_VERSIONS_FAILED = 'SEARCH_ROUTING_VERSIONS_FAILED';

export const CREATE_ROUTING_VERSION_START = 'CREATE_ROUTING_VERSION_START';
export const CREATE_ROUTING_VERSION_SUCCESS = 'CREATE_ROUTING_VERSION_SUCCESS';
export const CREATE_ROUTING_VERSION_FAILED = 'CREATE_ROUTING_VERSION_FAILED';

export const UPDATE_ROUTING_VERSION_START = 'UPDATE_ROUTING_VERSION_START';
export const UPDATE_ROUTING_VERSION_SUCCESS = 'UPDATE_ROUTING_VERSION_SUCCESS';
export const UPDATE_ROUTING_VERSION_FAILED = 'UPDATE_ROUTING_VERSION_FAILED';

export const DELETE_ROUTING_VERSION_START = 'DELETE_ROUTING_VERSION_START';
export const DELETE_ROUTING_VERSION_SUCCESS = 'DELETE_ROUTING_VERSION_SUCCESS';
export const DELETE_ROUTING_VERSION_FAILED = 'DELETE_ROUTING_VERSION_FAILED';

export const GET_ROUTING_VERSION_DETAILS_START =
  'GET_ROUTING_VERSION_DETAILS_START';
export const GET_ROUTING_VERSION_DETAILS_SUCCESS =
  'GET_ROUTING_VERSION_DETAILS_SUCCESS';
export const GET_ROUTING_VERSION_DETAILS_FAILED =
  'GET_ROUTING_VERSION_DETAILS_FAILED';

export const CONFIRM_ROUTING_VERSION_START = 'CONFIRM_ROUTING_VERSION_START';
export const CONFIRM_ROUTING_VERSION_SUCCESS =
  'CONFIRM_ROUTING_VERSION_SUCCESS';
export const CONFIRM_ROUTING_VERSION_FAILED = 'CONFIRM_ROUTING_VERSION_FAILED';

/**
 * Search user
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchRoutingVersions(payload, onSuccess, onError) {
  return {
    type: SEARCH_ROUTING_VERSIONS_START,
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
export function searchRoutingVersionsSuccess(payload) {
  return {
    type: SEARCH_ROUTING_VERSIONS_SUCCESS,
    payload: payload,
  };
}

/**
 * Search user failed action
 * @returns {object}
 */
export function searchRoutingVersionsFailed() {
  return {
    type: SEARCH_ROUTING_VERSIONS_FAILED,
  };
}

/**
 * Create user
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createRoutingVersion(payload, onSuccess, onError) {
  return {
    type: CREATE_ROUTING_VERSION_START,
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
export function createRoutingVersionSuccess(payload) {
  return {
    type: CREATE_ROUTING_VERSION_SUCCESS,
    payload: payload,
  };
}

/**
 * Create user failed action
 * @returns {object}
 */
export function createRoutingVersionFailed() {
  return {
    type: CREATE_ROUTING_VERSION_FAILED,
  };
}

/**
 * Update user
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateRoutingVersion(payload, onSuccess, onError) {
  return {
    type: UPDATE_ROUTING_VERSION_START,
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
export function updateRoutingVersionSuccess(payload) {
  return {
    type: UPDATE_ROUTING_VERSION_SUCCESS,
    payload: payload,
  };
}

/**
 * Update user failed action
 * @returns {object}
 */
export function updateRoutingVersionFailed() {
  return {
    type: UPDATE_ROUTING_VERSION_FAILED,
  };
}
/**
 * Delete user
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteRoutingVersion(payload, onSuccess, onError) {
  return {
    type: DELETE_ROUTING_VERSION_START,
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
export function deleteRoutingVersionSuccess(payload) {
  return {
    type: DELETE_ROUTING_VERSION_SUCCESS,
    payload: payload,
  };
}

/**
 * Delete user failed action
 * @returns {object}
 */
export function deleteRoutingVersionFailed() {
  return {
    type: DELETE_ROUTING_VERSION_FAILED,
  };
}

/**
 * Get user details
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getRoutingVersionDetailsById(payload, onSuccess, onError) {
  return {
    type: GET_ROUTING_VERSION_DETAILS_START,
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
export function getRoutingVersionDetailsByIdSuccess(payload) {
  return {
    type: GET_ROUTING_VERSION_DETAILS_SUCCESS,
    payload: payload,
  };
}

/**
 * Get user details by id failed action
 * @returns {object}
 */
export function getRoutingVersionDetailsByIdFailed() {
  return {
    type: GET_ROUTING_VERSION_DETAILS_FAILED,
  };
}

/**
 * Get confirm routing version
 * @param {int} routingVersionId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function confirmRoutingVersionById(
  routingVersionId,
  onSuccess,
  onError,
) {
  return {
    type: CONFIRM_ROUTING_VERSION_START,
    payload: routingVersionId,
    onSuccess: onSuccess,
    onError: onError,
  };
}

/**
 * Get confirm routing version by id success action
 * @param {*} payload
 * @returns {object}
 */
export function confirmRoutingVersionByIdSuccess(payload) {
  return {
    type: CONFIRM_ROUTING_VERSION_SUCCESS,
    payload: payload,
  };
}

/**
 * Get confirm routing version by id failed action
 * @returns {object}
 */
export function confirmRoutingVersionByIdFailed() {
  return {
    type: CONFIRM_ROUTING_VERSION_FAILED,
  };
}
