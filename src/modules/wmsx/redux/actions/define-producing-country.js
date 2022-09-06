export const SEARCH_PRODUCING_COUNTRY_START =
  'WMSX_SEARCH_PRODUCING_COUNTRY_START'
export const SEARCH_PRODUCING_COUNTRY_SUCCESS =
  'WMSX_SEARCH_PRODUCING_COUNTRY_SUCCESS'
export const SEARCH_PRODUCING_COUNTRY_FAILED =
  'WMSX_SEARCH_PRODUCING_COUNTRY_FAILED'

export const CREATE_PRODUCING_COUNTRY_START =
  'WMSX_CREATE_PRODUCING_COUNTRY_START'
export const CREATE_PRODUCING_COUNTRY_SUCCESS =
  'WMSX_CREATE_PRODUCING_COUNTRY_SUCCESS'
export const CREATE_PRODUCING_COUNTRY_FAILED =
  'WMSX_CREATE_PRODUCING_COUNTRY_FAILED'

export const UPDATE_PRODUCING_COUNTRY_START =
  'WMSX_UPDATE_PRODUCING_COUNTRY_START'
export const UPDATE_PRODUCING_COUNTRY_SUCCESS =
  'WMSX_UPDATE_PRODUCING_COUNTRY_SUCCESS'
export const UPDATE_PRODUCING_COUNTRY_FAILED =
  'WMSX_UPDATE_PRODUCING_COUNTRY_FAILED'

export const DELETE_PRODUCING_COUNTRY_START =
  'WMSX_DELETE_PRODUCING_COUNTRY_START'
export const DELETE_PRODUCING_COUNTRY_SUCCESS =
  'WMSX_DELETE_PRODUCING_COUNTRY_SUCCESS'
export const DELETE_PRODUCING_COUNTRY_FAILED =
  'WMSX_DELETE_PRODUCING_COUNTRY_FAILED'

export const GET_PRODUCING_COUNTRY_DETAILS_START =
  'WMSX_GET_PRODUCING_COUNTRY_DETAILS_START'
export const GET_PRODUCING_COUNTRY_DETAILS_SUCCESS =
  'WMSX_GET_PRODUCING_COUNTRY_DETAILS_SUCCESS'
export const GET_PRODUCING_COUNTRY_DETAILS_FAILED =
  'WMSX_GET_PRODUCING_COUNTRY_DETAILS_FAILED'

export const CONFIRM_PRODUCING_COUNTRY_START =
  'WMSX_CONFIRM_PRODUCING_COUNTRY_START'
export const CONFIRM_PRODUCING_COUNTRY_SUCCESS =
  'WMSX_CONFIRM_PRODUCING_COUNTRY_SUCCESS'
export const CONFIRM_PRODUCING_COUNTRY_FAILED =
  'WMSX_CONFIRM_PRODUCING_COUNTRY_FAILED'

export const REJECT_PRODUCING_COUNTRY_START =
  'WMSX_REJECT_PRODUCING_COUNTRY_START'
export const REJECT_PRODUCING_COUNTRY_SUCCESS =
  'WMSX_REJECT_PRODUCING_COUNTRY_SUCCESS'
export const REJECT_PRODUCING_COUNTRY_FAILED =
  'WMSX_REJECT_PRODUCING_COUNTRY_FAILED'

export const RESET_PRODUCING_COUNTRY_DETAILS_STATE =
  'WMSX_RESET_PRODUCING_COUNTRY_DETAILS_STATE'

export function searchProducingCountry(payload, onSuccess, onError) {
  return {
    type: SEARCH_PRODUCING_COUNTRY_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function searchProducingCountrySuccess(payload) {
  return {
    type: SEARCH_PRODUCING_COUNTRY_SUCCESS,
    payload: payload,
  }
}

export function searchProducingCountryFailed() {
  return {
    type: SEARCH_PRODUCING_COUNTRY_FAILED,
  }
}

export function createProducingCountry(payload, onSuccess, onError) {
  return {
    type: CREATE_PRODUCING_COUNTRY_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function createProducingCountrySuccess(payload) {
  return {
    type: CREATE_PRODUCING_COUNTRY_SUCCESS,
    payload: payload,
  }
}

export function createProducingCountryFailed() {
  return {
    type: CREATE_PRODUCING_COUNTRY_FAILED,
  }
}

export function updateProducingCountry(payload, onSuccess, onError) {
  return {
    type: UPDATE_PRODUCING_COUNTRY_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function updateProducingCountrySuccess(payload) {
  return {
    type: UPDATE_PRODUCING_COUNTRY_SUCCESS,
    payload: payload,
  }
}

export function updateProducingCountryFailed() {
  return {
    type: UPDATE_PRODUCING_COUNTRY_FAILED,
  }
}

export function deleteProducingCountry(packageId, onSuccess, onError) {
  return {
    type: DELETE_PRODUCING_COUNTRY_START,
    payload: packageId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function deleteProducingCountrySuccess(payload) {
  return {
    type: DELETE_PRODUCING_COUNTRY_SUCCESS,
    payload: payload,
  }
}

export function deleteProducingCountryFailed() {
  return {
    type: DELETE_PRODUCING_COUNTRY_FAILED,
  }
}

export function getProducingCountryDetailsById(packageId, onSuccess, onError) {
  return {
    type: GET_PRODUCING_COUNTRY_DETAILS_START,
    payload: packageId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getProducingCountryDetailsByIdSuccess(payload) {
  return {
    type: GET_PRODUCING_COUNTRY_DETAILS_SUCCESS,
    payload: payload,
  }
}

export function getProducingCountryDetailsByIdFailed() {
  return {
    type: GET_PRODUCING_COUNTRY_DETAILS_FAILED,
  }
}

export function confirmProducingCountryById(Id, onSuccess, onError) {
  return {
    type: CONFIRM_PRODUCING_COUNTRY_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function confirmProducingCountryByIdSuccess(payload) {
  return {
    type: CONFIRM_PRODUCING_COUNTRY_SUCCESS,
    payload: payload,
  }
}

export function confirmProducingCountryByIdFailed() {
  return {
    type: CONFIRM_PRODUCING_COUNTRY_FAILED,
  }
}

export function rejectProducingCountryById(Id, onSuccess, onError) {
  return {
    type: REJECT_PRODUCING_COUNTRY_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function rejectProducingCountryByIdSuccess(payload) {
  return {
    type: REJECT_PRODUCING_COUNTRY_SUCCESS,
    payload: payload,
  }
}

export function rejectProducingCountryByIdFailed() {
  return {
    type: REJECT_PRODUCING_COUNTRY_FAILED,
  }
}

export function resetProducingCountryDetailsState() {
  return {
    type: RESET_PRODUCING_COUNTRY_DETAILS_STATE,
  }
}

export default {
  searchProducingCountry,
  searchProducingCountrySuccess,
  searchProducingCountryFailed,
  createProducingCountry,
  createProducingCountrySuccess,
  createProducingCountryFailed,
  updateProducingCountry,
  updateProducingCountrySuccess,
  updateProducingCountryFailed,
  deleteProducingCountry,
  deleteProducingCountrySuccess,
  deleteProducingCountryFailed,
  getProducingCountryDetailsById,
  getProducingCountryDetailsByIdSuccess,
  getProducingCountryDetailsByIdFailed,
  confirmProducingCountryById,
  confirmProducingCountryByIdSuccess,
  confirmProducingCountryByIdFailed,
  rejectProducingCountryById,
  rejectProducingCountryByIdSuccess,
  rejectProducingCountryByIdFailed,
  resetProducingCountryDetailsState,
}
