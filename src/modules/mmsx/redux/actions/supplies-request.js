export const GET_SUPPLIES_REQUEST_LIST_START =
  'MMSX_GET_SUPPLIES_REQUEST_LIST_START'
export const GET_SUPPLIES_REQUEST_LIST_SUCCESS =
  'MMSX_GET_SUPPLIES_REQUEST_LIST_SUCCESS'
export const GET_SUPPLIES_REQUEST_LIST_FAIL =
  'MMSX_GET_SUPPLIES_REQUEST_LIST_FAIL'

export const GET_SUPPLIES_REQUEST_DETAIL_START =
  'MMSX_GET_SUPPLIES_REQUEST_DETAIL_START'
export const GET_SUPPLIES_REQUEST_DETAIL_SUCCESS =
  'MMSX_GET_SUPPLIES_REQUEST_DETAIL_SUCCESS'
export const GET_SUPPLIES_REQUEST_DETAIL_FAIL =
  'MMSX_GET_SUPPLIES_REQUEST_DETAIL_FAIL'

export const CONFIRM_SUPPLIES_REQUEST_START =
  'MMSX_CONFIRM_SUPPLIES_REQUEST_START'
export const CONFIRM_SUPPLIES_REQUEST_SUCCESS =
  'MMSX_CONFIRM_SUPPLIES_REQUEST_SUCCESS'
export const CONFIRM_SUPPLIES_REQUEST_FAIL =
  'MMSX_CONFIRM_SUPPLIES_REQUEST_FAIL'

export const REJECT_SUPPLIES_REQUEST_START =
  'MMSX_REJECT_SUPPLIES_REQUEST_START'
export const REJECT_SUPPLIES_REQUEST_SUCCESS =
  'MMSX_REJECT_SUPPLIES_REQUEST_SUCCESS'
export const REJECT_SUPPLIES_REQUEST_FAIL = 'MMSX_REJECT_SUPPLIES_REQUEST_FAIL'

export const CREATE_SUPPLIES_REQUEST = 'MMSX_CREATE_SUPPLIES_REQUEST'
export const CREATE_SUPPLIES_REQUEST_SUCCESS =
  'MMSX_CREATE_SUPPLIES_REQUEST_SUCCESS'
export const CREATE_SUPPLIES_REQUEST_FAIL = 'MMSX_CREATE_SUPPLIES_REQUEST_FAIL'

export const UPDATE_SUPPLIES_REQUEST = 'MMSX_UPDATE_SUPPLIES_REQUEST'
export const UPDATE_SUPPLIES_REQUEST_SUCCESS =
  'MMSX_UPDATE_SUPPLIES_REQUEST_SUCCESS'
export const UPDATE_SUPPLIES_REQUEST_FAIL = 'MMSX_UPDATE_SUPPLIES_REQUEST_FAIL'

export const GET_JOB_LIST_SUPPLY = 'MMSX_GET_JOB_LIST_SUPPLY'
export const GET_JOB_LIST_SUPPLY_SUCCESS = 'MMSX_GET_JOB_LIST_SUPPLY_SUCCESS'
export const GET_JOB_LIST_SUPPLY_FAIL = 'MMSX_GET_JOB_LIST_SUPPLY_FAIL'

export const DELETE_SUPPLIES_REQUEST_START =
  'MMSX_DELETE_SUPPLIES_REQUEST_START'
export const DELETE_SUPPLIES_REQUEST_SUCCESS =
  'MMSX_DELETE_SUPPLIES_REQUEST_SUCCESS'
export const DELETE_SUPPLIES_REQUEST_FAIL = 'MMSX_DELETE_SUPPLIES_REQUEST_FAIL'

export const RESET_STATE_SUPPLIES_REQUEST = 'MMSX_RESET_STATE_SUPPLIES_REQUEST'
export function getSuppliesRequestList(payload, onSuccess, onError) {
  return {
    type: GET_SUPPLIES_REQUEST_LIST_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getSuppliesRequestListSuccess(payload) {
  return {
    type: GET_SUPPLIES_REQUEST_LIST_SUCCESS,
    payload,
  }
}

export function getSuppliesRequestListFail() {
  return {
    type: GET_SUPPLIES_REQUEST_LIST_FAIL,
  }
}

export function getSuppliesRequestDetail(payload, onSuccess, onError) {
  return {
    type: GET_SUPPLIES_REQUEST_DETAIL_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getSuppliesRequestDetailSuccess(payload) {
  return {
    type: GET_SUPPLIES_REQUEST_DETAIL_SUCCESS,
    payload,
  }
}

export function getSuppliesRequestDetailFail() {
  return {
    type: GET_SUPPLIES_REQUEST_DETAIL_FAIL,
  }
}

export function confirmSuppliesRequest(payload, onSuccess, onError) {
  return {
    type: CONFIRM_SUPPLIES_REQUEST_START,
    payload,
    onSuccess,
    onError,
  }
}

export function confirmSuppliesRequestSuccess(payload) {
  return {
    type: CONFIRM_SUPPLIES_REQUEST_SUCCESS,
    payload,
  }
}

export function confirmSuppliesRequestFail() {
  return {
    type: CONFIRM_SUPPLIES_REQUEST_FAIL,
  }
}
export function rejectSuppliesRequest(payload, onSuccess, onError) {
  return {
    type: REJECT_SUPPLIES_REQUEST_START,
    payload,
    onSuccess,
    onError,
  }
}

export function rejectSuppliesRequestSuccess(payload) {
  return {
    type: REJECT_SUPPLIES_REQUEST_SUCCESS,
    payload,
  }
}

export function rejectSuppliesRequestFail() {
  return {
    type: REJECT_SUPPLIES_REQUEST_FAIL,
  }
}

export function createSuppliesRequest(payload, onSuccess, onError) {
  return {
    type: CREATE_SUPPLIES_REQUEST,
    payload,
    onSuccess,
    onError,
  }
}

export function createSuppliesRequestSuccess(payload) {
  return {
    type: CREATE_SUPPLIES_REQUEST_SUCCESS,
    payload,
  }
}

export function createSuppliesRequestFail() {
  return {
    type: CREATE_SUPPLIES_REQUEST_FAIL,
  }
}
export function getJobListInSuppliesRequest(payload, onSuccess, onError) {
  return {
    type: GET_JOB_LIST_SUPPLY,
    payload,
    onSuccess,
    onError,
  }
}

export function getJobListInSuppliesRequestSuccess(payload) {
  return {
    type: GET_JOB_LIST_SUPPLY_SUCCESS,
    payload,
  }
}

export function getJobListInSuppliesRequestFail() {
  return {
    type: GET_JOB_LIST_SUPPLY_FAIL,
  }
}

export function updateSuppliesRequest(payload, onSuccess, onError) {
  return {
    type: UPDATE_SUPPLIES_REQUEST,
    payload,
    onSuccess,
    onError,
  }
}

export function updateSuppliesRequestSuccess(payload) {
  return {
    type: UPDATE_SUPPLIES_REQUEST_SUCCESS,
    payload,
  }
}

export function updateSuppliesRequestFail() {
  return {
    type: UPDATE_SUPPLIES_REQUEST_FAIL,
  }
}

export function deleteSuppliesRequest(payload, onSuccess, onError) {
  return {
    type: DELETE_SUPPLIES_REQUEST_START,
    payload,
    onSuccess,
    onError,
  }
}

export function deleteSuppliesRequestSuccess(payload) {
  return {
    type: DELETE_SUPPLIES_REQUEST_SUCCESS,
    payload,
  }
}

export function deleteSuppliesRequestFail() {
  return {
    type: DELETE_SUPPLIES_REQUEST_FAIL,
  }
}

export function resetStateSuppliesRequest() {
  return {
    type: RESET_STATE_SUPPLIES_REQUEST,
  }
}
export default {
  getSuppliesRequestList,
  getSuppliesRequestListSuccess,
  getSuppliesRequestListFail,
  getSuppliesRequestDetail,
  getSuppliesRequestDetailSuccess,
  getSuppliesRequestDetailFail,
  confirmSuppliesRequest,
  confirmSuppliesRequestSuccess,
  confirmSuppliesRequestFail,
  rejectSuppliesRequest,
  rejectSuppliesRequestSuccess,
  rejectSuppliesRequestFail,
  createSuppliesRequest,
  createSuppliesRequestSuccess,
  createSuppliesRequestFail,
  getJobListInSuppliesRequest,
  getJobListInSuppliesRequestSuccess,
  getJobListInSuppliesRequestFail,
  updateSuppliesRequest,
  updateSuppliesRequestSuccess,
  updateSuppliesRequestFail,
  deleteSuppliesRequest,
  deleteSuppliesRequestSuccess,
  deleteSuppliesRequestFail,
  resetStateSuppliesRequest,
}
