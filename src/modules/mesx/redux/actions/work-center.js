export const SEARCH_WORK_CENTER_START = 'MESX_SEARCH_WORK_CENTER_START'
export const SEARCH_WORK_CENTER_SUCCESS = 'MESX_SEARCH_WORK_CENTER_SUCCESS'
export const SEARCH_WORK_CENTER_FAILED = 'MESX_SEARCH_WORK_CENTER_FAILED'

export const CREATE_WORK_CENTER_START = 'MESX_CREATE_WORK_CENTER_START'
export const CREATE_WORK_CENTER_SUCCESS = 'MESX_CREATE_WORK_CENTER_SUCCESS'
export const CREATE_WORK_CENTER_FAILED = 'MESX_CREATE_WORK_CENTER_FAILED'

export const UPDATE_WORK_CENTER_START = 'MESX_UPDATE_WORK_CENTER_START'
export const UPDATE_WORK_CENTER_SUCCESS = 'MESX_UPDATE_WORK_CENTER_SUCCESS'
export const UPDATE_WORK_CENTER_FAILED = 'MESX_UPDATE_WORK_CENTER_FAILED'

export const DELETE_WORK_CENTER_START = 'MESX_DELETE_WORK_CENTER_START'
export const DELETE_WORK_CENTER_SUCCESS = 'MESX_DELETE_WORK_CENTER_SUCCESS'
export const DELETE_WORK_CENTER_FAILED = 'MESX_DELETE_WORK_CENTER_FAILED'

export const CONFIRM_WORK_CENTER_START = 'MESX_CONFIRM_WORK_CENTER_START'
export const CONFIRM_WORK_CENTER_SUCCESS = 'MESX_CONFIRM_WORK_CENTER_SUCCESS'
export const CONFIRM_WORK_CENTER_FAILED = 'MESX_CONFIRM_WORK_CENTER_FAILED'

export const GET_WORK_CENTER_DETAILS_START =
  'MESX_GET_WORK_CENTER_DETAILS_START'
export const GET_WORK_CENTER_DETAILS_SUCCESS =
  'MESX_GET_WORK_CENTER_DETAILS_SUCCESS'
export const GET_WORK_CENTER_DETAILS_FAILED =
  'MESX_GET_WORK_CENTER_DETAILS_FAILED'

export const RESET_WORK_CENTER_DETAIL_STATE =
  'MESX_RESET_WORK_CENTER_DETAIL_STATE'
/**
 * Search work center
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchWorkCenter(payload, onSuccess, onError) {
  return {
    type: SEARCH_WORK_CENTER_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search work center success action
 * @param {*} payload
 * @returns {object}
 */
export function searchWorkCenterSuccess(payload) {
  return {
    type: SEARCH_WORK_CENTER_SUCCESS,
    payload: payload,
  }
}

/**
 * Search work center failed action
 * @returns {object}
 */
export function searchWorkCenterFailed() {
  return {
    type: SEARCH_WORK_CENTER_FAILED,
  }
}

/**
 * Create work center
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createWorkCenter(payload, onSuccess, onError) {
  return {
    type: CREATE_WORK_CENTER_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Create work center success action
 * @param {*} payload
 * @returns {object}
 */
export function createWorkCenterSuccess(payload) {
  return {
    type: CREATE_WORK_CENTER_SUCCESS,
    payload: payload,
  }
}

/**
 * Create work center failed action
 * @returns {object}
 */
export function createWorkCenterFailed() {
  return {
    type: CREATE_WORK_CENTER_FAILED,
  }
}

/**
 * Update WorkCenter
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateWorkCenter(payload, onSuccess, onError) {
  return {
    type: UPDATE_WORK_CENTER_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Update WorkCenter success action
 * @param {*} payload
 * @returns {object}
 */
export function updateWorkCenterSuccess(payload) {
  return {
    type: UPDATE_WORK_CENTER_SUCCESS,
    payload: payload,
  }
}

/**
 * Update WorkCenter failed action
 * @returns {object}
 */
export function updateWorkCenterFailed() {
  return {
    type: UPDATE_WORK_CENTER_FAILED,
  }
}
/**
 * Confirm WorkCenter
 * @param {object} workCenterId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function confirmWorkCenter(workCenterId, onSuccess, onError) {
  return {
    type: CONFIRM_WORK_CENTER_START,
    payload: workCenterId,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Confirm WorkCenter success action
 * @param {*} payload
 * @returns {object}
 */
export function confirmWorkCenterSuccess(payload) {
  return {
    type: CONFIRM_WORK_CENTER_SUCCESS,
    payload: payload,
  }
}

/**
 * Confirm WorkCenter failed action
 * @returns {object}
 */
export function confirmWorkCenterFailed() {
  return {
    type: CONFIRM_WORK_CENTER_FAILED,
  }
}
/**
 * Delete WorkCenter
 * @param {int} WorkCenterId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteWorkCenter(WorkCenterId, onSuccess, onError) {
  return {
    type: DELETE_WORK_CENTER_START,
    payload: WorkCenterId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete WorkCenter success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteWorkCenterSuccess(payload) {
  return {
    type: DELETE_WORK_CENTER_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete WorkCenter failed action
 * @returns {object}
 */
export function deleteWorkCenterFailed() {
  return {
    type: DELETE_WORK_CENTER_FAILED,
  }
}

/**
 * Get WorkCenter details
 * @param {int} WorkCenterId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getWorkCenterDetailsById(WorkCenterId, onSuccess, onError) {
  return {
    type: GET_WORK_CENTER_DETAILS_START,
    payload: WorkCenterId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get WorkCenter details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getWorkCenterDetailsByIdSuccess(payload) {
  return {
    type: GET_WORK_CENTER_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get WorkCenter details by id failed action
 * @returns {object}
 */
export function getWorkCenterDetailsByIdFailed() {
  return {
    type: GET_WORK_CENTER_DETAILS_FAILED,
  }
}

export function resetWorkCenterDetailState() {
  return {
    type: RESET_WORK_CENTER_DETAIL_STATE,
  }
}
export default {
  searchWorkCenter,
  searchWorkCenterFailed,
  searchWorkCenterSuccess,
  createWorkCenter,
  createWorkCenterFailed,
  createWorkCenterSuccess,
  updateWorkCenter,
  updateWorkCenterFailed,
  updateWorkCenterSuccess,
  getWorkCenterDetailsById,
  getWorkCenterDetailsByIdFailed,
  getWorkCenterDetailsByIdSuccess,
  deleteWorkCenter,
  deleteWorkCenterSuccess,
  deleteWorkCenterFailed,
  confirmWorkCenter,
  confirmWorkCenterSuccess,
  confirmWorkCenterFailed,
  resetWorkCenterDetailState,
}
