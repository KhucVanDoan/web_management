export const SEARCH_ROUTINGS_START = 'SEARCH_ROUTINGS_START';
export const SEARCH_ROUTINGS_SUCCESS = 'SEARCH_ROUTINGS_SUCCESS';
export const SEARCH_ROUTINGS_FAILED = 'SEARCH_ROUTINGS_FAILED';

export const CREATE_ROUTING_START = 'CREATE_ROUTING_START';
export const CREATE_ROUTING_SUCCESS = 'CREATE_ROUTING_SUCCESS';
export const CREATE_ROUTING_FAILED = 'CREATE_ROUTING_FAILED';

export const UPDATE_ROUTING_START = 'UPDATE_ROUTING_START';
export const UPDATE_ROUTING_SUCCESS = 'UPDATE_ROUTING_SUCCESS';
export const UPDATE_ROUTING_FAILED = 'UPDATE_ROUTING_FAILED';

export const DELETE_ROUTING_START = 'DELETE_ROUTING_START';
export const DELETE_ROUTING_SUCCESS = 'DELETE_ROUTING_SUCCESS';
export const DELETE_ROUTING_FAILED = 'DELETE_ROUTING_FAILED';

export const GET_ROUTING_DETAILS_START = 'GET_ROUTING_DETAILS_START';
export const GET_ROUTING_DETAILS_SUCCESS = 'GET_ROUTING_DETAILS_SUCCESS';
export const GET_ROUTING_DETAILS_FAILED = 'GET_ROUTING_DETAILS_FAILED';

export const CONFIRM_ROUTING_START = 'CONFIRM_ROUTING_START';
export const CONFIRM_ROUTING_SUCCESS = 'CONFIRM_ROUTING_SUCCESS';
export const CONFIRM_ROUTING_FAILED = 'CONFIRM_ROUTING_FAILED';

/**
 * Search routing
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchRoutings(payload, onSuccess, onError) {
  return {
    type: SEARCH_ROUTINGS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  };
}

/**
 * Search routing success action
 * @param {*} payload
 * @returns {object}
 */
export function searchRoutingsSuccess(payload) {
  return {
    type: SEARCH_ROUTINGS_SUCCESS,
    payload: payload,
  };
}

/**
 * Search routing failed action
 * @returns {object}
 */
export function searchRoutingsFailed() {
  return {
    type: SEARCH_ROUTINGS_FAILED,
  };
}

/**
 * Create routing
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createRouting(payload, onSuccess, onError) {
  return {
    type: CREATE_ROUTING_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  };
}

/**
 * Create routing success action
 * @param {*} payload
 * @returns {object}
 */
export function createRoutingSuccess(payload) {
  return {
    type: CREATE_ROUTING_SUCCESS,
    payload: payload,
  };
}

/**
 * Create routing failed action
 * @returns {object}
 */
export function createRoutingFailed() {
  return {
    type: CREATE_ROUTING_FAILED,
  };
}

/**
 * Update routing
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateRouting(payload, onSuccess, onError) {
  return {
    type: UPDATE_ROUTING_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  };
}
/**
 * Update routing success action
 * @param {*} payload
 * @returns {object}
 */
export function updateRoutingSuccess(payload) {
  return {
    type: UPDATE_ROUTING_SUCCESS,
    payload: payload,
  };
}

/**
 * Update routing failed action
 * @returns {object}
 */
export function updateRoutingFailed() {
  return {
    type: UPDATE_ROUTING_FAILED,
  };
}
/**
 * Delete routing
 * @param {int} routingId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteRouting(routingId, onSuccess, onError) {
  return {
    type: DELETE_ROUTING_START,
    payload: routingId,
    onSuccess: onSuccess,
    onError: onError,
  };
}

/**
 * Delete routing success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteRoutingSuccess(payload) {
  return {
    type: DELETE_ROUTING_SUCCESS,
    payload: payload,
  };
}

/**
 * Delete routing failed action
 * @returns {object}
 */
export function deleteRoutingFailed() {
  return {
    type: DELETE_ROUTING_FAILED,
  };
}

/**
 * Get routing details
 * @param {int} routingId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getRoutingDetailsById(routingId, onSuccess, onError) {
  return {
    type: GET_ROUTING_DETAILS_START,
    payload: routingId,
    onSuccess: onSuccess,
    onError: onError,
  };
}

/**
 * Get routing details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getRoutingDetailsByIdSuccess(payload) {
  return {
    type: GET_ROUTING_DETAILS_SUCCESS,
    payload: payload,
  };
}

/**
 * Get routing details by id failed action
 * @returns {object}
 */
export function getRoutingDetailsByIdFailed() {
  return {
    type: GET_ROUTING_DETAILS_FAILED,
  };
}

/**
 * Get confirm production order
 * @param {int} routingId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function confirmRoutingById(routingId, onSuccess, onError) {
  return {
    type: CONFIRM_ROUTING_START,
    payload: routingId,
    onSuccess: onSuccess,
    onError: onError,
  };
}

/**
 * Get confirm production order by id success action
 * @param {*} payload
 * @returns {object}
 */
export function confirmRoutingByIdSuccess(payload) {
  return {
    type: CONFIRM_ROUTING_SUCCESS,
    payload: payload,
  };
}

/**
 * Get confirm production order by id failed action
 * @returns {object}
 */
export function confirmRoutingByIdFailed() {
  return {
    type: CONFIRM_ROUTING_FAILED,
  };
}
