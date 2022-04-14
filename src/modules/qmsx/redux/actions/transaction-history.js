// Action: Search input quality transaction history
export const SEARCH_INPUT_QUALITY_TRANSACTION_HISTORY_START =
  'QMSX_SEARCH_INPUT_QUALITY_TRANSACTION_HISTORY_START'
export const SEARCH_INPUT_QUALITY_TRANSACTION_HISTORY_SUCCESS =
  'QMSX_SEARCH_INPUT_QUALITY_TRANSACTION_HISTORY_SUCCESS'
export const SEARCH_INPUT_QUALITY_TRANSACTION_HISTORY_FAIL =
  'QMSX_SEARCH_INPUT_QUALITY_TRANSACTION_HISTORY_FAIL'

// Action: Search output quality transaction history
export const SEARCH_OUTPUT_QUALITY_TRANSACTION_HISTORY_START =
  'QMSX_SEARCH_OUTPUT_QUALITY_TRANSACTION_HISTORY_START'
export const SEARCH_OUTPUT_QUALITY_TRANSACTION_HISTORY_SUCCESS =
  'QMSX_SEARCH_OUTPUT_QUALITY_TRANSACTION_HISTORY_SUCCESS'
export const SEARCH_OUTPUT_QUALITY_TRANSACTION_HISTORY_FAIL =
  'QMSX_SEARCH_OUTPUT_QUALITY_TRANSACTION_HISTORY_FAIL'

// Action: Search production output quality transaction history
export const SEARCH_PRODUCTION_OUTPUT_QUALITY_TRANSACTION_HISTORY_START =
  'QMSX_SEARCH_PRODUCTION_OUTPUT_QUALITY_TRANSACTION_HISTORY_START'
export const SEARCH_PRODUCTION_OUTPUT_QUALITY_TRANSACTION_HISTORY_SUCCESS =
  'QMSX_SEARCH_PRODUCTION_OUTPUT_QUALITY_TRANSACTION_HISTORY_SUCCESS'
export const SEARCH_PRODUCTION_OUTPUT_QUALITY_TRANSACTION_HISTORY_FAIL =
  'QMSX_SEARCH_PRODUCTION_OUTPUT_QUALITY_TRANSACTION_HISTORY_FAIL'

// Action: Search production input quality (product of previous step) transaction history
export const SEARCH_PRODUCTION_INPUT_QUALITY_PRODUCT_PREVIOUS_TRANSACTION_HISTORY_START =
  'QMSX_SEARCH_PRODUCTION_INPUT_QUALITY_PRODUCT_PREVIOUS_TRANSACTION_HISTORY_START'
export const SEARCH_PRODUCTION_INPUT_QUALITY_PRODUCT_PREVIOUS_TRANSACTION_HISTORY_SUCCESS =
  'QMSX_SEARCH_PRODUCTION_INPUT_QUALITY_PRODUCT_PREVIOUS_TRANSACTION_HISTORY_SUCCESS'
export const SEARCH_PRODUCTION_INPUT_QUALITY_PRODUCT_PREVIOUS_TRANSACTION_HISTORY_FAIL =
  'QMSX_SEARCH_PRODUCTION_INPUT_QUALITY_PRODUCT_PREVIOUS_TRANSACTION_HISTORY_FAIL'

// Action: Search production input quality (material) transaction history
export const SEARCH_PRODUCTION_INPUT_QUALITY_MATERIAL_TRANSACTION_HISTORY_START =
  'QMSX_SEARCH_PRODUCTION_INPUT_QUALITY_MATERIAL_TRANSACTION_HISTORY_START'
export const SEARCH_PRODUCTION_INPUT_QUALITY_MATERIAL_TRANSACTION_HISTORY_SUCCESS =
  'QMSX_SEARCH_PRODUCTION_INPUT_QUALITY_MATERIAL_TRANSACTION_HISTORY_SUCCESS'
export const SEARCH_PRODUCTION_INPUT_QUALITY_MATERIAL_TRANSACTION_HISTORY_FAIL =
  'QMSX_SEARCH_PRODUCTION_INPUT_QUALITY_MATERIAL_TRANSACTION_HISTORY_FAIL'

// Action: Get detail input quality transaction history
export const GET_DETAIL_INPUT_QUALITY_TRANSACTION_HISTORY_START =
  'QMSX_GET_DETAIL_INPUT_QUALITY_TRANSACTION_HISTORY_START'
export const GET_DETAIL_INPUT_QUALITY_TRANSACTION_HISTORY_SUCCESS =
  'QMSX_GET_DETAIL_INPUT_QUALITY_TRANSACTION_HISTORY_SUCCESS'
export const GET_DETAIL_INPUT_QUALITY_TRANSACTION_HISTORY_FAIL =
  'QMSX_GET_DETAIL_INPUT_QUALITY_TRANSACTION_HISTORY_FAIL'

// Action: Get detail output quality transaction history
export const GET_DETAIL_OUTPUT_QUALITY_TRANSACTION_HISTORY_START =
  'QMSX_GET_DETAIL_OUTPUT_QUALITY_TRANSACTION_HISTORY_START'
export const GET_DETAIL_OUTPUT_QUALITY_TRANSACTION_HISTORY_SUCCESS =
  'QMSX_GET_DETAIL_OUTPUT_QUALITY_TRANSACTION_HISTORY_SUCCESS'
export const GET_DETAIL_OUTPUT_QUALITY_TRANSACTION_HISTORY_FAIL =
  'QMSX_GET_DETAIL_OUTPUT_QUALITY_TRANSACTION_HISTORY_FAIL'

// Action: Get detail production output quality transaction history
export const GET_DETAIL_PRODUCTION_OUTPUT_QUALITY_TRANSACTION_HISTORY_START =
  'QMSX_GET_DETAIL_PRODUCTION_OUTPUT_QUALITY_TRANSACTION_HISTORY_START'
export const GET_DETAIL_PRODUCTION_OUTPUT_QUALITY_TRANSACTION_HISTORY_SUCCESS =
  'QMSX_GET_DETAIL_PRODUCTION_OUTPUT_QUALITY_TRANSACTION_HISTORY_SUCCESS'
export const GET_DETAIL_PRODUCTION_OUTPUT_QUALITY_TRANSACTION_HISTORY_FAIL =
  'QMSX_GET_DETAIL_PRODUCTION_OUTPUT_QUALITY_TRANSACTION_HISTORY_FAIL'

// Action: Get detail production input quality (product of previous step) transaction history
export const GET_DETAIL_PRODUCTION_INPUT_QUALITY_PRODUCT_PREVIOUS_TRANSACTION_HISTORY_START =
  'QMSX_GET_DETAIL_PRODUCTION_INPUT_QUALITY_PRODUCT_PREVIOUS_TRANSACTION_HISTORY_START'
export const GET_DETAIL_PRODUCTION_INPUT_QUALITY_PRODUCT_PREVIOUS_TRANSACTION_HISTORY_SUCCESS =
  'QMSX_GET_DETAIL_PRODUCTION_INPUT_QUALITY_PRODUCT_PREVIOUS_TRANSACTION_HISTORY_SUCCESS'
export const GET_DETAIL_PRODUCTION_INPUT_QUALITY_PRODUCT_PREVIOUS_TRANSACTION_HISTORY_FAIL =
  'QMSX_GET_DETAIL_PRODUCTION_INPUT_QUALITY_PRODUCT_PREVIOUS_TRANSACTION_HISTORY_FAIL'

// Action: Get detail production input quality (material) transaction history
export const GET_DETAIL_PRODUCTION_INPUT_QUALITY_MATERIAL_TRANSACTION_HISTORY_START =
  'QMSX_GET_DETAIL_PRODUCTION_INPUT_QUALITY_MATERIAL_TRANSACTION_HISTORY_START'
export const GET_DETAIL_PRODUCTION_INPUT_QUALITY_MATERIAL_TRANSACTION_HISTORY_SUCCESS =
  'QMSX_GET_DETAIL_PRODUCTION_INPUT_QUALITY_MATERIAL_TRANSACTION_HISTORY_SUCCESS'
export const GET_DETAIL_PRODUCTION_INPUT_QUALITY_MATERIAL_TRANSACTION_HISTORY_FAIL =
  'QMSX_GET_DETAIL_PRODUCTION_INPUT_QUALITY_MATERIAL_TRANSACTION_HISTORY_FAIL'

//Action: reset state
export const RESET_TRANSACTION_HISTORY_STATE =
  'QMSX_RESET_TRANSACTION_HISTORY_STATE'

/**
 * Search input quality transaction history start action
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchInputQualityTransactionHistory(
  payload,
  onSuccess,
  onError,
) {
  return {
    type: SEARCH_INPUT_QUALITY_TRANSACTION_HISTORY_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search input transaction history success action
 * @param {*} payload
 * @returns {object}
 */
export function searchInputQualityTransactionHistorySuccess(payload) {
  return {
    type: SEARCH_INPUT_QUALITY_TRANSACTION_HISTORY_SUCCESS,
    payload: payload,
  }
}

/**
 * Search input transaction history fail action
 * @returns {object}
 */
export function searchInputQualityTransactionHistoryFail() {
  return {
    type: SEARCH_INPUT_QUALITY_TRANSACTION_HISTORY_FAIL,
  }
}

/**
 * Search output transaction history start action
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchOutputQualityTransactionHistory(
  payload,
  onSuccess,
  onError,
) {
  return {
    type: SEARCH_OUTPUT_QUALITY_TRANSACTION_HISTORY_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search output transaction history success action
 * @param {*} payload
 * @returns {object}
 */
export function searchOutputQualityTransactionHistorySuccess(payload) {
  return {
    type: SEARCH_OUTPUT_QUALITY_TRANSACTION_HISTORY_SUCCESS,
    payload: payload,
  }
}

/**
 * Search output transaction history fail action
 * @returns {object}
 */
export function searchOutputQualityTransactionHistoryFail() {
  return {
    type: SEARCH_OUTPUT_QUALITY_TRANSACTION_HISTORY_FAIL,
  }
}

/**
 * Search production output quality transaction history start action
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchProductionOutputQualityTransactionHistory(
  payload,
  onSuccess,
  onError,
) {
  return {
    type: SEARCH_PRODUCTION_OUTPUT_QUALITY_TRANSACTION_HISTORY_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search production output quality transaction history success action
 * @param {*} payload
 * @returns {object}
 */
export function searchProductionOutputQualityTransactionHistorySuccess(
  payload,
) {
  return {
    type: SEARCH_PRODUCTION_OUTPUT_QUALITY_TRANSACTION_HISTORY_SUCCESS,
    payload: payload,
  }
}

/**
 * Search production output quality transaction history fail action
 * @returns {object}
 */
export function searchProductionOutputQualityTransactionHistoryFail() {
  return {
    type: SEARCH_PRODUCTION_OUTPUT_QUALITY_TRANSACTION_HISTORY_FAIL,
  }
}

/**
 * Search production input quality (product of previous step) transaction history start action
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchProductionInputQualityProductPreviousTransactionHistory(
  payload,
  onSuccess,
  onError,
) {
  return {
    type: SEARCH_PRODUCTION_INPUT_QUALITY_PRODUCT_PREVIOUS_TRANSACTION_HISTORY_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search production input quality (product of previous step) transaction history success action
 * @param {*} payload
 * @returns {object}
 */
export function searchProductionInputQualityProductPreviousTransactionHistorySuccess(
  payload,
) {
  return {
    type: SEARCH_PRODUCTION_INPUT_QUALITY_PRODUCT_PREVIOUS_TRANSACTION_HISTORY_SUCCESS,
    payload: payload,
  }
}

/**
 * Search production input quality (product of previous step) transaction history fail action
 * @returns {object}
 */
export function searchProductionInputQualityProductPreviousTransactionHistoryFail() {
  return {
    type: SEARCH_PRODUCTION_INPUT_QUALITY_PRODUCT_PREVIOUS_TRANSACTION_HISTORY_FAIL,
  }
}

/**
 * Search production input quality (material) transaction history start action
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchProductionInputQualityMaterialTransactionHistory(
  payload,
  onSuccess,
  onError,
) {
  return {
    type: SEARCH_PRODUCTION_INPUT_QUALITY_MATERIAL_TRANSACTION_HISTORY_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search production input quality (material) transaction history success action
 * @param {*} payload
 * @returns {object}
 */
export function searchProductionInputQualityMaterialTransactionHistorySuccess(
  payload,
) {
  return {
    type: SEARCH_PRODUCTION_INPUT_QUALITY_MATERIAL_TRANSACTION_HISTORY_SUCCESS,
    payload: payload,
  }
}

/**
 * Search production input quality (material) transaction history fail action
 * @returns {object}
 */
export function searchProductionInputQualityMaterialTransactionHistoryFail() {
  return {
    type: SEARCH_PRODUCTION_INPUT_QUALITY_MATERIAL_TRANSACTION_HISTORY_FAIL,
  }
}

/**
 * Get detail input quality transaction history start action
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getDetailInputQualityTransactionHistory(
  payload,
  onSuccess,
  onError,
) {
  return {
    type: GET_DETAIL_INPUT_QUALITY_TRANSACTION_HISTORY_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get detail input transaction history success action
 * @param {*} payload
 * @returns {object}
 */
export function getDetailInputQualityTransactionHistorySuccess(payload) {
  return {
    type: GET_DETAIL_INPUT_QUALITY_TRANSACTION_HISTORY_SUCCESS,
    payload: payload,
  }
}

/**
 * Get detail input transaction history fail action
 * @returns {object}
 */
export function getDetailInputQualityTransactionHistoryFail() {
  return {
    type: GET_DETAIL_INPUT_QUALITY_TRANSACTION_HISTORY_FAIL,
  }
}

/**
 * Get detail output quality transaction history start action
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getDetailOutputQualityTransactionHistory(
  payload,
  onSuccess,
  onError,
) {
  return {
    type: GET_DETAIL_OUTPUT_QUALITY_TRANSACTION_HISTORY_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get detail output transaction history success action
 * @param {*} payload
 * @returns {object}
 */
export function getDetailOutputQualityTransactionHistorySuccess(payload) {
  return {
    type: GET_DETAIL_OUTPUT_QUALITY_TRANSACTION_HISTORY_SUCCESS,
    payload: payload,
  }
}

/**
 * Get detail output transaction history fail action
 * @returns {object}
 */
export function getDetailOutputQualityTransactionHistoryFail() {
  return {
    type: GET_DETAIL_OUTPUT_QUALITY_TRANSACTION_HISTORY_FAIL,
  }
}

/**
 * Get detail production input quality (product of previous step) transaction history start action
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getDetailProductionInputQualityProductPreviousTransactionHistory(
  payload,
  onSuccess,
  onError,
) {
  return {
    type: GET_DETAIL_PRODUCTION_INPUT_QUALITY_PRODUCT_PREVIOUS_TRANSACTION_HISTORY_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get detail production input quality (product of previous step) transaction history success action
 * @param {*} payload
 * @returns {object}
 */
export function getDetailProductionInputQualityProductPreviousTransactionHistorySuccess(
  payload,
) {
  return {
    type: GET_DETAIL_PRODUCTION_INPUT_QUALITY_PRODUCT_PREVIOUS_TRANSACTION_HISTORY_SUCCESS,
    payload: payload,
  }
}

/**
 * Get detail production input quality (product of previous step) transaction history fail action
 * @returns {object}
 */
export function getDetailProductionInputQualityProductPreviousTransactionHistoryFail() {
  return {
    type: GET_DETAIL_PRODUCTION_INPUT_QUALITY_PRODUCT_PREVIOUS_TRANSACTION_HISTORY_FAIL,
  }
}

/**
 * Get detail production input quality (material) transaction history start action
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getDetailProductionInputQualityMaterialTransactionHistory(
  payload,
  onSuccess,
  onError,
) {
  return {
    type: GET_DETAIL_PRODUCTION_INPUT_QUALITY_MATERIAL_TRANSACTION_HISTORY_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get detail production input quality (material) transaction history success action
 * @param {*} payload
 * @returns {object}
 */
export function getDetailProductionInputQualityMaterialTransactionHistorySuccess(
  payload,
) {
  return {
    type: GET_DETAIL_PRODUCTION_INPUT_QUALITY_MATERIAL_TRANSACTION_HISTORY_SUCCESS,
    payload: payload,
  }
}

/**
 * Get detail production input quality (material) transaction history fail action
 * @returns {object}
 */
export function getDetailProductionInputQualityMaterialTransactionHistoryFail() {
  return {
    type: GET_DETAIL_PRODUCTION_INPUT_QUALITY_MATERIAL_TRANSACTION_HISTORY_FAIL,
  }
}

/**
 * Get detail production output quality transaction history start action
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getDetailProductionOutputQualityTransactionHistory(
  payload,
  onSuccess,
  onError,
) {
  return {
    type: GET_DETAIL_PRODUCTION_OUTPUT_QUALITY_TRANSACTION_HISTORY_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get detail production input quality (material) transaction history success action
 * @param {*} payload
 * @returns {object}
 */
export function getDetailProductionOutputQualityTransactionHistorySuccess(
  payload,
) {
  return {
    type: GET_DETAIL_PRODUCTION_OUTPUT_QUALITY_TRANSACTION_HISTORY_SUCCESS,
    payload: payload,
  }
}

/**
 * Get detail production input quality (material) transaction history fail action
 * @returns {object}
 */
export function getDetailProductionOutputQualityTransactionHistoryFail() {
  return {
    type: GET_DETAIL_PRODUCTION_OUTPUT_QUALITY_TRANSACTION_HISTORY_FAIL,
  }
}

/**
 * Reset state action
 * @returns {object}
 */
export function resetTransactionHistoryState() {
  return {
    type: RESET_TRANSACTION_HISTORY_STATE,
  }
}

export default {
  searchInputQualityTransactionHistory,
  searchInputQualityTransactionHistorySuccess,
  searchInputQualityTransactionHistoryFail,
  searchOutputQualityTransactionHistory,
  searchOutputQualityTransactionHistorySuccess,
  searchOutputQualityTransactionHistoryFail,
  searchProductionOutputQualityTransactionHistory,
  searchProductionOutputQualityTransactionHistorySuccess,
  searchProductionOutputQualityTransactionHistoryFail,
  searchProductionInputQualityProductPreviousTransactionHistory,
  searchProductionInputQualityProductPreviousTransactionHistorySuccess,
  searchProductionInputQualityProductPreviousTransactionHistoryFail,
  searchProductionInputQualityMaterialTransactionHistory,
  searchProductionInputQualityMaterialTransactionHistorySuccess,
  searchProductionInputQualityMaterialTransactionHistoryFail,
  getDetailInputQualityTransactionHistory,
  getDetailInputQualityTransactionHistorySuccess,
  getDetailInputQualityTransactionHistoryFail,
  getDetailOutputQualityTransactionHistory,
  getDetailOutputQualityTransactionHistorySuccess,
  getDetailOutputQualityTransactionHistoryFail,
  getDetailProductionInputQualityProductPreviousTransactionHistory,
  getDetailProductionInputQualityProductPreviousTransactionHistorySuccess,
  getDetailProductionInputQualityProductPreviousTransactionHistoryFail,
  getDetailProductionInputQualityMaterialTransactionHistory,
  getDetailProductionInputQualityMaterialTransactionHistorySuccess,
  getDetailProductionInputQualityMaterialTransactionHistoryFail,
  getDetailProductionOutputQualityTransactionHistory,
  getDetailProductionOutputQualityTransactionHistorySuccess,
  getDetailProductionOutputQualityTransactionHistoryFail,
  resetTransactionHistoryState,
}
