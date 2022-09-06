export const SEARCH_EXPENDITURE_TYPE_START =
  'WMSX_SEARCH_EXPENDITURE_TYPE_START'
export const SEARCH_EXPENDITURE_TYPE_SUCCESS =
  'WMSX_SEARCH_EXPENDITURE_TYPE_SUCCESS'
export const SEARCH_EXPENDITURE_TYPE_FAILED =
  'WMSX_SEARCH_EXPENDITURE_TYPE_FAILED'

export const CREATE_EXPENDITURE_TYPE_START =
  'WMSX_CREATE_EXPENDITURE_TYPE_START'
export const CREATE_EXPENDITURE_TYPE_SUCCESS =
  'WMSX_CREATE_EXPENDITURE_TYPE_SUCCESS'
export const CREATE_EXPENDITURE_TYPE_FAILED =
  'WMSX_CREATE_EXPENDITURE_TYPE_FAILED'

export const UPDATE_EXPENDITURE_TYPE_START =
  'WMSX_UPDATE_EXPENDITURE_TYPE_START'
export const UPDATE_EXPENDITURE_TYPE_SUCCESS =
  'WMSX_UPDATE_EXPENDITURE_TYPE_SUCCESS'
export const UPDATE_EXPENDITURE_TYPE_FAILED =
  'WMSX_UPDATE_EXPENDITURE_TYPE_FAILED'

export const DELETE_EXPENDITURE_TYPE_START =
  'WMSX_DELETE_EXPENDITURE_TYPE_START'
export const DELETE_EXPENDITURE_TYPE_SUCCESS =
  'WMSX_DELETE_EXPENDITURE_TYPE_SUCCESS'
export const DELETE_EXPENDITURE_TYPE_FAILED =
  'WMSX_DELETE_EXPENDITURE_TYPE_FAILED'

export const GET_EXPENDITURE_TYPE_DETAILS_START =
  'WMSX_GET_EXPENDITURE_TYPE_DETAILS_START'
export const GET_EXPENDITURE_TYPE_DETAILS_SUCCESS =
  'WMSX_GET_EXPENDITURE_TYPE_DETAILS_SUCCESS'
export const GET_EXPENDITURE_TYPE_DETAILS_FAILED =
  'WMSX_GET_EXPENDITURE_TYPE_DETAILS_FAILED'

export const CONFIRM_EXPENDITURE_TYPE_START =
  'WMSX_CONFIRM_EXPENDITURE_TYPE_START'
export const CONFIRM_EXPENDITURE_TYPE_SUCCESS =
  'WMSX_CONFIRM_EXPENDITURE_TYPE_SUCCESS'
export const CONFIRM_EXPENDITURE_TYPE_FAILED =
  'WMSX_CONFIRM_EXPENDITURE_TYPE_FAILED'

export const REJECT_EXPENDITURE_TYPE_START =
  'WMSX_REJECT_EXPENDITURE_TYPE_START'
export const REJECT_EXPENDITURE_TYPE_SUCCESS =
  'WMSX_REJECT_EXPENDITURE_TYPE_SUCCESS'
export const REJECT_EXPENDITURE_TYPE_FAILED =
  'WMSX_REJECT_EXPENDITURE_TYPE_FAILED'

export const RESET_EXPENDITURE_TYPE_DETAILS_STATE =
  'WMSX_RESET_EXPENDITURE_TYPE_DETAILS_STATE'

export function searchExpenditureType(payload, onSuccess, onError) {
  return {
    type: SEARCH_EXPENDITURE_TYPE_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function searchExpenditureTypeSuccess(payload) {
  return {
    type: SEARCH_EXPENDITURE_TYPE_SUCCESS,
    payload: payload,
  }
}

export function searchExpenditureTypeFailed() {
  return {
    type: SEARCH_EXPENDITURE_TYPE_FAILED,
  }
}

export function createExpenditureType(payload, onSuccess, onError) {
  return {
    type: CREATE_EXPENDITURE_TYPE_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function createExpenditureTypeSuccess(payload) {
  return {
    type: CREATE_EXPENDITURE_TYPE_SUCCESS,
    payload: payload,
  }
}

export function createExpenditureTypeFailed() {
  return {
    type: CREATE_EXPENDITURE_TYPE_FAILED,
  }
}

export function updateExpenditureType(payload, onSuccess, onError) {
  return {
    type: UPDATE_EXPENDITURE_TYPE_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function updateExpenditureTypeSuccess(payload) {
  return {
    type: UPDATE_EXPENDITURE_TYPE_SUCCESS,
    payload: payload,
  }
}

export function updateExpenditureTypeFailed() {
  return {
    type: UPDATE_EXPENDITURE_TYPE_FAILED,
  }
}

export function deleteExpenditureType(packageId, onSuccess, onError) {
  return {
    type: DELETE_EXPENDITURE_TYPE_START,
    payload: packageId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function deleteExpenditureTypeSuccess(payload) {
  return {
    type: DELETE_EXPENDITURE_TYPE_SUCCESS,
    payload: payload,
  }
}

export function deleteExpenditureTypeFailed() {
  return {
    type: DELETE_EXPENDITURE_TYPE_FAILED,
  }
}

export function getExpenditureTypeDetailsById(packageId, onSuccess, onError) {
  return {
    type: GET_EXPENDITURE_TYPE_DETAILS_START,
    payload: packageId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getExpenditureTypeDetailsByIdSuccess(payload) {
  return {
    type: GET_EXPENDITURE_TYPE_DETAILS_SUCCESS,
    payload: payload,
  }
}

export function getExpenditureTypeDetailsByIdFailed() {
  return {
    type: GET_EXPENDITURE_TYPE_DETAILS_FAILED,
  }
}

export function confirmExpenditureTypeById(Id, onSuccess, onError) {
  return {
    type: CONFIRM_EXPENDITURE_TYPE_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function confirmExpenditureTypeByIdSuccess(payload) {
  return {
    type: CONFIRM_EXPENDITURE_TYPE_SUCCESS,
    payload: payload,
  }
}

export function confirmExpenditureTypeByIdFailed() {
  return {
    type: CONFIRM_EXPENDITURE_TYPE_FAILED,
  }
}

export function rejectExpenditureTypeById(Id, onSuccess, onError) {
  return {
    type: REJECT_EXPENDITURE_TYPE_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function rejectExpenditureTypeByIdSuccess(payload) {
  return {
    type: REJECT_EXPENDITURE_TYPE_SUCCESS,
    payload: payload,
  }
}

export function rejectExpenditureTypeByIdFailed() {
  return {
    type: REJECT_EXPENDITURE_TYPE_FAILED,
  }
}

export function resetExpenditureTypeDetailsState() {
  return {
    type: RESET_EXPENDITURE_TYPE_DETAILS_STATE,
  }
}

export default {
  searchExpenditureType,
  searchExpenditureTypeSuccess,
  searchExpenditureTypeFailed,
  createExpenditureType,
  createExpenditureTypeSuccess,
  createExpenditureTypeFailed,
  updateExpenditureType,
  updateExpenditureTypeSuccess,
  updateExpenditureTypeFailed,
  deleteExpenditureType,
  deleteExpenditureTypeSuccess,
  deleteExpenditureTypeFailed,
  getExpenditureTypeDetailsById,
  getExpenditureTypeDetailsByIdSuccess,
  getExpenditureTypeDetailsByIdFailed,
  confirmExpenditureTypeById,
  confirmExpenditureTypeByIdSuccess,
  confirmExpenditureTypeByIdFailed,
  rejectExpenditureTypeById,
  rejectExpenditureTypeByIdSuccess,
  rejectExpenditureTypeByIdFailed,
  resetExpenditureTypeDetailsState,
}
