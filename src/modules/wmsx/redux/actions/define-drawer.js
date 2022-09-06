export const SEARCH_DRAWER_START = 'WMSX_SEARCH_DRAWER_START'
export const SEARCH_DRAWER_SUCCESS = 'WMSX_SEARCH_DRAWER_SUCCESS'
export const SEARCH_DRAWER_FAILED = 'WMSX_SEARCH_DRAWER_FAILED'

export const CREATE_DRAWER_START = 'WMSX_CREATE_DRAWER_START'
export const CREATE_DRAWER_SUCCESS = 'WMSX_CREATE_DRAWER_SUCCESS'
export const CREATE_DRAWER_FAILED = 'WMSX_CREATE_DRAWER_FAILED'

export const UPDATE_DRAWER_START = 'WMSX_UPDATE_DRAWER_START'
export const UPDATE_DRAWER_SUCCESS = 'WMSX_UPDATE_DRAWER_SUCCESS'
export const UPDATE_DRAWER_FAILED = 'WMSX_UPDATE_DRAWER_FAILED'

export const DELETE_DRAWER_START = 'WMSX_DELETE_DRAWER_START'
export const DELETE_DRAWER_SUCCESS = 'WMSX_DELETE_DRAWER_SUCCESS'
export const DELETE_DRAWER_FAILED = 'WMSX_DELETE_DRAWER_FAILED'

export const GET_DRAWER_DETAILS_START = 'WMSX_GET_DRAWER_DETAILS_START'
export const GET_DRAWER_DETAILS_SUCCESS = 'WMSX_GET_DRAWER_DETAILS_SUCCESS'
export const GET_DRAWER_DETAILS_FAILED = 'WMSX_GET_DRAWER_DETAILS_FAILED'

export const CONFIRM_DRAWER_START = 'WMSX_CONFIRM_DRAWER_START'
export const CONFIRM_DRAWER_SUCCESS = 'WMSX_CONFIRM_DRAWER_SUCCESS'
export const CONFIRM_DRAWER_FAILED = 'WMSX_CONFIRM_DRAWER_FAILED'

export const REJECT_DRAWER_START = 'WMSX_REJECT_DRAWER_START'
export const REJECT_DRAWER_SUCCESS = 'WMSX_REJECT_DRAWER_SUCCESS'
export const REJECT_DRAWER_FAILED = 'WMSX_REJECT_DRAWER_FAILED'

export const RESET_DRAWER_DETAILS_STATE = 'WMSX_RESET_DRAWER_DETAILS_STATE'

export function searchDrawer(payload, onSuccess, onError) {
  return {
    type: SEARCH_DRAWER_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function searchDrawerSuccess(payload) {
  return {
    type: SEARCH_DRAWER_SUCCESS,
    payload: payload,
  }
}

export function searchDrawerFailed() {
  return {
    type: SEARCH_DRAWER_FAILED,
  }
}

export function createDrawer(payload, onSuccess, onError) {
  return {
    type: CREATE_DRAWER_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function createDrawerSuccess(payload) {
  return {
    type: CREATE_DRAWER_SUCCESS,
    payload: payload,
  }
}

export function createDrawerFailed() {
  return {
    type: CREATE_DRAWER_FAILED,
  }
}

export function updateDrawer(payload, onSuccess, onError) {
  return {
    type: UPDATE_DRAWER_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function updateDrawerSuccess(payload) {
  return {
    type: UPDATE_DRAWER_SUCCESS,
    payload: payload,
  }
}

export function updateDrawerFailed() {
  return {
    type: UPDATE_DRAWER_FAILED,
  }
}

export function deleteDrawer(packageId, onSuccess, onError) {
  return {
    type: DELETE_DRAWER_START,
    payload: packageId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function deleteDrawerSuccess(payload) {
  return {
    type: DELETE_DRAWER_SUCCESS,
    payload: payload,
  }
}

export function deleteDrawerFailed() {
  return {
    type: DELETE_DRAWER_FAILED,
  }
}

export function getDrawerDetailsById(packageId, onSuccess, onError) {
  return {
    type: GET_DRAWER_DETAILS_START,
    payload: packageId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getDrawerDetailsByIdSuccess(payload) {
  return {
    type: GET_DRAWER_DETAILS_SUCCESS,
    payload: payload,
  }
}

export function getDrawerDetailsByIdFailed() {
  return {
    type: GET_DRAWER_DETAILS_FAILED,
  }
}

export function confirmDrawerById(Id, onSuccess, onError) {
  return {
    type: CONFIRM_DRAWER_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function confirmDrawerByIdSuccess(payload) {
  return {
    type: CONFIRM_DRAWER_SUCCESS,
    payload: payload,
  }
}

export function confirmDrawerByIdFailed() {
  return {
    type: CONFIRM_DRAWER_FAILED,
  }
}

export function rejectDrawerById(Id, onSuccess, onError) {
  return {
    type: REJECT_DRAWER_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function rejectDrawerByIdSuccess(payload) {
  return {
    type: REJECT_DRAWER_SUCCESS,
    payload: payload,
  }
}

export function rejectDrawerByIdFailed() {
  return {
    type: REJECT_DRAWER_FAILED,
  }
}

export function resetDrawerDetailsState() {
  return {
    type: RESET_DRAWER_DETAILS_STATE,
  }
}

export default {
  searchDrawer,
  searchDrawerSuccess,
  searchDrawerFailed,
  createDrawer,
  createDrawerSuccess,
  createDrawerFailed,
  updateDrawer,
  updateDrawerSuccess,
  updateDrawerFailed,
  deleteDrawer,
  deleteDrawerSuccess,
  deleteDrawerFailed,
  getDrawerDetailsById,
  getDrawerDetailsByIdSuccess,
  getDrawerDetailsByIdFailed,
  confirmDrawerById,
  confirmDrawerByIdSuccess,
  confirmDrawerByIdFailed,
  rejectDrawerById,
  rejectDrawerByIdFailed,
  rejectDrawerByIdSuccess,
  resetDrawerDetailsState,
}
