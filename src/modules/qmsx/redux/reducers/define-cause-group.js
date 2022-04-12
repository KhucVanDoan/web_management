import {
  CREATE_CAUSE_GROUP_FAIL,
  CREATE_CAUSE_GROUP_START,
  CREATE_CAUSE_GROUP_SUCCESS,
  DELETE_CAUSE_GROUP_FAIL,
  DELETE_CAUSE_GROUP_START,
  DELETE_CAUSE_GROUP_SUCCESS,
  GET_CAUSE_GROUP_DETAIL_FAIL,
  GET_CAUSE_GROUP_DETAIL_START,
  GET_CAUSE_GROUP_DETAIL_SUCCESS,
  SEARCH_CAUSE_GROUP_FAIL,
  SEARCH_CAUSE_GROUP_START,
  SEARCH_CAUSE_GROUP_SUCCESS,
  UPDATE_CAUSE_GROUP_FAIL,
  UPDATE_CAUSE_GROUP_START,
  UPDATE_CAUSE_GROUP_SUCCESS,
  RESET_CAUSE_GROUP_DETAIL_STATE,
} from '~/modules/qmsx/redux/actions/define-cause-group'

const initialState = {
  isLoading: false,
  causeGroupList: [],
  causeGroupDetail: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function defineActionGroup(state = initialState, action) {
  switch (action.type) {
    case SEARCH_CAUSE_GROUP_START:
    case CREATE_CAUSE_GROUP_START:
    case UPDATE_CAUSE_GROUP_START:
    case DELETE_CAUSE_GROUP_START:
    case GET_CAUSE_GROUP_DETAIL_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_CAUSE_GROUP_SUCCESS:
      return {
        ...state,
        causeGroupList: action?.payload?.list,
        isLoading: false,
        total: action?.payload?.total,
      }
    case SEARCH_CAUSE_GROUP_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case CREATE_CAUSE_GROUP_SUCCESS:
    case CREATE_CAUSE_GROUP_FAIL:
    case UPDATE_CAUSE_GROUP_SUCCESS:
    case UPDATE_CAUSE_GROUP_FAIL:
    case DELETE_CAUSE_GROUP_SUCCESS:
    case DELETE_CAUSE_GROUP_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case GET_CAUSE_GROUP_DETAIL_SUCCESS:
      return {
        ...state,
        causeGroupDetail: action?.payload,
        isLoading: false,
      }
    case GET_CAUSE_GROUP_DETAIL_FAIL:
      return {
        ...state,
        causeGroupDetail: {},
        isLoading: false,
      }
    case RESET_CAUSE_GROUP_DETAIL_STATE:
      return {
        ...state,
        causeGroupDetail: {},
      }
    default:
      return state
  }
}
