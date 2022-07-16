export const MMSX_CREATE_DEVICE_ASSIGN_START = 'MMSX_CREATE_DEVICE_ASSIGN_START'
export const MMSX_CREATE_DEVICE_ASSIGN_SUCCESS =
  'MMSX_CREATE_DEVICE_ASSIGN_SUCCESS'
export const MMSX_CREATE_DEVICE_ASSIGN_FAIL = 'MMSX_CREATE_DEVICE_ASSIGN_FAIL'

export const MMSX_SEARCH_DEVICE_ASSIGN_START = 'MMSX_SEARCH_DEVICE_ASSIGN_START'
export const MMSX_SEARCH_DEVICE_ASSIGN_SUCCESS =
  'MMSX_SEARCH_DEVICE_ASSIGN_SUCCESS'
export const MMSX_SEARCH_DEVICE_ASSIGN_FAIL = 'MMSX_SEARCH_DEVICE_ASSIGN_FAIL'

export const MMSX_UPDATE_DEVICE_ASSIGN_SUCCESS =
  'MMSX_UPDATE_DEVICE_ASSIGN_SUCCESS'
export const MMSX_UPDATE_DEVICE_ASSIGN_START = 'MMSX_UPDATE_DEVICE_ASSIGN_START'
export const MMSX_UPDATE_DEVICE_ASSIGN_FAIL = 'MMSX_UPDATE_DEVICE_ASSIGN_FAIL'

export const MMSX_DELETE_DEVICE_ASSIGN_START = 'MMSX_DELETE_DEVICE_ASSIGN_START'
export const MMSX_DELETE_DEVICE_ASSIGN_SUCCESS =
  'MMSX_DELETE_DEVICE_ASSIGN_SUCCESS'
export const MMSX_DELETE_DEVICE_ASSIGN_FAIL = 'MMSX_DELETE_DEVICE_ASSIGN_FAIL'

export const MMSX_DETAIL_DEVICE_ASSIGN_START = 'MMSX_DETAIL_DEVICE_ASSIGN_START'
export const MMSX_DETAIL_DEVICE_ASSIGN_SUCCESS =
  'MMSX_DETAIL_DEVICE_ASSIGN_SUCCESS'
export const MMSX_DETAIL_DEVICE_ASSIGN_FAIL = 'MMSX_DETAIL_DEVICE_ASSIGN_FAIL'

export const MMSX_GET_DEVICE_ASSIGN_MAINTAIN_REQUEST_START =
  'MMSX_GET_DEVICE_ASSIGN_MAINTAIN_REQUEST_START'
export const MMSX_GET_DEVICE_ASSIGN_MAINTAIN_REQUEST_SUCCESS =
  'MMSX_GET_DEVICE_ASSIGN_MAINTAIN_REQUEST_SUCCESS'
export const MMSX_GET_DEVICE_ASSIGN_MAINTAIN_REQUEST_FAIL =
  'MMSX_GET_DEVICE_ASSIGN_MAINTAIN_REQUEST_FAIL'

export const MMSX_GET_DEVICE_ASSIGN_MAINTAIN_INFO_START =
  'MMSX_GET_DEVICE_ASSIGN_MAINTAIN_INFO_START'
export const MMSX_GET_DEVICE_ASSIGN_MAINTAIN_INFO_SUCCESS =
  'MMSX_GET_DEVICE_ASSIGN_MAINTAIN_INFO_SUCCESS'
export const MMSX_GET_DEVICE_ASSIGN_MAINTAIN_INFO_FAIL =
  'MMSX_GET_DEVICE_ASSIGN_MAINTAIN_INFO_FAIL'

export const MMSX_GET_DEVICE_REQUESTS_START = 'MMSX_GET_DEVICE_REQUESTS_START'
export const MMSX_GET_DEVICE_REQUESTS_SUCCESS =
  'MMSX_GET_DEVICE_REQUESTS_SUCCESS'
export const MMSX_GET_DEVICE_REQUESTS_FAIL = 'MMSX_GET_DEVICE_REQUESTS_FAIL'

export const MMSX_GET_GENERATED_SERIAL = 'MMSX_GET_GENERATED_SERIAL'
export const MMSX_GET_GENERATED_SERIAL_SUCCESS =
  'MMSX_GET_GENERATED_SERIAL_SUCCESS'
export const MMSX_GET_GENERATED_SERIAL_FAIL = 'MMSX_GET_GENERATED_SERIAL_FAIL'

export const MMSX_CHECK_SERIAL = 'MMSX_CHECK_SERIAL'
export const MMSX_CHECK_SERIAL_SUCCESS = 'MMSX_CHECK_SERIAL_SUCCESS'
export const MMSX_CHECK_SERIAL_FAIL = 'MMSX_CHECK_SERIAL_FAIL'

export const MMSX_GET_LOG_TIME_BY_MO = 'MMSX_GET_LOG_TIME_BY_MO'

export const MMSX_GET_LOG_TIME_BY_MO_SUCCESS = 'MMSX_GET_LOG_TIME_BY_MO_SUCCESS'
export const MMSX_GET_LOG_TIME_BY_MO_FAIL = 'MMSX_GET_LOG_TIME_BY_MO_FAIL'

export const MMSX_RESET_DEVICE_ASSIGN_STATE = 'MMSX_RESET_DEVICE_ASSIGN_STATE'

// get list device assign
export function searchDeviceAssign(payload, onSuccess, onError) {
  return {
    type: MMSX_SEARCH_DEVICE_ASSIGN_START,
    payload,
    onSuccess,
    onError,
  }
}

export function searchDeviceAssignSuccess(payload) {
  return {
    type: MMSX_SEARCH_DEVICE_ASSIGN_SUCCESS,
    payload,
  }
}

export function searchDeviceAssignFailed() {
  return {
    type: MMSX_SEARCH_DEVICE_ASSIGN_FAIL,
  }
}

// create device assign
export function createDeviceAssign(payload, onSuccess, onError) {
  return {
    type: MMSX_CREATE_DEVICE_ASSIGN_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function createDeviceAssignSuccess(payload) {
  return {
    type: MMSX_CREATE_DEVICE_ASSIGN_SUCCESS,
    payload,
  }
}

export function createDeviceAssignFail() {
  return {
    type: MMSX_CREATE_DEVICE_ASSIGN_FAIL,
  }
}

// update device assign
export function updateDeviceAssign(payload, onSuccess, onError) {
  return {
    type: MMSX_UPDATE_DEVICE_ASSIGN_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function updateDeviceAssignSuccess(payload) {
  return {
    type: MMSX_UPDATE_DEVICE_ASSIGN_SUCCESS,
    payload,
  }
}

export function updateDeviceAssignFail() {
  return {
    type: MMSX_UPDATE_DEVICE_ASSIGN_FAIL,
  }
}

//delete deviceAssign
export function deleteDeviceAssign(payload, onSuccess, onError) {
  return {
    type: MMSX_DELETE_DEVICE_ASSIGN_START,
    payload,
    onSuccess,
    onError,
  }
}

export function deleteDeviceAssignSuccess(payload) {
  return {
    type: MMSX_DELETE_DEVICE_ASSIGN_SUCCESS,
    payload,
  }
}

export function deleteDeviceAssignFail() {
  return {
    type: MMSX_DELETE_DEVICE_ASSIGN_FAIL,
  }
}

//detail device assign
export function detailDeviceAssign(payload, onSuccess, onError) {
  return {
    type: MMSX_DETAIL_DEVICE_ASSIGN_START,
    payload,
    onSuccess,
    onError,
  }
}

export function detailDeviceAssignSuccess(payload) {
  return {
    type: MMSX_DETAIL_DEVICE_ASSIGN_SUCCESS,
    payload,
  }
}

export function detailDeviceAssignFail() {
  return {
    type: MMSX_DETAIL_DEVICE_ASSIGN_FAIL,
  }
}

// get maintain request
export function getMaintainRequestDeviceAssign(payload, onSuccess, onError) {
  return {
    type: MMSX_GET_DEVICE_ASSIGN_MAINTAIN_REQUEST_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getMaintainRequestDeviceAssignSuccess(payload) {
  return {
    type: MMSX_GET_DEVICE_ASSIGN_MAINTAIN_REQUEST_SUCCESS,
    payload,
  }
}

export function getMaintainRequestDeviceAssignFail() {
  return {
    type: MMSX_GET_DEVICE_ASSIGN_MAINTAIN_REQUEST_FAIL,
  }
}

//get maintain info
export function getMaintainInfoDeviceAssign(payload, onSuccess, onError) {
  return {
    type: MMSX_GET_DEVICE_ASSIGN_MAINTAIN_INFO_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getMaintainInfoDeviceAssignSuccess(payload) {
  return {
    type: MMSX_GET_DEVICE_ASSIGN_MAINTAIN_INFO_SUCCESS,
    payload,
  }
}

export function getMaintainInfoDeviceAssignFail() {
  return {
    type: MMSX_GET_DEVICE_ASSIGN_MAINTAIN_INFO_FAIL,
  }
}

//get device request
export function getDeviceRequest(payload, onSuccess, onError) {
  return {
    type: MMSX_GET_DEVICE_REQUESTS_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getDeviceRequestSuccess(payload) {
  return {
    type: MMSX_GET_DEVICE_REQUESTS_SUCCESS,
    payload,
  }
}

export function getDeviceRequestFail() {
  return {
    type: MMSX_GET_DEVICE_REQUESTS_FAIL,
  }
}
//gen Serial
export function getGeneratedSerial(payload, onSuccess, onError) {
  return {
    type: MMSX_GET_GENERATED_SERIAL,
    payload,
    onSuccess,
    onError,
  }
}

export function getGeneratedSerialSuccess(payload) {
  return {
    type: MMSX_GET_GENERATED_SERIAL_SUCCESS,
    payload,
  }
}

export function getGeneratedSerialFail() {
  return {
    type: MMSX_GET_GENERATED_SERIAL_FAIL,
  }
}
//check Serial
export function checkSerial(payload, onSuccess, onError) {
  return {
    type: MMSX_CHECK_SERIAL,
    payload,
    onSuccess,
    onError,
  }
}

export function checkSerialSuccess(payload) {
  return {
    type: MMSX_CHECK_SERIAL_SUCCESS,
    payload,
  }
}

export function checkSerialFail() {
  return {
    type: MMSX_CHECK_SERIAL_FAIL,
  }
}

//get log time by mo
export function getLogTimeByMo(payload, onSuccess, onError) {
  return {
    type: MMSX_GET_LOG_TIME_BY_MO,
    payload,
    onSuccess,
    onError,
  }
}

export function getLogTimeByMoSuccess(payload) {
  return {
    type: MMSX_GET_LOG_TIME_BY_MO_SUCCESS,
    payload,
  }
}

export function getLogTimeByMoFail() {
  return {
    type: MMSX_GET_LOG_TIME_BY_MO_FAIL,
  }
}

export function resetDeviceAssignState() {
  return {
    type: MMSX_RESET_DEVICE_ASSIGN_STATE,
  }
}

export default {
  createDeviceAssign,
  createDeviceAssignSuccess,
  createDeviceAssignFail,
  searchDeviceAssign,
  searchDeviceAssignSuccess,
  searchDeviceAssignFailed,
  deleteDeviceAssign,
  deleteDeviceAssignSuccess,
  deleteDeviceAssignFail,
  detailDeviceAssign,
  detailDeviceAssignSuccess,
  detailDeviceAssignFail,
  getMaintainRequestDeviceAssign,
  getMaintainRequestDeviceAssignSuccess,
  getMaintainRequestDeviceAssignFail,
  getMaintainInfoDeviceAssign,
  getMaintainInfoDeviceAssignSuccess,
  getMaintainInfoDeviceAssignFail,
  getDeviceRequest,
  getDeviceRequestSuccess,
  getDeviceRequestFail,
  updateDeviceAssign,
  updateDeviceAssignSuccess,
  updateDeviceAssignFail,
  getGeneratedSerial,
  checkSerial,
  getLogTimeByMo,
  getLogTimeByMoSuccess,
  getLogTimeByMoFail,
  resetDeviceAssignState,
}
