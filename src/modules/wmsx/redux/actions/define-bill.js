export const WMSX_SEARCH_BILL_START = 'WMSX_SEARCH_BILL_START'
export const WMSX_SEARCH_BILL_SUCCESS = 'WMSX_SEARCH_BILL_SUCCESS'
export const WMSX_SEARCH_BILL_FAILED = 'WMSX_SEARCH_BILL_FAILED'

export const WMSX_CREATE_BILL_START = 'WMSX_CREATE_BILL_START'
export const WMSX_CREATE_BILL_SUCCESS = 'WMSX_CREATE_BILL_SUCCESS'
export const WMSX_CREATE_BILL_FAILED = 'WMSX_CREATE_BILL_FAILED'

export const WMSX_UPDATE_BILL_START = 'WMSX_UPDATE_BILL_START'
export const WMSX_UPDATE_BILL_SUCCESS = 'WMSX_UPDATE_BILL_SUCCESS'
export const WMSX_UPDATE_BILL_FAILED = 'WMSX_UPDATE_BILL_FAILED'

export const WMSX_DELETE_BILL_START = 'WMSX_DELETE_BILL_START'
export const WMSX_DELETE_BILL_SUCCESS = 'WMSX_DELETE_BILL_SUCCESS'
export const WMSX_DELETE_BILL_FAILED = 'WMSX_DELETE_BILL_FAILED'

export const WMSX_GET_BILL_DETAILS_START = 'WMSX_GET_BILL_DETAILS_START'
export const WMSX_GET_BILL_DETAILS_SUCCESS = 'WMSX_GET_BILL_DETAILS_SUCCESS'
export const WMSX_GET_BILL_DETAILS_FAILED = 'WMSX_GET_BILL_DETAILS_FAILED'

export const WMSX_CONFIRM_BILL_START = 'WMSX_CONFIRM_BILL_START'
export const WMSX_CONFIRM_BILL_SUCCESS = 'WMSX_CONFIRM_BILL_SUCCESS'
export const WMSX_CONFIRM_BILL_FAILED = 'WMSX_CONFIRM_BILL_FAILED'

export const WMSX_REJECT_BILL_START = 'WMSX_REJECT_BILL_START'
export const WMSX_REJECT_BILL_SUCCESS = 'WMSX_REJECT_BILL_SUCCESS'
export const WMSX_REJECT_BILL_FAILED = 'WMSX_REJECT_BILL_FAILED'

export const WMSX_IMPORT_BILL_START = 'WMSX_IMPORT_BILL_START'
export const WMSX_IMPORT_BILL_SUCCESS = 'WMSX_IMPORT_BILL_SUCCESS'
export const WMSX_IMPORT_BILL_FAILED = 'WMSX_IMPORT_BILL_FAILED'

export const WMSX_COMPLETE_BILL_START = 'WMSX_COMPLETE_BILL_START'
export const WMSX_COMPLETE_BILL_SUCCESS = 'WMSX_COMPLETE_BILL_SUCCESS'
export const WMSX_COMPLETE_BILL_FAILED = 'WMSX_COMPLETE_BILL_FAILED'

export const WMSX_RESET_BILL_DETAIL_STATE = 'WMSX_RESET_BILL_DETAIL_STATE'

/**
 * Search bill
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchBills(payload, onSuccess, onError) {
  return {
    type: WMSX_SEARCH_BILL_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search bill success action
 * @param {*} payload
 * @returns {object}
 */
export function searchBillsSuccess(payload) {
  return {
    type: WMSX_SEARCH_BILL_SUCCESS,
    payload: payload,
  }
}

/**
 * Search bill failed action
 * @returns {object}
 */
export function searchBillsFailed() {
  return {
    type: WMSX_SEARCH_BILL_FAILED,
  }
}

/**
 * Create bill
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createBill(payload, onSuccess, onError) {
  return {
    type: WMSX_CREATE_BILL_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Create bill success action
 * @param {*} payload
 * @returns {object}
 */
export function createBillSuccess(payload) {
  return {
    type: WMSX_CREATE_BILL_SUCCESS,
    payload: payload,
  }
}

/**
 * Create bill failed action
 * @returns {object}
 */
export function createBillFailed() {
  return {
    type: WMSX_CREATE_BILL_FAILED,
  }
}

/**
 * Update bill
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateBill(payload, onSuccess, onError) {
  return {
    type: WMSX_UPDATE_BILL_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Update bill success action
 * @param {*} payload
 * @returns {object}
 */
export function updateBillSuccess(payload) {
  return {
    type: WMSX_UPDATE_BILL_SUCCESS,
    payload: payload,
  }
}

/**
 * Update bill failed action
 * @returns {object}
 */
export function updateBillFailed() {
  return {
    type: WMSX_UPDATE_BILL_FAILED,
  }
}
/**
 * Delete bill
 * @param {int} billId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteBill(billId, onSuccess, onError) {
  return {
    type: WMSX_DELETE_BILL_START,
    payload: billId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete bill success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteBillSuccess(payload) {
  return {
    type: WMSX_DELETE_BILL_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete bill failed action
 * @returns {object}
 */
export function deleteBillFailed() {
  return {
    type: WMSX_DELETE_BILL_FAILED,
  }
}

/**
 * Get bill details
 * @param {int} billId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getBillDetailsById(billId, onSuccess, onError) {
  return {
    type: WMSX_GET_BILL_DETAILS_START,
    payload: billId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get bill details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getBillDetailsByIdSuccess(payload) {
  return {
    type: WMSX_GET_BILL_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get bill details by id failed action
 * @returns {object}
 */
export function getBillDetailsByIdFailed() {
  return {
    type: WMSX_GET_BILL_DETAILS_FAILED,
  }
}

/**
 * Confirm bill
 * @param {int} billId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function confirmBillById(billId, onSuccess, onError) {
  return {
    type: WMSX_CONFIRM_BILL_START,
    payload: billId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Confirm bill by id success action
 * @param {*} payload
 * @returns {object}
 */
export function confirmBillByIdSuccess(payload) {
  return {
    type: WMSX_CONFIRM_BILL_SUCCESS,
    payload: payload,
  }
}

/**
 * Confirm bill by id failed action
 * @returns {object}
 */
export function confirmBillByIdFailed() {
  return {
    type: WMSX_CONFIRM_BILL_FAILED,
  }
}

/**
 * Get reject bill
 * @param {int} billId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function rejectBillById(billId, onSuccess, onError) {
  return {
    type: WMSX_REJECT_BILL_START,
    payload: billId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get reject bill by id success action
 * @param {*} payload
 * @returns {object}
 */
export function rejectBillByIdSuccess(payload) {
  return {
    type: WMSX_REJECT_BILL_SUCCESS,
    payload: payload,
  }
}

/**
 * Get reject bill by id failed action
 * @returns {object}
 */
export function rejectBillByIdFailed() {
  return {
    type: WMSX_REJECT_BILL_FAILED,
  }
}

/**
 * import bill
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function importBill(payload, onSuccess, onError) {
  return {
    type: WMSX_IMPORT_BILL_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * import bill success
 * @param {*} payload
 * @returns {object}
 */
export function importBillSuccess(payload) {
  return {
    type: WMSX_IMPORT_BILL_SUCCESS,
    payload: payload,
  }
}

/**
 * import bill failed
 * @returns {object}
 */
export function importBillFailed() {
  return {
    type: WMSX_IMPORT_BILL_FAILED,
  }
}

/**
 * Complete bill
 * @param {int} billId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function completeBillById(billId, onSuccess, onError) {
  return {
    type: WMSX_COMPLETE_BILL_START,
    payload: billId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Complete bill by id success action
 * @param {*} payload
 * @returns {object}
 */
export function completeBillByIdSuccess(payload) {
  return {
    type: WMSX_COMPLETE_BILL_SUCCESS,
    payload: payload,
  }
}

/**
 * Complete bill by id failed action
 * @returns {object}
 */
export function completeBillByIdFailed() {
  return {
    type: WMSX_COMPLETE_BILL_FAILED,
  }
}

export function resetBillState() {
  return {
    type: WMSX_RESET_BILL_DETAIL_STATE,
  }
}

export default {
  searchBills,
  searchBillsSuccess,
  searchBillsFailed,
  getBillDetailsById,
  getBillDetailsByIdSuccess,
  getBillDetailsByIdFailed,
  completeBillById,
  completeBillByIdFailed,
  completeBillByIdSuccess,
  createBill,
  createBillSuccess,
  createBillFailed,
  updateBill,
  updateBillSuccess,
  updateBillFailed,
  deleteBill,
  deleteBillSuccess,
  deleteBillFailed,
  confirmBillById,
  confirmBillByIdSuccess,
  confirmBillByIdFailed,
  rejectBillById,
  rejectBillByIdSuccess,
  rejectBillByIdFailed,
  resetBillState,
  importBill,
  importBillSuccess,
  importBillFailed,
}
