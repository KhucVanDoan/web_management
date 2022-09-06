export const SEARCH_STORAGE_PERIODS_START = 'WMSX_SEARCH_STORAGE_PERIODS_START'
export const SEARCH_STORAGE_PERIODS_SUCCESS =
  'WMSX_SEARCH_STORAGE_PERIODS_SUCCESS'
export const SEARCH_STORAGE_PERIODS_FAILED =
  'WMSX_SEARCH_STORAGE_PERIODS_FAILED'

export const CREATE_STORAGE_PERIOD_START = 'WMSX_CREATE_STORAGE_PERIOD_START'
export const CREATE_STORAGE_PERIOD_SUCCESS =
  'WMSX_CREATE_STORAGE_PERIOD_SUCCESS'
export const CREATE_STORAGE_PERIOD_FAILED = 'WMSX_CREATE_STORAGE_PERIOD_FAILED'

export const UPDATE_STORAGE_PERIOD_START = 'WMSX_UPDATE_STORAGE_PERIOD_START'
export const UPDATE_STORAGE_PERIOD_SUCCESS =
  'WMSX_UPDATE_STORAGE_PERIOD_SUCCESS'
export const UPDATE_STORAGE_PERIOD_FAILED = 'WMSX_UPDATE_STORAGE_PERIOD_FAILED'

export const DELETE_STORAGE_PERIOD_START = 'WMSX_DELETE_STORAGE_PERIOD_START'
export const DELETE_STORAGE_PERIOD_SUCCESS =
  'WMSX_DELETE_STORAGE_PERIOD_SUCCESS'
export const DELETE_STORAGE_PERIOD_FAILED = 'WMSX_DELETE_STORAGE_PERIOD_FAILED'

export const GET_STORAGE_PERIOD_DETAILS_START =
  'WMSX_GET_STORAGE_PERIOD_DETAILS_START'
export const GET_STORAGE_PERIOD_DETAILS_SUCCESS =
  'WMSX_GET_STORAGE_PERIOD_DETAILS_SUCCESS'
export const GET_STORAGE_PERIOD_DETAILS_FAILED =
  'WMSX_GET_STORAGE_PERIOD_DETAILS_FAILED'

export const CONFIRM_STORAGE_PERIOD_START = 'WMSX_CONFIRM_STORAGE_PERIOD_START'
export const CONFIRM_STORAGE_PERIOD_SUCCESS =
  'WMSX_CONFIRM_STORAGE_PERIOD_SUCCESS'
export const CONFIRM_STORAGE_PERIOD_FAILED =
  'WMSX_CONFIRM_STORAGE_PERIOD_FAILED'

export const REJECT_STORAGE_PERIOD_START = 'WMSX_REJECT_STORAGE_PERIOD_START'
export const REJECT_STORAGE_PERIOD_SUCCESS =
  'WMSX_REJECT_STORAGE_PERIOD_SUCCESS'
export const REJECT_STORAGE_PERIOD_FAILED = 'WMSX_REJECT_STORAGE_PERIOD_FAILED'

export const RESET_STORAGE_PERIOD_DETAILS_STATE =
  'WMSX_RESET_STORAGE_PERIOD_DETAILS_STATE'

export function searchStoragePeriods(payload, onSuccess, onError) {
  return {
    type: SEARCH_STORAGE_PERIODS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function searchStoragePeriodsSuccess(payload) {
  return {
    type: SEARCH_STORAGE_PERIODS_SUCCESS,
    payload: payload,
  }
}

export function searchStoragePeriodsFailed() {
  return {
    type: SEARCH_STORAGE_PERIODS_FAILED,
  }
}

export function createStoragePeriod(payload, onSuccess, onError) {
  return {
    type: CREATE_STORAGE_PERIOD_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function createStoragePeriodSuccess(payload) {
  return {
    type: CREATE_STORAGE_PERIOD_SUCCESS,
    payload: payload,
  }
}

export function createStoragePeriodFailed() {
  return {
    type: CREATE_STORAGE_PERIOD_FAILED,
  }
}

export function updateStoragePeriod(payload, onSuccess, onError) {
  return {
    type: UPDATE_STORAGE_PERIOD_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function updateStoragePeriodSuccess(payload) {
  return {
    type: UPDATE_STORAGE_PERIOD_SUCCESS,
    payload: payload,
  }
}

export function updateStoragePeriodFailed() {
  return {
    type: UPDATE_STORAGE_PERIOD_FAILED,
  }
}

export function deleteStoragePeriod(packageId, onSuccess, onError) {
  return {
    type: DELETE_STORAGE_PERIOD_START,
    payload: packageId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function deleteStoragePeriodSuccess(payload) {
  return {
    type: DELETE_STORAGE_PERIOD_SUCCESS,
    payload: payload,
  }
}

export function deleteStoragePeriodFailed() {
  return {
    type: DELETE_STORAGE_PERIOD_FAILED,
  }
}

export function getStoragePeriodDetailsById(packageId, onSuccess, onError) {
  return {
    type: GET_STORAGE_PERIOD_DETAILS_START,
    payload: packageId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getStoragePeriodDetailsByIdSuccess(payload) {
  return {
    type: GET_STORAGE_PERIOD_DETAILS_SUCCESS,
    payload: payload,
  }
}

export function getStoragePeriodDetailsByIdFailed() {
  return {
    type: GET_STORAGE_PERIOD_DETAILS_FAILED,
  }
}

export function confirmStoragePeriodById(Id, onSuccess, onError) {
  return {
    type: CONFIRM_STORAGE_PERIOD_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function confirmStoragePeriodByIdSuccess(payload) {
  return {
    type: CONFIRM_STORAGE_PERIOD_SUCCESS,
    payload: payload,
  }
}

export function confirmStoragePeriodByIdFailed() {
  return {
    type: CONFIRM_STORAGE_PERIOD_FAILED,
  }
}

export function rejectStoragePeriodById(Id, onSuccess, onError) {
  return {
    type: REJECT_STORAGE_PERIOD_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function rejectStoragePeriodByIdSuccess(payload) {
  return {
    type: REJECT_STORAGE_PERIOD_SUCCESS,
    payload: payload,
  }
}

export function rejectStoragePeriodByIdFailed() {
  return {
    type: REJECT_STORAGE_PERIOD_FAILED,
  }
}

export function resetStoragePeriodDetailsState() {
  return {
    type: RESET_STORAGE_PERIOD_DETAILS_STATE,
  }
}

export default {
  searchStoragePeriods,
  searchStoragePeriodsSuccess,
  searchStoragePeriodsFailed,
  createStoragePeriod,
  createStoragePeriodSuccess,
  createStoragePeriodFailed,
  updateStoragePeriod,
  updateStoragePeriodSuccess,
  updateStoragePeriodFailed,
  deleteStoragePeriod,
  deleteStoragePeriodSuccess,
  deleteStoragePeriodFailed,
  getStoragePeriodDetailsById,
  getStoragePeriodDetailsByIdSuccess,
  getStoragePeriodDetailsByIdFailed,
  confirmStoragePeriodById,
  confirmStoragePeriodByIdSuccess,
  confirmStoragePeriodByIdFailed,
  rejectStoragePeriodById,
  rejectStoragePeriodByIdSuccess,
  rejectStoragePeriodByIdFailed,
  resetStoragePeriodDetailsState,
}
