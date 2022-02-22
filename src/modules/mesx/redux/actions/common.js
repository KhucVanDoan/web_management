export const GET_COMPANIES_START = 'GET_COMPANIES_START'
export const GET_COMPANIES_SUCCESS = 'GET_COMPANIES_SUCCESS'
export const GET_COMPANIES_FAILED = 'GET_COMPANIES_FAILED'

export const GET_FACTORIES_BY_COMPANY_START = 'GET_FACTORIES_BY_COMPANY_START'
export const GET_FACTORIES_BY_COMPANY_SUCCESS =
  'GET_FACTORIES_BY_COMPANY_SUCCESS'
export const GET_FACTORIES_BY_COMPANY_FAILED = 'GET_FACTORIES_BY_COMPANY_FAILED'

export const GET_DEPARTMENTS_START = 'GET_DEPARTMENTS_START'
export const GET_DEPARTMENTS_SUCCESS = 'GET_DEPARTMENTS_SUCCESS'
export const GET_DEPARTMENTS_FAILED = 'GET_DEPARTMENTS_FAILED'

export const GET_ROLES_START = 'GET_ROLES_START'
export const GET_ROLES_SUCCESS = 'GET_ROLES_SUCCESS'
export const GET_ROLES_FAILED = 'GET_ROLES_FAILED'

export const GET_WAREHOUSES_BY_FACTORIES_START =
  'GET_WAREHOUSES_BY_FACTORIES_START'
export const GET_WAREHOUSES_BY_FACTORIES_SUCCESS =
  'GET_WAREHOUSES_BY_FACTORIES_SUCCESS'
export const GET_WAREHOUSES_BY_FACTORIES_FAILED =
  'GET_WAREHOUSES_BY_FACTORIES_FAILED'

export const GET_PRODUCTS_START = 'GET_PRODUCTS_START'
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS'
export const GET_PRODUCTS_FAILED = 'GET_PRODUCTS_FAILED'

export const GET_DETAILS_START = 'GET_DETAILS_START'
export const GET_DETAILS_SUCCESS = 'GET_DETAILS_SUCCESS'
export const GET_DETAILS_FAILED = 'GET_DETAILS_FAILED'

export const GET_ITEM_GROUPS_START = 'GET_ITEM_GROUPS_START'
export const GET_ITEM_GROUPS_SUCCESS = 'GET_ITEM_GROUPS_SUCCESS'
export const GET_ITEM_GROUPS_FAILED = 'GET_ITEM_GROUPS_FAILED'

export const GET_ITEM_TYPES_START = 'GET_ITEM_TYPES_START'
export const GET_ITEM_TYPES_SUCCESS = 'GET_ITEM_TYPES_SUCCESS'
export const GET_ITEM_TYPES_FAILED = 'GET_ITEM_TYPES_FAILED'

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

export const GET_VENDORS_START = 'GET_VENDORS_START'
export const GET_VENDORS_SUCCESS = 'GET_VENDORS_SUCCESS'
export const GET_VENDORS_FAILED = 'GET_VENDORS_FAILED'

export const GET_ALL_ITEM_DETAILS_START = 'GET_ALL_ITEM_DETAILS_START'
export const GET_ALL_ITEM_DETAILS_SUCCESS = 'GET_ALL_ITEM_DETAILS_SUCCESS'
export const GET_ALL_ITEM_DETAILS_FAILED = 'GET_ALL_ITEM_DETAILS_FAILED'

export const GET_PRODUCING_STEPS_START = 'GET_PRODUCING_STEPS_START'
export const GET_PRODUCING_STEPS_SUCCESS = 'GET_PRODUCING_STEPS_SUCCESS'
export const GET_PRODUCING_STEPS_FAILED = 'GET_PRODUCING_STEPS_FAILED'

export const GET_ROUTINGS_START = 'GET_ROUTINGS_START'
export const GET_ROUTINGS_SUCCESS = 'GET_ROUTINGS_SUCCESS'
export const GET_ROUTINGS_FAILED = 'GET_ROUTINGS_FAILED'

export const GET_USERS_START = 'GET_USERS_START'
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS'
export const GET_USERS_FAILED = 'GET_USERS_FAILED'

export const GET_BOMS_START = 'GET_BOMS_START'
export const GET_BOMS_SUCCESS = 'GET_BOMS_SUCCESS'
export const GET_BOMS_FAILED = 'GET_BOMS_FAILED'

export const GET_FACTORIES_START = 'GET_FACTORIES_START'
export const GET_FACTORIES_SUCCESS = 'GET_FACTORIES_SUCCESS'
export const GET_FACTORIES_FAILED = 'GET_FACTORIES_FAILED'

export const GET_SALE_ORDERS_START = 'GET_SALE_ORDERS_START'
export const GET_SALE_ORDERS_SUCCESS = 'GET_SALE_ORDERS_SUCCESS'
export const GET_SALE_ORDERS_FAILED = 'GET_SALE_ORDERS_FAILED'

export const SEARCH_QUALITY_POINTS_START = 'SEARCH_QUALITY_POINTS_START'
export const SEARCH_QUALITY_POINTS_SUCCESS = 'SEARCH_QUALITY_POINTS_SUCCESS'
export const SEARCH_QUALITY_POINTS_FAILED = 'SEARCH_QUALITY_POINTS_FAILED'

export const GET_QUALITY_POINT_DETAILS_START = 'GET_QUALITY_POINT_DETAILS_START'
export const GET_QUALITY_POINT_DETAILS_SUCCESS =
  'GET_QUALITY_POINT_DETAILS_SUCCESS'
export const GET_QUALITY_POINT_DETAILS_FAILED =
  'GET_QUALITY_POINT_DETAILS_FAILED'
export const GET_QUALITY_POINTS_START = 'GET_QUALITY_POINTS_START'
export const GET_QUALITY_POINTS_SUCCESS = 'GET_QUALITY_POINTS_SUCCESS'
export const GET_QUALITY_POINTS_FAILED = 'GET_QUALITY_POINTS_FAILED'

export const GET_ITEM_QUALITY_POINT_START = 'GET_ITEM_QUALITY_POINT_START'
export const GET_ITEM_QUALITY_POINT_SUCCESS = 'GET_ITEM_QUALITY_POINT_SUCCESS'
export const GET_ITEM_QUALITY_POINT_FAILED = 'GET_ITEM_QUALITY_POINT_FAILED'

export const CREATE_PURCHASED_ORDER_START = 'CREATE_PURCHASED_ORDER_START'
export const CREATE_PURCHASED_ORDER_SUCCESS = 'CREATE_PURCHASED_ORDER_SUCCESS'
export const CREATE_PURCHASED_ORDER_FAILED = 'CREATE_PURCHASED_ORDER_FAILED'

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
 * Get warehouse
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getWarehousesByFactories(payload, onSuccess, onError) {
  return {
    type: GET_WAREHOUSES_BY_FACTORIES_START,
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
export function getProducts(payload, onSuccess, onError) {
  return {
    type: GET_PRODUCTS_START,
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
export function getProductsSuccess(payload) {
  return {
    type: GET_PRODUCTS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get products failed action
 * @returns {object}
 */
export function getProductsFailed() {
  return {
    type: GET_PRODUCTS_FAILED,
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
 * Get products
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getItemGroups(payload, onSuccess, onError) {
  return {
    type: GET_ITEM_GROUPS_START,
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
export function getItemGroupsSuccess(payload) {
  return {
    type: GET_ITEM_GROUPS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get products failed action
 * @returns {object}
 */
export function getItemGroupsFailed() {
  return {
    type: GET_ITEM_GROUPS_FAILED,
  }
}

/**
 * Get products
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getItemTypes(payload, onSuccess, onError) {
  return {
    type: GET_ITEM_TYPES_START,
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
export function getItemTypesSuccess(payload) {
  return {
    type: GET_ITEM_TYPES_SUCCESS,
    payload: payload,
  }
}

/**
 * Get products failed action
 * @returns {object}
 */
export function getItemTypesFailed() {
  return {
    type: GET_ITEM_TYPES_FAILED,
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
 * Get vendors
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getVendors(payload, onSuccess, onError) {
  return {
    type: GET_VENDORS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get vendors success action
 * @param {*} payload
 * @returns {object}
 */
export function getVendorsSuccess(payload) {
  return {
    type: GET_VENDORS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get vendors failed action
 * @returns {object}
 */
export function getVendorsFailed() {
  return {
    type: GET_VENDORS_FAILED,
  }
}

/**
 * Get get all item details
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getAllItemDetails(payload, onSuccess, onError) {
  return {
    type: GET_ALL_ITEM_DETAILS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get get all item details success action
 * @param {*} payload
 * @returns {object}
 */
export function getAllItemDetailsSuccess(payload) {
  return {
    type: GET_ALL_ITEM_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get get all item details failed action
 * @returns {object}
 */
export function getAllItemDetailsFailed() {
  return {
    type: GET_ALL_ITEM_DETAILS_FAILED,
  }
}

/**
 * Get producing steps
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getProducingSteps(payload, onSuccess, onError) {
  return {
    type: GET_PRODUCING_STEPS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get producing steps success action
 * @param {*} payload
 * @returns {object}
 */
export function getProducingStepsSuccess(payload) {
  return {
    type: GET_PRODUCING_STEPS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get producing steps failed action
 * @returns {object}
 */
export function getProducingStepsFailed() {
  return {
    type: GET_PRODUCING_STEPS_FAILED,
  }
}

/**
 * Get routings
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getRoutings(payload, onSuccess, onError) {
  return {
    type: GET_ROUTINGS_START,
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
export function getRoutingsSuccess(payload) {
  return {
    type: GET_ROUTINGS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get routings failed
 * @returns {object}
 */
export function getRoutingsFailed() {
  return {
    type: GET_ROUTINGS_FAILED,
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
 * Get sale order
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getSaleOrders(payload, onSuccess, onError) {
  return {
    type: GET_SALE_ORDERS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get sale order success
 * @param {*} payload
 * @returns {object}
 */
export function getSaleOrdersSuccess(payload) {
  return {
    type: GET_SALE_ORDERS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get sale order failed
 * @returns {object}
 */
export function getSaleOrdersFailed() {
  return {
    type: GET_SALE_ORDERS_FAILED,
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

export function getQualityPoints(payload, onSuccess, onError) {
  return {
    type: GET_QUALITY_POINTS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get quality points success
 * @param {*} payload
 * @returns {object}
 */
export function getQualityPointsSuccess(payload) {
  return {
    type: GET_QUALITY_POINTS_SUCCESS,
    payload: payload,
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

/** Get quality points failed
 * @returns {object}
 */
export function getQualityPointsFailed() {
  return {
    type: GET_QUALITY_POINTS_FAILED,
  }
}

/**
 * Get quality point details
 * Get quality points
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getQualityPointDetailsById(payload, onSuccess, onError) {
  return {
    type: GET_QUALITY_POINT_DETAILS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get quality point details success
 * @param {*} payload
 * @returns {object}
 */
export function getQualityPointDetailsByIdSuccess(payload, onSuccess, onError) {
  return {
    type: GET_QUALITY_POINT_DETAILS_SUCCESS,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getItemQualityPoint(payload, onSuccess, onError) {
  return {
    type: GET_ITEM_QUALITY_POINT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get quality points success
 * @param {*} payload
 * @returns {object}
 */
export function getItemQualityPointSuccess(payload) {
  return {
    type: GET_ITEM_QUALITY_POINT_SUCCESS,
    payload: payload,
  }
}

/**
 * Get quality point details failed
 * @returns {object}
 */
export function getQualityPointDetailsByIdFailed() {
  return {
    type: GET_QUALITY_POINT_DETAILS_FAILED,
  }
}
/** Get quality points failed
 * @returns {object}
 */
export function getItemQualityPointFailed() {
  return {
    type: GET_ITEM_QUALITY_POINT_FAILED,
  }
}

/**
 * Create purchasedOrder
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createPurchasedOrder(payload, onSuccess, onError) {
  return {
    type: CREATE_PURCHASED_ORDER_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Create purchasedOrder success action
 * @param {*} payload
 * @returns {object}
 */
export function createPurchasedOrderSuccess(payload) {
  return {
    type: CREATE_PURCHASED_ORDER_SUCCESS,
    payload: payload,
  }
}

/**
 * Create purchasedOrder failed action
 * @returns {object}
 */
export function createPurchasedOrderFailed() {
  return {
    type: CREATE_PURCHASED_ORDER_FAILED,
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
  getWarehousesByFactories,
  getProducts,
  getProductsSuccess,
  getProductsFailed,
  getDetails,
  getDetailsSuccess,
  getDetailsFailed,
  getItemGroups,
  getItemGroupsSuccess,
  getItemGroupsFailed,
  getItemTypes,
  getItemTypesSuccess,
  getItemTypesFailed,
  getItemUnits,
  getItemUnitsSuccess,
  getItemUnitsFailed,
  getItems,
  getItemsSuccess,
  getItemsFailed,
  getWarehouses,
  getWarehousesSuccess,
  getWarehousesFailed,
  getCustomers,
  getCustomersSuccess,
  getCustomersFailed,
  getVendors,
  getVendorsSuccess,
  getVendorsFailed,
  getAllItemDetails,
  getAllItemDetailsSuccess,
  getAllItemDetailsFailed,
  getProducingSteps,
  getProducingStepsSuccess,
  getProducingStepsFailed,
  getRoutings,
  getRoutingsSuccess,
  getRoutingsFailed,
  getUsers,
  getUsersSuccess,
  getUsersFailed,
  getBoms,
  getBomsSuccess,
  getBomsFailed,
  getFactories,
  getFactoriesSuccess,
  getFactoriesFailed,
  getSaleOrders,
  getSaleOrdersSuccess,
  getSaleOrdersFailed,
  searchQualityPoints,
  searchQualityPointsSuccess,
  getQualityPoints,
  getQualityPointsSuccess,
  searchQualityPointsFailed,
  getQualityPointsFailed,
  getQualityPointDetailsById,
  getQualityPointDetailsByIdSuccess,
  getItemQualityPoint,
  getItemQualityPointSuccess,
  getQualityPointDetailsByIdFailed,
  createPurchasedOrder,
  createPurchasedOrderSuccess,
  createPurchasedOrderFailed,
}