export const GET_COMPANIES_START = 'GET_COMPANIES_START'
export const GET_COMPANIES_SUCCESS = 'GET_COMPANIES_SUCCESS'
export const GET_COMPANIES_FAILED = 'GET_COMPANIES_FAILED'

export const SEARCH_COMPANIES_START = 'SEARCH_COMPANIES_START'
export const SEARCH_COMPANIES_SUCCESS = 'SEARCH_COMPANIES_SUCCESS'
export const SEARCH_COMPANIES_FAILED = 'SEARCH_COMPANIES_FAILED'

export const CREATE_COMPANY_START = 'CREATE_COMPANY_START'
export const CREATE_COMPANY_SUCCESS = 'CREATE_COMPANY_SUCCESS'
export const CREATE_COMPANY_FAILED = 'CREATE_COMPANY_FAILED'

export const UPDATE_COMPANY_START = 'UPDATE_COMPANY_START'
export const UPDATE_COMPANY_SUCCESS = 'UPDATE_COMPANY_SUCCESS'
export const UPDATE_COMPANY_FAILED = 'UPDATE_COMPANY_FAILED'

export const DELETE_COMPANY_START = 'DELETE_COMPANY_START'
export const DELETE_COMPANY_SUCCESS = 'DELETE_COMPANY_SUCCESS'
export const DELETE_COMPANY_FAILED = 'DELETE_COMPANY_FAILED'

export const GET_COMPANY_DETAILS_START = 'GET_COMPANY_DETAILS_START'
export const GET_COMPANY_DETAILS_SUCCESS = 'GET_COMPANY_DETAILS_SUCCESS'
export const GET_COMPANY_DETAILS_FAILED = 'GET_COMPANY_DETAILS_FAILED'

export const RESET_COMPANY_DETAILS_STATE = 'RESET_COMPANY_DETAILS_STATE'

export function getCompanies(payload, onSuccess, onError) {
  return {
    type: GET_COMPANIES_START,
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
export function getCompaniesSuccess(payload) {
  return {
    type: GET_COMPANIES_SUCCESS,
    payload: payload,
  }
}

/**
 * Get factories failed
 * @returns {object}
 */
export function getCompaniesFailed() {
  return {
    type: GET_COMPANIES_FAILED,
  }
}

export function searchCompanies(payload, onSuccess, onError) {
  return {
    type: SEARCH_COMPANIES_START,
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
export function searchCompaniesSuccess(payload) {
  return {
    type: SEARCH_COMPANIES_SUCCESS,
    payload: payload,
  }
}

/**
 * Search warehouse failed action
 * @returns {object}
 */
export function searchCompaniesFailed() {
  return {
    type: SEARCH_COMPANIES_FAILED,
  }
}

/**
 * Create warehouse
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createCompany(payload, onSuccess, onError) {
  return {
    type: CREATE_COMPANY_START,
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
export function createCompanySuccess(payload) {
  return {
    type: CREATE_COMPANY_SUCCESS,
    payload: payload,
  }
}

/**
 * Create warehouse failed action
 * @returns {object}
 */
export function createCompanyFailed() {
  return {
    type: CREATE_COMPANY_FAILED,
  }
}

/**
 * Update warehouse
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateCompany(payload, onSuccess, onError) {
  return {
    type: UPDATE_COMPANY_START,
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
export function updateCompanySuccess(payload) {
  return {
    type: UPDATE_COMPANY_SUCCESS,
    payload: payload,
  }
}

/**
 * Update warehouse failed action
 * @returns {object}
 */
export function updateCompanyFailed() {
  return {
    type: UPDATE_COMPANY_FAILED,
  }
}
/**
 * Delete warehouse
 * @param {int} warehouseId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteCompany(warehouseId, onSuccess, onError) {
  return {
    type: DELETE_COMPANY_START,
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
export function deleteCompanySuccess(payload) {
  return {
    type: DELETE_COMPANY_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete warehouse failed action
 * @returns {object}
 */
export function deleteCompanyFailed() {
  return {
    type: DELETE_COMPANY_FAILED,
  }
}

/**
 * Get warehouse details
 * @param {int} warehouseId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getCompanyDetailsById(warehouseId, onSuccess, onError) {
  return {
    type: GET_COMPANY_DETAILS_START,
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
export function getCompanyDetailsByIdSuccess(payload) {
  return {
    type: GET_COMPANY_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get warehouse details by id failed action
 * @returns {object}
 */
export function getCompanyDetailsByIdFailed() {
  return {
    type: GET_COMPANY_DETAILS_FAILED,
  }
}

export function resetCompanyDetailsState() {
  return {
    type: RESET_COMPANY_DETAILS_STATE,
  }
}

export default {
  getCompanies,
  getCompaniesSuccess,
  getCompaniesFailed,
  searchCompanies,
  searchCompaniesSuccess,
  searchCompaniesFailed,
  createCompany,
  createCompanySuccess,
  createCompanyFailed,
  updateCompany,
  updateCompanySuccess,
  updateCompanyFailed,
  deleteCompany,
  deleteCompanySuccess,
  deleteCompanyFailed,
  getCompanyDetailsById,
  getCompanyDetailsByIdSuccess,
  getCompanyDetailsByIdFailed,
  resetCompanyDetailsState,
}
