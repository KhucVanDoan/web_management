export const SEARCH_WARNING_LIST_START = 'MMSX_SEARCH_WARNING_LIST_START'
export const SEARCH_WARNING_LIST_SUCCESS = 'MMSX_SEARCH_WARNING_LIST_SUCCESS'
export const SEARCH_WARNING_LIST_FAIL = 'MMSX_SEARCH_WARNING_LIST_FAIL'

export const GET_WARNING_LIST_START = 'MMSX_GET_WARNING_LIST_START'
export const GET_WARNING_LIST_SUCCESS = 'MMSX_GET_WARNING_LIST_SUCCESS'
export const GET_WARNING_LIST_FAIL = 'MMSX_GET_WARNING_LIST_FAIL'

export const CONFIRM_WARNING_START = 'MMSX_CONFIRM_WARNING_START'
export const CONFIRM_WARNING_SUCCESS = 'MMSX_CONFIRM_WARNING_SUCCESS'
export const CONFIRM_WARNING_FAIL = 'MMSX_CONFIRM_WARNING_FAIL'

export const REJECT_WARNING_START = 'MMSX_REJECT_WARNING_START'
export const REJECT_WARNING_SUCCESS = 'MMSX_REJECT_WARNING_SUCCESS'
export const REJECT_WARNING_FAIL = 'MMSX_REJECT_WARNING_FAIL'

export const GET_WARNING_DETAIL_START = 'MMSX_GET_WARNING_DETAIL_START'
export const GET_WARNING_DETAIL_SUCCESS = 'MMSX_GET_WARNING_DETAIL_SUCCESS'
export const GET_WARNING_DETAIL_FAIL = 'MMSX_GET_WARNING_DETAIL_FAIL'

/**
 * Search block
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */

export function searchWarningList(payload, onSuccess, onError) {
  return {
    type: SEARCH_WARNING_LIST_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function searchWarningListSuccess(payload) {
  return {
    type: SEARCH_WARNING_LIST_SUCCESS,
    payload: payload,
  }
}

export function searchWarningListFail() {
  return {
    type: SEARCH_WARNING_LIST_FAIL,
  }
}

export function getWarningList(payload, onSuccess, onError) {
  return {
    type: GET_WARNING_LIST_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function getWarningListSuccess(payload) {
  return {
    type: GET_WARNING_LIST_SUCCESS,
    payload,
  }
}

export function getWarningListFail() {
  return {
    type: GET_WARNING_LIST_FAIL,
  }
}

// Confirm
export function confirmWarning(payload, onSuccess, onError) {
  return {
    type: CONFIRM_WARNING_START,
    payload,
    onSuccess,
    onError,
  }
}

export function confirmWarningSuccess(payload) {
  return {
    type: CONFIRM_WARNING_SUCCESS,
    payload,
  }
}

export function confirmWarningFail() {
  return {
    type: CONFIRM_WARNING_FAIL,
  }
}

// reject
export function rejectWarning(payload, onSuccess, onError) {
  return {
    type: REJECT_WARNING_START,
    payload,
    onSuccess,
    onError,
  }
}

export function rejectWarningSuccess(payload) {
  return {
    type: REJECT_WARNING_SUCCESS,
    payload,
  }
}

export function rejectWarningFail() {
  return {
    type: REJECT_WARNING_FAIL,
  }
}

const getWarningDetail = (payload, onSuccess, onError) => ({
  type: GET_WARNING_DETAIL_START,
  payload,
  onSuccess,
  onError,
})

export const getWarningDetailSuccess = (payload) => ({
  type: GET_WARNING_DETAIL_SUCCESS,
  payload,
})

export const getWarningDetailFail = (payload) => ({
  type: GET_WARNING_DETAIL_FAIL,
  payload,
})

export default {
  searchWarningList,
  searchWarningListSuccess,
  searchWarningListFail,
  getWarningList,
  getWarningListSuccess,
  getWarningListFail,
  rejectWarning,
  rejectWarningSuccess,
  rejectWarningFail,
  confirmWarning,
  confirmWarningSuccess,
  confirmWarningFail,
  getWarningDetail,
  getWarningDetailSuccess,
  getWarningDetailFail,
}
