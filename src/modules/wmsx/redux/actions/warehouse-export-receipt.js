export const SEARCH_WAREHOUSE_EXPORT_RECEIPT_START =
  'WMSX_SEARCH_WAREHOUSE_EXPORT_RECEIPT_START'
export const SEARCH_WAREHOUSE_EXPORT_RECEIPT_SUCCESS =
  'WMSX_SEARCH_WAREHOUSE_EXPORT_RECEIPT_SUCCESS'
export const SEARCH_WAREHOUSE_EXPORT_RECEIPT_FAILED =
  'WMSX_SEARCH_WAREHOUSE_EXPORT_RECEIPT_FAILED'

export const CREATE_WAREHOUSE_EXPORT_RECEIPT_START =
  'WMSX_CREATE_WAREHOUSE_EXPORT_RECEIPT_START'
export const CREATE_WAREHOUSE_EXPORT_RECEIPT_SUCCESS =
  'WMSX_CREATE_WAREHOUSE_EXPORT_RECEIPT_SUCCESS'
export const CREATE_WAREHOUSE_EXPORT_RECEIPT_FAILED =
  'WMSX_CREATE_WAREHOUSE_EXPORT_RECEIPT_FAILED'

export const UPDATE_WAREHOUSE_EXPORT_RECEIPT_START =
  'WMSX_UPDATE_WAREHOUSE_EXPORT_RECEIPT_START'
export const UPDATE_WAREHOUSE_EXPORT_RECEIPT_SUCCESS =
  'WMSX_UPDATE_WAREHOUSE_EXPORT_RECEIPT_SUCCESS'
export const UPDATE_WAREHOUSE_EXPORT_RECEIPT_FAILED =
  'WMSX_UPDATE_WAREHOUSE_EXPORT_RECEIPT_FAILED'

export const DELETE_WAREHOUSE_EXPORT_RECEIPT_START =
  'WMSX_DELETE_WAREHOUSE_EXPORT_RECEIPT_START'
export const DELETE_WAREHOUSE_EXPORT_RECEIPT_SUCCESS =
  'WMSX_DELETE_WAREHOUSE_EXPORT_RECEIPT_SUCCESS'
export const DELETE_WAREHOUSE_EXPORT_RECEIPT_FAILED =
  'WMSX_DELETE_WAREHOUSE_EXPORT_RECEIPT_FAILED'

export const GET_WAREHOUSE_EXPORT_RECEIPT_DETAILS_START =
  'WMSX_GET_WAREHOUSE_EXPORT_RECEIPT_DETAILS_START'
export const GET_WAREHOUSE_EXPORT_RECEIPT_DETAILS_SUCCESS =
  'WMSX_GET_WAREHOUSE_EXPORT_RECEIPT_DETAILS_SUCCESS'
export const GET_WAREHOUSE_EXPORT_RECEIPT_DETAILS_FAILED =
  'WMSX_GET_WAREHOUSE_EXPORT_RECEIPT_DETAILS_FAILED'

export const CONFIRM_WAREHOUSE_EXPORT_RECEIPT_START =
  'WMSX_CONFIRM_WAREHOUSE_EXPORT_RECEIPT_START'
export const CONFIRM_WAREHOUSE_EXPORT_RECEIPT_SUCCESS =
  'WMSX_CONFIRM_WAREHOUSE_EXPORT_RECEIPT_SUCCESS'
export const CONFIRM_WAREHOUSE_EXPORT_RECEIPT_FAILED =
  'WMSX_CONFIRM_WAREHOUSE_EXPORT_RECEIPT_FAILED'

export const REJECT_WAREHOUSE_EXPORT_RECEIPT_START =
  'WMSX_REJECT_WAREHOUSE_EXPORT_RECEIPT_START'
export const REJECT_WAREHOUSE_EXPORT_RECEIPT_SUCCESS =
  'WMSX_REJECT_WAREHOUSE_EXPORT_RECEIPT_SUCCESS'
export const REJECT_WAREHOUSE_EXPORT_RECEIPT_FAILED =
  'WMSX_REJECT_WAREHOUSE_EXPORT_RECEIPT_FAILED'

export const RESET_WAREHOUSE_EXPORT_RECEIPT_DETAILS_STATE =
  'WMSX_RESET_WAREHOUSE_EXPORT_RECEIPT_DETAILS_STATE'

export const EXPORT_WAREHOUSE_START = 'EXPORT_WAREHOUSE_START'
export const EXPORT_WAREHOUSE_SUCCESS = 'EXPORT_WAREHOUSE_SUCCESS'
export const EXPORT_WAREHOUSE_FAILED = 'EXPORT_WAREHOUSE_FAILED'

export function searchWarehouseExportReceipt(payload, onSuccess, onError) {
  return {
    type: SEARCH_WAREHOUSE_EXPORT_RECEIPT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function searchWarehouseExportReceiptSuccess(payload) {
  return {
    type: SEARCH_WAREHOUSE_EXPORT_RECEIPT_SUCCESS,
    payload: payload,
  }
}

export function searchWarehouseExportReceiptFailed() {
  return {
    type: SEARCH_WAREHOUSE_EXPORT_RECEIPT_FAILED,
  }
}

export function createWarehouseExportReceipt(payload, onSuccess, onError) {
  return {
    type: CREATE_WAREHOUSE_EXPORT_RECEIPT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function createWarehouseExportReceiptSuccess(payload) {
  return {
    type: CREATE_WAREHOUSE_EXPORT_RECEIPT_SUCCESS,
    payload: payload,
  }
}

export function createWarehouseExportReceiptFailed() {
  return {
    type: CREATE_WAREHOUSE_EXPORT_RECEIPT_FAILED,
  }
}

export function updateWarehouseExportReceipt(payload, onSuccess, onError) {
  return {
    type: UPDATE_WAREHOUSE_EXPORT_RECEIPT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function updateWarehouseExportReceiptSuccess(payload) {
  return {
    type: UPDATE_WAREHOUSE_EXPORT_RECEIPT_SUCCESS,
    payload: payload,
  }
}

export function updateWarehouseExportReceiptFailed() {
  return {
    type: UPDATE_WAREHOUSE_EXPORT_RECEIPT_FAILED,
  }
}

export function deleteWarehouseExportReceipt(packageId, onSuccess, onError) {
  return {
    type: DELETE_WAREHOUSE_EXPORT_RECEIPT_START,
    payload: packageId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function deleteWarehouseExportReceiptSuccess(payload) {
  return {
    type: DELETE_WAREHOUSE_EXPORT_RECEIPT_SUCCESS,
    payload: payload,
  }
}

export function deleteWarehouseExportReceiptFailed() {
  return {
    type: DELETE_WAREHOUSE_EXPORT_RECEIPT_FAILED,
  }
}

export function getWarehouseExportReceiptDetailsById(
  packageId,
  onSuccess,
  onError,
) {
  return {
    type: GET_WAREHOUSE_EXPORT_RECEIPT_DETAILS_START,
    payload: packageId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getWarehouseExportReceiptDetailsByIdSuccess(payload) {
  return {
    type: GET_WAREHOUSE_EXPORT_RECEIPT_DETAILS_SUCCESS,
    payload: payload,
  }
}

export function getWarehouseExportReceiptDetailsByIdFailed() {
  return {
    type: GET_WAREHOUSE_EXPORT_RECEIPT_DETAILS_FAILED,
  }
}

export function confirmWarehouseExportReceiptById(Id, onSuccess, onError) {
  return {
    type: CONFIRM_WAREHOUSE_EXPORT_RECEIPT_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function confirmWarehouseExportReceiptByIdSuccess(payload) {
  return {
    type: CONFIRM_WAREHOUSE_EXPORT_RECEIPT_SUCCESS,
    payload: payload,
  }
}

export function confirmWarehouseExportReceiptByIdFailed() {
  return {
    type: CONFIRM_WAREHOUSE_EXPORT_RECEIPT_FAILED,
  }
}

export function rejectWarehouseExportReceiptById(Id, onSuccess, onError) {
  return {
    type: REJECT_WAREHOUSE_EXPORT_RECEIPT_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function rejectWarehouseExportReceiptByIdSuccess(payload) {
  return {
    type: REJECT_WAREHOUSE_EXPORT_RECEIPT_SUCCESS,
    payload: payload,
  }
}

export function rejectWarehouseExportReceiptByIdFailed() {
  return {
    type: REJECT_WAREHOUSE_EXPORT_RECEIPT_FAILED,
  }
}

export function resetWarehouseExportReceiptState() {
  return {
    type: RESET_WAREHOUSE_EXPORT_RECEIPT_DETAILS_STATE,
  }
}

export function exportWarehouse(payload, onSuccess, onError) {
  return {
    type: EXPORT_WAREHOUSE_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function exportWarehouseSuccess(payload) {
  return {
    type: EXPORT_WAREHOUSE_SUCCESS,
    payload: payload,
  }
}

export function exportWarehouseFailed() {
  return {
    type: EXPORT_WAREHOUSE_FAILED,
  }
}

export default {
  searchWarehouseExportReceipt,
  searchWarehouseExportReceiptSuccess,
  searchWarehouseExportReceiptFailed,
  createWarehouseExportReceipt,
  createWarehouseExportReceiptSuccess,
  createWarehouseExportReceiptFailed,
  updateWarehouseExportReceipt,
  updateWarehouseExportReceiptSuccess,
  updateWarehouseExportReceiptFailed,
  deleteWarehouseExportReceipt,
  deleteWarehouseExportReceiptSuccess,
  deleteWarehouseExportReceiptFailed,
  getWarehouseExportReceiptDetailsById,
  getWarehouseExportReceiptDetailsByIdSuccess,
  getWarehouseExportReceiptDetailsByIdFailed,
  confirmWarehouseExportReceiptById,
  confirmWarehouseExportReceiptByIdSuccess,
  confirmWarehouseExportReceiptByIdFailed,
  rejectWarehouseExportReceiptById,
  rejectWarehouseExportReceiptByIdFailed,
  rejectWarehouseExportReceiptByIdSuccess,
  resetWarehouseExportReceiptState,
  exportWarehouse,
  exportWarehouseSuccess,
  exportWarehouseFailed,
}
