export const SEARCH_ITEMS_START = 'DATABASE_SEARCH_ITEMS_START'
export const SEARCH_ITEMS_SUCCESS = 'DATABASE_SEARCH_ITEMS_SUCCESS'
export const SEARCH_ITEMS_FAILED = 'DATABASE_SEARCH_ITEMS_FAILED'

export const CREATE_ITEM_START = 'DATABASE_CREATE_ITEM_START'
export const CREATE_ITEM_SUCCESS = 'DATABASE_CREATE_ITEM_SUCCESS'
export const CREATE_ITEM_FAILED = 'DATABASE_CREATE_ITEM_FAILED'

export const UPDATE_ITEM_START = 'DATABASE_UPDATE_ITEM_START'
export const UPDATE_ITEM_SUCCESS = 'DATABASE_UPDATE_ITEM_SUCCESS'
export const UPDATE_ITEM_FAILED = 'DATABASE_UPDATE_ITEM_FAILED'

export const DELETE_ITEM_START = 'DATABASE_DELETE_ITEM_START'
export const DELETE_ITEM_SUCCESS = 'DATABASE_DELETE_ITEM_SUCCESS'
export const DELETE_ITEM_FAILED = 'DATABASE_DELETE_ITEM_FAILED'

export const GET_ITEM_DETAILS_START = 'DATABASE_GET_ITEM_DETAILS_START'
export const GET_ITEM_DETAILS_SUCCESS = 'DATABASE_GET_ITEM_DETAILS_SUCCESS'
export const GET_ITEM_DETAILS_FAILED = 'DATABASE_GET_ITEM_DETAILS_FAILED'

export const PRINT_QR_ITEMS_START = 'DATABASE_PRINT_QR_ITEMS_START'
export const PRINT_QR_ITEMS_SUCCESS = 'DATABASE_PRINT_QR_ITEMS_SUCCESS'
export const PRINT_QR_ITEMS_FAILED = 'DATABASE_PRINT_QR_ITEMS_FAILED'

export const RESET_ITEM_DETAILS_STATE = 'DATABASE_RESET_ITEM_DETAILS_STATE'

/**
 * Search item
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchItems(payload, onSuccess, onError) {
  return {
    type: SEARCH_ITEMS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search item success action
 * @param {*} payload
 * @returns {object}
 */
export function searchItemsSuccess(payload) {
  return {
    type: SEARCH_ITEMS_SUCCESS,
    payload: payload,
  }
}

/**
 * Search item failed action
 * @returns {object}
 */
export function searchItemsFailed() {
  return {
    type: SEARCH_ITEMS_FAILED,
  }
}

/**
 * Create item
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createItem(payload, onSuccess, onError) {
  return {
    type: CREATE_ITEM_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Create item success action
 * @param {*} payload
 * @returns {object}
 */
export function createItemSuccess(payload) {
  return {
    type: CREATE_ITEM_SUCCESS,
    payload: payload,
  }
}

/**
 * Create item failed action
 * @returns {object}
 */
export function createItemFailed() {
  return {
    type: CREATE_ITEM_FAILED,
  }
}

/**
 * Update item
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateItem(payload, onSuccess, onError) {
  return {
    type: UPDATE_ITEM_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Update item success action
 * @param {*} payload
 * @returns {object}
 */
export function updateItemSuccess(payload) {
  return {
    type: UPDATE_ITEM_SUCCESS,
    payload: payload,
  }
}

/**
 * Update item failed action
 * @returns {object}
 */
export function updateItemFailed() {
  return {
    type: UPDATE_ITEM_FAILED,
  }
}
/**
 * Delete item
 * @param {int} itemId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteItem(itemId, onSuccess, onError) {
  return {
    type: DELETE_ITEM_START,
    payload: itemId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete item success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteItemSuccess(payload) {
  return {
    type: DELETE_ITEM_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete item failed action
 * @returns {object}
 */
export function deleteItemFailed() {
  return {
    type: DELETE_ITEM_FAILED,
  }
}

/**
 * Get item details
 * @param {int} itemId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getItemDetailsById(itemId, onSuccess, onError) {
  return {
    type: GET_ITEM_DETAILS_START,
    payload: itemId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get item details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getItemDetailsByIdSuccess(payload) {
  return {
    type: GET_ITEM_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get item details by id failed action
 * @returns {object}
 */
export function getItemDetailsByIdFailed() {
  return {
    type: GET_ITEM_DETAILS_FAILED,
  }
}

export function resetItemDetailsState() {
  return {
    type: RESET_ITEM_DETAILS_STATE,
  }
}

/**
 * Print QR items
 * @param {int} itemId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function printQRItems(itemId, onSuccess, onError) {
  return {
    type: PRINT_QR_ITEMS_START,
    payload: itemId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Print QR items by id success action
 * @param {*} payload
 * @returns {object}
 */
export function printQRItemsSuccess(payload) {
  return {
    type: PRINT_QR_ITEMS_SUCCESS,
    payload: payload,
  }
}

/**
 * Print QR items by id failed action
 * @returns {object}
 */
export function printQRItemsFailed() {
  return {
    type: PRINT_QR_ITEMS_FAILED,
  }
}
export default {
  searchItems,
  searchItemsSuccess,
  searchItemsFailed,
  createItem,
  createItemSuccess,
  createItemFailed,
  updateItem,
  updateItemSuccess,
  updateItemFailed,
  deleteItem,
  deleteItemSuccess,
  deleteItemFailed,
  getItemDetailsById,
  getItemDetailsByIdSuccess,
  getItemDetailsByIdFailed,
  resetItemDetailsState,
  printQRItems,
  printQRItemsSuccess,
  printQRItemsFailed,
}
