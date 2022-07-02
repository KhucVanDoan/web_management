export const SEARCH_SUPPLIES_CATEGORY_START =
  'MMSX_SEARCH_SUPPLIES_CATEGORY_START'
export const SEARCH_SUPPLIES_CATEGORY_SUCCESS =
  'MMSX_SEARCH_SUPPLIES_CATEGORY_SUCCESS'
export const SEARCH_SUPPLIES_CATEGORY_FAIL =
  'MMSX_SEARCH_SUPPLIES_CATEGORY_FAIL'

export const GET_SUPPLIES_CATEGORY_START = 'MMSX_GET_SUPPLIES_CATEGORY_START'
export const GET_SUPPLIES_CATEGORY_SUCCESS =
  'MMSX_GET_SUPPLIES_CATEGORY_SUCCESS'
export const GET_SUPPLIES_CATEGORY_FAIL = 'MMSX_GET_SUPPLIES_CATEGORY_FAIL'

export const CREATE_SUPPLIES_CATEGORY_START =
  'MMSX_CREATE_SUPPLIES_CATEGORY_START'
export const CREATE_SUPPLIES_CATEGORY_SUCCESS =
  'MMSX_CREATE_SUPPLIES_CATEGORY_SUCCESS'
export const CREATE_SUPPLIES_CATEGORY_FAIL =
  'MMSX_CREATE_SUPPLIES_CATEGORY_FAIL'

export const UPDATE_SUPPLIES_CATEGORY_START =
  'MMSX_UPDATE_SUPPLIES_CATEGORY_START'
export const UPDATE_SUPPLIES_CATEGORY_SUCCESS =
  'MMSX_UPDATE_SUPPLIES_CATEGORY_SUCCESS'
export const UPDATE_SUPPLIES_CATEGORY_FAIL =
  'MMSX_UPDATE_SUPPLIES_CATEGORY_FAIL'

export const DELETE_SUPPLIES_CATEGORY_START =
  'MMSX_DELETE_SUPPLIES_CATEGORY_START'
export const DELETE_SUPPLIES_CATEGORY_SUCCESS =
  'MMSX_DELETE_SUPPLIES_CATEGORY_SUCCESS'
export const DELETE_SUPPLIES_CATEGORY_FAIL =
  'MMSX_DELETE_SUPPLIES_CATEGORY_FAIL'

export const GET_ALL_CONFRIM_SUPPLIES_CATEGORY_START =
  'MMSX_GET_ALL_CONFRIM_SUPPLIES_CATEGORY_START'
export const GET_ALL_CONFRIM_SUPPLIES_CATEGORY_SUCCESS =
  'MMSX_GET_ALL_CONFRIM_SUPPLIES_CATEGORY_SUCCESS'
export const GET_ALL_CONFRIM_SUPPLIES_CATEGORY_FAIL =
  'MMSX_GET_ALL_CONFRIM_SUPPLIES_CATEGORY_FAIL'

export const CONFIRM_SUPPLIES_CATEGORY_START =
  'MMSX_CONFIRM_SUPPLIES_CATEGORY_START'
export const CONFIRM_SUPPLIES_CATEGORY_SUCCESS =
  'MMSX_CONFIRM_SUPPLIES_CATEGORY_SUCCESS'
export const CONFIRM_SUPPLIES_CATEGORY_FAIL =
  'MMSX_CONFIRM_SUPPLIES_CATEGORY_FAIL'

export const RESET_SUPPLIES_CATEGORY = 'MMSX_RESET_SUPPLIES_CATEGORY'

export function searchListSuppliesCategory(payload, onSuccess, onError) {
  return {
    type: SEARCH_SUPPLIES_CATEGORY_START,
    payload,
    onSuccess,
    onError,
  }
}

export function searchListSuppliesCategorySuccess(payload) {
  return {
    type: SEARCH_SUPPLIES_CATEGORY_SUCCESS,
    payload,
  }
}

export function searchListSuppliesCategoryFail() {
  return {
    type: SEARCH_SUPPLIES_CATEGORY_FAIL,
  }
}

export function getDetailSuppliesCategory(payload, onSuccess, onError) {
  return {
    type: GET_SUPPLIES_CATEGORY_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getDetailSuppliesCategorySuccess(payload) {
  return {
    type: GET_SUPPLIES_CATEGORY_SUCCESS,
    payload,
  }
}

export function getDetailSuppliesCategoryFail() {
  return {
    type: GET_SUPPLIES_CATEGORY_FAIL,
  }
}

export function createSuppliesCategory(payload, onSuccess, onError) {
  return {
    type: CREATE_SUPPLIES_CATEGORY_START,
    payload,
    onSuccess,
    onError,
  }
}

export function createSuppliesCategorySuccess(payload) {
  return {
    type: CREATE_SUPPLIES_CATEGORY_SUCCESS,
    payload,
  }
}

export function createSuppliesCategoryFail() {
  return {
    type: CREATE_SUPPLIES_CATEGORY_FAIL,
  }
}

export function updateSuppliesCategory(payload, onSuccess, onError) {
  return {
    type: UPDATE_SUPPLIES_CATEGORY_START,
    payload,
    onSuccess,
    onError,
  }
}

export function updateSuppliesCategorySuccess(payload) {
  return {
    type: UPDATE_SUPPLIES_CATEGORY_SUCCESS,
    payload,
  }
}
export function updateSuppliesCategoryFail() {
  return {
    type: UPDATE_SUPPLIES_CATEGORY_FAIL,
  }
}

export function deleteSuppliesCategory(payload, onSuccess, onError) {
  return {
    type: DELETE_SUPPLIES_CATEGORY_START,
    payload,
    onSuccess,
    onError,
  }
}

export function deleteSuppliesCategorySuccess(payload) {
  return {
    type: DELETE_SUPPLIES_CATEGORY_SUCCESS,
    payload,
  }
}
export function deleteSuppliesCategoryFail() {
  return {
    type: DELETE_SUPPLIES_CATEGORY_FAIL,
  }
}

export function getAllConfirmSuppliesCategory(payload, onSuccess, onError) {
  return {
    type: GET_ALL_CONFRIM_SUPPLIES_CATEGORY_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getAllConfirmSuppliesCategorySuccess(payload) {
  return {
    type: GET_ALL_CONFRIM_SUPPLIES_CATEGORY_SUCCESS,
    payload,
  }
}

export function getAllConfirmSuppliesCategoryFail() {
  return {
    type: GET_ALL_CONFRIM_SUPPLIES_CATEGORY_FAIL,
  }
}

export function confirmSuppliesCategory(payload, onSuccess, onError) {
  return {
    type: CONFIRM_SUPPLIES_CATEGORY_START,
    payload,
    onSuccess,
    onError,
  }
}

export function confirmSuppliesCategorySuccess(payload) {
  return {
    type: CONFIRM_SUPPLIES_CATEGORY_SUCCESS,
    payload,
  }
}

export function confirmSuppliesCategoryFail() {
  return {
    type: CONFIRM_SUPPLIES_CATEGORY_FAIL,
  }
}

export function resetSuppliesCategory() {
  return {
    type: RESET_SUPPLIES_CATEGORY,
  }
}

export default {
  searchListSuppliesCategory,
  searchListSuppliesCategorySuccess,
  searchListSuppliesCategoryFail,
  getDetailSuppliesCategory,
  getDetailSuppliesCategorySuccess,
  getDetailSuppliesCategoryFail,
  createSuppliesCategory,
  createSuppliesCategorySuccess,
  createSuppliesCategoryFail,
  updateSuppliesCategory,
  updateSuppliesCategorySuccess,
  updateSuppliesCategoryFail,
  deleteSuppliesCategory,
  deleteSuppliesCategorySuccess,
  deleteSuppliesCategoryFail,
  getAllConfirmSuppliesCategory,
  getAllConfirmSuppliesCategorySuccess,
  getAllConfirmSuppliesCategoryFail,
  confirmSuppliesCategory,
  confirmSuppliesCategorySuccess,
  confirmSuppliesCategoryFail,
  resetSuppliesCategory,
}
