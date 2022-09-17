import {
  GET_SIGNATURE_CONFIGURATION_DETAILS_FAILED,
  GET_SIGNATURE_CONFIGURATION_DETAILS_START,
  GET_SIGNATURE_CONFIGURATION_DETAILS_SUCCESS,
  UPDATE_SIGNATURE_CONFIGURATION_FAILED,
  UPDATE_SIGNATURE_CONFIGURATION_START,
  UPDATE_SIGNATURE_CONFIGURATION_SUCCESS,
} from '~/modules/wmsx/redux/actions/signature-configuration'

const initialState = {
  isLoading: false,
  signatureConfigurationDetails: {},
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function signatureConfiguration(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SIGNATURE_CONFIGURATION_START:
    case GET_SIGNATURE_CONFIGURATION_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      }
    case UPDATE_SIGNATURE_CONFIGURATION_SUCCESS:
    case UPDATE_SIGNATURE_CONFIGURATION_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_SIGNATURE_CONFIGURATION_DETAILS_SUCCESS:
      return {
        ...state,
        signatureConfigurationDetails: action.payload,
        isLoading: false,
      }
    case GET_SIGNATURE_CONFIGURATION_DETAILS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}
