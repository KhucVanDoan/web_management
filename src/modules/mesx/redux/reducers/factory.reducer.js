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
} from 'modules/mesx/redux/actions/factory.action'

const initialState = {
  isLoading: false,
  factoriesList: [],
  factoryDetails: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function Factory(state = initialState, action) {
  switch (action.type) {
    case SEARCH_FACTORIES_START:
    case CREATE_FACTORY_START:
    case UPDATE_FACTORY_START:
    case DELETE_FACTORY_START:
    case GET_FACTORY_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_FACTORIES_SUCCESS:
      return {
        ...state,
        factoriesList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }

    case SEARCH_FACTORIES_FAILED:
      return {
        ...state,
        factoriesList: [],
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
    default:
      return state
  }
}
