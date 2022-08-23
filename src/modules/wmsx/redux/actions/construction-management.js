export const SEARCH_CONSTRUCTIONS_START = 'WMSX_SEARCH_CONSTRUCTIONS_START'
export const SEARCH_CONSTRUCTIONS_SUCCESS = 'WMSX_SEARCH_CONSTRUCTIONS_SUCCESS'
export const SEARCH_CONSTRUCTIONS_FAILED = 'WMSX_SEARCH_CONSTRUCTIONS_FAILED'

export const CREATE_CONSTRUCTION_START = 'WMSX_CREATE_CONSTRUCTION_START'
export const CREATE_CONSTRUCTION_SUCCESS = 'WMSX_CREATE_CONSTRUCTION_SUCCESS'
export const CREATE_CONSTRUCTION_FAILED = 'WMSX_CREATE_CONSTRUCTION_FAILED'

export const UPDATE_CONSTRUCTION_START = 'WMSX_UPDATE_CONSTRUCTION_START'
export const UPDATE_CONSTRUCTION_SUCCESS = 'WMSX_UPDATE_CONSTRUCTION_SUCCESS'
export const UPDATE_CONSTRUCTION_FAILED = 'WMSX_UPDATE_CONSTRUCTION_FAILED'

export const DELETE_CONSTRUCTION_START = 'WMSX_DELETE_CONSTRUCTION_START'
export const DELETE_CONSTRUCTION_SUCCESS = 'WMSX_DELETE_CONSTRUCTION_SUCCESS'
export const DELETE_CONSTRUCTION_FAILED = 'WMSX_DELETE_CONSTRUCTION_FAILED'

export const GET_CONSTRUCTION_DETAILS_START =
  'WMSX_GET_CONSTRUCTION_DETAILS_START'
export const GET_CONSTRUCTION_DETAILS_SUCCESS =
  'WMSX_GET_CONSTRUCTION_DETAILS_SUCCESS'
export const GET_CONSTRUCTION_DETAILS_FAILED =
  'WMSX_GET_CONSTRUCTION_DETAILS_FAILED'

export const RESET_CONSTRUCTION_DETAILS_STATE =
  'WMSX_RESET_CONSTRUCTION_DETAILS_STATE'

export function searchConstructions(payload, onSuccess, onError) {
  return {
    type: SEARCH_CONSTRUCTIONS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function searchConstructionsSuccess(payload) {
  return {
    type: SEARCH_CONSTRUCTIONS_SUCCESS,
    payload: payload,
  }
}

export function searchConstructionsFailed() {
  return {
    type: SEARCH_CONSTRUCTIONS_FAILED,
  }
}

export function createConstruction(payload, onSuccess, onError) {
  return {
    type: CREATE_CONSTRUCTION_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function createConstructionSuccess(payload) {
  return {
    type: CREATE_CONSTRUCTION_SUCCESS,
    payload: payload,
  }
}

export function createConstructionFailed() {
  return {
    type: CREATE_CONSTRUCTION_FAILED,
  }
}

export function updateConstruction(payload, onSuccess, onError) {
  return {
    type: UPDATE_CONSTRUCTION_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function updateConstructionSuccess(payload) {
  return {
    type: UPDATE_CONSTRUCTION_SUCCESS,
    payload: payload,
  }
}

export function updateConstructionFailed() {
  return {
    type: UPDATE_CONSTRUCTION_FAILED,
  }
}

export function deleteConstruction(packageId, onSuccess, onError) {
  return {
    type: DELETE_CONSTRUCTION_START,
    payload: packageId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function deleteConstructionSuccess(payload) {
  return {
    type: DELETE_CONSTRUCTION_SUCCESS,
    payload: payload,
  }
}

export function deleteConstructionFailed() {
  return {
    type: DELETE_CONSTRUCTION_FAILED,
  }
}

export function getConstructionDetailsById(packageId, onSuccess, onError) {
  return {
    type: GET_CONSTRUCTION_DETAILS_START,
    payload: packageId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getConstructionDetailsByIdSuccess(payload) {
  return {
    type: GET_CONSTRUCTION_DETAILS_SUCCESS,
    payload: payload,
  }
}

export function getConstructionDetailsByIdFailed() {
  return {
    type: GET_CONSTRUCTION_DETAILS_FAILED,
  }
}

export function resetConstructionDetailsState() {
  return {
    type: RESET_CONSTRUCTION_DETAILS_STATE,
  }
}

export default {
  searchConstructions,
  searchConstructionsSuccess,
  searchConstructionsFailed,
  createConstruction,
  createConstructionSuccess,
  createConstructionFailed,
  updateConstruction,
  updateConstructionSuccess,
  updateConstructionFailed,
  deleteConstruction,
  deleteConstructionSuccess,
  deleteConstructionFailed,
  getConstructionDetailsById,
  getConstructionDetailsByIdSuccess,
  getConstructionDetailsByIdFailed,
  resetConstructionDetailsState,
}
