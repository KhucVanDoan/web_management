import {
  WMSX_CREATE_LOCATION_SETTING_FAILED,
  WMSX_CREATE_LOCATION_SETTING_START,
  WMSX_CREATE_LOCATION_SETTING_SUCCESS,
  WMSX_DELETE_LOCATION_SETTING_FAILED,
  WMSX_DELETE_LOCATION_SETTING_START,
  WMSX_DELETE_LOCATION_SETTING_SUCCESS,
  WMSX_GET_LOCATION_SETTING_DETAILS_FAILED,
  WMSX_GET_LOCATION_SETTING_DETAILS_START,
  WMSX_GET_LOCATION_SETTING_DETAILS_SUCCESS,
  WMSX_SEARCH_LOCATION_SETTING_FAILED,
  WMSX_SEARCH_LOCATION_SETTING_START,
  WMSX_SEARCH_LOCATION_SETTING_SUCCESS,
  WMSX_UPDATE_LOCATION_SETTING_FAILED,
  WMSX_UPDATE_LOCATION_SETTING_START,
  WMSX_UPDATE_LOCATION_SETTING_SUCCESS,
  WMSX_RESET_LOCATION_SETTING_STATE,
} from '../actions/location-setting'

const initialState = {
  isLoading: false,
  locationSettingsList: [],
  locationSettingsDetails: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function locationSettingSetting(state = initialState, action) {
  switch (action.type) {
    case WMSX_SEARCH_LOCATION_SETTING_START:
    case WMSX_CREATE_LOCATION_SETTING_START:
    case WMSX_UPDATE_LOCATION_SETTING_START:
    case WMSX_DELETE_LOCATION_SETTING_START:
    case WMSX_GET_LOCATION_SETTING_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      }

    case WMSX_SEARCH_LOCATION_SETTING_SUCCESS:
      return {
        ...state,
        locationSettingsList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }

    case WMSX_SEARCH_LOCATION_SETTING_FAILED:
    case WMSX_CREATE_LOCATION_SETTING_SUCCESS:
    case WMSX_CREATE_LOCATION_SETTING_FAILED:
    case WMSX_UPDATE_LOCATION_SETTING_SUCCESS:
    case WMSX_UPDATE_LOCATION_SETTING_FAILED:
    case WMSX_DELETE_LOCATION_SETTING_SUCCESS:
    case WMSX_DELETE_LOCATION_SETTING_FAILED:
    case WMSX_GET_LOCATION_SETTING_DETAILS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case WMSX_GET_LOCATION_SETTING_DETAILS_SUCCESS:
      return {
        ...state,
        locationSettingsDetails: action.payload,
        isLoading: false,
      }
    case WMSX_RESET_LOCATION_SETTING_STATE:
      return {
        ...state,
        locationSettingsDetails: {},
      }
    default:
      return state
  }
}
