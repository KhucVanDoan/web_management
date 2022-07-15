export const SEARCH_REQUEST_DEVICE_START = 'MMSX_SEARCH_REQUEST_DEVICE_START'
export const SEARCH_REQUEST_DEVICE_SUCCESS =
  'MMSX_SEARCH_REQUEST_DEVICE_SUCCESS'
export const SEARCH_REQUEST_DEVICE_FAILED = 'MMSX_SEARCH_REQUEST_DEVICE_FAILED'

export const CHANGE_STATUS_REQUEST_DEVICE_START =
  'MMSX_CHANGE_STATUS_REQUEST_DEVICE_START'
export const CHANGE_STATUS_REQUEST_DEVICE_SUCCESS =
  'MMSX_CHANGE_STATUS_REQUEST_DEVICE_SUCCESS'
export const CHANGE_STATUS_REQUEST_DEVICE_FAILED =
  'MMSX_CHANGE_STATUS_REQUEST_DEVICE_FAILED'

export const CHANGE_STATUS_RETURN_DEVICE_START =
  'MMSX_CHANGE_STATUS_RETURN_DEVICE_START'
export const CHANGE_STATUS_RETURN_DEVICE_SUCCESS =
  'MMSX_CHANGE_STATUS_RETURN_DEVICE_SUCCESS'
export const CHANGE_STATUS_RETURN_DEVICE_FAILED =
  'MMSX_CHANGE_STATUS_RETURN_DEVICE_FAILED'

export const DELETE_REQUEST_DEVICE_START = 'MMSX_DELETE_REQUEST_DEVICE_START'
export const DELETE_REQUEST_DEVICE_SUCCESS =
  'MMSX_DELETE_REQUEST_DEVICE_SUCCESS'
export const DELETE_REQUEST_DEVICE_FAILED = 'MMSX_DELETE_REQUEST_DEVICE_FAILED'

export const DELETE_RETURN_DEVICE_START = 'MMSX_DELETE_RETURN_DEVICE_START'
export const DELETE_RETURN_DEVICE_SUCCESS = 'MMSX_DELETE_RETURN_DEVICE_SUCCESS'
export const DELETE_RETURN_DEVICE_FAILED = 'MMSX_DELETE_RETURN_DEVICE_FAILED'
//--------
export const CREATE_REQUEST_DEVICE_START = 'MMSX_CREATE_REQUEST_DEVICE_START'
export const CREATE_REQUEST_DEVICE_SUCCESS =
  'MMSX_CREATE_REQUEST_DEVICE_SUCCESS'
export const CREATE_REQUEST_DEVICE_FAILED = 'MMSX_CREATE_REQUEST_DEVICE_FAILED'

export const GET_REQUEST_DEVICE_DETAIL_START =
  'MMSX_GET_REQUEST_DEVICE_DETAIL_START'
export const GET_REQUEST_DEVICE_DETAIL_SUCCESS =
  'MMSX_GET_REQUEST_DEVICE_DETAIL_SUCCESS'
export const GET_REQUEST_DEVICE_DETAIL_FAILED =
  'MMSX_GET_REQUEST_DEVICE_DETAIL_FAILED'

export const UPDATE_REQUEST_DEVICE_DETAIL_START =
  'MMSX_UPDATE_REQUEST_DEVICE_DETAIL_START'
export const UPDATE_REQUEST_DEVICE_DETAIL_SUCCESS =
  'MMSX_UPDATE_REQUEST_DEVICE_DETAIL_SUCCESS'
export const UPDATE_REQUEST_DEVICE_DETAIL_FAILED =
  'MMSX_UPDATE_REQUEST_DEVICE_DETAIL_FAILED'
//--------
export const CREATE_RETURN_DEVICE_START = 'MMSX_CREATE_RETURN_DEVICE_START'
export const CREATE_RETURN_DEVICE_SUCCESS = 'MMSX_CREATE_RETURN_DEVICE_SUCCESS'
export const CREATE_RETURN_DEVICE_FAILED = 'MMSX_CREATE_RETURN_DEVICE_FAILED'

export const GET_RETURN_DEVICE_DETAIL_START =
  'MMSX_GET_RETURN_DEVICE_DETAIL_START'
export const GET_RETURN_DEVICE_DETAIL_SUCCESS =
  'MMSX_GET_RETURN_DEVICE_DETAIL_SUCCESS'
export const GET_RETURN_DEVICE_DETAIL_FAILED =
  'MMSX_GET_RETURN_DEVICE_DETAIL_FAILED'

export const UPDATE_RETURN_DEVICE_DETAIL_START =
  'MMSX_UPDATE_RETURN_DEVICE_DETAIL_START'
export const UPDATE_RETURN_DEVICE_DETAIL_SUCCESS =
  'MMSX_UPDATE_RETURN_DEVICE_DETAIL_SUCCESS'
export const UPDATE_RETURN_DEVICE_DETAIL_FAILED =
  'MMSX_UPDATE_RETURN_DEVICE_DETAIL_FAILED'

export const RESET_STATE_REQUEST_DEVICE_DETAIL =
  'MMSX_RESET_STATE_REQUEST_DEVICE_DETAIL'

export const RESET_STATE_RETURN_DEVICE_DETAIL =
  'MMSX_RESET_STATE_RETURN_DEVICE_DETAIL'
//-------------------------------------------------------------------------------
/** search */
export function searchRequestDevice(payload, onSuccess, onError) {
  return {
    type: SEARCH_REQUEST_DEVICE_START,
    payload,
    onSuccess,
    onError,
  }
}

export function searchRequestDeviceSuccess(payload) {
  return {
    type: SEARCH_REQUEST_DEVICE_SUCCESS,
    payload,
  }
}

export function searchRequestDeviceFailed() {
  return {
    type: SEARCH_REQUEST_DEVICE_FAILED,
  }
}
//1
export function changeStatusRequestDevice(payload, onSuccess, onError) {
  return {
    type: CHANGE_STATUS_REQUEST_DEVICE_START,
    payload,
    onSuccess,
    onError,
  }
}

export function changeStatusRequestDeviceSuccess(payload) {
  return {
    type: CHANGE_STATUS_REQUEST_DEVICE_SUCCESS,
    payload,
  }
}

export function changeStatusRequestDeviceFailed() {
  return {
    type: CHANGE_STATUS_REQUEST_DEVICE_FAILED,
  }
}
//-----
//3
export function changeStatusReturnDevice(payload, onSuccess, onError) {
  return {
    type: CHANGE_STATUS_RETURN_DEVICE_START,
    payload,
    onSuccess,
    onError,
  }
}

export function changeStatusReturnDeviceSuccess(payload) {
  return {
    type: CHANGE_STATUS_RETURN_DEVICE_SUCCESS,
    payload,
  }
}

export function changeStatusReturnDeviceFailed() {
  return {
    type: CHANGE_STATUS_RETURN_DEVICE_FAILED,
  }
}

//5- Delete
export function deleteRequestDevice(payload, onSuccess, onError) {
  return {
    type: DELETE_REQUEST_DEVICE_START,
    payload,
    onSuccess,
    onError,
  }
}

export function deleteRequestDeviceSuccess(payload) {
  return {
    type: DELETE_REQUEST_DEVICE_SUCCESS,
    payload,
  }
}

export function deleteRequestDeviceFailed() {
  return {
    type: DELETE_REQUEST_DEVICE_FAILED,
  }
}

//6- Delete
export function deleteReturnDevice(payload, onSuccess, onError) {
  return {
    type: DELETE_RETURN_DEVICE_START,
    payload,
    onSuccess,
    onError,
  }
}

export function deleteReturnDeviceSuccess(payload) {
  return {
    type: DELETE_RETURN_DEVICE_SUCCESS,
    payload,
  }
}

export function deleteReturnDeviceFailed() {
  return {
    type: DELETE_RETURN_DEVICE_FAILED,
  }
}
//--------------------------------------------------------------------------------
/**Create REQUEST */
export function createRequestDevice(payload, onSuccess, onError) {
  return {
    type: CREATE_REQUEST_DEVICE_START,
    payload,
    onSuccess,
    onError,
  }
}

export function createRequestDeviceSuccess(payload) {
  return {
    type: CREATE_REQUEST_DEVICE_SUCCESS,
    payload,
  }
}

export function createRequestDeviceFailed() {
  return {
    type: CREATE_REQUEST_DEVICE_FAILED,
  }
}
/**Get DETAIL REQUEST */
export function getRequestDeviceDetail(payload, onSuccess, onError) {
  return {
    type: GET_REQUEST_DEVICE_DETAIL_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getRequestDeviceDetailSuccess(payload) {
  return {
    type: GET_REQUEST_DEVICE_DETAIL_SUCCESS,
    payload,
  }
}

export function getRequestDeviceDetailFailed() {
  return {
    type: GET_REQUEST_DEVICE_DETAIL_FAILED,
  }
}

/**update DETAIL REQUEST */
export function updateRequestDeviceDetail(payload, onSuccess, onError) {
  return {
    type: UPDATE_REQUEST_DEVICE_DETAIL_START,
    payload,
    onSuccess,
    onError,
  }
}

export function updateRequestDeviceDetailSuccess(payload) {
  return {
    type: UPDATE_REQUEST_DEVICE_DETAIL_SUCCESS,
    payload,
  }
}

export function updateRequestDeviceDetailFailed() {
  return {
    type: UPDATE_REQUEST_DEVICE_DETAIL_FAILED,
  }
}

//--------------------------------------------------------------------------------------
/**Create RETURN */
export function createReturnDevice(payload, onSuccess, onError) {
  return {
    type: CREATE_RETURN_DEVICE_START,
    payload,
    onSuccess,
    onError,
  }
}

export function createReturnDeviceSuccess(payload) {
  return {
    type: CREATE_RETURN_DEVICE_SUCCESS,
    payload,
  }
}

export function createReturnDeviceFailed() {
  return {
    type: CREATE_RETURN_DEVICE_FAILED,
  }
}

/**Get DETAIL RETURN*/
export function getReturnDeviceDetail(payload, onSuccess, onError) {
  return {
    type: GET_RETURN_DEVICE_DETAIL_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getReturnDeviceDetailSuccess(payload) {
  return {
    type: GET_RETURN_DEVICE_DETAIL_SUCCESS,
    payload,
  }
}

export function getReturnDeviceDetailFailed() {
  return {
    type: GET_RETURN_DEVICE_DETAIL_FAILED,
  }
}

/**update DETAIL RETURN */
export function updateReturnDeviceDetail(payload, onSuccess, onError) {
  return {
    type: UPDATE_RETURN_DEVICE_DETAIL_START,
    payload,
    onSuccess,
    onError,
  }
}

export function updateReturnDeviceDetailSuccess(payload) {
  return {
    type: UPDATE_RETURN_DEVICE_DETAIL_SUCCESS,
    payload,
  }
}

export function updateReturnDeviceDetailFailed() {
  return {
    type: UPDATE_RETURN_DEVICE_DETAIL_FAILED,
  }
}

export function resetStateRequestDevice() {
  return {
    type: RESET_STATE_REQUEST_DEVICE_DETAIL,
  }
}

export function resetStateReturnRequestDevice() {
  return {
    type: RESET_STATE_RETURN_DEVICE_DETAIL,
  }
}

export default {
  searchRequestDevice,
  searchRequestDeviceFailed,
  searchRequestDeviceSuccess,
  changeStatusRequestDevice,
  changeStatusRequestDeviceFailed,
  changeStatusRequestDeviceSuccess,
  changeStatusReturnDevice,
  changeStatusReturnDeviceFailed,
  changeStatusReturnDeviceSuccess,
  createRequestDevice,
  createRequestDeviceFailed,
  createRequestDeviceSuccess,
  getRequestDeviceDetail,
  getRequestDeviceDetailFailed,
  getRequestDeviceDetailSuccess,
  updateRequestDeviceDetail,
  updateRequestDeviceDetailFailed,
  updateRequestDeviceDetailSuccess,
  deleteRequestDevice,
  deleteRequestDeviceFailed,
  deleteRequestDeviceSuccess,
  createReturnDevice,
  createReturnDeviceFailed,
  createReturnDeviceSuccess,
  updateReturnDeviceDetail,
  updateReturnDeviceDetailFailed,
  updateReturnDeviceDetailSuccess,
  deleteReturnDevice,
  deleteReturnDeviceFailed,
  deleteReturnDeviceSuccess,
  getReturnDeviceDetail,
  getReturnDeviceDetailFailed,
  getReturnDeviceDetailSuccess,
  resetStateRequestDevice,
  resetStateReturnRequestDevice,
}
