export const SEARCH_WORK_ORDERS_START = 'MESX_SEARCH_WORK_ORDERS_START'
export const SEARCH_WORK_ORDERS_SUCCESS = 'MESX_SEARCH_WORK_ORDERS_SUCCESS'
export const SEARCH_WORK_ORDERS_FAILED = 'MESX_SEARCH_WORK_ORDERS_FAILED'

export const CREATE_WORK_ORDER_START = 'MESX_CREATE_WORK_ORDER_START'
export const CREATE_WORK_ORDER_SUCCESS = 'MESX_CREATE_WORK_ORDER_SUCCESS'
export const CREATE_WORK_ORDER_FAILED = 'MESX_CREATE_WORK_ORDER_FAILED'

export const UPDATE_WORK_ORDER_START = 'MESX_UPDATE_WORK_ORDER_START'
export const UPDATE_WORK_ORDER_SUCCESS = 'MESX_UPDATE_WORK_ORDER_SUCCESS'
export const UPDATE_WORK_ORDER_FAILED = 'MESX_UPDATE_WORK_ORDER_FAILED'

export const DELETE_WORK_ORDER_START = 'MESX_DELETE_WORK_ORDER_START'
export const DELETE_WORK_ORDER_SUCCESS = 'MESX_DELETE_WORK_ORDER_SUCCESS'
export const DELETE_WORK_ORDER_FAILED = 'MESX_DELETE_WORK_ORDER_FAILED'

export const GET_WORK_ORDER_DETAILS_START = 'MESX_GET_WORK_ORDER_DETAILS_START'
export const GET_WORK_ORDER_DETAILS_SUCCESS =
  'MESX_GET_WORK_ORDER_DETAILS_SUCCESS'
export const GET_WORK_ORDER_DETAILS_FAILED =
  'MESX_GET_WORK_ORDER_DETAILS_FAILED'

export const CONFIRM_WORK_ORDER_START = 'MESX_CONFIRM_WORK_ORDER_START'
export const CONFIRM_WORK_ORDER_SUCCESS = 'MESX_CONFIRM_WORK_ORDER_SUCCESS'
export const CONFIRM_WORK_ORDER_FAILED = 'MESX_CONFIRM_WORK_ORDER_FAILED'

export const GET_BOM_DETAILS_WORK_ORDER_START =
  'MESX_GET_BOM_DETAILS_WORK_ORDER_START'
export const GET_BOM_DETAILS_WORK_ORDER_SUCCESS =
  'MESX_GET_BOM_DETAILS_WORK_ORDER_SUCCESS'
export const GET_BOM_DETAILS_WORK_ORDER_FAILED =
  'MESX_GET_BOM_DETAILS_WORK_ORDER_FAILED'

export const PRINT_QR_WORK_ORDER_START = 'MESX_PRINT_QR_WORK_ORDER_START'
export const PRINT_QR_WORK_ORDER_SUCCESS = 'MESX_PRINT_QR_WORK_ORDER_SUCCESS'
export const PRINT_QR_WORK_ORDER_FAILED = 'MESX_PRINT_QR_WORK_ORDER_FAILED'

export const RESET_WORK_ORDER_DETAILS_STATE =
  'MESX_RESET_WORK_ORDER_DETAILS_STATE'

export const AUTOCOMPLETE_WORK_ORDER_START = 'AUTOCOMPLETE_WORK_ORDER_START'
export const AUTOCOMPLETE_WORK_ORDER_SUCCESS = 'AUTOCOMPLETE_WORK_ORDER_SUCCESS'
export const AUTOCOMPLETE_WORK_ORDER_FAILED = 'AUTOCOMPLETE_WORK_ORDER_FAILED'

/**
 * Search workOrder
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchWorkOrders(payload, onSuccess, onError) {
  return {
    type: SEARCH_WORK_ORDERS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search workOrder success action
 * @param {*} payload
 * @returns {object}
 */
export function searchWorkOrdersSuccess(payload) {
  return {
    type: SEARCH_WORK_ORDERS_SUCCESS,
    payload: payload,
  }
}

/**
 * Search workOrder failed action
 * @returns {object}
 */
export function searchWorkOrdersFailed() {
  return {
    type: SEARCH_WORK_ORDERS_FAILED,
  }
}

/**
 * Create workOrder
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createWorkOrder(payload, onSuccess, onError) {
  return {
    type: CREATE_WORK_ORDER_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Create workOrder success action
 * @param {*} payload
 * @returns {object}
 */
export function createWorkOrderSuccess(payload) {
  return {
    type: CREATE_WORK_ORDER_SUCCESS,
    payload: payload,
  }
}

/**
 * Create workOrder failed action
 * @returns {object}
 */
export function createWorkOrderFailed() {
  return {
    type: CREATE_WORK_ORDER_FAILED,
  }
}

/**
 * Update workOrder
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateWorkOrder(payload, onSuccess, onError) {
  return {
    type: UPDATE_WORK_ORDER_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Update workOrder success action
 * @param {*} payload
 * @returns {object}
 */
export function updateWorkOrderSuccess(payload) {
  return {
    type: UPDATE_WORK_ORDER_SUCCESS,
    payload: payload,
  }
}

/**
 * Update workOrder failed action
 * @returns {object}
 */
export function updateWorkOrderFailed() {
  return {
    type: UPDATE_WORK_ORDER_FAILED,
  }
}
/**
 * Delete workOrder
 * @param {int} workOrderId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteWorkOrder(workOrderId, onSuccess, onError) {
  return {
    type: DELETE_WORK_ORDER_START,
    payload: workOrderId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete workOrder success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteWorkOrderSuccess(payload) {
  return {
    type: DELETE_WORK_ORDER_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete workOrder failed action
 * @returns {object}
 */
export function deleteWorkOrderFailed() {
  return {
    type: DELETE_WORK_ORDER_FAILED,
  }
}

/**
 * Get workOrder details
 * @param {int} workOrderId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getWorkOrderDetailsById(workOrderId, onSuccess, onError) {
  return {
    type: GET_WORK_ORDER_DETAILS_START,
    payload: workOrderId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get workOrder details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getWorkOrderDetailsByIdSuccess(payload) {
  return {
    type: GET_WORK_ORDER_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get workOrder details by id failed action
 * @returns {object}
 */
export function getWorkOrderDetailsByIdFailed() {
  return {
    type: GET_WORK_ORDER_DETAILS_FAILED,
  }
}

/**
 * Get confirm production order
 * @param {int} workOrderId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function confirmWorkOrderById(workOrderId, onSuccess, onError) {
  return {
    type: CONFIRM_WORK_ORDER_START,
    payload: workOrderId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get confirm production order by id success action
 * @param {*} payload
 * @returns {object}
 */
export function confirmWorkOrderByIdSuccess(payload) {
  return {
    type: CONFIRM_WORK_ORDER_SUCCESS,
    payload: payload,
  }
}

/**
 * Get confirm production order by id failed action
 * @returns {object}
 */
export function confirmWorkOrderByIdFailed() {
  return {
    type: CONFIRM_WORK_ORDER_FAILED,
  }
}
export function getBomsByItemId(workOrderId, onSuccess, onError) {
  return {
    type: GET_BOM_DETAILS_WORK_ORDER_START,
    payload: workOrderId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get workOrder details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getBomDetailsByIdSuccess(payload) {
  return {
    type: GET_BOM_DETAILS_WORK_ORDER_SUCCESS,
    payload: payload,
  }
}

/**
 * Get workOrder details by id failed action
 * @returns {object}
 */
export function getBomDetailsByIdFailed() {
  return {
    type: GET_BOM_DETAILS_WORK_ORDER_FAILED,
  }
}

/**
 * Print QR WorkOrder
 * @param {int} itemId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function printQRWorkOrder(itemId, onSuccess, onError) {
  return {
    type: PRINT_QR_WORK_ORDER_START,
    payload: itemId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Print QR WorkOrder by id success action
 * @param {*} payload
 * @returns {object}
 */
export function printQRWorkOrderSuccess(payload) {
  return {
    type: PRINT_QR_WORK_ORDER_SUCCESS,
    payload: payload,
  }
}

/**
 * Print QR WorkOrder by id failed action
 * @returns {object}
 */
export function printQRWorkOrderFailed() {
  return {
    type: PRINT_QR_WORK_ORDER_FAILED,
  }
}

/**
 * Update BOQ success action
 * @param {*} payload
 * @returns {object}
 */
export function resetWorkOrderDetailState() {
  return {
    type: RESET_WORK_ORDER_DETAILS_STATE,
  }
}

export function autocompleteWorkOrder(payload, onSuccess, onError) {
  return {
    type: AUTOCOMPLETE_WORK_ORDER_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function autocompleteWorkOrderSuccess(payload) {
  return {
    type: AUTOCOMPLETE_WORK_ORDER_SUCCESS,
    payload
  }
}

export function autocompleteWorkOrderFailed() {
  return {
    type: AUTOCOMPLETE_WORK_ORDER_FAILED,
  }
}

export default {
  searchWorkOrders,
  searchWorkOrdersSuccess,
  searchWorkOrdersFailed,
  createWorkOrder,
  createWorkOrderSuccess,
  createWorkOrderFailed,
  updateWorkOrder,
  updateWorkOrderSuccess,
  updateWorkOrderFailed,
  deleteWorkOrder,
  deleteWorkOrderSuccess,
  deleteWorkOrderFailed,
  getWorkOrderDetailsById,
  getWorkOrderDetailsByIdSuccess,
  getWorkOrderDetailsByIdFailed,
  confirmWorkOrderById,
  confirmWorkOrderByIdSuccess,
  confirmWorkOrderByIdFailed,
  getBomsByItemId,
  getBomDetailsByIdSuccess,
  getBomDetailsByIdFailed,
  printQRWorkOrder,
  printQRWorkOrderSuccess,
  printQRWorkOrderFailed,
  resetWorkOrderDetailState,
  autocompleteWorkOrder,
  autocompleteWorkOrderSuccess,
  autocompleteWorkOrderFailed,
}
