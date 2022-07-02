import {
  GET_SUPPLIES_FAIL,
  GET_SUPPLIES_START,
  GET_SUPPLIES_SUCCESS,
  SEARCH_SUPPLIES_FAIL,
  SEARCH_SUPPLIES_START,
  SEARCH_SUPPLIES_SUCCESS,
  RESET_STATE_SUPPLIES,
} from '../actions/define-supplies'

const initialState = {
  suppliesList: [],
  suppliesDetail: {},
  total: null,
  isLoading: false,
}

export default function supplies(state = initialState, action) {
  switch (action?.type) {
    case SEARCH_SUPPLIES_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_SUPPLIES_SUCCESS:
      return {
        ...state,
        suppliesList: action?.payload?.items,
        total: action?.payload,
        isLoading: false,
      }
    case SEARCH_SUPPLIES_FAIL:
      return {
        ...state,
        suppliesList: [],
        isLoading: false,
      }
    case GET_SUPPLIES_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_SUPPLIES_SUCCESS:
      return {
        ...state,
        suppliesDetail: action?.payload,
        isLoading: false,
      }
    case GET_SUPPLIES_FAIL:
      return {
        ...state,
        suppliesDetail: {},
        isLoading: false,
      }
    case RESET_STATE_SUPPLIES:
      return {
        ...state,
        suppliesDetail: {},
      }
    default:
      return state
  }
}
