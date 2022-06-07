export const UPDATE_COMPANY_CUSTOMER_SETTING_START =
  'UPDATE_COMPANY_CUSTOMER_SETTING_START'
export const UPDATE_COMPANY_CUSTOMER_SETTING_SUCCESS =
  'UPDATE_COMPANY_CUSTOMER_SETTING_SUCCESS'
export const UPDATE_COMPANY_CUSTOMER_SETTING_FAILED =
  'UPDATE_COMPANY_CUSTOMER_SETTING_FAILED'

export const GET_COMPANY_CUSTOMER_SETTING_DETAILS_START =
  'GET_COMPANY_CUSTOMER_SETTING_DETAILS_START'
export const GET_COMPANY_CUSTOMER_SETTING_DETAILS_SUCCESS =
  'GET_COMPANY_CUSTOMER_SETTING_DETAILS_SUCCESS'
export const GET_COMPANY_CUSTOMER_SETTING_DETAILS_FAILED =
  'GET_COMPANY_CUSTOMER_SETTING_DETAILS_FAILED'

export const RESET_COMPANY_CUSTOMER_SETTING_DETAILS_STATE =
  'RESET_COMPANY_CUSTOMER_SETTING_DETAILS_STATE'

/**
 * Update user permission
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateCompanyCustomerSetting(payload, onSuccess, onError) {
  return {
    type: UPDATE_COMPANY_CUSTOMER_SETTING_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Update user permission success action
 * @param {*} payload
 * @returns {object}
 */
export function updateCompanyCustomerSettingSuccess(payload) {
  return {
    type: UPDATE_COMPANY_CUSTOMER_SETTING_SUCCESS,
    payload: payload,
  }
}

/**
 * Update user permission failed action
 * @returns {object}
 */
export function updateCompanyCustomerSettingFailed() {
  return {
    type: UPDATE_COMPANY_CUSTOMER_SETTING_FAILED,
  }
}

export function getCompanyCustomerSettingDetails(payload, onSuccess, onError) {
  return {
    type: GET_COMPANY_CUSTOMER_SETTING_DETAILS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get user permission details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getCompanyCustomerSettingDetailsSuccess(payload) {
  return {
    type: GET_COMPANY_CUSTOMER_SETTING_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get user permission details by id failed action
 * @returns {object}
 */
export function getCompanyCustomerSettingDetailsFailed() {
  return {
    type: GET_COMPANY_CUSTOMER_SETTING_DETAILS_FAILED,
  }
}

export function resetCompanyCustomerSettingDetailsState() {
  return {
    type: RESET_COMPANY_CUSTOMER_SETTING_DETAILS_STATE,
  }
}

export default {
  updateCompanyCustomerSetting,
  updateCompanyCustomerSettingSuccess,
  updateCompanyCustomerSettingFailed,
  getCompanyCustomerSettingDetails,
  getCompanyCustomerSettingDetailsSuccess,
  getCompanyCustomerSettingDetailsFailed,
  resetCompanyCustomerSettingDetailsState,
}
