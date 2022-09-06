export const SEARCH_WAREHOUSE_START = 'WMSX_SEARCH_WAREHOUSE_START'
export const SEARCH_WAREHOUSE_SUCCESS = 'WMSX_SEARCH_WAREHOUSE_SUCCESS'
export const SEARCH_WAREHOUSE_FAILED = 'WMSX_SEARCH_WAREHOUSE_FAILED'

export const CREATE_WAREHOUSE_START = 'WMSX_CREATE_WAREHOUSE_START'
export const CREATE_WAREHOUSE_SUCCESS = 'WMSX_CREATE_WAREHOUSE_SUCCESS'
export const CREATE_WAREHOUSE_FAILED = 'WMSX_CREATE_WAREHOUSE_FAILED'

export const UPDATE_WAREHOUSE_START = 'WMSX_UPDATE_WAREHOUSE_START'
export const UPDATE_WAREHOUSE_SUCCESS = 'WMSX_UPDATE_WAREHOUSE_SUCCESS'
export const UPDATE_WAREHOUSE_FAILED = 'WMSX_UPDATE_WAREHOUSE_FAILED'

export const DELETE_WAREHOUSE_START = 'WMSX_DELETE_WAREHOUSE_START'
export const DELETE_WAREHOUSE_SUCCESS = 'WMSX_DELETE_WAREHOUSE_SUCCESS'
export const DELETE_WAREHOUSE_FAILED = 'WMSX_DELETE_WAREHOUSE_FAILED'

export const GET_WAREHOUSE_DETAILS_START = 'WMSX_GET_WAREHOUSE_DETAILS_START'
export const GET_WAREHOUSE_DETAILS_SUCCESS =
  'WMSX_GET_WAREHOUSE_DETAILS_SUCCESS'
export const GET_WAREHOUSE_DETAILS_FAILED = 'WMSX_GET_WAREHOUSE_DETAILS_FAILED'

export const CONFIRM_WAREHOUSE_START = 'WMSX_CONFIRM_WAREHOUSE_START'
export const CONFIRM_WAREHOUSE_SUCCESS = 'WMSX_CONFIRM_WAREHOUSE_SUCCESS'
export const CONFIRM_WAREHOUSE_FAILED = 'WMSX_CONFIRM_WAREHOUSE_FAILED'

export const REJECT_WAREHOUSE_START = 'WMSX_REJECT_WAREHOUSE_START'
export const REJECT_WAREHOUSE_SUCCESS = 'WMSX_REJECT_WAREHOUSE_SUCCESS'
export const REJECT_WAREHOUSE_FAILED = 'WMSX_REJECT_WAREHOUSE_FAILED'

export const RESET_WAREHOUSE_DETAILS_STATE =
  'WMSX_RESET_WAREHOUSE_DETAILS_STATE'

export function searchWarehouse(payload, onSuccess, onError) {
  return {
    type: SEARCH_WAREHOUSE_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function searchWarehouseSuccess(payload) {
  return {
    type: SEARCH_WAREHOUSE_SUCCESS,
    payload: payload,
  }
}

export function searchWarehouseFailed() {
  return {
    type: SEARCH_WAREHOUSE_FAILED,
  }
}

export function createWarehouse(payload, onSuccess, onError) {
  return {
    type: CREATE_WAREHOUSE_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function createWarehouseSuccess(payload) {
  return {
    type: CREATE_WAREHOUSE_SUCCESS,
    payload: payload,
  }
}

export function createWarehouseFailed() {
  return {
    type: CREATE_WAREHOUSE_FAILED,
  }
}

export function updateWarehouse(payload, onSuccess, onError) {
  return {
    type: UPDATE_WAREHOUSE_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function updateWarehouseSuccess(payload) {
  return {
    type: UPDATE_WAREHOUSE_SUCCESS,
    payload: payload,
  }
}

export function updateWarehouseFailed() {
  return {
    type: UPDATE_WAREHOUSE_FAILED,
  }
}

export function deleteWarehouse(packageId, onSuccess, onError) {
  return {
    type: DELETE_WAREHOUSE_START,
    payload: packageId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function deleteWarehouseSuccess(payload) {
  return {
    type: DELETE_WAREHOUSE_SUCCESS,
    payload: payload,
  }
}

export function deleteWarehouseFailed() {
  return {
    type: DELETE_WAREHOUSE_FAILED,
  }
}

export function getWarehouseDetailsById(packageId, onSuccess, onError) {
  return {
    type: GET_WAREHOUSE_DETAILS_START,
    payload: packageId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getWarehouseDetailsByIdSuccess(payload) {
  return {
    type: GET_WAREHOUSE_DETAILS_SUCCESS,
    payload: payload,
  }
}

export function getWarehouseDetailsByIdFailed() {
  return {
    type: GET_WAREHOUSE_DETAILS_FAILED,
  }
}

export function confirmWarehouseById(Id, onSuccess, onError) {
  return {
    type: CONFIRM_WAREHOUSE_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function confirmWarehouseByIdSuccess(payload) {
  return {
    type: CONFIRM_WAREHOUSE_SUCCESS,
    payload: payload,
  }
}

export function confirmWarehouseByIdFailed() {
  return {
    type: CONFIRM_WAREHOUSE_FAILED,
  }
}

export function rejectWarehouseById(Id, onSuccess, onError) {
  return {
    type: REJECT_WAREHOUSE_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function rejectWarehouseByIdSuccess(payload) {
  return {
    type: REJECT_WAREHOUSE_SUCCESS,
    payload: payload,
  }
}

export function rejectWarehouseByIdFailed() {
  return {
    type: REJECT_WAREHOUSE_FAILED,
  }
}

export function resetWarehouseDetailsState() {
  return {
    type: RESET_WAREHOUSE_DETAILS_STATE,
  }
}

export default {
  searchWarehouse,
  searchWarehouseSuccess,
  searchWarehouseFailed,
  createWarehouse,
  createWarehouseSuccess,
  createWarehouseFailed,
  updateWarehouse,
  updateWarehouseSuccess,
  updateWarehouseFailed,
  deleteWarehouse,
  deleteWarehouseSuccess,
  deleteWarehouseFailed,
  getWarehouseDetailsById,
  getWarehouseDetailsByIdSuccess,
  getWarehouseDetailsByIdFailed,
  confirmWarehouseById,
  confirmWarehouseByIdSuccess,
  confirmWarehouseByIdFailed,
  rejectWarehouseById,
  rejectWarehouseByIdFailed,
  rejectWarehouseByIdSuccess,
  resetWarehouseDetailsState,
}
