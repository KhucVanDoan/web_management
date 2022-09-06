export const SEARCH_SHELF_START = 'WMSX_SEARCH_SHELF_START'
export const SEARCH_SHELF_SUCCESS = 'WMSX_SEARCH_SHELF_SUCCESS'
export const SEARCH_SHELF_FAILED = 'WMSX_SEARCH_SHELF_FAILED'

export const CREATE_SHELF_START = 'WMSX_CREATE_SHELF_START'
export const CREATE_SHELF_SUCCESS = 'WMSX_CREATE_SHELF_SUCCESS'
export const CREATE_SHELF_FAILED = 'WMSX_CREATE_SHELF_FAILED'

export const UPDATE_SHELF_START = 'WMSX_UPDATE_SHELF_START'
export const UPDATE_SHELF_SUCCESS = 'WMSX_UPDATE_SHELF_SUCCESS'
export const UPDATE_SHELF_FAILED = 'WMSX_UPDATE_SHELF_FAILED'

export const DELETE_SHELF_START = 'WMSX_DELETE_SHELF_START'
export const DELETE_SHELF_SUCCESS = 'WMSX_DELETE_SHELF_SUCCESS'
export const DELETE_SHELF_FAILED = 'WMSX_DELETE_SHELF_FAILED'

export const GET_SHELF_DETAILS_START = 'WMSX_GET_SHELF_DETAILS_START'
export const GET_SHELF_DETAILS_SUCCESS = 'WMSX_GET_SHELF_DETAILS_SUCCESS'
export const GET_SHELF_DETAILS_FAILED = 'WMSX_GET_SHELF_DETAILS_FAILED'

export const CONFIRM_SHELF_START = 'WMSX_CONFIRM_SHELF_START'
export const CONFIRM_SHELF_SUCCESS = 'WMSX_CONFIRM_SHELF_SUCCESS'
export const CONFIRM_SHELF_FAILED = 'WMSX_CONFIRM_SHELF_FAILED'

export const REJECT_SHELF_START = 'WMSX_REJECT_SHELF_START'
export const REJECT_SHELF_SUCCESS = 'WMSX_REJECT_SHELF_SUCCESS'
export const REJECT_SHELF_FAILED = 'WMSX_REJECT_SHELF_FAILED'

export const RESET_SHELF_DETAILS_STATE = 'WMSX_RESET_SHELF_DETAILS_STATE'

export function searchShelf(payload, onSuccess, onError) {
  return {
    type: SEARCH_SHELF_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function searchShelfSuccess(payload) {
  return {
    type: SEARCH_SHELF_SUCCESS,
    payload: payload,
  }
}

export function searchShelfFailed() {
  return {
    type: SEARCH_SHELF_FAILED,
  }
}

export function createShelf(payload, onSuccess, onError) {
  return {
    type: CREATE_SHELF_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function createShelfSuccess(payload) {
  return {
    type: CREATE_SHELF_SUCCESS,
    payload: payload,
  }
}

export function createShelfFailed() {
  return {
    type: CREATE_SHELF_FAILED,
  }
}

export function updateShelf(payload, onSuccess, onError) {
  return {
    type: UPDATE_SHELF_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function updateShelfSuccess(payload) {
  return {
    type: UPDATE_SHELF_SUCCESS,
    payload: payload,
  }
}

export function updateShelfFailed() {
  return {
    type: UPDATE_SHELF_FAILED,
  }
}

export function deleteShelf(packageId, onSuccess, onError) {
  return {
    type: DELETE_SHELF_START,
    payload: packageId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function deleteShelfSuccess(payload) {
  return {
    type: DELETE_SHELF_SUCCESS,
    payload: payload,
  }
}

export function deleteShelfFailed() {
  return {
    type: DELETE_SHELF_FAILED,
  }
}

export function getShelfDetailsById(packageId, onSuccess, onError) {
  return {
    type: GET_SHELF_DETAILS_START,
    payload: packageId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getShelfDetailsByIdSuccess(payload) {
  return {
    type: GET_SHELF_DETAILS_SUCCESS,
    payload: payload,
  }
}

export function getShelfDetailsByIdFailed() {
  return {
    type: GET_SHELF_DETAILS_FAILED,
  }
}

export function confirmShelfById(Id, onSuccess, onError) {
  return {
    type: CONFIRM_SHELF_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function confirmShelfByIdSuccess(payload) {
  return {
    type: CONFIRM_SHELF_SUCCESS,
    payload: payload,
  }
}

export function confirmShelfByIdFailed() {
  return {
    type: CONFIRM_SHELF_FAILED,
  }
}

export function rejectShelfById(Id, onSuccess, onError) {
  return {
    type: REJECT_SHELF_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function rejectShelfByIdSuccess(payload) {
  return {
    type: REJECT_SHELF_SUCCESS,
    payload: payload,
  }
}

export function rejectShelfByIdFailed() {
  return {
    type: REJECT_SHELF_FAILED,
  }
}

export function resetShelfDetailsState() {
  return {
    type: RESET_SHELF_DETAILS_STATE,
  }
}

export default {
  searchShelf,
  searchShelfSuccess,
  searchShelfFailed,
  createShelf,
  createShelfSuccess,
  createShelfFailed,
  updateShelf,
  updateShelfSuccess,
  updateShelfFailed,
  deleteShelf,
  deleteShelfSuccess,
  deleteShelfFailed,
  getShelfDetailsById,
  getShelfDetailsByIdSuccess,
  getShelfDetailsByIdFailed,
  confirmShelfById,
  confirmShelfByIdSuccess,
  confirmShelfByIdFailed,
  rejectShelfById,
  rejectShelfByIdFailed,
  rejectShelfByIdSuccess,
  resetShelfDetailsState,
}
