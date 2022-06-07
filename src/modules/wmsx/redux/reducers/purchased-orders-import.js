import {
  CONFIRM_PO_IMPORT_FAILED,
  CONFIRM_PO_IMPORT_START,
  CONFIRM_PO_IMPORT_SUCCESS,
  CREATE_PO_IMPORT_FAILED,
  CREATE_PO_IMPORT_START,
  CREATE_PO_IMPORT_SUCCESS,
  DELETE_PO_IMPORT_FAILED,
  DELETE_PO_IMPORT_START,
  DELETE_PO_IMPORT_SUCCESS,
  GET_PO_IMPORT_DETAILS_FAILED,
  GET_PO_IMPORT_DETAILS_START,
  GET_PO_IMPORT_DETAILS_SUCCESS,
  REJECT_PO_IMPORT_FAILED,
  REJECT_PO_IMPORT_START,
  REJECT_PO_IMPORT_SUCCESS,
  SEARCH_PO_IMPORT_FAILED,
  SEARCH_PO_IMPORT_START,
  SEARCH_PO_IMPORT_SUCCESS,
  UPDATE_PO_IMPORT_FAILED,
  UPDATE_PO_IMPORT_START,
  UPDATE_PO_IMPORT_SUCCESS,
  GET_LOT_NUMBER_LIST_START,
  GET_LOT_NUMBER_LIST_SUCCESS,
  GET_LOT_NUMBER_LIST_FAILED,
  GET_PURCHASED_ORDER_NOT_CREATE_POIMP_START,
  GET_PURCHASED_ORDER_NOT_CREATE_POIMP_SUCCESS,
  GET_PURCHASED_ORDER_NOT_CREATE_POIMP_FAILED,
  RESET_PO_IMPORT_DETAILS,
} from '~/modules/wmsx/redux/actions/purchased-orders-import'

const initialState = {
  isLoading: false,
  poImportList: [],
  poImportDetails: {},
  total: 0,
  lotNumberList: [],
  purchasedOrderNotCreatePOImpList: [],
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function definePOSImport(state = initialState, action) {
  switch (action.type) {
    case SEARCH_PO_IMPORT_START:
    case CREATE_PO_IMPORT_START:
    case UPDATE_PO_IMPORT_START:
    case DELETE_PO_IMPORT_START:
    case GET_PO_IMPORT_DETAILS_START:
    case CONFIRM_PO_IMPORT_START:
    case REJECT_PO_IMPORT_START:
    case GET_LOT_NUMBER_LIST_START:
    case GET_PURCHASED_ORDER_NOT_CREATE_POIMP_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_PO_IMPORT_SUCCESS:
      return {
        ...state,
        poImportList: action.payload.list,
        total: action.payload.total,
        isLoading: false,
      }
    case CONFIRM_PO_IMPORT_FAILED:
    case CONFIRM_PO_IMPORT_SUCCESS:
    case REJECT_PO_IMPORT_FAILED:
    case REJECT_PO_IMPORT_SUCCESS:
    case SEARCH_PO_IMPORT_FAILED:
    case CREATE_PO_IMPORT_SUCCESS:
    case CREATE_PO_IMPORT_FAILED:
    case UPDATE_PO_IMPORT_SUCCESS:
    case UPDATE_PO_IMPORT_FAILED:
    case DELETE_PO_IMPORT_SUCCESS:
    case DELETE_PO_IMPORT_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_PO_IMPORT_DETAILS_SUCCESS:
      return {
        ...state,
        poImportDetails: action.payload,
        isLoading: false,
      }
    case GET_PO_IMPORT_DETAILS_FAILED:
      return {
        ...state,
        poImportDetails: {},
        isLoading: false,
      }
    case GET_LOT_NUMBER_LIST_SUCCESS:
      return {
        ...state,
        lotNumberList: action.payload,
        isLoading: false,
      }
    case GET_LOT_NUMBER_LIST_FAILED:
      return {
        ...state,
        lotNumberList: [],
        isLoading: false,
      }
    case GET_PURCHASED_ORDER_NOT_CREATE_POIMP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        purchasedOrderNotCreatePOImpList: action.payload,
      }
    case GET_PURCHASED_ORDER_NOT_CREATE_POIMP_FAILED:
      return {
        ...state,
        isLoading: false,
        purchasedOrderNotCreatePOImpList: [],
      }
    case RESET_PO_IMPORT_DETAILS:
      return {
        ...state,
        poImportDetails: {},
      }
    default:
      return state
  }
}
