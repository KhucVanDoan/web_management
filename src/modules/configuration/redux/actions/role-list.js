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
}
