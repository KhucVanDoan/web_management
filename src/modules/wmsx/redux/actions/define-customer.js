export const WMSX_SEARCH_CUSTOMERS_START = 'WMSX_SEARCH_CUSTOMERS_START'
export const WMSX_SEARCH_CUSTOMERS_SUCCESS = 'WMSX_SEARCH_CUSTOMERS_SUCCESS'
export const WMSX_SEARCH_CUSTOMERS_FAILED = 'WMSX_SEARCH_CUSTOMERS_FAILED'

export const WMSX_CREATE_CUSTOMER_START = 'WMSX_CREATE_CUSTOMER_START'
export const WMSX_CREATE_CUSTOMER_SUCCESS = 'WMSX_CREATE_CUSTOMER_SUCCESS'
export const WMSX_CREATE_CUSTOMER_FAILED = 'WMSX_CREATE_CUSTOMER_FAILED'

export const WMSX_UPDATE_CUSTOMER_START = 'WMSX_UPDATE_CUSTOMER_START'
export const WMSX_UPDATE_CUSTOMER_SUCCESS = 'WMSX_UPDATE_CUSTOMER_SUCCESS'
export const WMSX_UPDATE_CUSTOMER_FAILED = 'WMSX_UPDATE_CUSTOMER_FAILED'

export const WMSX_DELETE_CUSTOMER_START = 'WMSX_DELETE_CUSTOMER_START'
export const WMSX_DELETE_CUSTOMER_SUCCESS = 'WMSX_DELETE_CUSTOMER_SUCCESS'
export const WMSX_DELETE_CUSTOMER_FAILED = 'WMSX_DELETE_CUSTOMER_FAILED'

export const WMSX_GET_CUSTOMER_DETAILS_START = 'WMSX_GET_CUSTOMER_DETAILS_START'
export const WMSX_GET_CUSTOMER_DETAILS_SUCCESS =
  'WMSX_GET_CUSTOMER_DETAILS_SUCCESS'
export const WMSX_GET_CUSTOMER_DETAILS_FAILED =
  'WMSX_GET_CUSTOMER_DETAILS_FAILED'

export const WMSX_IMPORT_CUSTOMER_START = 'WMSX_IMPORT_CUSTOMER_START'
export const WMSX_IMPORT_CUSTOMER_SUCCESS = 'WMSX_IMPORT_CUSTOMER_SUCCESS'
export const WMSX_IMPORT_CUSTOMER_FAILED = 'WMSX_IMPORT_CUSTOMER_FAILED'

export const WMSX_RESET_CUSTOMER_DETAILS_STATE =
  'WMSX_RESET_CUSTOMER_DETAILS_STATE'

/**
 * Search user
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchCustomers(payload, onSuccess, onError) {
  return {
    type: WMSX_SEARCH_CUSTOMERS_START,
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
export function searchCustomersSuccess(payload) {
  return {
    type: WMSX_SEARCH_CUSTOMERS_SUCCESS,
    payload: payload,
  }
}

/**
 * Search user failed action
 * @returns {object}
 */
export function searchCustomersFailed() {
  return {
    type: WMSX_SEARCH_CUSTOMERS_FAILED,
  }
}

/**
 * Create user
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createCustomer(payload, onSuccess, onError) {
  return {
    type: WMSX_CREATE_CUSTOMER_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Create user success action
 * @param {*} payload
 * @returns {object}
 */
export function createCustomerSuccess(payload) {
  return {
    type: WMSX_CREATE_CUSTOMER_SUCCESS,
    payload: payload,
  }
}

/**
 * Create user failed action
 * @returns {object}
 */
export function createCustomerFailed() {
  return {
    type: WMSX_CREATE_CUSTOMER_FAILED,
  }
}

/**
 * Update user
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateCustomer(payload, onSuccess, onError) {
  return {
    type: WMSX_UPDATE_CUSTOMER_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Update user success action
 * @param {*} payload
 * @returns {object}
 */
export function updateCustomerSuccess(payload) {
  return {
    type: WMSX_UPDATE_CUSTOMER_SUCCESS,
    payload: payload,
  }
}

/**
 * Update user failed action
 * @returns {object}
 */
export function updateCustomerFailed() {
  return {
    type: WMSX_UPDATE_CUSTOMER_FAILED,
  }
}
/**
 * Delete user
 * @param {int} userId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteCustomer(userId, onSuccess, onError) {
  return {
    type: WMSX_DELETE_CUSTOMER_START,
    payload: userId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete user success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteCustomerSuccess(payload) {
  return {
    type: WMSX_DELETE_CUSTOMER_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete user failed action
 * @returns {object}
 */
export function deleteCustomerFailed() {
  return {
    type: WMSX_DELETE_CUSTOMER_FAILED,
  }
}

/**
 * Get user details
 * @param {int} userId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getCustomerDetailsById(userId, onSuccess, onError) {
  return {
    type: WMSX_GET_CUSTOMER_DETAILS_START,
    payload: userId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get user details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getCustomerDetailsByIdSuccess(payload) {
  return {
    type: WMSX_GET_CUSTOMER_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get user details by id failed action
 * @returns {object}
 */
export function getCustomerDetailsByIdFailed() {
  return {
    type: WMSX_GET_CUSTOMER_DETAILS_FAILED,
  }
}

/**
 * import customer
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function importCustomer(payload, onSuccess, onError) {
  return {
    type: WMSX_IMPORT_CUSTOMER_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * import customer success
 * @param {*} payload
 * @returns {object}
 */
export function importCustomerSuccess(payload) {
  return {
    type: WMSX_IMPORT_CUSTOMER_SUCCESS,
    payload: payload,
  }
}

/**
 * import customer failed
 * @returns {object}
 */
export function importCustomerFailed() {
  return {
    type: WMSX_IMPORT_CUSTOMER_FAILED,
  }
}

export function resetCustomerDetails() {
  return {
    type: WMSX_RESET_CUSTOMER_DETAILS_STATE,
  }
}

export default {
  createCustomer,
  createCustomerSuccess,
  createCustomerFailed,
  updateCustomer,
  updateCustomerSuccess,
  updateCustomerFailed,
  getCustomerDetailsById,
  getCustomerDetailsByIdSuccess,
  getCustomerDetailsByIdFailed,
  searchCustomers,
  searchCustomersSuccess,
  searchCustomersFailed,
  deleteCustomer,
  deleteCustomerSuccess,
  deleteCustomerFailed,
  importCustomer,
  importCustomerSuccess,
  importCustomerFailed,
  resetCustomerDetails,
}
