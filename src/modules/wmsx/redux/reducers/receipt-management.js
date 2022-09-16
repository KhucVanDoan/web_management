import {
  WMSX_GET_RECEIPT_DETAILS_FAILED,
  WMSX_GET_RECEIPT_DETAILS_START,
  WMSX_GET_RECEIPT_DETAILS_SUCCESS,
  WMSX_SEARCH_RECEIPT_FAILED,
  WMSX_SEARCH_RECEIPT_START,
  WMSX_SEARCH_RECEIPT_SUCCESS,
  WMSX_RESET_RECEIPT_DETAILS_STATE,
} from '~/modules/wmsx/redux/actions/receipt-management'

const initialState = {
  isLoading: false,
  receiptList: [],
  receiptDetail: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function receiptManagement(state = initialState, action) {
  switch (action.type) {
    case WMSX_SEARCH_RECEIPT_START:
    case WMSX_GET_RECEIPT_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      }
    case WMSX_SEARCH_RECEIPT_SUCCESS:
      return {
        ...state,
        receiptList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case WMSX_GET_RECEIPT_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        receiptDetail: action.payload,
      }
    case WMSX_GET_RECEIPT_DETAILS_FAILED:
    case WMSX_SEARCH_RECEIPT_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case WMSX_RESET_RECEIPT_DETAILS_STATE:
      return {
        ...state,
        receiptDetail: {},
      }
    default:
      return state
  }
}
