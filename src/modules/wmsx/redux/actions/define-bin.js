export const SEARCH_BIN_START = 'WMSX_SEARCH_BIN_START'
export const SEARCH_BIN_SUCCESS = 'WMSX_SEARCH_BIN_SUCCESS'
export const SEARCH_BIN_FAILED = 'WMSX_SEARCH_BIN_FAILED'

export const CREATE_BIN_START = 'WMSX_CREATE_BIN_START'
export const CREATE_BIN_SUCCESS = 'WMSX_CREATE_BIN_SUCCESS'
export const CREATE_BIN_FAILED = 'WMSX_CREATE_BIN_FAILED'

export const UPDATE_BIN_START = 'WMSX_UPDATE_BIN_START'
export const UPDATE_BIN_SUCCESS = 'WMSX_UPDATE_BIN_SUCCESS'
export const UPDATE_BIN_FAILED = 'WMSX_UPDATE_BIN_FAILED'

export const DELETE_BIN_START = 'WMSX_DELETE_BIN_START'
export const DELETE_BIN_SUCCESS = 'WMSX_DELETE_BIN_SUCCESS'
export const DELETE_BIN_FAILED = 'WMSX_DELETE_BIN_FAILED'

export const GET_BIN_DETAILS_START = 'WMSX_GET_BIN_DETAILS_START'
export const GET_BIN_DETAILS_SUCCESS = 'WMSX_GET_BIN_DETAILS_SUCCESS'
export const GET_BIN_DETAILS_FAILED = 'WMSX_GET_BIN_DETAILS_FAILED'

export const CONFIRM_BIN_START = 'WMSX_CONFIRM_BIN_START'
export const CONFIRM_BIN_SUCCESS = 'WMSX_CONFIRM_BIN_SUCCESS'
export const CONFIRM_BIN_FAILED = 'WMSX_CONFIRM_BIN_FAILED'

export const REJECT_BIN_START = 'WMSX_REJECT_BIN_START'
export const REJECT_BIN_SUCCESS = 'WMSX_REJECT_BIN_SUCCESS'
export const REJECT_BIN_FAILED = 'WMSX_REJECT_BIN_FAILED'

export const RESET_BIN_DETAILS_STATE = 'WMSX_RESET_BIN_DETAILS_STATE'

export function searchBin(payload, onSuccess, onError) {
  return {
    type: SEARCH_BIN_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function searchBinSuccess(payload) {
  return {
    type: SEARCH_BIN_SUCCESS,
    payload: payload,
  }
}

export function searchBinFailed() {
  return {
    type: SEARCH_BIN_FAILED,
  }
}

export function createBin(payload, onSuccess, onError) {
  return {
    type: CREATE_BIN_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function createBinSuccess(payload) {
  return {
    type: CREATE_BIN_SUCCESS,
    payload: payload,
  }
}

export function createBinFailed() {
  return {
    type: CREATE_BIN_FAILED,
  }
}

export function updateBin(payload, onSuccess, onError) {
  return {
    type: UPDATE_BIN_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function updateBinSuccess(payload) {
  return {
    type: UPDATE_BIN_SUCCESS,
    payload: payload,
  }
}

export function updateBinFailed() {
  return {
    type: UPDATE_BIN_FAILED,
  }
}

export function deleteBin(packageId, onSuccess, onError) {
  return {
    type: DELETE_BIN_START,
    payload: packageId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function deleteBinSuccess(payload) {
  return {
    type: DELETE_BIN_SUCCESS,
    payload: payload,
  }
}

export function deleteBinFailed() {
  return {
    type: DELETE_BIN_FAILED,
  }
}

export function getBinDetailsById(packageId, onSuccess, onError) {
  return {
    type: GET_BIN_DETAILS_START,
    payload: packageId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getBinDetailsByIdSuccess(payload) {
  return {
    type: GET_BIN_DETAILS_SUCCESS,
    payload: payload,
  }
}

export function getBinDetailsByIdFailed() {
  return {
    type: GET_BIN_DETAILS_FAILED,
  }
}

export function confirmBinById(Id, onSuccess, onError) {
  return {
    type: CONFIRM_BIN_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function confirmBinByIdSuccess(payload) {
  return {
    type: CONFIRM_BIN_SUCCESS,
    payload: payload,
  }
}

export function confirmBinByIdFailed() {
  return {
    type: CONFIRM_BIN_FAILED,
  }
}

export function rejectBinById(Id, onSuccess, onError) {
  return {
    type: REJECT_BIN_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function rejectBinByIdSuccess(payload) {
  return {
    type: REJECT_BIN_SUCCESS,
    payload: payload,
  }
}

export function rejectBinByIdFailed() {
  return {
    type: REJECT_BIN_FAILED,
  }
}

export function resetBinDetailsState() {
  return {
    type: RESET_BIN_DETAILS_STATE,
  }
}

export default {
  searchBin,
  searchBinSuccess,
  searchBinFailed,
  createBin,
  createBinSuccess,
  createBinFailed,
  updateBin,
  updateBinSuccess,
  updateBinFailed,
  deleteBin,
  deleteBinSuccess,
  deleteBinFailed,
  getBinDetailsById,
  getBinDetailsByIdSuccess,
  getBinDetailsByIdFailed,
  confirmBinById,
  confirmBinByIdSuccess,
  confirmBinByIdFailed,
  rejectBinById,
  rejectBinByIdFailed,
  rejectBinByIdSuccess,
  resetBinDetailsState,
}
