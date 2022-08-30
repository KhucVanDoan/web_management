import {
  CREATE_OBJECT_CATEGORY_FAILED,
  CREATE_OBJECT_CATEGORY_START,
  CREATE_OBJECT_CATEGORY_SUCCESS,
  DELETE_OBJECT_CATEGORY_FAILED,
  DELETE_OBJECT_CATEGORY_START,
  DELETE_OBJECT_CATEGORY_SUCCESS,
  GET_OBJECT_CATEGORY_DETAILS_FAILED,
  GET_OBJECT_CATEGORY_DETAILS_START,
  GET_OBJECT_CATEGORY_DETAILS_SUCCESS,
  SEARCH_OBJECT_CATEGORY_FAILED,
  SEARCH_OBJECT_CATEGORY_START,
  SEARCH_OBJECT_CATEGORY_SUCCESS,
  UPDATE_OBJECT_CATEGORY_FAILED,
  UPDATE_OBJECT_CATEGORY_START,
  UPDATE_OBJECT_CATEGORY_SUCCESS,
  CONFIRM_OBJECT_CATEGORY_FAILED,
  CONFIRM_OBJECT_CATEGORY_START,
  CONFIRM_OBJECT_CATEGORY_SUCCESS,
  REJECT_OBJECT_CATEGORY_FAILED,
  REJECT_OBJECT_CATEGORY_START,
  REJECT_OBJECT_CATEGORY_SUCCESS,
  RESET_OBJECT_CATEGORY_DETAILS_STATE,
} from '~/modules/wmsx/redux/actions/define-object-category'

const initialState = {
  isLoading: false,
  objectCategoryList: [],
  objectCategoryDetails: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function defineObjectCategory(state = initialState, action) {
  switch (action.type) {
    case SEARCH_OBJECT_CATEGORY_START:
    case CREATE_OBJECT_CATEGORY_START:
    case UPDATE_OBJECT_CATEGORY_START:
    case DELETE_OBJECT_CATEGORY_START:
    case CONFIRM_OBJECT_CATEGORY_START:
    case REJECT_OBJECT_CATEGORY_START:
    case GET_OBJECT_CATEGORY_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_OBJECT_CATEGORY_SUCCESS:
      return {
        ...state,
        objectCategoryList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }

    case SEARCH_OBJECT_CATEGORY_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case CONFIRM_OBJECT_CATEGORY_FAILED:
    case CONFIRM_OBJECT_CATEGORY_SUCCESS:
    case REJECT_OBJECT_CATEGORY_FAILED:
    case REJECT_OBJECT_CATEGORY_SUCCESS:
    case CREATE_OBJECT_CATEGORY_SUCCESS:
    case CREATE_OBJECT_CATEGORY_FAILED:
    case UPDATE_OBJECT_CATEGORY_SUCCESS:
    case UPDATE_OBJECT_CATEGORY_FAILED:
    case DELETE_OBJECT_CATEGORY_SUCCESS:
    case DELETE_OBJECT_CATEGORY_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_OBJECT_CATEGORY_DETAILS_SUCCESS:
      return {
        ...state,
        objectCategoryDetails: action.payload,
        isLoading: false,
      }
    case GET_OBJECT_CATEGORY_DETAILS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case RESET_OBJECT_CATEGORY_DETAILS_STATE:
      return {
        ...state,
        objectCategoryDetails: {},
      }
    default:
      return state
  }
}
