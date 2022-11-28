export const UPDATE_SIGNATURE_CONFIGURATION_START =
  'WMSX_UPDATE_SIGNATURE_CONFIGURATION_START'
export const UPDATE_SIGNATURE_CONFIGURATION_SUCCESS =
  'WMSX_UPDATE_SIGNATURE_CONFIGURATION_SUCCESS'
export const UPDATE_SIGNATURE_CONFIGURATION_FAILED =
  'WMSX_UPDATE_SIGNATURE_CONFIGURATION_FAILED'

export const GET_SIGNATURE_CONFIGURATION_LIST_START =
  'WMSX_GET_SIGNATURE_CONFIGURATION_LIST_START'
export const GET_SIGNATURE_CONFIGURATION_LIST_SUCCESS =
  'WMSX_GET_SIGNATURE_CONFIGURATION_LIST_SUCCESS'
export const GET_SIGNATURE_CONFIGURATION_LIST_FAILED =
  'WMSX_GET_SIGNATURE_CONFIGURATION_LIST_FAILED'

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

export function getSignatureConfigurationList(id, onSuccess, onError) {
  return {
    type: GET_SIGNATURE_CONFIGURATION_LIST_START,
    payload: id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getSignatureConfigurationListSuccess(payload) {
  return {
    type: GET_SIGNATURE_CONFIGURATION_LIST_SUCCESS,
    payload: payload,
  }
}

export function getSignatureConfigurationListFailed() {
  return {
    type: GET_SIGNATURE_CONFIGURATION_LIST_FAILED,
  }
}

export default {
  updateSignatureConfiguration,
  updateSignatureConfigurationSuccess,
  updateSignatureConfigurationFailed,
  getSignatureConfigurationList,
  getSignatureConfigurationListSuccess,
  getSignatureConfigurationListFailed,
}
