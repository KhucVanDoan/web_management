export const SEARCH_ROUTINGS_START = 'MESX_SEARCH_ROUTINGS_START'
export const SEARCH_ROUTINGS_SUCCESS = 'MESX_SEARCH_ROUTINGS_SUCCESS'
export const SEARCH_ROUTINGS_FAILED = 'MESX_SEARCH_ROUTINGS_FAILED'

export const CREATE_ROUTING_START = 'MESX_CREATE_ROUTING_START'
export const CREATE_ROUTING_SUCCESS = 'MESX_CREATE_ROUTING_SUCCESS'
export const CREATE_ROUTING_FAILED = 'MESX_CREATE_ROUTING_FAILED'

export const UPDATE_ROUTING_START = 'MESX_UPDATE_ROUTING_START'
export const UPDATE_ROUTING_SUCCESS = 'MESX_UPDATE_ROUTING_SUCCESS'
export const UPDATE_ROUTING_FAILED = 'MESX_UPDATE_ROUTING_FAILED'

export const DELETE_ROUTING_START = 'MESX_DELETE_ROUTING_START'
export const DELETE_ROUTING_SUCCESS = 'MESX_DELETE_ROUTING_SUCCESS'
export const DELETE_ROUTING_FAILED = 'MESX_DELETE_ROUTING_FAILED'

export const GET_ROUTING_DETAILS_START = 'MESX_GET_ROUTING_DETAILS_START'
export const GET_ROUTING_DETAILS_SUCCESS = 'MESX_GET_ROUTING_DETAILS_SUCCESS'
export const GET_ROUTING_DETAILS_FAILED = 'MESX_GET_ROUTING_DETAILS_FAILED'

export const CONFIRM_ROUTING_START = 'MESX_CONFIRM_ROUTING_START'
export const CONFIRM_ROUTING_SUCCESS = 'MESX_CONFIRM_ROUTING_SUCCESS'
export const CONFIRM_ROUTING_FAILED = 'MESX_CONFIRM_ROUTING_FAILED'

export const RESET_ROUTING_DETAILS_STATE = 'MESX_RESET_ROUTING_DETAILS_STATE'

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
  }
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
  }
}

/**
 * Search routing failed action
 * @returns {object}
 */
export function searchRoutingsFailed() {
  return {
    type: SEARCH_ROUTINGS_FAILED,
  }
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
  }
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
  }
}

/**
 * Create routing failed action
 * @returns {object}
 */
export function createRoutingFailed() {
  return {
    type: CREATE_ROUTING_FAILED,
  }
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
  }
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
  }
}

/**
 * Update routing failed action
 * @returns {object}
 */
export function updateRoutingFailed() {
  return {
    type: UPDATE_ROUTING_FAILED,
  }
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
  }
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
  }
}

/**
 * Delete routing failed action
 * @returns {object}
 */
export function deleteRoutingFailed() {
  return {
    type: DELETE_ROUTING_FAILED,
  }
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
  }
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
  }
}

/**
 * Get routing details by id failed action
 * @returns {object}
 */
export function getRoutingDetailsByIdFailed() {
  return {
    type: GET_ROUTING_DETAILS_FAILED,
  }
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
  }
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
  }
}

/**
 * Get confirm production order by id failed action
 * @returns {object}
 */
export function confirmRoutingByIdFailed() {
  return {
    type: CONFIRM_ROUTING_FAILED,
  }
}

export function resetRoutingDetailState() {
  return {
    type: RESET_ROUTING_DETAILS_STATE,
  }
}

export default {
  searchRoutings,
  searchRoutingsSuccess,
  searchRoutingsFailed,
  createRouting,
  createRoutingSuccess,
  createRoutingFailed,
  updateRouting,
  updateRoutingSuccess,
  updateRoutingFailed,
  deleteRouting,
  deleteRoutingSuccess,
  deleteRoutingFailed,
  getRoutingDetailsById,
  getRoutingDetailsByIdSuccess,
  getRoutingDetailsByIdFailed,
  confirmRoutingById,
  confirmRoutingByIdSuccess,
  confirmRoutingByIdFailed,
  resetRoutingDetailState,
}
