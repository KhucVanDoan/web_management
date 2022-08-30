export const GET_SOURCE_MANAGEMENT_START = 'WMSX_GET_SOURCE_MANAGEMENT_START'
export const GET_SOURCE_MANAGEMENT_SUCCESS =
  'WMSX_GET_SOURCE_MANAGEMENT_SUCCESS'
export const GET_SOURCE_MANAGEMENT_FAILED = 'WMSX_GET_SOURCE_MANAGEMENT_FAILED'

export const SEARCH_SOURCE_MANAGEMENT_START =
  'WMSX_SEARCH_SOURCE_MANAGEMENT_START'
export const SEARCH_SOURCE_MANAGEMENT_SUCCESS =
  'WMSX_SEARCH_SOURCE_MANAGEMENT_SUCCESS'
export const SEARCH_SOURCE_MANAGEMENT_FAILED =
  'WMSX_SEARCH_SOURCE_MANAGEMENT_FAILED'

export const CREATE_SOURCE_MANAGEMENT_START =
  'WMSX_CREATE_SOURCE_MANAGEMENT_START'
export const CREATE_SOURCE_MANAGEMENT_SUCCESS =
  'WMSX_CREATE_SOURCE_MANAGEMENT_SUCCESS'
export const CREATE_SOURCE_MANAGEMENT_FAILED =
  'WMSX_CREATE_SOURCE_MANAGEMENT_FAILED'

export const UPDATE_SOURCE_MANAGEMENT_START =
  'WMSX_UPDATE_SOURCE_MANAGEMENT_START'
export const UPDATE_SOURCE_MANAGEMENT_SUCCESS =
  'WMSX_UPDATE_SOURCE_MANAGEMENT_SUCCESS'
export const UPDATE_SOURCE_MANAGEMENT_FAILED =
  'WMSX_UPDATE_SOURCE_MANAGEMENT_FAILED'

export const DELETE_SOURCE_MANAGEMENT_START =
  'WMSX_DELETE_SOURCE_MANAGEMENT_START'
export const DELETE_SOURCE_MANAGEMENT_SUCCESS =
  'WMSX_DELETE_SOURCE_MANAGEMENT_SUCCESS'
export const DELETE_SOURCE_MANAGEMENT_FAILED =
  'WMSX_DELETE_SOURCE_MANAGEMENT_FAILED'

export const CONFIRM_SOURCE_MANAGEMENT_START =
  'WMSX_CONFIRM_SOURCE_MANAGEMENT_START'
export const CONFIRM_SOURCE_MANAGEMENT_SUCCESS =
  'WMSX_CONFIRM_SOURCE_MANAGEMENT_SUCCESS'
export const CONFIRM_SOURCE_MANAGEMENT_FAILED =
  'WMSX_CONFIRM_SOURCE_MANAGEMENT_FAILED'

export const REJECT_SOURCE_MANAGEMENT_START =
  'WMSX_REJECT_SOURCE_MANAGEMENT_START'
export const REJECT_SOURCE_MANAGEMENT_SUCCESS =
  'WMSX_REJECT_SOURCE_MANAGEMENT_SUCCESS'
export const REJECT_SOURCE_MANAGEMENT_FAILED =
  'WMSX_REJECT_SOURCE_MANAGEMENT_FAILED'
export const RESET_SOURCE_MANAGEMENT_STATE =
  'WMSX_RESET_SOURCE_MANAGEMENT_STATE'

export function searchSourceManagement(payload, onSuccess, onError) {
  return {
    type: SEARCH_SOURCE_MANAGEMENT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function searchSourceManagementSuccess(payload) {
  return {
    type: SEARCH_SOURCE_MANAGEMENT_SUCCESS,
    payload: payload,
  }
}

export function searchSourceManagementFailed() {
  return {
    type: SEARCH_SOURCE_MANAGEMENT_FAILED,
  }
}

export function createSourceManagement(payload, onSuccess, onError) {
  return {
    type: CREATE_SOURCE_MANAGEMENT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function createSourceManagementSuccess(payload) {
  return {
    type: CREATE_SOURCE_MANAGEMENT_SUCCESS,
    payload: payload,
  }
}

export function createSourceManagementFailed() {
  return {
    type: CREATE_SOURCE_MANAGEMENT_FAILED,
  }
}

export function updateSourceManagement(payload, onSuccess, onError) {
  return {
    type: UPDATE_SOURCE_MANAGEMENT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function updateSourceManagementSuccess(payload) {
  return {
    type: UPDATE_SOURCE_MANAGEMENT_SUCCESS,
    payload: payload,
  }
}

export function updateSourceManagementFailed() {
  return {
    type: UPDATE_SOURCE_MANAGEMENT_FAILED,
  }
}

export function deleteSourceManagement(payload, onSuccess, onError) {
  return {
    type: DELETE_SOURCE_MANAGEMENT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function deleteSourceManagementSuccess(payload) {
  return {
    type: DELETE_SOURCE_MANAGEMENT_SUCCESS,
    payload: payload,
  }
}

export function deleteSourceManagementFailed() {
  return {
    type: DELETE_SOURCE_MANAGEMENT_FAILED,
  }
}

export function getDetailSourceManagementById(payload, onSuccess, onError) {
  return {
    type: GET_SOURCE_MANAGEMENT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getDetailSourceManagementByIdSuccess(payload) {
  return {
    type: GET_SOURCE_MANAGEMENT_SUCCESS,
    payload: payload,
  }
}

export function getDetailSourceManagementByIdFailed() {
  return {
    type: GET_SOURCE_MANAGEMENT_FAILED,
  }
}

export function confirmSourceManagementById(
  SourceManagementId,
  onSuccess,
  onError,
) {
  return {
    type: CONFIRM_SOURCE_MANAGEMENT_START,
    payload: SourceManagementId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function confirmSourceManagementByIdSuccess(payload) {
  return {
    type: CONFIRM_SOURCE_MANAGEMENT_SUCCESS,
    payload: payload,
  }
}

export function confirmSourceManagementByIdFailed() {
  return {
    type: CONFIRM_SOURCE_MANAGEMENT_FAILED,
  }
}

export function rejectSourceManagementById(
  SourceManagementId,
  onSuccess,
  onError,
) {
  return {
    type: REJECT_SOURCE_MANAGEMENT_START,
    payload: SourceManagementId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function rejectSourceManagementByIdSuccess(payload) {
  return {
    type: REJECT_SOURCE_MANAGEMENT_SUCCESS,
    payload: payload,
  }
}

export function rejectSourceManagementByIdFailed() {
  return {
    type: REJECT_SOURCE_MANAGEMENT_FAILED,
  }
}
export function resetSourceManagementState() {
  return {
    type: RESET_SOURCE_MANAGEMENT_STATE,
  }
}

export default {
  searchSourceManagement,
  searchSourceManagementSuccess,
  searchSourceManagementFailed,
  createSourceManagement,
  createSourceManagementSuccess,
  createSourceManagementFailed,
  updateSourceManagement,
  updateSourceManagementSuccess,
  updateSourceManagementFailed,
  deleteSourceManagement,
  deleteSourceManagementSuccess,
  deleteSourceManagementFailed,
  getDetailSourceManagementById,
  getDetailSourceManagementByIdSuccess,
  getDetailSourceManagementByIdFailed,
  confirmSourceManagementById,
  confirmSourceManagementByIdFailed,
  confirmSourceManagementByIdSuccess,
  rejectSourceManagementById,
  rejectSourceManagementByIdSuccess,
  rejectSourceManagementByIdFailed,
  resetSourceManagementState,
}
