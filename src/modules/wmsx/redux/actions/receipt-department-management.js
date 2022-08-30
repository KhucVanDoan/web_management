export const SEARCH_RECEIPT_DEPARTMENT_START =
  'WMSX_SEARCH_RECEIPT_DEPARTMENT_START'
export const SEARCH_RECEIPT_DEPARTMENT_SUCCESS =
  'WMSX_SEARCH_RECEIPT_DEPARTMENT_SUCCESS'
export const SEARCH_RECEIPT_DEPARTMENT_FAILED =
  'WMSX_SEARCH_RECEIPT_DEPARTMENT_FAILED'

export const CREATE_RECEIPT_DEPARTMENT_START =
  'WMSX_CREATE_RECEIPT_DEPARTMENT_START'
export const CREATE_RECEIPT_DEPARTMENT_SUCCESS =
  'WMSX_CREATE_RECEIPT_DEPARTMENT_SUCCESS'
export const CREATE_RECEIPT_DEPARTMENT_FAILED =
  'WMSX_CREATE_RECEIPT_DEPARTMENT_FAILED'

export const UPDATE_RECEIPT_DEPARTMENT_START =
  'WMSX_UPDATE_RECEIPT_DEPARTMENT_START'
export const UPDATE_RECEIPT_DEPARTMENT_SUCCESS =
  'WMSX_UPDATE_RECEIPT_DEPARTMENT_SUCCESS'
export const UPDATE_RECEIPT_DEPARTMENT_FAILED =
  'WMSX_UPDATE_RECEIPT_DEPARTMENT_FAILED'

export const DELETE_RECEIPT_DEPARTMENT_START =
  'WMSX_DELETE_RECEIPT_DEPARTMENT_START'
export const DELETE_RECEIPT_DEPARTMENT_SUCCESS =
  'WMSX_DELETE_RECEIPT_DEPARTMENT_SUCCESS'
export const DELETE_RECEIPT_DEPARTMENT_FAILED =
  'WMSX_DELETE_RECEIPT_DEPARTMENT_FAILED'

export const GET_RECEIPT_DEPARTMENT_DETAILS_START =
  'WMSX_GET_RECEIPT_DEPARTMENT_DETAILS_START'
export const GET_RECEIPT_DEPARTMENT_DETAILS_SUCCESS =
  'WMSX_GET_RECEIPT_DEPARTMENT_DETAILS_SUCCESS'
export const GET_RECEIPT_DEPARTMENT_DETAILS_FAILED =
  'WMSX_GET_RECEIPT_DEPARTMENT_DETAILS_FAILED'

export const CONFIRM_RECEIPT_DEPARTMENT_START =
  'WMSX_CONFIRM_RECEIPT_DEPARTMENT_START'
export const CONFIRM_RECEIPT_DEPARTMENT_SUCCESS =
  'WMSX_CONFIRM_RECEIPT_DEPARTMENT_SUCCESS'
export const CONFIRM_RECEIPT_DEPARTMENT_FAILED =
  'WMSX_CONFIRM_RECEIPT_DEPARTMENT_FAILED'

export const REJECT_RECEIPT_DEPARTMENT_START =
  'WMSX_REJECT_RECEIPT_DEPARTMENT_START'
export const REJECT_RECEIPT_DEPARTMENT_SUCCESS =
  'WMSX_REJECT_RECEIPT_DEPARTMENT_SUCCESS'
export const REJECT_RECEIPT_DEPARTMENT_FAILED =
  'WMSX_REJECT_RECEIPT_DEPARTMENT_FAILED'

export const RESET_RECEIPT_DEPARTMENT_DETAILS_STATE =
  'WMSX_RESET_RECEIPT_DEPARTMENT_DETAILS_STATE'

export function searchReceiptDepartment(payload, onSuccess, onError) {
  return {
    type: SEARCH_RECEIPT_DEPARTMENT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function searchReceiptDepartmentSuccess(payload) {
  return {
    type: SEARCH_RECEIPT_DEPARTMENT_SUCCESS,
    payload: payload,
  }
}

export function searchReceiptDepartmentFailed() {
  return {
    type: SEARCH_RECEIPT_DEPARTMENT_FAILED,
  }
}

export function createReceiptDepartment(payload, onSuccess, onError) {
  return {
    type: CREATE_RECEIPT_DEPARTMENT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function createReceiptDepartmentSuccess(payload) {
  return {
    type: CREATE_RECEIPT_DEPARTMENT_SUCCESS,
    payload: payload,
  }
}

export function createReceiptDepartmentFailed() {
  return {
    type: CREATE_RECEIPT_DEPARTMENT_FAILED,
  }
}

export function updateReceiptDepartment(payload, onSuccess, onError) {
  return {
    type: UPDATE_RECEIPT_DEPARTMENT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function updateReceiptDepartmentSuccess(payload) {
  return {
    type: UPDATE_RECEIPT_DEPARTMENT_SUCCESS,
    payload: payload,
  }
}

export function updateReceiptDepartmentFailed() {
  return {
    type: UPDATE_RECEIPT_DEPARTMENT_FAILED,
  }
}

export function deleteReceiptDepartment(packageId, onSuccess, onError) {
  return {
    type: DELETE_RECEIPT_DEPARTMENT_START,
    payload: packageId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function deleteReceiptDepartmentSuccess(payload) {
  return {
    type: DELETE_RECEIPT_DEPARTMENT_SUCCESS,
    payload: payload,
  }
}

export function deleteReceiptDepartmentFailed() {
  return {
    type: DELETE_RECEIPT_DEPARTMENT_FAILED,
  }
}

export function getReceiptDepartmentDetailsById(packageId, onSuccess, onError) {
  return {
    type: GET_RECEIPT_DEPARTMENT_DETAILS_START,
    payload: packageId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getReceiptDepartmentDetailsByIdSuccess(payload) {
  return {
    type: GET_RECEIPT_DEPARTMENT_DETAILS_SUCCESS,
    payload: payload,
  }
}

export function getReceiptDepartmentDetailsByIdFailed() {
  return {
    type: GET_RECEIPT_DEPARTMENT_DETAILS_FAILED,
  }
}

export function confirmReceiptDepartmentById(Id, onSuccess, onError) {
  return {
    type: CONFIRM_RECEIPT_DEPARTMENT_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function confirmReceiptDepartmentByIdSuccess(payload) {
  return {
    type: CONFIRM_RECEIPT_DEPARTMENT_SUCCESS,
    payload: payload,
  }
}

export function confirmReceiptDepartmentByIdFailed() {
  return {
    type: CONFIRM_RECEIPT_DEPARTMENT_FAILED,
  }
}

export function rejectReceiptDepartmentById(Id, onSuccess, onError) {
  return {
    type: REJECT_RECEIPT_DEPARTMENT_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function rejectReceiptDepartmentByIdSuccess(payload) {
  return {
    type: REJECT_RECEIPT_DEPARTMENT_SUCCESS,
    payload: payload,
  }
}

export function rejectReceiptDepartmentByIdFailed() {
  return {
    type: REJECT_RECEIPT_DEPARTMENT_FAILED,
  }
}

export function resetReceiptDepartmentDetailsState() {
  return {
    type: RESET_RECEIPT_DEPARTMENT_DETAILS_STATE,
  }
}

export default {
  searchReceiptDepartment,
  searchReceiptDepartmentSuccess,
  searchReceiptDepartmentFailed,
  createReceiptDepartment,
  createReceiptDepartmentSuccess,
  createReceiptDepartmentFailed,
  updateReceiptDepartment,
  updateReceiptDepartmentSuccess,
  updateReceiptDepartmentFailed,
  deleteReceiptDepartment,
  deleteReceiptDepartmentSuccess,
  deleteReceiptDepartmentFailed,
  getReceiptDepartmentDetailsById,
  getReceiptDepartmentDetailsByIdSuccess,
  getReceiptDepartmentDetailsByIdFailed,
  confirmReceiptDepartmentById,
  confirmReceiptDepartmentByIdSuccess,
  confirmReceiptDepartmentByIdFailed,
  rejectReceiptDepartmentById,
  rejectReceiptDepartmentByIdFailed,
  rejectReceiptDepartmentByIdSuccess,
  resetReceiptDepartmentDetailsState,
}
