export const SEARCH_WAREHOUSE_TRANSFERS_START =
  'WMSX_SEARCH_WAREHOUSE_TRANSFERS_START'
export const SEARCH_WAREHOUSE_TRANSFERS_SUCCESS =
  'WMSX_SEARCH_WAREHOUSE_TRANSFERS_SUCCESS'
export const SEARCH_WAREHOUSE_TRANSFERS_FAILED =
  'WMSX_SEARCH_WAREHOUSE_TRANSFERS_FAILED'

export const CREATE_WAREHOUSE_TRANSFER_START =
  'WMSX_CREATE_WAREHOUSE_TRANSFER_START'
export const CREATE_WAREHOUSE_TRANSFER_SUCCESS =
  'WMSX_CREATE_WAREHOUSE_TRANSFER_SUCCESS'
export const CREATE_WAREHOUSE_TRANSFER_FAILED =
  'WMSX_CREATE_WAREHOUSE_TRANSFER_FAILED'

export const UPDATE_WAREHOUSE_TRANSFER_START =
  'WMSX_UPDATE_WAREHOUSE_TRANSFER_START'
export const UPDATE_WAREHOUSE_TRANSFER_SUCCESS =
  'WMSX_UPDATE_WAREHOUSE_TRANSFER_SUCCESS'
export const UPDATE_WAREHOUSE_TRANSFER_FAILED =
  'WMSX_UPDATE_WAREHOUSE_TRANSFER_FAILED'

export const DELETE_WAREHOUSE_TRANSFER_START =
  'WMSX_DELETE_WAREHOUSE_TRANSFER_START'
export const DELETE_WAREHOUSE_TRANSFER_SUCCESS =
  'WMSX_DELETE_WAREHOUSE_TRANSFER_SUCCESS'
export const DELETE_WAREHOUSE_TRANSFER_FAILED =
  'WMSX_DELETE_WAREHOUSE_TRANSFER_FAILED'

export const GET_WAREHOUSE_TRANSFER_DETAILS_START =
  'WMSX_GET_WAREHOUSE_TRANSFER_DETAILS_START'
export const GET_WAREHOUSE_TRANSFER_DETAILS_SUCCESS =
  'WMSX_GET_WAREHOUSE_TRANSFER_DETAILS_SUCCESS'
export const GET_WAREHOUSE_TRANSFER_DETAILS_FAILED =
  'WMSX_GET_WAREHOUSE_TRANSFER_DETAILS_FAILED'

export const CONFIRM_WAREHOUSE_TRANSFER_START =
  'WMSX_CONFIRM_WAREHOUSE_TRANSFER_START'
export const CONFIRM_WAREHOUSE_TRANSFER_SUCCESS =
  'WMSX_CONFIRM_WAREHOUSE_TRANSFER_SUCCESS'
export const CONFIRM_WAREHOUSE_TRANSFER_FAILED =
  'WMSX_CONFIRM_WAREHOUSE_TRANSFER_FAILED'

export const CONFIRM_WAREHOUSE_TRANSFER_EBS_START =
  'WMSX_CONFIRM_WAREHOUSE_TRANSFER_EBS_START'
export const CONFIRM_WAREHOUSE_TRANSFER_EBS_SUCCESS =
  'WMSX_CONFIRM_WAREHOUSE_TRANSFER_EBS_SUCCESS'
export const CONFIRM_WAREHOUSE_TRANSFER_EBS_FAILED =
  'WMSX_CONFIRM_WAREHOUSE_TRANSFER_EBS_FAILED'

export const CANCEL_WAREHOUSE_TRANSFER_EBS_START =
  'WMSX_CANCEL_WAREHOUSE_TRANSFER_EBS_START'
export const CANCEL_WAREHOUSE_TRANSFER_EBS_SUCCESS =
  'WMSX_CANCEL_WAREHOUSE_TRANSFER_EBS_SUCCESS'
export const CANCEL_WAREHOUSE_TRANSFER_EBS_FAILED =
  'WMSX_CANCEL_WAREHOUSE_TRANSFER_EBS_FAILED'

export const REJECT_WAREHOUSE_TRANSFER_START =
  'WMSX_REJECT_WAREHOUSE_TRANSFER_START'
export const REJECT_WAREHOUSE_TRANSFER_SUCCESS =
  'WMSX_REJECT_WAREHOUSE_TRANSFER_SUCCESS'
export const REJECT_WAREHOUSE_TRANSFER_FAILED =
  'WMSX_REJECT_WAREHOUSE_TRANSFER_FAILED'

export const RETURN_WAREHOUSE_TRANSFER_START =
  'WMSX_RETURN_WAREHOUSE_TRANSFER_START'
export const RETURN_WAREHOUSE_TRANSFER_SUCCESS =
  'WMSX_RETURN_WAREHOUSE_TRANSFER_SUCCESS'
export const RETURN_WAREHOUSE_TRANSFER_FAILED =
  'WMSX_RETURN_WAREHOUSE_TRANSFER_FAILED'

export const GET_LOT_NUMBER_LIST_WAREHOUSE_TRANSFER_START =
  'WMSX_GET_LOT_NUMBER_LIST_WAREHOUSE_TRANSFER_START'
export const GET_LOT_NUMBER_LIST_WAREHOUSE_TRANSFER_SUCCESS =
  'WMSX_GET_LOT_NUMBER_LIST_WAREHOUSE_TRANSFER_SUCCESS'
export const GET_LOT_NUMBER_LIST_WAREHOUSE_TRANSFER_FAILED =
  'WMSX_GET_LOT_NUMBER_LIST_WAREHOUSE_TRANSFER_FAILED'

export const GET_LIST_ITEM_WAREHOUSE_STOCK_START =
  'WMSX_GET_LIST_ITEM_WAREHOUSE_STOCK_START'
export const GET_LIST_ITEM_WAREHOUSE_STOCK_SUCCESS =
  'WMSX_GET_LIST_ITEM_WAREHOUSE_STOCK_SUCCESS'
export const GET_LIST_ITEM_WAREHOUSE_STOCK_FAILED =
  'WMSX_GET_LIST_ITEM_WAREHOUSE_STOCK_FAILED'

export const GET_STOCK_BY_ITEM_AND_LOT_NUMBER_START =
  'WMSX_GET_STOCK_BY_ITEM_AND_LOT_NUMBER_START'
export const GET_STOCK_BY_ITEM_AND_LOT_NUMBER_SUCCESS =
  'WMSX_GET_STOCK_BY_ITEM_AND_LOT_NUMBER_SUCCESS'
export const GET_STOCK_BY_ITEM_AND_LOT_NUMBER_FAILED =
  'WMSX_GET_STOCK_BY_ITEM_AND_LOT_NUMBER_FAILED'

export const CONFIRM_WAREHOUSE_EXPORT_START =
  'WMSX_CONFIRM_WAREHOUSE_EXPORT_START'
export const CONFIRM_WAREHOUSE_EXPORT_SUCCESS =
  'WMSX_CONFIRM_WAREHOUSE_EXPORT_SUCCESS'
export const CONFIRM_WAREHOUSE_EXPORT_FAILED =
  'WMSX_CONFIRM_WAREHOUSE_EXPORT_FAILED'

export const CONFIRM_WAREHOUSE_IMPORT_START =
  'WMSX_CONFIRM_WAREHOUSE_IMPORT_START'
export const CONFIRM_WAREHOUSE_IMPORT_SUCCESS =
  'WMSX_CONFIRM_WAREHOUSE_IMPORT_SUCCESS'
export const CONFIRM_WAREHOUSE_IMPORT_FAILED =
  'WMSX_CONFIRM_WAREHOUSE_IMPORT_FAILED'

export const ITEM_WAREHOUSE_STOCK_AVAILABLE_START =
  'WMSX_ITEM_WAREHOUSE_STOCK_AVAILABLE_START'
export const ITEM_WAREHOUSE_STOCK_AVAILABLE_SUCCESS =
  'WMSX_ITEM_WAREHOUSE_STOCK_AVAILABLE_SUCCESS'
export const ITEM_WAREHOUSE_STOCK_AVAILABLE_FAILED =
  'WMSX_ITEM_WAREHOUSE_STOCK_AVAILABLE_FAILED'

export const RESET_WAREHOUSE_TRANSFER = 'WMSX_RESET_WAREHOUSE_TRANSFER'
/**
 * Search
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchWarehouseTransfers(payload, onSuccess, onError) {
  return {
    type: SEARCH_WAREHOUSE_TRANSFERS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search  success action
 * @param {*} payload
 * @returns {object}
 */
export function searchWarehouseTransfersSuccess(payload) {
  return {
    type: SEARCH_WAREHOUSE_TRANSFERS_SUCCESS,
    payload: payload,
  }
}

/**
 * Search  failed action
 * @returns {object}
 */
export function searchWarehouseTransfersFailed() {
  return {
    type: SEARCH_WAREHOUSE_TRANSFERS_FAILED,
  }
}

/**
 * Create
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createWarehouseTransfer(payload, onSuccess, onError) {
  return {
    type: CREATE_WAREHOUSE_TRANSFER_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Create  success action
 * @param {*} payload
 * @returns {object}
 */
export function createWarehouseTransferSuccess(payload) {
  return {
    type: CREATE_WAREHOUSE_TRANSFER_SUCCESS,
    payload: payload,
  }
}

/**
 * Create  failed action
 * @returns {object}
 */
export function createWarehouseTransferFailed() {
  return {
    type: CREATE_WAREHOUSE_TRANSFER_FAILED,
  }
}

/**
 * Update
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateWarehouseTransfer(payload, onSuccess, onError) {
  return {
    type: UPDATE_WAREHOUSE_TRANSFER_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Update  success action
 * @param {*} payload
 * @returns {object}
 */
export function updateWarehouseTransferSuccess(payload) {
  return {
    type: UPDATE_WAREHOUSE_TRANSFER_SUCCESS,
    payload: payload,
  }
}

/**
 * Update  failed action
 * @returns {object}
 */
export function updateWarehouseTransferFailed() {
  return {
    type: UPDATE_WAREHOUSE_TRANSFER_FAILED,
  }
}
/**
 * Delete
 * @param {int} Id
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteWarehouseTransfer(Id, onSuccess, onError) {
  return {
    type: DELETE_WAREHOUSE_TRANSFER_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete  success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteWarehouseTransferSuccess(payload) {
  return {
    type: DELETE_WAREHOUSE_TRANSFER_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete  failed action
 * @returns {object}
 */
export function deleteWarehouseTransferFailed() {
  return {
    type: DELETE_WAREHOUSE_TRANSFER_FAILED,
  }
}

/**
 * Get  details
 * @param {int} Id
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getWarehouseTransferDetailsById(Id, onSuccess, onError) {
  return {
    type: GET_WAREHOUSE_TRANSFER_DETAILS_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get  details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getWarehouseTransferDetailsByIdSuccess(payload) {
  return {
    type: GET_WAREHOUSE_TRANSFER_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get  details by id failed action
 * @returns {object}
 */
export function getWarehouseTransferDetailsByIdFailed() {
  return {
    type: GET_WAREHOUSE_TRANSFER_DETAILS_FAILED,
  }
}

/**
 * Get confirm warehouse transfer
 * @param {int} Id
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function confirmWarehouseTransferById(Id, onSuccess, onError) {
  return {
    type: CONFIRM_WAREHOUSE_TRANSFER_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get confirm warehouse transfer by id success action
 * @param {*} payload
 * @returns {object}
 */
export function confirmWarehouseTransferByIdSuccess(payload) {
  return {
    type: CONFIRM_WAREHOUSE_TRANSFER_SUCCESS,
    payload: payload,
  }
}

/**
 * Get confirm warehouse transfer by id failed action
 * @returns {object}
 */
export function confirmWarehouseTransferByIdFailed() {
  return {
    type: CONFIRM_WAREHOUSE_TRANSFER_FAILED,
  }
}

export function confirmWarehouseTransferEBS(Id, onSuccess, onError) {
  return {
    type: CONFIRM_WAREHOUSE_TRANSFER_EBS_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get confirm warehouse transfer by id success action
 * @param {*} payload
 * @returns {object}
 */
export function confirmWarehouseTransferEBSSuccess(payload) {
  return {
    type: CONFIRM_WAREHOUSE_TRANSFER_EBS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get confirm warehouse transfer by id failed action
 * @returns {object}
 */
export function confirmWarehouseTransferEBSFailed() {
  return {
    type: CONFIRM_WAREHOUSE_TRANSFER_EBS_FAILED,
  }
}

export function cancelWarehouseTransferEBS(Id, onSuccess, onError) {
  return {
    type: CANCEL_WAREHOUSE_TRANSFER_EBS_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get cancel warehouse transfer by id success action
 * @param {*} payload
 * @returns {object}
 */
export function cancelWarehouseTransferEBSSuccess(payload) {
  return {
    type: CANCEL_WAREHOUSE_TRANSFER_EBS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get cancel warehouse transfer by id failed action
 * @returns {object}
 */
export function cancelWarehouseTransferEBSFailed() {
  return {
    type: CANCEL_WAREHOUSE_TRANSFER_EBS_FAILED,
  }
}
/**
 * Get reject warehouse transfer
 * @param {int} Id
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function rejectWarehouseTransferById(Id, onSuccess, onError) {
  return {
    type: REJECT_WAREHOUSE_TRANSFER_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get reject warehouse transfer by id success action
 * @param {*} payload
 * @returns {object}
 */
export function rejectWarehouseTransferByIdSuccess(payload) {
  return {
    type: REJECT_WAREHOUSE_TRANSFER_SUCCESS,
    payload: payload,
  }
}

/**
 * Get reject warehouse transfer by id failed action
 * @returns {object}
 */
export function rejectWarehouseTransferByIdFailed() {
  return {
    type: REJECT_WAREHOUSE_TRANSFER_FAILED,
  }
}

export function returnWarehouseTransferById(Id, onSuccess, onError) {
  return {
    type: RETURN_WAREHOUSE_TRANSFER_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get reject warehouse transfer by id success action
 * @param {*} payload
 * @returns {object}
 */
export function returnWarehouseTransferByIdSuccess(payload) {
  return {
    type: RETURN_WAREHOUSE_TRANSFER_SUCCESS,
    payload: payload,
  }
}

/**
 * Get reject warehouse transfer by id failed action
 * @returns {object}
 */
export function returnWarehouseTransferByIdFailed() {
  return {
    type: RETURN_WAREHOUSE_TRANSFER_FAILED,
  }
}
/**
 * Get lot number list
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getLotNumberListWarehouseTransfer(itemIds, onSuccess, onError) {
  return {
    type: GET_LOT_NUMBER_LIST_WAREHOUSE_TRANSFER_START,
    payload: itemIds,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get lot number list success action
 * @param {*} payload
 * @returns {object}
 */
export function getLotNumberListWarehouseTransferSuccess(payload) {
  return {
    type: GET_LOT_NUMBER_LIST_WAREHOUSE_TRANSFER_SUCCESS,
    payload: payload,
  }
}

/**
 * Get lot number list failed action
 * @returns {object}
 */
export function getLotNumberListWarehouseTransferFailed() {
  return {
    type: GET_LOT_NUMBER_LIST_WAREHOUSE_TRANSFER_FAILED,
  }
}

/**
 * Get list item warehouse stock
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getListItemWarehouseStock(payload, onSuccess, onError) {
  return {
    type: GET_LIST_ITEM_WAREHOUSE_STOCK_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get list success action
 * @param {*} payload
 * @returns {object}
 */
export function getListItemWarehouseStockSuccess(payload) {
  return {
    type: GET_LIST_ITEM_WAREHOUSE_STOCK_SUCCESS,
    payload: payload,
  }
}

/**
 * Get list failed action
 * @returns {object}
 */
export function getListItemWarehouseStockFailed() {
  return {
    type: GET_LIST_ITEM_WAREHOUSE_STOCK_FAILED,
  }
}

/**
 * Get stock by item and lot number
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getStockByItemAndLotNumber(payload, onSuccess, onError) {
  return {
    type: GET_STOCK_BY_ITEM_AND_LOT_NUMBER_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get list success action
 * @param {*} payload
 * @returns {object}
 */
export function getStockByItemAndLotNumberSuccess(payload) {
  return {
    type: GET_STOCK_BY_ITEM_AND_LOT_NUMBER_SUCCESS,
    payload: payload,
  }
}

/**
 * Get list failed action
 * @returns {object}
 */
export function getStockByItemAndLotNumberFailed() {
  return {
    type: GET_STOCK_BY_ITEM_AND_LOT_NUMBER_FAILED,
  }
}

export function confirmWarehouseExportById(payload, onSuccess, onError) {
  return {
    type: CONFIRM_WAREHOUSE_EXPORT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get confirm warehouse transfer by id success action
 * @param {*} payload
 * @returns {object}
 */
export function confirmWarehouseExportByIdSuccess(payload) {
  return {
    type: CONFIRM_WAREHOUSE_EXPORT_SUCCESS,
    payload: payload,
  }
}

/**
 * Get confirm warehouse transfer by id failed action
 * @returns {object}
 */
export function confirmWarehouseExportByIdFailed() {
  return {
    type: CONFIRM_WAREHOUSE_EXPORT_FAILED,
  }
}

export function confirmWarehouseImportById(payload, onSuccess, onError) {
  return {
    type: CONFIRM_WAREHOUSE_IMPORT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get confirm warehouse transfer by id success action
 * @param {*} payload
 * @returns {object}
 */
export function confirmWarehouseImportByIdSuccess(payload) {
  return {
    type: CONFIRM_WAREHOUSE_IMPORT_SUCCESS,
    payload: payload,
  }
}

/**
 * Get confirm warehouse transfer by id failed action
 * @returns {object}
 */
export function confirmWarehouseImportByIdFailed() {
  return {
    type: CONFIRM_WAREHOUSE_IMPORT_FAILED,
  }
}

export function getItemWarehouseStockAvailable(payload, onSuccess, onError) {
  return {
    type: ITEM_WAREHOUSE_STOCK_AVAILABLE_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get confirm warehouse transfer by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getItemWarehouseStockAvailableSuccess(payload) {
  return {
    type: ITEM_WAREHOUSE_STOCK_AVAILABLE_SUCCESS,
    payload: payload,
  }
}

/**
 * Get confirm warehouse transfer by id failed action
 * @returns {object}
 */
export function getItemWarehouseStockAvailableFailed() {
  return {
    type: ITEM_WAREHOUSE_STOCK_AVAILABLE_FAILED,
  }
}
export function resetWarehouseTransfer() {
  return {
    type: RESET_WAREHOUSE_TRANSFER,
  }
}
export default {
  searchWarehouseTransfers,
  searchWarehouseTransfersSuccess,
  searchWarehouseTransfersFailed,
  createWarehouseTransfer,
  createWarehouseTransferSuccess,
  createWarehouseTransferFailed,
  updateWarehouseTransfer,
  updateWarehouseTransferSuccess,
  updateWarehouseTransferFailed,
  deleteWarehouseTransfer,
  deleteWarehouseTransferSuccess,
  deleteWarehouseTransferFailed,
  getWarehouseTransferDetailsById,
  getWarehouseTransferDetailsByIdSuccess,
  getWarehouseTransferDetailsByIdFailed,
  getListItemWarehouseStock,
  getListItemWarehouseStockSuccess,
  getListItemWarehouseStockFailed,
  confirmWarehouseTransferById,
  confirmWarehouseTransferByIdSuccess,
  confirmWarehouseTransferByIdFailed,
  rejectWarehouseTransferById,
  rejectWarehouseTransferByIdSuccess,
  rejectWarehouseTransferByIdFailed,
  getLotNumberListWarehouseTransfer,
  getLotNumberListWarehouseTransferSuccess,
  getLotNumberListWarehouseTransferFailed,
  getStockByItemAndLotNumber,
  getStockByItemAndLotNumberSuccess,
  getStockByItemAndLotNumberFailed,
  confirmWarehouseExportById,
  confirmWarehouseExportByIdSuccess,
  confirmWarehouseExportByIdFailed,
  confirmWarehouseImportById,
  confirmWarehouseImportByIdSuccess,
  confirmWarehouseImportByIdFailed,
  getItemWarehouseStockAvailable,
  getItemWarehouseStockAvailableSuccess,
  getItemWarehouseStockAvailableFailed,
  resetWarehouseTransfer,
  confirmWarehouseTransferEBS,
  confirmWarehouseTransferEBSSuccess,
  confirmWarehouseTransferEBSFailed,
  cancelWarehouseTransferEBS,
  cancelWarehouseTransferEBSSuccess,
  cancelWarehouseTransferEBSFailed,
  returnWarehouseTransferById,
  returnWarehouseTransferByIdSuccess,
  returnWarehouseTransferByIdFailed,
}
