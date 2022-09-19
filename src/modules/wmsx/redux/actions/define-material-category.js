export const SEARCH_MATERIAL_CATEGORY_START =
  'WMSX_SEARCH_MATERIAL_CATEGORY_START'
export const SEARCH_MATERIAL_CATEGORY_SUCCESS =
  'WMSX_SEARCH_MATERIAL_CATEGORY_SUCCESS'
export const SEARCH_MATERIAL_CATEGORY_FAILED =
  'WMSX_SEARCH_MATERIAL_CATEGORY_FAILED'

export const CREATE_MATERIAL_CATEGORY_START =
  'WMSX_CREATE_MATERIAL_CATEGORY_START'
export const CREATE_MATERIAL_CATEGORY_SUCCESS =
  'WMSX_CREATE_MATERIAL_CATEGORY_SUCCESS'
export const CREATE_MATERIAL_CATEGORY_FAILED =
  'WMSX_CREATE_MATERIAL_CATEGORY_FAILED'

export const UPDATE_MATERIAL_CATEGORY_START =
  'WMSX_UPDATE_MATERIAL_CATEGORY_START'
export const UPDATE_MATERIAL_CATEGORY_SUCCESS =
  'WMSX_UPDATE_MATERIAL_CATEGORY_SUCCESS'
export const UPDATE_MATERIAL_CATEGORY_FAILED =
  'WMSX_UPDATE_MATERIAL_CATEGORY_FAILED'

export const DELETE_MATERIAL_CATEGORY_START =
  'WMSX_DELETE_MATERIAL_CATEGORY_START'
export const DELETE_MATERIAL_CATEGORY_SUCCESS =
  'WMSX_DELETE_MATERIAL_CATEGORY_SUCCESS'
export const DELETE_MATERIAL_CATEGORY_FAILED =
  'WMSX_DELETE_MATERIAL_CATEGORY_FAILED'

export const GET_MATERIAL_CATEGORY_DETAILS_START =
  'WMSX_GET_MATERIAL_CATEGORY_DETAILS_START'
export const GET_MATERIAL_CATEGORY_DETAILS_SUCCESS =
  'WMSX_GET_MATERIAL_CATEGORY_DETAILS_SUCCESS'
export const GET_MATERIAL_CATEGORY_DETAILS_FAILED =
  'WMSX_GET_MATERIAL_CATEGORY_DETAILS_FAILED'

export const GET_MATERIAL_CHILD_DETAILS_START =
  'WMSX_GET_MATERIAL_CHILD_DETAILS_START'
export const GET_MATERIAL_CHILD_DETAILS_SUCCESS =
  'WMSX_GET_MATERIAL_CHILD_DETAILS_SUCCESS'
export const GET_MATERIAL_CHILD_DETAILS_FAILED =
  'WMSX_GET_MATERIAL_CHILD_DETAILS_FAILED'

export const CONFIRM_MATERIAL_CATEGORY_START =
  'WMSX_CONFIRM_MATERIAL_CATEGORY_START'
export const CONFIRM_MATERIAL_CATEGORY_SUCCESS =
  'WMSX_CONFIRM_MATERIAL_CATEGORY_SUCCESS'
export const CONFIRM_MATERIAL_CATEGORY_FAILED =
  'WMSX_CONFIRM_MATERIAL_CATEGORY_FAILED'

export const REJECT_MATERIAL_CATEGORY_START =
  'WMSX_REJECT_MATERIAL_CATEGORY_START'
export const REJECT_MATERIAL_CATEGORY_SUCCESS =
  'WMSX_REJECT_MATERIAL_CATEGORY_SUCCESS'
export const REJECT_MATERIAL_CATEGORY_FAILED =
  'WMSX_REJECT_MATERIAL_CATEGORY_FAILED'

export const RESET_MATERIAL_CATEGORY_DETAILS_STATE =
  'WMSX_RESET_MATERIAL_CATEGORY_DETAILS_STATE'

export function searchMaterialCategory(payload, onSuccess, onError) {
  return {
    type: SEARCH_MATERIAL_CATEGORY_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function searchMaterialCategorySuccess(payload) {
  return {
    type: SEARCH_MATERIAL_CATEGORY_SUCCESS,
    payload: payload,
  }
}

export function searchMaterialCategoryFailed() {
  return {
    type: SEARCH_MATERIAL_CATEGORY_FAILED,
  }
}

export function createMaterialCategory(payload, onSuccess, onError) {
  return {
    type: CREATE_MATERIAL_CATEGORY_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function createMaterialCategorySuccess(payload) {
  return {
    type: CREATE_MATERIAL_CATEGORY_SUCCESS,
    payload: payload,
  }
}

export function createMaterialCategoryFailed() {
  return {
    type: CREATE_MATERIAL_CATEGORY_FAILED,
  }
}

export function updateMaterialCategory(payload, onSuccess, onError) {
  return {
    type: UPDATE_MATERIAL_CATEGORY_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function updateMaterialCategorySuccess(payload) {
  return {
    type: UPDATE_MATERIAL_CATEGORY_SUCCESS,
    payload: payload,
  }
}

export function updateMaterialCategoryFailed() {
  return {
    type: UPDATE_MATERIAL_CATEGORY_FAILED,
  }
}

export function deleteMaterialCategory(packageId, onSuccess, onError) {
  return {
    type: DELETE_MATERIAL_CATEGORY_START,
    payload: packageId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function deleteMaterialCategorySuccess(payload) {
  return {
    type: DELETE_MATERIAL_CATEGORY_SUCCESS,
    payload: payload,
  }
}

export function deleteMaterialCategoryFailed() {
  return {
    type: DELETE_MATERIAL_CATEGORY_FAILED,
  }
}

export function getMaterialCategoryDetailsById(packageId, onSuccess, onError) {
  return {
    type: GET_MATERIAL_CATEGORY_DETAILS_START,
    payload: packageId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getMaterialCategoryDetailsByIdSuccess(payload) {
  return {
    type: GET_MATERIAL_CATEGORY_DETAILS_SUCCESS,
    payload: payload,
  }
}

export function getMaterialCategoryDetailsByIdFailed() {
  return {
    type: GET_MATERIAL_CATEGORY_DETAILS_FAILED,
  }
}

export function getMaterialChildDetailsById(packageId, onSuccess, onError) {
  return {
    type: GET_MATERIAL_CHILD_DETAILS_START,
    payload: packageId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getMaterialChildDetailsByIdSuccess(payload) {
  return {
    type: GET_MATERIAL_CHILD_DETAILS_SUCCESS,
    payload: payload,
  }
}

export function getMaterialChildDetailsByIdFailed() {
  return {
    type: GET_MATERIAL_CHILD_DETAILS_FAILED,
  }
}

export function confirmMaterialCategoryById(Id, onSuccess, onError) {
  return {
    type: CONFIRM_MATERIAL_CATEGORY_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function confirmMaterialCategoryByIdSuccess(payload) {
  return {
    type: CONFIRM_MATERIAL_CATEGORY_SUCCESS,
    payload: payload,
  }
}

export function confirmMaterialCategoryByIdFailed() {
  return {
    type: CONFIRM_MATERIAL_CATEGORY_FAILED,
  }
}

export function rejectMaterialCategoryById(Id, onSuccess, onError) {
  return {
    type: REJECT_MATERIAL_CATEGORY_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function rejectMaterialCategoryByIdSuccess(payload) {
  return {
    type: REJECT_MATERIAL_CATEGORY_SUCCESS,
    payload: payload,
  }
}

export function rejectMaterialCategoryByIdFailed() {
  return {
    type: REJECT_MATERIAL_CATEGORY_FAILED,
  }
}

export function resetMaterialCategoryDetailsState() {
  return {
    type: RESET_MATERIAL_CATEGORY_DETAILS_STATE,
  }
}

export default {
  searchMaterialCategory,
  searchMaterialCategorySuccess,
  searchMaterialCategoryFailed,
  createMaterialCategory,
  createMaterialCategorySuccess,
  createMaterialCategoryFailed,
  updateMaterialCategory,
  updateMaterialCategorySuccess,
  updateMaterialCategoryFailed,
  deleteMaterialCategory,
  deleteMaterialCategorySuccess,
  deleteMaterialCategoryFailed,
  getMaterialCategoryDetailsById,
  getMaterialCategoryDetailsByIdSuccess,
  getMaterialCategoryDetailsByIdFailed,
  getMaterialChildDetailsById,
  getMaterialChildDetailsByIdSuccess,
  getMaterialChildDetailsByIdFailed,
  confirmMaterialCategoryById,
  confirmMaterialCategoryByIdSuccess,
  confirmMaterialCategoryByIdFailed,
  rejectMaterialCategoryById,
  rejectMaterialCategoryByIdSuccess,
  rejectMaterialCategoryByIdFailed,
  resetMaterialCategoryDetailsState,
}
