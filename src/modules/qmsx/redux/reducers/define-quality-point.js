import {
  CONFIRM_QUALITY_POINT_FAIL,
  CONFIRM_QUALITY_POINT_START,
  CONFIRM_QUALITY_POINT_SUCCESS,
  CREATE_QUALITY_POINT_FAIL,
  CREATE_QUALITY_POINT_START,
  CREATE_QUALITY_POINT_SUCCESS,
  DELETE_QUALITY_POINT_FAIL,
  DELETE_QUALITY_POINT_START,
  DELETE_QUALITY_POINT_SUCCESS,
  GET_QUALITY_POINT_DETAIL_FAIL,
  GET_QUALITY_POINT_DETAIL_START,
  GET_QUALITY_POINT_DETAIL_SUCCESS,
  SEARCH_QUALITY_POINT_FAIL,
  SEARCH_QUALITY_POINT_START,
  SEARCH_QUALITY_POINT_SUCCESS,
  UPDATE_QUALITY_POINT_FAIL,
  UPDATE_QUALITY_POINT_START,
  UPDATE_QUALITY_POINT_SUCCESS,
  RESET_QUALITY_POINT_DETAIL_STATE,
} from '~/modules/qmsx/redux/actions/define-quality-point'

const initialState = {
  isLoading: false,
  qualityPointList: [],
  qualityPointDetail: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function defineQualityPoint(state = initialState, action) {
  switch (action.type) {
    case SEARCH_QUALITY_POINT_START:
    case CREATE_QUALITY_POINT_START:
    case UPDATE_QUALITY_POINT_START:
    case DELETE_QUALITY_POINT_START:
    case GET_QUALITY_POINT_DETAIL_START:
    case CONFIRM_QUALITY_POINT_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_QUALITY_POINT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        qualityPointList: action?.payload?.list,
        total: action?.payload?.total,
      }
    case CREATE_QUALITY_POINT_SUCCESS:
    case UPDATE_QUALITY_POINT_SUCCESS:
    case DELETE_QUALITY_POINT_SUCCESS:
    case CONFIRM_QUALITY_POINT_SUCCESS:
    case SEARCH_QUALITY_POINT_FAIL:
    case CREATE_QUALITY_POINT_FAIL:
    case UPDATE_QUALITY_POINT_FAIL:
    case DELETE_QUALITY_POINT_FAIL:
    case GET_QUALITY_POINT_DETAIL_FAIL:
    case CONFIRM_QUALITY_POINT_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case GET_QUALITY_POINT_DETAIL_SUCCESS:
      return {
        ...state,
        qualityPointDetail: action?.payload,
        isLoading: false,
      }
    case RESET_QUALITY_POINT_DETAIL_STATE:
      return {
        ...state,
        qualityPointDetail: {},
      }
    default:
      return state
  }
}
