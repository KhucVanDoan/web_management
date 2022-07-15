export const MMSX_SEARCH_ATTRIBUTE_MAINTENANCE_START =
  'MMSX_SEARCH_ATTRIBUTE_MAINTENANCE_START'
export const MMSX_SEARCH_ATTRIBUTE_MAINTENANCE_SUCCESS =
  'MMSX_SEARCH_ATTRIBUTE_MAINTENANCE_SUCCESS'
export const MMSX_SEARCH_ATTRIBUTE_MAINTENANCE_FAIL =
  'MMSX_SEARCH_ATTRIBUTE_MAINTENANCE_FAIL'
export const MMSX_GET_ATTRIBUTE_MAINTENANCE_START =
  'MMSX_GET_ATTRIBUTE_MAINTENANCE_START'
export const MMSX_GET_ATTRIBUTE_MAINTENANCE_SUCCESS =
  'MMSX_GET_ATTRIBUTE_MAINTENANCE_SUCCESS'
export const MMSX_GET_ATTRIBUTE_MAINTENANCE_FAIL =
  'MMSX_GET_ATTRIBUTE_MAINTENANCE_FAIL'
export const MMSX_UPDATE_ATTRIBUTE_MAINTENANCE_START =
  'MMSX_UPDATE_ATTRIBUTE_MAINTENANCE_START'
export const MMSX_UPDATE_ATTRIBUTE_MAINTENANCE_SUCCESS =
  'MMSX_UPDATE_ATTRIBUTE_MAINTENANCE_SUCCESS'
export const MMSX_UPDATE_ATTRIBUTE_MAINTENANCE_FAIL =
  'MMSX_UPDATE_ATTRIBUTE_MAINTENANCE_FAIL'
export const MMSX_CREATE_ATTRIBUTE_MAINTENANCE_START =
  'MMSX_CREATE_ATTRIBUTE_MAINTENANCE_START'
export const MMSX_CREATE_ATTRIBUTE_MAINTENANCE_SUCCESS =
  'MMSX_CREATE_ATTRIBUTE_MAINTENANCE_SUCCESS'
export const MMSX_CREATE_ATTRIBUTE_MAINTENANCE_FAIL =
  'MMSX_CREATE_ATTRIBUTE_MAINTENANCE_FAIL'

export const MMSX_DELETE_ATTRIBUTE_MAINTENANCE_START =
  'MMSX_DELETE_ATTRIBUTE_MAINTENANCE_START'
export const MMSX_DELETE_ATTRIBUTE_MAINTENANCE_SUCCESS =
  'MMSX_DELETE_ATTRIBUTE_MAINTENANCE_SUCCESS'
export const MMSX_DELETE_ATTRIBUTE_MAINTENANCE_FAIL =
  'MMSX_DELETE_ATTRIBUTE_MAINTENANCE_FAIL'
export const MMSX_RESET_ATTRIBUTE_MAINTENANCE_STATE =
  'MMSX_RESET_ATTRIBUTE_MAINTENANCE_STATE'
export function searchAttributeMaintenance(payload, onSuccess, onError) {
  return {
    type: MMSX_SEARCH_ATTRIBUTE_MAINTENANCE_START,
    payload: payload,
    onError,
    onSuccess,
  }
}
export function searchAttributeMaintenanceSuccess(payload) {
  return {
    type: MMSX_SEARCH_ATTRIBUTE_MAINTENANCE_SUCCESS,
    payload: payload,
  }
}

export function searchAttributeMaintenanceFail() {
  return {
    type: MMSX_SEARCH_ATTRIBUTE_MAINTENANCE_FAIL,
  }
}
export function createAttributeMaintenance(payload, onSuccess, onError) {
  return {
    type: MMSX_CREATE_ATTRIBUTE_MAINTENANCE_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function createAttributeMaintenanceSuccess(payload) {
  return {
    type: MMSX_CREATE_ATTRIBUTE_MAINTENANCE_SUCCESS,
    payload: payload,
  }
}

export function createAttributeMaintenanceFail() {
  return {
    type: MMSX_CREATE_ATTRIBUTE_MAINTENANCE_FAIL,
  }
}

export function getDetailAttributeMaintenance(payload, onSuccess, onError) {
  return {
    type: MMSX_GET_ATTRIBUTE_MAINTENANCE_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function getDetailAttributeMaintenanceSuccess(payload) {
  return {
    type: MMSX_GET_ATTRIBUTE_MAINTENANCE_SUCCESS,
    payload,
  }
}

export function getDetailAttributeMaintenanceFail() {
  return {
    type: MMSX_GET_ATTRIBUTE_MAINTENANCE_FAIL,
  }
}

export function updateAttributeMaintenance(payload, onSuccess, onError) {
  return {
    type: MMSX_UPDATE_ATTRIBUTE_MAINTENANCE_START,
    payload,
    onError,
    onSuccess,
  }
}

export function updateAttributeMaintenanceSuccess(payload) {
  return {
    type: MMSX_UPDATE_ATTRIBUTE_MAINTENANCE_SUCCESS,
    payload,
  }
}

export function updateAttributeMaintenanceFail() {
  return {
    type: MMSX_UPDATE_ATTRIBUTE_MAINTENANCE_FAIL,
  }
}

export function deleteAttributeMaintenance(payload, onSuccess, onError) {
  return {
    type: MMSX_DELETE_ATTRIBUTE_MAINTENANCE_START,
    payload,
    onError,
    onSuccess,
  }
}

export function deleteAttributeMaintenanceSuccess(payload) {
  return {
    type: MMSX_DELETE_ATTRIBUTE_MAINTENANCE_SUCCESS,
    payload,
  }
}

export function deleteAttributeMaintenanceFail() {
  return {
    type: MMSX_DELETE_ATTRIBUTE_MAINTENANCE_FAIL,
  }
}

export function resetState() {
  return {
    type: MMSX_RESET_ATTRIBUTE_MAINTENANCE_STATE,
  }
}

export default {
  searchAttributeMaintenance,
  searchAttributeMaintenanceFail,
  searchAttributeMaintenanceSuccess,
  createAttributeMaintenance,
  createAttributeMaintenanceFail,
  createAttributeMaintenanceSuccess,
  getDetailAttributeMaintenance,
  getDetailAttributeMaintenanceFail,
  getDetailAttributeMaintenanceSuccess,
  updateAttributeMaintenance,
  updateAttributeMaintenanceFail,
  updateAttributeMaintenanceSuccess,
  deleteAttributeMaintenance,
  deleteAttributeMaintenanceFail,
  deleteAttributeMaintenanceSuccess,
  resetState,
}
