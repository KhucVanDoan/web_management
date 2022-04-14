//@Define Action
export const SEARCH_CHECK_LIST_START = 'QMSX_SEARCH_CHECK_LIST_START'
export const SEARCH_CHECK_LIST_SUCCESS = 'QMSX_SEARCH_CHECK_LIST_SUCCESS'
export const SEARCH_CHECK_LIST_FAIL = 'QMSX_SEARCH_CHECK_LIST_FAIL'
// Action: Get List
export const CREATE_CHECK_LIST_START = 'QMSX_CREATE_CHECK_LIST_START'
export const CREATE_CHECK_LIST_SUCCESS = 'QMSX_CREATE_CHECK_LIST_SUCCESS'
export const CREATE_CHECK_LIST_FAIL = 'QMSX_CREATE_CHECK_LIST_FAIL'
// Action: Update
export const UPDATE_CHECK_LIST_START = 'QMSX_UPDATE_CHECK_LIST_START'
export const UPDATE_CHECK_LIST_SUCCESS = 'QMSX_UPDATE_CHECK_LIST_SUCCESS'
export const UPDATE_CHECK_LIST_FAIL = 'QMSX_UPDATE_CHECK_LIST_FAIL'
// Action: Delete
export const DELETE_CHECK_LIST_START = 'QMSX_DELETE_CHECK_LIST_START'
export const DELETE_CHECK_LIST_SUCCESS = 'QMSX_DELETE_CHECK_LIST_SUCCESS'
export const DELETE_CHECK_LIST_FAIL = 'QMSX_DELETE_CHECK_LIST_FAIL'
// Action: Get detail
export const GET_CHECK_LIST_DETAIL_START = 'QMSX_GET_CHECK_LIST_DETAIL_START'
export const GET_CHECK_LIST_DETAIL_SUCCESS =
  'QMSX_GET_CHECK_LIST_DETAIL_SUCCESS'
export const GET_CHECK_LIST_DETAIL_FAIL = 'QMSX_GET_CHECK_LIST_DETAIL_FAIL'
// Action: Confirm
export const CONFIRM_CHECK_LIST_START = 'QMSX_CONFIRM_CHECK_LIST_START'
export const CONFIRM_CHECK_LIST_SUCCESS = 'QMSX_CONFIRM_CHECK_LIST_SUCCESS'
export const CONFIRM_CHECK_LIST_FAIL = 'QMSX_CONFIRM_CHECK_LIST_FAIL'
// Action: Get reset detail
export const RESET_CHECK_LIST_DETAIL_STATE =
  'QMSX_RESET_CHECK_LIST_DETAIL_STATE'

/**
 * Search check list start action
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchCheckList(payload, onSuccess, onError) {
  return {
    type: SEARCH_CHECK_LIST_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search check list success action
 * @param {*} payload
 * @returns {object}
 */
export function searchCheckListSuccess(payload) {
  return {
    type: SEARCH_CHECK_LIST_SUCCESS,
    payload: payload,
  }
}

/**
 * Search check list fail action
 * @returns {object}
 */
export function searchCheckListFail() {
  return {
    type: SEARCH_CHECK_LIST_FAIL,
  }
}

/**
 * Create check list start action
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createCheckList(payload, onSuccess, onError) {
  return {
    type: CREATE_CHECK_LIST_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Create check list success action
 * @param {*} payload
 * @returns {object}
 */
export function createCheckListSuccess(payload) {
  return {
    type: CREATE_CHECK_LIST_SUCCESS,
    payload: payload,
  }
}

/**
 * Create check list fail action
 * @returns {object}
 */
export function createCheckListFail() {
  return {
    type: CREATE_CHECK_LIST_FAIL,
  }
}

/**
 * Update check list start action
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateCheckList(payload, onSuccess, onError) {
  return {
    type: UPDATE_CHECK_LIST_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Update check list success action
 * @param {*} payload
 * @returns {object}
 */
export function updateCheckListSuccess(payload) {
  return {
    type: UPDATE_CHECK_LIST_SUCCESS,
    payload: payload,
  }
}

/**
 * Update check list fail action
 * @returns {object}
 */
export function updateCheckListFail() {
  return {
    type: UPDATE_CHECK_LIST_FAIL,
  }
}
/**
 * Delete check list start action
 * @param {int} checkListId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteCheckList(checkListId, onSuccess, onError) {
  return {
    type: DELETE_CHECK_LIST_START,
    payload: checkListId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete check list success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteCheckListSuccess(payload) {
  return {
    type: DELETE_CHECK_LIST_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete check list fail action
 * @returns {object}
 */
export function deleteCheckListFail() {
  return {
    type: DELETE_CHECK_LIST_FAIL,
  }
}

/**
 * Get check list detail start action
 * @param {int} checkListId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getCheckListDetailById(checkListId, onSuccess, onError) {
  return {
    type: GET_CHECK_LIST_DETAIL_START,
    payload: checkListId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get check list detail success action
 * @param {*} payload
 * @returns {object}
 */
export function getCheckListDetailByIdSuccess(payload) {
  return {
    type: GET_CHECK_LIST_DETAIL_SUCCESS,
    payload: payload,
  }
}

/**
 * Get check list detail fail action
 * @returns {object}
 */
export function getCheckListDetailByIdFail() {
  return {
    type: GET_CHECK_LIST_DETAIL_FAIL,
  }
}

/**
 * Get confirm check list start action
 * @param {int} checkListId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function confirmCheckList(checkListId, onSuccess, onError) {
  return {
    type: CONFIRM_CHECK_LIST_START,
    payload: checkListId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get confirm check list success action
 * @param {*} payload
 * @returns {object}
 */
export function confirmCheckListSuccess(payload) {
  return {
    type: CONFIRM_CHECK_LIST_SUCCESS,
    payload: payload,
  }
}

/**
 * Get confirm check list fail action
 * @returns {object}
 */
export function confirmCheckListFail() {
  return {
    type: CONFIRM_CHECK_LIST_FAIL,
  }
}

/**
 * Reset detail state action
 * @returns {object}
 */
export function resetCheckListDetailState() {
  return {
    type: RESET_CHECK_LIST_DETAIL_STATE,
  }
}

export default {
  searchCheckList,
  searchCheckListSuccess,
  searchCheckListFail,
  createCheckList,
  createCheckListSuccess,
  createCheckListFail,
  getCheckListDetailById,
  getCheckListDetailByIdSuccess,
  getCheckListDetailByIdFail,
  updateCheckList,
  updateCheckListSuccess,
  updateCheckListFail,
  deleteCheckList,
  deleteCheckListSuccess,
  deleteCheckListFail,
  confirmCheckList,
  confirmCheckListSuccess,
  confirmCheckListFail,
  resetCheckListDetailState,
}
