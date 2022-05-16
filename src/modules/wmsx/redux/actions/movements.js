export const SEARCH_MOVEMENTS_START = 'WMSX_SEARCH_MOVEMENTS_START'
export const SEARCH_MOVEMENTS_SUCCESS = 'WMSX_SEARCH_MOVEMENTS_SUCCESS'
export const SEARCH_MOVEMENTS_FAILED = 'WMSX_SEARCH_MOVEMENTS_FAILED'

export const GET_MOVEMENT_DETAILS_START = 'WMSX_GET_MOVEMENT_DETAILS_START'
export const GET_MOVEMENT_DETAILS_SUCCESS = 'WMSX_GET_MOVEMENT_DETAILS_SUCCESS'
export const GET_MOVEMENT_DETAILS_FAILED = 'WMSX_GET_MOVEMENT_DETAILS_FAILED'

export const RESET_MOVEMENT_DETAILS_STATE = 'WMSX_RESET_MOVEMENT_DETAILS_STATE'
/**
 * Get movement details
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function searchMovements(payload, onSuccess, onError) {
  return {
    type: SEARCH_MOVEMENTS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get movement details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function searchMovementsSuccess(payload) {
  return {
    type: SEARCH_MOVEMENTS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get movement details by id failed action
 * @returns {object}
 */
export function searchMovementsFailed() {
  return {
    type: SEARCH_MOVEMENTS_FAILED,
  }
}

/**
 * Get movement details
 * @param {int} movementId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getMovementsDetailsById(movementId, onSuccess, onError) {
  return {
    type: GET_MOVEMENT_DETAILS_START,
    payload: movementId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get movement details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getMovementsDetailsByIdSuccess(payload) {
  return {
    type: GET_MOVEMENT_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get movement details by id failed action
 * @returns {object}
 */
export function getMovementsDetailsByIdFailed() {
  return {
    type: GET_MOVEMENT_DETAILS_FAILED,
  }
}

export function resetMovementsDetailsState() {
  return {
    type: RESET_MOVEMENT_DETAILS_STATE,
  }
}

export default {
  searchMovements,
  searchMovementsSuccess,
  searchMovementsFailed,
  getMovementsDetailsById,
  getMovementsDetailsByIdSuccess,
  getMovementsDetailsByIdFailed,
  resetMovementsDetailsState,
}
