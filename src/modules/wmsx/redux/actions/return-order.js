export const SEARCH_RETURN_ORDERS_START = 'WMSX_SEARCH_RETURN_ORDERS_START'
export const SEARCH_RETURN_ORDERS_SUCCESS = 'WMSX_SEARCH_RETURN_ORDERS_SUCCESS'
export const SEARCH_RETURN_ORDERS_FAILED = 'WMSX_SEARCH_RETURN_ORDERS_FAILED'

export const CREATE_RETURN_ORDER_START = 'WMSX_CREATE_RETURN_ORDER_START'
export const CREATE_RETURN_ORDER_SUCCESS = 'WMSX_CREATE_RETURN_ORDER_SUCCESS'
export const CREATE_RETURN_ORDER_FAILED = 'WMSX_CREATE_RETURN_ORDER_FAILED'

export const UPDATE_RETURN_ORDER_START = 'WMSX_UPDATE_RETURN_ORDER_START'
export const UPDATE_RETURN_ORDER_SUCCESS = 'WMSX_UPDATE_RETURN_ORDER_SUCCESS'
export const UPDATE_RETURN_ORDER_FAILED = 'WMSX_UPDATE_RETURN_ORDER_FAILED'

export const DELETE_RETURN_ORDER_START = 'WMSX_DELETE_RETURN_ORDER_START'
export const DELETE_RETURN_ORDER_SUCCESS = 'WMSX_DELETE_RETURN_ORDER_SUCCESS'
export const DELETE_RETURN_ORDER_FAILED = 'WMSX_DELETE_RETURN_ORDER_FAILED'

export const GET_RETURN_ORDER_DETAILS_START =
  'WMSX_GET_RETURN_ORDER_DETAILS_START'
export const GET_RETURN_ORDER_DETAILS_SUCCESS =
  'WMSX_GET_RETURN_ORDER_DETAILS_SUCCESS'
export const GET_RETURN_ORDER_DETAILS_FAILED =
  'WMSX_GET_RETURN_ORDER_DETAILS_FAILED'

export const CONFIRM_RETURN_ORDER_START = 'WMSX_CONFIRM_RETURN_ORDER_START'
export const CONFIRM_RETURN_ORDER_SUCCESS = 'WMSX_CONFIRM_RETURN_ORDER_SUCCESS'
export const CONFIRM_RETURN_ORDER_FAILED = 'WMSX_CONFIRM_RETURN_ORDER_FAILED'

export const REJECT_RETURN_ORDER_START = 'WMSX_REJECT_RETURN_ORDER_START'
export const REJECT_RETURN_ORDER_SUCCESS = 'WMSX_REJECT_RETURN_ORDER_SUCCESS'
export const REJECT_RETURN_ORDER_FAILED = 'WMSX_REJECT_RETURN_ORDER_FAILED'

export const GET_ITEMS_BY_ORDER_RETURN_ORDER_START =
  'WMSX_GET_ITEMS_BY_ORDER_RETURN_ORDER_START'
export const GET_ITEMS_BY_ORDER_RETURN_ORDER_SUCCESS =
  'WMSX_GET_ITEMS_BY_ORDER_RETURN_ORDER_SUCCESS'
export const GET_ITEMS_BY_ORDER_RETURN_ORDER_FAILED =
  'WMSX_GET_ITEMS_BY_ORDER_RETURN_ORDER_FAILED'

export const RESET_RETURN_ORDER = 'WMSX_RESET_RETURN_ORDER'
/**
 * Search
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchReturnOrders(payload, onSuccess, onError) {
  return {
    type: SEARCH_RETURN_ORDERS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search  success action
 * @param {*} payload
 * @returns {object}
 */
export function searchReturnOrdersSuccess(payload) {
  return {
    type: SEARCH_RETURN_ORDERS_SUCCESS,
    payload: payload,
  }
}

/**
 * Search  failed action
 * @returns {object}
 */
export function searchReturnOrdersFailed() {
  return {
    type: SEARCH_RETURN_ORDERS_FAILED,
  }
}

/**
 * Create
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createReturnOrder(payload, onSuccess, onError) {
  return {
    type: CREATE_RETURN_ORDER_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Create  success action
 * @param {*} payload
 * @returns {object}
 */
export function createReturnOrderSuccess(payload) {
  return {
    type: CREATE_RETURN_ORDER_SUCCESS,
    payload: payload,
  }
}

/**
 * Create  failed action
 * @returns {object}
 */
export function createReturnOrderFailed() {
  return {
    type: CREATE_RETURN_ORDER_FAILED,
  }
}

/**
 * Update
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateReturnOrder(payload, onSuccess, onError) {
  return {
    type: UPDATE_RETURN_ORDER_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Update  success action
 * @param {*} payload
 * @returns {object}
 */
export function updateReturnOrderSuccess(payload) {
  return {
    type: UPDATE_RETURN_ORDER_SUCCESS,
    payload: payload,
  }
}

/**
 * Update  failed action
 * @returns {object}
 */
export function updateReturnOrderFailed() {
  return {
    type: UPDATE_RETURN_ORDER_FAILED,
  }
}
/**
 * Delete
 * @param {int} Id
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteReturnOrder(Id, onSuccess, onError) {
  return {
    type: DELETE_RETURN_ORDER_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete  success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteReturnOrderSuccess(payload) {
  return {
    type: DELETE_RETURN_ORDER_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete  failed action
 * @returns {object}
 */
export function deleteReturnOrderFailed() {
  return {
    type: DELETE_RETURN_ORDER_FAILED,
  }
}

/**
 * Get  details
 * @param {int} Id
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getReturnOrderDetailsById(Id, onSuccess, onError) {
  return {
    type: GET_RETURN_ORDER_DETAILS_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get  details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getReturnOrderDetailsByIdSuccess(payload) {
  return {
    type: GET_RETURN_ORDER_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get  details by id failed action
 * @returns {object}
 */
export function getReturnOrderDetailsByIdFailed() {
  return {
    type: GET_RETURN_ORDER_DETAILS_FAILED,
  }
}

/**
 * Get confirm warehouse transfer
 * @param {int} Id
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function confirmReturnOrderById(Id, onSuccess, onError) {
  return {
    type: CONFIRM_RETURN_ORDER_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get confirm warehouse transfer by id success action
 * @param {*} payload
 * @returns {object}
 */
export function confirmReturnOrderByIdSuccess(payload) {
  return {
    type: CONFIRM_RETURN_ORDER_SUCCESS,
    payload: payload,
  }
}

/**
 * Get confirm warehouse transfer by id failed action
 * @returns {object}
 */
export function confirmReturnOrderByIdFailed() {
  return {
    type: CONFIRM_RETURN_ORDER_FAILED,
  }
}

/**
 * Get reject warehouse transfer
 * @param {int} Id
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function rejectReturnOrderById(Id, onSuccess, onError) {
  return {
    type: REJECT_RETURN_ORDER_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get reject warehouse transfer by id success action
 * @param {*} payload
 * @returns {object}
 */
export function rejectReturnOrderByIdSuccess(payload) {
  return {
    type: REJECT_RETURN_ORDER_SUCCESS,
    payload: payload,
  }
}

/**
 * Get reject warehouse transfer by id failed action
 * @returns {object}
 */
export function rejectReturnOrderByIdFailed() {
  return {
    type: REJECT_RETURN_ORDER_FAILED,
  }
}

/**
 * Get item by order return order
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getItemsByOrderReturnOrder(payload, onSuccess, onError) {
  return {
    type: GET_ITEMS_BY_ORDER_RETURN_ORDER_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get list success action
 * @param {*} payload
 * @returns {object}
 */
export function getItemsByOrderReturnOrderSuccess(payload) {
  return {
    type: GET_ITEMS_BY_ORDER_RETURN_ORDER_SUCCESS,
    payload: payload,
  }
}

/**
 * Get list failed action
 * @returns {object}
 */
export function getItemsByOrderReturnOrderFailed() {
  return {
    type: GET_ITEMS_BY_ORDER_RETURN_ORDER_FAILED,
  }
}
export function resetReturnOrder() {
  return {
    type: RESET_RETURN_ORDER,
  }
}
export default {
  searchReturnOrders,
  searchReturnOrdersSuccess,
  searchReturnOrdersFailed,
  createReturnOrder,
  createReturnOrderSuccess,
  createReturnOrderFailed,
  updateReturnOrder,
  updateReturnOrderSuccess,
  updateReturnOrderFailed,
  deleteReturnOrder,
  deleteReturnOrderSuccess,
  deleteReturnOrderFailed,
  getReturnOrderDetailsById,
  getReturnOrderDetailsByIdSuccess,
  getReturnOrderDetailsByIdFailed,
  confirmReturnOrderById,
  confirmReturnOrderByIdSuccess,
  confirmReturnOrderByIdFailed,
  rejectReturnOrderById,
  rejectReturnOrderByIdSuccess,
  rejectReturnOrderByIdFailed,
  getItemsByOrderReturnOrder,
  getItemsByOrderReturnOrderSuccess,
  getItemsByOrderReturnOrderFailed,
  resetReturnOrder,
}
