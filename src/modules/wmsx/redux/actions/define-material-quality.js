export const SEARCH_MATERIAL_QUALITY_START =
  'WMSX_SEARCH_MATERIAL_QUALITY_START'
export const SEARCH_MATERIAL_QUALITY_SUCCESS =
  'WMSX_SEARCH_MATERIAL_QUALITY_SUCCESS'
export const SEARCH_MATERIAL_QUALITY_FAILED =
  'WMSX_SEARCH_MATERIAL_QUALITY_FAILED'

export const CREATE_MATERIAL_QUALITY_START =
  'WMSX_CREATE_MATERIAL_QUALITY_START'
export const CREATE_MATERIAL_QUALITY_SUCCESS =
  'WMSX_CREATE_MATERIAL_QUALITY_SUCCESS'
export const CREATE_MATERIAL_QUALITY_FAILED =
  'WMSX_CREATE_MATERIAL_QUALITY_FAILED'

export const UPDATE_MATERIAL_QUALITY_START =
  'WMSX_UPDATE_MATERIAL_QUALITY_START'
export const UPDATE_MATERIAL_QUALITY_SUCCESS =
  'WMSX_UPDATE_MATERIAL_QUALITY_SUCCESS'
export const UPDATE_MATERIAL_QUALITY_FAILED =
  'WMSX_UPDATE_MATERIAL_QUALITY_FAILED'

export const DELETE_MATERIAL_QUALITY_START =
  'WMSX_DELETE_MATERIAL_QUALITY_START'
export const DELETE_MATERIAL_QUALITY_SUCCESS =
  'WMSX_DELETE_MATERIAL_QUALITY_SUCCESS'
export const DELETE_MATERIAL_QUALITY_FAILED =
  'WMSX_DELETE_MATERIAL_QUALITY_FAILED'

export const GET_MATERIAL_QUALITY_DETAILS_START =
  'WMSX_GET_MATERIAL_QUALITY_DETAILS_START'
export const GET_MATERIAL_QUALITY_DETAILS_SUCCESS =
  'WMSX_GET_MATERIAL_QUALITY_DETAILS_SUCCESS'
export const GET_MATERIAL_QUALITY_DETAILS_FAILED =
  'WMSX_GET_MATERIAL_QUALITY_DETAILS_FAILED'

export const CONFIRM_MATERIAL_QUALITY_START =
  'WMSX_CONFIRM_MATERIAL_QUALITY_START'
export const CONFIRM_MATERIAL_QUALITY_SUCCESS =
  'WMSX_CONFIRM_MATERIAL_QUALITY_SUCCESS'
export const CONFIRM_MATERIAL_QUALITY_FAILED =
  'WMSX_CONFIRM_MATERIAL_QUALITY_FAILED'

export const REJECT_MATERIAL_QUALITY_START =
  'WMSX_REJECT_MATERIAL_QUALITY_START'
export const REJECT_MATERIAL_QUALITY_SUCCESS =
  'WMSX_REJECT_MATERIAL_QUALITY_SUCCESS'
export const REJECT_MATERIAL_QUALITY_FAILED =
  'WMSX_REJECT_MATERIAL_QUALITY_FAILED'

export const RESET_MATERIAL_QUALITY_DETAILS_STATE =
  'WMSX_RESET_MATERIAL_QUALITY_DETAILS_STATE'

export function searchMaterialQuality(payload, onSuccess, onError) {
  return {
    type: SEARCH_MATERIAL_QUALITY_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function searchMaterialQualitySuccess(payload) {
  return {
    type: SEARCH_MATERIAL_QUALITY_SUCCESS,
    payload: payload,
  }
}

export function searchMaterialQualityFailed() {
  return {
    type: SEARCH_MATERIAL_QUALITY_FAILED,
  }
}

export function createMaterialQuality(payload, onSuccess, onError) {
  return {
    type: CREATE_MATERIAL_QUALITY_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function createMaterialQualitySuccess(payload) {
  return {
    type: CREATE_MATERIAL_QUALITY_SUCCESS,
    payload: payload,
  }
}

export function createMaterialQualityFailed() {
  return {
    type: CREATE_MATERIAL_QUALITY_FAILED,
  }
}

export function updateMaterialQuality(payload, onSuccess, onError) {
  return {
    type: UPDATE_MATERIAL_QUALITY_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function updateMaterialQualitySuccess(payload) {
  return {
    type: UPDATE_MATERIAL_QUALITY_SUCCESS,
    payload: payload,
  }
}

export function updateMaterialQualityFailed() {
  return {
    type: UPDATE_MATERIAL_QUALITY_FAILED,
  }
}

export function deleteMaterialQuality(packageId, onSuccess, onError) {
  return {
    type: DELETE_MATERIAL_QUALITY_START,
    payload: packageId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function deleteMaterialQualitySuccess(payload) {
  return {
    type: DELETE_MATERIAL_QUALITY_SUCCESS,
    payload: payload,
  }
}

export function deleteMaterialQualityFailed() {
  return {
    type: DELETE_MATERIAL_QUALITY_FAILED,
  }
}

export function getMaterialQualityDetailsById(packageId, onSuccess, onError) {
  return {
    type: GET_MATERIAL_QUALITY_DETAILS_START,
    payload: packageId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getMaterialQualityDetailsByIdSuccess(payload) {
  return {
    type: GET_MATERIAL_QUALITY_DETAILS_SUCCESS,
    payload: payload,
  }
}

export function getMaterialQualityDetailsByIdFailed() {
  return {
    type: GET_MATERIAL_QUALITY_DETAILS_FAILED,
  }
}

export function confirmMaterialQualityById(Id, onSuccess, onError) {
  return {
    type: CONFIRM_MATERIAL_QUALITY_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function confirmMaterialQualityByIdSuccess(payload) {
  return {
    type: CONFIRM_MATERIAL_QUALITY_SUCCESS,
    payload: payload,
  }
}

export function confirmMaterialQualityByIdFailed() {
  return {
    type: CONFIRM_MATERIAL_QUALITY_FAILED,
  }
}

export function rejectMaterialQualityById(Id, onSuccess, onError) {
  return {
    type: REJECT_MATERIAL_QUALITY_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function rejectMaterialQualityByIdSuccess(payload) {
  return {
    type: REJECT_MATERIAL_QUALITY_SUCCESS,
    payload: payload,
  }
}

export function rejectMaterialQualityByIdFailed() {
  return {
    type: REJECT_MATERIAL_QUALITY_FAILED,
  }
}

export function resetMaterialQualityDetailsState() {
  return {
    type: RESET_MATERIAL_QUALITY_DETAILS_STATE,
  }
}

export default {
  searchMaterialQuality,
  searchMaterialQualitySuccess,
  searchMaterialQualityFailed,
  createMaterialQuality,
  createMaterialQualitySuccess,
  createMaterialQualityFailed,
  updateMaterialQuality,
  updateMaterialQualitySuccess,
  updateMaterialQualityFailed,
  deleteMaterialQuality,
  deleteMaterialQualitySuccess,
  deleteMaterialQualityFailed,
  getMaterialQualityDetailsById,
  getMaterialQualityDetailsByIdSuccess,
  getMaterialQualityDetailsByIdFailed,
  confirmMaterialQualityById,
  confirmMaterialQualityByIdSuccess,
  confirmMaterialQualityByIdFailed,
  rejectMaterialQualityById,
  rejectMaterialQualityByIdSuccess,
  rejectMaterialQualityByIdFailed,
  resetMaterialQualityDetailsState,
}
