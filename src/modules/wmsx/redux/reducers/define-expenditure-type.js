import {
  CREATE_EXPENDITURE_TYPE_FAILED,
  CREATE_EXPENDITURE_TYPE_START,
  CREATE_EXPENDITURE_TYPE_SUCCESS,
  DELETE_EXPENDITURE_TYPE_FAILED,
  DELETE_EXPENDITURE_TYPE_START,
  DELETE_EXPENDITURE_TYPE_SUCCESS,
  GET_EXPENDITURE_TYPE_DETAILS_FAILED,
  GET_EXPENDITURE_TYPE_DETAILS_START,
  GET_EXPENDITURE_TYPE_DETAILS_SUCCESS,
  SEARCH_EXPENDITURE_TYPE_FAILED,
  SEARCH_EXPENDITURE_TYPE_START,
  SEARCH_EXPENDITURE_TYPE_SUCCESS,
  UPDATE_EXPENDITURE_TYPE_FAILED,
  UPDATE_EXPENDITURE_TYPE_START,
  UPDATE_EXPENDITURE_TYPE_SUCCESS,
  CONFIRM_EXPENDITURE_TYPE_FAILED,
  CONFIRM_EXPENDITURE_TYPE_START,
  CONFIRM_EXPENDITURE_TYPE_SUCCESS,
  REJECT_EXPENDITURE_TYPE_FAILED,
  REJECT_EXPENDITURE_TYPE_START,
  REJECT_EXPENDITURE_TYPE_SUCCESS,
  RESET_EXPENDITURE_TYPE_DETAILS_STATE,
} from '~/modules/wmsx/redux/actions/define-expenditure-type'

const initialState = {
  isLoading: false,
  expenditureTypeList: [],
  expenditureTypeDetails: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function defineExpenditureType(state = initialState, action) {
  switch (action.type) {
    case SEARCH_EXPENDITURE_TYPE_START:
    case CREATE_EXPENDITURE_TYPE_START:
    case UPDATE_EXPENDITURE_TYPE_START:
    case DELETE_EXPENDITURE_TYPE_START:
    case CONFIRM_EXPENDITURE_TYPE_START:
    case REJECT_EXPENDITURE_TYPE_START:
    case GET_EXPENDITURE_TYPE_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_EXPENDITURE_TYPE_SUCCESS:
      return {
        ...state,
        expenditureTypeList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }

    case SEARCH_EXPENDITURE_TYPE_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case REJECT_EXPENDITURE_TYPE_FAILED:
    case REJECT_EXPENDITURE_TYPE_SUCCESS:
    case CONFIRM_EXPENDITURE_TYPE_FAILED:
    case CONFIRM_EXPENDITURE_TYPE_SUCCESS:
    case CREATE_EXPENDITURE_TYPE_SUCCESS:
    case CREATE_EXPENDITURE_TYPE_FAILED:
    case UPDATE_EXPENDITURE_TYPE_SUCCESS:
    case UPDATE_EXPENDITURE_TYPE_FAILED:
    case DELETE_EXPENDITURE_TYPE_SUCCESS:
    case DELETE_EXPENDITURE_TYPE_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_EXPENDITURE_TYPE_DETAILS_SUCCESS:
      return {
        ...state,
        expenditureTypeDetails: action.payload,
        isLoading: false,
      }
    case GET_EXPENDITURE_TYPE_DETAILS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case RESET_EXPENDITURE_TYPE_DETAILS_STATE:
      return {
        ...state,
        expenditureTypeDetails: {},
      }
    default:
      return state
  }
}
