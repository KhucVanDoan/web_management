export const SEARCH_BUSINESS_TYPES_START = 'WMSX_SEARCH_BUSINESS_TYPES_START'
export const SEARCH_BUSINESS_TYPES_SUCCESS =
  'WMSX_SEARCH_BUSINESS_TYPES_SUCCESS'
export const SEARCH_BUSINESS_TYPES_FAILED = 'WMSX_SEARCH_BUSINESS_TYPES_FAILED'

export const CREATE_BUSINESS_TYPE_START = 'WMSX_CREATE_BUSINESS_TYPE_START'
export const CREATE_BUSINESS_TYPE_SUCCESS = 'WMSX_CREATE_BUSINESS_TYPE_SUCCESS'
export const CREATE_BUSINESS_TYPE_FAILED = 'WMSX_CREATE_BUSINESS_TYPE_FAILED'

export const UPDATE_BUSINESS_TYPE_START = 'WMSX_UPDATE_BUSINESS_TYPE_START'
export const UPDATE_BUSINESS_TYPE_SUCCESS = 'WMSX_UPDATE_BUSINESS_TYPE_SUCCESS'
export const UPDATE_BUSINESS_TYPE_FAILED = 'WMSX_UPDATE_BUSINESS_TYPE_FAILED'

export const DELETE_BUSINESS_TYPE_START = 'WMSX_DELETE_BUSINESS_TYPE_START'
export const DELETE_BUSINESS_TYPE_SUCCESS = 'WMSX_DELETE_BUSINESS_TYPE_SUCCESS'
export const DELETE_BUSINESS_TYPE_FAILED = 'WMSX_DELETE_BUSINESS_TYPE_FAILED'

export const GET_BUSINESS_TYPE_DETAILS_START =
  'WMSX_GET_BUSINESS_TYPE_DETAILS_START'
export const GET_BUSINESS_TYPE_DETAILS_SUCCESS =
  'WMSX_GET_BUSINESS_TYPE_DETAILS_SUCCESS'
export const GET_BUSINESS_TYPE_DETAILS_FAILED =
  'WMSX_GET_BUSINESS_TYPE_DETAILS_FAILED'

export const CONFIRM_BUSINESS_TYPE_START = 'WMSX_CONFIRM_BUSINESS_TYPE_START'
export const CONFIRM_BUSINESS_TYPE_SUCCESS =
  'WMSX_CONFIRM_BUSINESS_TYPE_SUCCESS'
export const CONFIRM_BUSINESS_TYPE_FAILED = 'WMSX_CONFIRM_BUSINESS_TYPE_FAILED'

export const REJECT_BUSINESS_TYPE_START = 'WMSX_REJECT_BUSINESS_TYPE_START'
export const REJECT_BUSINESS_TYPE_SUCCESS = 'WMSX_REJECT_BUSINESS_TYPE_SUCCESS'
export const REJECT_BUSINESS_TYPE_FAILED = 'WMSX_REJECT_BUSINESS_TYPE_FAILED'

export const RESET_BUSINESS_TYPE_DETAILS_STATE =
  'WMSX_RESET_BUSINESS_TYPE_DETAILS_STATE'

export function searchBusinessTypes(payload, onSuccess, onError) {
  return {
    type: SEARCH_BUSINESS_TYPES_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function searchBusinessTypesSuccess(payload) {
  return {
    type: SEARCH_BUSINESS_TYPES_SUCCESS,
    payload: payload,
  }
}

export function searchBusinessTypesFailed() {
  return {
    type: SEARCH_BUSINESS_TYPES_FAILED,
  }
}

export function createBusinessType(payload, onSuccess, onError) {
  return {
    type: CREATE_BUSINESS_TYPE_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function createBusinessTypeSuccess(payload) {
  return {
    type: CREATE_BUSINESS_TYPE_SUCCESS,
    payload: payload,
  }
}

export function createBusinessTypeFailed() {
  return {
    type: CREATE_BUSINESS_TYPE_FAILED,
  }
}

export function updateBusinessType(payload, onSuccess, onError) {
  return {
    type: UPDATE_BUSINESS_TYPE_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function updateBusinessTypeSuccess(payload) {
  return {
    type: UPDATE_BUSINESS_TYPE_SUCCESS,
    payload: payload,
  }
}

export function updateBusinessTypeFailed() {
  return {
    type: UPDATE_BUSINESS_TYPE_FAILED,
  }
}

export function deleteBusinessType(packageId, onSuccess, onError) {
  return {
    type: DELETE_BUSINESS_TYPE_START,
    payload: packageId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function deleteBusinessTypeSuccess(payload) {
  return {
    type: DELETE_BUSINESS_TYPE_SUCCESS,
    payload: payload,
  }
}

export function deleteBusinessTypeFailed() {
  return {
    type: DELETE_BUSINESS_TYPE_FAILED,
  }
}

export function getBusinessTypeDetailsById(packageId, onSuccess, onError) {
  return {
    type: GET_BUSINESS_TYPE_DETAILS_START,
    payload: packageId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getBusinessTypeDetailsByIdSuccess(payload) {
  return {
    type: GET_BUSINESS_TYPE_DETAILS_SUCCESS,
    payload: payload,
  }
}

export function getBusinessTypeDetailsByIdFailed() {
  return {
    type: GET_BUSINESS_TYPE_DETAILS_FAILED,
  }
}

export function confirmBusinessTypeById(Id, onSuccess, onError) {
  return {
    type: CONFIRM_BUSINESS_TYPE_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function confirmBusinessTypeByIdSuccess(payload) {
  return {
    type: CONFIRM_BUSINESS_TYPE_SUCCESS,
    payload: payload,
  }
}

export function confirmBusinessTypeByIdFailed() {
  return {
    type: CONFIRM_BUSINESS_TYPE_FAILED,
  }
}

export function rejectBusinessTypeById(Id, onSuccess, onError) {
  return {
    type: REJECT_BUSINESS_TYPE_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function rejectBusinessTypeByIdSuccess(payload) {
  return {
    type: REJECT_BUSINESS_TYPE_SUCCESS,
    payload: payload,
  }
}

export function rejectBusinessTypeByIdFailed() {
  return {
    type: REJECT_BUSINESS_TYPE_FAILED,
  }
}

export function resetBusinessTypeDetailsState() {
  return {
    type: RESET_BUSINESS_TYPE_DETAILS_STATE,
  }
}

export default {
  searchBusinessTypes,
  searchBusinessTypesSuccess,
  searchBusinessTypesFailed,
  createBusinessType,
  createBusinessTypeSuccess,
  createBusinessTypeFailed,
  updateBusinessType,
  updateBusinessTypeSuccess,
  updateBusinessTypeFailed,
  deleteBusinessType,
  deleteBusinessTypeSuccess,
  deleteBusinessTypeFailed,
  getBusinessTypeDetailsById,
  getBusinessTypeDetailsByIdSuccess,
  getBusinessTypeDetailsByIdFailed,
  confirmBusinessTypeById,
  confirmBusinessTypeByIdSuccess,
  confirmBusinessTypeByIdFailed,
  rejectBusinessTypeById,
  rejectBusinessTypeByIdFailed,
  rejectBusinessTypeByIdSuccess,
  resetBusinessTypeDetailsState,
}
