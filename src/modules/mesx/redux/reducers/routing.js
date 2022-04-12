import {
  CONFIRM_ROUTING_FAILED,
  CONFIRM_ROUTING_START,
  CONFIRM_ROUTING_SUCCESS,
  CREATE_ROUTING_FAILED,
  CREATE_ROUTING_START,
  CREATE_ROUTING_SUCCESS,
  DELETE_ROUTING_FAILED,
  DELETE_ROUTING_START,
  DELETE_ROUTING_SUCCESS,
  GET_ROUTING_DETAILS_FAILED,
  GET_ROUTING_DETAILS_START,
  GET_ROUTING_DETAILS_SUCCESS,
  SEARCH_ROUTINGS_FAILED,
  SEARCH_ROUTINGS_START,
  SEARCH_ROUTINGS_SUCCESS,
  UPDATE_ROUTING_FAILED,
  UPDATE_ROUTING_START,
  UPDATE_ROUTING_SUCCESS,
  RESET_ROUTING_DETAILS_STATE,
} from '~/modules/mesx/redux/actions/routing'

const initialState = {
  isLoading: false,
  routingList: [],
  routingDetails: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function defineRouting(state = initialState, action) {
  switch (action.type) {
    case SEARCH_ROUTINGS_START:
    case CREATE_ROUTING_START:
    case UPDATE_ROUTING_START:
    case DELETE_ROUTING_START:
    case GET_ROUTING_DETAILS_START:
    case CONFIRM_ROUTING_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_ROUTINGS_SUCCESS:
      return {
        ...state,
        routingList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case SEARCH_ROUTINGS_FAILED:
      return {
        ...state,
        routingList: [],
        isLoading: false,
        total: 0,
      }
    case CONFIRM_ROUTING_FAILED:
    case CONFIRM_ROUTING_SUCCESS:
    case CREATE_ROUTING_FAILED:
    case UPDATE_ROUTING_FAILED:
    case DELETE_ROUTING_SUCCESS:
    case DELETE_ROUTING_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case UPDATE_ROUTING_SUCCESS:
    case CREATE_ROUTING_SUCCESS:
    case GET_ROUTING_DETAILS_SUCCESS:
      return {
        ...state,
        routingDetails: action.payload,
        isLoading: false,
      }
    case GET_ROUTING_DETAILS_FAILED:
      return {
        ...state,
        routingDetails: {},
        isLoading: false,
      }
    case RESET_ROUTING_DETAILS_STATE:
      return {
        ...state,
        routingDetails: {},
      }
    default:
      return state
  }
}
