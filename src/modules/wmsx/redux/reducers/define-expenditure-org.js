import {
  CREATE_EXPENDITURE_ORG_FAILED,
  CREATE_EXPENDITURE_ORG_START,
  CREATE_EXPENDITURE_ORG_SUCCESS,
  DELETE_EXPENDITURE_ORG_FAILED,
  DELETE_EXPENDITURE_ORG_START,
  DELETE_EXPENDITURE_ORG_SUCCESS,
  GET_EXPENDITURE_ORG_DETAILS_FAILED,
  GET_EXPENDITURE_ORG_DETAILS_START,
  GET_EXPENDITURE_ORG_DETAILS_SUCCESS,
  SEARCH_EXPENDITURE_ORG_FAILED,
  SEARCH_EXPENDITURE_ORG_START,
  SEARCH_EXPENDITURE_ORG_SUCCESS,
  UPDATE_EXPENDITURE_ORG_FAILED,
  UPDATE_EXPENDITURE_ORG_START,
  UPDATE_EXPENDITURE_ORG_SUCCESS,
  CONFIRM_EXPENDITURE_ORG_FAILED,
  CONFIRM_EXPENDITURE_ORG_START,
  CONFIRM_EXPENDITURE_ORG_SUCCESS,
  REJECT_EXPENDITURE_ORG_FAILED,
  REJECT_EXPENDITURE_ORG_START,
  REJECT_EXPENDITURE_ORG_SUCCESS,
  RESET_EXPENDITURE_ORG_DETAILS_STATE,
} from '~/modules/wmsx/redux/actions/define-expenditure-org'

const initialState = {
  isLoading: false,
  expenditureOrgList: [],
  expenditureOrgDetails: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function defineExpenditureOrg(state = initialState, action) {
  switch (action.type) {
    case SEARCH_EXPENDITURE_ORG_START:
    case CREATE_EXPENDITURE_ORG_START:
    case UPDATE_EXPENDITURE_ORG_START:
    case DELETE_EXPENDITURE_ORG_START:
    case CONFIRM_EXPENDITURE_ORG_START:
    case REJECT_EXPENDITURE_ORG_START:
    case GET_EXPENDITURE_ORG_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_EXPENDITURE_ORG_SUCCESS:
      return {
        ...state,
        expenditureOrgList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }

    case SEARCH_EXPENDITURE_ORG_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case REJECT_EXPENDITURE_ORG_FAILED:
    case REJECT_EXPENDITURE_ORG_SUCCESS:
    case CONFIRM_EXPENDITURE_ORG_FAILED:
    case CONFIRM_EXPENDITURE_ORG_SUCCESS:
    case CREATE_EXPENDITURE_ORG_SUCCESS:
    case CREATE_EXPENDITURE_ORG_FAILED:
    case UPDATE_EXPENDITURE_ORG_SUCCESS:
    case UPDATE_EXPENDITURE_ORG_FAILED:
    case DELETE_EXPENDITURE_ORG_SUCCESS:
    case DELETE_EXPENDITURE_ORG_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_EXPENDITURE_ORG_DETAILS_SUCCESS:
      return {
        ...state,
        expenditureOrgDetails: action.payload,
        isLoading: false,
      }
    case GET_EXPENDITURE_ORG_DETAILS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case RESET_EXPENDITURE_ORG_DETAILS_STATE:
      return {
        ...state,
        expenditureOrgDetails: {},
      }
    default:
      return state
  }
}
