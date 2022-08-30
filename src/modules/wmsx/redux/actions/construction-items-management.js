export const SEARCH_CONSTRUCTION_ITEMS_START =
  'WMSX_SEARCH_CONSTRUCTION_ITEMS_START'
export const SEARCH_CONSTRUCTION_ITEMS_SUCCESS =
  'WMSX_SEARCH_CONSTRUCTION_ITEMS_SUCCESS'
export const SEARCH_CONSTRUCTION_ITEMS_FAILED =
  'WMSX_SEARCH_CONSTRUCTION_ITEMS_FAILED'

export const CREATE_CONSTRUCTION_ITEMS_START =
  'WMSX_CREATE_CONSTRUCTION_ITEMS_START'
export const CREATE_CONSTRUCTION_ITEMS_SUCCESS =
  'WMSX_CREATE_CONSTRUCTION_ITEMS_SUCCESS'
export const CREATE_CONSTRUCTION_ITEMS_FAILED =
  'WMSX_CREATE_CONSTRUCTION_ITEMS_FAILED'

export const UPDATE_CONSTRUCTION_ITEMS_START =
  'WMSX_UPDATE_CONSTRUCTION_ITEMS_START'
export const UPDATE_CONSTRUCTION_ITEMS_SUCCESS =
  'WMSX_UPDATE_CONSTRUCTION_ITEMS_SUCCESS'
export const UPDATE_CONSTRUCTION_ITEMS_FAILED =
  'WMSX_UPDATE_CONSTRUCTION_ITEMS_FAILED'

export const DELETE_CONSTRUCTION_ITEMS_START =
  'WMSX_DELETE_CONSTRUCTION_ITEMS_START'
export const DELETE_CONSTRUCTION_ITEMS_SUCCESS =
  'WMSX_DELETE_CONSTRUCTION_ITEMS_SUCCESS'
export const DELETE_CONSTRUCTION_ITEMS_FAILED =
  'WMSX_DELETE_CONSTRUCTION_ITEMS_FAILED'

export const GET_CONSTRUCTION_ITEMS_DETAILS_START =
  'WMSX_GET_CONSTRUCTION_ITEMS_DETAILS_START'
export const GET_CONSTRUCTION_ITEMS_DETAILS_SUCCESS =
  'WMSX_GET_CONSTRUCTION_ITEMS_DETAILS_SUCCESS'
export const GET_CONSTRUCTION_ITEMS_DETAILS_FAILED =
  'WMSX_GET_CONSTRUCTION_ITEMS_DETAILS_FAILED'

export const CONFIRM_CONSTRUCTION_ITEMS_START =
  'WMSX_CONFIRM_CONSTRUCTION_ITEMS_START'
export const CONFIRM_CONSTRUCTION_ITEMS_SUCCESS =
  'WMSX_CONFIRM_CONSTRUCTION_ITEMS_SUCCESS'
export const CONFIRM_CONSTRUCTION_ITEMS_FAILED =
  'WMSX_CONFIRM_CONSTRUCTION_ITEMS_FAILED'

export const REJECT_CONSTRUCTION_ITEMS_START =
  'WMSX_REJECT_CONSTRUCTION_ITEMS_START'
export const REJECT_CONSTRUCTION_ITEMS_SUCCESS =
  'WMSX_REJECT_CONSTRUCTION_ITEMS_SUCCESS'
export const REJECT_CONSTRUCTION_ITEMS_FAILED =
  'WMSX_REJECT_CONSTRUCTION_ITEMS_FAILED'

export const RESET_CONSTRUCTION_ITEMS_DETAILS_STATE =
  'WMSX_RESET_CONSTRUCTION_ITEMS_DETAILS_STATE'

export function searchConstructionItems(payload, onSuccess, onError) {
  return {
    type: SEARCH_CONSTRUCTION_ITEMS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function searchConstructionItemsSuccess(payload) {
  return {
    type: SEARCH_CONSTRUCTION_ITEMS_SUCCESS,
    payload: payload,
  }
}

export function searchConstructionItemsFailed() {
  return {
    type: SEARCH_CONSTRUCTION_ITEMS_FAILED,
  }
}

export function createConstructionItems(payload, onSuccess, onError) {
  return {
    type: CREATE_CONSTRUCTION_ITEMS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function createConstructionItemsSuccess(payload) {
  return {
    type: CREATE_CONSTRUCTION_ITEMS_SUCCESS,
    payload: payload,
  }
}

export function createConstructionItemsFailed() {
  return {
    type: CREATE_CONSTRUCTION_ITEMS_FAILED,
  }
}

export function updateConstructionItems(payload, onSuccess, onError) {
  return {
    type: UPDATE_CONSTRUCTION_ITEMS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function updateConstructionItemsSuccess(payload) {
  return {
    type: UPDATE_CONSTRUCTION_ITEMS_SUCCESS,
    payload: payload,
  }
}

export function updateConstructionItemsFailed() {
  return {
    type: UPDATE_CONSTRUCTION_ITEMS_FAILED,
  }
}

export function deleteConstructionItems(packageId, onSuccess, onError) {
  return {
    type: DELETE_CONSTRUCTION_ITEMS_START,
    payload: packageId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function deleteConstructionItemsSuccess(payload) {
  return {
    type: DELETE_CONSTRUCTION_ITEMS_SUCCESS,
    payload: payload,
  }
}

export function deleteConstructionItemsFailed() {
  return {
    type: DELETE_CONSTRUCTION_ITEMS_FAILED,
  }
}

export function getConstructionItemsDetailsById(packageId, onSuccess, onError) {
  return {
    type: GET_CONSTRUCTION_ITEMS_DETAILS_START,
    payload: packageId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getConstructionItemsDetailsByIdSuccess(payload) {
  return {
    type: GET_CONSTRUCTION_ITEMS_DETAILS_SUCCESS,
    payload: payload,
  }
}

export function getConstructionItemsDetailsByIdFailed() {
  return {
    type: GET_CONSTRUCTION_ITEMS_DETAILS_FAILED,
  }
}

export function confirmConstructionItemsById(Id, onSuccess, onError) {
  return {
    type: CONFIRM_CONSTRUCTION_ITEMS_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function confirmConstructionItemsByIdSuccess(payload) {
  return {
    type: CONFIRM_CONSTRUCTION_ITEMS_SUCCESS,
    payload: payload,
  }
}

export function confirmConstructionItemsByIdFailed() {
  return {
    type: CONFIRM_CONSTRUCTION_ITEMS_FAILED,
  }
}

export function rejectConstructionItemsById(Id, onSuccess, onError) {
  return {
    type: REJECT_CONSTRUCTION_ITEMS_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function rejectConstructionItemsByIdSuccess(payload) {
  return {
    type: REJECT_CONSTRUCTION_ITEMS_SUCCESS,
    payload: payload,
  }
}

export function rejectConstructionItemsByIdFailed() {
  return {
    type: REJECT_CONSTRUCTION_ITEMS_FAILED,
  }
}

export function resetConstructionItemsDetailsState() {
  return {
    type: RESET_CONSTRUCTION_ITEMS_DETAILS_STATE,
  }
}

export default {
  searchConstructionItems,
  searchConstructionItemsSuccess,
  searchConstructionItemsFailed,
  createConstructionItems,
  createConstructionItemsSuccess,
  createConstructionItemsFailed,
  updateConstructionItems,
  updateConstructionItemsSuccess,
  updateConstructionItemsFailed,
  deleteConstructionItems,
  deleteConstructionItemsSuccess,
  deleteConstructionItemsFailed,
  getConstructionItemsDetailsById,
  getConstructionItemsDetailsByIdSuccess,
  getConstructionItemsDetailsByIdFailed,
  confirmConstructionItemsById,
  confirmConstructionItemsByIdSuccess,
  confirmConstructionItemsByIdFailed,
  rejectConstructionItemsById,
  rejectConstructionItemsByIdSuccess,
  rejectConstructionItemsByIdFailed,
  resetConstructionItemsDetailsState,
}
