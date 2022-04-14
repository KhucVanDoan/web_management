//@Define Action
// Action: Get List
export const SEARCH_ACTION_GROUP_START = 'QMSX_SEARCH_ACTION_GROUP_START'
export const SEARCH_ACTION_GROUP_SUCCESS = 'QMSX_SEARCH_ACTION_GROUP_SUCCESS'
export const SEARCH_ACTION_GROUP_FAIL = 'QMSX_SEARCH_ACTION_GROUP_FAIL'
// Action: Create
export const CREATE_ACTION_GROUP_START = 'QMSX_CREATE_ACTION_GROUP_START'
export const CREATE_ACTION_GROUP_SUCCESS = 'QMSX_CREATE_ACTION_GROUP_SUCCESS'
export const CREATE_ACTION_GROUP_FAIL = 'QMSX_CREATE_ACTION_GROUP_FAIL'
// Action: Update
export const UPDATE_ACTION_GROUP_START = 'QMSX_UPDATE_ACTION_GROUP_START'
export const UPDATE_ACTION_GROUP_SUCCESS = 'QMSX_UPDATE_ACTION_GROUP_SUCCESS'
export const UPDATE_ACTION_GROUP_FAIL = 'QMSX_UPDATE_ACTION_GROUP_FAIL'
// Action: Delete
export const DELETE_ACTION_GROUP_START = 'QMSX_DELETE_ACTION_GROUP_START'
export const DELETE_ACTION_GROUP_SUCCESS = 'QMSX_DELETE_ACTION_GROUP_SUCCESS'
export const DELETE_ACTION_GROUP_FAIL = 'QMSX_DELETE_ACTION_GROUP_FAIL'
// Action: Get detail
export const GET_ACTION_GROUP_DETAIL_START =
  'QMSX_GET_ACTION_GROUP_DETAIL_START'
export const GET_ACTION_GROUP_DETAIL_SUCCESS =
  'QMSX_GET_ACTION_GROUP_DETAIL_SUCCESS'
export const GET_ACTION_GROUP_DETAIL_FAIL = 'QMSX_GET_ACTION_GROUP_DETAIL_FAIL'
// Action: Get reset detail
export const RESET_ACTION_GROUP_DETAIL_STATE =
  'QMSX_RESET_ACTION_GROUP_DETAIL_STATE'

/**
 * Search Action Group
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchActionGroup(payload, onSuccess, onError) {
  return {
    type: SEARCH_ACTION_GROUP_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search Action Group success action
 * @param {*} payload
 * @returns {object}
 */
export function searchActionGroupSuccess(payload) {
  return {
    type: SEARCH_ACTION_GROUP_SUCCESS,
    payload: payload,
  }
}

/**
 * Search Action Group fail action
 * @returns {object}
 */
export function searchActionGroupFail() {
  return {
    type: SEARCH_ACTION_GROUP_FAIL,
  }
}

/**
 * Create Action Group
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createActionGroup(payload, onSuccess, onError) {
  return {
    type: CREATE_ACTION_GROUP_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Create Action Group success action
 * @param {*} payload
 * @returns {object}
 */
export function createActionGroupSuccess(payload) {
  return {
    type: CREATE_ACTION_GROUP_SUCCESS,
    payload: payload,
  }
}

/**
 * Create Action Group fail action
 * @returns {object}
 */
export function createActionGroupFail() {
  return {
    type: CREATE_ACTION_GROUP_FAIL,
  }
}

/**
 * Update Action Group
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateActionGroup(payload, onSuccess, onError) {
  return {
    type: UPDATE_ACTION_GROUP_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Update action Group success action
 * @param {*} payload
 * @returns {object}
 */
export function updateActionGroupSuccess(payload) {
  return {
    type: UPDATE_ACTION_GROUP_SUCCESS,
    payload: payload,
  }
}

/**
 * Update Action Group fail action
 * @returns {object}
 */
export function updateActionGroupFail() {
  return {
    type: UPDATE_ACTION_GROUP_FAIL,
  }
}
/**
 * Delete Action Group
 * @param {int} actionGroupId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteActionGroup(actionGroupId, onSuccess, onError) {
  return {
    type: DELETE_ACTION_GROUP_START,
    payload: actionGroupId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete Action Group success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteActionGroupSuccess(payload) {
  return {
    type: DELETE_ACTION_GROUP_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete Action Group failed action
 * @returns {object}
 */
export function deleteActionGroupFail() {
  return {
    type: DELETE_ACTION_GROUP_FAIL,
  }
}

/**
 * Get Action Group details
 * @param {int} actionGroupId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getActionGroupDetailById(actionGroupId, onSuccess, onError) {
  return {
    type: GET_ACTION_GROUP_DETAIL_START,
    payload: actionGroupId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get Action Group detail by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getActionGroupDetailByIdSuccess(payload) {
  return {
    type: GET_ACTION_GROUP_DETAIL_SUCCESS,
    payload: payload,
  }
}

/**
 * Get Action Group details by id failed action
 * @returns {object}
 */
export function getActionGroupDetailByIdFail() {
  return {
    type: GET_ACTION_GROUP_DETAIL_FAIL,
  }
}

/**
 * Reset state action
 * @returns {object}
 */
export function resetActionGroupDetailState() {
  return {
    type: RESET_ACTION_GROUP_DETAIL_STATE,
  }
}

export default {
  searchActionGroup,
  searchActionGroupSuccess,
  searchActionGroupFail,
  createActionGroup,
  createActionGroupSuccess,
  createActionGroupFail,
  getActionGroupDetailById,
  getActionGroupDetailByIdSuccess,
  getActionGroupDetailByIdFail,
  updateActionGroup,
  updateActionGroupSuccess,
  updateActionGroupFail,
  deleteActionGroup,
  deleteActionGroupSuccess,
  deleteActionGroupFail,
  resetActionGroupDetailState,
}
