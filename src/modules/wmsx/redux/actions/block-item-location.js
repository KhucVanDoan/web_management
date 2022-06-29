export const SEARCH_BLOCK_ITEMS_START = 'WMSX_SEARCH_BLOCK_ITEMS_START'
export const SEARCH_BLOCK_ITEMS_SUCCESS = 'WMSX_SEARCH_BLOCK_ITEMS_SUCCESS'
export const SEARCH_BLOCK_ITEMS_FAILED = 'WMSX_SEARCH_BLOCK_ITEMS_FAILED'

export const GET_BLOCK_ITEM_DETAIL_START = 'WMSX_GET_BLOCK_ITEM_DETAIL_START'
export const GET_BLOCK_ITEM_DETAIL_SUCCESS =
  'WMSX_GET_BLOCK_ITEM_DETAIL_SUCCESS'
export const GET_BLOCK_ITEM_DETAIL_FAILED = 'WMSX_GET_BLOCK_ITEM_DETAIL_FAILED'

export const CREATE_BLOCK_ITEM_START = 'WMSX_CREATE_BLOCK_ITEM_START'
export const CREATE_BLOCK_ITEM_SUCCESS = 'WMSX_CREATE_BLOCK_ITEM_SUCCESS'
export const CREATE_BLOCK_ITEM_FAILED = 'WMSX_CREATE_BLOCK_ITEM_FAILED'

export const DELETE_BLOCK_ITEM_START = 'WMSX_DELETE_BLOCK_ITEM_START'
export const DELETE_BLOCK_ITEM_SUCCESS = 'WMSX_DELETE_BLOCK_ITEM_SUCCESS'
export const DELETE_BLOCK_ITEM_FAILED = 'WMSX_DELETE_BLOCK_ITEM_FAILED'

export const OPEN_BLOCK_ITEM_SUCCESS = 'WMSX_OPEN_BLOCK_ITEM_SUCCESS'
export const OPEN_BLOCK_ITEM_START = 'WMSX_OPEN_BLOCK_ITEM_START'
export const OPEN_BLOCK_ITEM_FAILED = 'WMSX_OPEN_BLOCK_ITEM_FAILED'

export const CLOSE_BLOCK_ITEM_SUCCESS = 'WMSX_CLOSE_BLOCK_ITEM_SUCCESS'
export const CLOSE_BLOCK_ITEM_START = 'WMSX_CLOSE_BLOCK_ITEM_START'
export const CLOSE_BLOCK_ITEM_FAILED = 'WMSX_CLOSE_BLOCK_ITEM_FAILED'

export const SEARCH_BLOCK_LOCATIONS_START = 'WMSX_SEARCH_BLOCK_LOCATIONS_START'
export const SEARCH_BLOCK_LOCATIONS_SUCCESS =
  'WMSX_SEARCH_BLOCK_LOCATIONS_SUCCESS'
export const SEARCH_BLOCK_LOCATIONS_FAILED =
  'WMSX_SEARCH_BLOCK_LOCATIONS_FAILED'

export const GET_BLOCK_LOCATION_DETAIL_START =
  'WMSX_GET_BLOCK_LOCATION_DETAIL_START'
export const GET_BLOCK_LOCATION_DETAIL_SUCCESS =
  'WMSX_GET_BLOCK_LOCATION_DETAIL_SUCCESS'
export const GET_BLOCK_LOCATION_DETAIL_FAILED =
  'WMSX_GET_BLOCK_LOCATION_DETAIL_FAILED'

export const CREATE_BLOCK_LOCATION_START = 'WMSX_CREATE_BLOCK_LOCATION_START'
export const CREATE_BLOCK_LOCATION_SUCCESS =
  'WMSX_CREATE_BLOCK_LOCATION_SUCCESS'
export const CREATE_BLOCK_LOCATION_FAILED = 'WMSX_CREATE_BLOCK_LOCATION_FAILED'

export const DELETE_BLOCK_LOCATION_START = 'WMSX_DELETE_BLOCK_LOCATION_START'
export const DELETE_BLOCK_LOCATION_SUCCESS =
  'WMSX_DELETE_BLOCK_LOCATION_SUCCESS'
export const DELETE_BLOCK_LOCATION_FAILED = 'WMSX_DELETE_BLOCK_LOCATION_FAILED'

export const OPEN_BLOCK_LOCATION_SUCCESS = 'WMSX_OPEN_BLOCK_LOCATION_SUCCESS'
export const OPEN_BLOCK_LOCATION_START = 'WMSX_OPEN_BLOCK_LOCATION_START'
export const OPEN_BLOCK_LOCATION_FAILED = 'WMSX_OPEN_BLOCK_LOCATION_FAILED'

export const CLOSE_BLOCK_LOCATION_SUCCESS = 'WMSX_CLOSE_BLOCK_LOCATION_SUCCESS'
export const CLOSE_BLOCK_LOCATION_START = 'WMSX_CLOSE_BLOCK_LOCATION_START'
export const CLOSE_BLOCK_LOCATION_FAILED = 'WMSX_CLOSE_BLOCK_LOCATION_FAILED'

export const GET_DESIGN_BY_WAREHOUSE_SUCCESS =
  '  WMSX_GET_DESIGN_BY_WAREHOUSE_SUCCESS'
export const GET_DESIGN_BY_WAREHOUSE_START =
  'WMSX_GET_DESIGN_BY_WAREHOUSE_START'
export const GET_DESIGN_BY_WAREHOUSE_FAILED =
  'WMSX_GET_DESIGN_BY_WAREHOUSE_FAILED'

/**
 * Search block item location
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchBlockItems(payload, onSuccess, onError) {
  return {
    type: SEARCH_BLOCK_ITEMS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search block location success action
 * @param {*} payload
 * @returns {object}
 */
export function searchBlockItemsSuccess(payload) {
  return {
    type: SEARCH_BLOCK_ITEMS_SUCCESS,
    payload: payload,
  }
}

/**
 * Search block failed action
 * @returns {object}
 */
export function searchBlockItemsFailed() {
  return {
    type: SEARCH_BLOCK_ITEMS_FAILED,
  }
}

/**
 * Get block item details
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getBlockItemDetailById(payload, onSuccess, onError) {
  return {
    type: GET_BLOCK_ITEM_DETAIL_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get block item details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getBlockItemDetailByIdSuccess(payload) {
  return {
    type: GET_BLOCK_ITEM_DETAIL_SUCCESS,
    payload: payload,
  }
}

/**
 * Get block item details by id failed action
 * @returns {object}
 */
export function getBlockItemDetailByIdFailed() {
  return {
    type: GET_BLOCK_ITEM_DETAIL_FAILED,
  }
}

/**
 * Create block item
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createBlockItem(payload, onSuccess, onError) {
  return {
    type: CREATE_BLOCK_ITEM_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Create block item success action
 * @param {*} payload
 * @returns {object}
 */
export function createBlockItemSuccess(payload) {
  return {
    type: CREATE_BLOCK_ITEM_SUCCESS,
    payload: payload,
  }
}

/**
 * Create block item failed action
 * @returns {object}
 */
export function createBlockItemFailed() {
  return {
    type: CREATE_BLOCK_ITEM_FAILED,
  }
}

/**
 * Delete block item
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteBlockItem(payload, onSuccess, onError) {
  return {
    type: DELETE_BLOCK_ITEM_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete block item success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteBlockItemSuccess(payload) {
  return {
    type: DELETE_BLOCK_ITEM_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete block item failed action
 * @returns {object}
 */
export function deleteBlockItemFailed() {
  return {
    type: DELETE_BLOCK_ITEM_FAILED,
  }
}

export function openBlockItemById(blockItemId, onSuccess, onError) {
  return {
    type: OPEN_BLOCK_ITEM_START,
    payload: blockItemId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get open block item by id success action
 * @param {*} payload
 * @returns {object}
 */
export function openBlockItemByIdSuccess(payload) {
  return {
    type: OPEN_BLOCK_ITEM_SUCCESS,
    payload: payload,
  }
}

/**
 * Get open block item by id failed action
 * @returns {object}
 */
export function openBlockItemByIdFailed() {
  return {
    type: OPEN_BLOCK_ITEM_FAILED,
  }
}

export function closeBlockItemById(blockItemId, onSuccess, onError) {
  return {
    type: CLOSE_BLOCK_ITEM_START,
    payload: blockItemId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get close block item by id success action
 * @param {*} payload
 * @returns {object}
 */
export function closeBlockItemByIdSuccess(payload) {
  return {
    type: CLOSE_BLOCK_ITEM_SUCCESS,
    payload: payload,
  }
}

/**
 * Get close block item by id failed action
 * @returns {object}
 */
export function closeBlockItemByIdFailed() {
  return {
    type: CLOSE_BLOCK_ITEM_FAILED,
  }
}
/**
 * Search block location location
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchBlockLocations(payload, onSuccess, onError) {
  return {
    type: SEARCH_BLOCK_LOCATIONS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search block location success action
 * @param {*} payload
 * @returns {object}
 */
export function searchBlockLocationsSuccess(payload) {
  return {
    type: SEARCH_BLOCK_LOCATIONS_SUCCESS,
    payload: payload,
  }
}

/**
 * Search block failed action
 * @returns {object}
 */
export function searchBlockLocationsFailed() {
  return {
    type: SEARCH_BLOCK_LOCATIONS_FAILED,
  }
}

/**
 * Get block location details
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getBlockLocationDetailById(payload, onSuccess, onError) {
  return {
    type: GET_BLOCK_LOCATION_DETAIL_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get block location details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getBlockLocationDetailByIdSuccess(payload) {
  return {
    type: GET_BLOCK_LOCATION_DETAIL_SUCCESS,
    payload: payload,
  }
}

/**
 * Get block location details by id failed action
 * @returns {object}
 */
export function getBlockLocationDetailByIdFailed() {
  return {
    type: GET_BLOCK_LOCATION_DETAIL_FAILED,
  }
}

/**
 * Create block location
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createBlockLocation(payload, onSuccess, onError) {
  return {
    type: CREATE_BLOCK_LOCATION_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Create block location success action
 * @param {*} payload
 * @returns {object}
 */
export function createBlockLocationSuccess(payload) {
  return {
    type: CREATE_BLOCK_LOCATION_SUCCESS,
    payload: payload,
  }
}

/**
 * Create block location failed action
 * @returns {object}
 */
export function createBlockLocationFailed() {
  return {
    type: CREATE_BLOCK_LOCATION_FAILED,
  }
}

/**
 * Delete block location
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteBlockLocation(payload, onSuccess, onError) {
  return {
    type: DELETE_BLOCK_LOCATION_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete block location success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteBlockLocationSuccess(payload) {
  return {
    type: DELETE_BLOCK_LOCATION_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete block location failed action
 * @returns {object}
 */
export function deleteBlockLocationFailed() {
  return {
    type: DELETE_BLOCK_LOCATION_FAILED,
  }
}

export function openBlockLocationById(blockLocationId, onSuccess, onError) {
  return {
    type: OPEN_BLOCK_LOCATION_START,
    payload: blockLocationId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get open block location by id success action
 * @param {*} payload
 * @returns {object}
 */
export function openBlockLocationByIdSuccess(payload) {
  return {
    type: OPEN_BLOCK_LOCATION_SUCCESS,
    payload: payload,
  }
}

/**
 * Get open block location by id failed action
 * @returns {object}
 */
export function openBlockLocationByIdFailed() {
  return {
    type: OPEN_BLOCK_LOCATION_FAILED,
  }
}

export function closeBlockLocationById(blockLocationId, onSuccess, onError) {
  return {
    type: CLOSE_BLOCK_LOCATION_START,
    payload: blockLocationId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get close block location by id success action
 * @param {*} payload
 * @returns {object}
 */
export function closeBlockLocationByIdSuccess(payload) {
  return {
    type: CLOSE_BLOCK_LOCATION_SUCCESS,
    payload: payload,
  }
}

/**
 * Get close block location by id failed action
 * @returns {object}
 */
export function closeBlockLocationByIdFailed() {
  return {
    type: CLOSE_BLOCK_LOCATION_FAILED,
  }
}

//
export function getDesignByWarehouseId(warehouseId, onSuccess, onError) {
  return {
    type: GET_DESIGN_BY_WAREHOUSE_START,
    payload: warehouseId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get design by warehouse success action
 * @param {*} payload
 * @returns {object}
 */
export function getDesignByWarehouseIdSuccess(payload) {
  return {
    type: GET_DESIGN_BY_WAREHOUSE_SUCCESS,
    payload: payload,
  }
}

/**
 * Get design by warehouse failed action
 * @returns {object}
 */
export function getDesignByWarehouseIdFailed() {
  return {
    type: GET_DESIGN_BY_WAREHOUSE_FAILED,
  }
}

export default {
  searchBlockItems,
  searchBlockItemsSuccess,
  searchBlockItemsFailed,
  getBlockItemDetailById,
  getBlockItemDetailByIdSuccess,
  getBlockItemDetailByIdFailed,
  createBlockItem,
  createBlockItemSuccess,
  createBlockItemFailed,
  deleteBlockItem,
  deleteBlockItemSuccess,
  deleteBlockItemFailed,
  openBlockItemById,
  openBlockItemByIdSuccess,
  openBlockItemByIdFailed,
  closeBlockItemById,
  closeBlockItemByIdSuccess,
  closeBlockItemByIdFailed,
  searchBlockLocations,
  searchBlockLocationsSuccess,
  searchBlockLocationsFailed,
  getBlockLocationDetailById,
  getBlockLocationDetailByIdSuccess,
  getBlockLocationDetailByIdFailed,
  createBlockLocation,
  createBlockLocationSuccess,
  createBlockLocationFailed,
  deleteBlockLocation,
  deleteBlockLocationSuccess,
  deleteBlockLocationFailed,
  openBlockLocationById,
  openBlockLocationByIdSuccess,
  openBlockLocationByIdFailed,
  closeBlockLocationById,
  closeBlockLocationByIdSuccess,
  closeBlockLocationByIdFailed,
  getDesignByWarehouseId,
  getDesignByWarehouseIdSuccess,
  getDesignByWarehouseIdFailed,
}
