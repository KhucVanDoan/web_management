import {
  SEARCH_WARNING_LIST_START,
  SEARCH_WARNING_LIST_SUCCESS,
  SEARCH_WARNING_LIST_FAIL,
  GET_WARNING_LIST_START,
  GET_WARNING_LIST_SUCCESS,
  GET_WARNING_LIST_FAIL,
  CONFIRM_WARNING_FAIL,
  CONFIRM_WARNING_START,
  CONFIRM_WARNING_SUCCESS,
  REJECT_WARNING_FAIL,
  REJECT_WARNING_START,
  REJECT_WARNING_SUCCESS,
  GET_WARNING_DETAIL_START,
  GET_WARNING_DETAIL_SUCCESS,
  GET_WARNING_DETAIL_FAIL,
} from '../actions/warning-system'

const initialState = {
  isLoading: false,
  warningLists: [],
  warningDetail: {},
  meta: {},
}

export default function warningSystem(state = initialState, action) {
  switch (action.type) {
    case GET_WARNING_LIST_START:
    case CONFIRM_WARNING_START:
    case REJECT_WARNING_START:
    case GET_WARNING_DETAIL_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_WARNING_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        warningLists: action?.payload?.items,
        meta: action?.payload?.meta,
      }
    case GET_WARNING_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        warningDetail: action?.payload,
      }
    case GET_WARNING_DETAIL_FAIL:
    case GET_WARNING_LIST_FAIL:
    case CONFIRM_WARNING_SUCCESS:
    case REJECT_WARNING_SUCCESS:
    case REJECT_WARNING_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case SEARCH_WARNING_LIST_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_WARNING_LIST_SUCCESS:
      return {
        ...state,
        warningList: action?.payload?.items,
        total: action?.payload?.meta?.total,
        isLoading: false,
      }
    case SEARCH_WARNING_LIST_FAIL:
    case CONFIRM_WARNING_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}
