import {
  UPDATE_COMPANY_CUSTOMER_SETTING_FAILED,
  UPDATE_COMPANY_CUSTOMER_SETTING_START,
  UPDATE_COMPANY_CUSTOMER_SETTING_SUCCESS,
  GET_COMPANY_CUSTOMER_SETTING_DETAILS_FAILED,
  GET_COMPANY_CUSTOMER_SETTING_DETAILS_START,
  GET_COMPANY_CUSTOMER_SETTING_DETAILS_SUCCESS,
  RESET_COMPANY_CUSTOMER_SETTING_DETAILS_STATE,
} from '~/modules/configuration/redux/actions/company-customer-setting'

const initialState = {
  isLoading: false,
  companyCustomerSettingDetail: [],
}

/**
 * reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function userPermission(state = initialState, action) {
  switch (action.type) {
    case GET_COMPANY_CUSTOMER_SETTING_DETAILS_START:
    case UPDATE_COMPANY_CUSTOMER_SETTING_START:
      return {
        ...state,
        isLoading: false,
      }
    case GET_COMPANY_CUSTOMER_SETTING_DETAILS_SUCCESS:
      return {
        ...state,
        companyCustomerSettingDetail: action.payload,
        isLoading: false,
      }
    case GET_COMPANY_CUSTOMER_SETTING_DETAILS_FAILED:
    case UPDATE_COMPANY_CUSTOMER_SETTING_FAILED:
      return {
        ...state,
        companyCustomerSettingDetail: [],
        isLoading: false,
      }
    case UPDATE_COMPANY_CUSTOMER_SETTING_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case RESET_COMPANY_CUSTOMER_SETTING_DETAILS_STATE:
      return {
        ...state,
        companyCustomerSettingDetail: [],
      }
    default:
      return state
  }
}
