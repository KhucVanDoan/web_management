export const GET_DETAILS_START = 'WMSX_GET_DETAILS_START'
export const GET_DETAILS_SUCCESS = 'WMSX_GET_DETAILS_SUCCESS'
export const GET_DETAILS_FAILED = 'WMSX_GET_DETAILS_FAILED'

export const SEARCH_DETAILS_START = 'WMSX_SEARCH_DETAILS_START'
export const SEARCH_DETAILS_SUCCESS = 'WMSX_SEARCH_DETAILS_SUCCESS'
export const SEARCH_DETAILS_FAILED = 'WMSX_SEARCH_DETAILS_FAILED'

export const CREATE_DETAIL_START = 'WMSX_CREATE_DETAIL_START'
export const CREATE_DETAIL_SUCCESS = 'WMSX_CREATE_DETAIL_SUCCESS'
export const CREATE_DETAIL_FAILED = 'WMSX_CREATE_DETAIL_FAILED'

export const UPDATE_DETAIL_START = 'WMSX_UPDATE_DETAIL_START'
export const UPDATE_DETAIL_SUCCESS = 'WMSX_UPDATE_DETAIL_SUCCESS'
export const UPDATE_DETAIL_FAILED = 'WMSX_UPDATE_DETAIL_FAILED'

export const DELETE_DETAIL_START = 'WMSX_DELETE_DETAIL_START'
export const DELETE_DETAIL_SUCCESS = 'WMSX_DELETE_DETAIL_SUCCESS'
export const DELETE_DETAIL_FAILED = 'WMSX_DELETE_DETAIL_FAILED'

export const GET_DETAIL_DETAILS_START = 'WMSX_GET_DETAIL_DETAILS_START'
export const GET_DETAIL_DETAILS_SUCCESS = 'WMSX_GET_DETAIL_DETAILS_SUCCESS'
export const GET_DETAIL_DETAILS_FAILED = 'WMSX_GET_DETAIL_DETAILS_FAILED'

export const RESET_DETAIL_DETAILS_STATE = 'WMSX_RESET_DETAIL_DETAILS_STATE'

export function getDetails(payload, onSuccess, onError) {
  return {
    type: GET_DETAILS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get products success action
 * @param {*} payload
 * @returns {object}
 */
export function getDetailsSuccess(payload) {
  return {
    type: GET_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get products failed action
 * @returns {object}
 */
export function getDetailsFailed() {
  return {
    type: GET_DETAILS_FAILED,
  }
}

/**
 * Search user
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchDetails(payload, onSuccess, onError) {
  return {
    type: SEARCH_DETAILS_START,
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
export function searchDetailsSuccess(payload) {
  return {
    type: SEARCH_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Search user failed action
 * @returns {object}
 */
export function searchDetailsFailed() {
  return {
    type: SEARCH_DETAILS_FAILED,
  }
}

/**
 * Create user
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createDetail(payload, onSuccess, onError) {
  return {
    type: CREATE_DETAIL_START,
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
export function createDetailSuccess(payload) {
  return {
    type: CREATE_DETAIL_SUCCESS,
    payload: payload,
  }
}

/**
 * Create user failed action
 * @returns {object}
 */
export function createDetailFailed() {
  return {
    type: CREATE_DETAIL_FAILED,
  }
}

/**
 * Update user
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateDetail(payload, onSuccess, onError) {
  return {
    type: UPDATE_DETAIL_START,
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
export function updateDetailSuccess(payload) {
  return {
    type: UPDATE_DETAIL_SUCCESS,
    payload: payload,
  }
}

/**
 * Update user failed action
 * @returns {object}
 */
export function updateDetailFailed() {
  return {
    type: UPDATE_DETAIL_FAILED,
  }
}
/**
 * Delete user
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteDetail(payload, onSuccess, onError) {
  return {
    type: DELETE_DETAIL_START,
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
export function deleteDetailSuccess(payload) {
  return {
    type: DELETE_DETAIL_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete user failed action
 * @returns {object}
 */
export function deleteDetailFailed() {
  return {
    type: DELETE_DETAIL_FAILED,
  }
}

/**
 * Get user details
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getDetailDetailsById(payload, onSuccess, onError) {
  return {
    type: GET_DETAIL_DETAILS_START,
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
export function getDetailDetailsByIdSuccess(payload) {
  return {
    type: GET_DETAIL_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get user details by id failed action
 * @returns {object}
 */
export function getDetailDetailsByIdFailed() {
  return {
    type: GET_DETAIL_DETAILS_FAILED,
  }
}

export function resetDetailDetailsState() {
  return {
    type: RESET_DETAIL_DETAILS_STATE,
  }
}

export default {
  getDetails,
  getDetailsSuccess,
  getDetailsFailed,
  searchDetails,
  searchDetailsSuccess,
  searchDetailsFailed,
  createDetail,
  createDetailSuccess,
  createDetailFailed,
  updateDetail,
  updateDetailSuccess,
  updateDetailFailed,
  deleteDetail,
  deleteDetailSuccess,
  deleteDetailFailed,
  getDetailDetailsById,
  getDetailDetailsByIdSuccess,
  getDetailDetailsByIdFailed,
  resetDetailDetailsState,
}
