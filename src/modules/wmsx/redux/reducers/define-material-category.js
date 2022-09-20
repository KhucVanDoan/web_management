import {
  CREATE_MATERIAL_CATEGORY_FAILED,
  CREATE_MATERIAL_CATEGORY_START,
  CREATE_MATERIAL_CATEGORY_SUCCESS,
  DELETE_MATERIAL_CATEGORY_FAILED,
  DELETE_MATERIAL_CATEGORY_START,
  DELETE_MATERIAL_CATEGORY_SUCCESS,
  GET_MATERIAL_CATEGORY_DETAILS_FAILED,
  GET_MATERIAL_CATEGORY_DETAILS_START,
  GET_MATERIAL_CATEGORY_DETAILS_SUCCESS,
  GET_MATERIAL_CHILD_DETAILS_FAILED,
  GET_MATERIAL_CHILD_DETAILS_START,
  GET_MATERIAL_CHILD_DETAILS_SUCCESS,
  SEARCH_MATERIAL_CATEGORY_FAILED,
  SEARCH_MATERIAL_CATEGORY_START,
  SEARCH_MATERIAL_CATEGORY_SUCCESS,
  UPDATE_MATERIAL_CATEGORY_FAILED,
  UPDATE_MATERIAL_CATEGORY_START,
  UPDATE_MATERIAL_CATEGORY_SUCCESS,
  CONFIRM_MATERIAL_CATEGORY_FAILED,
  CONFIRM_MATERIAL_CATEGORY_START,
  CONFIRM_MATERIAL_CATEGORY_SUCCESS,
  REJECT_MATERIAL_CATEGORY_FAILED,
  REJECT_MATERIAL_CATEGORY_START,
  REJECT_MATERIAL_CATEGORY_SUCCESS,
  RESET_MATERIAL_CATEGORY_DETAILS_STATE,
} from '~/modules/wmsx/redux/actions/define-material-category'

const initialState = {
  isLoading: false,
  materialCategoryList: [],
  materialChildList: [],
  materialCategoryDetails: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function defineMaterialCategory(state = initialState, action) {
  switch (action.type) {
    case SEARCH_MATERIAL_CATEGORY_START:
    case CREATE_MATERIAL_CATEGORY_START:
    case UPDATE_MATERIAL_CATEGORY_START:
    case DELETE_MATERIAL_CATEGORY_START:
    case CONFIRM_MATERIAL_CATEGORY_START:
    case REJECT_MATERIAL_CATEGORY_START:
    case GET_MATERIAL_CATEGORY_DETAILS_START:
    case GET_MATERIAL_CHILD_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_MATERIAL_CATEGORY_SUCCESS:
      return {
        ...state,
        materialCategoryList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }

    case SEARCH_MATERIAL_CATEGORY_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case REJECT_MATERIAL_CATEGORY_FAILED:
    case REJECT_MATERIAL_CATEGORY_SUCCESS:
    case CONFIRM_MATERIAL_CATEGORY_FAILED:
    case CONFIRM_MATERIAL_CATEGORY_SUCCESS:
    case CREATE_MATERIAL_CATEGORY_SUCCESS:
    case CREATE_MATERIAL_CATEGORY_FAILED:
    case UPDATE_MATERIAL_CATEGORY_SUCCESS:
    case UPDATE_MATERIAL_CATEGORY_FAILED:
    case DELETE_MATERIAL_CATEGORY_SUCCESS:
    case DELETE_MATERIAL_CATEGORY_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_MATERIAL_CATEGORY_DETAILS_SUCCESS:
      return {
        ...state,
        materialCategoryDetails: action.payload,
        isLoading: false,
      }
    case GET_MATERIAL_CATEGORY_DETAILS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_MATERIAL_CHILD_DETAILS_SUCCESS:
      return {
        ...state,
        materialChildList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case GET_MATERIAL_CHILD_DETAILS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case RESET_MATERIAL_CATEGORY_DETAILS_STATE:
      return {
        ...state,
        materialCategoryDetails: {},
      }
    default:
      return state
  }
}
