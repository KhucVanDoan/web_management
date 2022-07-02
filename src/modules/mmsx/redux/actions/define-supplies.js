export const SEARCH_SUPPLIES_START = 'MMSX_SEARCH_SUPPLIES_START'
export const SEARCH_SUPPLIES_SUCCESS = 'MMSX_SEARCH_SUPPLIES_SUCCESS'
export const SEARCH_SUPPLIES_FAIL = 'MMSX_SEARCH_SUPPLIES_FAIL'
export const CREATE_SUPPLIES_START = 'MMSX_CREATE_SUPPLIES_START'
export const CREATE_SUPPLIES_SUCCESS = 'MMSX_CREATE_SUPPLIES_SUCCESS'
export const CREATE_SUPPLIES_FAIL = 'MMSX_CREATE_SUPPLIES_FAIL'
export const GET_SUPPLIES_START = 'MMSX_GET_SUPPLIES_START'
export const GET_SUPPLIES_SUCCESS = 'MMSX_GET_SUPPLIES_SUCCESS'
export const GET_SUPPLIES_FAIL = 'MMSX_GET_SUPPLIES_FAIL'
export const UPDATE_SUPPLIES_START = 'MMSX_UPDATE_SUPPLIES_START'
export const UPDATE_SUPPLIES_SUCCESS = 'MMSX_UPDATE_SUPPLIES_SUCCESS'
export const UPDATE_SUPPLIES_FAIL = 'MMSX_UPDATE_SUPPLIES_FAIL'
export const DELETE_SUPPLIES_START = 'MMSX_DELETE_SUPPLIES_START'
export const DELETE_SUPPLIES_SUCCESS = 'MMSX_DELETE_SUPPLIES_SUCCESS'
export const DELETE_SUPPLIES_FAIL = 'MMSX_DELETE_SUPPLIES_FAIL'

export const CONFIRM_SUPPLIES_START = 'MMSX_CONFIRM_SUPPLIES_START'
export const CONFIRM_SUPPLIES_SUCCESS = 'MMSX_CONFIRM_SUPPLIES_SUCCESS'
export const CONFIRM_SUPPLIES_FAIL = 'MMSX_CONFIRM_SUPPLIES_FAIL'
export const RESET_STATE_SUPPLIES = 'MMSX_RESET_STATE_SUPPLIES'
export function searchListSupplies(payload, onSuccess, onError) {
  return {
    type: SEARCH_SUPPLIES_START,
    payload,
    onSuccess,
    onError,
  }
}

export function searchListSuppliesSuccess(payload) {
  return {
    type: SEARCH_SUPPLIES_SUCCESS,
    payload,
  }
}

export function searchListSuppliesFail() {
  return {
    type: SEARCH_SUPPLIES_FAIL,
  }
}

export function createSupplies(payload, onSuccess, onError) {
  return {
    type: CREATE_SUPPLIES_START,
    payload,
    onSuccess,
    onError,
  }
}

export function createSuppliesSuccess(payload) {
  return {
    type: CREATE_SUPPLIES_SUCCESS,
    payload,
  }
}

export function createSuppliesFail() {
  return {
    type: CREATE_SUPPLIES_FAIL,
  }
}

export function getSupplies(payload, onSuccess, onError) {
  return {
    type: GET_SUPPLIES_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getSuppliesSuccess(payload) {
  return {
    type: GET_SUPPLIES_SUCCESS,
    payload,
  }
}

export function getSuppliesFail() {
  return {
    type: GET_SUPPLIES_FAIL,
  }
}

export function updateSupplies(payload, onSuccess, onError) {
  return {
    type: UPDATE_SUPPLIES_START,
    payload,
    onSuccess,
    onError,
  }
}

export function updateSuppliesSuccess(payload) {
  return {
    type: UPDATE_SUPPLIES_SUCCESS,
    payload,
  }
}

export function updateSuppliesFail() {
  return {
    type: UPDATE_SUPPLIES_FAIL,
  }
}

export function deleteSupplies(payload, onSuccess, onError) {
  return {
    type: DELETE_SUPPLIES_START,
    payload,
    onSuccess,
    onError,
  }
}

export function deleteSuppliesSuccess(payload) {
  return {
    type: DELETE_SUPPLIES_SUCCESS,
    payload,
  }
}

export function deleteSuppliesFail() {
  return {
    type: DELETE_SUPPLIES_FAIL,
  }
}

export function confirmSupplies(payload, onSuccess, onError) {
  return {
    type: CONFIRM_SUPPLIES_START,
    payload,
    onSuccess,
    onError,
  }
}

export function confirmSuppliesSuccess(payload) {
  return {
    type: CONFIRM_SUPPLIES_SUCCESS,
    payload,
  }
}

export function confirmSuppliesFail() {
  return {
    type: CONFIRM_SUPPLIES_FAIL,
  }
}
export function resetSupplies() {
  return {
    type: RESET_STATE_SUPPLIES,
  }
}

export default {
  searchListSupplies,
  searchListSuppliesSuccess,
  searchListSuppliesFail,
  createSupplies,
  createSuppliesSuccess,
  createSuppliesFail,
  updateSupplies,
  updateSuppliesSuccess,
  updateSuppliesFail,
  getSupplies,
  getSuppliesSuccess,
  getSuppliesFail,
  deleteSupplies,
  deleteSuppliesSuccess,
  deleteSuppliesFail,
  confirmSupplies,
  confirmSuppliesSuccess,
  confirmSuppliesFail,
  resetSupplies,
}
