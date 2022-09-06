import {
  CREATE_RECEIPT_DEPARTMENT_FAILED,
  CREATE_RECEIPT_DEPARTMENT_START,
  CREATE_RECEIPT_DEPARTMENT_SUCCESS,
  DELETE_RECEIPT_DEPARTMENT_FAILED,
  DELETE_RECEIPT_DEPARTMENT_START,
  DELETE_RECEIPT_DEPARTMENT_SUCCESS,
  GET_RECEIPT_DEPARTMENT_DETAILS_FAILED,
  GET_RECEIPT_DEPARTMENT_DETAILS_START,
  GET_RECEIPT_DEPARTMENT_DETAILS_SUCCESS,
  SEARCH_RECEIPT_DEPARTMENT_FAILED,
  SEARCH_RECEIPT_DEPARTMENT_START,
  SEARCH_RECEIPT_DEPARTMENT_SUCCESS,
  UPDATE_RECEIPT_DEPARTMENT_FAILED,
  UPDATE_RECEIPT_DEPARTMENT_START,
  UPDATE_RECEIPT_DEPARTMENT_SUCCESS,
  CONFIRM_RECEIPT_DEPARTMENT_FAILED,
  CONFIRM_RECEIPT_DEPARTMENT_START,
  CONFIRM_RECEIPT_DEPARTMENT_SUCCESS,
  REJECT_RECEIPT_DEPARTMENT_FAILED,
  REJECT_RECEIPT_DEPARTMENT_START,
  REJECT_RECEIPT_DEPARTMENT_SUCCESS,
  RESET_RECEIPT_DEPARTMENT_DETAILS_STATE,
} from '~/modules/wmsx/redux/actions/receipt-department-management'

const initialState = {
  isLoading: false,
  receiptDepartmentList: [],
  receiptDepartmentDetails: {},
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function receiptDepartmentManagement(
  state = initialState,
  action,
) {
  switch (action.type) {
    case SEARCH_RECEIPT_DEPARTMENT_START:
    case CREATE_RECEIPT_DEPARTMENT_START:
    case UPDATE_RECEIPT_DEPARTMENT_START:
    case DELETE_RECEIPT_DEPARTMENT_START:
    case CONFIRM_RECEIPT_DEPARTMENT_START:
    case REJECT_RECEIPT_DEPARTMENT_START:
    case GET_RECEIPT_DEPARTMENT_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_RECEIPT_DEPARTMENT_SUCCESS:
      return {
        ...state,
        receiptDepartmentList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }

    case SEARCH_RECEIPT_DEPARTMENT_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case CONFIRM_RECEIPT_DEPARTMENT_FAILED:
    case CONFIRM_RECEIPT_DEPARTMENT_SUCCESS:
    case REJECT_RECEIPT_DEPARTMENT_FAILED:
    case REJECT_RECEIPT_DEPARTMENT_SUCCESS:
    case CREATE_RECEIPT_DEPARTMENT_SUCCESS:
    case CREATE_RECEIPT_DEPARTMENT_FAILED:
    case UPDATE_RECEIPT_DEPARTMENT_SUCCESS:
    case UPDATE_RECEIPT_DEPARTMENT_FAILED:
    case DELETE_RECEIPT_DEPARTMENT_SUCCESS:
    case DELETE_RECEIPT_DEPARTMENT_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_RECEIPT_DEPARTMENT_DETAILS_SUCCESS:
      return {
        ...state,
        receiptDepartmentDetails: action.payload,
        isLoading: false,
      }
    case GET_RECEIPT_DEPARTMENT_DETAILS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case RESET_RECEIPT_DEPARTMENT_DETAILS_STATE:
      return {
        ...state,
        receiptDepartmentDetails: {},
      }
    default:
      return state
  }
}
