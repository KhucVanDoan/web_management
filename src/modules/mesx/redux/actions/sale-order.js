export const SEARCH_SALE_ORDERS_START = 'MESX_SEARCH_SALE_ORDERS_START'
export const SEARCH_SALE_ORDERS_SUCCESS = 'MESX_SEARCH_SALE_ORDERS_SUCCESS'
export const SEARCH_SALE_ORDERS_FAILED = 'MESX_SEARCH_SALE_ORDERS_FAILED'

export const CREATE_SALE_ORDER_START = 'MESX_CREATE_SALE_ORDER_START'
export const CREATE_SALE_ORDER_SUCCESS = 'MESX_CREATE_SALE_ORDER_SUCCESS'
export const CREATE_SALE_ORDER_FAILED = 'MESX_CREATE_SALE_ORDER_FAILED'

export const UPDATE_SALE_ORDER_START = 'MESX_UPDATE_SALE_ORDER_START'
export const UPDATE_SALE_ORDER_SUCCESS = 'MESX_UPDATE_SALE_ORDER_SUCCESS'
export const UPDATE_SALE_ORDER_FAILED = 'MESX_UPDATE_SALE_ORDER_FAILED'

export const DELETE_SALE_ORDER_START = 'MESX_DELETE_SALE_ORDER_START'
export const DELETE_SALE_ORDER_SUCCESS = 'MESX_DELETE_SALE_ORDER_SUCCESS'
export const DELETE_SALE_ORDER_FAILED = 'MESX_DELETE_SALE_ORDER_FAILED'

export const GET_SALE_ORDER_DETAILS_START = 'MESX_GET_SALE_ORDER_DETAILS_START'
export const GET_SALE_ORDER_DETAILS_SUCCESS =
  'MESX_GET_SALE_ORDER_DETAILS_SUCCESS'
export const GET_SALE_ORDER_DETAILS_FAILED =
  'MESX_GET_SALE_ORDER_DETAILS_FAILED'

export const CONFIRM_SALE_ORDER_START = 'MESX_CONFIRM_SALE_ORDER_START'
export const CONFIRM_SALE_ORDER_SUCCESS = 'MESX_CONFIRM_SALE_ORDER_SUCCESS'
export const CONFIRM_SALE_ORDER_FAILED = 'MESX_CONFIRM_SALE_ORDER_FAILED'

export const REJECT_SALE_ORDER_START = 'MESX_REJECT_SALE_ORDER_START'
export const REJECT_SALE_ORDER_SUCCESS = 'MESX_REJECT_SALE_ORDER_SUCCESS'
export const REJECT_SALE_ORDER_FAILED = 'MESX_REJECT_SALE_ORDER_FAILED'

export const RESET_SALE_ORDER_STATE = 'MESX_RESET_SALE_ORDER_STATE'
export const RESET_SALE_ORDER_LIST_STATE = 'MESX_RESET_SALE_ORDER_LIST_STATE'

export const GET_SALE_ORDER_DETAIL_BY_IDS_START =
  'MESX_GET_SALE_ORDER_DETAIL_BY_IDS_START'
export const GET_SALE_ORDER_DETAIL_BY_IDS_SUCCESS =
  'MESX_GET_SALE_ORDER_DETAIL_BY_IDS_SUCCESS'
export const GET_SALE_ORDER_DETAIL_BY_IDS_FAILED =
  'MESX_GET_SALE_ORDER_DETAIL_BY_IDS_FAILED'

export const GET_SALE_ORDER_LIST_ALL = 'MESX_GET_SALE_ORDER_LIST_ALL'

/**
 * Search SaleOrder
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchSaleOrders(payload, onSuccess, onError) {
  return {
    type: SEARCH_SALE_ORDERS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search SaleOrder success action
 * @param {*} payload
 * @returns {object}
 */
export function searchSaleOrdersSuccess(payload) {
  return {
    type: SEARCH_SALE_ORDERS_SUCCESS,
    payload: payload,
  }
}

/**
 * Search SaleOrder failed action
 * @returns {object}
 */
export function searchSaleOrdersFailed() {
  return {
    type: SEARCH_SALE_ORDERS_FAILED,
  }
}

/**
 * Create SaleOrder
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createSaleOrder(payload, onSuccess, onError) {
  return {
    type: CREATE_SALE_ORDER_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Create SaleOrder success action
 * @param {*} payload
 * @returns {object}
 */
export function createSaleOrderSuccess(payload) {
  return {
    type: CREATE_SALE_ORDER_SUCCESS,
    payload: payload,
  }
}

/**
 * Create SaleOrder failed action
 * @returns {object}
 */
export function createSaleOrderFailed() {
  return {
    type: CREATE_SALE_ORDER_FAILED,
  }
}

/**
 * Update SaleOrder
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateSaleOrder(payload, onSuccess, onError) {
  return {
    type: UPDATE_SALE_ORDER_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Update SaleOrder success action
 * @param {*} payload
 * @returns {object}
 */
export function updateSaleOrderSuccess(payload) {
  return {
    type: UPDATE_SALE_ORDER_SUCCESS,
    payload: payload,
  }
}

/**
 * Update SaleOrder failed action
 * @returns {object}
 */
export function updateSaleOrderFailed() {
  return {
    type: UPDATE_SALE_ORDER_FAILED,
  }
}
/**
 * Delete SaleOrder
 * @param {int} SaleOrderId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteSaleOrder(SaleOrderId, onSuccess, onError) {
  return {
    type: DELETE_SALE_ORDER_START,
    payload: SaleOrderId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete SaleOrder success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteSaleOrderSuccess(payload) {
  return {
    type: DELETE_SALE_ORDER_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete SaleOrder failed action
 * @returns {object}
 */
export function deleteSaleOrderFailed() {
  return {
    type: DELETE_SALE_ORDER_FAILED,
  }
}

/**
 * Get SaleOrder details
 * @param {int} SaleOrderId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getSaleOrderDetailsById(SaleOrderId, onSuccess, onError) {
  return {
    type: GET_SALE_ORDER_DETAILS_START,
    payload: SaleOrderId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get SaleOrder details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getSaleOrderDetailsByIdSuccess(payload) {
  return {
    type: GET_SALE_ORDER_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get SaleOrder details by id failed action
 * @returns {object}
 */
export function getSaleOrderDetailsByIdFailed() {
  return {
    type: GET_SALE_ORDER_DETAILS_FAILED,
  }
}

/**
 * Get confirm Sale order
 * @param {int} SaleOrderId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function confirmSaleOrderById(SaleOrderId, onSuccess, onError) {
  return {
    type: CONFIRM_SALE_ORDER_START,
    payload: SaleOrderId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get confirm Sale order by id success action
 * @param {*} payload
 * @returns {object}
 */
export function confirmSaleOrderByIdSuccess(payload) {
  return {
    type: CONFIRM_SALE_ORDER_SUCCESS,
    payload: payload,
  }
}

/**
 * Get confirm Sale order by id failed action
 * @returns {object}
 */
export function confirmSaleOrderByIdFailed() {
  return {
    type: CONFIRM_SALE_ORDER_FAILED,
  }
}

/**
 * Get reject Sale order
 * @param {int} SaleOrderId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function rejectSaleOrderById(SaleOrderId, onSuccess, onError) {
  return {
    type: REJECT_SALE_ORDER_START,
    payload: SaleOrderId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get reject Sale order by id success action
 * @param {*} payload
 * @returns {object}
 */
export function rejectSaleOrderByIdSuccess(payload) {
  return {
    type: REJECT_SALE_ORDER_SUCCESS,
    payload: payload,
  }
}

/**
 * Get reject Sale order by id failed action
 * @returns {object}
 */
export function rejectSaleOrderByIdFailed() {
  return {
    type: REJECT_SALE_ORDER_FAILED,
  }
}

export function resetSaleOrderState() {
  return {
    type: RESET_SALE_ORDER_STATE,
  }
}

export function resetSaleOrderListState() {
  return {
    type: RESET_SALE_ORDER_LIST_STATE,
  }
}

export function getSaleOrderDetailsByIds(SaleOrderIds, onSuccess, onError) {
  return {
    type: GET_SALE_ORDER_DETAIL_BY_IDS_START,
    payload: SaleOrderIds,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getSaleOrderDetailsByIdsSuccess(payload) {
  return {
    type: GET_SALE_ORDER_DETAIL_BY_IDS_SUCCESS,
    payload: payload,
  }
}

export function getSaleOrderDetailsByIdsFailed() {
  return {
    type: GET_SALE_ORDER_DETAIL_BY_IDS_FAILED,
  }
}

export function getSaleOrderListAll(payload) {
  return {
    type: GET_SALE_ORDER_LIST_ALL,
    payload,
  }
}

export default {
  searchSaleOrders,
  searchSaleOrdersFailed,
  searchSaleOrdersSuccess,
  createSaleOrder,
  createSaleOrderFailed,
  createSaleOrderSuccess,
  deleteSaleOrder,
  deleteSaleOrderFailed,
  deleteSaleOrderSuccess,
  updateSaleOrder,
  updateSaleOrderFailed,
  updateSaleOrderSuccess,
  getSaleOrderDetailsById,
  getSaleOrderDetailsByIdFailed,
  getSaleOrderDetailsByIdSuccess,
  confirmSaleOrderById,
  confirmSaleOrderByIdFailed,
  confirmSaleOrderByIdSuccess,
  rejectSaleOrderById,
  rejectSaleOrderByIdFailed,
  rejectSaleOrderByIdSuccess,
  resetSaleOrderState,
  resetSaleOrderListState,
  getSaleOrderDetailsByIds,
  getSaleOrderDetailsByIdsSuccess,
  getSaleOrderDetailsByIdsFailed,
  getSaleOrderListAll,
}
