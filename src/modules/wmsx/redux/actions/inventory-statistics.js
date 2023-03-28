export const WMSX_SEARCH_INVENTORIES_STATISTICS_START =
  'WMSX_SEARCH_INVENTORIES_STATISTICS_START'
export const WMSX_SEARCH_INVENTORIES_STATISTICS_SUCCESS =
  'WMSX_SEARCH_INVENTORIES_STATISTICS_SUCCESS'
export const WMSX_SEARCH_INVENTORIES_STATISTICS_FAILED =
  'WMSX_SEARCH_INVENTORIES_STATISTICS_FAILED'

export const WMSX_UPDATE_INVENTORIES_STATISTICS_START =
  'WMSX_UPDATE_INVENTORIES_STATISTICS_START'
export const WMSX_UPDATE_INVENTORIES_STATISTICS_SUCCESS =
  'WMSX_UPDATE_INVENTORIES_STATISTICS_SUCCESS'
export const WMSX_UPDATE_INVENTORIES_STATISTICS_FAILED =
  'WMSX_UPDATE_INVENTORIES_STATISTICS_FAILED'

export const WMSX_RESET_STATE_INVENTORIES_STATISTICS =
  'WMSX_RESET_STATE_INVENTORIES_STATISTICS'
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

export function updateInventoryStatistics(payload, onSuccess, onError) {
  return {
    type: WMSX_UPDATE_INVENTORIES_STATISTICS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function updateInventoryStatisticsSuccess(payload) {
  return {
    type: WMSX_UPDATE_INVENTORIES_STATISTICS_SUCCESS,
    payload: payload,
  }
}

export function updateInventoryStatisticsFailed() {
  return {
    type: WMSX_UPDATE_INVENTORIES_STATISTICS_FAILED,
  }
}

export function resetStateInventoryStatistics() {
  return {
    type: WMSX_RESET_STATE_INVENTORIES_STATISTICS,
  }
}

export default {
  searchInventoryStatistics,
  searchInventoryStatisticsSuccess,
  searchInventoryStatisticsFailed,
  updateInventoryStatistics,
  updateInventoryStatisticsSuccess,
  updateInventoryStatisticsFailed,
  resetStateInventoryStatistics,
}
