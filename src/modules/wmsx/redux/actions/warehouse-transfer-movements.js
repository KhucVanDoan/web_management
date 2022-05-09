export const WMSX_SEARCH_WAREHOUSE_TRANSFER_MOVEMENTS_START =
  'WMSX_SEARCH_WAREHOUSE_TRANSFER_MOVEMENTS_START'
export const WMSX_SEARCH_WAREHOUSE_TRANSFER_MOVEMENTS_SUCCESS =
  'WMSX_SEARCH_WAREHOUSE_TRANSFER_MOVEMENTS_SUCCESS'
export const WMSX_SEARCH_WAREHOUSE_TRANSFER_MOVEMENTS_FAILED =
  'WMSX_SEARCH_WAREHOUSE_TRANSFER_MOVEMENTS_FAILED'

export const WMSX_GET_WAREHOUSE_TRANSFER_MOVEMENT_DETAILS_START =
  'WMSX_GET_WAREHOUSE_TRANSFER_MOVEMENT_DETAILS_START'
export const WMSX_GET_WAREHOUSE_TRANSFER_MOVEMENT_DETAILS_SUCCESS =
  'WMSX_GET_WAREHOUSE_TRANSFER_MOVEMENT_DETAILS_SUCCESS'
export const WMSX_GET_WAREHOUSE_TRANSFER_MOVEMENT_DETAILS_FAILED =
  'WMSX_GET_WAREHOUSE_TRANSFER_MOVEMENT_DETAILS_FAILED'
export const WMSX_RESET_WAREHOUSE_TRANSFER_MOVEMENT_DETAIL_STATE =
  'WMSX_RESET_WAREHOUSE_TRANSFER_MOVEMENT_DETAIL_STATE'

/**
 * Get movement details
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function searchWarehouseTransferMovements(payload, onSuccess, onError) {
  return {
    type: WMSX_SEARCH_WAREHOUSE_TRANSFER_MOVEMENTS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get movement details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function searchWarehouseTransferMovementsSuccess(payload) {
  return {
    type: WMSX_SEARCH_WAREHOUSE_TRANSFER_MOVEMENTS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get movement details by id failed action
 * @returns {object}
 */
export function searchWarehouseTransferMovementsFailed() {
  return {
    type: WMSX_SEARCH_WAREHOUSE_TRANSFER_MOVEMENTS_FAILED,
  }
}

/**
 * Get movement details
 * @param {int} movementId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getWarehouseTransferMovementsDetailsById(
  movementId,
  onSuccess,
  onError,
) {
  return {
    type: WMSX_GET_WAREHOUSE_TRANSFER_MOVEMENT_DETAILS_START,
    payload: movementId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get movement details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getWarehouseTransferMovementsDetailsByIdSuccess(payload) {
  return {
    type: WMSX_GET_WAREHOUSE_TRANSFER_MOVEMENT_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get movement details by id failed action
 * @returns {object}
 */
export function getWarehouseTransferMovementsDetailsByIdFailed() {
  return {
    type: WMSX_GET_WAREHOUSE_TRANSFER_MOVEMENT_DETAILS_FAILED,
  }
}

export function resetWarehouseTransferMovementsState() {
  return {
    type: WMSX_RESET_WAREHOUSE_TRANSFER_MOVEMENT_DETAIL_STATE,
  }
}

export default {
  searchWarehouseTransferMovements,
  searchWarehouseTransferMovementsSuccess,
  searchWarehouseTransferMovementsFailed,
  getWarehouseTransferMovementsDetailsById,
  getWarehouseTransferMovementsDetailsByIdSuccess,
  getWarehouseTransferMovementsDetailsByIdFailed,
  resetWarehouseTransferMovementsState,
}
