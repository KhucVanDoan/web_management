import {
  CREATE_MATERIAL_QUALITY_FAILED,
  CREATE_MATERIAL_QUALITY_START,
  CREATE_MATERIAL_QUALITY_SUCCESS,
  DELETE_MATERIAL_QUALITY_FAILED,
  DELETE_MATERIAL_QUALITY_START,
  DELETE_MATERIAL_QUALITY_SUCCESS,
  GET_MATERIAL_QUALITY_DETAILS_FAILED,
  GET_MATERIAL_QUALITY_DETAILS_START,
  GET_MATERIAL_QUALITY_DETAILS_SUCCESS,
  SEARCH_MATERIAL_QUALITY_FAILED,
  SEARCH_MATERIAL_QUALITY_START,
  SEARCH_MATERIAL_QUALITY_SUCCESS,
  UPDATE_MATERIAL_QUALITY_FAILED,
  UPDATE_MATERIAL_QUALITY_START,
  UPDATE_MATERIAL_QUALITY_SUCCESS,
  CONFIRM_MATERIAL_QUALITY_FAILED,
  CONFIRM_MATERIAL_QUALITY_START,
  CONFIRM_MATERIAL_QUALITY_SUCCESS,
  REJECT_MATERIAL_QUALITY_FAILED,
  REJECT_MATERIAL_QUALITY_START,
  REJECT_MATERIAL_QUALITY_SUCCESS,
  RESET_MATERIAL_QUALITY_DETAILS_STATE,
} from '~/modules/wmsx/redux/actions/define-material-quality'

const initialState = {
  isLoading: false,
  materialQualityList: [],
  materialQualityDetails: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function defineMaterialQuality(state = initialState, action) {
  switch (action.type) {
    case SEARCH_MATERIAL_QUALITY_START:
    case CREATE_MATERIAL_QUALITY_START:
    case UPDATE_MATERIAL_QUALITY_START:
    case DELETE_MATERIAL_QUALITY_START:
    case CONFIRM_MATERIAL_QUALITY_START:
    case REJECT_MATERIAL_QUALITY_START:
    case GET_MATERIAL_QUALITY_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_MATERIAL_QUALITY_SUCCESS:
      return {
        ...state,
        materialQualityList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }

    case SEARCH_MATERIAL_QUALITY_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case REJECT_MATERIAL_QUALITY_FAILED:
    case REJECT_MATERIAL_QUALITY_SUCCESS:
    case CONFIRM_MATERIAL_QUALITY_FAILED:
    case CONFIRM_MATERIAL_QUALITY_SUCCESS:
    case CREATE_MATERIAL_QUALITY_SUCCESS:
    case CREATE_MATERIAL_QUALITY_FAILED:
    case UPDATE_MATERIAL_QUALITY_SUCCESS:
    case UPDATE_MATERIAL_QUALITY_FAILED:
    case DELETE_MATERIAL_QUALITY_SUCCESS:
    case DELETE_MATERIAL_QUALITY_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_MATERIAL_QUALITY_DETAILS_SUCCESS:
      return {
        ...state,
        materialQualityDetails: action.payload,
        isLoading: false,
      }
    case GET_MATERIAL_QUALITY_DETAILS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case RESET_MATERIAL_QUALITY_DETAILS_STATE:
      return {
        ...state,
        materialQualityDetails: {},
      }
    default:
      return state
  }
}
