export const SEARCH_WAREHOUSE_GROUP_START = 'WMSX_SEARCH_WAREHOUSE_GROUP_START'
export const SEARCH_WAREHOUSE_GROUP_SUCCESS =
  'WMSX_SEARCH_WAREHOUSE_GROUP_SUCCESS'
export const SEARCH_WAREHOUSE_GROUP_FAILED =
  'WMSX_SEARCH_WAREHOUSE_GROUP_FAILED'

export const CREATE_WAREHOUSE_GROUP_START = 'WMSX_CREATE_WAREHOUSE_GROUP_START'
export const CREATE_WAREHOUSE_GROUP_SUCCESS =
  'WMSX_CREATE_WAREHOUSE_GROUP_SUCCESS'
export const CREATE_WAREHOUSE_GROUP_FAILED =
  'WMSX_CREATE_WAREHOUSE_GROUP_FAILED'

export const UPDATE_WAREHOUSE_GROUP_START = 'WMSX_UPDATE_WAREHOUSE_GROUP_START'
export const UPDATE_WAREHOUSE_GROUP_SUCCESS =
  'WMSX_UPDATE_WAREHOUSE_GROUP_SUCCESS'
export const UPDATE_WAREHOUSE_GROUP_FAILED =
  'WMSX_UPDATE_WAREHOUSE_GROUP_FAILED'

export const DELETE_WAREHOUSE_GROUP_START = 'WMSX_DELETE_WAREHOUSE_GROUP_START'
export const DELETE_WAREHOUSE_GROUP_SUCCESS =
  'WMSX_DELETE_WAREHOUSE_GROUP_SUCCESS'
export const DELETE_WAREHOUSE_GROUP_FAILED =
  'WMSX_DELETE_WAREHOUSE_GROUP_FAILED'

export const GET_WAREHOUSE_GROUP_DETAILS_START =
  'WMSX_GET_WAREHOUSE_GROUP_DETAILS_START'
export const GET_WAREHOUSE_GROUP_DETAILS_SUCCESS =
  'WMSX_GET_WAREHOUSE_GROUP_DETAILS_SUCCESS'
export const GET_WAREHOUSE_GROUP_DETAILS_FAILED =
  'WMSX_GET_WAREHOUSE_GROUP_DETAILS_FAILED'

export const CONFIRM_WAREHOUSE_GROUP_START =
  'WMSX_CONFIRM_WAREHOUSE_GROUP_START'
export const CONFIRM_WAREHOUSE_GROUP_SUCCESS =
  'WMSX_CONFIRM_WAREHOUSE_GROUP_SUCCESS'
export const CONFIRM_WAREHOUSE_GROUP_FAILED =
  'WMSX_CONFIRM_WAREHOUSE_GROUP_FAILED'

export const REJECT_WAREHOUSE_GROUP_START = 'WMSX_REJECT_WAREHOUSE_GROUP_START'
export const REJECT_WAREHOUSE_GROUP_SUCCESS =
  'WMSX_REJECT_WAREHOUSE_GROUP_SUCCESS'
export const REJECT_WAREHOUSE_GROUP_FAILED =
  'WMSX_REJECT_WAREHOUSE_GROUP_FAILED'

export const RESET_WAREHOUSE_GROUP_DETAILS_STATE =
  'WMSX_RESET_WAREHOUSE_GROUP_DETAILS_STATE'

export function searchWarehouseGroup(payload, onSuccess, onError) {
  return {
    type: SEARCH_WAREHOUSE_GROUP_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function searchWarehouseGroupSuccess(payload) {
  return {
    type: SEARCH_WAREHOUSE_GROUP_SUCCESS,
    payload: payload,
  }
}

export function searchWarehouseGroupFailed() {
  return {
    type: SEARCH_WAREHOUSE_GROUP_FAILED,
  }
}

export function createWarehouseGroup(payload, onSuccess, onError) {
  return {
    type: CREATE_WAREHOUSE_GROUP_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function createWarehouseGroupSuccess(payload) {
  return {
    type: CREATE_WAREHOUSE_GROUP_SUCCESS,
    payload: payload,
  }
}

export function createWarehouseGroupFailed() {
  return {
    type: CREATE_WAREHOUSE_GROUP_FAILED,
  }
}

export function updateWarehouseGroup(payload, onSuccess, onError) {
  return {
    type: UPDATE_WAREHOUSE_GROUP_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function updateWarehouseGroupSuccess(payload) {
  return {
    type: UPDATE_WAREHOUSE_GROUP_SUCCESS,
    payload: payload,
  }
}

export function updateWarehouseGroupFailed() {
  return {
    type: UPDATE_WAREHOUSE_GROUP_FAILED,
  }
}

export function deleteWarehouseGroup(packageId, onSuccess, onError) {
  return {
    type: DELETE_WAREHOUSE_GROUP_START,
    payload: packageId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function deleteWarehouseGroupSuccess(payload) {
  return {
    type: DELETE_WAREHOUSE_GROUP_SUCCESS,
    payload: payload,
  }
}

export function deleteWarehouseGroupFailed() {
  return {
    type: DELETE_WAREHOUSE_GROUP_FAILED,
  }
}

export function getWarehouseGroupDetailsById(packageId, onSuccess, onError) {
  return {
    type: GET_WAREHOUSE_GROUP_DETAILS_START,
    payload: packageId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getWarehouseGroupDetailsByIdSuccess(payload) {
  return {
    type: GET_WAREHOUSE_GROUP_DETAILS_SUCCESS,
    payload: payload,
  }
}

export function getWarehouseGroupDetailsByIdFailed() {
  return {
    type: GET_WAREHOUSE_GROUP_DETAILS_FAILED,
  }
}

export function confirmWarehouseGroupById(Id, onSuccess, onError) {
  return {
    type: CONFIRM_WAREHOUSE_GROUP_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function confirmWarehouseGroupByIdSuccess(payload) {
  return {
    type: CONFIRM_WAREHOUSE_GROUP_SUCCESS,
    payload: payload,
  }
}

export function confirmWarehouseGroupByIdFailed() {
  return {
    type: CONFIRM_WAREHOUSE_GROUP_FAILED,
  }
}

export function rejectWarehouseGroupById(Id, onSuccess, onError) {
  return {
    type: REJECT_WAREHOUSE_GROUP_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function rejectWarehouseGroupByIdSuccess(payload) {
  return {
    type: REJECT_WAREHOUSE_GROUP_SUCCESS,
    payload: payload,
  }
}

export function rejectWarehouseGroupByIdFailed() {
  return {
    type: REJECT_WAREHOUSE_GROUP_FAILED,
  }
}

export function resetWarehouseGroupDetailsState() {
  return {
    type: RESET_WAREHOUSE_GROUP_DETAILS_STATE,
  }
}

export default {
  searchWarehouseGroup,
  searchWarehouseGroupSuccess,
  searchWarehouseGroupFailed,
  createWarehouseGroup,
  createWarehouseGroupSuccess,
  createWarehouseGroupFailed,
  updateWarehouseGroup,
  updateWarehouseGroupSuccess,
  updateWarehouseGroupFailed,
  deleteWarehouseGroup,
  deleteWarehouseGroupSuccess,
  deleteWarehouseGroupFailed,
  getWarehouseGroupDetailsById,
  getWarehouseGroupDetailsByIdSuccess,
  getWarehouseGroupDetailsByIdFailed,
  confirmWarehouseGroupById,
  confirmWarehouseGroupByIdSuccess,
  confirmWarehouseGroupByIdFailed,
  rejectWarehouseGroupById,
  rejectWarehouseGroupByIdFailed,
  rejectWarehouseGroupByIdSuccess,
  resetWarehouseGroupDetailsState,
}
