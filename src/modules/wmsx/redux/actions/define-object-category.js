export const SEARCH_OBJECT_CATEGORY_START = 'WMSX_SEARCH_OBJECT_CATEGORY_START'
export const SEARCH_OBJECT_CATEGORY_SUCCESS =
  'WMSX_SEARCH_OBJECT_CATEGORY_SUCCESS'
export const SEARCH_OBJECT_CATEGORY_FAILED =
  'WMSX_SEARCH_OBJECT_CATEGORY_FAILED'

export const CREATE_OBJECT_CATEGORY_START = 'WMSX_CREATE_OBJECT_CATEGORY_START'
export const CREATE_OBJECT_CATEGORY_SUCCESS =
  'WMSX_CREATE_OBJECT_CATEGORY_SUCCESS'
export const CREATE_OBJECT_CATEGORY_FAILED =
  'WMSX_CREATE_OBJECT_CATEGORY_FAILED'

export const UPDATE_OBJECT_CATEGORY_START = 'WMSX_UPDATE_OBJECT_CATEGORY_START'
export const UPDATE_OBJECT_CATEGORY_SUCCESS =
  'WMSX_UPDATE_OBJECT_CATEGORY_SUCCESS'
export const UPDATE_OBJECT_CATEGORY_FAILED =
  'WMSX_UPDATE_OBJECT_CATEGORY_FAILED'

export const DELETE_OBJECT_CATEGORY_START = 'WMSX_DELETE_OBJECT_CATEGORY_START'
export const DELETE_OBJECT_CATEGORY_SUCCESS =
  'WMSX_DELETE_OBJECT_CATEGORY_SUCCESS'
export const DELETE_OBJECT_CATEGORY_FAILED =
  'WMSX_DELETE_OBJECT_CATEGORY_FAILED'

export const GET_OBJECT_CATEGORY_DETAILS_START =
  'WMSX_GET_OBJECT_CATEGORY_DETAILS_START'
export const GET_OBJECT_CATEGORY_DETAILS_SUCCESS =
  'WMSX_GET_OBJECT_CATEGORY_DETAILS_SUCCESS'
export const GET_OBJECT_CATEGORY_DETAILS_FAILED =
  'WMSX_GET_OBJECT_CATEGORY_DETAILS_FAILED'

export const CONFIRM_OBJECT_CATEGORY_START =
  'WMSX_CONFIRM_OBJECT_CATEGORY_START'
export const CONFIRM_OBJECT_CATEGORY_SUCCESS =
  'WMSX_CONFIRM_OBJECT_CATEGORY_SUCCESS'
export const CONFIRM_OBJECT_CATEGORY_FAILED =
  'WMSX_CONFIRM_OBJECT_CATEGORY_FAILED'

export const REJECT_OBJECT_CATEGORY_START = 'WMSX_REJECT_OBJECT_CATEGORY_START'
export const REJECT_OBJECT_CATEGORY_SUCCESS =
  'WMSX_REJECT_OBJECT_CATEGORY_SUCCESS'
export const REJECT_OBJECT_CATEGORY_FAILED =
  'WMSX_REJECT_OBJECT_CATEGORY_FAILED'

export const RESET_OBJECT_CATEGORY_DETAILS_STATE =
  'WMSX_RESET_OBJECT_CATEGORY_DETAILS_STATE'

export function searchObjectCategory(payload, onSuccess, onError) {
  return {
    type: SEARCH_OBJECT_CATEGORY_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function searchObjectCategorySuccess(payload) {
  return {
    type: SEARCH_OBJECT_CATEGORY_SUCCESS,
    payload: payload,
  }
}

export function searchObjectCategoryFailed() {
  return {
    type: SEARCH_OBJECT_CATEGORY_FAILED,
  }
}

export function createObjectCategory(payload, onSuccess, onError) {
  return {
    type: CREATE_OBJECT_CATEGORY_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function createObjectCategorySuccess(payload) {
  return {
    type: CREATE_OBJECT_CATEGORY_SUCCESS,
    payload: payload,
  }
}

export function createObjectCategoryFailed() {
  return {
    type: CREATE_OBJECT_CATEGORY_FAILED,
  }
}

export function updateObjectCategory(payload, onSuccess, onError) {
  return {
    type: UPDATE_OBJECT_CATEGORY_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function updateObjectCategorySuccess(payload) {
  return {
    type: UPDATE_OBJECT_CATEGORY_SUCCESS,
    payload: payload,
  }
}

export function updateObjectCategoryFailed() {
  return {
    type: UPDATE_OBJECT_CATEGORY_FAILED,
  }
}

export function deleteObjectCategory(packageId, onSuccess, onError) {
  return {
    type: DELETE_OBJECT_CATEGORY_START,
    payload: packageId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function deleteObjectCategorySuccess(payload) {
  return {
    type: DELETE_OBJECT_CATEGORY_SUCCESS,
    payload: payload,
  }
}

export function deleteObjectCategoryFailed() {
  return {
    type: DELETE_OBJECT_CATEGORY_FAILED,
  }
}

export function getObjectCategoryDetailsById(packageId, onSuccess, onError) {
  return {
    type: GET_OBJECT_CATEGORY_DETAILS_START,
    payload: packageId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getObjectCategoryDetailsByIdSuccess(payload) {
  return {
    type: GET_OBJECT_CATEGORY_DETAILS_SUCCESS,
    payload: payload,
  }
}

export function getObjectCategoryDetailsByIdFailed() {
  return {
    type: GET_OBJECT_CATEGORY_DETAILS_FAILED,
  }
}

export function confirmObjectCategoryById(Id, onSuccess, onError) {
  return {
    type: CONFIRM_OBJECT_CATEGORY_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function confirmObjectCategoryByIdSuccess(payload) {
  return {
    type: CONFIRM_OBJECT_CATEGORY_SUCCESS,
    payload: payload,
  }
}

export function confirmObjectCategoryByIdFailed() {
  return {
    type: CONFIRM_OBJECT_CATEGORY_FAILED,
  }
}

export function rejectObjectCategoryById(Id, onSuccess, onError) {
  return {
    type: REJECT_OBJECT_CATEGORY_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function rejectObjectCategoryByIdSuccess(payload) {
  return {
    type: REJECT_OBJECT_CATEGORY_SUCCESS,
    payload: payload,
  }
}

export function rejectObjectCategoryByIdFailed() {
  return {
    type: REJECT_OBJECT_CATEGORY_FAILED,
  }
}

export function resetObjectCategoryDetailsState() {
  return {
    type: RESET_OBJECT_CATEGORY_DETAILS_STATE,
  }
}

export default {
  searchObjectCategory,
  searchObjectCategorySuccess,
  searchObjectCategoryFailed,
  createObjectCategory,
  createObjectCategorySuccess,
  createObjectCategoryFailed,
  updateObjectCategory,
  updateObjectCategorySuccess,
  updateObjectCategoryFailed,
  deleteObjectCategory,
  deleteObjectCategorySuccess,
  deleteObjectCategoryFailed,
  getObjectCategoryDetailsById,
  getObjectCategoryDetailsByIdSuccess,
  getObjectCategoryDetailsByIdFailed,
  confirmObjectCategoryById,
  confirmObjectCategoryByIdSuccess,
  confirmObjectCategoryByIdFailed,
  rejectObjectCategoryById,
  rejectObjectCategoryByIdFailed,
  rejectObjectCategoryByIdSuccess,
  resetObjectCategoryDetailsState,
}
