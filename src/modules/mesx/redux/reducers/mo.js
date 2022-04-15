import {
  CONFIRM_MO_FAILED,
  CONFIRM_MO_START,
  CONFIRM_MO_SUCCESS,
  CREATE_MO_FAILED,
  CREATE_MO_START,
  CREATE_MO_SUCCESS,
  DELETE_MO_FAILED,
  DELETE_MO_START,
  DELETE_MO_SUCCESS,
  GET_MO_DETAILS_FAILED,
  GET_MO_DETAILS_START,
  GET_MO_DETAILS_SUCCESS,
  REJECT_MO_FAILED,
  REJECT_MO_START,
  REJECT_MO_SUCCESS,
  SEARCH_MO_FAILED,
  SEARCH_MO_START,
  SEARCH_MO_SUCCESS,
  UPDATE_MO_FAILED,
  UPDATE_MO_START,
  UPDATE_MO_SUCCESS,
  GET_BOM_PRODUCING_STEP_STRUCTURE_START,
  GET_BOM_PRODUCING_STEP_STRUCTURE_FAILED,
  GET_BOM_PRODUCING_STEP_STRUCTURE_SUCCESS,
  CHECK_MATERIAL_PLAN_START,
  CHECK_MATERIAL_PLAN_SUCCESS,
  CHECK_MATERIAL_PLAN_FAILED,
  RESET_CHECK_MATERIAL_PLAN,
  GET_LIST_MO_PRODUCING_STEP_BY_ID,
  GET_LIST_MO_PRODUCING_STEP_BY_ID_SUCCESS,
  GET_LIST_MO_PRODUCING_STEP_BY_ID_FAILED,
  GET_MO_ITEMS_START,
  GET_MO_ITEMS_SUCCESS,
  GET_MO_ITEMS_FAILED,
  GET_PRICE_STRUCTURE_START,
  GET_PRICE_STRUCTURE_SUCCESS,
  GET_PRICE_STRUCTURE_FAILED,
  GET_MO_LIST_ALL,
  RESET_MO_DETAIL_STATE,
} from '~/modules/mesx/redux/actions/mo'

const initialState = {
  isLoading: false,
  moList: [],
  moListAll: [],
  moDetails: {},
  total: null,
  BOMStructure: [],
  materialCheck: {},
  moProducingStep: {},
}

export default function Mo(state = initialState, action) {
  switch (action.type) {
    case SEARCH_MO_START:
    case CREATE_MO_START:
    case UPDATE_MO_START:
    case DELETE_MO_START:
    case GET_MO_DETAILS_START:
    case CONFIRM_MO_START:
    case REJECT_MO_START:
    case GET_BOM_PRODUCING_STEP_STRUCTURE_START:
    case GET_LIST_MO_PRODUCING_STEP_BY_ID:
    case GET_PRICE_STRUCTURE_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_MO_LIST_ALL:
      return {
        ...state,
        moListAll: action.payload,
      }
    case SEARCH_MO_SUCCESS:
      return {
        ...state,
        moList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case SEARCH_MO_FAILED:
      return {
        ...state,
        moList: [],
        isLoading: false,
        total: 0,
      }
    case GET_BOM_PRODUCING_STEP_STRUCTURE_SUCCESS:
      return {
        ...state,
        BOMStructure: action.payload,
        isLoading: false,
      }
    case CONFIRM_MO_FAILED:
    case CONFIRM_MO_SUCCESS:
    case REJECT_MO_FAILED:
    case REJECT_MO_SUCCESS:
    case CREATE_MO_FAILED:
    case GET_LIST_MO_PRODUCING_STEP_BY_ID_FAILED:
    case GET_PRICE_STRUCTURE_FAILED:
    case GET_MO_ITEMS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case CREATE_MO_SUCCESS:
    case UPDATE_MO_SUCCESS:
    case UPDATE_MO_FAILED:
    case DELETE_MO_SUCCESS:
    case DELETE_MO_FAILED:
      return {
        ...state,
        isLoading: true,
      }
    case GET_MO_DETAILS_SUCCESS:
      return {
        ...state,
        moDetails: action.payload,
        isLoading: false,
      }
    case GET_MO_DETAILS_FAILED:
      return {
        ...state,
        moDetails: {},
        isLoading: false,
      }
    case GET_BOM_PRODUCING_STEP_STRUCTURE_FAILED:
      return {
        ...state,
        BOMStructure: [],
        isLoading: false,
      }
    case CHECK_MATERIAL_PLAN_START:
    case CHECK_MATERIAL_PLAN_SUCCESS:
      return {
        ...state,
        materialCheck: action.payload,
        isLoading: false,
      }
    case CHECK_MATERIAL_PLAN_FAILED:
      return {
        ...state,
        materialCheck: {},
        isLoading: false,
      }
    case GET_LIST_MO_PRODUCING_STEP_BY_ID_SUCCESS:
      return {
        ...state,
        moProducingStep: action.payload,
        isLoading: false,
      }
    case GET_MO_ITEMS_START:
    case GET_MO_ITEMS_SUCCESS:
      return {
        ...state,
        moItems: action.payload,
        isLoading: false,
      }

    case GET_PRICE_STRUCTURE_SUCCESS:
      return {
        ...state,
        PriceStructure: action.payload,
        isLoading: false,
      }
    case RESET_MO_DETAIL_STATE:
      return {
        ...state,
        moDetails: {},
      }
    case RESET_CHECK_MATERIAL_PLAN:
      return {
        ...state,
        materialCheck: {},
      }
    default:
      return state
  }
}
