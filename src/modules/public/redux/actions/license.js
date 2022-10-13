export const ACTIVE_LICENSE_START = 'ACTIVE_LICENSE_START'
export const ACTIVE_LICENSE_SUCCESS = 'ACTIVE_LICENSE_SUCCESS'
export const ACTIVE_LICENSE_FAILED = 'ACTIVE_LICENSE_FAILED'

export function activeLicense(payload, onSuccess, onError) {
  return {
    type: ACTIVE_LICENSE_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function activeLicenseSuccess(payload) {
  return {
    type: ACTIVE_LICENSE_SUCCESS,
    payload: payload,
  }
}

export function activeLicenseFailed() {
  return {
    type: ACTIVE_LICENSE_FAILED,
  }
}

export default {
  activeLicense,
  activeLicenseSuccess,
  activeLicenseFailed,
}
