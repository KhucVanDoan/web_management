import {
  CREATE_UOM_FAILED,
  CREATE_UOM_START,
  CREATE_UOM_SUCCESS,
  DELETE_UOM_FAILED,
  DELETE_UOM_START,
  DELETE_UOM_SUCCESS,
  GET_UOM_DETAILS_FAILED,
  GET_UOM_DETAILS_START,
  GET_UOM_DETAILS_SUCCESS,
  SEARCH_UOMS_FAILED,
  SEARCH_UOMS_START,
  SEARCH_UOMS_SUCCESS,
  UPDATE_UOM_FAILED,
  UPDATE_UOM_START,
  UPDATE_UOM_SUCCESS,
  CONFIRM_UOM_FAILED,
  CONFIRM_UOM_START,
  CONFIRM_UOM_SUCCESS,
  REJECT_UOM_FAILED,
  REJECT_UOM_START,
  REJECT_UOM_SUCCESS,
  RESET_UOM_DETAILS_STATE,
} from '~/modules/wmsx/redux/actions/define-uom'

const initialState = {
  isLoading: false,
  uomList: [],
  uomDetails: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function defineUom(state = initialState, action) {
  switch (action.type) {
    case SEARCH_UOMS_START:
    case CREATE_UOM_START:
    case UPDATE_UOM_START:
    case DELETE_UOM_START:
    case CONFIRM_UOM_START:
    case REJECT_UOM_START:
    case GET_UOM_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_UOMS_SUCCESS:
      return {
        ...state,
        uomList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case DELETE_UOM_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case CONFIRM_UOM_SUCCESS:
    case CONFIRM_UOM_FAILED:
    case REJECT_UOM_SUCCESS:
    case REJECT_UOM_FAILED:
    case SEARCH_UOMS_FAILED:
    case CREATE_UOM_SUCCESS:
    case CREATE_UOM_FAILED:
    case UPDATE_UOM_SUCCESS:
    case UPDATE_UOM_FAILED:
    case DELETE_UOM_FAILED:
    case GET_UOM_DETAILS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_UOM_DETAILS_SUCCESS:
      return {
        ...state,
        uomDetails: action.payload,
        isLoading: false,
      }
    case RESET_UOM_DETAILS_STATE:
      return {
        ...state,
        uomDetails: {},
      }
    default:
      return state
  }
}
