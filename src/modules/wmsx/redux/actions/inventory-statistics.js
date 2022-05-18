export const WMSX_SEARCH_INVENTORIES_STATISTICS_START =
  'WMSX_SEARCH_INVENTORIES_STATISTICS_START'
export const WMSX_SEARCH_INVENTORIES_STATISTICS_SUCCESS =
  'WMSX_SEARCH_INVENTORIES_STATISTICS_SUCCESS'
export const WMSX_SEARCH_INVENTORIES_STATISTICS_FAILED =
  'WMSX_SEARCH_INVENTORIES_STATISTICS_FAILED'

/**
 * Get inventory details
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function searchInventoryStatistics(payload, onSuccess, onError) {
  return {
    type: WMSX_SEARCH_INVENTORIES_STATISTICS_START,
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
export function searchInventoryStatisticsSuccess(payload) {
  return {
    type: WMSX_SEARCH_INVENTORIES_STATISTICS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get inventory details by id failed action
 * @returns {object}
 */
export function searchInventoryStatisticsFailed() {
  return {
    type: WMSX_SEARCH_INVENTORIES_STATISTICS_FAILED,
  }
}

export default {
  searchInventoryStatistics,
  searchInventoryStatisticsSuccess,
  searchInventoryStatisticsFailed,
}