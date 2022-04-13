import {
  CREATE_ACTION_GROUP_FAIL,
  CREATE_ACTION_GROUP_START,
  CREATE_ACTION_GROUP_SUCCESS,
  DELETE_ACTION_GROUP_FAIL,
  DELETE_ACTION_GROUP_START,
  DELETE_ACTION_GROUP_SUCCESS,
  GET_ACTION_GROUP_DETAIL_FAIL,
  GET_ACTION_GROUP_DETAIL_START,
  GET_ACTION_GROUP_DETAIL_SUCCESS,
  SEARCH_ACTION_GROUP_FAIL,
  SEARCH_ACTION_GROUP_START,
  SEARCH_ACTION_GROUP_SUCCESS,
  UPDATE_ACTION_GROUP_FAIL,
  UPDATE_ACTION_GROUP_START,
  UPDATE_ACTION_GROUP_SUCCESS,
  RESET_ACTION_GROUP_DETAIL_STATE
} from '~/modules/qmsx/redux/actions/define-action-group'

const initialState = {
  isLoading: false,
  actionGroupList: [],
  actionGroupDetail: {},
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
    case SEARCH_ACTION_GROUP_START:
    case CREATE_ACTION_GROUP_START:
    case UPDATE_ACTION_GROUP_START:
    case DELETE_ACTION_GROUP_START:
    case GET_ACTION_GROUP_DETAIL_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_ACTION_GROUP_SUCCESS:
      return {
        ...state,
        actionGroupList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case SEARCH_ACTION_GROUP_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case CREATE_ACTION_GROUP_SUCCESS:
    case CREATE_ACTION_GROUP_FAIL:
    case UPDATE_ACTION_GROUP_SUCCESS:
    case UPDATE_ACTION_GROUP_FAIL:
    case DELETE_ACTION_GROUP_SUCCESS:
    case DELETE_ACTION_GROUP_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case GET_ACTION_GROUP_DETAIL_SUCCESS:
      return {
        ...state,
        actionGroupDetail: action.payload,
        isLoading: false,
      }
    case GET_ACTION_GROUP_DETAIL_FAIL:
      return {
        ...state,
        actionGroupDetail: {},
        isLoading: false,
      }
    case RESET_ACTION_GROUP_DETAIL_STATE:
      return {
        ...state,
        actionGroupDetail: {},
      }
    default:
      return state
  }
}
