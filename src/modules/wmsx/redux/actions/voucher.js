export const WMSX_SEARCH_VOUCHER_START = 'WMSX_SEARCH_VOUCHER_START'
export const WMSX_SEARCH_VOUCHER_SUCCESS = 'WMSX_SEARCH_VOUCHER_SUCCESS'
export const WMSX_SEARCH_VOUCHER_FAILED = 'WMSX_SEARCH_VOUCHER_FAILED'

export const WMSX_GET_VOUCHER_START = 'WMSX_GET_VOUCHER_START'
export const WMSX_GET_VOUCHER_SUCCESS = 'WMSX_GET_VOUCHER_SUCCESS'
export const WMSX_GET_VOUCHER_FAILED = 'WMSX_GET_VOUCHER_FAILED'

export const WMSX_CREATE_VOUCHER_START = 'WMSX_CREATE_VOUCHER_START'
export const WMSX_CREATE_VOUCHER_SUCCESS = 'WMSX_CREATE_VOUCHER_SUCCESS'
export const WMSX_CREATE_VOUCHER_FAILED = 'WMSX_CREATE_VOUCHER_FAILED'

export const WMSX_UPDATE_VOUCHER_START = 'WMSX_UPDATE_VOUCHER_START'
export const WMSX_UPDATE_VOUCHER_SUCCESS = 'WMSX_UPDATE_VOUCHER_SUCCESS'
export const WMSX_UPDATE_VOUCHER_FAILED = 'WMSX_UPDATE_VOUCHER_FAILED'

export const WMSX_DELETE_VOUCHER_START = 'WMSX_DELETE_VOUCHER_START'
export const WMSX_DELETE_VOUCHER_SUCCESS = 'WMSX_DELETE_VOUCHER_SUCCESS'
export const WMSX_DELETE_VOUCHER_FAILED = 'WMSX_DELETE_VOUCHER_FAILED'

export const WMSX_IMPORT_VOUCHER_START = 'WMSX_IMPORT_VOUCHER_START'
export const WMSX_IMPORT_VOUCHER_SUCCESS = 'WMSX_IMPORT_VOUCHER_SUCCESS'
export const WMSX_IMPORT_VOUCHER_FAILED = 'WMSX_IMPORT_VOUCHER_FAILED'

export const WMSX_CONFIRM_VOUCHER_START = 'WMSX_CONFIRM_VOUCHER_START'
export const WMSX_CONFIRM_VOUCHER_SUCCESS = 'WMSX_CONFIRM_VOUCHER_SUCCESS'
export const WMSX_CONFIRM_VOUCHER_FAILED = 'WMSX_CONFIRM_VOUCHER_FAILED'

export const WMSX_REJECT_VOUCHER_START = 'WMSX_REJECT_VOUCHER_START'
export const WMSX_REJECT_VOUCHER_SUCCESS = 'WMSX_REJECT_VOUCHER_SUCCESS'
export const WMSX_REJECT_VOUCHER_FAILED = 'WMSX_REJECT_VOUCHER_FAILED'

export const WMSX_RESET_VOUCHER_DETAIL_STATE = 'WMSX_RESET_VOUCHER_DETAIL_STATE'

/**
 * Search Voucher
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchVoucher(payload, onSuccess, onError) {
  return {
    type: WMSX_SEARCH_VOUCHER_START,
    payload,
    onSuccess,
    onError,
  }
}

/**
 * Search Voucher Success
 * @param {*} payload
 * @returns {object}
 */
export function searchVoucherSuccess(payload) {
  return {
    type: WMSX_SEARCH_VOUCHER_SUCCESS,
    payload,
  }
}

/**
 * Search Voucher Failed
 * @returns {object}
 */
export function searchVoucherFailed() {
  return {
    type: WMSX_SEARCH_VOUCHER_FAILED,
  }
}

/**
 * Get Voucher
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getVoucherById(payload, onSuccess, onError) {
  return {
    type: WMSX_GET_VOUCHER_START,
    payload,
    onSuccess,
    onError,
  }
}

/**
 * Get Voucher
 * @param {*} payload
 * @returns {object}
 */
export function getVoucherByIdSuccess(payload) {
  return {
    type: WMSX_GET_VOUCHER_SUCCESS,
    payload,
  }
}

/**
 * Get Voucher
 * @returns {object}
 */
export function getVoucherByIdFailed() {
  return {
    type: WMSX_GET_VOUCHER_FAILED,
  }
}

/**
 * Create Voucher
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createVoucher(payload, onSuccess, onError) {
  return {
    type: WMSX_CREATE_VOUCHER_START,
    payload,
    onSuccess,
    onError,
  }
}

/**
 * Create Voucher
 * @param {*} payload
 * @returns {object}
 */
export function createVoucherSuccess(payload) {
  return {
    type: WMSX_CREATE_VOUCHER_SUCCESS,
    payload,
  }
}

/**
 * Create Voucher
 * @returns {object}
 */
export function createVoucherFailed() {
  return {
    type: WMSX_CREATE_VOUCHER_FAILED,
  }
}

/**
 * Update Voucher
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateVoucher(payload, onSuccess, onError) {
  return {
    type: WMSX_UPDATE_VOUCHER_START,
    payload,
    onSuccess,
    onError,
  }
}
/**
 * Update Voucher success action
 * @param {*} payload
 * @returns {object}
 */
export function updateVoucherSuccess(payload) {
  return {
    type: WMSX_UPDATE_VOUCHER_SUCCESS,
    payload,
  }
}

/**
 * Update Voucher failed action
 * @returns {object}
 */
export function updateVoucherFailed() {
  return {
    type: WMSX_UPDATE_VOUCHER_FAILED,
  }
}

/**
 * Delete Voucher
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteVoucher(payload, onSuccess, onError) {
  return {
    type: WMSX_DELETE_VOUCHER_START,
    payload,
    onSuccess,
    onError,
  }
}

/**
 * Delete Voucher success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteVoucherSuccess(payload) {
  return {
    type: WMSX_DELETE_VOUCHER_SUCCESS,
    payload,
  }
}

/**
 * Delete Voucher failed action
 * @returns {object}
 */
export function deleteVoucherFailed() {
  return {
    type: WMSX_DELETE_VOUCHER_FAILED,
  }
}

/**
 * import Voucher
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function importVoucher(payload, onSuccess, onError) {
  return {
    type: WMSX_IMPORT_VOUCHER_START,
    payload,
    onSuccess,
    onError,
  }
}

/**
 * import Voucher success
 * @param {*} payload
 * @returns {object}
 */
export function importVoucherSuccess(payload) {
  return {
    type: WMSX_IMPORT_VOUCHER_SUCCESS,
    payload,
  }
}

/**
 * import Voucher failed
 * @returns {object}
 */
export function importVoucherFailed() {
  return {
    type: WMSX_IMPORT_VOUCHER_FAILED,
  }
}

/**
 * Confirm VOUCHER
 * @param {int} voucherId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function confirmVoucherId(voucherId, onSuccess, onError) {
  return {
    type: WMSX_CONFIRM_VOUCHER_START,
    payload: voucherId,
    onSuccess,
    onError,
  }
}

/**
 * Get confirm VOUCHER by id success action
 * @param {*} payload
 * @returns {object}
 */
export function confirmVoucherIdSuccess(payload) {
  return {
    type: WMSX_CONFIRM_VOUCHER_SUCCESS,
    payload: payload,
  }
}

/**
 * Get confirm VOUCHER by id failed action
 * @returns {object}
 */
export function confirmVoucherIdFailed() {
  return {
    type: WMSX_CONFIRM_VOUCHER_FAILED,
  }
}

/**
 * Get reject VOUCHER
 * @param {int} voucherId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function rejectVoucherId(voucherId, onSuccess, onError) {
  return {
    type: WMSX_REJECT_VOUCHER_START,
    payload: voucherId,
    onSuccess,
    onError,
  }
}

/**
 * Get reject VOUCHER by id success action
 * @param {*} payload
 * @returns {object}
 */
export function rejectVoucherIdSuccess(payload) {
  return {
    type: WMSX_REJECT_VOUCHER_SUCCESS,
    payload: payload,
  }
}

/**
 * Get reject VOUCHER by id failed action
 * @returns {object}
 */
export function rejectVoucherIdFailed() {
  return {
    type: WMSX_REJECT_VOUCHER_FAILED,
  }
}

export function resetVoucherDetailState() {
  return {
    type: WMSX_RESET_VOUCHER_DETAIL_STATE,
  }
}

export default {
  searchVoucher,
  searchVoucherSuccess,
  searchVoucherFailed,
  deleteVoucher,
  deleteVoucherSuccess,
  deleteVoucherFailed,
  getVoucherById,
  getVoucherByIdSuccess,
  getVoucherByIdFailed,
  updateVoucher,
  updateVoucherSuccess,
  updateVoucherFailed,
  confirmVoucherId,
  confirmVoucherIdSuccess,
  confirmVoucherIdFailed,
  rejectVoucherId,
  rejectVoucherIdSuccess,
  rejectVoucherIdFailed,
  resetVoucherDetailState,
  importVoucher,
  importVoucherSuccess,
  importVoucherFailed,
  createVoucher,
  createVoucherSuccess,
  createVoucherFailed,
}
