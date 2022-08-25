import {
  CREATE_CONSTRUCTION_ITEMS_FAILED,
  CREATE_CONSTRUCTION_ITEMS_START,
  CREATE_CONSTRUCTION_ITEMS_SUCCESS,
  DELETE_CONSTRUCTION_ITEMS_FAILED,
  DELETE_CONSTRUCTION_ITEMS_START,
  DELETE_CONSTRUCTION_ITEMS_SUCCESS,
  GET_CONSTRUCTION_ITEMS_DETAILS_FAILED,
  GET_CONSTRUCTION_ITEMS_DETAILS_START,
  GET_CONSTRUCTION_ITEMS_DETAILS_SUCCESS,
  SEARCH_CONSTRUCTION_ITEMS_FAILED,
  SEARCH_CONSTRUCTION_ITEMS_START,
  SEARCH_CONSTRUCTION_ITEMS_SUCCESS,
  UPDATE_CONSTRUCTION_ITEMS_FAILED,
  UPDATE_CONSTRUCTION_ITEMS_START,
  UPDATE_CONSTRUCTION_ITEMS_SUCCESS,
  CONFIRM_CONSTRUCTION_ITEMS_START,
  CONFIRM_CONSTRUCTION_ITEMS_SUCCESS,
  CONFIRM_CONSTRUCTION_ITEMS_FAILED,
  REJECT_CONSTRUCTION_ITEMS_START,
  REJECT_CONSTRUCTION_ITEMS_SUCCESS,
  REJECT_CONSTRUCTION_ITEMS_FAILED,
  RESET_CONSTRUCTION_ITEMS_DETAILS_STATE,
} from '~/modules/wmsx/redux/actions/construction-items-management'

const initialState = {
  isLoading: false,
  constructionItemsList: [],
  constructionItemsDetails: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function constructionItemsManagement(
  state = initialState,
  action,
) {
  switch (action.type) {
    case SEARCH_CONSTRUCTION_ITEMS_START:
    case CREATE_CONSTRUCTION_ITEMS_START:
    case UPDATE_CONSTRUCTION_ITEMS_START:
    case DELETE_CONSTRUCTION_ITEMS_START:
    case CONFIRM_CONSTRUCTION_ITEMS_START:
    case REJECT_CONSTRUCTION_ITEMS_START:
    case GET_CONSTRUCTION_ITEMS_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_CONSTRUCTION_ITEMS_SUCCESS:
      return {
        ...state,
        constructionItemsList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }

    case SEARCH_CONSTRUCTION_ITEMS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case REJECT_CONSTRUCTION_ITEMS_SUCCESS:
    case REJECT_CONSTRUCTION_ITEMS_FAILED:
    case CONFIRM_CONSTRUCTION_ITEMS_SUCCESS:
    case CONFIRM_CONSTRUCTION_ITEMS_FAILED:
    case CREATE_CONSTRUCTION_ITEMS_SUCCESS:
    case CREATE_CONSTRUCTION_ITEMS_FAILED:
    case UPDATE_CONSTRUCTION_ITEMS_SUCCESS:
    case UPDATE_CONSTRUCTION_ITEMS_FAILED:
    case DELETE_CONSTRUCTION_ITEMS_SUCCESS:
    case DELETE_CONSTRUCTION_ITEMS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_CONSTRUCTION_ITEMS_DETAILS_SUCCESS:
      return {
        ...state,
        constructionItemsDetails: action.payload,
        isLoading: false,
      }
    case GET_CONSTRUCTION_ITEMS_DETAILS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case RESET_CONSTRUCTION_ITEMS_DETAILS_STATE:
      return {
        ...state,
        constructionItemsDetails: {},
      }
    default:
      return state
  }
}
