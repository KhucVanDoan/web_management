export const SEARCH_MATERIALS_START = 'WMSX_SEARCH_MATERIALS_START'
export const SEARCH_MATERIALS_SUCCESS = 'WMSX_SEARCH_MATERIALS_SUCCESS'
export const SEARCH_MATERIALS_FAILED = 'WMSX_SEARCH_MATERIALS_FAILED'

export const CREATE_MATERIAL_START = 'WMSX_CREATE_MATERIAL_START'
export const CREATE_MATERIAL_SUCCESS = 'WMSX_CREATE_MATERIAL_SUCCESS'
export const CREATE_MATERIAL_FAILED = 'WMSX_CREATE_MATERIAL_FAILED'

export const UPDATE_MATERIAL_START = 'WMSX_UPDATE_MATERIAL_START'
export const UPDATE_MATERIAL_SUCCESS = 'WMSX_UPDATE_MATERIAL_SUCCESS'
export const UPDATE_MATERIAL_FAILED = 'WMSX_UPDATE_MATERIAL_FAILED'

export const UPDATE_WAREHOUSE_SOURCE_START =
  'WMSX_UPDATE_WAREHOUSE_SOURCE_START'
export const UPDATE_WAREHOUSE_SOURCE_SUCCESS =
  'WMSX_UPDATE_WAREHOUSE_SOURCE_SUCCESS'
export const UPDATE_WAREHOUSE_SOURCE_FAILED =
  'WMSX_UPDATE_WAREHOUSE_SOURCE_FAILED'

export const DELETE_MATERIAL_START = 'WMSX_DELETE_MATERIAL_START'
export const DELETE_MATERIAL_SUCCESS = 'WMSX_DELETE_MATERIAL_SUCCESS'
export const DELETE_MATERIAL_FAILED = 'WMSX_DELETE_MATERIAL_FAILED'

export const GET_MATERIAL_DETAILS_START = 'WMSX_GET_MATERIAL_DETAILS_START'
export const GET_MATERIAL_DETAILS_SUCCESS = 'WMSX_GET_MATERIAL_DETAILS_SUCCESS'
export const GET_MATERIAL_DETAILS_FAILED = 'WMSX_GET_MATERIAL_DETAILS_FAILED'

export const CONFIRM_MATERIAL_START = 'WMSX_CONFIRM_MATERIAL_START'
export const CONFIRM_MATERIAL_SUCCESS = 'WMSX_CONFIRM_MATERIAL_SUCCESS'
export const CONFIRM_MATERIAL_FAILED = 'WMSX_CONFIRM_MATERIAL_FAILED'

export const REJECT_MATERIAL_START = 'WMSX_REJECT_MATERIAL_START'
export const REJECT_MATERIAL_SUCCESS = 'WMSX_REJECT_MATERIAL_SUCCESS'
export const REJECT_MATERIAL_FAILED = 'WMSX_REJECT_MATERIAL_FAILED'

export const RESET_MATERIAL_DETAILS_STATE = 'WMSX_RESET_MATERIAL_DETAILS_STATE'

export const CREATE_ITEM_WAREHOUSE_SOURCE_START = 'WMS_CREATE_ITEM_WAREHOUSE_SOURCE_START'
export const CREATE_ITEM_WAREHOUSE_SOURCE_SUCCESS = 'WMS_CREATE_ITEM_WAREHOUSE_SOURCE_SUCCESS'
export const CREATE_ITEM_WAREHOUSE_SOURCE_FAILED = 'WMS_CREATE_ITEM_WAREHOUSE_SOURCE_FAILED'

export const UPDATE_ITEM_WAREHOUSE_SOURCE_START = 'WMS_UPDATE_ITEM_WAREHOUSE_SOURCE_START'
export const UPDATE_ITEM_WAREHOUSE_SOURCE_SUCCESS = 'WMS_UPDATE_ITEM_WAREHOUSE_SOURCE_SUCCESS'
export const UPDATE_ITEM_WAREHOUSE_SOURCE_FAILED = 'WMS_UPDATE_ITEM_WAREHOUSE_SOURCE_FAILED'

export function searchMaterials(payload, onSuccess, onError) {
  return {
    type: SEARCH_MATERIALS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function searchMaterialsSuccess(payload) {
  return {
    type: SEARCH_MATERIALS_SUCCESS,
    payload: payload,
  }
}

export function searchMaterialsFailed() {
  return {
    type: SEARCH_MATERIALS_FAILED,
  }
}

export function createMaterial(payload, onSuccess, onError) {
  return {
    type: CREATE_MATERIAL_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function createMaterialSuccess(payload) {
  return {
    type: CREATE_MATERIAL_SUCCESS,
    payload: payload,
  }
}

export function createMaterialFailed() {
  return {
    type: CREATE_MATERIAL_FAILED,
  }
}

export function updateMaterial(payload, onSuccess, onError) {
  return {
    type: UPDATE_MATERIAL_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function updateMaterialSuccess(payload) {
  return {
    type: UPDATE_MATERIAL_SUCCESS,
    payload: payload,
  }
}

export function updateMaterialFailed() {
  return {
    type: UPDATE_MATERIAL_FAILED,
  }
}

export function updateWarehouseSource(payload, onSuccess, onError) {
  return {
    type: UPDATE_WAREHOUSE_SOURCE_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function updateWarehouseSourceSuccess(payload) {
  return {
    type: UPDATE_WAREHOUSE_SOURCE_SUCCESS,
    payload: payload,
  }
}

export function updateWarehouseSourceFailed() {
  return {
    type: UPDATE_WAREHOUSE_SOURCE_FAILED,
  }
}

export function deleteMaterial(packageId, onSuccess, onError) {
  return {
    type: DELETE_MATERIAL_START,
    payload: packageId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function deleteMaterialSuccess(payload) {
  return {
    type: DELETE_MATERIAL_SUCCESS,
    payload: payload,
  }
}

export function deleteMaterialFailed() {
  return {
    type: DELETE_MATERIAL_FAILED,
  }
}

export function getMaterialDetailsById(packageId, onSuccess, onError) {
  return {
    type: GET_MATERIAL_DETAILS_START,
    payload: packageId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getMaterialDetailsByIdSuccess(payload) {
  return {
    type: GET_MATERIAL_DETAILS_SUCCESS,
    payload: payload,
  }
}

export function getMaterialDetailsByIdFailed() {
  return {
    type: GET_MATERIAL_DETAILS_FAILED,
  }
}

export function confirmMaterialById(Id, onSuccess, onError) {
  return {
    type: CONFIRM_MATERIAL_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function confirmMaterialByIdSuccess(payload) {
  return {
    type: CONFIRM_MATERIAL_SUCCESS,
    payload: payload,
  }
}

export function confirmMaterialByIdFailed() {
  return {
    type: CONFIRM_MATERIAL_FAILED,
  }
}

export function rejectMaterialById(Id, onSuccess, onError) {
  return {
    type: REJECT_MATERIAL_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function rejectMaterialByIdSuccess(payload) {
  return {
    type: REJECT_MATERIAL_SUCCESS,
    payload: payload,
  }
}

export function rejectMaterialByIdFailed() {
  return {
    type: REJECT_MATERIAL_FAILED,
  }
}

export function resetMaterialDetailsState() {
  return {
    type: RESET_MATERIAL_DETAILS_STATE,
  }
}

export function createItemWarehouseSource(payload, onSuccess, onError) {
  return {
    type: CREATE_ITEM_WAREHOUSE_SOURCE_START,
    payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function createItemWarehouseSourceSuccess() {
  return {
    type: CREATE_ITEM_WAREHOUSE_SOURCE_SUCCESS
  }
}

export function createItemWarehouseSourceFailed() {
  return {
    type: CREATE_ITEM_WAREHOUSE_SOURCE_FAILED
  }
}

export function updateItemWarehouseSource(payload, onSuccess, onError) {
  return {
    type: UPDATE_ITEM_WAREHOUSE_SOURCE_START,
    payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function updateItemWarehouseSourceSuccess() {
  return {
    type: UPDATE_ITEM_WAREHOUSE_SOURCE_SUCCESS
  }
}

export function updateItemWarehouseSourceFailed() {
  return {
    type: UPDATE_ITEM_WAREHOUSE_SOURCE_FAILED
  }
}

export default {
  searchMaterials,
  searchMaterialsSuccess,
  searchMaterialsFailed,
  createMaterial,
  createMaterialSuccess,
  createMaterialFailed,
  updateMaterial,
  updateMaterialSuccess,
  updateMaterialFailed,
  deleteMaterial,
  deleteMaterialSuccess,
  deleteMaterialFailed,
  getMaterialDetailsById,
  getMaterialDetailsByIdSuccess,
  getMaterialDetailsByIdFailed,
  confirmMaterialById,
  confirmMaterialByIdSuccess,
  confirmMaterialByIdFailed,
  rejectMaterialById,
  rejectMaterialByIdSuccess,
  rejectMaterialByIdFailed,
  updateWarehouseSource,
  updateWarehouseSourceSuccess,
  updateWarehouseSourceFailed,
  resetMaterialDetailsState,
  createItemWarehouseSource,
  createItemWarehouseSourceSuccess,
  createItemWarehouseSourceFailed,
  updateItemWarehouseSource,
  updateItemWarehouseSourceSuccess,
  updateItemWarehouseSourceFailed,
}
