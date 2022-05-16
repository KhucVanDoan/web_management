export const SEARCH_USERS_START = 'QMSX_SEARCH_USERS_START'
export const SEARCH_USERS_SUCCESS = 'QMSX_SEARCH_USERS_SUCCESS'
export const SEARCH_USERS_FAIL = 'QMSX_SEARCH_USERS_FAIL'

export const CREATE_USER_START = 'QMSX_CREATE_USER_START'
export const CREATE_USER_SUCCESS = 'QMSX_CREATE_USER_SUCCESS'
export const CREATE_USER_FAIL = 'QMSX_CREATE_USER_FAIL'

export const UPDATE_USER_START = 'QMSX_UPDATE_USER_START'
export const UPDATE_USER_SUCCESS = 'QMSX_UPDATE_USER_SUCCESS'
export const UPDATE_USER_FAIL = 'QMSX_UPDATE_USER_FAIL'

export const DELETE_USER_START = 'QMSX_DELETE_USER_START'
export const DELETE_USER_SUCCESS = 'QMSX_DELETE_USER_SUCCESS'
export const DELETE_USER_FAIL = 'QMSX_DELETE_USER_FAIL'

export const GET_USER_DETAILS_START = 'QMSX_GET_USER_DETAILS_START'
export const GET_USER_DETAILS_SUCCESS = 'QMSX_GET_USER_DETAILS_SUCCESS'
export const GET_USER_DETAILS_FAIL = 'QMSX_GET_USER_DETAILS_FAIL'

export const GENERATE_OTP_START = 'QMSX_GENERATE_OTP_START'
export const GENERATE_OTP_SUCCESS = 'QMSX_GENERATE_OTP_SUCCESS'
export const GENERATE_OTP_FAIL = 'QMSX_GENERATE_OTP_FAIL'

export const VERIFY_OTP_START = 'QMSX_VERIFY_OTP_START'
export const VERIFY_OTP_SUCCESS = 'QMSX_VERIFY_OTP_SUCCESS'
export const VERIFY_OTP_FAIL = 'QMSX_VERIFY_OTP_FAIL'

export const RESET_PASSWORD_START = 'QMSX_RESET_PASSWORD_START'
export const RESET_PASSWORD_SUCCESS = 'QMSX_RESET_PASSWORD_SUCCESS'
export const RESET_PASSWORD_FAIL = 'QMSX_RESET_PASSWORD_FAIL'

export const RESET_USER_DETAILS_STATE = 'QMSX_RESET_USER_DETAILS_STATE'
/**
 * Search user
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchUsers(payload, onSuccess, onError) {
  return {
    type: SEARCH_USERS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search user success action
 * @param {*} payload
 * @returns {object}
 */
export function searchUsersSuccess(payload) {
  return {
    type: SEARCH_USERS_SUCCESS,
    payload: payload,
  }
}

/**
 * Search user fail action
 * @returns {object}
 */
export function searchUsersFail() {
  return {
    type: SEARCH_USERS_FAIL,
  }
}

/**
 * Create user
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createUser(payload, onSuccess, onError) {
  return {
    type: CREATE_USER_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Create user success action
 * @param {*} payload
 * @returns {object}
 */
export function createUserSuccess(payload) {
  return {
    type: CREATE_USER_SUCCESS,
    payload: payload,
  }
}

/**
 * Create user fail action
 * @returns {object}
 */
export function createUserFail() {
  return {
    type: CREATE_USER_FAIL,
  }
}

/**
 * Update user
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateUser(payload, onSuccess, onError) {
  return {
    type: UPDATE_USER_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Update user success action
 * @param {*} payload
 * @returns {object}
 */
export function updateUserSuccess(payload) {
  return {
    type: UPDATE_USER_SUCCESS,
    payload: payload,
  }
}

/**
 * Update user fail action
 * @returns {object}
 */
export function updateUserFail() {
  return {
    type: UPDATE_USER_FAIL,
  }
}
/**
 * Delete user
 * @param {int} userId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteUser(userId, onSuccess, onError) {
  return {
    type: DELETE_USER_START,
    payload: userId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete user success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteUserSuccess(payload) {
  return {
    type: DELETE_USER_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete user fail action
 * @returns {object}
 */
export function deleteUserFail() {
  return {
    type: DELETE_USER_FAIL,
  }
}

/**
 * Get user details
 * @param {int} userId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getUserDetailsById(userId, onSuccess, onError) {
  return {
    type: GET_USER_DETAILS_START,
    payload: userId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get user details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getUserDetailsByIdSuccess(payload) {
  return {
    type: GET_USER_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get user details by id fail action
 * @returns {object}
 */
export function getUserDetailsByIdFail() {
  return {
    type: GET_USER_DETAILS_FAIL,
  }
}
/**
 * generate otp
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function generateOTP(payload, onSuccess, onError) {
  return {
    type: GENERATE_OTP_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * generate otp success action
 * @param {*} payload
 * @returns {object}
 */
export function generateOTPSuccess(payload) {
  return {
    type: GENERATE_OTP_SUCCESS,
    payload: payload,
  }
}

/**
 * generate otp fail action
 * @returns {object}
 */
export function generateOTPFail() {
  return {
    type: GENERATE_OTP_FAIL,
  }
}
/**
 * verify otp
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function verifyOTP(payload, onSuccess, onError) {
  return {
    type: VERIFY_OTP_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * verify otp success action
 * @param {*} payload
 * @returns {object}
 */
export function verifyOTPSuccess(payload) {
  return {
    type: VERIFY_OTP_SUCCESS,
    payload: payload,
  }
}

/**
 * verify otp fail action
 * @returns {object}
 */
export function verifyOTPFail() {
  return {
    type: VERIFY_OTP_FAIL,
  }
}
/**
 * reset password
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function resetPassword(payload, onSuccess, onError) {
  return {
    type: RESET_PASSWORD_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * reset password success action
 * @param {*} payload
 * @returns {object}
 */
export function resetPasswordSuccess(payload) {
  return {
    type: RESET_PASSWORD_SUCCESS,
    payload: payload,
  }
}

/**
 * reset password fail action
 * @returns {object}
 */
export function resetPasswordFail() {
  return {
    type: RESET_PASSWORD_FAIL,
  }
}

export function resetUserDetailsState() {
  return {
    type: RESET_USER_DETAILS_STATE,
  }
}

export default {
  searchUsers,
  searchUsersSuccess,
  searchUsersFail,
  createUser,
  createUserSuccess,
  createUserFail,
  updateUser,
  updateUserSuccess,
  updateUserFail,
  deleteUser,
  deleteUserSuccess,
  deleteUserFail,
  getUserDetailsById,
  getUserDetailsByIdSuccess,
  getUserDetailsByIdFail,
  generateOTP,
  generateOTPSuccess,
  generateOTPFail,
  verifyOTP,
  verifyOTPSuccess,
  verifyOTPFail,
  resetPassword,
  resetPasswordSuccess,
  resetPasswordFail,
  resetUserDetailsState,
}
