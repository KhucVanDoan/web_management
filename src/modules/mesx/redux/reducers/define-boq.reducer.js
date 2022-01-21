import {
  CONFIRM_BOQ_FAILED,
  CONFIRM_BOQ_START,
  CONFIRM_BOQ_SUCCESS,
  CREATE_BOQ_FAILED,
  CREATE_BOQ_START,
  CREATE_BOQ_SUCCESS,
  DELETE_BOQ_FAILED,
  DELETE_BOQ_START,
  DELETE_BOQ_SUCCESS,
  GET_BOQ_DETAILS_FAILED,
  GET_BOQ_DETAILS_START,
  GET_BOQ_DETAILS_SUCCESS,
  REJECT_BOQ_FAILED,
  REJECT_BOQ_START,
  REJECT_BOQ_SUCCESS,
  SEARCH_BOQ_FAILED,
  SEARCH_BOQ_START,
  SEARCH_BOQ_SUCCESS,
  UPDATE_BOQ_FAILED,
  UPDATE_BOQ_START,
  UPDATE_BOQ_SUCCESS,
} from 'modules/mesx/redux/actions/define-boq.action'

const initialState = {
  isLoading: false,
  boqList: [],
  boqDetails: {},
  total: null,
}

export default function defineBOQ(state = initialState, action) {
  switch (action.type) {
    case SEARCH_BOQ_START:
    case CREATE_BOQ_START:
    case UPDATE_BOQ_START:
    case DELETE_BOQ_START:
    case GET_BOQ_DETAILS_START:
    case CONFIRM_BOQ_START:
    case REJECT_BOQ_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_BOQ_SUCCESS:
      return {
        ...state,
        boqList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case SEARCH_BOQ_FAILED:
      return {
        ...state,
        boqList: [],
        isLoading: false,
        total: 0,
      }
    case CONFIRM_BOQ_FAILED:
    case CONFIRM_BOQ_SUCCESS:
    case REJECT_BOQ_FAILED:
    case REJECT_BOQ_SUCCESS:
    case CREATE_BOQ_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case CREATE_BOQ_SUCCESS:
    case UPDATE_BOQ_SUCCESS:
    case UPDATE_BOQ_FAILED:
    case DELETE_BOQ_SUCCESS:
    case DELETE_BOQ_FAILED:
      return {
        ...state,
        isLoading: true,
      }
    case GET_BOQ_DETAILS_SUCCESS:
      return {
        ...state,
        boqDetails: action.payload,
        isLoading: false,
      }
    case GET_BOQ_DETAILS_FAILED:
      return {
        ...state,
        boqDetails: {},
        isLoading: false,
      }
    default:
      return state
  }
}
