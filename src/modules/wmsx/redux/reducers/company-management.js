import {
  GET_COMPANIES_FAILED,
  GET_COMPANIES_START,
  GET_COMPANIES_SUCCESS,
  SEARCH_COMPANIES_FAILED,
  SEARCH_COMPANIES_START,
  SEARCH_COMPANIES_SUCCESS,
  CREATE_COMPANY_FAILED,
  CREATE_COMPANY_START,
  CREATE_COMPANY_SUCCESS,
  DELETE_COMPANY_FAILED,
  DELETE_COMPANY_START,
  DELETE_COMPANY_SUCCESS,
  GET_COMPANY_DETAILS_FAILED,
  GET_COMPANY_DETAILS_START,
  GET_COMPANY_DETAILS_SUCCESS,
  UPDATE_COMPANY_FAILED,
  UPDATE_COMPANY_START,
  UPDATE_COMPANY_SUCCESS,
  RESET_COMPANY_DETAILS_STATE,
} from '~/modules/wmsx/redux/actions/company-management'

const initialState = {
  isLoading: false,
  companyList: [],
  companyDetails: {},
  total: null,
}

export default function companyManagement(state = initialState, action) {
  switch (action.type) {
    case SEARCH_COMPANIES_START:
    case GET_COMPANIES_START:
    case CREATE_COMPANY_START:
    case UPDATE_COMPANY_START:
    case DELETE_COMPANY_START:
    case GET_COMPANY_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_COMPANIES_SUCCESS:
      return {
        ...state,
        companyList: action.payload.items,
        isLoading: false,
      }
    case GET_COMPANIES_FAILED:
      return {
        ...state,
        companyList: [],
        isLoading: false,
      }
    case SEARCH_COMPANIES_SUCCESS:
      return {
        ...state,
        companyList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case SEARCH_COMPANIES_FAILED:
      return {
        ...state,
        companyList: [],
        isLoading: false,
        total: 0,
      }
    case CREATE_COMPANY_SUCCESS:
    case CREATE_COMPANY_FAILED:
    case UPDATE_COMPANY_SUCCESS:
    case UPDATE_COMPANY_FAILED:
    case DELETE_COMPANY_SUCCESS:
    case DELETE_COMPANY_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_COMPANY_DETAILS_SUCCESS:
      return {
        ...state,
        companyDetails: action.payload,
        isLoading: false,
      }
    case GET_COMPANY_DETAILS_FAILED:
      return {
        ...state,
        companyDetails: {},
        isLoading: false,
      }
    case RESET_COMPANY_DETAILS_STATE:
      return {
        ...state,
        companyDetails: {},
      }
    default:
      return state
  }
}
