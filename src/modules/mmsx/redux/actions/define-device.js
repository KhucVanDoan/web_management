export const MMSX_SEARCH_DEVICE_START = 'MMSX_SEARCH_DEVICE_START'
export const MMSX_SEARCH_DEVICE_SUCCESS = 'MMSX_SEARCH_DEVICE_SUCCESS'
export const MMSX_SEARCH_DEVICE_FAILED = 'MMSX_SEARCH_DEVICE_FAILED'

export const MMSX_DELETE_DEVICE_START = 'MMSX_DELETE_DEVICE_START'
export const MMSX_DELETE_DEVICE_SUCCESS = 'MMSX_DELETE_DEVICE_SUCCESS'
export const MMSX_DELETE_DEVICE_FAILED = 'MMSX_DELETE_DEVICE_FAILED'

export const MMSX_CONFIRM_DEVICE_START = 'MMSX_CONFIRM_DEVICE_START'
export const MMSX_CONFIRM_DEVICE_SUCCESS = 'MMSX_CONFIRM_DEVICE_SUCCESS'
export const MMSX_CONFIRM_DEVICE_FAILED = 'MMSX_CONFIRM_DEVICE_FAILED'

export const MMSX_CREATE_DEVICE_START = 'MMSX_CREATE_DEVICE_START'
export const MMSX_CREATE_DEVICE_SUCCESS = 'MMSX_CREATE_DEVICE_SUCCESS'
export const MMSX_CREATE_DEVICE_FAILED = 'MMSX_CREATE_DEVICE_FAILED'

export const MMSX_GET_DEVICE_DETAIL_START = 'MMSX_GET_DEVICE_DETAIL_START'
export const MMSX_GET_DEVICE_DETAIL_SUCCESS = 'MMSX_GET_DEVICE_DETAIL_SUCCESS'
export const MMSX_GET_DEVICE_DETAIL_FAILED = 'MMSX_GET_DEVICE_DETAIL_FAILED'

export const MMSX_UPDATE_DEVICE_START = 'MMSX_UPDATE_DEVICE_START'
export const MMSX_UPDATE_DEVICE_SUCCESS = 'MMSX_UPDATE_DEVICE_SUCCESS'
export const MMSX_UPDATE_DEVICE_FAILED = 'MMSX_UPDATE_DEVICE_FAILED'

export const MMSX_SET_SUPPLIES_AND_ACCESSORY_LIST =
  'MMSX_SET_SUPPLIES_AND_ACCESSORY_LIST'
export const MMSX_PASS_DEVICE_TO_STORE = 'MMSX_PASS_DEVICE_TO_STORE'

export const MMSX_RESET_DEVICE_STATE = 'MMSX_RESET_DEVICE_STATE'

/* Get list device */
export function searchDevice(payload, onSuccess, onError) {
  return {
    type: MMSX_SEARCH_DEVICE_START,
    payload,
    onSuccess,
    onError,
  }
}

export function searchDeviceSuccess(payload) {
  return {
    type: MMSX_SEARCH_DEVICE_SUCCESS,
    payload,
  }
}

export function searchDeviceFailed() {
  return {
    type: MMSX_SEARCH_DEVICE_FAILED,
  }
}

/* Delete device */
export function deleteDevice(payload, onSuccess, onError) {
  return {
    type: MMSX_DELETE_DEVICE_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function deleteDeviceSuccess(payload) {
  return {
    type: MMSX_DELETE_DEVICE_SUCCESS,
    payload: payload,
  }
}

export function deleteDeviceFailed(payload) {
  return {
    type: MMSX_DELETE_DEVICE_FAILED,
    payload,
  }
}

/* Confirm device */
export function confirmDevice(payload, onSuccess, onError) {
  return {
    type: MMSX_CONFIRM_DEVICE_START,
    payload,
    onSuccess,
    onError,
  }
}

export function confirmDeviceSuccess(payload) {
  return {
    type: MMSX_CONFIRM_DEVICE_SUCCESS,
    payload,
  }
}

export function confirmDeviceFailed() {
  return {
    type: MMSX_CONFIRM_DEVICE_FAILED,
  }
}

/* Create device */
export function createDevice(payload, onSuccess, onError) {
  return {
    type: MMSX_CREATE_DEVICE_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function createDeviceSuccess(payload) {
  return {
    type: MMSX_CREATE_DEVICE_SUCCESS,
    payload: payload,
  }
}

export function createDeviceFailed() {
  return {
    type: MMSX_CREATE_DEVICE_FAILED,
  }
}

/* Get detail device */
export function getDeviceDetailById(payload, onSuccess, onError) {
  return {
    type: MMSX_GET_DEVICE_DETAIL_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function getDeviceDetailByIdSuccess(payload) {
  return {
    type: MMSX_GET_DEVICE_DETAIL_SUCCESS,
    payload,
  }
}

export function getDeviceDetailByIdFailed() {
  return {
    type: MMSX_GET_DEVICE_DETAIL_FAILED,
  }
}

/* Update detail device */
export function updateDevice(payload, onSuccess, onError) {
  return {
    type: MMSX_UPDATE_DEVICE_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function updateDeviceSuccess(payload) {
  return {
    type: MMSX_UPDATE_DEVICE_SUCCESS,
    payload: payload,
  }
}

export function updateDeviceFailed() {
  return {
    type: MMSX_UPDATE_DEVICE_FAILED,
  }
}

//Pass data to store
export function setSuppliesAndAccessoryList(payload) {
  return {
    type: MMSX_SET_SUPPLIES_AND_ACCESSORY_LIST,
    payload: payload,
  }
}

//Pass data to store
export function passDeviceToStore(payload) {
  return {
    type: MMSX_PASS_DEVICE_TO_STORE,
    payload: payload,
  }
}

export function resetDeviceState() {
  return {
    type: MMSX_RESET_DEVICE_STATE,
  }
}

export default {
  searchDevice,
  searchDeviceSuccess,
  searchDeviceFailed,
  passDeviceToStore,
  resetDeviceState,
  setSuppliesAndAccessoryList,
  createDevice,
  createDeviceFailed,
  createDeviceSuccess,
  updateDevice,
  updateDeviceFailed,
  updateDeviceSuccess,
  deleteDevice,
  deleteDeviceFailed,
  deleteDeviceSuccess,
  getDeviceDetailById,
  getDeviceDetailByIdFailed,
  getDeviceDetailByIdSuccess,
  confirmDevice,
  confirmDeviceFailed,
  confirmDeviceSuccess,
}
