export const GET_DEPARTMENTS_START = 'MESX_GET_DEPARTMENTS_START'
export const GET_DEPARTMENTS_SUCCESS = 'MESX_GET_DEPARTMENTS_SUCCESS'
export const GET_DEPARTMENTS_FAILED = 'MESX_GET_DEPARTMENTS_FAILED'

export const GET_ROLES_START = 'MESX_GET_ROLES_START'
export const GET_ROLES_SUCCESS = 'MESX_GET_ROLES_SUCCESS'
export const GET_ROLES_FAILED = 'MESX_GET_ROLES_FAILED'

export const GET_DETAILS_START = 'MESX_GET_DETAILS_START'
export const GET_DETAILS_SUCCESS = 'MESX_GET_DETAILS_SUCCESS'
export const GET_DETAILS_FAILED = 'MESX_GET_DETAILS_FAILED'

export const GET_ITEMS_START = 'MESX_GET_ITEMS_START'
export const GET_ITEMS_SUCCESS = 'MESX_GET_ITEMS_SUCCESS'
export const GET_ITEMS_FAILED = 'MESX_GET_ITEMS_FAILED'
export const RESET_ITEMS = 'MESX_RESET_ITEMS'

export const GET_WAREHOUSES_START = 'MESX_GET_WAREHOUSES_START'
export const GET_WAREHOUSES_SUCCESS = 'MESX_GET_WAREHOUSES_SUCCESS'
export const GET_WAREHOUSES_FAILED = 'MESX_GET_WAREHOUSES_FAILED'

export const GET_BOMS_START = 'MESX_GET_BOMS_START'
export const GET_BOMS_SUCCESS = 'MESX_GET_BOMS_SUCCESS'
export const GET_BOMS_FAILED = 'MESX_GET_BOMS_FAILED'

export const RESET_FACTORIES_LIST_STATE = 'MESX_RESET_FACTORIES_LIST_STATE'

export const SEARCH_QUALITY_POINTS_START = 'MESX_SEARCH_QUALITY_POINTS_START'
export const SEARCH_QUALITY_POINTS_SUCCESS =
  'MESX_SEARCH_QUALITY_POINTS_SUCCESS'
export const SEARCH_QUALITY_POINTS_FAILED = 'MESX_SEARCH_QUALITY_POINTS_FAILED'

export const GET_GROUP_PERMISSIONS_START = 'MESX_GET_GROUP_PERMISSIONS_START'
export const GET_GROUP_PERMISSIONS_SUCCESS =
  'MESX_GET_GROUP_PERMISSIONS_SUCCESS'
export const GET_GROUP_PERMISSIONS_FAILED = 'MESX_GET_GROUP_PERMISSIONS_FAILED'

export const GET_DEPARTMENTS_ROLE_START = 'MESX_GET_DEPARTMENTS_ROLE_START'
export const GET_DEPARTMENTS_ROLE_SUCCESS = 'MESX_GET_DEPARTMENTS_ROLE_SUCCESS'
export const GET_DEPARTMENTS_ROLE_FAILED = 'MESX_GET_DEPARTMENTS_ROLE_FAILED'

/**
 * Get department
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getDepartments(payload, onSuccess, onError) {
  return {
    type: GET_DEPARTMENTS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get role
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getRoles(payload, onSuccess, onError) {
  return {
    type: GET_ROLES_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get products
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getDetails(payload, onSuccess, onError) {
  return {
    type: GET_DETAILS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get products success action
 * @param {*} payload
 * @returns {object}
 */
export function getDetailsSuccess(payload) {
  return {
    type: GET_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get products failed action
 * @returns {object}
 */
export function getDetailsFailed() {
  return {
    type: GET_DETAILS_FAILED,
  }
}

/**
 * Get items
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getItems(payload, onSuccess, onError) {
  return {
    type: GET_ITEMS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get items success action
 * @param {*} payload
 * @returns {object}
 */
export function getItemsSuccess(payload) {
  return {
    type: GET_ITEMS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get items failed action
 * @returns {object}
 */
export function getItemsFailed() {
  return {
    type: GET_ITEMS_FAILED,
  }
}

/**
 * Get warehouses
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getWarehouses(payload, onSuccess, onError) {
  return {
    type: GET_WAREHOUSES_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get warehouses success action
 * @param {*} payload
 * @returns {object}
 */
export function getWarehousesSuccess(payload) {
  return {
    type: GET_WAREHOUSES_SUCCESS,
    payload: payload,
  }
}

/**
 * Get warehouses failed action
 * @returns {object}
 */
export function getWarehousesFailed() {
  return {
    type: GET_WAREHOUSES_FAILED,
  }
}

/**
 * Get boms
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getBoms(payload, onSuccess, onError) {
  return {
    type: GET_BOMS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get boms success
 * @param {*} payload
 * @returns {object}
 */
export function getBomsSuccess(payload) {
  return {
    type: GET_BOMS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get boms failed
 * @returns {object}
 */
export function getBomsFailed() {
  return {
    type: GET_BOMS_FAILED,
  }
}

/**
 * search quality points
 * Get quality points
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchQualityPoints(payload, onSuccess, onError) {
  return {
    type: SEARCH_QUALITY_POINTS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * search quality point success
 * @param {*} payload
 * @returns {object}
 */
export function searchQualityPointsSuccess(payload, onSuccess, onError) {
  return {
    type: SEARCH_QUALITY_POINTS_SUCCESS,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * search quality point failed
 * @returns {object}
 */
export function searchQualityPointsFailed() {
  return {
    type: SEARCH_QUALITY_POINTS_FAILED,
  }
}

export function resetFactoriesListState() {
  return {
    type: RESET_FACTORIES_LIST_STATE,
  }
}

export function resetItems() {
  return {
    type: RESET_ITEMS,
  }
}

export function getGroupPermissions(payload, onSuccess, onError) {
  return {
    type: GET_GROUP_PERMISSIONS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getGroupPermissionsSuccess(payload) {
  return {
    type: GET_GROUP_PERMISSIONS_SUCCESS,
    payload: payload,
  }
}

export function getGroupPermissionsFailed() {
  return {
    type: GET_GROUP_PERMISSIONS_FAILED,
  }
}

export function getDepartmentsRole(payload, onSuccess, onError) {
  return {
    type: GET_DEPARTMENTS_ROLE_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getDepartmentsRoleSuccess(payload) {
  return {
    type: GET_DEPARTMENTS_ROLE_SUCCESS,
    payload: payload,
  }
}

export function getDepartmentsRoleFailed() {
  return {
    type: GET_DEPARTMENTS_ROLE_FAILED,
  }
}

export default {
  getDepartments,
  getRoles,
  getDetails,
  getDetailsSuccess,
  getDetailsFailed,
  getItems,
  getItemsSuccess,
  getItemsFailed,
  getWarehouses,
  getWarehousesSuccess,
  getWarehousesFailed,
  getBoms,
  getBomsSuccess,
  getBomsFailed,
  searchQualityPoints,
  searchQualityPointsSuccess,
  searchQualityPointsFailed,
  resetFactoriesListState,
  resetItems,
  getGroupPermissions,
  getGroupPermissionsSuccess,
  getGroupPermissionsFailed,
  getDepartmentsRole,
  getDepartmentsRoleSuccess,
  getDepartmentsRoleFailed,
}
