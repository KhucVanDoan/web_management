export const WMSX_SEARCH_INVOICE_TYPES_START = 'WMSX_SEARCH_INVOICE_TYPES_START'
export const WMSX_SEARCH_INVOICE_TYPES_SUCCESS =
  'WMSX_SEARCH_INVOICE_TYPES_SUCCESS'
export const WMSX_SEARCH_INVOICE_TYPES_FAILED =
  'WMSX_SEARCH_INVOICE_TYPES_FAILED'

export const WMSX_CREATE_INVOICE_TYPE_START = 'WMSX_CREATE_INVOICE_TYPE_START'
export const WMSX_CREATE_INVOICE_TYPE_SUCCESS =
  'WMSX_CREATE_INVOICE_TYPE_SUCCESS'
export const WMSX_CREATE_INVOICE_TYPE_FAILED = 'WMSX_CREATE_INVOICE_TYPE_FAILED'

export const WMSX_UPDATE_INVOICE_TYPE_START = 'WMSX_UPDATE_INVOICE_TYPE_START'
export const WMSX_UPDATE_INVOICE_TYPE_SUCCESS =
  'WMSX_UPDATE_INVOICE_TYPE_SUCCESS'
export const WMSX_UPDATE_INVOICE_TYPE_FAILED = 'WMSX_UPDATE_INVOICE_TYPE_FAILED'

export const WMSX_DELETE_INVOICE_TYPE_START = 'WMSX_DELETE_INVOICE_TYPE_START'
export const WMSX_DELETE_INVOICE_TYPE_SUCCESS =
  'WMSX_DELETE_INVOICE_TYPE_SUCCESS'
export const WMSX_DELETE_INVOICE_TYPE_FAILED = 'WMSX_DELETE_INVOICE_TYPE_FAILED'

export const WMSX_GET_INVOICE_TYPE_DETAIL_START =
  'WMSX_GET_INVOICE_TYPE_DETAIL_START'
export const WMSX_GET_INVOICE_TYPE_DETAIL_SUCCESS =
  'WMSX_GET_INVOICE_TYPE_DETAIL_SUCCESS'
export const WMSX_GET_INVOICE_TYPE_DETAIL_FAILED =
  'WMSX_GET_INVOICE_TYPE_DETAIL_FAILED'

export const WMSX_CONFIRM_INVOICE_TYPE_SUCCESS =
  'WMSX_CONFIRM_INVOICE_TYPE_SUCCESS'
export const WMSX_CONFIRM_INVOICE_TYPE_START = 'WMSX_CONFIRM_INVOICE_TYPE_START'
export const WMSX_CONFIRM_INVOICE_TYPE_FAILED =
  'WMSX_CONFIRM_INVOICE_TYPE_FAILED'

export const WMSX_REJECT_INVOICE_TYPE_SUCCESS =
  'WMSX_REJECT_INVOICE_TYPE_SUCCESS'
export const WMSX_REJECT_INVOICE_TYPE_START = 'WMSX_REJECT_INVOICE_TYPE_START'
export const WMSX_REJECT_INVOICE_TYPE_FAILED = 'WMSX_REJECT_INVOICE_TYPE_FAILED'

export const WMSX_IMPORT_INVOICE_TYPE_START = 'WMSX_IMPORT_INVOICE_TYPE_START'
export const WMSX_IMPORT_INVOICE_TYPE_SUCCESS =
  'WMSX_IMPORT_INVOICE_TYPE_SUCCESS'
export const WMSX_IMPORT_INVOICE_TYPE_FAILED = 'WMSX_IMPORT_INVOICE_TYPE_FAILED'

export const WMSX_RESET_INVOICE_TYPE_DETAIL = 'WMSX_RESET_INVOICE_TYPE_DETAIL'

/**
 * Search invoice types
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchInvoiceTypes(payload, onSuccess, onError) {
  return {
    type: WMSX_SEARCH_INVOICE_TYPES_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search invoice types success action
 * @param {*} payload
 * @returns {object}
 */
export function searchInvoiceTypesSuccess(payload) {
  return {
    type: WMSX_SEARCH_INVOICE_TYPES_SUCCESS,
    payload: payload,
  }
}

/**
 * Search invoice types failed action
 * @returns {object}
 */
export function searchInvoiceTypesFailed() {
  return {
    type: WMSX_SEARCH_INVOICE_TYPES_FAILED,
  }
}

export function getInvoiceTypeDetailById(invoiceTypeId, onSuccess, onError) {
  return {
    type: WMSX_GET_INVOICE_TYPE_DETAIL_START,
    payload: invoiceTypeId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get invoice type details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getInvoiceTypeDetailByIdSuccess(payload) {
  return {
    type: WMSX_GET_INVOICE_TYPE_DETAIL_SUCCESS,
    payload: payload,
  }
}

/**
 * Get invoice type details by id failed action
 * @returns {object}
 */
export function getInvoiceTypeDetailByIdFailed() {
  return {
    type: WMSX_GET_INVOICE_TYPE_DETAIL_FAILED,
  }
}

/**
 * Create invoice type
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createInvoiceType(payload, onSuccess, onError) {
  return {
    type: WMSX_CREATE_INVOICE_TYPE_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Create invoice type success action
 * @param {*} payload
 * @returns {object}
 */
export function createInvoiceTypeSuccess(payload) {
  return {
    type: WMSX_CREATE_INVOICE_TYPE_SUCCESS,
    payload: payload,
  }
}

/**
 * Create invoice type failed action
 * @returns {object}
 */
export function createInvoiceTypeFailed() {
  return {
    type: WMSX_CREATE_INVOICE_TYPE_FAILED,
  }
}

/**
 * Update invoice type
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateInvoiceType(payload, onSuccess, onError) {
  return {
    type: WMSX_UPDATE_INVOICE_TYPE_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Update invoice type success action
 * @param {*} payload
 * @returns {object}
 */
export function updateInvoiceTypeSuccess(payload) {
  return {
    type: WMSX_UPDATE_INVOICE_TYPE_SUCCESS,
    payload: payload,
  }
}

/**
 * Update invoice type failed action
 * @returns {object}
 */
export function updateInvoiceTypeFailed() {
  return {
    type: WMSX_UPDATE_INVOICE_TYPE_FAILED,
  }
}

/**
 * Delete invoice type
 * @param {int} invoiceTypeId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteInvoiceType(invoiceTypeId, onSuccess, onError) {
  return {
    type: WMSX_DELETE_INVOICE_TYPE_START,
    payload: invoiceTypeId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete invoice type success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteInvoiceTypeSuccess(payload) {
  return {
    type: WMSX_DELETE_INVOICE_TYPE_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete invoice type failed action
 * @returns {object}
 */
export function deleteInvoiceTypeFailed() {
  return {
    type: WMSX_DELETE_INVOICE_TYPE_FAILED,
  }
}

export function confirmInvoiceTypeById(invoiceTypeId, onSuccess, onError) {
  return {
    type: WMSX_CONFIRM_INVOICE_TYPE_START,
    payload: invoiceTypeId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get confirm invoice type by id success action
 * @param {*} payload
 * @returns {object}
 */
export function confirmInvoiceTypeByIdSuccess(payload) {
  return {
    type: WMSX_CONFIRM_INVOICE_TYPE_SUCCESS,
    payload: payload,
  }
}

/**
 * Get confirm invoice type by id failed action
 * @returns {object}
 */
export function confirmInvoiceTypeByIdFailed() {
  return {
    type: WMSX_CONFIRM_INVOICE_TYPE_FAILED,
  }
}

export function rejectInvoiceTypeById(invoiceTypeId, onSuccess, onError) {
  return {
    type: WMSX_REJECT_INVOICE_TYPE_START,
    payload: invoiceTypeId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get reject invoice type by id success action
 * @param {*} payload
 * @returns {object}
 */
export function rejectInvoiceTypeByIdSuccess(payload) {
  return {
    type: WMSX_REJECT_INVOICE_TYPE_SUCCESS,
    payload: payload,
  }
}

/**
 * Get reject invoice type by id failed action
 * @returns {object}
 */
export function rejectInvoiceTypeByIdFailed() {
  return {
    type: WMSX_REJECT_INVOICE_TYPE_FAILED,
  }
}

/**
 * import invoice type
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function importInvoiceType(payload, onSuccess, onError) {
  return {
    type: WMSX_IMPORT_INVOICE_TYPE_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * import invoice type success
 * @param {*} payload
 * @returns {object}
 */
export function importInvoiceTypeSuccess(payload) {
  return {
    type: WMSX_IMPORT_INVOICE_TYPE_SUCCESS,
    payload: payload,
  }
}

/**
 * import invoice type failed
 * @returns {object}
 */
export function importInvoiceTypeFailed() {
  return {
    type: WMSX_IMPORT_INVOICE_TYPE_FAILED,
  }
}

export function resetInvoiceTypeDetail() {
  return {
    type: WMSX_RESET_INVOICE_TYPE_DETAIL,
  }
}

export default {
  createInvoiceType,
  createInvoiceTypeSuccess,
  createInvoiceTypeFailed,
  searchInvoiceTypes,
  searchInvoiceTypesSuccess,
  searchInvoiceTypesFailed,
  deleteInvoiceType,
  deleteInvoiceTypeSuccess,
  deleteInvoiceTypeFailed,
  getInvoiceTypeDetailById,
  getInvoiceTypeDetailByIdSuccess,
  getInvoiceTypeDetailByIdFailed,
  confirmInvoiceTypeById,
  confirmInvoiceTypeByIdSuccess,
  confirmInvoiceTypeByIdFailed,
  rejectInvoiceTypeById,
  rejectInvoiceTypeByIdSuccess,
  rejectInvoiceTypeByIdFailed,
  resetInvoiceTypeDetail,
  updateInvoiceType,
  updateInvoiceTypeSuccess,
  updateInvoiceTypeFailed,
}
