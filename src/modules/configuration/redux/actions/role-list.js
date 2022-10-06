export const SEARCH_ROLE_LIST_START = 'CONFIGURATION_SEARCH_ROLE_LIST_START'
export const SEARCH_ROLE_LIST_SUCCESS = 'CONFIGURATION_SEARCH_ROLE_LIST_SUCCESS'
export const SEARCH_ROLE_LIST_FAILED = 'CONFIGURATION_SEARCH_ROLE_LIST_FAILED'

export const UPDATE_ROLE_ASSIGN_START = 'CONFIGURATION_UPDATE_ROLE_ASSIGN_START'
export const UPDATE_ROLE_ASSIGN_SUCCESS =
  'CONFIGURATION_UPDATE_ROLE_ASSIGN_SUCCESS'
export const UPDATE_ROLE_ASSIGN_FAILED =
  'CONFIGURATION_UPDATE_ROLE_ASSIGN_FAILED'

export const GET_ROLE_ASSIGN_DETAILS_START =
  'CONFIGURATION_GET_ROLE_ASSIGN_DETAILS_START'
export const GET_ROLE_ASSIGN_DETAILS_SUCCESS =
  'CONFIGURATION_GET_ROLE_ASSIGN_DETAILS_SUCCESS'
export const GET_ROLE_ASSIGN_DETAILS_FAILED =
  'CONFIGURATION_GET_ROLE_ASSIGN_DETAILS_FAILED'

export const RESET_ROLE_ASSIGN_DETAILS_STATE =
  'CONFIGURATION_RESET_ROLE_ASSIGN_DETAILS_STATE'

export const CREATE_ROLE_START = 'CREATE_ROLE_START'
export const CREATE_ROLE_SUCCESS = 'CREATE_ROLE_SUCCESS'
export const CREATE_ROLE_FAILED = 'CREATE_ROLE_FAILED'

export const UPDATE_ROLE_START = 'UPDATE_ROLE_START'
export const UPDATE_ROLE_SUCCESS = 'UPDATE_ROLE_SUCCESS'
export const UPDATE_ROLE_FAILED = 'UPDATE_ROLE_FAILED'

export const GET_ROLE_DETAIL_START = 'GET_ROLE_DETAIL_START'
export const GET_ROLE_DETAIL_SUCCESS = 'GET_ROLE_DETAIL_SUCCESS'
export const GET_ROLE_DETAIL_FAILED = 'GET_ROLE_DETAIL_FAILED'

export const RESET_ROLE_STATE = 'RESET_ROLE_STATE'

export const DELETE_ROLE_START = 'DELETE_ROLE_START'
export const DELETE_ROLE_SUCCESS = 'DELETE_ROLE_SUCCESS'
export const DELETE_ROLE_FAILED = 'DELETE_ROLE_FAILED'

export function searchRoleList(payload, onSuccess, onError) {
  return {
    type: SEARCH_ROLE_LIST_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function searchRoleListSuccess(payload) {
  return {
    type: SEARCH_ROLE_LIST_SUCCESS,
    payload: payload,
  }
}

export function searchRoleListFailed() {
  return {
    type: SEARCH_ROLE_LIST_FAILED,
  }
}

export function updateRoleAssign(payload, onSuccess, onError) {
  return {
    type: UPDATE_ROLE_ASSIGN_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function updateRoleAssignSuccess(payload) {
  return {
    type: UPDATE_ROLE_ASSIGN_SUCCESS,
    payload: payload,
  }
}

export function updateRoleAssignFailed() {
  return {
    type: UPDATE_ROLE_ASSIGN_FAILED,
  }
}

export function getRoleAssignDetails(payload, onSuccess, onError) {
  return {
    type: GET_ROLE_ASSIGN_DETAILS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getRoleAssignDetailsSuccess(payload) {
  return {
    type: GET_ROLE_ASSIGN_DETAILS_SUCCESS,
    payload: payload,
  }
}

export function getRoleAssignDetailsFailed() {
  return {
    type: GET_ROLE_ASSIGN_DETAILS_FAILED,
  }
}

export function resetRoleAssignDetailsState() {
  return {
    type: RESET_ROLE_ASSIGN_DETAILS_STATE,
  }
}

export function createRole(payload, onSuccess, onError) {
  return {
    type: CREATE_ROLE_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function createRoleSuccess(payload) {
  return {
    type: CREATE_ROLE_SUCCESS,
    payload: payload,
  }
}

export function createRoleFailed() {
  return {
    type: CREATE_ROLE_FAILED,
  }
}

export function updateRole(payload, onSuccess, onError) {
  return {
    type: UPDATE_ROLE_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function updateRoleSuccess(payload) {
  return {
    type: UPDATE_ROLE_SUCCESS,
    payload: payload,
  }
}

export function updateRoleFailed() {
  return {
    type: UPDATE_ROLE_FAILED,
  }
}

/**
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getRoleDetailsById(payload, onSuccess, onError) {
  return {
    type: GET_ROLE_DETAIL_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get role details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getRoleDetailsByIdSuccess(payload) {
  return {
    type: GET_ROLE_DETAIL_SUCCESS,
    payload: payload,
  }
}

/**
 * Get role details by id failed action
 * @returns {object}
 */
export function getRoleDetailsByIdFailed() {
  return {
    type: GET_ROLE_DETAIL_FAILED,
  }
}

export function resetRoleState() {
  return {
    type: RESET_ROLE_STATE,
  }
}

export function deleteRole(roleId, onSuccess, onError) {
  return {
    type: DELETE_ROLE_START,
    payload: roleId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete role success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteRoleSuccess(payload) {
  return {
    type: DELETE_ROLE_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete role failed action
 * @returns {object}
 */
export function deleteRoleFailed() {
  return {
    type: DELETE_ROLE_FAILED,
  }
}

export default {
  searchRoleList,
  searchRoleListSuccess,
  searchRoleListFailed,
  updateRoleAssign,
  updateRoleAssignSuccess,
  updateRoleAssignFailed,
  getRoleAssignDetails,
  getRoleAssignDetailsSuccess,
  getRoleAssignDetailsFailed,
  resetRoleAssignDetailsState,
  createRole,
  createRoleFailed,
  createRoleSuccess,
  updateRole,
  updateRoleFailed,
  updateRoleSuccess,
  getRoleDetailsById,
  getRoleDetailsByIdFailed,
  getRoleDetailsByIdSuccess,
  resetRoleState,
  deleteRole,
  deleteRoleSuccess,
  deleteRoleFailed,
}
