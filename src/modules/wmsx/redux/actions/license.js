export const DETAIL_LICENSE_START = 'DETAIL_LICENSE_START'
export const DETAIL_LICENSE_SUCCESS = 'DETAIL_LICENSE_SUCCESS'
export const DETAIL_LICENSE_FAILED = 'DETAIL_LICENSE_FAILED'

export function detailLicense(payload, onSuccess, onError) {
  return {
    type: DETAIL_LICENSE_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function detailLicenseSuccess(payload) {
  return {
    type: DETAIL_LICENSE_SUCCESS,
    payload: payload,
  }
}

export function detailLicenseFailed() {
  return {
    type: DETAIL_LICENSE_FAILED,
  }
}

export default {
  detailLicense,
  detailLicenseSuccess,
  detailLicenseFailed,
}
