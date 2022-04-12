import {
  CONFIRM_CHECK_LIST_FAIL,
  CONFIRM_CHECK_LIST_START,
  CONFIRM_CHECK_LIST_SUCCESS,
  CREATE_CHECK_LIST_FAIL,
  CREATE_CHECK_LIST_START,
  CREATE_CHECK_LIST_SUCCESS,
  DELETE_CHECK_LIST_FAIL,
  DELETE_CHECK_LIST_START,
  DELETE_CHECK_LIST_SUCCESS,
  GET_CHECK_LIST_DETAIL_FAIL,
  GET_CHECK_LIST_DETAIL_START,
  GET_CHECK_LIST_DETAIL_SUCCESS,
  SEARCH_CHECK_LIST_FAIL,
  SEARCH_CHECK_LIST_START,
  SEARCH_CHECK_LIST_SUCCESS,
  UPDATE_CHECK_LIST_FAIL,
  UPDATE_CHECK_LIST_START,
  UPDATE_CHECK_LIST_SUCCESS,
  RESET_CHECK_LIST_DETAIL_STATE,
} from '~/modules/qmsx/redux/actions/define-check-list'

const initialState = {
  isLoading: false,
  checkListList: [],
  checkListDetail: {},
  total: null,
}

/**
 * Reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function defineCheckList(state = initialState, action) {
  switch (action.type) {
    case SEARCH_CHECK_LIST_START:
    case CREATE_CHECK_LIST_START:
    case UPDATE_CHECK_LIST_START:
    case DELETE_CHECK_LIST_START:
    case GET_CHECK_LIST_DETAIL_START:
    case CONFIRM_CHECK_LIST_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_CHECK_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        checkListList: action?.payload?.list,
        total: action?.payload?.total,
      }
    case SEARCH_CHECK_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case DELETE_CHECK_LIST_SUCCESS:
    case DELETE_CHECK_LIST_FAIL:
    case CONFIRM_CHECK_LIST_FAIL:
    case CONFIRM_CHECK_LIST_SUCCESS:
    case CREATE_CHECK_LIST_FAIL:
    case CREATE_CHECK_LIST_SUCCESS:
    case UPDATE_CHECK_LIST_SUCCESS:
    case UPDATE_CHECK_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case GET_CHECK_LIST_DETAIL_SUCCESS:
      return {
        ...state,
        checkListDetail: action?.payload,
        isLoading: false,
      }
    case GET_CHECK_LIST_DETAIL_FAIL:
      return {
        ...state,
        checkListDetail: {},
        isLoading: false,
      }
    case RESET_CHECK_LIST_DETAIL_STATE:
      return {
        ...state,
        checkListDetail: {},
      }
    default:
      return state
  }
}
