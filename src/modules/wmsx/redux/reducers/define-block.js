import {
  CREATE_BLOCK_FAILED,
  CREATE_BLOCK_START,
  CREATE_BLOCK_SUCCESS,
  DELETE_BLOCK_FAILED,
  DELETE_BLOCK_START,
  DELETE_BLOCK_SUCCESS,
  GET_BLOCK_DETAILS_FAILED,
  GET_BLOCK_DETAILS_START,
  GET_BLOCK_DETAILS_SUCCESS,
  SEARCH_BLOCKS_FAILED,
  SEARCH_BLOCKS_START,
  SEARCH_BLOCKS_SUCCESS,
  UPDATE_BLOCK_FAILED,
  UPDATE_BLOCK_START,
  UPDATE_BLOCK_SUCCESS,
  RESET_BLOCK_DETAILS_STATE,
  PRINT_QR_BLOCKS_FAILED,
  PRINT_QR_BLOCKS_START,
  PRINT_QR_BLOCKS_SUCCESS,
} from '~/modules/wmsx/redux/actions/define-block'

const initialState = {
  isLoading: false,
  blockList: [],
  blockDetails: {},
  total: 0,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function defineBlock(state = initialState, action) {
  switch (action.type) {
    case SEARCH_BLOCKS_START:
    case CREATE_BLOCK_START:
    case UPDATE_BLOCK_START:
    case DELETE_BLOCK_START:
    case GET_BLOCK_DETAILS_START:
    case PRINT_QR_BLOCKS_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_BLOCKS_SUCCESS:
      return {
        ...state,
        blockList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }

    case SEARCH_BLOCKS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case CREATE_BLOCK_SUCCESS:
    case CREATE_BLOCK_FAILED:
    case UPDATE_BLOCK_SUCCESS:
    case UPDATE_BLOCK_FAILED:
    case DELETE_BLOCK_SUCCESS:
    case DELETE_BLOCK_FAILED:
    case PRINT_QR_BLOCKS_SUCCESS:
    case PRINT_QR_BLOCKS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_BLOCK_DETAILS_SUCCESS:
      return {
        ...state,
        blockDetails: action.payload,
        isLoading: false,
      }
    case GET_BLOCK_DETAILS_FAILED:
      return {
        ...state,
        blockDetails: {},
        isLoading: false,
      }
    case RESET_BLOCK_DETAILS_STATE:
      return {
        ...state,
        blockDetails: {},
      }

    default:
      return state
  }
}
