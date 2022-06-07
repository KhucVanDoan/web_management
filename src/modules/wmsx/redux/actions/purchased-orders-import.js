export const SEARCH_PO_IMPORT_START = 'WMSX_SEARCH_PO_IMPORT_START'
export const SEARCH_PO_IMPORT_SUCCESS = 'WMSX_SEARCH_PO_IMPORT_SUCCESS'
export const SEARCH_PO_IMPORT_FAILED = 'WMSX_SEARCH_PO_IMPORT_FAILED'

export const CREATE_PO_IMPORT_START = 'WMSX_CREATE_PO_IMPORT_START'
export const CREATE_PO_IMPORT_SUCCESS = 'WMSX_CREATE_PO_IMPORT_SUCCESS'
export const CREATE_PO_IMPORT_FAILED = 'WMSX_CREATE_PO_IMPORT_FAILED'

export const UPDATE_PO_IMPORT_START = 'WMSX_UPDATE_PO_IMPORT_START'
export const UPDATE_PO_IMPORT_SUCCESS = 'WMSX_UPDATE_PO_IMPORT_SUCCESS'
export const UPDATE_PO_IMPORT_FAILED = 'WMSX_UPDATE_PO_IMPORT_FAILED'

export const DELETE_PO_IMPORT_START = 'WMSX_DELETE_PO_IMPORT_START'
export const DELETE_PO_IMPORT_SUCCESS = 'WMSX_DELETE_PO_IMPORT_SUCCESS'
export const DELETE_PO_IMPORT_FAILED = 'WMSX_DELETE_PO_IMPORT_FAILED'

export const GET_PO_IMPORT_DETAILS_START = 'WMSX_GET_PO_IMPORT_DETAILS_START'
export const GET_PO_IMPORT_DETAILS_SUCCESS =
  'WMSX_GET_PO_IMPORT_DETAILS_SUCCESS'
export const GET_PO_IMPORT_DETAILS_FAILED = 'WMSX_GET_PO_IMPORT_DETAILS_FAILED'

export const CONFIRM_PO_IMPORT_START = 'WMSX_CONFIRM_PO_IMPORT_START'
export const CONFIRM_PO_IMPORT_SUCCESS = 'WMSX_CONFIRM_PO_IMPORT_SUCCESS'
export const CONFIRM_PO_IMPORT_FAILED = 'WMSX_CONFIRM_PO_IMPORT_FAILED'

export const REJECT_PO_IMPORT_START = 'WMSX_REJECT_PO_IMPORT_START'
export const REJECT_PO_IMPORT_SUCCESS = 'WMSX_REJECT_PO_IMPORT_SUCCESS'
export const REJECT_PO_IMPORT_FAILED = 'WMSX_REJECT_PO_IMPORT_FAILED'

export const GET_LOT_NUMBER_LIST_START = 'WMSX_GET_LOT_NUMBER_LIST_START'
export const GET_LOT_NUMBER_LIST_SUCCESS = 'WMSX_GET_LOT_NUMBER_LIST_SUCCESS'
export const GET_LOT_NUMBER_LIST_FAILED = 'WMSX_GET_LOT_NUMBER_LIST_FAILED'

export const GET_PURCHASED_ORDER_NOT_CREATE_POIMP_START =
  'WMSX_GET_PURCHASED_ORDER_NOT_CREATE_POIMP_START'
export const GET_PURCHASED_ORDER_NOT_CREATE_POIMP_SUCCESS =
  'WMSX_GET_PURCHASED_ORDER_NOT_CREATE_POIMP_SUCCESS'
export const GET_PURCHASED_ORDER_NOT_CREATE_POIMP_FAILED =
  'WMSX_GET_PURCHASED_ORDER_NOT_CREATE_POIMP_FAILED'

export const RESET_PO_IMPORT_DETAILS = 'WMSX_RESET_PO_IMPORT_DETAILS'

/**
 * Search poImport
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchPOImports(payload, onSuccess, onError) {
  return {
    type: SEARCH_PO_IMPORT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search poImport success action
 * @param {*} payload
 * @returns {object}
 */
export function searchPOImportsSuccess(payload) {
  return {
    type: SEARCH_PO_IMPORT_SUCCESS,
    payload: payload,
  }
}

/**
 * Search poImport failed action
 * @returns {object}
 */
export function searchPOImportsFailed() {
  return {
    type: SEARCH_PO_IMPORT_FAILED,
  }
}

/**
 * Create poImport
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createPOImport(payload, onSuccess, onError) {
  return {
    type: CREATE_PO_IMPORT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Create poImport success action
 * @param {*} payload
 * @returns {object}
 */
export function createPOImportSuccess(payload) {
  return {
    type: CREATE_PO_IMPORT_SUCCESS,
    payload: payload,
  }
}

/**
 * Create poImport failed action
 * @returns {object}
 */
export function createPOImportFailed() {
  return {
    type: CREATE_PO_IMPORT_FAILED,
  }
}

/**
 * Update poImport
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updatePOImport(payload, onSuccess, onError) {
  return {
    type: UPDATE_PO_IMPORT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Update poImport success action
 * @param {*} payload
 * @returns {object}
 */
export function updatePOImportSuccess(payload) {
  return {
    type: UPDATE_PO_IMPORT_SUCCESS,
    payload: payload,
  }
}

/**
 * Update poImport failed action
 * @returns {object}
 */
export function updatePOImportFailed() {
  return {
    type: UPDATE_PO_IMPORT_FAILED,
  }
}
/**
 * Delete poImport
 * @param {int} poImportId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deletePOImport(poImportId, onSuccess, onError) {
  return {
    type: DELETE_PO_IMPORT_START,
    payload: poImportId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete poImport success action
 * @param {*} payload
 * @returns {object}
 */
export function deletePOImportSuccess(payload) {
  return {
    type: DELETE_PO_IMPORT_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete poImport failed action
 * @returns {object}
 */
export function deletePOImportFailed() {
  return {
    type: DELETE_PO_IMPORT_FAILED,
  }
}

/**
 * Get poImport details
 * @param {int} poImportId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getPOImportDetailsById(poImportId, onSuccess, onError) {
  return {
    type: GET_PO_IMPORT_DETAILS_START,
    payload: poImportId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get poImport details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getPOImportDetailsByIdSuccess(payload) {
  return {
    type: GET_PO_IMPORT_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get poImport details by id failed action
 * @returns {object}
 */
export function getPOImportDetailsByIdFailed() {
  return {
    type: GET_PO_IMPORT_DETAILS_FAILED,
  }
}

/**
 * Get confirm purchased order
 * @param {int} poImportId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function confirmPOImportById(poImportId, onSuccess, onError) {
  return {
    type: CONFIRM_PO_IMPORT_START,
    payload: poImportId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get confirm purchased order by id success action
 * @param {*} payload
 * @returns {object}
 */
export function confirmPOImportByIdSuccess(payload) {
  return {
    type: CONFIRM_PO_IMPORT_SUCCESS,
    payload: payload,
  }
}

/**
 * Get confirm purchased order by id failed action
 * @returns {object}
 */
export function confirmPOImportByIdFailed() {
  return {
    type: CONFIRM_PO_IMPORT_FAILED,
  }
}

/**
 * Get reject purchased order
 * @param {int} poImportId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function rejectPOImportById(poImportId, onSuccess, onError) {
  return {
    type: REJECT_PO_IMPORT_START,
    payload: poImportId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get reject purchased order by id success action
 * @param {*} payload
 * @returns {object}
 */
export function rejectPOImportByIdSuccess(payload) {
  return {
    type: REJECT_PO_IMPORT_SUCCESS,
    payload: payload,
  }
}

/**
 * Get reject purchased order by id failed action
 * @returns {object}
 */
export function rejectPOImportByIdFailed() {
  return {
    type: REJECT_PO_IMPORT_FAILED,
  }
}

/**
 * Get lot number list
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getLotNumberList(itemIds, onSuccess, onError) {
  return {
    type: GET_LOT_NUMBER_LIST_START,
    payload: itemIds,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get lot number list success action
 * @param {*} payload
 * @returns {object}
 */
export function getLotNumberListSuccess(payload) {
  return {
    type: GET_LOT_NUMBER_LIST_SUCCESS,
    payload: payload,
  }
}

/**
 * Get lot number list failed action
 * @returns {object}
 */
export function getLotNumberListFailed() {
  return {
    type: GET_LOT_NUMBER_LIST_FAILED,
  }
}
export function resetPODetailsState() {
  return {
    type: RESET_PO_IMPORT_DETAILS,
  }
}

export function getPurchasedOrderNotCreatePOimp(payload, onSuccess, onError) {
  return {
    type: GET_PURCHASED_ORDER_NOT_CREATE_POIMP_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getPurchasedOrderNotCreatePOimpSuccess(payload) {
  return {
    type: GET_PURCHASED_ORDER_NOT_CREATE_POIMP_SUCCESS,
    payload: payload,
  }
}

export function getPurchasedOrderNotCreatePOimpFailed() {
  return {
    type: GET_PURCHASED_ORDER_NOT_CREATE_POIMP_FAILED,
  }
}
export default {
  searchPOImports,
  searchPOImportsFailed,
  searchPOImportsSuccess,
  createPOImport,
  createPOImportFailed,
  createPOImportSuccess,
  updatePOImport,
  updatePOImportFailed,
  updatePOImportSuccess,
  deletePOImport,
  deletePOImportFailed,
  deletePOImportSuccess,
  getPOImportDetailsById,
  getPOImportDetailsByIdFailed,
  getPOImportDetailsByIdSuccess,
  confirmPOImportById,
  confirmPOImportByIdFailed,
  confirmPOImportByIdSuccess,
  rejectPOImportById,
  rejectPOImportByIdFailed,
  rejectPOImportByIdSuccess,
  getLotNumberList,
  getLotNumberListFailed,
  getLotNumberListSuccess,
  resetPODetailsState,
  getPurchasedOrderNotCreatePOimp,
  getPurchasedOrderNotCreatePOimpSuccess,
  getPurchasedOrderNotCreatePOimpFailed,
}
