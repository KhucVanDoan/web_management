export const SEARCH_WAREHOUSE_AREAS_START = 'WMSX_SEARCH_WAREHOUSE_AREAS_START'
export const SEARCH_WAREHOUSE_AREAS_SUCCESS =
  'WMSX_SEARCH_WAREHOUSE_AREAS_SUCCESS'
export const SEARCH_WAREHOUSE_AREAS_FAILED =
  'WMSX_SEARCH_WAREHOUSE_AREAS_FAILED'

export const GET_WAREHOUSE_AREA_DETAIL_START =
  'WMSX_GET_WAREHOUSE_AREA_DETAIL_START'
export const GET_WAREHOUSE_AREA_DETAIL_SUCCESS =
  'WMSX_GET_WAREHOUSE_AREA_DETAIL_SUCCESS'
export const GET_WAREHOUSE_AREA_DETAIL_FAILED =
  'WMSX_GET_WAREHOUSE_AREA_DETAIL_FAILED'

export const RESET_WAREHOUSE_AREA_DETAIL_STATE =
  'WMSX_RESET_WAREHOUSE_AREA_DETAIL_STATE'

/**
 * Search warehouse area
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchWarehouseAreas(payload, onSuccess, onError) {
  return {
    type: SEARCH_WAREHOUSE_AREAS_START,
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
export function searchWarehouseAreasSuccess(payload) {
  return {
    type: SEARCH_WAREHOUSE_AREAS_SUCCESS,
    payload: payload,
  }
}

/**
 * Search warehouse area failed action
 * @returns {object}
 */
export function searchWarehouseAreasFailed() {
  return {
    type: SEARCH_WAREHOUSE_AREAS_FAILED,
  }
}

/**
 * Get warehouse area details
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getWarehouseAreaDetailById(payload, onSuccess, onError) {
  return {
    type: GET_WAREHOUSE_AREA_DETAIL_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get warehouse area details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getWarehouseAreaDetailByIdSuccess(payload) {
  return {
    type: GET_WAREHOUSE_AREA_DETAIL_SUCCESS,
    payload: payload,
  }
}

/**
 * Get warehouse area details by id failed action
 * @returns {object}
 */
export function getWarehouseAreaDetailByIdFailed() {
  return {
    type: GET_WAREHOUSE_AREA_DETAIL_FAILED,
  }
}

export function resetWarehouseAreaState() {
  return {
    type: RESET_WAREHOUSE_AREA_DETAIL_STATE,
  }
}

export default {
  searchWarehouseAreas,
  searchWarehouseAreasSuccess,
  searchWarehouseAreasFailed,
  getWarehouseAreaDetailById,
  getWarehouseAreaDetailByIdSuccess,
  getWarehouseAreaDetailByIdFailed,
  resetWarehouseAreaState,
}
