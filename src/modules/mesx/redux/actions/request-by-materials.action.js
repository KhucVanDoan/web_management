export const SEARCH_REQUEST_BUY_MATERIALS_START =
  'SEARCH_REQUEST_BUY_MATERIALS_START';
export const SEARCH_REQUEST_BUY_MATERIALS_SUCCESS =
  'SEARCH_REQUEST_BUY_MATERIALS_SUCCESS';
export const SEARCH_REQUEST_BUY_MATERIALS_FAILED =
  'SEARCH_REQUEST_BUY_MATERIALS_FAILED';

export const UPDATE_REQUEST_BUY_MATERIAL_START =
  'UPDATE_REQUEST_BUY_MATERIAL_START';
export const UPDATE_REQUEST_BUY_MATERIAL_SUCCESS =
  'UPDATE_REQUEST_BUY_MATERIAL_SUCCESS';
export const UPDATE_REQUEST_BUY_MATERIAL_FAILED =
  'UPDATE_REQUEST_BUY_MATERIAL_FAILED';

export const DELETE_REQUEST_BUY_MATERIAL_START =
  'DELETE_REQUEST_BUY_MATERIAL_START';
export const DELETE_REQUEST_BUY_MATERIAL_SUCCESS =
  'DELETE_REQUEST_BUY_MATERIAL_SUCCESS';
export const DELETE_REQUEST_BUY_MATERIAL_FAILED =
  'DELETE_REQUEST_BUY_MATERIAL_FAILED';

export const GET_REQUEST_BUY_MATERIAL_DETAILS_START =
  'GET_REQUEST_BUY_MATERIAL_DETAILS_START';
export const GET_REQUEST_BUY_MATERIAL_DETAILS_SUCCESS =
  'GET_REQUEST_BUY_MATERIAL_DETAILS_SUCCESS';
export const GET_REQUEST_BUY_MATERIAL_DETAILS_FAILED =
  'GET_REQUEST_BUY_MATERIAL_DETAILS_FAILED';

export const CONFIRM_REQUEST_BUY_MATERIAL_START =
  'CONFIRM_REQUEST_BUY_MATERIAL_START';
export const CONFIRM_REQUEST_BUY_MATERIAL_SUCCESS =
  'CONFIRM_REQUEST_BUY_MATERIAL_SUCCESS';
export const CONFIRM_REQUEST_BUY_MATERIAL_FAILED =
  'CONFIRM_REQUEST_BUY_MATERIAL_FAILED';

export const PRINT_QR_REQUEST_BUY_MATERIAL_START =
  'PRINT_QR_REQUEST_BUY_MATERIAL_START';
export const PRINT_QR_REQUEST_BUY_MATERIAL_SUCCESS =
  'PRINT_QR_REQUEST_BUY_MATERIAL_SUCCESS';
export const PRINT_QR_REQUEST_BUY_MATERIAL_FAILED =
  'PRINT_QR_REQUEST_BUY_MATERIAL_FAILED';

export const REJECT_REQUEST_BUY_MATERIAL_START = 'REJECT_REQUEST_BUY_MATERIAL_START';
export const REJECT_REQUEST_BUY_MATERIAL_SUCCESS = 'REJECT_REQUEST_BUY_MATERIAL_SUCCESS';
export const REJECT_REQUEST_BUY_MATERIAL_FAILED = 'REJECT_REQUEST_BUY_MATERIAL_FAILED';

/**
 * Search requestBuyMaterial
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchRequestBuyMaterials(payload, onSuccess, onError) {
  return {
    type: SEARCH_REQUEST_BUY_MATERIALS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  };
}

/**
 * Search requestBuyMateriall success action
 * @param {*} payload
 * @returns {object}
 */
export function searchRequestBuyMaterialsSuccess(payload) {
  return {
    type: SEARCH_REQUEST_BUY_MATERIALS_SUCCESS,
    payload: payload,
  };
}

/**
 * Search requestBuyMaterial failed action
 * @returns {object}
 */
export function searchRequestBuyMaterialsFailed() {
  return {
    type: SEARCH_REQUEST_BUY_MATERIALS_FAILED,
  };
}

/**
 * Update requestBuyMaterial
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateRequestBuyMaterial(payload, onSuccess, onError) {
  return {
    type: UPDATE_REQUEST_BUY_MATERIAL_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  };
}
/**
 * Update requestBuyMaterial success action
 * @param {*} payload
 * @returns {object}
 */
export function updateRequestBuyMaterialSuccess(payload) {
  return {
    type: UPDATE_REQUEST_BUY_MATERIAL_SUCCESS,
    payload: payload,
  };
}

/**
 * Update requestBuyMaterial failed action
 * @returns {object}
 */
export function updateRequestBuyMaterialFailed() {
  return {
    type: UPDATE_REQUEST_BUY_MATERIAL_FAILED,
  };
}
/**
 * Delete requestBuyMaterial
 * @param {int} requestBuyMaterialId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteRequestBuyMaterial(
  requestBuyMaterialId,
  onSuccess,
  onError,
) {
  return {
    type: DELETE_REQUEST_BUY_MATERIAL_START,
    payload: requestBuyMaterialId,
    onSuccess: onSuccess,
    onError: onError,
  };
}

/**
 * Delete requestBuyMaterial success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteRequestBuyMaterialSuccess(payload) {
  return {
    type: DELETE_REQUEST_BUY_MATERIAL_SUCCESS,
    payload: payload,
  };
}

/**
 * Delete requestBuyMaterial failed action
 * @returns {object}
 */
export function deleteRequestBuyMaterialFailed() {
  return {
    type: DELETE_REQUEST_BUY_MATERIAL_FAILED,
  };
}

/**
 * Get requestBuyMaterial details
 * @param {int} requestBuyMaterialId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getRequestBuyMaterialDetailsById(
  requestBuyMaterialId,
  onSuccess,
  onError,
) {
  return {
    type: GET_REQUEST_BUY_MATERIAL_DETAILS_START,
    payload: requestBuyMaterialId,
    onSuccess: onSuccess,
    onError: onError,
  };
}

/**
 * Get requestBuyMaterial details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getRequestBuyMaterialDetailsByIdSuccess(payload) {
  return {
    type: GET_REQUEST_BUY_MATERIAL_DETAILS_SUCCESS,
    payload: payload,
  };
}

/**
 * Get requestBuyMaterial details by id failed action
 * @returns {object}
 */
export function getRequestBuyMaterialDetailsByIdFailed() {
  return {
    type: GET_REQUEST_BUY_MATERIAL_DETAILS_FAILED,
  };
}

/**
 * Get confirm production order
 * @param {int} requestBuyMaterialId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function confirmRequestBuyMaterialById(
  requestBuyMaterialId,
  onSuccess,
  onError,
) {
  return {
    type: CONFIRM_REQUEST_BUY_MATERIAL_START,
    payload: requestBuyMaterialId,
    onSuccess: onSuccess,
    onError: onError,
  };
}

/**
 * Get confirm production order by id success action
 * @param {*} payload
 * @returns {object}
 */
export function confirmRequestBuyMaterialByIdSuccess(payload) {
  return {
    type: CONFIRM_REQUEST_BUY_MATERIAL_SUCCESS,
    payload: payload,
  };
}

/**
 * Get confirm production order by id failed action
 * @returns {object}
 */
export function confirmRequestBuyMaterialByIdFailed() {
  return {
    type: CONFIRM_REQUEST_BUY_MATERIAL_FAILED,
  };
}

/**
 * Print QR RequestBuyMaterial
 * @param {int} itemId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function printQRRequestBuyMaterial(itemId, onSuccess, onError) {
  return {
    type: PRINT_QR_REQUEST_BUY_MATERIAL_START,
    payload: itemId,
    onSuccess: onSuccess,
    onError: onError,
  };
}

/**
 * Print QR RequestBuyMaterial by id success action
 * @param {*} payload
 * @returns {object}
 */
export function printQRRequestBuyMaterialSuccess(payload) {
  return {
    type: PRINT_QR_REQUEST_BUY_MATERIAL_SUCCESS,
    payload: payload,
  };
}

/**
 * Print QR RequestBuyMaterial by id failed action
 * @returns {object}
 */
export function printQRRequestBuyMaterialFailed() {
  return {
    type: PRINT_QR_REQUEST_BUY_MATERIAL_FAILED,
  };
}
export function rejectRequestBuyMaterialById(
  purchasedOrderId,
  onSuccess,
  onError,
) {
  return {
    type: REJECT_REQUEST_BUY_MATERIAL_START,
    payload: purchasedOrderId,
    onSuccess: onSuccess,
    onError: onError,
  };
}

/**
 * Get reject purchased order by id success action
 * @param {*} payload
 * @returns {object}
 */
export function rejectRequestBuyMaterialByIdSuccess(payload) {
  return {
    type: REJECT_REQUEST_BUY_MATERIAL_SUCCESS,
    payload: payload,
  };
}

/**
 * Get reject purchased order by id failed action
 * @returns {object}
 */
export function rejectRequestBuyMaterialByIdFailed() {
  return {
    type: REJECT_REQUEST_BUY_MATERIAL_FAILED,
  };
}