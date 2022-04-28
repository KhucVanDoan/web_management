import {
  GET_DETAILS_START,
  GET_DETAILS_SUCCESS,
  GET_DETAILS_FAILED,
  CREATE_DETAIL_FAILED,
  CREATE_DETAIL_START,
  CREATE_DETAIL_SUCCESS,
  DELETE_DETAIL_FAILED,
  DELETE_DETAIL_START,
  DELETE_DETAIL_SUCCESS,
  GET_DETAIL_DETAILS_FAILED,
  GET_DETAIL_DETAILS_START,
  GET_DETAIL_DETAILS_SUCCESS,
  SEARCH_DETAILS_FAILED,
  SEARCH_DETAILS_START,
  SEARCH_DETAILS_SUCCESS,
  UPDATE_DETAIL_FAILED,
  UPDATE_DETAIL_START,
  UPDATE_DETAIL_SUCCESS,
  RESET_DETAIL_DETAILS_STATE,
} from '~/modules/wmsx/redux/actions/define-detail'

const initialState = {
  isLoading: false,
  detailList: [],
  detailDetails: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function defineDetail(state = initialState, action) {
  switch (action.type) {
    case GET_DETAILS_START:
    case SEARCH_DETAILS_START:
    case CREATE_DETAIL_START:
    case UPDATE_DETAIL_START:
    case DELETE_DETAIL_START:
    case GET_DETAIL_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_DETAILS_SUCCESS:
      return {
        ...state,
        detailList: action.payload,
        isLoading: false,
      }
    case SEARCH_DETAILS_SUCCESS:
      return {
        ...state,
        detailList: action.payload.list,
        total: action.payload.total,
        isLoading: false,
      }

    case SEARCH_DETAILS_FAILED:
    case CREATE_DETAIL_SUCCESS:
    case CREATE_DETAIL_FAILED:
    case UPDATE_DETAIL_SUCCESS:
    case UPDATE_DETAIL_FAILED:
    case DELETE_DETAIL_SUCCESS:
    case DELETE_DETAIL_FAILED:
    case GET_DETAIL_DETAILS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_DETAIL_DETAILS_SUCCESS:
      return {
        ...state,
        detailDetails: action.payload,
        isLoading: false,
      }
    case GET_DETAILS_FAILED:
      return {
        ...state,
        detailList: [],
        isLoading: false,
      }
    case RESET_DETAIL_DETAILS_STATE:
      return {
        ...state,
        detailDetails: {},
      }
    default:
      return state
  }
}
