export const SEARCH_USERS_START = 'MESX_SEARCH_USERS_START'
export const SEARCH_USERS_SUCCESS = 'MESX_SEARCH_USERS_SUCCESS'
export const SEARCH_USERS_FAILED = 'MESX_SEARCH_USERS_FAILED'

export const CREATE_USER_START = 'MESX_CREATE_USER_START'
export const CREATE_USER_SUCCESS = 'MESX_CREATE_USER_SUCCESS'
export const CREATE_USER_FAILED = 'MESX_CREATE_USER_FAILED'

export const UPDATE_USER_START = 'MESX_UPDATE_USER_START'
export const UPDATE_USER_SUCCESS = 'MESX_UPDATE_USER_SUCCESS'
export const UPDATE_USER_FAILED = 'MESX_UPDATE_USER_FAILED'

export const DELETE_USER_START = 'MESX_DELETE_USER_START'
export const DELETE_USER_SUCCESS = 'MESX_DELETE_USER_SUCCESS'
export const DELETE_USER_FAILED = 'MESX_DELETE_USER_FAILED'

export const GET_USER_DETAILS_START = 'MESX_GET_USER_DETAILS_START'
export const GET_USER_DETAILS_SUCCESS = 'MESX_GET_USER_DETAILS_SUCCESS'
export const GET_USER_DETAILS_FAILED = 'MESX_GET_USER_DETAILS_FAILED'

export const GENERATE_OTP_START = 'MESX_GENERATE_OTP_START'
export const GENERATE_OTP_SUCCESS = 'MESX_GENERATE_OTP_SUCCESS'
export const GENERATE_OTP_FAILED = 'MESX_GENERATE_OTP_FAILED'

export const VERIFY_OTP_START = 'MESX_VERIFY_OTP_START'
export const VERIFY_OTP_SUCCESS = 'MESX_VERIFY_OTP_SUCCESS'
export const VERIFY_OTP_FAILED = 'MESX_VERIFY_OTP_FAILED'

export const RESET_PASSWORD_START = 'MESX_RESET_PASSWORD_START'
export const RESET_PASSWORD_SUCCESS = 'MESX_RESET_PASSWORD_SUCCESS'
export const RESET_PASSWORD_FAILED = 'MESX_RESET_PASSWORD_FAILED'

export const RESET_USER_DETAILS_STATE = 'MESX_RESET_USER_DETAILS_STATE'
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
 * Search user failed action
 * @returns {object}
 */
export function searchUsersFailed() {
  return {
    type: SEARCH_USERS_FAILED,
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
 * Create user failed action
 * @returns {object}
 */
export function createUserFailed() {
  return {
    type: CREATE_USER_FAILED,
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
 * Update user failed action
 * @returns {object}
 */
export function updateUserFailed() {
  return {
    type: UPDATE_USER_FAILED,
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
 * Delete user failed action
 * @returns {object}
 */
export function deleteUserFailed() {
  return {
    type: DELETE_USER_FAILED,
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
 * Get user details by id failed action
 * @returns {object}
 */
export function getUserDetailsByIdFailed() {
  return {
    type: GET_USER_DETAILS_FAILED,
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
 * generate otp failed action
 * @returns {object}
 */
export function generateOTPFailed() {
  return {
    type: GENERATE_OTP_FAILED,
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
 * verify otp failed action
 * @returns {object}
 */
export function verifyOTPFailed() {
  return {
    type: VERIFY_OTP_FAILED,
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
 * reset password failed action
 * @returns {object}
 */
export function resetPasswordFailed() {
  return {
    type: RESET_PASSWORD_FAILED,
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
  searchUsersFailed,
  createUser,
  createUserSuccess,
  createUserFailed,
  updateUser,
  updateUserSuccess,
  updateUserFailed,
  deleteUser,
  deleteUserSuccess,
  deleteUserFailed,
  getUserDetailsById,
  getUserDetailsByIdSuccess,
  getUserDetailsByIdFailed,
  generateOTP,
  generateOTPSuccess,
  generateOTPFailed,
  verifyOTP,
  verifyOTPSuccess,
  verifyOTPFailed,
  resetPassword,
  resetPasswordSuccess,
  resetPasswordFailed,
  resetUserDetailsState,
}
