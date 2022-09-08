import {
  CREATE_LOCATION_FAILED,
  CREATE_LOCATION_START,
  CREATE_LOCATION_SUCCESS,
  DELETE_LOCATION_FAILED,
  DELETE_LOCATION_START,
  DELETE_LOCATION_SUCCESS,
  GET_LOCATION_DETAILS_FAILED,
  GET_LOCATION_DETAILS_START,
  GET_LOCATION_DETAILS_SUCCESS,
  SEARCH_LOCATIONS_FAILED,
  SEARCH_LOCATIONS_START,
  SEARCH_LOCATIONS_SUCCESS,
  UPDATE_LOCATION_FAILED,
  UPDATE_LOCATION_START,
  UPDATE_LOCATION_SUCCESS,
  CONFIRM_LOCATION_FAILED,
  CONFIRM_LOCATION_START,
  CONFIRM_LOCATION_SUCCESS,
  REJECT_LOCATION_FAILED,
  REJECT_LOCATION_START,
  REJECT_LOCATION_SUCCESS,
  RESET_LOCATION_DETAILS_STATE,
} from '~/modules/wmsx/redux/actions/location-management'

const initialState = {
  isLoading: false,
  locationList: [],
  locationDetails: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function locationManagement(state = initialState, action) {
  switch (action.type) {
    case SEARCH_LOCATIONS_START:
    case CREATE_LOCATION_START:
    case UPDATE_LOCATION_START:
    case DELETE_LOCATION_START:
    case CONFIRM_LOCATION_START:
    case REJECT_LOCATION_START:
    case GET_LOCATION_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_LOCATIONS_SUCCESS:
      return {
        ...state,
        locationList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }

    case SEARCH_LOCATIONS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case REJECT_LOCATION_FAILED:
    case REJECT_LOCATION_SUCCESS:
    case CONFIRM_LOCATION_FAILED:
    case CONFIRM_LOCATION_SUCCESS:
    case CREATE_LOCATION_SUCCESS:
    case CREATE_LOCATION_FAILED:
    case UPDATE_LOCATION_SUCCESS:
    case UPDATE_LOCATION_FAILED:
    case DELETE_LOCATION_SUCCESS:
    case DELETE_LOCATION_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_LOCATION_DETAILS_SUCCESS:
      return {
        ...state,
        locationDetails: action.payload,
        isLoading: false,
      }
    case GET_LOCATION_DETAILS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case RESET_LOCATION_DETAILS_STATE:
      return {
        ...state,
        locationDetails: {},
      }
    default:
      return state
  }
}
