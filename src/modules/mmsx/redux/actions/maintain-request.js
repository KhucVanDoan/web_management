export const SEARCH_MAINTAIN_REQUEST_START =
  'MMSX_SEARCH_MAINTAIN_REQUEST_START'
export const SEARCH_MAINTAIN_REQUEST_SUCCESS =
  'MMSX_SEARCH_MAINTAIN_REQUEST_SUCCESS'
export const SEARCH_MAINTAIN_REQUEST_FAIL = 'MMSX_SEARCH_MAINTAIN_REQUEST_FAIL'

export const GET_MAINTAIN_REQUEST_START = 'MMSX_GET_MAINTAIN_REQUEST_START'
export const GET_MAINTAIN_REQUEST_SUCCESS = 'MMSX_GET_MAINTAIN_REQUEST_SUCCESS'
export const GET_MAINTAIN_REQUEST_FAIL = 'MMSX_GET_MAINTAIN_REQUEST_FAIL'

export const GET_MAINTAIN_REQUEST_DETAIL_START =
  'MMSX_GET_MAINTAIN_REQUEST_DETAIL_START'
export const GET_MAINTAIN_REQUEST_DETAIL_SUCCESS =
  'MMSX_GET_MAINTAIN_REQUEST_DETAIL_SUCCESS'
export const GET_MAINTAIN_REQUEST_DETAIL_FAIL =
  'MMSX_GET_MAINTAIN_REQUEST_DETAIL_FAIL'

export const CONFIRM_MAINTAIN_REQUEST_START =
  'MMSX_CONFIRM_MAINTAIN_REQUEST_START'
export const CONFIRM_MAINTAIN_REQUEST_SUCCESS =
  'MMSX_CONFIRM_MAINTAIN_REQUEST_SUCCESS'
export const CONFIRM_MAINTAIN_REQUEST_FAIL =
  'MMSX_CONFIRM_MAINTAIN_REQUEST_FAIL'

export const REJECT_MAINTAIN_REQUEST_START =
  'MMSX_REJECT_MAINTAIN_REQUEST_START'
export const REJECT_MAINTAIN_REQUEST_SUCCESS =
  'MMSX_REJECT_MAINTAIN_REQUEST_SUCCESS'
export const REJECT_MAINTAIN_REQUEST_FAIL = 'MMSX_REJECT_MAINTAIN_REQUEST_FAIL'

export const RESET_MAINTAIN_REQUEST = 'MMSX_RESET_MAINTAIN_REQUEST'

/**
 * Search block
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */

export function searchMaintainRequest(payload, onSuccess, onError) {
  return {
    type: SEARCH_MAINTAIN_REQUEST_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function searchMaintainRequestSuccess(payload) {
  return {
    type: SEARCH_MAINTAIN_REQUEST_SUCCESS,
    payload: payload,
  }
}

export function searchMaintainRequestFail() {
  return {
    type: SEARCH_MAINTAIN_REQUEST_FAIL,
  }
}

export function getMaintainRequest(payload, onSuccess, onError) {
  return {
    type: GET_MAINTAIN_REQUEST_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function getMaintainRequestSuccess(payload) {
  return {
    type: GET_MAINTAIN_REQUEST_SUCCESS,
    payload,
  }
}

export function getMaintainRequestFail() {
  return {
    type: GET_MAINTAIN_REQUEST_FAIL,
  }
}

export function getMaintainRequestDetail(payload, onSuccess, onError) {
  return {
    type: GET_MAINTAIN_REQUEST_DETAIL_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function getMaintainRequestDetailSuccess(payload) {
  return {
    type: GET_MAINTAIN_REQUEST_DETAIL_SUCCESS,
    payload,
  }
}

export function getMaintainRequestDetailFail() {
  return {
    type: GET_MAINTAIN_REQUEST_DETAIL_FAIL,
  }
}

// Confirm
export function confirmMaintainRequest(payload, onSuccess, onError) {
  return {
    type: CONFIRM_MAINTAIN_REQUEST_START,
    payload,
    onSuccess,
    onError,
  }
}

export function confirmMaintainRequestSuccess(payload) {
  return {
    type: CONFIRM_MAINTAIN_REQUEST_SUCCESS,
    payload,
  }
}

export function confirmMaintainRequestFail() {
  return {
    type: CONFIRM_MAINTAIN_REQUEST_FAIL,
  }
}

// Confirm
export function rejectMaintainRequest(payload, onSuccess, onError) {
  return {
    type: REJECT_MAINTAIN_REQUEST_START,
    payload,
    onSuccess,
    onError,
  }
}

export function rejectMaintainRequestSuccess(payload) {
  return {
    type: REJECT_MAINTAIN_REQUEST_SUCCESS,
    payload,
  }
}

export function rejectMaintainRequestFail() {
  return {
    type: REJECT_MAINTAIN_REQUEST_FAIL,
  }
}

export function resetMaintainRequest() {
  return {
    type: RESET_MAINTAIN_REQUEST,
  }
}

export default {
  searchMaintainRequest,
  searchMaintainRequestSuccess,
  searchMaintainRequestFail,
  getMaintainRequest,
  getMaintainRequestSuccess,
  getMaintainRequestFail,
  getMaintainRequestDetail,
  getMaintainRequestDetailSuccess,
  getMaintainRequestDetailFail,
  confirmMaintainRequest,
  confirmMaintainRequestSuccess,
  confirmMaintainRequestFail,
  rejectMaintainRequest,
  rejectMaintainRequestSuccess,
  rejectMaintainRequestFail,
  resetMaintainRequest,
}
