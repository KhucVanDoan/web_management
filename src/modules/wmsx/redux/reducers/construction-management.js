import {
  CREATE_CONSTRUCTION_FAILED,
  CREATE_CONSTRUCTION_START,
  CREATE_CONSTRUCTION_SUCCESS,
  DELETE_CONSTRUCTION_FAILED,
  DELETE_CONSTRUCTION_START,
  DELETE_CONSTRUCTION_SUCCESS,
  GET_CONSTRUCTION_DETAILS_FAILED,
  GET_CONSTRUCTION_DETAILS_START,
  GET_CONSTRUCTION_DETAILS_SUCCESS,
  SEARCH_CONSTRUCTIONS_FAILED,
  SEARCH_CONSTRUCTIONS_START,
  SEARCH_CONSTRUCTIONS_SUCCESS,
  UPDATE_CONSTRUCTION_FAILED,
  UPDATE_CONSTRUCTION_START,
  UPDATE_CONSTRUCTION_SUCCESS,
  RESET_CONSTRUCTION_DETAILS_STATE,
} from '~/modules/wmsx/redux/actions/construction-management'

const initialState = {
  isLoading: false,
  constructionList: [],
  constructionDetails: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function constructionManagement(state = initialState, action) {
  switch (action.type) {
    case SEARCH_CONSTRUCTIONS_START:
    case CREATE_CONSTRUCTION_START:
    case UPDATE_CONSTRUCTION_START:
    case DELETE_CONSTRUCTION_START:
    case GET_CONSTRUCTION_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_CONSTRUCTIONS_SUCCESS:
      return {
        ...state,
        constructionList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }

    case SEARCH_CONSTRUCTIONS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case CREATE_CONSTRUCTION_SUCCESS:
    case CREATE_CONSTRUCTION_FAILED:
    case UPDATE_CONSTRUCTION_SUCCESS:
    case UPDATE_CONSTRUCTION_FAILED:
    case DELETE_CONSTRUCTION_SUCCESS:
    case DELETE_CONSTRUCTION_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_CONSTRUCTION_DETAILS_SUCCESS:
      return {
        ...state,
        constructionDetails: action.payload,
        isLoading: false,
      }
    case GET_CONSTRUCTION_DETAILS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case RESET_CONSTRUCTION_DETAILS_STATE:
      return {
        ...state,
        constructionDetails: {},
      }
    default:
      return state
  }
}
