export const SEARCH_UOMS_START = 'DATABASE_SEARCH_UOMS_START'
export const SEARCH_UOMS_SUCCESS = 'DATABASE_SEARCH_UOMS_SUCCESS'
export const SEARCH_UOMS_FAILED = 'DATABASE_SEARCH_UOMS_FAILED'

export const CREATE_UOM_START = 'DATABASE_CREATE_UOM_START'
export const CREATE_UOM_SUCCESS = 'DATABASE_CREATE_UOM_SUCCESS'
export const CREATE_UOM_FAILED = 'DATABASE_CREATE_UOM_FAILED'

export const UPDATE_UOM_START = 'DATABASE_UPDATE_UOM_START'
export const UPDATE_UOM_SUCCESS = 'DATABASE_UPDATE_UOM_SUCCESS'
export const UPDATE_UOM_FAILED = 'DATABASE_UPDATE_UOM_FAILED'

export const DELETE_UOM_START = 'DATABASE_DELETE_UOM_START'
export const DELETE_UOM_SUCCESS = 'DATABASE_DELETE_UOM_SUCCESS'
export const DELETE_UOM_FAILED = 'DATABASE_DELETE_UOM_FAILED'

export const CONFIRM_UOM_START = 'DATABASE_CONFIRM_UOM_START'
export const CONFIRM_UOM_SUCCESS = 'DATABASE_CONFIRM_UOM_SUCCESS'
export const CONFIRM_UOM_FAILED = 'DATABASE_CONFIRM_UOM_FAILED'

export const REJECT_UOM_START = 'DATABASE_REJECT_UOM_START'
export const REJECT_UOM_SUCCESS = 'DATABASE_REJECT_UOM_SUCCESS'
export const REJECT_UOM_FAILED = 'DATABASE_REJECT_UOM_FAILED'

export const GET_UOM_DETAILS_START = 'DATABASE_GET_UOM_DETAILS_START'
export const GET_UOM_DETAILS_SUCCESS = 'DATABASE_GET_UOM_DETAILS_SUCCESS'
export const GET_UOM_DETAILS_FAILED = 'DATABASE_GET_UOM_DETAILS_FAILED'

export const RESET_UOM_DETAILS_STATE = 'DATABASE_RESET_UOM_DETAILS_STATE'

export function searchUoms(payload, onSuccess, onError) {
  return {
    type: SEARCH_UOMS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function searchUomsSuccess(payload) {
  return {
    type: SEARCH_UOMS_SUCCESS,
    payload: payload,
  }
}

export function searchUomsFailed() {
  return {
    type: SEARCH_UOMS_FAILED,
  }
}

export function createUom(payload, onSuccess, onError) {
  return {
    type: CREATE_UOM_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function createUomSuccess(payload) {
  return {
    type: CREATE_UOM_SUCCESS,
    payload: payload,
  }
}

export function createUomFailed() {
  return {
    type: CREATE_UOM_FAILED,
  }
}

export function updateUom(payload, onSuccess, onError) {
  return {
    type: UPDATE_UOM_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function updateUomSuccess(payload) {
  return {
    type: UPDATE_UOM_SUCCESS,
    payload: payload,
  }
}

export function updateUomFailed() {
  return {
    type: UPDATE_UOM_FAILED,
  }
}

export function deleteUom(payload, onSuccess, onError) {
  return {
    type: DELETE_UOM_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function deleteUomSuccess(payload) {
  return {
    type: DELETE_UOM_SUCCESS,
    payload: payload,
  }
}

export function deleteUomFailed() {
  return {
    type: DELETE_UOM_FAILED,
  }
}

export function confirmUomById(payload, onSuccess, onError) {
  return {
    type: CONFIRM_UOM_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function confirmUomByIdSuccess(payload) {
  return {
    type: CONFIRM_UOM_SUCCESS,
    payload: payload,
  }
}

export function confirmUomByIdFailed() {
  return {
    type: CONFIRM_UOM_FAILED,
  }
}

export function rejectUomById(payload, onSuccess, onError) {
  return {
    type: REJECT_UOM_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function rejectUomByIdSuccess(payload) {
  return {
    type: REJECT_UOM_SUCCESS,
    payload: payload,
  }
}

export function rejectUomByIdFailed() {
  return {
    type: REJECT_UOM_FAILED,
  }
}

export function getUomDetailsById(payload, onSuccess, onError) {
  return {
    type: GET_UOM_DETAILS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getUomDetailsByIdSuccess(payload) {
  return {
    type: GET_UOM_DETAILS_SUCCESS,
    payload: payload,
  }
}

export function getUomDetailsByIdFailed() {
  return {
    type: GET_UOM_DETAILS_FAILED,
  }
}

export function resetUomDetailsState() {
  return {
    type: RESET_UOM_DETAILS_STATE,
  }
}

export default {
  searchUoms,
  searchUomsFailed,
  searchUomsSuccess,
  createUom,
  createUomFailed,
  createUomSuccess,
  updateUom,
  updateUomFailed,
  updateUomSuccess,
  deleteUom,
  deleteUomFailed,
  deleteUomSuccess,
  confirmUomById,
  confirmUomByIdFailed,
  confirmUomByIdSuccess,
  rejectUomById,
  rejectUomByIdFailed,
  rejectUomByIdSuccess,
  getUomDetailsById,
  getUomDetailsByIdFailed,
  getUomDetailsByIdSuccess,
  resetUomDetailsState,
}
