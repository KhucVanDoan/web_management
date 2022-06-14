export const SEARCH_PURCHASED_ORDERS_START =
  'DATABASE_SEARCH_PURCHASED_ORDERS_START'
export const SEARCH_PURCHASED_ORDERS_SUCCESS =
  'DATABASE_SEARCH_PURCHASED_ORDERS_SUCCESS'
export const SEARCH_PURCHASED_ORDERS_FAILED =
  'DATABASE_SEARCH_PURCHASED_ORDERS_FAILED'

export const CREATE_PURCHASED_ORDER_START =
  'DATABASE_CREATE_PURCHASED_ORDER_START'
export const CREATE_PURCHASED_ORDER_SUCCESS =
  'DATABASE_CREATE_PURCHASED_ORDER_SUCCESS'
export const CREATE_PURCHASED_ORDER_FAILED =
  'DATABASE_CREATE_PURCHASED_ORDER_FAILED'

export const UPDATE_PURCHASED_ORDER_START =
  'DATABASE_UPDATE_PURCHASED_ORDER_START'
export const UPDATE_PURCHASED_ORDER_SUCCESS =
  'DATABASE_UPDATE_PURCHASED_ORDER_SUCCESS'
export const UPDATE_PURCHASED_ORDER_FAILED =
  'DATABASE_UPDATE_PURCHASED_ORDER_FAILED'

export const DELETE_PURCHASED_ORDER_START =
  'DATABASE_DELETE_PURCHASED_ORDER_START'
export const DELETE_PURCHASED_ORDER_SUCCESS =
  'DATABASE_DELETE_PURCHASED_ORDER_SUCCESS'
export const DELETE_PURCHASED_ORDER_FAILED =
  'DATABASE_DELETE_PURCHASED_ORDER_FAILED'

export const GET_PURCHASED_ORDER_DETAILS_START =
  'DATABASE_GET_PURCHASED_ORDER_DETAILS_START'
export const GET_PURCHASED_ORDER_DETAILS_SUCCESS =
  'DATABASE_GET_PURCHASED_ORDER_DETAILS_SUCCESS'
export const GET_PURCHASED_ORDER_DETAILS_FAILED =
  'DATABASE_GET_PURCHASED_ORDER_DETAILS_FAILED'

export const CONFIRM_PURCHASED_ORDER_START =
  'DATABASE_CONFIRM_PURCHASED_ORDER_START'
export const CONFIRM_PURCHASED_ORDER_SUCCESS =
  'DATABASE_CONFIRM_PURCHASED_ORDER_SUCCESS'
export const CONFIRM_PURCHASED_ORDER_FAILED =
  'DATABASE_CONFIRM_PURCHASED_ORDER_FAILED'

export const REJECT_PURCHASED_ORDER_START =
  'DATABASE_REJECT_PURCHASED_ORDER_START'
export const REJECT_PURCHASED_ORDER_SUCCESS =
  'DATABASE_REJECT_PURCHASED_ORDER_SUCCESS'
export const REJECT_PURCHASED_ORDER_FAILED =
  'DATABASE_REJECT_PURCHASED_ORDER_FAILED'

export const IMPORT_PURCHASED_ORDER_START =
  'DATABASE_IMPORT_PURCHASED_ORDER_START'
export const IMPORT_PURCHASED_ORDER_SUCCESS =
  'DATABASE_IMPORT_PURCHASED_ORDER_SUCCESS'
export const IMPORT_PURCHASED_ORDER_FAILED =
  'DATABASE_IMPORT_PURCHASED_ORDER_FAILED'

export const GET_PURCHASED_ORDER_NOT_CREATE_POIMP_START =
  'DATABASE_GET_PURCHASED_ORDER_NOT_CREATE_POIMP_START'
export const GET_PURCHASED_ORDER_NOT_CREATE_POIMP_SUCCESS =
  'DATABASE_GET_PURCHASED_ORDER_NOT_CREATE_POIMP_SUCCESS'
export const GET_PURCHASED_ORDER_NOT_CREATE_POIMP_FAILED =
  'DATABASE_GET_PURCHASED_ORDER_NOT_CREATE_POIMP_FAILED'

export const RESET_PURCHASED_ORDER_DETAILS_STATE =
  'DATABASE_RESET_PURCHASED_ORDER_DETAILS_STATE'
/**
 * Search purchasedOrder
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchPurchasedOrders(payload, onSuccess, onError) {
  return {
    type: SEARCH_PURCHASED_ORDERS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search purchasedOrder success action
 * @param {*} payload
 * @returns {object}
 */
export function searchPurchasedOrdersSuccess(payload) {
  return {
    type: SEARCH_PURCHASED_ORDERS_SUCCESS,
    payload: payload,
  }
}

/**
 * Search purchasedOrder failed action
 * @returns {object}
 */
export function searchPurchasedOrdersFailed() {
  return {
    type: SEARCH_PURCHASED_ORDERS_FAILED,
  }
}

/**
 * Create purchasedOrder
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createPurchasedOrder(payload, onSuccess, onError) {
  return {
    type: CREATE_PURCHASED_ORDER_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Create purchasedOrder success action
 * @param {*} payload
 * @returns {object}
 */
export function createPurchasedOrderSuccess(payload) {
  return {
    type: CREATE_PURCHASED_ORDER_SUCCESS,
    payload: payload,
  }
}

/**
 * Create purchasedOrder failed action
 * @returns {object}
 */
export function createPurchasedOrderFailed() {
  return {
    type: CREATE_PURCHASED_ORDER_FAILED,
  }
}

/**
 * Update purchasedOrder
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updatePurchasedOrder(payload, onSuccess, onError) {
  return {
    type: UPDATE_PURCHASED_ORDER_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Update purchasedOrder success action
 * @param {*} payload
 * @returns {object}
 */
export function updatePurchasedOrderSuccess(payload) {
  return {
    type: UPDATE_PURCHASED_ORDER_SUCCESS,
    payload: payload,
  }
}

/**
 * Update purchasedOrder failed action
 * @returns {object}
 */
export function updatePurchasedOrderFailed() {
  return {
    type: UPDATE_PURCHASED_ORDER_FAILED,
  }
}
/**
 * Delete purchasedOrder
 * @param {int} purchasedOrderId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deletePurchasedOrder(purchasedOrderId, onSuccess, onError) {
  return {
    type: DELETE_PURCHASED_ORDER_START,
    payload: purchasedOrderId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete purchasedOrder success action
 * @param {*} payload
 * @returns {object}
 */
export function deletePurchasedOrderSuccess(payload) {
  return {
    type: DELETE_PURCHASED_ORDER_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete purchasedOrder failed action
 * @returns {object}
 */
export function deletePurchasedOrderFailed() {
  return {
    type: DELETE_PURCHASED_ORDER_FAILED,
  }
}

/**
 * Get purchasedOrder details
 * @param {int} purchasedOrderId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getPurchasedOrderDetailsById(
  purchasedOrderId,
  onSuccess,
  onError,
) {
  return {
    type: GET_PURCHASED_ORDER_DETAILS_START,
    payload: purchasedOrderId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get purchasedOrder details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getPurchasedOrderDetailsByIdSuccess(payload) {
  return {
    type: GET_PURCHASED_ORDER_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get purchasedOrder details by id failed action
 * @returns {object}
 */
export function getPurchasedOrderDetailsByIdFailed() {
  return {
    type: GET_PURCHASED_ORDER_DETAILS_FAILED,
  }
}

/**
 * Get confirm purchased order
 * @param {int} purchasedOrderId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function confirmPurchasedOrderById(
  purchasedOrderId,
  onSuccess,
  onError,
) {
  return {
    type: CONFIRM_PURCHASED_ORDER_START,
    payload: purchasedOrderId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get confirm purchased order by id success action
 * @param {*} payload
 * @returns {object}
 */
export function confirmPurchasedOrderByIdSuccess(payload) {
  return {
    type: CONFIRM_PURCHASED_ORDER_SUCCESS,
    payload: payload,
  }
}

/**
 * Get confirm purchased order by id failed action
 * @returns {object}
 */
export function confirmPurchasedOrderByIdFailed() {
  return {
    type: CONFIRM_PURCHASED_ORDER_FAILED,
  }
}

/**
 * Get reject purchased order
 * @param {int} purchasedOrderId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function rejectPurchasedOrderById(purchasedOrderId, onSuccess, onError) {
  return {
    type: REJECT_PURCHASED_ORDER_START,
    payload: purchasedOrderId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get reject purchased order by id success action
 * @param {*} payload
 * @returns {object}
 */
export function rejectPurchasedOrderByIdSuccess(payload) {
  return {
    type: REJECT_PURCHASED_ORDER_SUCCESS,
    payload: payload,
  }
}

/**
 * Get reject purchased order by id failed action
 * @returns {object}
 */
export function rejectPurchasedOrderByIdFailed() {
  return {
    type: REJECT_PURCHASED_ORDER_FAILED,
  }
}

/**
 * import purchased order
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function importPurchasedOrder(payload, onSuccess, onError) {
  return {
    type: IMPORT_PURCHASED_ORDER_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * import purchased order success
 * @param {*} payload
 * @returns {object}
 */
export function importPurchasedOrderSuccess(payload) {
  return {
    type: IMPORT_PURCHASED_ORDER_SUCCESS,
    payload: payload,
  }
}

/**
 * import purchased order failed
 * @returns {object}
 */
export function importPurchasedOrderFailed() {
  return {
    type: IMPORT_PURCHASED_ORDER_FAILED,
  }
}

/**
 * get purchased order not create poimp
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getPurchasedOrderNotCreatePOimp(payload, onSuccess, onError) {
  return {
    type: GET_PURCHASED_ORDER_NOT_CREATE_POIMP_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * get purchased order not create poimp success action
 * @param {*} payload
 * @returns {object}
 */
export function getPurchasedOrderNotCreatePOimpSuccess(payload) {
  return {
    type: GET_PURCHASED_ORDER_NOT_CREATE_POIMP_SUCCESS,
    payload: payload,
  }
}

/**
 * get purchased order not create poimp failed action
 * @returns {object}
 */
export function getPurchasedOrderNotCreatePOimpFailed() {
  return {
    type: GET_PURCHASED_ORDER_NOT_CREATE_POIMP_FAILED,
  }
}

export function resetPurchasedOrderDetailsState() {
  return {
    type: RESET_PURCHASED_ORDER_DETAILS_STATE,
  }
}

export default {
  searchPurchasedOrders,
  searchPurchasedOrdersSuccess,
  searchPurchasedOrdersFailed,
  createPurchasedOrder,
  createPurchasedOrderSuccess,
  createPurchasedOrderFailed,
  updatePurchasedOrder,
  updatePurchasedOrderSuccess,
  updatePurchasedOrderFailed,
  deletePurchasedOrder,
  deletePurchasedOrderSuccess,
  deletePurchasedOrderFailed,
  getPurchasedOrderDetailsById,
  getPurchasedOrderDetailsByIdSuccess,
  getPurchasedOrderDetailsByIdFailed,
  confirmPurchasedOrderById,
  confirmPurchasedOrderByIdSuccess,
  confirmPurchasedOrderByIdFailed,
  rejectPurchasedOrderById,
  rejectPurchasedOrderByIdSuccess,
  rejectPurchasedOrderByIdFailed,
  importPurchasedOrder,
  importPurchasedOrderSuccess,
  importPurchasedOrderFailed,
  getPurchasedOrderNotCreatePOimp,
  getPurchasedOrderNotCreatePOimpSuccess,
  getPurchasedOrderNotCreatePOimpFailed,
  resetPurchasedOrderDetailsState,
}
