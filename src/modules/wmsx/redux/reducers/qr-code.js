import {
  GET_QR_CODE_DETAILS_FAILED,
  GET_QR_CODE_DETAILS_START,
  GET_QR_CODE_DETAILS_SUCCESS,
  UPDATE_QR_CODE_FAILED,
  UPDATE_QR_CODE_START,
  UPDATE_QR_CODE_SUCCESS,
} from '~/modules/wmsx/redux/actions/qr-code'

const initialState = {
  isLoading: false,
  qrCodeDetails: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function qrCode(state = initialState, action) {
  switch (action.type) {
    case UPDATE_QR_CODE_START:
    case GET_QR_CODE_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      }
    case UPDATE_QR_CODE_SUCCESS:
    case UPDATE_QR_CODE_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_QR_CODE_DETAILS_SUCCESS:
      return {
        ...state,
        qrCodeDetails: action.payload,
        isLoading: false,
      }
    case GET_QR_CODE_DETAILS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}
