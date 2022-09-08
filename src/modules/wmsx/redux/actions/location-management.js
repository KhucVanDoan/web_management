export const SEARCH_LOCATIONS_START = 'WMSX_SEARCH_LOCATIONS_START'
export const SEARCH_LOCATIONS_SUCCESS = 'WMSX_SEARCH_LOCATIONS_SUCCESS'
export const SEARCH_LOCATIONS_FAILED = 'WMSX_SEARCH_LOCATIONS_FAILED'

export const CREATE_LOCATION_START = 'WMSX_CREATE_LOCATION_START'
export const CREATE_LOCATION_SUCCESS = 'WMSX_CREATE_LOCATION_SUCCESS'
export const CREATE_LOCATION_FAILED = 'WMSX_CREATE_LOCATION_FAILED'

export const UPDATE_LOCATION_START = 'WMSX_UPDATE_LOCATION_START'
export const UPDATE_LOCATION_SUCCESS = 'WMSX_UPDATE_LOCATION_SUCCESS'
export const UPDATE_LOCATION_FAILED = 'WMSX_UPDATE_LOCATION_FAILED'

export const DELETE_LOCATION_START = 'WMSX_DELETE_LOCATION_START'
export const DELETE_LOCATION_SUCCESS = 'WMSX_DELETE_LOCATION_SUCCESS'
export const DELETE_LOCATION_FAILED = 'WMSX_DELETE_LOCATION_FAILED'

export const GET_LOCATION_DETAILS_START = 'WMSX_GET_LOCATION_DETAILS_START'
export const GET_LOCATION_DETAILS_SUCCESS = 'WMSX_GET_LOCATION_DETAILS_SUCCESS'
export const GET_LOCATION_DETAILS_FAILED = 'WMSX_GET_LOCATION_DETAILS_FAILED'

export const CONFIRM_LOCATION_START = 'WMSX_CONFIRM_LOCATION_START'
export const CONFIRM_LOCATION_SUCCESS = 'WMSX_CONFIRM_LOCATION_SUCCESS'
export const CONFIRM_LOCATION_FAILED = 'WMSX_CONFIRM_LOCATION_FAILED'

export const REJECT_LOCATION_START = 'WMSX_REJECT_LOCATION_START'
export const REJECT_LOCATION_SUCCESS = 'WMSX_REJECT_LOCATION_SUCCESS'
export const REJECT_LOCATION_FAILED = 'WMSX_REJECT_LOCATION_FAILED'

export const RESET_LOCATION_DETAILS_STATE = 'WMSX_RESET_LOCATION_DETAILS_STATE'

export function searchLocations(payload, onSuccess, onError) {
  return {
    type: SEARCH_LOCATIONS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function searchLocationsSuccess(payload) {
  return {
    type: SEARCH_LOCATIONS_SUCCESS,
    payload: payload,
  }
}

export function searchLocationsFailed() {
  return {
    type: SEARCH_LOCATIONS_FAILED,
  }
}

export function createLocation(payload, onSuccess, onError) {
  return {
    type: CREATE_LOCATION_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function createLocationSuccess(payload) {
  return {
    type: CREATE_LOCATION_SUCCESS,
    payload: payload,
  }
}

export function createLocationFailed() {
  return {
    type: CREATE_LOCATION_FAILED,
  }
}

export function updateLocation(payload, onSuccess, onError) {
  return {
    type: UPDATE_LOCATION_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function updateLocationSuccess(payload) {
  return {
    type: UPDATE_LOCATION_SUCCESS,
    payload: payload,
  }
}

export function updateLocationFailed() {
  return {
    type: UPDATE_LOCATION_FAILED,
  }
}

export function deleteLocation(packageId, onSuccess, onError) {
  return {
    type: DELETE_LOCATION_START,
    payload: packageId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function deleteLocationSuccess(payload) {
  return {
    type: DELETE_LOCATION_SUCCESS,
    payload: payload,
  }
}

export function deleteLocationFailed() {
  return {
    type: DELETE_LOCATION_FAILED,
  }
}

export function getLocationDetailsById(packageId, onSuccess, onError) {
  return {
    type: GET_LOCATION_DETAILS_START,
    payload: packageId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getLocationDetailsByIdSuccess(payload) {
  return {
    type: GET_LOCATION_DETAILS_SUCCESS,
    payload: payload,
  }
}

export function getLocationDetailsByIdFailed() {
  return {
    type: GET_LOCATION_DETAILS_FAILED,
  }
}

export function confirmLocationById(Id, onSuccess, onError) {
  return {
    type: CONFIRM_LOCATION_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function confirmLocationByIdSuccess(payload) {
  return {
    type: CONFIRM_LOCATION_SUCCESS,
    payload: payload,
  }
}

export function confirmLocationByIdFailed() {
  return {
    type: CONFIRM_LOCATION_FAILED,
  }
}

export function rejectLocationById(Id, onSuccess, onError) {
  return {
    type: REJECT_LOCATION_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function rejectLocationByIdSuccess(payload) {
  return {
    type: REJECT_LOCATION_SUCCESS,
    payload: payload,
  }
}

export function rejectLocationByIdFailed() {
  return {
    type: REJECT_LOCATION_FAILED,
  }
}

export function resetLocationDetailsState() {
  return {
    type: RESET_LOCATION_DETAILS_STATE,
  }
}

export default {
  searchLocations,
  searchLocationsSuccess,
  searchLocationsFailed,
  createLocation,
  createLocationSuccess,
  createLocationFailed,
  updateLocation,
  updateLocationSuccess,
  updateLocationFailed,
  deleteLocation,
  deleteLocationSuccess,
  deleteLocationFailed,
  getLocationDetailsById,
  getLocationDetailsByIdSuccess,
  getLocationDetailsByIdFailed,
  confirmLocationById,
  confirmLocationByIdSuccess,
  confirmLocationByIdFailed,
  rejectLocationById,
  rejectLocationByIdSuccess,
  rejectLocationByIdFailed,
  resetLocationDetailsState,
}
