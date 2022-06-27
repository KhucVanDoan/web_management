export const WMSX_SEARCH_PALLETS_START = 'WMSX_SEARCH_PALLETS_START'
export const WMSX_SEARCH_PALLETS_SUCCESS = 'WMSX_SEARCH_PALLETS_SUCCESS'
export const WMSX_SEARCH_PALLETS_FAILED = 'WMSX_SEARCH_PALLETS_FAILED'

export const WMSX_GET_PALLET_DETAIL_START = 'WMSX_GET_PALLET_DETAIL_START'
export const WMSX_GET_PALLET_DETAIL_SUCCESS = 'WMSX_GET_PALLET_DETAIL_SUCCESS'
export const WMSX_GET_PALLET_DETAIL_FAILED = 'WMSX_GET_PALLET_DETAIL_FAILED'

export const WMSX_CREATE_PALLET_START = 'WMSX_CREATE_PALLET_START'
export const WMSX_CREATE_PALLET_SUCCESS = 'WMSX_CREATE_PALLET_SUCCESS'
export const WMSX_CREATE_PALLET_FAILED = 'WMSX_CREATE_PALLET_FAILED'

export const WMSX_UPDATE_PALLET_START = 'WMSX_UPDATE_PALLET_START'
export const WMSX_UPDATE_PALLET_SUCCESS = 'WMSX_UPDATE_PALLET_SUCCESS'
export const WMSX_UPDATE_PALLET_FAILED = 'WMSX_UPDATE_PALLET_FAILED'

export const WMSX_DELETE_PALLET_START = 'WMSX_DELETE_PALLET_START'
export const WMSX_DELETE_PALLET_SUCCESS = 'WMSX_DELETE_PALLET_SUCCESS'
export const WMSX_DELETE_PALLET_FAILED = 'WMSX_DELETE_PALLET_FAILED'

export const WMSX_RESET_PALLET_DETAILS_STATE = 'WMSX_RESET_PALLET_DETAILS_STATE'

/**
 * Search pallet
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchPallets(payload, onSuccess, onError) {
  return {
    type: WMSX_SEARCH_PALLETS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search user success action
 * @param {*} payload
 * @returns {object}
 */
export function searchPalletsSuccess(payload) {
  return {
    type: WMSX_SEARCH_PALLETS_SUCCESS,
    payload: payload,
  }
}

/**
 * Search pallet failed action
 * @returns {object}
 */
export function searchPalletsFailed() {
  return {
    type: WMSX_SEARCH_PALLETS_FAILED,
  }
}

/**
 * Get pallet details
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getPalletDetailById(payload, onSuccess, onError) {
  return {
    type: WMSX_GET_PALLET_DETAIL_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get pallet details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getPalletDetailByIdSuccess(payload) {
  return {
    type: WMSX_GET_PALLET_DETAIL_SUCCESS,
    payload: payload,
  }
}

/**
 * Get pallet details by id failed action
 * @returns {object}
 */
export function getPalletDetailByIdFailed() {
  return {
    type: WMSX_GET_PALLET_DETAIL_FAILED,
  }
}

/**
 * Create pallet
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createPallet(payload, onSuccess, onError) {
  return {
    type: WMSX_CREATE_PALLET_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Create pallet success action
 * @param {*} payload
 * @returns {object}
 */
export function createPalletSuccess(payload) {
  return {
    type: WMSX_CREATE_PALLET_SUCCESS,
    payload: payload,
  }
}

/**
 * Create pallet failed action
 * @returns {object}
 */
export function createPalletFailed() {
  return {
    type: WMSX_CREATE_PALLET_FAILED,
  }
}

/**
 * Update pallet
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updatePallet(payload, onSuccess, onError) {
  return {
    type: WMSX_UPDATE_PALLET_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Update pallet success action
 * @param {*} payload
 * @returns {object}
 */
export function updatePalletSuccess(payload) {
  return {
    type: WMSX_UPDATE_PALLET_SUCCESS,
    payload: payload,
  }
}

/**
 * Update pallet failed action
 * @returns {object}
 */
export function updatePalletFailed() {
  return {
    type: WMSX_UPDATE_PALLET_FAILED,
  }
}

/**
 * Delete pallet
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deletePallet(payload, onSuccess, onError) {
  return {
    type: WMSX_DELETE_PALLET_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete pallet success action
 * @param {*} payload
 * @returns {object}
 */
export function deletePalletSuccess(payload) {
  return {
    type: WMSX_DELETE_PALLET_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete pallet failed action
 * @returns {object}
 */
export function deletePalletFailed() {
  return {
    type: WMSX_DELETE_PALLET_FAILED,
  }
}

export function resetPalletDetailsState() {
  return {
    type: WMSX_RESET_PALLET_DETAILS_STATE,
  }
}

export default {
  searchPallets,
  searchPalletsFailed,
  searchPalletsSuccess,
  updatePallet,
  updatePalletFailed,
  updatePalletSuccess,
  createPallet,
  createPalletFailed,
  createPalletSuccess,
  getPalletDetailById,
  getPalletDetailByIdFailed,
  getPalletDetailByIdSuccess,
  deletePallet,
  deletePalletFailed,
  deletePalletSuccess,
  resetPalletDetailsState,
}
