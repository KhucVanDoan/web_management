export const GET_COMPANIES_START = 'GET_COMPANIES_START'
export const GET_COMPANIES_SUCCESS = 'GET_COMPANIES_SUCCESS'
export const GET_COMPANIES_FAILED = 'GET_COMPANIES_FAILED'

export const GET_DEPARTMENTS_START = 'GET_DEPARTMENTS_START'
export const GET_DEPARTMENTS_SUCCESS = 'GET_DEPARTMENTS_SUCCESS'
export const GET_DEPARTMENTS_FAILED = 'GET_DEPARTMENTS_FAILED'

export const GET_ROLES_START = 'GET_ROLES_START'
export const GET_ROLES_SUCCESS = 'GET_ROLES_SUCCESS'
export const GET_ROLES_FAILED = 'GET_ROLES_FAILED'

export const GET_ITEM_UNITS_START = 'GET_ITEM_UNITS_START'
export const GET_ITEM_UNITS_SUCCESS = 'GET_ITEM_UNITS_SUCCESS'
export const GET_ITEM_UNITS_FAILED = 'GET_ITEM_UNITS_FAILED'

export const GET_ITEMS_START = 'GET_ITEMS_START'
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS'
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED'

export const GET_WAREHOUSES_START = 'GET_WAREHOUSES_START'
export const GET_WAREHOUSES_SUCCESS = 'GET_WAREHOUSES_SUCCESS'
export const GET_WAREHOUSES_FAILED = 'GET_WAREHOUSES_FAILED'

export const GET_CUSTOMERS_START = 'GET_CUSTOMERS_START'
export const GET_CUSTOMERS_SUCCESS = 'GET_CUSTOMERS_SUCCESS'
export const GET_CUSTOMERS_FAILED = 'GET_CUSTOMERS_FAILED'

export const GET_USERS_START = 'GET_USERS_START'
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS'
export const GET_USERS_FAILED = 'GET_USERS_FAILED'

export const GET_FACTORIES_START = 'GET_FACTORIES_START'
export const GET_FACTORIES_SUCCESS = 'GET_FACTORIES_SUCCESS'
export const GET_FACTORIES_FAILED = 'GET_FACTORIES_FAILED'

export const GET_ALL_ERROR_GROUP_START = 'GET_ALL_ERROR_GROUP_START'
export const GET_ALL_ERROR_GROUP_SUCCESS = 'GET_ALL_ERROR_GROUP_SUCCESS'
export const GET_ALL_ERROR_GROUP_FAILED = 'GET_ALL_ERROR_GROUP_FAILED'

export const GET_PRODUCTS_BY_STAGEQC_START = 'GET_PRODUCTS_BY_STAGEQC_START'
export const GET_PRODUCTS_BY_STAGEQC_SUCCESS = 'GET_PRODUCTS_BY_STAGEQC_SUCCESS'
export const GET_PRODUCTS_BY_STAGEQC_FAILED = 'GET_PRODUCTS_BY_STAGEQC_FAILED'

export const GET_ALL_CHECK_LIST_START = 'GET_ALL_CHECK_LIST_START'
export const GET_ALL_CHECK_LIST_SUCCESS = 'GET_ALL_CHECK_LIST_SUCCESS'
export const GET_ALL_CHECK_LIST_FAILED = 'GET_ALL_CHECK_LIST_FAILED'
/**
 * Get company
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getCompanies(payload, onSuccess, onError) {
  return {
    type: GET_COMPANIES_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get factory
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getFactoriesByCompany(payload, onSuccess, onError) {
  return {
    type: GET_FACTORIES_BY_COMPANY_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

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
export function getItemUnits(payload, onSuccess, onError) {
  return {
    type: GET_ITEM_UNITS_START,
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
export function getItemUnitsSuccess(payload) {
  return {
    type: GET_ITEM_UNITS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get products failed action
 * @returns {object}
 */
export function getItemUnitsFailed() {
  return {
    type: GET_ITEM_UNITS_FAILED,
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
 * Get customers
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getCustomers(payload, onSuccess, onError) {
  return {
    type: GET_CUSTOMERS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get customers success action
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
 * Get customers failed action
 * @returns {object}
 */
export function getCustomersFailed() {
  return {
    type: GET_CUSTOMERS_FAILED,
  }
}

/**
 * Get users
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getUsers(payload, onSuccess, onError) {
  return {
    type: GET_USERS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get routings success
 * @param {*} payload
 * @returns {object}
 */
export function getUsersSuccess(payload) {
  return {
    type: GET_USERS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get routings failed
 * @returns {object}
 */
export function getUsersFailed() {
  return {
    type: GET_USERS_FAILED,
  }
}

/**
 * Get factories
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getFactories(payload, onSuccess, onError) {
  return {
    type: GET_FACTORIES_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get factories success
 * @param {*} payload
 * @returns {object}
 */
export function getFactoriesSuccess(payload) {
  return {
    type: GET_FACTORIES_SUCCESS,
    payload: payload,
  }
}

/**
 * Get factories failed
 * @returns {object}
 */
export function getFactoriesFailed() {
  return {
    type: GET_FACTORIES_FAILED,
  }
}

/**
 * Get all error group start action
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getAllErrorGroup(payload, onSuccess, onError) {
  return {
    type: GET_ALL_ERROR_GROUP_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get all error group success action
 * @param {*} payload
 * @returns {object}
 */
export function getAllErrorGroupSuccess(payload) {
  return {
    type: GET_ALL_ERROR_GROUP_SUCCESS,
    payload: payload,
  }
}

/**
 * Get all error group failed action
 * @returns {object}
 */
export function getAllErrorGroupFailed() {
  return {
    type: GET_ALL_ERROR_GROUP_FAILED,
  }
}

/**
 * Get list product by StageQC start action
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getProductsByStageQC(payload, onSuccess, onError) {
  return {
    type: GET_PRODUCTS_BY_STAGEQC_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get list product by stageQC success action
 * @param {*} payload
 * @returns {object}
 */
export function getProductsByStageQCSuccess(payload) {
  return {
    type: GET_PRODUCTS_BY_STAGEQC_SUCCESS,
    payload: payload,
  }
}

/**
 * Get list product by stageQC fail action
 * @returns {object}
 */
export function getProductsByStageQCFailed() {
  return {
    type: GET_PRODUCTS_BY_STAGEQC_FAILED,
  }
}

/**
 * Get all check list
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getAllCheckList(payload, onSuccess, onError) {
  return {
    type: GET_ALL_CHECK_LIST_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get all check list success
 * @param {*} payload
 * @returns {object}
 */
export function getAllCheckListSuccess(payload) {
  return {
    type: GET_ALL_CHECK_LIST_SUCCESS,
    payload: payload,
  }
}

/**
 * Get all check list failed
 * @returns {object}
 */
export function getAllCheckListFailed() {
  return {
    type: GET_ALL_CHECK_LIST_FAILED,
  }
}

export default {
  getCustomers,
  getCustomersSuccess,
  getCustomersFailed,
  getCompanies,
  getFactoriesByCompany,
  getDepartments,
  getRoles,
  getItemUnits,
  getItemUnitsSuccess,
  getItemUnitsFailed,
  getItems,
  getItemsSuccess,
  getItemsFailed,
  getWarehouses,
  getWarehousesSuccess,
  getWarehousesFailed,
  getUsers,
  getUsersSuccess,
  getUsersFailed,
  getFactories,
  getFactoriesSuccess,
  getFactoriesFailed,
  getAllErrorGroup,
  getAllErrorGroupSuccess,
  getAllErrorGroupFailed,
  getProductsByStageQC,
  getProductsByStageQCSuccess,
  getProductsByStageQCFailed,
  getAllCheckList,
  getAllCheckListSuccess,
  getAllCheckListFailed,
}
