import {
  CREATE_ROUTING_VERSION_FAILED,
  CREATE_ROUTING_VERSION_START,
  CREATE_ROUTING_VERSION_SUCCESS,
  DELETE_ROUTING_VERSION_FAILED,
  DELETE_ROUTING_VERSION_START,
  DELETE_ROUTING_VERSION_SUCCESS,
  GET_ROUTING_VERSION_DETAILS_FAILED,
  GET_ROUTING_VERSION_DETAILS_START,
  GET_ROUTING_VERSION_DETAILS_SUCCESS,
  SEARCH_ROUTING_VERSIONS_FAILED,
  SEARCH_ROUTING_VERSIONS_START,
  SEARCH_ROUTING_VERSIONS_SUCCESS,
  UPDATE_ROUTING_VERSION_FAILED,
  UPDATE_ROUTING_VERSION_START,
  UPDATE_ROUTING_VERSION_SUCCESS,
} from '~/modules/mesx/redux/actions/routing-version.action'

const initialState = {
  isLoading: false,
  routingVersionList: [],
  routingVersionDetails: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function routingVersion(state = initialState, action) {
  switch (action.type) {
    case SEARCH_ROUTING_VERSIONS_START:
    case CREATE_ROUTING_VERSION_START:
    case UPDATE_ROUTING_VERSION_START:
    case DELETE_ROUTING_VERSION_START:
    case GET_ROUTING_VERSION_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_ROUTING_VERSIONS_SUCCESS:
      return {
        ...state,
        routingVersionList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }

    case SEARCH_ROUTING_VERSIONS_FAILED:
    case CREATE_ROUTING_VERSION_SUCCESS:
    case CREATE_ROUTING_VERSION_FAILED:
    case UPDATE_ROUTING_VERSION_SUCCESS:
    case UPDATE_ROUTING_VERSION_FAILED:
    case DELETE_ROUTING_VERSION_SUCCESS:
    case DELETE_ROUTING_VERSION_FAILED:
    case GET_ROUTING_VERSION_DETAILS_FAILED:
      return {
        ...state,
        routingVersionDetails: {},
        isLoading: false,
      }
    case GET_ROUTING_VERSION_DETAILS_SUCCESS:
      return {
        ...state,
        routingVersionDetails: action.payload,
        isLoading: false,
      }

    default:
      return state
  }
}
