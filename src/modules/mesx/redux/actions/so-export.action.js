export const SEARCH_SO_EXPORT_START = 'SEARCH_SO_EXPORT_START';
export const SEARCH_SO_EXPORT_SUCCESS = 'SEARCH_SO_EXPORT_SUCCESS';
export const SEARCH_SO_EXPORT_FAILED = 'SEARCH_SO_EXPORT_FAILED';

export const CREATE_SO_EXPORT_START = 'CREATE_SO_EXPORT_START';
export const CREATE_SO_EXPORT_SUCCESS = 'CREATE_SO_EXPORT_SUCCESS';
export const CREATE_SO_EXPORT_FAILED = 'CREATE_SO_EXPORT_FAILED';

export const UPDATE_SO_EXPORT_START = 'UPDATE_SO_EXPORT_START';
export const UPDATE_SO_EXPORT_SUCCESS = 'UPDATE_SO_EXPORT_SUCCESS';
export const UPDATE_SO_EXPORT_FAILED = 'UPDATE_SO_EXPORT_FAILED';

export const DELETE_SO_EXPORT_START = 'DELETE_SO_EXPORT_START';
export const DELETE_SO_EXPORT_SUCCESS = 'DELETE_SO_EXPORT_SUCCESS';
export const DELETE_SO_EXPORT_FAILED = 'DELETE_SO_EXPORT_FAILED';

export const GET_SO_EXPORT_DETAILS_START = 'GET_SO_EXPORT_DETAILS_START';
export const GET_SO_EXPORT_DETAILS_SUCCESS = 'GET_SO_EXPORT_DETAILS_SUCCESS';
export const GET_SO_EXPORT_DETAILS_FAILED = 'GET_SO_EXPORT_DETAILS_FAILED';

export const CONFIRM_SO_EXPORT_START = 'CONFIRM_SO_EXPORT_START';
export const CONFIRM_SO_EXPORT_SUCCESS = 'CONFIRM_SO_EXPORT_SUCCESS';
export const CONFIRM_SO_EXPORT_FAILED = 'CONFIRM_SO_EXPORT_FAILED';

export const REJECT_SO_EXPORT_START = 'REJECT_SO_EXPORT_START';
export const REJECT_SO_EXPORT_SUCCESS = 'REJECT_SO_EXPORT_SUCCESS';
export const REJECT_SO_EXPORT_FAILED = 'REJECT_SO_EXPORT_FAILED';

/**
 * Search SO export
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchSOExport(payload, onSuccess, onError) {
  return {
    type: SEARCH_SO_EXPORT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  };
}

/**
 * Search SO export success action
 * @param {*} payload
 * @returns {object}
 */
export function searchSOExportSuccess(payload) {
  return {
    type: SEARCH_SO_EXPORT_SUCCESS,
    payload: payload,
  };
}

/**
 * Search SO export failed action
 * @returns {object}
 */
export function searchSOExportFailed() {
  return {
    type: SEARCH_SO_EXPORT_FAILED,
  };
}
/**
 * Create SOExport
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createSOExport(payload, onSuccess, onError) {
  return {
    type: CREATE_SO_EXPORT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  };
}

/**
 * Create SOExport success action
 * @param {*} payload
 * @returns {object}
 */
export function createSOExportSuccess(payload) {
  return {
    type: CREATE_SO_EXPORT_SUCCESS,
    payload: payload,
  };
}

/**
 * Create SOExport failed action
 * @returns {object}
 */
export function createSOExportFailed() {
  return {
    type: CREATE_SO_EXPORT_FAILED,
  };
}

/**
 * Update SOExport
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateSOExport(payload, onSuccess, onError) {
  return {
    type: UPDATE_SO_EXPORT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  };
}
/**
 * Update SOExport success action
 * @param {*} payload
 * @returns {object}
 */
export function updateSOExportSuccess(payload) {
  return {
    type: UPDATE_SO_EXPORT_SUCCESS,
    payload: payload,
  };
}

/**
 * Update SOExport failed action
 * @returns {object}
 */
export function updateSOExportFailed() {
  return {
    type: UPDATE_SO_EXPORT_FAILED,
  };
}
/**
 * Delete SOExport
 * @param {int} SOExportId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteSOExport(SOExportId, onSuccess, onError) {
  return {
    type: DELETE_SO_EXPORT_START,
    payload: SOExportId,
    onSuccess: onSuccess,
    onError: onError,
  };
}

/**
 * Delete SOExport success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteSOExportSuccess(payload) {
  return {
    type: DELETE_SO_EXPORT_SUCCESS,
    payload: payload,
  };
}

/**
 * Delete SOExport failed action
 * @returns {object}
 */
export function deleteSOExportFailed() {
  return {
    type: DELETE_SO_EXPORT_FAILED,
  };
}

/**
 * Get SOExport details
 * @param {int} SOExportId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getSOExportDetailsById(SOExportId, onSuccess, onError) {
  return {
    type: GET_SO_EXPORT_DETAILS_START,
    payload: SOExportId,
    onSuccess: onSuccess,
    onError: onError,
  };
}

/**
 * Get SOExport details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getSOExportDetailsByIdSuccess(payload) {
  return {
    type: GET_SO_EXPORT_DETAILS_SUCCESS,
    payload: payload,
  };
}

/**
 * Get SOExport details by id failed action
 * @returns {object}
 */
export function getSOExportDetailsByIdFailed() {
  return {
    type: GET_SO_EXPORT_DETAILS_FAILED,
  };
}

/**
 * Get confirm Sale order
 * @param {int} SOExportId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function confirmSOExportById(SOExportId, onSuccess, onError) {
  return {
    type: CONFIRM_SO_EXPORT_START,
    payload: SOExportId,
    onSuccess: onSuccess,
    onError: onError,
  };
}

/**
 * Get confirm Sale order by id success action
 * @param {*} payload
 * @returns {object}
 */
export function confirmSOExportByIdSuccess(payload) {
  return {
    type: CONFIRM_SO_EXPORT_SUCCESS,
    payload: payload,
  };
}

/**
 * Get confirm Sale order by id failed action
 * @returns {object}
 */
export function confirmSOExportByIdFailed() {
  return {
    type: CONFIRM_SO_EXPORT_FAILED,
  };
}

/**
 * Get reject Sale order
 * @param {int} SOExportId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function rejectSOExportById(SOExportId, onSuccess, onError) {
  return {
    type: REJECT_SO_EXPORT_START,
    payload: SOExportId,
    onSuccess: onSuccess,
    onError: onError,
  };
}

/**
 * Get reject Sale order by id success action
 * @param {*} payload
 * @returns {object}
 */
export function rejectSOExportByIdSuccess(payload) {
  return {
    type: REJECT_SO_EXPORT_SUCCESS,
    payload: payload,
  };
}

/**
 * Get reject Sale order by id failed action
 * @returns {object}
 */
export function rejectSOExportByIdFailed() {
  return {
    type: REJECT_SO_EXPORT_FAILED,
  };
}
