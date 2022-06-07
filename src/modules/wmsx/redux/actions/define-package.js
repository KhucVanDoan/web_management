export const SEARCH_PACKAGES_START = 'WMSX_SEARCH_PACKAGES_START'
export const SEARCH_PACKAGES_SUCCESS = 'WMSX_SEARCH_PACKAGES_SUCCESS'
export const SEARCH_PACKAGES_FAILED = 'WMSX_SEARCH_PACKAGES_FAILED'

export const CREATE_PACKAGE_START = 'WMSX_CREATE_PACKAGE_START'
export const CREATE_PACKAGE_SUCCESS = 'WMSX_CREATE_PACKAGE_SUCCESS'
export const CREATE_PACKAGE_FAILED = 'WMSX_CREATE_PACKAGE_FAILED'

export const UPDATE_PACKAGE_START = 'WMSX_UPDATE_PACKAGE_START'
export const UPDATE_PACKAGE_SUCCESS = 'WMSX_UPDATE_PACKAGE_SUCCESS'
export const UPDATE_PACKAGE_FAILED = 'WMSX_UPDATE_PACKAGE_FAILED'

export const DELETE_PACKAGE_START = 'WMSX_DELETE_PACKAGE_START'
export const DELETE_PACKAGE_SUCCESS = 'WMSX_DELETE_PACKAGE_SUCCESS'
export const DELETE_PACKAGE_FAILED = 'WMSX_DELETE_PACKAGE_FAILED'

export const GET_PACKAGE_DETAILS_START = 'WMSX_GET_PACKAGE_DETAILS_START'
export const GET_PACKAGE_DETAILS_SUCCESS = 'WMSX_GET_PACKAGE_DETAILS_SUCCESS'
export const GET_PACKAGE_DETAILS_FAILED = 'WMSX_GET_PACKAGE_DETAILS_FAILED'

export const RESET_PACKAGE_DETAILS_STATE = 'WMSX_RESET_PACKAGE_DETAILS_STATE'

/**
 * Search package
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchPackages(payload, onSuccess, onError) {
  return {
    type: SEARCH_PACKAGES_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search package success action
 * @param {*} payload
 * @returns {object}
 */
export function searchPackagesSuccess(payload) {
  return {
    type: SEARCH_PACKAGES_SUCCESS,
    payload: payload,
  }
}

/**
 * Search package failed action
 * @returns {object}
 */
export function searchPackagesFailed() {
  return {
    type: SEARCH_PACKAGES_FAILED,
  }
}

/**
 * Create package
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createPackage(payload, onSuccess, onError) {
  return {
    type: CREATE_PACKAGE_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Create package success action
 * @param {*} payload
 * @returns {object}
 */
export function createPackageSuccess(payload) {
  return {
    type: CREATE_PACKAGE_SUCCESS,
    payload: payload,
  }
}

/**
 * Create package failed action
 * @returns {object}
 */
export function createPackageFailed() {
  return {
    type: CREATE_PACKAGE_FAILED,
  }
}

/**
 * Update package
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updatePackage(payload, onSuccess, onError) {
  return {
    type: UPDATE_PACKAGE_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Update package success action
 * @param {*} payload
 * @returns {object}
 */
export function updatePackageSuccess(payload) {
  return {
    type: UPDATE_PACKAGE_SUCCESS,
    payload: payload,
  }
}

/**
 * Update package failed action
 * @returns {object}
 */
export function updatePackageFailed() {
  return {
    type: UPDATE_PACKAGE_FAILED,
  }
}
/**
 * Delete package
 * @param {int} packageId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deletePackage(packageId, onSuccess, onError) {
  return {
    type: DELETE_PACKAGE_START,
    payload: packageId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete package success action
 * @param {*} payload
 * @returns {object}
 */
export function deletePackageSuccess(payload) {
  return {
    type: DELETE_PACKAGE_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete package failed action
 * @returns {object}
 */
export function deletePackageFailed() {
  return {
    type: DELETE_PACKAGE_FAILED,
  }
}

/**
 * Get package details
 * @param {int} packageId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getPackageDetailsById(packageId, onSuccess, onError) {
  return {
    type: GET_PACKAGE_DETAILS_START,
    payload: packageId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get package details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getPackageDetailsByIdSuccess(payload) {
  return {
    type: GET_PACKAGE_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get package details by id failed action
 * @returns {object}
 */
export function getPackageDetailsByIdFailed() {
  return {
    type: GET_PACKAGE_DETAILS_FAILED,
  }
}

export function resetPackageDetailsState() {
  return {
    type: RESET_PACKAGE_DETAILS_STATE,
  }
}

export default {
  searchPackages,
  searchPackagesSuccess,
  searchPackagesFailed,
  createPackage,
  createPackageSuccess,
  createPackageFailed,
  updatePackage,
  updatePackageSuccess,
  updatePackageFailed,
  deletePackage,
  deletePackageSuccess,
  deletePackageFailed,
  getPackageDetailsById,
  getPackageDetailsByIdSuccess,
  getPackageDetailsByIdFailed,
  resetPackageDetailsState,
}
