export const SEARCH_DATA_WAREHOUSE_SPACE_REPORT_START =
  'WMSX_SEARCH_DATA_WAREHOUSE_SPACE_REPORT_START'
export const SEARCH_DATA_WAREHOUSE_SPACE_REPORT_SUCCESS =
  'WMSX_SEARCH_DATA_WAREHOUSE_SPACE_REPORT_SUCCESS'
export const SEARCH_DATA_WAREHOUSE_SPACE_REPORT_FAILED =
  'WMSX_SEARCH_DATA_WAREHOUSE_SPACE_REPORT_FAILED'

export const GET_FACTORIES_START = 'WMSX_GET_FACTORIES_START'
export const GET_FACTORIES_SUCCESS = 'WMSX_GET_FACTORIES_SUCCESS'
export const GET_FACTORIES_FAILED = 'WMSX_GET_FACTORIES_FAILED'

export const RESET_WAREHOUSE_SPACE_REPORT_LIST_STATE =
  'WMSX_RESET_WAREHOUSE_SPACE_REPORT_LIST_STATE'

/**
 * get data
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getDataWarehouseSpaceReport(payload, onSuccess, onError) {
  return {
    type: SEARCH_DATA_WAREHOUSE_SPACE_REPORT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * get data success action
 * @param {*} payload
 * @returns {object}
 */
export function getDataWarehouseSpaceReportSuccess(payload) {
  return {
    type: SEARCH_DATA_WAREHOUSE_SPACE_REPORT_SUCCESS,
    payload: payload,
  }
}

/**
 * get data failed action
 * @returns {object}
 */
export function getDataWarehouseSpaceReportFailed() {
  return {
    type: SEARCH_DATA_WAREHOUSE_SPACE_REPORT_FAILED,
  }
}

export function getFactories(payload, onSuccess, onError) {
  return {
    type: GET_FACTORIES_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get factories success
 * @param {*} payload
 * @returns {object}
 */
export function getFactoriesSuccess(payload) {
  return {
    type: GET_FACTORIES_SUCCESS,
    payload: payload,
  }
}

/**
 * Get factories failed
 * @returns {object}
 */
export function getFactoriesFailed() {
  return {
    type: GET_FACTORIES_FAILED,
  }
}

export function resetWarehouseSpaceReportListState() {
  return {
    type: RESET_WAREHOUSE_SPACE_REPORT_LIST_STATE,
  }
}

export default {
  getDataWarehouseSpaceReport,
  getDataWarehouseSpaceReportFailed,
  getDataWarehouseSpaceReportSuccess,
  getFactories,
  getFactoriesFailed,
  getFactoriesSuccess,
  resetWarehouseSpaceReportListState,
}
