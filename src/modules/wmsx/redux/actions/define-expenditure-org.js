export const SEARCH_EXPENDITURE_ORG_START = 'WMSX_SEARCH_EXPENDITURE_ORG_START'
export const SEARCH_EXPENDITURE_ORG_SUCCESS =
  'WMSX_SEARCH_EXPENDITURE_ORG_SUCCESS'
export const SEARCH_EXPENDITURE_ORG_FAILED =
  'WMSX_SEARCH_EXPENDITURE_ORG_FAILED'

export const CREATE_EXPENDITURE_ORG_START = 'WMSX_CREATE_EXPENDITURE_ORG_START'
export const CREATE_EXPENDITURE_ORG_SUCCESS =
  'WMSX_CREATE_EXPENDITURE_ORG_SUCCESS'
export const CREATE_EXPENDITURE_ORG_FAILED =
  'WMSX_CREATE_EXPENDITURE_ORG_FAILED'

export const UPDATE_EXPENDITURE_ORG_START = 'WMSX_UPDATE_EXPENDITURE_ORG_START'
export const UPDATE_EXPENDITURE_ORG_SUCCESS =
  'WMSX_UPDATE_EXPENDITURE_ORG_SUCCESS'
export const UPDATE_EXPENDITURE_ORG_FAILED =
  'WMSX_UPDATE_EXPENDITURE_ORG_FAILED'

export const DELETE_EXPENDITURE_ORG_START = 'WMSX_DELETE_EXPENDITURE_ORG_START'
export const DELETE_EXPENDITURE_ORG_SUCCESS =
  'WMSX_DELETE_EXPENDITURE_ORG_SUCCESS'
export const DELETE_EXPENDITURE_ORG_FAILED =
  'WMSX_DELETE_EXPENDITURE_ORG_FAILED'

export const GET_EXPENDITURE_ORG_DETAILS_START =
  'WMSX_GET_EXPENDITURE_ORG_DETAILS_START'
export const GET_EXPENDITURE_ORG_DETAILS_SUCCESS =
  'WMSX_GET_EXPENDITURE_ORG_DETAILS_SUCCESS'
export const GET_EXPENDITURE_ORG_DETAILS_FAILED =
  'WMSX_GET_EXPENDITURE_ORG_DETAILS_FAILED'

export const CONFIRM_EXPENDITURE_ORG_START =
  'WMSX_CONFIRM_EXPENDITURE_ORG_START'
export const CONFIRM_EXPENDITURE_ORG_SUCCESS =
  'WMSX_CONFIRM_EXPENDITURE_ORG_SUCCESS'
export const CONFIRM_EXPENDITURE_ORG_FAILED =
  'WMSX_CONFIRM_EXPENDITURE_ORG_FAILED'

export const REJECT_EXPENDITURE_ORG_START = 'WMSX_REJECT_EXPENDITURE_ORG_START'
export const REJECT_EXPENDITURE_ORG_SUCCESS =
  'WMSX_REJECT_EXPENDITURE_ORG_SUCCESS'
export const REJECT_EXPENDITURE_ORG_FAILED =
  'WMSX_REJECT_EXPENDITURE_ORG_FAILED'

export const RESET_EXPENDITURE_ORG_DETAILS_STATE =
  'WMSX_RESET_EXPENDITURE_ORG_DETAILS_STATE'

export function searchExpenditureOrg(payload, onSuccess, onError) {
  return {
    type: SEARCH_EXPENDITURE_ORG_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function searchExpenditureOrgSuccess(payload) {
  return {
    type: SEARCH_EXPENDITURE_ORG_SUCCESS,
    payload: payload,
  }
}

export function searchExpenditureOrgFailed() {
  return {
    type: SEARCH_EXPENDITURE_ORG_FAILED,
  }
}

export function createExpenditureOrg(payload, onSuccess, onError) {
  return {
    type: CREATE_EXPENDITURE_ORG_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function createExpenditureOrgSuccess(payload) {
  return {
    type: CREATE_EXPENDITURE_ORG_SUCCESS,
    payload: payload,
  }
}

export function createExpenditureOrgFailed() {
  return {
    type: CREATE_EXPENDITURE_ORG_FAILED,
  }
}

export function updateExpenditureOrg(payload, onSuccess, onError) {
  return {
    type: UPDATE_EXPENDITURE_ORG_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function updateExpenditureOrgSuccess(payload) {
  return {
    type: UPDATE_EXPENDITURE_ORG_SUCCESS,
    payload: payload,
  }
}

export function updateExpenditureOrgFailed() {
  return {
    type: UPDATE_EXPENDITURE_ORG_FAILED,
  }
}

export function deleteExpenditureOrg(packageId, onSuccess, onError) {
  return {
    type: DELETE_EXPENDITURE_ORG_START,
    payload: packageId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function deleteExpenditureOrgSuccess(payload) {
  return {
    type: DELETE_EXPENDITURE_ORG_SUCCESS,
    payload: payload,
  }
}

export function deleteExpenditureOrgFailed() {
  return {
    type: DELETE_EXPENDITURE_ORG_FAILED,
  }
}

export function getExpenditureOrgDetailsById(packageId, onSuccess, onError) {
  return {
    type: GET_EXPENDITURE_ORG_DETAILS_START,
    payload: packageId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getExpenditureOrgDetailsByIdSuccess(payload) {
  return {
    type: GET_EXPENDITURE_ORG_DETAILS_SUCCESS,
    payload: payload,
  }
}

export function getExpenditureOrgDetailsByIdFailed() {
  return {
    type: GET_EXPENDITURE_ORG_DETAILS_FAILED,
  }
}

export function confirmExpenditureOrgById(Id, onSuccess, onError) {
  return {
    type: CONFIRM_EXPENDITURE_ORG_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function confirmExpenditureOrgByIdSuccess(payload) {
  return {
    type: CONFIRM_EXPENDITURE_ORG_SUCCESS,
    payload: payload,
  }
}

export function confirmExpenditureOrgByIdFailed() {
  return {
    type: CONFIRM_EXPENDITURE_ORG_FAILED,
  }
}

export function rejectExpenditureOrgById(Id, onSuccess, onError) {
  return {
    type: REJECT_EXPENDITURE_ORG_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function rejectExpenditureOrgByIdSuccess(payload) {
  return {
    type: REJECT_EXPENDITURE_ORG_SUCCESS,
    payload: payload,
  }
}

export function rejectExpenditureOrgByIdFailed() {
  return {
    type: REJECT_EXPENDITURE_ORG_FAILED,
  }
}

export function resetExpenditureOrgDetailsState() {
  return {
    type: RESET_EXPENDITURE_ORG_DETAILS_STATE,
  }
}

export default {
  searchExpenditureOrg,
  searchExpenditureOrgSuccess,
  searchExpenditureOrgFailed,
  createExpenditureOrg,
  createExpenditureOrgSuccess,
  createExpenditureOrgFailed,
  updateExpenditureOrg,
  updateExpenditureOrgSuccess,
  updateExpenditureOrgFailed,
  deleteExpenditureOrg,
  deleteExpenditureOrgSuccess,
  deleteExpenditureOrgFailed,
  getExpenditureOrgDetailsById,
  getExpenditureOrgDetailsByIdSuccess,
  getExpenditureOrgDetailsByIdFailed,
  confirmExpenditureOrgById,
  confirmExpenditureOrgByIdSuccess,
  confirmExpenditureOrgByIdFailed,
  rejectExpenditureOrgById,
  rejectExpenditureOrgByIdSuccess,
  rejectExpenditureOrgByIdFailed,
  resetExpenditureOrgDetailsState,
}
