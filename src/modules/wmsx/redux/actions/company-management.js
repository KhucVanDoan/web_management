export const GET_COMPANIES_START = 'WMSX_GET_COMPANIES_START'
export const GET_COMPANIES_SUCCESS = 'WMSX_GET_COMPANIES_SUCCESS'
export const GET_COMPANIES_FAILED = 'WMSX_GET_COMPANIES_FAILED'

export const SEARCH_COMPANIES_START = 'WMSX_SEARCH_COMPANIES_START'
export const SEARCH_COMPANIES_SUCCESS = 'WMSX_SEARCH_COMPANIES_SUCCESS'
export const SEARCH_COMPANIES_FAILED = 'WMSX_SEARCH_COMPANIES_FAILED'

export const CREATE_COMPANY_START = 'WMSX_CREATE_COMPANY_START'
export const CREATE_COMPANY_SUCCESS = 'WMSX_CREATE_COMPANY_SUCCESS'
export const CREATE_COMPANY_FAILED = 'WMSX_CREATE_COMPANY_FAILED'

export const UPDATE_COMPANY_START = 'WMSX_UPDATE_COMPANY_START'
export const UPDATE_COMPANY_SUCCESS = 'WMSX_UPDATE_COMPANY_SUCCESS'
export const UPDATE_COMPANY_FAILED = 'WMSX_UPDATE_COMPANY_FAILED'

export const DELETE_COMPANY_START = 'WMSX_DELETE_COMPANY_START'
export const DELETE_COMPANY_SUCCESS = 'WMSX_DELETE_COMPANY_SUCCESS'
export const DELETE_COMPANY_FAILED = 'WMSX_DELETE_COMPANY_FAILED'

export const GET_COMPANY_DETAILS_START = 'WMSX_GET_COMPANY_DETAILS_START'
export const GET_COMPANY_DETAILS_SUCCESS = 'WMSX_GET_COMPANY_DETAILS_SUCCESS'
export const GET_COMPANY_DETAILS_FAILED = 'WMSX_GET_COMPANY_DETAILS_FAILED'

export const CONFIRM_COMPANY_START = 'WMSX_CONFIRM_COMPANY_START'
export const CONFIRM_COMPANY_SUCCESS = 'WMSX_CONFIRM_COMPANY_SUCCESS'
export const CONFIRM_COMPANY_FAILED = 'WMSX_CONFIRM_COMPANY_FAILED'

export const REJECT_COMPANY_START = 'WMSX_REJECT_COMPANY_START'
export const REJECT_COMPANY_SUCCESS = 'WMSX_REJECT_COMPANY_SUCCESS'
export const REJECT_COMPANY_FAILED = 'WMSX_REJECT_COMPANY_FAILED'

export const RESET_COMPANY_DETAILS_STATE = 'WMSX_RESET_COMPANY_DETAILS_STATE'

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

export function confirmCompanyById(Id, onSuccess, onError) {
  return {
    type: CONFIRM_COMPANY_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function confirmCompanyByIdSuccess(payload) {
  return {
    type: CONFIRM_COMPANY_SUCCESS,
    payload: payload,
  }
}

export function confirmCompanyByIdFailed() {
  return {
    type: CONFIRM_COMPANY_FAILED,
  }
}

export function rejectCompanyById(Id, onSuccess, onError) {
  return {
    type: REJECT_COMPANY_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function rejectCompanyByIdSuccess(payload) {
  return {
    type: REJECT_COMPANY_SUCCESS,
    payload: payload,
  }
}

export function rejectCompanyByIdFailed() {
  return {
    type: REJECT_COMPANY_FAILED,
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
  confirmCompanyById,
  confirmCompanyByIdSuccess,
  confirmCompanyByIdFailed,
  rejectCompanyById,
  rejectCompanyByIdSuccess,
  rejectCompanyByIdFailed,
  resetCompanyDetailsState,
}
