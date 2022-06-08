export const WMSX_GET_ITEMS_START = 'WMSX_GET_ITEMS_START'
export const WMSX_GET_ITEMS_SUCCESS = 'WMSX_GET_ITEMS_SUCCESS'
export const WMSX_GET_ITEMS_FAILED = 'WMSX_GET_ITEMS_FAILED'

export const WMSX_GET_WAREHOUSES_START = 'WMSX_GET_WAREHOUSES_START'
export const WMSX_GET_WAREHOUSES_SUCCESS = 'WMSX_GET_WAREHOUSES_SUCCESS'
export const WMSX_GET_WAREHOUSES_FAILED = 'WMSX_GET_WAREHOUSES_FAILED'

export const WMSX_GET_ITEM_QUALITY_POINT_START =
  'WMSX_GET_ITEM_QUALITY_POINT_START'
export const WMSX_GET_ITEM_QUALITY_POINT_SUCCESS =
  'WMSX_GET_ITEM_QUALITY_POINT_SUCCESS'
export const WMSX_GET_ITEM_QUALITY_POINT_FAILED =
  'WMSX_GET_ITEM_QUALITY_POINT_FAILED'

export const WMSX_GET_ALL_SUPPLY_REQUEST_START =
  'WMSX_GET_ALL_SUPPLY_REQUEST_START'
export const WMSX_GET_ALL_SUPPLY_REQUEST_SUCCESS =
  'WMSX_GET_ALL_SUPPLY_REQUEST_SUCCESS'
export const WMSX_GET_ALL_SUPPLY_REQUEST_FAILED =
  'WMSX_GET_ALL_SUPPLY_REQUEST_FAILED'

export const WMSX_GET_TYPE_SERVICES_START = 'WMSX_GET_TYPE_SERVICES_START'
export const WMSX_GET_TYPE_SERVICES_SUCCESS = 'WMSX_GET_TYPE_SERVICES_SUCCESS'
export const WMSX_GET_TYPE_SERVICES_FAILED = 'WMSX_GET_TYPE_SERVICES_FAILED'

export const GET_MO_MATERIAL_PLAN_DETAIL_START =
  'WMSX_GET_MO_MATERIAL_PLAN_DETAIL_START'
export const GET_MO_MATERIAL_PLAN_DETAIL_SUCCESS =
  'WMSX_GET_MO_MATERIAL_PLAN_DETAIL_SUCCESS'
export const GET_MO_MATERIAL_PLAN_DETAIL_FAILED =
  'WMSX_GET_MO_MATERIAL_PLAN_DETAIL_FAILED'
/**
 * Get device request
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getSupplyRequest(payload, onSuccess, onError) {
  return {
    type: WMSX_GET_ALL_SUPPLY_REQUEST_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get device request success action
 * @param {*} payload
 * @returns {object}
 */
export function getSupplyRequestSuccess(payload) {
  return {
    type: WMSX_GET_ALL_SUPPLY_REQUEST_SUCCESS,
    payload: payload,
  }
}

/**
 * Get device request failed action
 * @returns {object}
 */
export function getSupplyRequestFailed() {
  return {
    type: WMSX_GET_ALL_SUPPLY_REQUEST_FAILED,
  }
}

export function getItemQualityPoint(payload, onSuccess, onError) {
  return {
    type: WMSX_GET_ITEM_QUALITY_POINT_START,
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
    type: WMSX_GET_ITEM_QUALITY_POINT_SUCCESS,
    payload: payload,
  }
}

/** Get quality points failed
 * @returns {object}
 */
export function getItemQualityPointFailed() {
  return {
    type: WMSX_GET_ITEM_QUALITY_POINT_FAILED,
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
    type: WMSX_GET_ITEMS_START,
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
    type: WMSX_GET_ITEMS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get items failed action
 * @returns {object}
 */
export function getItemsFailed() {
  return {
    type: WMSX_GET_ITEMS_FAILED,
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
    type: WMSX_GET_WAREHOUSES_START,
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
    type: WMSX_GET_WAREHOUSES_SUCCESS,
    payload: payload,
  }
}

/**
 * Get warehouses failed action
 * @returns {object}
 */
export function getWarehousesFailed() {
  return {
    type: WMSX_GET_WAREHOUSES_FAILED,
  }
}

/**
 * Get type service
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getTypeServices(payload, onSuccess, onError) {
  return {
    type: WMSX_GET_TYPE_SERVICES_START,
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
export function getTypeServicesSuccess(payload) {
  return {
    type: WMSX_GET_TYPE_SERVICES_SUCCESS,
    payload: payload,
  }
}

/**
 * Get warehouses failed action
 * @returns {object}
 */
export function getTypeServicesFailed() {
  return {
    type: WMSX_GET_TYPE_SERVICES_FAILED,
  }
}

/**
 * Get mo material
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getMoMaterialPlanDetail(materialPlanId, onSuccess, onError) {
  return {
    type: GET_MO_MATERIAL_PLAN_DETAIL_START,
    payload: materialPlanId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get mo material success action
 * @param {*} payload
 * @returns {object}
 */
export function getMoMaterialPlanDetailSuccess(payload) {
  return {
    type: GET_MO_MATERIAL_PLAN_DETAIL_SUCCESS,
    payload: payload,
  }
}

/**
 * Get mo material failed action
 * @returns {object}
 */
export function getMoMaterialPlanDetailFailed() {
  return {
    type: GET_MO_MATERIAL_PLAN_DETAIL_FAILED,
  }
}

export default {
  getItems,
  getItemsSuccess,
  getItemsFailed,
  getWarehouses,
  getWarehousesSuccess,
  getWarehousesFailed,
  getItemQualityPoint,
  getItemQualityPointSuccess,
  getItemQualityPointFailed,
  getSupplyRequest,
  getSupplyRequestFailed,
  getSupplyRequestSuccess,
  getTypeServices,
  getTypeServicesFailed,
  getTypeServicesSuccess,
  getMoMaterialPlanDetail,
  getMoMaterialPlanDetailSuccess,
  getMoMaterialPlanDetailFailed,
}
