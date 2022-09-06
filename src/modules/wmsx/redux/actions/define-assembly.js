export const SEARCH_ASSEMBLY_START = 'WMSX_SEARCH_ASSEMBLY_START'
export const SEARCH_ASSEMBLY_SUCCESS = 'WMSX_SEARCH_ASSEMBLY_SUCCESS'
export const SEARCH_ASSEMBLY_FAILED = 'WMSX_SEARCH_ASSEMBLY_FAILED'

export const CREATE_ASSEMBLY_START = 'WMSX_CREATE_ASSEMBLY_START'
export const CREATE_ASSEMBLY_SUCCESS = 'WMSX_CREATE_ASSEMBLY_SUCCESS'
export const CREATE_ASSEMBLY_FAILED = 'WMSX_CREATE_ASSEMBLY_FAILED'

export const UPDATE_ASSEMBLY_START = 'WMSX_UPDATE_ASSEMBLY_START'
export const UPDATE_ASSEMBLY_SUCCESS = 'WMSX_UPDATE_ASSEMBLY_SUCCESS'
export const UPDATE_ASSEMBLY_FAILED = 'WMSX_UPDATE_ASSEMBLY_FAILED'

export const DELETE_ASSEMBLY_START = 'WMSX_DELETE_ASSEMBLY_START'
export const DELETE_ASSEMBLY_SUCCESS = 'WMSX_DELETE_ASSEMBLY_SUCCESS'
export const DELETE_ASSEMBLY_FAILED = 'WMSX_DELETE_ASSEMBLY_FAILED'

export const GET_ASSEMBLY_DETAILS_START = 'WMSX_GET_ASSEMBLY_DETAILS_START'
export const GET_ASSEMBLY_DETAILS_SUCCESS = 'WMSX_GET_ASSEMBLY_DETAILS_SUCCESS'
export const GET_ASSEMBLY_DETAILS_FAILED = 'WMSX_GET_ASSEMBLY_DETAILS_FAILED'

export const CONFIRM_ASSEMBLY_START = 'WMSX_CONFIRM_ASSEMBLY_START'
export const CONFIRM_ASSEMBLY_SUCCESS = 'WMSX_CONFIRM_ASSEMBLY_SUCCESS'
export const CONFIRM_ASSEMBLY_FAILED = 'WMSX_CONFIRM_ASSEMBLY_FAILED'

export const REJECT_ASSEMBLY_START = 'WMSX_REJECT_ASSEMBLY_START'
export const REJECT_ASSEMBLY_SUCCESS = 'WMSX_REJECT_ASSEMBLY_SUCCESS'
export const REJECT_ASSEMBLY_FAILED = 'WMSX_REJECT_ASSEMBLY_FAILED'

export const RESET_ASSEMBLY_DETAILS_STATE = 'WMSX_RESET_ASSEMBLY_DETAILS_STATE'

export function searchAssembly(payload, onSuccess, onError) {
  return {
    type: SEARCH_ASSEMBLY_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function searchAssemblySuccess(payload) {
  return {
    type: SEARCH_ASSEMBLY_SUCCESS,
    payload: payload,
  }
}

export function searchAssemblyFailed() {
  return {
    type: SEARCH_ASSEMBLY_FAILED,
  }
}

export function createAssembly(payload, onSuccess, onError) {
  return {
    type: CREATE_ASSEMBLY_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function createAssemblySuccess(payload) {
  return {
    type: CREATE_ASSEMBLY_SUCCESS,
    payload: payload,
  }
}

export function createAssemblyFailed() {
  return {
    type: CREATE_ASSEMBLY_FAILED,
  }
}

export function updateAssembly(payload, onSuccess, onError) {
  return {
    type: UPDATE_ASSEMBLY_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function updateAssemblySuccess(payload) {
  return {
    type: UPDATE_ASSEMBLY_SUCCESS,
    payload: payload,
  }
}

export function updateAssemblyFailed() {
  return {
    type: UPDATE_ASSEMBLY_FAILED,
  }
}

export function deleteAssembly(packageId, onSuccess, onError) {
  return {
    type: DELETE_ASSEMBLY_START,
    payload: packageId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function deleteAssemblySuccess(payload) {
  return {
    type: DELETE_ASSEMBLY_SUCCESS,
    payload: payload,
  }
}

export function deleteAssemblyFailed() {
  return {
    type: DELETE_ASSEMBLY_FAILED,
  }
}

export function getAssemblyDetailsById(packageId, onSuccess, onError) {
  return {
    type: GET_ASSEMBLY_DETAILS_START,
    payload: packageId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getAssemblyDetailsByIdSuccess(payload) {
  return {
    type: GET_ASSEMBLY_DETAILS_SUCCESS,
    payload: payload,
  }
}

export function getAssemblyDetailsByIdFailed() {
  return {
    type: GET_ASSEMBLY_DETAILS_FAILED,
  }
}

export function confirmAssemblyById(Id, onSuccess, onError) {
  return {
    type: CONFIRM_ASSEMBLY_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function confirmAssemblyByIdSuccess(payload) {
  return {
    type: CONFIRM_ASSEMBLY_SUCCESS,
    payload: payload,
  }
}

export function confirmAssemblyByIdFailed() {
  return {
    type: CONFIRM_ASSEMBLY_FAILED,
  }
}

export function rejectAssemblyById(Id, onSuccess, onError) {
  return {
    type: REJECT_ASSEMBLY_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function rejectAssemblyByIdSuccess(payload) {
  return {
    type: REJECT_ASSEMBLY_SUCCESS,
    payload: payload,
  }
}

export function rejectAssemblyByIdFailed() {
  return {
    type: REJECT_ASSEMBLY_FAILED,
  }
}

export function resetAssemblyDetailsState() {
  return {
    type: RESET_ASSEMBLY_DETAILS_STATE,
  }
}

export default {
  searchAssembly,
  searchAssemblySuccess,
  searchAssemblyFailed,
  createAssembly,
  createAssemblySuccess,
  createAssemblyFailed,
  updateAssembly,
  updateAssemblySuccess,
  updateAssemblyFailed,
  deleteAssembly,
  deleteAssemblySuccess,
  deleteAssemblyFailed,
  getAssemblyDetailsById,
  getAssemblyDetailsByIdSuccess,
  getAssemblyDetailsByIdFailed,
  confirmAssemblyById,
  confirmAssemblyByIdSuccess,
  confirmAssemblyByIdFailed,
  rejectAssemblyById,
  rejectAssemblyByIdFailed,
  rejectAssemblyByIdSuccess,
  resetAssemblyDetailsState,
}
