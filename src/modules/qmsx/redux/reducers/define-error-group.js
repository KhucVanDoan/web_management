import {
  SEARCH_ERROR_GROUP_FAIL,
  SEARCH_ERROR_GROUP_START,
  SEARCH_ERROR_GROUP_SUCCESS,
  CREATE_ERROR_GROUP_FAIL,
  CREATE_ERROR_GROUP_START,
  CREATE_ERROR_GROUP_SUCCESS,
  DELETE_ERROR_GROUP_FAIL,
  DELETE_ERROR_GROUP_START,
  DELETE_ERROR_GROUP_SUCCESS,
  GET_ERROR_GROUP_DETAIL_FAIL,
  GET_ERROR_GROUP_DETAIL_START,
  GET_ERROR_GROUP_DETAIL_SUCCESS,
  UPDATE_ERROR_GROUP_FAIL,
  UPDATE_ERROR_GROUP_START,
  UPDATE_ERROR_GROUP_SUCCESS,
  RESET_ERROR_GROUP_DETAIL_STATE,
} from '~/modules/qmsx/redux/actions/define-error-group'

const initialState = {
  isLoading: false,
  errorGroupList: [],
  errorGroupDetail: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function defineErrorGroup(state = initialState, action) {
  switch (action.type) {
    case SEARCH_ERROR_GROUP_START:
    case CREATE_ERROR_GROUP_START:
    case UPDATE_ERROR_GROUP_START:
    case DELETE_ERROR_GROUP_START:
    case GET_ERROR_GROUP_DETAIL_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_ERROR_GROUP_SUCCESS:
      return {
        ...state,
        errorGroupList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case SEARCH_ERROR_GROUP_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case GET_ERROR_GROUP_DETAIL_SUCCESS:
      return {
        ...state,
        errorGroupDetail: action.payload,
        isLoading: false,
      }
    case GET_ERROR_GROUP_DETAIL_FAIL:
      return {
        ...state,
        errorGroupDetail: {},
        isLoading: false,
      }
    case CREATE_ERROR_GROUP_SUCCESS:
    case CREATE_ERROR_GROUP_FAIL:
    case UPDATE_ERROR_GROUP_SUCCESS:
    case UPDATE_ERROR_GROUP_FAIL:
    case DELETE_ERROR_GROUP_SUCCESS:
    case DELETE_ERROR_GROUP_FAIL:
      return {
        ...state,
        isLoading: false,
        responseUploadFile: null,
      }
    case RESET_ERROR_GROUP_DETAIL_STATE:
      return {
        ...state,
        errorGroupDetail: {},
      }
    default:
      return state
  }
}
