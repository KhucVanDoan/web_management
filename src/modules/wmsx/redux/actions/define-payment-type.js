export const SEARCH_PAYMENT_TYPES_START = 'WMSX_SEARCH_PAYMENT_TYPES_START'
export const SEARCH_PAYMENT_TYPES_SUCCESS = 'WMSX_SEARCH_PAYMENT_TYPES_SUCCESS'
export const SEARCH_PAYMENT_TYPES_FAILED = 'WMSX_SEARCH_PAYMENT_TYPES_FAILED'

export const CREATE_PAYMENT_TYPE_START = 'WMSX_CREATE_PAYMENT_TYPE_START'
export const CREATE_PAYMENT_TYPE_SUCCESS = 'WMSX_CREATE_PAYMENT_TYPE_SUCCESS'
export const CREATE_PAYMENT_TYPE_FAILED = 'WMSX_CREATE_PAYMENT_TYPE_FAILED'

export const UPDATE_PAYMENT_TYPE_START = 'WMSX_UPDATE_PAYMENT_TYPE_START'
export const UPDATE_PAYMENT_TYPE_SUCCESS = 'WMSX_UPDATE_PAYMENT_TYPE_SUCCESS'
export const UPDATE_PAYMENT_TYPE_FAILED = 'WMSX_UPDATE_PAYMENT_TYPE_FAILED'

export const DELETE_PAYMENT_TYPE_START = 'WMSX_DELETE_PAYMENT_TYPE_START'
export const DELETE_PAYMENT_TYPE_SUCCESS = 'WMSX_DELETE_PAYMENT_TYPE_SUCCESS'
export const DELETE_PAYMENT_TYPE_FAILED = 'WMSX_DELETE_PAYMENT_TYPE_FAILED'

export const GET_PAYMENT_TYPE_DETAILS_START =
  'WMSX_GET_PAYMENT_TYPE_DETAILS_START'
export const GET_PAYMENT_TYPE_DETAILS_SUCCESS =
  'WMSX_GET_PAYMENT_TYPE_DETAILS_SUCCESS'
export const GET_PAYMENT_TYPE_DETAILS_FAILED =
  'WMSX_GET_PAYMENT_TYPE_DETAILS_FAILED'

export const CONFIRM_PAYMENT_TYPE_START = 'WMSX_CONFIRM_PAYMENT_TYPE_START'
export const CONFIRM_PAYMENT_TYPE_SUCCESS = 'WMSX_CONFIRM_PAYMENT_TYPE_SUCCESS'
export const CONFIRM_PAYMENT_TYPE_FAILED = 'WMSX_CONFIRM_PAYMENT_TYPE_FAILED'

export const REJECT_PAYMENT_TYPE_START = 'WMSX_REJECT_PAYMENT_TYPE_START'
export const REJECT_PAYMENT_TYPE_SUCCESS = 'WMSX_REJECT_PAYMENT_TYPE_SUCCESS'
export const REJECT_PAYMENT_TYPE_FAILED = 'WMSX_REJECT_PAYMENT_TYPE_FAILED'

export const IMPORT_PAYMENT_TYPE_START = 'WMSX_IMPORT_PAYMENT_TYPE_START'
export const IMPORT_PAYMENT_TYPE_SUCCESS = 'WMSX_IMPORT_PAYMENT_TYPE_SUCCESS'
export const IMPORT_PAYMENT_TYPE_FAILED = 'WMSX_IMPORT_PAYMENT_TYPE_FAILED'
export const RESET_STATE_PAYMENT_TYPE = 'WMSX_RESET_STATE_PAYMENT_TYPE'
/**
 * Search PaymentType
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchPaymentTypes(payload, onSuccess, onError) {
  return {
    type: SEARCH_PAYMENT_TYPES_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search PaymentType success action
 * @param {*} payload
 * @returns {object}
 */
export function searchPaymentTypesSuccess(payload) {
  return {
    type: SEARCH_PAYMENT_TYPES_SUCCESS,
    payload: payload,
  }
}

/**
 * Search PaymentType failed action
 * @returns {object}
 */
export function searchPaymentTypesFailed() {
  return {
    type: SEARCH_PAYMENT_TYPES_FAILED,
  }
}

/**
 * Create PaymentType
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createPaymentType(payload, onSuccess, onError) {
  return {
    type: CREATE_PAYMENT_TYPE_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Create PaymentType success action
 * @param {*} payload
 * @returns {object}
 */
export function createPaymentTypeSuccess(payload) {
  return {
    type: CREATE_PAYMENT_TYPE_SUCCESS,
    payload: payload,
  }
}

/**
 * Create PaymentType failed action
 * @returns {object}
 */
export function createPaymentTypeFailed() {
  return {
    type: CREATE_PAYMENT_TYPE_FAILED,
  }
}

/**
 * Update PaymentType
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updatePaymentType(payload, onSuccess, onError) {
  return {
    type: UPDATE_PAYMENT_TYPE_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Update PaymentType success action
 * @param {*} payload
 * @returns {object}
 */
export function updatePaymentTypeSuccess(payload) {
  return {
    type: UPDATE_PAYMENT_TYPE_SUCCESS,
    payload: payload,
  }
}

/**
 * Update PaymentType failed action
 * @returns {object}
 */
export function updatePaymentTypeFailed() {
  return {
    type: UPDATE_PAYMENT_TYPE_FAILED,
  }
}
/**
 * Delete PaymentType
 * @param {int} PaymentTypeId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deletePaymentType(PaymentTypeId, onSuccess, onError) {
  return {
    type: DELETE_PAYMENT_TYPE_START,
    payload: PaymentTypeId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete PaymentType success action
 * @param {*} payload
 * @returns {object}
 */
export function deletePaymentTypeSuccess(payload) {
  return {
    type: DELETE_PAYMENT_TYPE_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete PaymentType failed action
 * @returns {object}
 */
export function deletePaymentTypeFailed() {
  return {
    type: DELETE_PAYMENT_TYPE_FAILED,
  }
}

/**
 * Get PaymentType details
 * @param {int} PaymentTypeId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getPaymentTypeDetailsById(PaymentTypeId, onSuccess, onError) {
  return {
    type: GET_PAYMENT_TYPE_DETAILS_START,
    payload: PaymentTypeId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get PaymentType details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getPaymentTypeDetailsByIdSuccess(payload) {
  return {
    type: GET_PAYMENT_TYPE_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get PaymentType details by id failed action
 * @returns {object}
 */
export function getPaymentTypeDetailsByIdFailed() {
  return {
    type: GET_PAYMENT_TYPE_DETAILS_FAILED,
  }
}

/**
 * Get confirm production order
 * @param {int} PaymentTypeId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function confirmPaymentTypeById(PaymentTypeId, onSuccess, onError) {
  return {
    type: CONFIRM_PAYMENT_TYPE_START,
    payload: PaymentTypeId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get confirm production order by id success action
 * @param {*} payload
 * @returns {object}
 */
export function confirmPaymentTypeByIdSuccess(payload) {
  return {
    type: CONFIRM_PAYMENT_TYPE_SUCCESS,
    payload: payload,
  }
}

/**
 * Get confirm production order by id failed action
 * @returns {object}
 */
export function confirmPaymentTypeByIdFailed() {
  return {
    type: CONFIRM_PAYMENT_TYPE_FAILED,
  }
}

/**
 * Get reject production order
 * @param {int} PaymentTypeId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function rejectPaymentTypeById(PaymentTypeId, onSuccess, onError) {
  return {
    type: REJECT_PAYMENT_TYPE_START,
    payload: PaymentTypeId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get reject production order by id success action
 * @param {*} payload
 * @returns {object}
 */
export function rejectPaymentTypeByIdSuccess(payload) {
  return {
    type: REJECT_PAYMENT_TYPE_SUCCESS,
    payload: payload,
  }
}

/**
 * Get reject production order by id failed action
 * @returns {object}
 */
export function rejectPaymentTypeByIdFailed() {
  return {
    type: REJECT_PAYMENT_TYPE_FAILED,
  }
}

/**
 * import payment type
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function importPaymentType(payload, onSuccess, onError) {
  return {
    type: IMPORT_PAYMENT_TYPE_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * import payment type success
 * @param {*} payload
 * @returns {object}
 */
export function importPaymentTypeSuccess(payload) {
  return {
    type: IMPORT_PAYMENT_TYPE_SUCCESS,
    payload: payload,
  }
}

/**
 * import payment type failed
 * @returns {object}
 */
export function importPaymentTypeFailed() {
  return {
    type: IMPORT_PAYMENT_TYPE_FAILED,
  }
}
export function resetStatePaymentType() {
  return {
    type: RESET_STATE_PAYMENT_TYPE,
  }
}
export default {
  searchPaymentTypes,
  searchPaymentTypesSuccess,
  searchPaymentTypesFailed,
  createPaymentType,
  createPaymentTypeSuccess,
  createPaymentTypeFailed,
  updatePaymentType,
  updatePaymentTypeSuccess,
  updatePaymentTypeFailed,
  getPaymentTypeDetailsById,
  getPaymentTypeDetailsByIdSuccess,
  getPaymentTypeDetailsByIdFailed,
  deletePaymentType,
  deletePaymentTypeSuccess,
  deletePaymentTypeFailed,
  confirmPaymentTypeById,
  confirmPaymentTypeByIdSuccess,
  confirmPaymentTypeByIdFailed,
  rejectPaymentTypeById,
  rejectPaymentTypeByIdSuccess,
  rejectPaymentTypeByIdFailed,
  importPaymentType,
  importPaymentTypeSuccess,
  importPaymentTypeFailed,
  resetStatePaymentType,
}
