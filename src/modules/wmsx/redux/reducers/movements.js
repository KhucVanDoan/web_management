import {
  GET_MOVEMENT_DETAILS_FAILED,
  GET_MOVEMENT_DETAILS_START,
  GET_MOVEMENT_DETAILS_SUCCESS,
  SEARCH_MOVEMENTS_FAILED,
  SEARCH_MOVEMENTS_START,
  SEARCH_MOVEMENTS_SUCCESS,
  RESET_MOVEMENT_DETAILS_STATE,
} from '~/modules/wmsx/redux/actions/movements'

const initialState = {
  isLoading: false,
  movementList: [],
  movementDetail: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function movementManagement(state = initialState, action) {
  switch (action.type) {
    case SEARCH_MOVEMENTS_START:
    case GET_MOVEMENT_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_MOVEMENTS_SUCCESS:
      return {
        ...state,
        movementList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case GET_MOVEMENT_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        movementDetail: action.payload,
      }
    case GET_MOVEMENT_DETAILS_FAILED:
      return {
        ...state,
        isLoading: false,
        movementDetail: {},
      }
    case SEARCH_MOVEMENTS_FAILED:
      return {
        ...state,
        movementList: [],
        isLoading: false,
        total: 0,
      }
    case RESET_MOVEMENT_DETAILS_STATE:
      return {
        ...state,
        movementDetail: {},
      }
    default:
      return state
  }
}
