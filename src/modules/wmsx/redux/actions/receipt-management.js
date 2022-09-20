export const WMSX_SEARCH_RECEIPT_START = 'WMSX_SEARCH_RECEIPT_START'
export const WMSX_SEARCH_RECEIPT_SUCCESS = 'WMSX_SEARCH_RECEIPT_SUCCESS'
export const WMSX_SEARCH_RECEIPT_FAILED = 'WMSX_SEARCH_RECEIPT_FAILED'

export const WMSX_GET_RECEIPT_DETAILS_START = 'WMSX_GET_RECEIPT_DETAILS_START'
export const WMSX_GET_RECEIPT_DETAILS_SUCCESS =
  'WMSX_GET_RECEIPT_DETAILS_SUCCESS'
export const WMSX_GET_RECEIPT_DETAILS_FAILED = 'WMSX_GET_RECEIPT_DETAILS_FAILED'
export const WMSX_RESET_RECEIPT_DETAILS_STATE =
  'WMSX_RESET_RECEIPT_DETAILS_STATE'

export function searchReceipt(payload, onSuccess, onError) {
  return {
    type: WMSX_SEARCH_RECEIPT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function searchReceiptSuccess(payload) {
  return {
    type: WMSX_SEARCH_RECEIPT_SUCCESS,
    payload: payload,
  }
}

export function searchReceiptFailed() {
  return {
    type: WMSX_SEARCH_RECEIPT_FAILED,
  }
}

export function getReceiptDetailsById(id, onSuccess, onError) {
  return {
    type: WMSX_GET_RECEIPT_DETAILS_START,
    payload: id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getReceiptDetailsByIdSuccess(payload) {
  return {
    type: WMSX_GET_RECEIPT_DETAILS_SUCCESS,
    payload: payload,
  }
}

export function getReceiptDetailsByIdFailed() {
  return {
    type: WMSX_GET_RECEIPT_DETAILS_FAILED,
  }
}

export function resetReceiptDetailsState() {
  return {
    type: WMSX_RESET_RECEIPT_DETAILS_STATE,
  }
}

export default {
  searchReceipt,
  searchReceiptSuccess,
  searchReceiptFailed,
  getReceiptDetailsById,
  getReceiptDetailsByIdSuccess,
  getReceiptDetailsByIdFailed,
  resetReceiptDetailsState,
}
