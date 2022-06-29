export const CREATE_DEVICE_CATEGORY_START = 'MMSX_CREATE_DEVICE_CATEGORY_START'
export const CREATE_DEVICE_CATEGORY_SUCCESS =
  'MMSX_CREATE_DEVICE_CATEGORY_SUCCESS'
export const CREATE_DEVICE_CATEGORY_FAIL = 'MMSX_CREATE_DEVICE_CATEGORY_FAIL'

export const SEARCH_DEVICE_CATEGORY_START = 'MMSX_SEARCH_DEVICE_CATEGORY_START'
export const SEARCH_DEVICE_CATEGORY_SUCCESS =
  'MMSX_SEARCH_DEVICE_CATEGORY_SUCCESS'
export const SEARCH_DEVICE_CATEGORY_FAIL = 'MMSX_SEARCH_DEVICE_CATEGORY_FAIL'

export const GET_DEVICE_CATEGORY_START = 'MMSX_GET_DEVICE_CATEGORY_START'
export const GET_DEVICE_CATEGORY_SUCCESS = 'MMSX_GET_DEVICE_CATEGORY_SUCCESS'
export const GET_DEVICE_CATEGORY_FAIL = 'MMSX_GET_DEVICE_CATEGORY_FAIL'

export const DELETE_DEVICE_CATEGORY_START = 'MMSX_DELETE_DEVICE_CATEGORY_START'
export const DELETE_DEVICE_CATEGORY_SUCCESS =
  'MMSX_DELETE_DEVICE_CATEGORY_SUCCESS'
export const DELETE_DEVICE_CATEGORY_FAIL = 'MMSX_DELETE_DEVICE_CATEGORY_FAIL'

export const UPDATE_DEVICE_CATEGORY_START = 'MMSX_UPDATE_DEVICE_CATEGORY_START'
export const UPDATE_DEVICE_CATEGORY_SUCCESS =
  'MMSX_UPDATE_DEVICE_CATEGORY_SUCCESS'
export const UPDATE_DEVICE_CATEGORY_FAIL = 'MMSX_UPDATE_DEVICE_CATEGORY_FAIL'

export const CONFIRM_DEVICE_CATEGORY_START =
  'MMSX_CONFIRM_DEVICE_CATEGORY_START'
export const CONFIRM_DEVICE_CATEGORY_SUCCESS =
  'MMSX_CONFIRM_DEVICE_CATEGORY_SUCCESS'
export const CONFIRM_DEVICE_CATEGORY_FAIL = 'MMSX_CONFIRM_DEVICE_CATEGORY_FAIL'

export const GET_ALL_CONFRIM_DEVICE_CATEGORY_START =
  'MMSX_GET_ALL_CONFRIM_DEVICE_CATEGORY_START'
export const GET_ALL_CONFRIM_DEVICE_CATEGORY_SUCCESS =
  'MMSX_GET_ALL_CONFRIM_DEVICE_CATEGORY_SUCCESS'
export const GET_ALL_CONFRIM_DEVICE_CATEGORY_FAILED =
  'MMSX_GET_ALL_CONFRIM_DEVICE_CATEGORY_FAILED'
export const RESET_DEVICE_CATEGORY = 'MMSXX_RESET_DEVICE_CATEGORY'
export function createDeviceCategory(payload, onSuccess, onError) {
  return {
    type: CREATE_DEVICE_CATEGORY_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function createDeviceCategorySuccess(payload) {
  return {
    type: CREATE_DEVICE_CATEGORY_SUCCESS,
    payload: payload,
  }
}

export function createDeviceCategoryFail() {
  return {
    type: CREATE_DEVICE_CATEGORY_FAIL,
  }
}

export function searchDeviceCategory(payload, onSuccess, onError) {
  return {
    type: SEARCH_DEVICE_CATEGORY_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function searchDeviceCategorySuccess(payload) {
  return {
    type: SEARCH_DEVICE_CATEGORY_SUCCESS,
    payload: payload,
  }
}

export function searchDeviceCategoryFail() {
  return {
    type: SEARCH_DEVICE_CATEGORY_FAIL,
  }
}

export function getDeviceCategoryDetail(payload, onSuccess, onError) {
  return {
    type: GET_DEVICE_CATEGORY_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function getDeviceCategoryDetailSuccess(payload) {
  return {
    type: GET_DEVICE_CATEGORY_SUCCESS,
    payload,
  }
}

export function getDeviceCategoryDetailFail() {
  return {
    type: GET_DEVICE_CATEGORY_FAIL,
  }
}

export function updateDetailDeviceCategory(payload, onSuccess, onError) {
  return {
    type: UPDATE_DEVICE_CATEGORY_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function updateDetailDeviceCategorySuccess(payload) {
  return {
    type: UPDATE_DEVICE_CATEGORY_SUCCESS,
    payload: payload,
  }
}

export function updateDetailDeviceCategoryfail() {
  return {
    type: UPDATE_DEVICE_CATEGORY_FAIL,
  }
}

export function deleteDeviceCategory(payload, onSuccess, onError) {
  return {
    type: DELETE_DEVICE_CATEGORY_START,
    payload,
    onSuccess,
    onError,
  }
}

export function deleteDeviceCategorySuccess(payload) {
  return {
    type: DELETE_DEVICE_CATEGORY_SUCCESS,
    payload,
  }
}

export function deleteDeviceCategoryFail() {
  return {
    type: DELETE_DEVICE_CATEGORY_FAIL,
  }
}

export function confirmDeviceCategory(payload, onSuccess, onError) {
  return {
    type: CONFIRM_DEVICE_CATEGORY_START,
    payload,
    onSuccess,
    onError,
  }
}

export function confirmDeviceCategorySuccess(payload) {
  return {
    type: CONFIRM_DEVICE_CATEGORY_SUCCESS,
    payload,
  }
}

export function confirmDeviceCategoryFail() {
  return {
    type: CONFIRM_DEVICE_CATEGORY_FAIL,
  }
}

export function getAllConfirmDeviceCategory(payload, onSuccess, onError) {
  return {
    type: GET_ALL_CONFRIM_DEVICE_CATEGORY_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getAllConfirmDeviceCategorySuccess(payload) {
  return {
    type: GET_ALL_CONFRIM_DEVICE_CATEGORY_SUCCESS,
    payload,
  }
}

export function getAllConfirmDeviceCategoryFailed() {
  return {
    type: GET_ALL_CONFRIM_DEVICE_CATEGORY_FAILED,
  }
}
export function resetDeviceCategory() {
  return {
    type: RESET_DEVICE_CATEGORY,
  }
}
export default {
  createDeviceCategory,
  createDeviceCategorySuccess,
  createDeviceCategoryFail,
  searchDeviceCategory,
  searchDeviceCategorySuccess,
  searchDeviceCategoryFail,
  updateDetailDeviceCategory,
  updateDetailDeviceCategorySuccess,
  updateDetailDeviceCategoryfail,
  deleteDeviceCategory,
  deleteDeviceCategorySuccess,
  deleteDeviceCategoryFail,
  getDeviceCategoryDetail,
  getDeviceCategoryDetailSuccess,
  getDeviceCategoryDetailFail,
  confirmDeviceCategory,
  confirmDeviceCategorySuccess,
  confirmDeviceCategoryFail,
  getAllConfirmDeviceCategory,
  getAllConfirmDeviceCategorySuccess,
  getAllConfirmDeviceCategoryFailed,
  resetDeviceCategory,
}
