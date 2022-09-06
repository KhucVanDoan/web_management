import {
  CREATE_PRODUCING_COUNTRY_FAILED,
  CREATE_PRODUCING_COUNTRY_START,
  CREATE_PRODUCING_COUNTRY_SUCCESS,
  DELETE_PRODUCING_COUNTRY_FAILED,
  DELETE_PRODUCING_COUNTRY_START,
  DELETE_PRODUCING_COUNTRY_SUCCESS,
  GET_PRODUCING_COUNTRY_DETAILS_FAILED,
  GET_PRODUCING_COUNTRY_DETAILS_START,
  GET_PRODUCING_COUNTRY_DETAILS_SUCCESS,
  SEARCH_PRODUCING_COUNTRY_FAILED,
  SEARCH_PRODUCING_COUNTRY_START,
  SEARCH_PRODUCING_COUNTRY_SUCCESS,
  UPDATE_PRODUCING_COUNTRY_FAILED,
  UPDATE_PRODUCING_COUNTRY_START,
  UPDATE_PRODUCING_COUNTRY_SUCCESS,
  CONFIRM_PRODUCING_COUNTRY_FAILED,
  CONFIRM_PRODUCING_COUNTRY_START,
  CONFIRM_PRODUCING_COUNTRY_SUCCESS,
  REJECT_PRODUCING_COUNTRY_FAILED,
  REJECT_PRODUCING_COUNTRY_START,
  REJECT_PRODUCING_COUNTRY_SUCCESS,
  RESET_PRODUCING_COUNTRY_DETAILS_STATE,
} from '~/modules/wmsx/redux/actions/define-producing-country'

const initialState = {
  isLoading: false,
  producingCountryList: [],
  producingCountryDetails: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function defineProducingCountry(state = initialState, action) {
  switch (action.type) {
    case SEARCH_PRODUCING_COUNTRY_START:
    case CREATE_PRODUCING_COUNTRY_START:
    case UPDATE_PRODUCING_COUNTRY_START:
    case DELETE_PRODUCING_COUNTRY_START:
    case CONFIRM_PRODUCING_COUNTRY_START:
    case REJECT_PRODUCING_COUNTRY_START:
    case GET_PRODUCING_COUNTRY_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_PRODUCING_COUNTRY_SUCCESS:
      return {
        ...state,
        producingCountryList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }

    case SEARCH_PRODUCING_COUNTRY_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case REJECT_PRODUCING_COUNTRY_FAILED:
    case REJECT_PRODUCING_COUNTRY_SUCCESS:
    case CONFIRM_PRODUCING_COUNTRY_FAILED:
    case CONFIRM_PRODUCING_COUNTRY_SUCCESS:
    case CREATE_PRODUCING_COUNTRY_SUCCESS:
    case CREATE_PRODUCING_COUNTRY_FAILED:
    case UPDATE_PRODUCING_COUNTRY_SUCCESS:
    case UPDATE_PRODUCING_COUNTRY_FAILED:
    case DELETE_PRODUCING_COUNTRY_SUCCESS:
    case DELETE_PRODUCING_COUNTRY_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_PRODUCING_COUNTRY_DETAILS_SUCCESS:
      return {
        ...state,
        producingCountryDetails: action.payload,
        isLoading: false,
      }
    case GET_PRODUCING_COUNTRY_DETAILS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case RESET_PRODUCING_COUNTRY_DETAILS_STATE:
      return {
        ...state,
        producingCountryDetails: {},
      }
    default:
      return state
  }
}
