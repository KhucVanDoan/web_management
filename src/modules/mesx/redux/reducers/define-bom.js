import {
  CONFIRM_BOM_FAILED,
  CONFIRM_BOM_START,
  CONFIRM_BOM_SUCCESS,
  CREATE_BOM_FAILED,
  CREATE_BOM_START,
  CREATE_BOM_SUCCESS,
  DELETE_BOM_FAILED,
  DELETE_BOM_START,
  DELETE_BOM_SUCCESS,
  GET_BOM_DETAILS_FAILED,
  GET_BOM_DETAILS_START,
  GET_BOM_DETAILS_SUCCESS,
  REJECT_BOM_FAILED,
  REJECT_BOM_START,
  REJECT_BOM_SUCCESS,
  SEARCH_BOM_FAILED,
  SEARCH_BOM_START,
  SEARCH_BOM_SUCCESS,
  UPDATE_BOM_FAILED,
  UPDATE_BOM_START,
  UPDATE_BOM_SUCCESS,
  GET_BOM_STRUCTURE_FAILED,
  GET_BOM_STRUCTURE_START,
  GET_BOM_STRUCTURE_SUCCESS,
  GET_BOM_BY_ITEM_FAILED,
  GET_BOM_BY_ITEM_START,
  GET_BOM_BY_ITEM_SUCCESS,
  RESET_BOM_DETAIL_STATE,
} from '~/modules/mesx/redux/actions/define-bom'

const initialState = {
  isLoading: false,
  BOMList: [],
  BOMDetails: {},
  total: null,
  BOMStructure: [],
}

export default function bom(state = initialState, action) {
  switch (action.type) {
    case SEARCH_BOM_START:
    case CREATE_BOM_START:
    case UPDATE_BOM_START:
    case DELETE_BOM_START:
    case GET_BOM_DETAILS_START:
    case GET_BOM_STRUCTURE_START:
    case CONFIRM_BOM_START:
    case REJECT_BOM_START:
    case GET_BOM_BY_ITEM_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_BOM_SUCCESS:
      return {
        ...state,
        BOMList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case SEARCH_BOM_FAILED:
      return {
        ...state,
        BOMList: [],
        isLoading: false,
        total: 0,
      }
    case DELETE_BOM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        BOMList: state.BOMList.filter((item) => item.id !== action.payload.id),
      }
    case CONFIRM_BOM_FAILED:
    case CONFIRM_BOM_SUCCESS:
    case REJECT_BOM_FAILED:
    case REJECT_BOM_SUCCESS:
    case CREATE_BOM_FAILED:
    case CREATE_BOM_SUCCESS:
    case UPDATE_BOM_SUCCESS:
    case UPDATE_BOM_FAILED:
    case DELETE_BOM_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_BOM_STRUCTURE_SUCCESS:
      return {
        ...state,
        BOMStructure: action.payload,
        isLoading: false,
      }
    case GET_BOM_DETAILS_SUCCESS:
      return {
        ...state,
        BOMDetails: action.payload,
        isLoading: false,
      }
    case GET_BOM_BY_ITEM_SUCCESS:
      return {
        ...state,
        // BOMDetails: action.payload,
        isLoading: false,
      }

    case GET_BOM_DETAILS_FAILED:
    case GET_BOM_BY_ITEM_FAILED:
      return {
        ...state,
        BOMDetails: {},
        isLoading: false,
      }
    case GET_BOM_STRUCTURE_FAILED:
      return {
        ...state,
        BOMStructure: [],
        isLoading: false,
      }
    case RESET_BOM_DETAIL_STATE:
      return {
        ...state,
        BOMDetails: {},
        BOMStructure: [],
      }
    default:
      return state
  }
}
