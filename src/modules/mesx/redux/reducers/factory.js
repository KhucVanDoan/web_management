import {
  CREATE_FACTORY_FAILED,
  CREATE_FACTORY_START,
  CREATE_FACTORY_SUCCESS,
  DELETE_FACTORY_FAILED,
  DELETE_FACTORY_START,
  DELETE_FACTORY_SUCCESS,
  GET_FACTORY_DETAILS_FAILED,
  GET_FACTORY_DETAILS_START,
  GET_FACTORY_DETAILS_SUCCESS,
  SEARCH_FACTORIES_FAILED,
  SEARCH_FACTORIES_START,
  SEARCH_FACTORIES_SUCCESS,
  UPDATE_FACTORY_FAILED,
  UPDATE_FACTORY_START,
  UPDATE_FACTORY_SUCCESS,
  GET_FACTORIES_FAILED,
  GET_FACTORIES_START,
  GET_FACTORIES_SUCCESS,
  RESET_FACTORY_DETAILS_STATE,
} from '~/modules/mesx/redux/actions/factory'

const initialState = {
  isLoading: false,
  factoryList: [],
  factoryDetails: {},
  total: null,
  meta: {},
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function defineFactory(state = initialState, action) {
  switch (action.type) {
    case SEARCH_FACTORIES_START:
    case CREATE_FACTORY_START:
    case UPDATE_FACTORY_START:
    case DELETE_FACTORY_START:
    case GET_FACTORY_DETAILS_START:
    case GET_FACTORIES_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_FACTORIES_SUCCESS:
      return {
        ...state,
        factoryList: action?.payload?.items,
        isLoading: false,
        meta: action?.payload?.meta,
      }
    case GET_FACTORIES_FAILED:
      return {
        ...state,
        factoryList: [],
        isLoading: false,
      }
    case SEARCH_FACTORIES_SUCCESS:
      return {
        ...state,
        factoryList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }

    case SEARCH_FACTORIES_FAILED:
      return {
        ...state,
        factoryList: [],
        isLoading: false,
        total: 0,
      }
    case CREATE_FACTORY_SUCCESS:
    case CREATE_FACTORY_FAILED:
    case UPDATE_FACTORY_SUCCESS:
    case UPDATE_FACTORY_FAILED:
    case DELETE_FACTORY_SUCCESS:
    case DELETE_FACTORY_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_FACTORY_DETAILS_SUCCESS:
      return {
        ...state,
        factoryDetails: action.payload,
        isLoading: false,
      }
    case GET_FACTORY_DETAILS_FAILED:
      return {
        ...state,
        factoryDetails: {},
        isLoading: false,
      }
    case RESET_FACTORY_DETAILS_STATE:
      return {
        ...state,
        factoryDetails: {},
      }

    default:
      return state
  }
}
