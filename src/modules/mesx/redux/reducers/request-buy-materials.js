import {
  CONFIRM_REQUEST_BUY_MATERIAL_FAILED,
  CONFIRM_REQUEST_BUY_MATERIAL_START,
  CONFIRM_REQUEST_BUY_MATERIAL_SUCCESS,
  DELETE_REQUEST_BUY_MATERIAL_FAILED,
  DELETE_REQUEST_BUY_MATERIAL_START,
  DELETE_REQUEST_BUY_MATERIAL_SUCCESS,
  GET_REQUEST_BUY_MATERIAL_DETAILS_FAILED,
  GET_REQUEST_BUY_MATERIAL_DETAILS_START,
  GET_REQUEST_BUY_MATERIAL_DETAILS_SUCCESS,
  SEARCH_REQUEST_BUY_MATERIALS_FAILED,
  SEARCH_REQUEST_BUY_MATERIALS_START,
  SEARCH_REQUEST_BUY_MATERIALS_SUCCESS,
  UPDATE_REQUEST_BUY_MATERIAL_FAILED,
  UPDATE_REQUEST_BUY_MATERIAL_START,
  UPDATE_REQUEST_BUY_MATERIAL_SUCCESS,
  PRINT_QR_REQUEST_BUY_MATERIAL_FAILED,
  PRINT_QR_REQUEST_BUY_MATERIAL_START,
  PRINT_QR_REQUEST_BUY_MATERIAL_SUCCESS,
  REJECT_REQUEST_BUY_MATERIAL_FAILED,
  REJECT_REQUEST_BUY_MATERIAL_START,
  REJECT_REQUEST_BUY_MATERIAL_SUCCESS,
  RESET_REQUEST_BUY_MATERIAL_DETAIL_STATE,
  RESET_REQUEST_BUY_MATERIAL_LIST_STATE,
  GET_ALL_LIST_REQUEST_BUY_MATERIAL_SUCCESS,
  CREATE_REQUEST_BUY_MATERIAL_START,
  CREATE_REQUEST_BUY_MATERIAL_FAILED,
  CREATE_REQUEST_BUY_MATERIAL_SUCCESS,
} from '~/modules/mesx/redux/actions/request-by-materials'

const initialState = {
  isLoading: false,
  requestBuyMaterialList: [],
  listAll: [],
  requestBuyMaterialDetails: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function defineRequestBuyMaterial(state = initialState, action) {
  switch (action.type) {
    case SEARCH_REQUEST_BUY_MATERIALS_START:
    case UPDATE_REQUEST_BUY_MATERIAL_START:
    case DELETE_REQUEST_BUY_MATERIAL_START:
    case CREATE_REQUEST_BUY_MATERIAL_START:
    case REJECT_REQUEST_BUY_MATERIAL_START:
    case GET_REQUEST_BUY_MATERIAL_DETAILS_START:
    case CONFIRM_REQUEST_BUY_MATERIAL_START:
    case PRINT_QR_REQUEST_BUY_MATERIAL_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_REQUEST_BUY_MATERIALS_SUCCESS:
      return {
        ...state,
        requestBuyMaterialList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case GET_ALL_LIST_REQUEST_BUY_MATERIAL_SUCCESS:
      return {
        ...state,
        listAll: action.payload,
      }
    case SEARCH_REQUEST_BUY_MATERIALS_FAILED:
      return {
        ...state,
        requestBuyMaterialList: [],
        isLoading: false,
        total: 0,
      }
    case CONFIRM_REQUEST_BUY_MATERIAL_FAILED:
    case CONFIRM_REQUEST_BUY_MATERIAL_SUCCESS:
    case REJECT_REQUEST_BUY_MATERIAL_SUCCESS:
    case REJECT_REQUEST_BUY_MATERIAL_FAILED:
    case UPDATE_REQUEST_BUY_MATERIAL_SUCCESS:
    case CREATE_REQUEST_BUY_MATERIAL_SUCCESS:
    case CREATE_REQUEST_BUY_MATERIAL_FAILED:
    case UPDATE_REQUEST_BUY_MATERIAL_FAILED:
    case PRINT_QR_REQUEST_BUY_MATERIAL_SUCCESS:
    case PRINT_QR_REQUEST_BUY_MATERIAL_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case DELETE_REQUEST_BUY_MATERIAL_SUCCESS:
      return {
        ...state,
        requestBuyMaterialList: state.requestBuyMaterialList.filter(
          (item) => item?.id !== action.payload.id,
        ),
        isLoading: false,
      }
    case DELETE_REQUEST_BUY_MATERIAL_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_REQUEST_BUY_MATERIAL_DETAILS_SUCCESS:
      return {
        ...state,
        requestBuyMaterialDetails: action.payload,
        isLoading: false,
      }
    case GET_REQUEST_BUY_MATERIAL_DETAILS_FAILED:
      return {
        ...state,
        requestBuyMaterialDetails: {},
        isLoading: false,
      }
    case RESET_REQUEST_BUY_MATERIAL_DETAIL_STATE:
      return {
        ...state,
        requestBuyMaterialDetails: {},
      }
    case RESET_REQUEST_BUY_MATERIAL_LIST_STATE:
      return {
        ...state,
        requestBuyMaterialList: [],
      }
    default:
      return state
  }
}
