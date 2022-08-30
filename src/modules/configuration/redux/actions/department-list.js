export const SEARCH_DEPARTMENT_LIST_START =
  'CONFIGURATION_SEARCH_DEPARTMENT_LIST_START'
export const SEARCH_DEPARTMENT_LIST_SUCCESS =
  'CONFIGURATION_SEARCH_DEPARTMENT_LIST_SUCCESS'
export const SEARCH_DEPARTMENT_LIST_FAILED =
  'CONFIGURATION_SEARCH_DEPARTMENT_LIST_FAILED'

export const UPDATE_DEPARTMENT_ASSIGN_START =
  'CONFIGURATION_UPDATE_DEPARTMENT_ASSIGN_START'
export const UPDATE_DEPARTMENT_ASSIGN_SUCCESS =
  'CONFIGURATION_UPDATE_DEPARTMENT_ASSIGN_SUCCESS'
export const UPDATE_DEPARTMENT_ASSIGN_FAILED =
  'CONFIGURATION_UPDATE_DEPARTMENT_ASSIGN_FAILED'

export const GET_DEPARTMENT_ASSIGN_DETAILS_START =
  'CONFIGURATION_GET_DEPARTMENT_ASSIGN_DETAILS_START'
export const GET_DEPARTMENT_ASSIGN_DETAILS_SUCCESS =
  'CONFIGURATION_GET_DEPARTMENT_ASSIGN_DETAILS_SUCCESS'
export const GET_DEPARTMENT_ASSIGN_DETAILS_FAILED =
  'CONFIGURATION_GET_DEPARTMENT_ASSIGN_DETAILS_FAILED'

export const RESET_DEPARTMENT_ASSIGN_DETAILS_STATE =
  'CONFIGURATION_RESET_DEPARTMENT_ASSIGN_DETAILS_STATE'

export function searchDepartmentList(payload, onSuccess, onError) {
  return {
    type: SEARCH_DEPARTMENT_LIST_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function searchDepartmentListSuccess(payload) {
  return {
    type: SEARCH_DEPARTMENT_LIST_SUCCESS,
    payload: payload,
  }
}

export function searchDepartmentListFailed() {
  return {
    type: SEARCH_DEPARTMENT_LIST_FAILED,
  }
}

export function updateDepartmentAssign(payload, onSuccess, onError) {
  return {
    type: UPDATE_DEPARTMENT_ASSIGN_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function updateDepartmentAssignSuccess(payload) {
  return {
    type: UPDATE_DEPARTMENT_ASSIGN_SUCCESS,
    payload: payload,
  }
}

export function updateDepartmentAssignFailed() {
  return {
    type: UPDATE_DEPARTMENT_ASSIGN_FAILED,
  }
}

export function getDepartmentAssignDetails(payload, onSuccess, onError) {
  return {
    type: GET_DEPARTMENT_ASSIGN_DETAILS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getDepartmentAssignDetailsSuccess(payload) {
  return {
    type: GET_DEPARTMENT_ASSIGN_DETAILS_SUCCESS,
    payload: payload,
  }
}

export function getDepartmentAssignDetailsFailed() {
  return {
    type: GET_DEPARTMENT_ASSIGN_DETAILS_FAILED,
  }
}

export function resetDepartmentAssignDetailsState() {
  return {
    type: RESET_DEPARTMENT_ASSIGN_DETAILS_STATE,
  }
}

export default {
  searchDepartmentList,
  searchDepartmentListSuccess,
  searchDepartmentListFailed,
  updateDepartmentAssign,
  updateDepartmentAssignSuccess,
  updateDepartmentAssignFailed,
  getDepartmentAssignDetails,
  getDepartmentAssignDetailsSuccess,
  getDepartmentAssignDetailsFailed,
  resetDepartmentAssignDetailsState,
}
