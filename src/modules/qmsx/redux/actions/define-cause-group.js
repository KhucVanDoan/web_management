//@Define Action
//Action: Get list
export const SEARCH_CAUSE_GROUP_START = 'QMSX_SEARCH_CAUSE_GROUP_START'
export const SEARCH_CAUSE_GROUP_SUCCESS = 'QMSX_SEARCH_CAUSE_GROUP_SUCCESS'
export const SEARCH_CAUSE_GROUP_FAIL = 'QMSX_SEARCH_CAUSE_GROUP_FAIL'
//Action: create
export const CREATE_CAUSE_GROUP_START = 'QMSX_CREATE_CAUSE_GROUP_START'
export const CREATE_CAUSE_GROUP_SUCCESS = 'QMSX_CREATE_CAUSE_GROUP_SUCCESS'
export const CREATE_CAUSE_GROUP_FAIL = 'QMSX_CREATE_CAUSE_GROUP_FAIL'
//Action: update
export const UPDATE_CAUSE_GROUP_START = 'QMSX_UPDATE_CAUSE_GROUP_START'
export const UPDATE_CAUSE_GROUP_SUCCESS = 'QMSX_UPDATE_CAUSE_GROUP_SUCCESS'
export const UPDATE_CAUSE_GROUP_FAIL = 'QMSX_UPDATE_CAUSE_GROUP_FAIL'
//Action: delete
export const DELETE_CAUSE_GROUP_START = 'QMSX_DELETE_CAUSE_GROUP_START'
export const DELETE_CAUSE_GROUP_SUCCESS = 'QMSX_DELETE_CAUSE_GROUP_SUCCESS'
export const DELETE_CAUSE_GROUP_FAIL = 'QMSX_DELETE_CAUSE_GROUP_FAIL'
//Action: Get detail
export const GET_CAUSE_GROUP_DETAIL_START = 'QMSX_GET_CAUSE_GROUP_DETAIL_START'
export const GET_CAUSE_GROUP_DETAIL_SUCCESS =
  'QMSX_GET_CAUSE_GROUP_DETAIL_SUCCESS'
export const GET_CAUSE_GROUP_DETAIL_FAIL = 'QMSX_GET_CAUSE_GROUP_DETAIL_FAIL'
//Action: Reset state detail
export const RESET_CAUSE_GROUP_DETAIL_STATE =
  'QMSX_RESET_CAUSE_GROUP_DETAIL_STATE'

/**
 * Search Cause Group start action
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchCauseGroup(payload, onSuccess, onError) {
  return {
    type: SEARCH_CAUSE_GROUP_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search Cause Group success action
 * @param {*} payload
 * @returns {object}
 */
export function searchCauseGroupSuccess(payload) {
  return {
    type: SEARCH_CAUSE_GROUP_SUCCESS,
    payload: payload,
  }
}

/**
 * Search Cause Group fail action
 * @returns {object}
 */
export function searchCauseGroupFail() {
  return {
    type: SEARCH_CAUSE_GROUP_FAIL,
  }
}

/**
 * Create Cause Group start action
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createCauseGroup(payload, onSuccess, onError) {
  return {
    type: CREATE_CAUSE_GROUP_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Create Cause Group success action
 * @param {*} payload
 * @returns {object}
 */
export function createCauseGroupSuccess(payload) {
  return {
    type: CREATE_CAUSE_GROUP_SUCCESS,
    payload: payload,
  }
}

/**
 * Create Cause Group fail action
 * @returns {object}
 */
export function createCauseGroupFail() {
  return {
    type: CREATE_CAUSE_GROUP_FAIL,
  }
}

/**
 * Update Cause Group start action
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateCauseGroup(payload, onSuccess, onError) {
  return {
    type: UPDATE_CAUSE_GROUP_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Update Cause Group success action
 * @param {*} payload
 * @returns {object}
 */
export function updateCauseGroupSuccess(payload) {
  return {
    type: UPDATE_CAUSE_GROUP_SUCCESS,
    payload: payload,
  }
}

/**
 * Update Cause Group fail action
 * @returns {object}
 */
export function updateCauseGroupFail() {
  return {
    type: UPDATE_CAUSE_GROUP_FAIL,
  }
}

/**
 * Delete Cause Group start action
 * @param {int} causeGroupId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteCauseGroup(causeGroupId, onSuccess, onError) {
  return {
    type: DELETE_CAUSE_GROUP_START,
    payload: causeGroupId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete Cause Group success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteCauseGroupSuccess(payload) {
  return {
    type: DELETE_CAUSE_GROUP_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete Cause Group fail action
 * @returns {object}
 */
export function deleteCauseGroupFail() {
  return {
    type: DELETE_CAUSE_GROUP_FAIL,
  }
}

/**
 * Get Cause Group detail by id start action
 * @param {int} causeGroupId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getCauseGroupDetailById(causeGroupId, onSuccess, onError) {
  return {
    type: GET_CAUSE_GROUP_DETAIL_START,
    payload: causeGroupId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get Cause Group detail by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getCauseGroupDetailByIdSuccess(payload) {
  return {
    type: GET_CAUSE_GROUP_DETAIL_SUCCESS,
    payload: payload,
  }
}

/**
 * Get Cause Group detail by id fail action
 * @returns {object}
 */
export function getCauseGroupDetailByIdFail() {
  return {
    type: GET_CAUSE_GROUP_DETAIL_FAIL,
  }
}

/**
 * Reset state action
 * @returns {object}
 */
export function resetCauseGroupDetailState() {
  return {
    type: RESET_CAUSE_GROUP_DETAIL_STATE,
  }
}

export default {
  searchCauseGroup,
  searchCauseGroupSuccess,
  searchCauseGroupFail,
  createCauseGroup,
  createCauseGroupSuccess,
  createCauseGroupFail,
  getCauseGroupDetailById,
  getCauseGroupDetailByIdSuccess,
  getCauseGroupDetailByIdFail,
  updateCauseGroup,
  updateCauseGroupSuccess,
  updateCauseGroupFail,
  deleteCauseGroup,
  deleteCauseGroupSuccess,
  deleteCauseGroupFail,
  resetCauseGroupDetailState,
}
