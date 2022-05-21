export const WMSX_SEARCH_CURRENCY_UNITS_START =
  'WMSX_SEARCH_CURRENCY_UNITS_START'
export const WMSX_SEARCH_CURRENCY_UNITS_SUCCESS =
  'WMSX_SEARCH_CURRENCY_UNITS_SUCCESS'
export const WMSX_SEARCH_CURRENCY_UNITS_FAILED =
  'WMSX_SEARCH_CURRENCY_UNITS_FAILED'

export const WMSX_CREATE_CURRENCY_UNIT_START = 'WMSX_CREATE_CURRENCY_UNIT_START'
export const WMSX_CREATE_CURRENCY_UNIT_SUCCESS =
  'WMSX_CREATE_CURRENCY_UNIT_SUCCESS'
export const WMSX_CREATE_CURRENCY_UNIT_FAILED =
  'WMSX_CREATE_CURRENCY_UNIT_FAILED'

export const WMSX_UPDATE_CURRENCY_UNIT_START = 'WMSX_UPDATE_CURRENCY_UNIT_START'
export const WMSX_UPDATE_CURRENCY_UNIT_SUCCESS =
  'WMSX_UPDATE_CURRENCY_UNIT_SUCCESS'
export const WMSX_UPDATE_CURRENCY_UNIT_FAILED =
  'WMSX_UPDATE_CURRENCY_UNIT_FAILED'

export const WMSX_DELETE_CURRENCY_UNIT_START = 'WMSX_DELETE_CURRENCY_UNIT_START'
export const WMSX_DELETE_CURRENCY_UNIT_SUCCESS =
  'WMSX_DELETE_CURRENCY_UNIT_SUCCESS'
export const WMSX_DELETE_CURRENCY_UNIT_FAILED =
  'WMSX_DELETE_CURRENCY_UNIT_FAILED'

export const WMSX_IMPORT_CURRENCY_UNIT_START = 'WMSX_IMPORT_CURRENCY_UNIT_START'
export const WMSX_IMPORT_CURRENCY_UNIT_SUCCESS =
  'WMSX_IMPORT_CURRENCY_UNIT_SUCCESS'
export const WMSX_IMPORT_CURRENCY_UNIT_FAILED =
  'WMSX_IMPORT_CURRENCY_UNIT_FAILED'

export const WMSX_GET_CURRENCY_UNIT_DETAILS_START =
  'WMSX_GET_CURRENCY_UNIT_DETAILS_START'
export const WMSX_GET_CURRENCY_UNIT_DETAILS_SUCCESS =
  'WMSX_GET_CURRENCY_UNIT_DETAILS_SUCCESS'
export const WMSX_GET_CURRENCY_UNIT_DETAILS_FAILED =
  'WMSX_GET_CURRENCY_UNIT_DETAILS_FAILED'

export const WMSX_PRINT_QR_CURRENCY_UNITS_START =
  'WMSX_PRINT_QR_CURRENCY_UNITS_START'
export const WMSX_PRINT_QR_CURRENCY_UNITS_SUCCESS =
  'WMSX_PRINT_QR_CURRENCY_UNITS_SUCCESS'
export const WMSX_PRINT_QR_CURRENCY_UNITS_FAILED =
  'WMSX_PRINT_QR_CURRENCY_UNITS_FAILED'

export const WMSX_CONFIRM_CURRENCY_UNIT_SUCCESS =
  'WMSX_CONFIRM_CURRENCY_UNIT_SUCCESS'
export const WMSX_CONFIRM_CURRENCY_UNIT_START =
  'WMSX_CONFIRM_CURRENCY_UNIT_START'
export const WMSX_CONFIRM_CURRENCY_UNIT_FAILED =
  'WMSX_CONFIRM_CURRENCY_UNIT_FAILED'

export const WMSX_REJECT_CURRENCY_UNIT_SUCCESS =
  'WMSX_REJECT_CURRENCY_UNIT_SUCCESS'
export const WMSX_REJECT_CURRENCY_UNIT_START = 'WMSX_REJECT_CURRENCY_UNIT_START'
export const WMSX_REJECT_CURRENCY_UNIT_FAILED =
  'WMSX_REJECT_CURRENCY_UNIT_FAILED'

export const WMSX_RESET_CURRENCY_UNIT_STATE = 'WMSX_RESET_CURRENCY_UNIT_STATE'

/**
 * Search cost
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchCurrencyUnits(payload, onSuccess, onError) {
  return {
    type: WMSX_SEARCH_CURRENCY_UNITS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search cost success action
 * @param {*} payload
 * @returns {object}
 */
export function searchCurrencyUnitsSuccess(payload) {
  return {
    type: WMSX_SEARCH_CURRENCY_UNITS_SUCCESS,
    payload: payload,
  }
}

/**
 * Search cost failed action
 * @returns {object}
 */
export function searchCurrencyUnitsFailed() {
  return {
    type: WMSX_SEARCH_CURRENCY_UNITS_FAILED,
  }
}

export function getCurrencyUnitDetailsById(currencyUnitId, onSuccess, onError) {
  return {
    type: WMSX_GET_CURRENCY_UNIT_DETAILS_START,
    payload: currencyUnitId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get cost details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getCurrencyUnitDetailsByIdSuccess(payload) {
  return {
    type: WMSX_GET_CURRENCY_UNIT_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get cost details by id failed action
 * @returns {object}
 */
export function getCurrencyUnitDetailsByIdFailed() {
  return {
    type: WMSX_GET_CURRENCY_UNIT_DETAILS_FAILED,
  }
}

/**
 * Create user
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createCurrencyUnit(payload, onSuccess, onError) {
  return {
    type: WMSX_CREATE_CURRENCY_UNIT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Create user success action
 * @param {*} payload
 * @returns {object}
 */
export function createCurrencyUnitSuccess(payload) {
  return {
    type: WMSX_CREATE_CURRENCY_UNIT_SUCCESS,
    payload: payload,
  }
}

/**
 * Create user failed action
 * @returns {object}
 */
export function createCurrencyUnitFailed() {
  return {
    type: WMSX_CREATE_CURRENCY_UNIT_FAILED,
  }
}

/**
 * Update user
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateCurrencyUnit(payload, onSuccess, onError) {
  return {
    type: WMSX_UPDATE_CURRENCY_UNIT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Update user success action
 * @param {*} payload
 * @returns {object}
 */
export function updateCurrencyUnitSuccess(payload) {
  return {
    type: WMSX_UPDATE_CURRENCY_UNIT_SUCCESS,
    payload: payload,
  }
}

/**
 * Update user failed action
 * @returns {object}
 */
export function updateCurrencyUnitFailed() {
  return {
    type: WMSX_UPDATE_CURRENCY_UNIT_FAILED,
  }
}

/**
 * Delete user
 * @param {int} userId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteCurrencyUnit(userId, onSuccess, onError) {
  return {
    type: WMSX_DELETE_CURRENCY_UNIT_START,
    payload: userId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete user success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteCurrencyUnitSuccess(payload) {
  return {
    type: WMSX_DELETE_CURRENCY_UNIT_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete user failed action
 * @returns {object}
 */
export function deleteCurrencyUnitFailed() {
  return {
    type: WMSX_DELETE_CURRENCY_UNIT_FAILED,
  }
}

export function confirmCurrencyUnitById(currencyUnitId, onSuccess, onError) {
  return {
    type: WMSX_CONFIRM_CURRENCY_UNIT_START,
    payload: currencyUnitId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get confirm purchased order by id success action
 * @param {*} payload
 * @returns {object}
 */
export function confirmCurrencyUnitByIdSuccess(payload) {
  return {
    type: WMSX_CONFIRM_CURRENCY_UNIT_SUCCESS,
    payload: payload,
  }
}

/**
 * Get confirm purchased order by id failed action
 * @returns {object}
 */
export function confirmCurrencyUnitByIdFailed() {
  return {
    type: WMSX_CONFIRM_CURRENCY_UNIT_FAILED,
  }
}

export function rejectCurrencyUnitById(currencyUnitId, onSuccess, onError) {
  return {
    type: WMSX_REJECT_CURRENCY_UNIT_START,
    payload: currencyUnitId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get reject purchased order by id success action
 * @param {*} payload
 * @returns {object}
 */
export function rejectCurrencyUnitByIdSuccess(payload) {
  return {
    type: WMSX_REJECT_CURRENCY_UNIT_SUCCESS,
    payload: payload,
  }
}

/**
 * Get reject purchased order by id failed action
 * @returns {object}
 */
export function rejectCurrencyUnitByIdFailed() {
  return {
    type: WMSX_REJECT_CURRENCY_UNIT_FAILED,
  }
}

/**
 * import currency unit
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function importCurrencyUnit(payload, onSuccess, onError) {
  return {
    type: WMSX_IMPORT_CURRENCY_UNIT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * import currency unit success
 * @param {*} payload
 * @returns {object}
 */
export function importCurrencyUnitSuccess(payload) {
  return {
    type: WMSX_IMPORT_CURRENCY_UNIT_SUCCESS,
    payload: payload,
  }
}

/**
 * import currency unit failed
 * @returns {object}
 */
export function importCurrencyUnitFailed() {
  return {
    type: WMSX_IMPORT_CURRENCY_UNIT_FAILED,
  }
}

export function resetCurrencyUnitState() {
  return {
    type: WMSX_RESET_CURRENCY_UNIT_STATE,
  }
}

export default {
  searchCurrencyUnits,
  searchCurrencyUnitsFailed,
  searchCurrencyUnitsSuccess,
  createCurrencyUnit,
  createCurrencyUnitFailed,
  createCurrencyUnitSuccess,
  updateCurrencyUnit,
  updateCurrencyUnitFailed,
  updateCurrencyUnitSuccess,
  deleteCurrencyUnit,
  deleteCurrencyUnitFailed,
  deleteCurrencyUnitSuccess,
  importCurrencyUnit,
  importCurrencyUnitFailed,
  importCurrencyUnitSuccess,
  confirmCurrencyUnitById,
  confirmCurrencyUnitByIdFailed,
  confirmCurrencyUnitByIdSuccess,
  rejectCurrencyUnitById,
  rejectCurrencyUnitByIdFailed,
  rejectCurrencyUnitByIdSuccess,
  resetCurrencyUnitState,
  getCurrencyUnitDetailsById,
  getCurrencyUnitDetailsByIdFailed,
  getCurrencyUnitDetailsByIdSuccess,
}
