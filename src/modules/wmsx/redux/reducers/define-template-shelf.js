import {
  SEARCH_TEMPLATE_SHELFS_FAILED,
  SEARCH_TEMPLATE_SHELFS_START,
  SEARCH_TEMPLATE_SHELFS_SUCCESS,
  CREATE_TEMPLATE_SHELF_FAILED,
  CREATE_TEMPLATE_SHELF_START,
  CREATE_TEMPLATE_SHELF_SUCCESS,
  DELETE_TEMPLATE_SHELF_FAILED,
  DELETE_TEMPLATE_SHELF_START,
  DELETE_TEMPLATE_SHELF_SUCCESS,
  GET_TEMPLATE_SHELF_DETAIL_FAILED,
  GET_TEMPLATE_SHELF_DETAIL_START,
  GET_TEMPLATE_SHELF_DETAIL_SUCCESS,
  UPDATE_TEMPLATE_SHELF_FAILED,
  UPDATE_TEMPLATE_SHELF_START,
  UPDATE_TEMPLATE_SHELF_SUCCESS,
  RESET_TEMPLATE_SHELF_DETAILS_STATE,
} from '~/modules/wmsx/redux/actions/define-template-shelf'
const initialState = {
  isLoading: false,
  templateShelfList: [],
  templateShelfDetails: {},
  total: null,
  importLog: {},
  createdId: {},
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function defineTemplateShelf(state = initialState, action) {
  switch (action.type) {
    case SEARCH_TEMPLATE_SHELFS_START:
    case GET_TEMPLATE_SHELF_DETAIL_START:
    case CREATE_TEMPLATE_SHELF_START:
    case UPDATE_TEMPLATE_SHELF_START:
    case DELETE_TEMPLATE_SHELF_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_TEMPLATE_SHELFS_SUCCESS:
      return {
        ...state,
        templateShelfList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case SEARCH_TEMPLATE_SHELFS_FAILED:
      return {
        ...state,
        templateShelfList: [],
        isLoading: false,
        total: 0,
      }
    case GET_TEMPLATE_SHELF_DETAIL_SUCCESS:
      return {
        ...state,
        templateShelfDetails: action.payload,
        isLoading: false,
      }
    case CREATE_TEMPLATE_SHELF_SUCCESS:
      return {
        ...state,
        createdId: action.payload,
        isLoading: false,
      }
    case GET_TEMPLATE_SHELF_DETAIL_FAILED:
      return {
        ...state,
        templateShelfDetails: {},
        isLoading: false,
      }
    case CREATE_TEMPLATE_SHELF_FAILED:
    case UPDATE_TEMPLATE_SHELF_SUCCESS:
    case UPDATE_TEMPLATE_SHELF_FAILED:
    case DELETE_TEMPLATE_SHELF_SUCCESS:
    case DELETE_TEMPLATE_SHELF_FAILED:
      return {
        ...state,
        isLoading: true,
      }
    case RESET_TEMPLATE_SHELF_DETAILS_STATE:
      return {
        ...state,
        templateShelfDetails: {},
      }

    default:
      return state
  }
}
