export const GET_CUSTOMERS_START = 'MESX_GET_CUSTOMERS_START'
export const GET_CUSTOMERS_SUCCESS = 'MESX_GET_CUSTOMERS_SUCCESS'
export const GET_CUSTOMERS_FAILED = 'MESX_GET_CUSTOMERS_FAILED'

export const SEARCH_CUSTOMERS_START = 'MESX_SEARCH_CUSTOMERS_START'
export const SEARCH_CUSTOMERS_SUCCESS = 'MESX_SEARCH_CUSTOMERS_SUCCESS'
export const SEARCH_CUSTOMERS_FAILED = 'MESX_SEARCH_CUSTOMERS_FAILED'

export const CREATE_CUSTOMER_START = 'MESX_CREATE_CUSTOMER_START'
export const CREATE_CUSTOMER_SUCCESS = 'MESX_CREATE_CUSTOMER_SUCCESS'
export const CREATE_CUSTOMER_FAILED = 'MESX_CREATE_CUSTOMER_FAILED'

export const UPDATE_CUSTOMER_START = 'MESX_UPDATE_CUSTOMER_START'
export const UPDATE_CUSTOMER_SUCCESS = 'MESX_UPDATE_CUSTOMER_SUCCESS'
export const UPDATE_CUSTOMER_FAILED = 'MESX_UPDATE_CUSTOMER_FAILED'

export const DELETE_CUSTOMER_START = 'MESX_DELETE_CUSTOMER_START'
export const DELETE_CUSTOMER_SUCCESS = 'MESX_DELETE_CUSTOMER_SUCCESS'
export const DELETE_CUSTOMER_FAILED = 'MESX_DELETE_CUSTOMER_FAILED'

export const GET_CUSTOMER_DETAILS_START = 'MESX_GET_CUSTOMER_DETAILS_START'
export const GET_CUSTOMER_DETAILS_SUCCESS = 'MESX_GET_CUSTOMER_DETAILS_SUCCESS'
export const GET_CUSTOMER_DETAILS_FAILED = 'MESX_GET_CUSTOMER_DETAILS_FAILED'

export const RESET_CUSTOMER_DETAILS_STATE = 'MESX_RESET_CUSTOMER_DETAILS_STATE'

export function getCustomers(payload, onSuccess, onError) {
  return {
    type: GET_CUSTOMERS_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

/**
 * Get factories success
 * @param {*} payload
 * @returns {object}
 */
export function getCustomersSuccess(payload) {
  return {
    type: GET_CUSTOMERS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get factories failed
 * @returns {object}
 */
export function getCustomersFailed() {
  return {
    type: GET_CUSTOMERS_FAILED,
  }
}

export function searchCustomers(payload, onSuccess, onError) {
  return {
    type: SEARCH_CUSTOMERS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search warehouse success action
 * @param {*} payload
 * @returns {object}
 */
export function searchCustomersSuccess(payload) {
  return {
    type: SEARCH_CUSTOMERS_SUCCESS,
    payload: payload,
  }
}

/**
 * Search warehouse failed action
 * @returns {object}
 */
export function searchCustomersFailed() {
  return {
    type: SEARCH_CUSTOMERS_FAILED,
  }
}

/**
 * Create warehouse
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createCustomer(payload, onSuccess, onError) {
  return {
    type: CREATE_CUSTOMER_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Create warehouse success action
 * @param {*} payload
 * @returns {object}
 */
export function createCustomerSuccess(payload) {
  return {
    type: CREATE_CUSTOMER_SUCCESS,
    payload: payload,
  }
}

/**
 * Create warehouse failed action
 * @returns {object}
 */
export function createCustomerFailed() {
  return {
    type: CREATE_CUSTOMER_FAILED,
  }
}

/**
 * Update warehouse
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateCustomer(payload, onSuccess, onError) {
  return {
    type: UPDATE_CUSTOMER_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Update warehouse success action
 * @param {*} payload
 * @returns {object}
 */
export function updateCustomerSuccess(payload) {
  return {
    type: UPDATE_CUSTOMER_SUCCESS,
    payload: payload,
  }
}

/**
 * Update warehouse failed action
 * @returns {object}
 */
export function updateCustomerFailed() {
  return {
    type: UPDATE_CUSTOMER_FAILED,
  }
}
/**
 * Delete warehouse
 * @param {int} warehouseId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteCustomer(warehouseId, onSuccess, onError) {
  return {
    type: DELETE_CUSTOMER_START,
    payload: warehouseId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete warehouse success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteCustomerSuccess(payload) {
  return {
    type: DELETE_CUSTOMER_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete warehouse failed action
 * @returns {object}
 */
export function deleteCustomerFailed() {
  return {
    type: DELETE_CUSTOMER_FAILED,
  }
}

/**
 * Get warehouse details
 * @param {int} warehouseId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getCustomerDetailsById(warehouseId, onSuccess, onError) {
  return {
    type: GET_CUSTOMER_DETAILS_START,
    payload: warehouseId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get warehouse details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getCustomerDetailsByIdSuccess(payload) {
  return {
    type: GET_CUSTOMER_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get warehouse details by id failed action
 * @returns {object}
 */
export function getCustomerDetailsByIdFailed() {
  return {
    type: GET_CUSTOMER_DETAILS_FAILED,
  }
}

export function resetCustomerDetailsState() {
  return {
    type: RESET_CUSTOMER_DETAILS_STATE,
  }
}

export default {
  getCustomers,
  getCustomersSuccess,
  getCustomersFailed,
  searchCustomers,
  searchCustomersSuccess,
  searchCustomersFailed,
  createCustomer,
  createCustomerSuccess,
  createCustomerFailed,
  updateCustomer,
  updateCustomerSuccess,
  updateCustomerFailed,
  deleteCustomer,
  deleteCustomerSuccess,
  deleteCustomerFailed,
  getCustomerDetailsById,
  getCustomerDetailsByIdSuccess,
  getCustomerDetailsByIdFailed,
  resetCustomerDetailsState,
}
