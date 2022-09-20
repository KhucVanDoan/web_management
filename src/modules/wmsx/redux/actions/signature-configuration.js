export const UPDATE_SIGNATURE_CONFIGURATION_START =
  'WMSX_UPDATE_SIGNATURE_CONFIGURATION_START'
export const UPDATE_SIGNATURE_CONFIGURATION_SUCCESS =
  'WMSX_UPDATE_SIGNATURE_CONFIGURATION_SUCCESS'
export const UPDATE_SIGNATURE_CONFIGURATION_FAILED =
  'WMSX_UPDATE_SIGNATURE_CONFIGURATION_FAILED'

export const GET_SIGNATURE_CONFIGURATION_DETAILS_START =
  'WMSX_GET_SIGNATURE_CONFIGURATION_DETAILS_START'
export const GET_SIGNATURE_CONFIGURATION_DETAILS_SUCCESS =
  'WMSX_GET_SIGNATURE_CONFIGURATION_DETAILS_SUCCESS'
export const GET_SIGNATURE_CONFIGURATION_DETAILS_FAILED =
  'WMSX_GET_SIGNATURE_CONFIGURATION_DETAILS_FAILED'

export function updateSignatureConfiguration(payload, onSuccess, onError) {
  return {
    type: UPDATE_SIGNATURE_CONFIGURATION_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function updateSignatureConfigurationSuccess(payload) {
  return {
    type: UPDATE_SIGNATURE_CONFIGURATION_SUCCESS,
    payload: payload,
  }
}

export function updateSignatureConfigurationFailed() {
  return {
    type: UPDATE_SIGNATURE_CONFIGURATION_FAILED,
  }
}

export function getSignatureConfigurationDetails(id, onSuccess, onError) {
  return {
    type: GET_SIGNATURE_CONFIGURATION_DETAILS_START,
    payload: id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getSignatureConfigurationDetailsSuccess(payload) {
  return {
    type: GET_SIGNATURE_CONFIGURATION_DETAILS_SUCCESS,
    payload: payload,
  }
}

export function getSignatureConfigurationDetailsFailed() {
  return {
    type: GET_SIGNATURE_CONFIGURATION_DETAILS_FAILED,
  }
}

export default {
  updateSignatureConfiguration,
  updateSignatureConfigurationSuccess,
  updateSignatureConfigurationFailed,
  getSignatureConfigurationDetails,
  getSignatureConfigurationDetailsSuccess,
  getSignatureConfigurationDetailsFailed,
}
