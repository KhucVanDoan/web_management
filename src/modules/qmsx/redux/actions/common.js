export const GET_COMPANIES_START = 'QMSX_GET_COMPANIES_START'
export const GET_COMPANIES_SUCCESS = 'QMSX_GET_COMPANIES_SUCCESS'
export const GET_COMPANIES_FAILED = 'QMSX_GET_COMPANIES_FAILED'

export const GET_ROLES_START = 'QMSX_GET_ROLES_START'
export const GET_ROLES_SUCCESS = 'QMSX_GET_ROLES_SUCCESS'
export const GET_ROLES_FAILED = 'QMSX_GET_ROLES_FAILED'

export const GET_ITEM_UNITS_START = 'QMSX_GET_ITEM_UNITS_START'
export const GET_ITEM_UNITS_SUCCESS = 'QMSX_GET_ITEM_UNITS_SUCCESS'
export const GET_ITEM_UNITS_FAILED = 'QMSX_GET_ITEM_UNITS_FAILED'

export const GET_ITEMS_START = 'QMSX_GET_ITEMS_START'
export const GET_ITEMS_SUCCESS = 'QMSX_GET_ITEMS_SUCCESS'
export const GET_ITEMS_FAILED = 'QMSX_GET_ITEMS_FAILED'

export const GET_WAREHOUSES_START = 'QMSX_GET_WAREHOUSES_START'
export const GET_WAREHOUSES_SUCCESS = 'QMSX_GET_WAREHOUSES_SUCCESS'
export const GET_WAREHOUSES_FAILED = 'QMSX_GET_WAREHOUSES_FAILED'

export const GET_CUSTOMERS_START = 'QMSX_GET_CUSTOMERS_START'
export const GET_CUSTOMERS_SUCCESS = 'QMSX_GET_CUSTOMERS_SUCCESS'
export const GET_CUSTOMERS_FAILED = 'QMSX_GET_CUSTOMERS_FAILED'

export const GET_USERS_START = 'QMSX_GET_USERS_START'
export const GET_USERS_SUCCESS = 'QMSX_GET_USERS_SUCCESS'
export const GET_USERS_FAILED = 'QMSX_GET_USERS_FAILED'

export const GET_FACTORIES_START = 'QMSX_GET_FACTORIES_START'
export const GET_FACTORIES_SUCCESS = 'QMSX_GET_FACTORIES_SUCCESS'
export const GET_FACTORIES_FAILED = 'QMSX_GET_FACTORIES_FAILED'

export const GET_ALL_ERROR_GROUP_START = 'QMSX_GET_ALL_ERROR_GROUP_START'
export const GET_ALL_ERROR_GROUP_SUCCESS = 'QMSX_GET_ALL_ERROR_GROUP_SUCCESS'
export const GET_ALL_ERROR_GROUP_FAILED = 'QMSX_GET_ALL_ERROR_GROUP_FAILED'

export const GET_PRODUCTS_BY_STAGEQC_START =
  'QMSX_GET_PRODUCTS_BY_STAGEQC_START'
export const GET_PRODUCTS_BY_STAGEQC_SUCCESS =
  'QMSX_GET_PRODUCTS_BY_STAGEQC_SUCCESS'
export const GET_PRODUCTS_BY_STAGEQC_FAILED =
  'QMSX_GET_PRODUCTS_BY_STAGEQC_FAILED'

export const GET_ALL_CHECK_LIST_START = 'QMSX_GET_ALL_CHECK_LIST_START'
export const GET_ALL_CHECK_LIST_SUCCESS = 'QMSX_GET_ALL_CHECK_LIST_SUCCESS'
export const GET_ALL_CHECK_LIST_FAILED = 'QMSX_GET_ALL_CHECK_LIST_FAILED'
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
