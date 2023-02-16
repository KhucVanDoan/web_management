export const SEARCH_WAREHOUSE_IMPORT_RECEIPT_START =
  'WMSX_SEARCH_WAREHOUSE_IMPORT_RECEIPT_START'
export const SEARCH_WAREHOUSE_IMPORT_RECEIPT_SUCCESS =
  'WMSX_SEARCH_WAREHOUSE_IMPORT_RECEIPT_SUCCESS'
export const SEARCH_WAREHOUSE_IMPORT_RECEIPT_FAILED =
  'WMSX_SEARCH_WAREHOUSE_IMPORT_RECEIPT_FAILED'

export const CREATE_WAREHOUSE_IMPORT_RECEIPT_START =
  'WMSX_CREATE_WAREHOUSE_IMPORT_RECEIPT_START'
export const CREATE_WAREHOUSE_IMPORT_RECEIPT_SUCCESS =
  'WMSX_CREATE_WAREHOUSE_IMPORT_RECEIPT_SUCCESS'
export const CREATE_WAREHOUSE_IMPORT_RECEIPT_FAILED =
  'WMSX_CREATE_WAREHOUSE_IMPORT_RECEIPT_FAILED'

export const UPDATE_WAREHOUSE_IMPORT_RECEIPT_START =
  'WMSX_UPDATE_WAREHOUSE_IMPORT_RECEIPT_START'
export const UPDATE_WAREHOUSE_IMPORT_RECEIPT_SUCCESS =
  'WMSX_UPDATE_WAREHOUSE_IMPORT_RECEIPT_SUCCESS'
export const UPDATE_WAREHOUSE_IMPORT_RECEIPT_FAILED =
  'WMSX_UPDATE_WAREHOUSE_IMPORT_RECEIPT_FAILED'

export const DELETE_WAREHOUSE_IMPORT_RECEIPT_START =
  'WMSX_DELETE_WAREHOUSE_IMPORT_RECEIPT_START'
export const DELETE_WAREHOUSE_IMPORT_RECEIPT_SUCCESS =
  'WMSX_DELETE_WAREHOUSE_IMPORT_RECEIPT_SUCCESS'
export const DELETE_WAREHOUSE_IMPORT_RECEIPT_FAILED =
  'WMSX_DELETE_WAREHOUSE_IMPORT_RECEIPT_FAILED'

export const GET_WAREHOUSE_IMPORT_RECEIPT_DETAILS_START =
  'WMSX_GET_WAREHOUSE_IMPORT_RECEIPT_DETAILS_START'
export const GET_WAREHOUSE_IMPORT_RECEIPT_DETAILS_SUCCESS =
  'WMSX_GET_WAREHOUSE_IMPORT_RECEIPT_DETAILS_SUCCESS'
export const GET_WAREHOUSE_IMPORT_RECEIPT_DETAILS_FAILED =
  'WMSX_GET_WAREHOUSE_IMPORT_RECEIPT_DETAILS_FAILED'

export const CONFIRM_WAREHOUSE_IMPORT_RECEIPT_START =
  'WMSX_CONFIRM_WAREHOUSE_IMPORT_RECEIPT_START'
export const CONFIRM_WAREHOUSE_IMPORT_RECEIPT_SUCCESS =
  'WMSX_CONFIRM_WAREHOUSE_IMPORT_RECEIPT_SUCCESS'
export const CONFIRM_WAREHOUSE_IMPORT_RECEIPT_FAILED =
  'WMSX_CONFIRM_WAREHOUSE_IMPORT_RECEIPT_FAILED'

export const CONFIRM_WAREHOUSE_IMPORT_EBS_START =
  'WMSX_CONFIRM_WAREHOUSE_IMPORT_EBS_START'
export const CONFIRM_WAREHOUSE_IMPORT_EBS_SUCCESS =
  'WMSX_CONFIRM_WAREHOUSE_IMPORT_EBS_SUCCESS'
export const CONFIRM_WAREHOUSE_IMPORT_EBS_FAILED =
  'WMSX_CONFIRM_WAREHOUSE_IMPORT_EBS_FAILED'

export const CANCEL_WAREHOUSE_IMPORT_EBS_START =
  'WMSX_CANCEL_WAREHOUSE_IMPORT_EBS_START'
export const CANCEL_WAREHOUSE_IMPORT_EBS_SUCCESS =
  'WMSX_CANCEL_WAREHOUSE_IMPORT_EBS_SUCCESS'
export const CANCEL_WAREHOUSE_IMPORT_EBS_FAILED =
  'WMSX_CANCEL_WAREHOUSE_IMPORT_EBS_FAILED'

export const REJECT_WAREHOUSE_IMPORT_RECEIPT_START =
  'WMSX_REJECT_WAREHOUSE_IMPORT_RECEIPT_START'
export const REJECT_WAREHOUSE_IMPORT_RECEIPT_SUCCESS =
  'WMSX_REJECT_WAREHOUSE_IMPORT_RECEIPT_SUCCESS'
export const REJECT_WAREHOUSE_IMPORT_RECEIPT_FAILED =
  'WMSX_REJECT_WAREHOUSE_IMPORT_RECEIPT_FAILED'

export const GET_ATTRIBUITE_BUSINESS_TYPE_DETAILS_START =
  'WMSX_GET_ATTRIBUITE_BUSINESS_TYPE_DETAILS_START'
export const GET_ATTRIBUITE_BUSINESS_TYPE_DETAILS_SUCCESS =
  'WMSX_GET_ATTRIBUITE_BUSINESS_TYPE_DETAILS_SUCCESS'
export const GET_ATTRIBUITE_BUSINESS_TYPE_DETAILS_FAILED =
  'WMSX_GET_ATTRIBUITE_BUSINESS_TYPE_DETAILS_FAILED'

export const RESET_WAREHOUSE_IMPORT_RECEIPT_DETAILS_STATE =
  'WMSX_RESET_WAREHOUSE_IMPORT_RECEIPT_DETAILS_STATE'

export const IMPORT_WAREHOUSE_START = 'IMPORT_WAREHOUSE_START'
export const IMPORT_WAREHOUSE_SUCCESS = 'IMPORT_WAREHOUSE_SUCCESS'
export const IMPORT_WAREHOUSE_FAILED = 'IMPORT_WAREHOUSE_FAILED'

export function searchWarehouseImportReceipt(payload, onSuccess, onError) {
  return {
    type: SEARCH_WAREHOUSE_IMPORT_RECEIPT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function searchWarehouseImportReceiptSuccess(payload) {
  return {
    type: SEARCH_WAREHOUSE_IMPORT_RECEIPT_SUCCESS,
    payload: payload,
  }
}

export function searchWarehouseImportReceiptFailed() {
  return {
    type: SEARCH_WAREHOUSE_IMPORT_RECEIPT_FAILED,
  }
}

export function createWarehouseImportReceipt(payload, onSuccess, onError) {
  return {
    type: CREATE_WAREHOUSE_IMPORT_RECEIPT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function createWarehouseImportReceiptSuccess(payload) {
  return {
    type: CREATE_WAREHOUSE_IMPORT_RECEIPT_SUCCESS,
    payload: payload,
  }
}

export function createWarehouseImportReceiptFailed() {
  return {
    type: CREATE_WAREHOUSE_IMPORT_RECEIPT_FAILED,
  }
}

export function updateWarehouseImportReceipt(payload, onSuccess, onError) {
  return {
    type: UPDATE_WAREHOUSE_IMPORT_RECEIPT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function updateWarehouseImportReceiptSuccess(payload) {
  return {
    type: UPDATE_WAREHOUSE_IMPORT_RECEIPT_SUCCESS,
    payload: payload,
  }
}

export function updateWarehouseImportReceiptFailed() {
  return {
    type: UPDATE_WAREHOUSE_IMPORT_RECEIPT_FAILED,
  }
}

export function deleteWarehouseImportReceipt(packageId, onSuccess, onError) {
  return {
    type: DELETE_WAREHOUSE_IMPORT_RECEIPT_START,
    payload: packageId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function deleteWarehouseImportReceiptSuccess(payload) {
  return {
    type: DELETE_WAREHOUSE_IMPORT_RECEIPT_SUCCESS,
    payload: payload,
  }
}

export function deleteWarehouseImportReceiptFailed() {
  return {
    type: DELETE_WAREHOUSE_IMPORT_RECEIPT_FAILED,
  }
}

export function getWarehouseImportReceiptDetailsById(
  packageId,
  onSuccess,
  onError,
) {
  return {
    type: GET_WAREHOUSE_IMPORT_RECEIPT_DETAILS_START,
    payload: packageId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getWarehouseImportReceiptDetailsByIdSuccess(payload) {
  return {
    type: GET_WAREHOUSE_IMPORT_RECEIPT_DETAILS_SUCCESS,
    payload: payload,
  }
}

export function getWarehouseImportReceiptDetailsByIdFailed() {
  return {
    type: GET_WAREHOUSE_IMPORT_RECEIPT_DETAILS_FAILED,
  }
}

export function confirmWarehouseImportReceiptById(Id, onSuccess, onError) {
  return {
    type: CONFIRM_WAREHOUSE_IMPORT_RECEIPT_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function confirmWarehouseImportReceiptByIdSuccess(payload) {
  return {
    type: CONFIRM_WAREHOUSE_IMPORT_RECEIPT_SUCCESS,
    payload: payload,
  }
}

export function confirmWarehouseImportReceiptByIdFailed() {
  return {
    type: CONFIRM_WAREHOUSE_IMPORT_RECEIPT_FAILED,
  }
}

export function confirmWarehouseImportEBSById(Id, onSuccess, onError) {
  return {
    type: CONFIRM_WAREHOUSE_IMPORT_EBS_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}
export function confirmWarehouseImportEBStByIdSuccess(payload) {
  return {
    type: CONFIRM_WAREHOUSE_IMPORT_EBS_SUCCESS,
    payload: payload,
  }
}

export function confirmWarehouseImportEBSByIdFailed() {
  return {
    type: CONFIRM_WAREHOUSE_IMPORT_EBS_FAILED,
  }
}

export function cancelWarehouseImportEBSById(Id, onSuccess, onError) {
  return {
    type: CANCEL_WAREHOUSE_IMPORT_EBS_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}
export function cancelWarehouseImportEBStByIdSuccess(payload) {
  return {
    type: CANCEL_WAREHOUSE_IMPORT_EBS_SUCCESS,
    payload: payload,
  }
}

export function cancelWarehouseImportEBSByIdFailed() {
  return {
    type: CANCEL_WAREHOUSE_IMPORT_EBS_FAILED,
  }
}

export function rejectWarehouseImportReceiptById(Id, onSuccess, onError) {
  return {
    type: REJECT_WAREHOUSE_IMPORT_RECEIPT_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}
export function rejectWarehouseImportEBSById(Id, onSuccess, onError) {
  return {
    type: REJECT_WAREHOUSE_IMPORT_RECEIPT_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}
export function rejectWarehouseImportReceiptByIdSuccess(payload) {
  return {
    type: REJECT_WAREHOUSE_IMPORT_RECEIPT_SUCCESS,
    payload: payload,
  }
}

export function rejectWarehouseImportReceiptByIdFailed() {
  return {
    type: REJECT_WAREHOUSE_IMPORT_RECEIPT_FAILED,
  }
}

export function getAttribuiteBusinessTypeDetailsById(
  packageId,
  onSuccess,
  onError,
) {
  return {
    type: GET_ATTRIBUITE_BUSINESS_TYPE_DETAILS_START,
    payload: packageId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getAttribuiteBusinessTypeDetailsByIdSuccess(payload) {
  return {
    type: GET_ATTRIBUITE_BUSINESS_TYPE_DETAILS_SUCCESS,
    payload: payload,
  }
}

export function getAttribuiteBusinessTypeDetailsByIdFailed() {
  return {
    type: GET_ATTRIBUITE_BUSINESS_TYPE_DETAILS_FAILED,
  }
}

export function resetWarehouseImportReceiptState() {
  return {
    type: RESET_WAREHOUSE_IMPORT_RECEIPT_DETAILS_STATE,
  }
}

export function importWarehouse(payload, onSuccess, onError) {
  return {
    type: IMPORT_WAREHOUSE_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function importWarehouseSuccess(payload) {
  return {
    type: IMPORT_WAREHOUSE_SUCCESS,
    payload: payload,
  }
}

export function importWarehouseFailed() {
  return {
    type: IMPORT_WAREHOUSE_FAILED,
  }
}

export default {
  searchWarehouseImportReceipt,
  searchWarehouseImportReceiptSuccess,
  searchWarehouseImportReceiptFailed,
  createWarehouseImportReceipt,
  createWarehouseImportReceiptSuccess,
  createWarehouseImportReceiptFailed,
  updateWarehouseImportReceipt,
  updateWarehouseImportReceiptSuccess,
  updateWarehouseImportReceiptFailed,
  deleteWarehouseImportReceipt,
  deleteWarehouseImportReceiptSuccess,
  deleteWarehouseImportReceiptFailed,
  getWarehouseImportReceiptDetailsById,
  getWarehouseImportReceiptDetailsByIdSuccess,
  getWarehouseImportReceiptDetailsByIdFailed,
  confirmWarehouseImportReceiptById,
  confirmWarehouseImportReceiptByIdSuccess,
  confirmWarehouseImportReceiptByIdFailed,
  rejectWarehouseImportReceiptById,
  rejectWarehouseImportReceiptByIdFailed,
  rejectWarehouseImportReceiptByIdSuccess,
  getAttribuiteBusinessTypeDetailsById,
  getAttribuiteBusinessTypeDetailsByIdSuccess,
  getAttribuiteBusinessTypeDetailsByIdFailed,
  resetWarehouseImportReceiptState,
  importWarehouse,
  importWarehouseSuccess,
  importWarehouseFailed,
  confirmWarehouseImportEBSById,
  confirmWarehouseImportEBStByIdSuccess,
  confirmWarehouseImportEBSByIdFailed,
  cancelWarehouseImportEBSById,
  cancelWarehouseImportEBStByIdSuccess,
  cancelWarehouseImportEBSByIdFailed,
}
