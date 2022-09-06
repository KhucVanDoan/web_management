import {
  CREATE_ASSEMBLY_FAILED,
  CREATE_ASSEMBLY_START,
  CREATE_ASSEMBLY_SUCCESS,
  DELETE_ASSEMBLY_FAILED,
  DELETE_ASSEMBLY_START,
  DELETE_ASSEMBLY_SUCCESS,
  GET_ASSEMBLY_DETAILS_FAILED,
  GET_ASSEMBLY_DETAILS_START,
  GET_ASSEMBLY_DETAILS_SUCCESS,
  SEARCH_ASSEMBLY_FAILED,
  SEARCH_ASSEMBLY_START,
  SEARCH_ASSEMBLY_SUCCESS,
  UPDATE_ASSEMBLY_FAILED,
  UPDATE_ASSEMBLY_START,
  UPDATE_ASSEMBLY_SUCCESS,
  CONFIRM_ASSEMBLY_FAILED,
  CONFIRM_ASSEMBLY_START,
  CONFIRM_ASSEMBLY_SUCCESS,
  REJECT_ASSEMBLY_FAILED,
  REJECT_ASSEMBLY_START,
  REJECT_ASSEMBLY_SUCCESS,
  RESET_ASSEMBLY_DETAILS_STATE,
} from '~/modules/wmsx/redux/actions/define-assembly'

const initialState = {
  isLoading: false,
  assemblyList: [],
  assemblyDetails: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function defineAssembly(state = initialState, action) {
  switch (action.type) {
    case SEARCH_ASSEMBLY_START:
    case CREATE_ASSEMBLY_START:
    case UPDATE_ASSEMBLY_START:
    case DELETE_ASSEMBLY_START:
    case CONFIRM_ASSEMBLY_START:
    case REJECT_ASSEMBLY_START:
    case GET_ASSEMBLY_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_ASSEMBLY_SUCCESS:
      return {
        ...state,
        assemblyList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }

    case SEARCH_ASSEMBLY_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case CONFIRM_ASSEMBLY_FAILED:
    case CONFIRM_ASSEMBLY_SUCCESS:
    case REJECT_ASSEMBLY_FAILED:
    case REJECT_ASSEMBLY_SUCCESS:
    case CREATE_ASSEMBLY_SUCCESS:
    case CREATE_ASSEMBLY_FAILED:
    case UPDATE_ASSEMBLY_SUCCESS:
    case UPDATE_ASSEMBLY_FAILED:
    case DELETE_ASSEMBLY_SUCCESS:
    case DELETE_ASSEMBLY_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_ASSEMBLY_DETAILS_SUCCESS:
      return {
        ...state,
        assemblyDetails: action.payload,
        isLoading: false,
      }
    case GET_ASSEMBLY_DETAILS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case RESET_ASSEMBLY_DETAILS_STATE:
      return {
        ...state,
        assemblyDetails: {},
      }
    default:
      return state
  }
}
