export const WMSX_SEARCH_INVENTORIES_DEADLINE_WARNING_START =
  'WMSX_SEARCH_INVENTORIES_DEADLINE_WARNING_START'
export const WMSX_SEARCH_INVENTORIES_DEADLINE_WARNING_SUCCESS =
  'WMSX_SEARCH_INVENTORIES_DEADLINE_WARNING_SUCCESS'
export const WMSX_SEARCH_INVENTORIES_DEADLINE_WARNING_FAILED =
  'WMSX_SEARCH_INVENTORIES_DEADLINE_WARNING_FAILED'

/**
 * Get inventory details
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function searchInventoryDeadlineWarning(payload, onSuccess, onError) {
  return {
    type: WMSX_SEARCH_INVENTORIES_DEADLINE_WARNING_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get inventory details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function searchInventoryDeadlineWarningSuccess(payload) {
  return {
    type: WMSX_SEARCH_INVENTORIES_DEADLINE_WARNING_SUCCESS,
    payload: payload,
  }
}

/**
 * Get inventory details by id failed action
 * @returns {object}
 */
export function searchInventoryDeadlineWarningFailed() {
  return {
    type: WMSX_SEARCH_INVENTORIES_DEADLINE_WARNING_FAILED,
  }
}

export default {
  searchInventoryDeadlineWarning,
  searchInventoryDeadlineWarningSuccess,
  searchInventoryDeadlineWarningFailed,
}
