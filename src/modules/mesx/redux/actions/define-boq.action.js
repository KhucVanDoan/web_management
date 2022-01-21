export const SEARCH_BOQ_START = 'SEARCH_BOQ_START';
export const SEARCH_BOQ_SUCCESS = 'SEARCH_BOQ_SUCCESS';
export const SEARCH_BOQ_FAILED = 'SEARCH_BOQ_FAILED';

export const CREATE_BOQ_START = 'CREATE_BOQ_START';
export const CREATE_BOQ_SUCCESS = 'CREATE_BOQ_SUCCESS';
export const CREATE_BOQ_FAILED = 'CREATE_BOQ_FAILED';

export const UPDATE_BOQ_START = 'UPDATE_BOQ_START';
export const UPDATE_BOQ_SUCCESS = 'UPDATE_BOQ_SUCCESS';
export const UPDATE_BOQ_FAILED = 'UPDATE_BOQ_FAILED';

export const DELETE_BOQ_START = 'DELETE_BOQ_START';
export const DELETE_BOQ_SUCCESS = 'DELETE_BOQ_SUCCESS';
export const DELETE_BOQ_FAILED = 'DELETE_BOQ_FAILED';

export const GET_BOQ_DETAILS_START = 'GET_BOQ_DETAILS_START';
export const GET_BOQ_DETAILS_SUCCESS = 'GET_BOQ_DETAILS_SUCCESS';
export const GET_BOQ_DETAILS_FAILED = 'GET_BOQ_DETAILS_FAILED';

export const CONFIRM_BOQ_START = 'CONFIRM_BOQ_START';
export const CONFIRM_BOQ_SUCCESS = 'CONFIRM_BOQ_SUCCESS';
export const CONFIRM_BOQ_FAILED = 'CONFIRM_BOQ_FAILED';

export const REJECT_BOQ_START = 'REJECT_BOQ_START';
export const REJECT_BOQ_SUCCESS = 'REJECT_BOQ_SUCCESS';
export const REJECT_BOQ_FAILED = 'REJECT_BOQ_FAILED';

/**
 * Search BOQ
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchBOQ(payload, onSuccess, onError) {
  return {
    type: SEARCH_BOQ_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  };
}

/**
 * Search BOQ success action
 * @param {*} payload
 * @returns {object}
 */
export function searchBOQSuccess(payload) {
  return {
    type: SEARCH_BOQ_SUCCESS,
    payload: payload,
  };
}

/**
 * Search BOQ failed action
 * @returns {object}
 */
export function searchBOQFailed() {
  return {
    type: SEARCH_BOQ_FAILED,
  };
}

/**
 * Create BOQ
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createBOQ(payload, onSuccess, onError) {
  return {
    type: CREATE_BOQ_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  };
}

/**
 * Create BOQ success action
 * @param {*} payload
 * @returns {object}
 */
export function createBOQSuccess(payload) {
  return {
    type: CREATE_BOQ_SUCCESS,
    payload: payload,
  };
}

/**
 * Create BOQ failed action
 * @returns {object}
 */
export function createBOQFailed() {
  return {
    type: CREATE_BOQ_FAILED,
  };
}

/**
 * Update BOQ
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateBOQ(payload, onSuccess, onError) {
  return {
    type: UPDATE_BOQ_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  };
}
/**
 * Update BOQ success action
 * @param {*} payload
 * @returns {object}
 */
export function updateBOQSuccess(payload) {
  return {
    type: UPDATE_BOQ_SUCCESS,
    payload: payload,
  };
}

/**
 * Update BOQ failed action
 * @returns {object}
 */
export function updateBOQFailed() {
  return {
    type: UPDATE_BOQ_FAILED,
  };
}
/**
 * Delete BOQ
 * @param {int} BOQId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteBOQ(BOQId, onSuccess, onError) {
  return {
    type: DELETE_BOQ_START,
    payload: BOQId,
    onSuccess: onSuccess,
    onError: onError,
  };
}

/**
 * Delete BOQ success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteBOQSuccess(payload) {
  return {
    type: DELETE_BOQ_SUCCESS,
    payload: payload,
  };
}

/**
 * Delete BOQ failed action
 * @returns {object}
 */
export function deleteBOQFailed() {
  return {
    type: DELETE_BOQ_FAILED,
  };
}

/**
 * Get BOQ details
 * @param {int} BOQId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getBOQDetailsById(BOQId, onSuccess, onError) {
  return {
    type: GET_BOQ_DETAILS_START,
    payload: BOQId,
    onSuccess: onSuccess,
    onError: onError,
  };
}

/**
 * Get BOQ details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getBOQDetailsByIdSuccess(payload) {
  return {
    type: GET_BOQ_DETAILS_SUCCESS,
    payload: payload,
  };
}

/**
 * Get BOQ details by id failed action
 * @returns {object}
 */
export function getBOQDetailsByIdFailed() {
  return {
    type: GET_BOQ_DETAILS_FAILED,
  };
}

/**
 * Get confirm BOQ
 * @param {int} BOQId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function confirmBOQById(BOQId, onSuccess, onError) {
  return {
    type: CONFIRM_BOQ_START,
    payload: BOQId,
    onSuccess: onSuccess,
    onError: onError,
  };
}

/**
 * Get confirm BOQ by id success action
 * @param {*} payload
 * @returns {object}
 */
export function confirmBOQByIdSuccess(payload) {
  return {
    type: CONFIRM_BOQ_SUCCESS,
    payload: payload,
  };
}

/**
 * Get confirm BOQ by id failed action
 * @returns {object}
 */
export function confirmBOQByIdFailed() {
  return {
    type: CONFIRM_BOQ_FAILED,
  };
}

/**
 * Get reject BOQ
 * @param {int} BOQId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function rejectBOQById(BOQId, onSuccess, onError) {
  return {
    type: REJECT_BOQ_START,
    payload: BOQId,
    onSuccess: onSuccess,
    onError: onError,
  };
}

/**
 * Get reject BOQ by id success action
 * @param {*} payload
 * @returns {object}
 */
export function rejectBOQByIdSuccess(payload) {
  return {
    type: REJECT_BOQ_SUCCESS,
    payload: payload,
  };
}

/**
 * Get reject BOQ by id failed action
 * @returns {object}
 */
export function rejectBOQByIdFailed() {
  return {
    type: REJECT_BOQ_FAILED,
  };
}
