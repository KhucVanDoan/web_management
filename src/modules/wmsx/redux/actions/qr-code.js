export const UPDATE_QR_CODE_START = 'WMSX_UPDATE_QR_CODE_START'
export const UPDATE_QR_CODE_SUCCESS = 'WMSX_UPDATE_QR_CODE_SUCCESS'
export const UPDATE_QR_CODE_FAILED = 'WMSX_UPDATE_QR_CODE_FAILED'

export const GET_QR_CODE_DETAILS_START = 'WMSX_GET_QR_CODE_DETAILS_START'
export const GET_QR_CODE_DETAILS_SUCCESS = 'WMSX_GET_QR_CODE_DETAILS_SUCCESS'
export const GET_QR_CODE_DETAILS_FAILED = 'WMSX_GET_QR_CODE_DETAILS_FAILED'

export function updateQrCode(payload, onSuccess, onError) {
  return {
    type: UPDATE_QR_CODE_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function updateQrCodeSuccess(payload) {
  return {
    type: UPDATE_QR_CODE_SUCCESS,
    payload: payload,
  }
}

export function updateQrCodeFailed() {
  return {
    type: UPDATE_QR_CODE_FAILED,
  }
}

export function getQrCodeDetails(id, onSuccess, onError) {
  return {
    type: GET_QR_CODE_DETAILS_START,
    payload: id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getQrCodeDetailsSuccess(payload) {
  return {
    type: GET_QR_CODE_DETAILS_SUCCESS,
    payload: payload,
  }
}

export function getQrCodeDetailsFailed() {
  return {
    type: GET_QR_CODE_DETAILS_FAILED,
  }
}

export default {
  updateQrCode,
  updateQrCodeSuccess,
  updateQrCodeFailed,
  getQrCodeDetails,
  getQrCodeDetailsSuccess,
  getQrCodeDetailsFailed,
}
