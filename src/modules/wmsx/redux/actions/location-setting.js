export const WMSX_SEARCH_LOCATION_SETTING_START =
  'WMSX_SEARCH_LOCATION_SETTING_START'
export const WMSX_SEARCH_LOCATION_SETTING_SUCCESS =
  'WMSX_SEARCH_LOCATION_SETTING_SUCCESS'
export const WMSX_SEARCH_LOCATION_SETTING_FAILED =
  'WMSX_SEARCH_LOCATION_SETTING_FAILED'

export const WMSX_CREATE_LOCATION_SETTING_START =
  'WMSX_CREATE_LOCATION_SETTING_START'
export const WMSX_CREATE_LOCATION_SETTING_SUCCESS =
  'WMSX_CREATE_LOCATION_SETTING_SUCCESS'
export const WMSX_CREATE_LOCATION_SETTING_FAILED =
  'WMSX_CREATE_LOCATION_SETTING_FAILED'

export const WMSX_UPDATE_LOCATION_SETTING_START =
  'WMSX_UPDATE_LOCATION_SETTING_START'
export const WMSX_UPDATE_LOCATION_SETTING_SUCCESS =
  'WMSX_UPDATE_LOCATION_SETTING_SUCCESS'
export const WMSX_UPDATE_LOCATION_SETTING_FAILED =
  'WMSX_UPDATE_LOCATION_SETTING_FAILED'

export const WMSX_DELETE_LOCATION_SETTING_START =
  'WMSX_DELETE_LOCATION_SETTING_START'
export const WMSX_DELETE_LOCATION_SETTING_SUCCESS =
  'WMSX_DELETE_LOCATION_SETTING_SUCCESS'
export const WMSX_DELETE_LOCATION_SETTING_FAILED =
  'WMSX_DELETE_LOCATION_SETTING_FAILED'

export const WMSX_GET_LOCATION_SETTING_DETAILS_START =
  'WMSX_GET_LOCATION_SETTING_DETAILS_START'
export const WMSX_GET_LOCATION_SETTING_DETAILS_SUCCESS =
  'WMSX_GET_LOCATION_SETTING_DETAILS_SUCCESS'
export const WMSX_GET_LOCATION_SETTING_DETAILS_FAILED =
  'WMSX_GET_LOCATION_SETTING_DETAILS_FAILED'

export const WMSX_RESET_LOCATION_SETTING_STATE =
  'WMSX_RESET_LOCATION_SETTING_STATE'

/**
 * Search user
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchLocationSetting(payload, onSuccess, onError) {
  return {
    type: WMSX_SEARCH_LOCATION_SETTING_START,
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
export function searchLocationSettingSuccess(payload) {
  return {
    type: WMSX_SEARCH_LOCATION_SETTING_SUCCESS,
    payload: payload,
  }
}

/**
 * Search user failed action
 * @returns {object}
 */
export function searchLocationSettingFailed() {
  return {
    type: WMSX_SEARCH_LOCATION_SETTING_FAILED,
  }
}

/**
 * Create user
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createLocationSetting(payload, onSuccess, onError) {
  return {
    type: WMSX_CREATE_LOCATION_SETTING_START,
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
export function createLocationSettingSuccess(payload) {
  return {
    type: WMSX_CREATE_LOCATION_SETTING_SUCCESS,
    payload: payload,
  }
}

/**
 * Create user failed action
 * @returns {object}
 */
export function createLocationSettingFailed() {
  return {
    type: WMSX_CREATE_LOCATION_SETTING_FAILED,
  }
}

/**
 * Update user
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateLocationSetting(payload, onSuccess, onError) {
  return {
    type: WMSX_UPDATE_LOCATION_SETTING_START,
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
export function updateLocationSettingSuccess(payload) {
  return {
    type: WMSX_UPDATE_LOCATION_SETTING_SUCCESS,
    payload: payload,
  }
}

/**
 * Update user failed action
 * @returns {object}
 */
export function updateLocationSettingFailed() {
  return {
    type: WMSX_UPDATE_LOCATION_SETTING_FAILED,
  }
}
/**
 * Delete user
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteLocationSetting(payload, onSuccess, onError) {
  return {
    type: WMSX_DELETE_LOCATION_SETTING_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete user success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteLocationSettingSuccess(payload) {
  return {
    type: WMSX_DELETE_LOCATION_SETTING_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete user failed action
 * @returns {object}
 */
export function deleteLocationSettingFailed() {
  return {
    type: WMSX_DELETE_LOCATION_SETTING_FAILED,
  }
}

/**
 * Get user details
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getLocationSettingDetailsById(payload, onSuccess, onError) {
  return {
    type: WMSX_GET_LOCATION_SETTING_DETAILS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get user details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getLocationSettingDetailsByIdSuccess(payload) {
  return {
    type: WMSX_GET_LOCATION_SETTING_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get user details by id failed action
 * @returns {object}
 */
export function getLocationSettingDetailsByIdFailed() {
  return {
    type: WMSX_GET_LOCATION_SETTING_DETAILS_FAILED,
  }
}

export function resetLocationSettingState() {
  return {
    type: WMSX_RESET_LOCATION_SETTING_STATE,
  }
}

export default {
  createLocationSetting,
  createLocationSettingFailed,
  createLocationSettingSuccess,
  deleteLocationSetting,
  deleteLocationSettingFailed,
  deleteLocationSettingSuccess,
  updateLocationSetting,
  updateLocationSettingFailed,
  updateLocationSettingSuccess,
  searchLocationSetting,
  searchLocationSettingFailed,
  searchLocationSettingSuccess,
  getLocationSettingDetailsById,
  getLocationSettingDetailsByIdFailed,
  getLocationSettingDetailsByIdSuccess,
  resetLocationSettingState,
}
