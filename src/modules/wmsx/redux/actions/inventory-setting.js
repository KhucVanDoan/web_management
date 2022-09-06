export const GET_INVENTORY_SETTING_START = 'WMSX_GET_INVENTORY_SETTING_START'
export const GET_INVENTORY_SETTING_SUCCESS =
  'WMSX_GET_INVENTORY_SETTING_SUCCESS'
export const GET_INVENTORY_SETTING_FAILED = 'WMSX_GET_INVENTORY_SETTING_FAILED'

export const SEARCH_INVENTORY_SETTING_START =
  'WMSX_SEARCH_INVENTORY_SETTING_START'
export const SEARCH_INVENTORY_SETTING_SUCCESS =
  'WMSX_SEARCH_INVENTORY_SETTING_SUCCESS'
export const SEARCH_INVENTORY_SETTING_FAILED =
  'WMSX_SEARCH_INVENTORY_SETTING_FAILED'

export const CREATE_INVENTORY_SETTING_START =
  'WMSX_CREATE_INVENTORY_SETTING_START'
export const CREATE_INVENTORY_SETTING_SUCCESS =
  'WMSX_CREATE_INVENTORY_SETTING_SUCCESS'
export const CREATE_INVENTORY_SETTING_FAILED =
  'WMSX_CREATE_INVENTORY_SETTING_FAILED'

export const UPDATE_INVENTORY_SETTING_START =
  'WMSX_UPDATE_INVENTORY_SETTING_START'
export const UPDATE_INVENTORY_SETTING_SUCCESS =
  'WMSX_UPDATE_INVENTORY_SETTING_SUCCESS'
export const UPDATE_INVENTORY_SETTING_FAILED =
  'WMSX_UPDATE_INVENTORY_SETTING_FAILED'

export const DELETE_INVENTORY_SETTING_START =
  'WMSX_DELETE_INVENTORY_SETTING_START'
export const DELETE_INVENTORY_SETTING_SUCCESS =
  'WMSX_DELETE_INVENTORY_SETTING_SUCCESS'
export const DELETE_INVENTORY_SETTING_FAILED =
  'WMSX_DELETE_INVENTORY_SETTING_FAILED'

export const RESET_INVENTORY_SETTING_STATE =
  'WMSX_RESET_INVENTORY_SETTING_STATE'

/**
 * Search user
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchInventorySetting(payload, onSuccess, onError) {
  return {
    type: SEARCH_INVENTORY_SETTING_START,
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
export function searchInventorySettingSuccess(payload) {
  return {
    type: SEARCH_INVENTORY_SETTING_SUCCESS,
    payload: payload,
  }
}

/**
 * Search user failed action
 * @returns {object}
 */
export function searchInventorySettingFailed() {
  return {
    type: SEARCH_INVENTORY_SETTING_FAILED,
  }
}

/**
 * Create user
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createInventorySetting(payload, onSuccess, onError) {
  return {
    type: CREATE_INVENTORY_SETTING_START,
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
export function createInventorySettingSuccess(payload) {
  return {
    type: CREATE_INVENTORY_SETTING_SUCCESS,
    payload: payload,
  }
}

/**
 * Create user failed action
 * @returns {object}
 */
export function createInventorySettingFailed() {
  return {
    type: CREATE_INVENTORY_SETTING_FAILED,
  }
}

/**
 * Update user
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateInventorySetting(payload, onSuccess, onError) {
  return {
    type: UPDATE_INVENTORY_SETTING_START,
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
export function updateInventorySettingSuccess(payload) {
  return {
    type: UPDATE_INVENTORY_SETTING_SUCCESS,
    payload: payload,
  }
}

/**
 * Update user failed action
 * @returns {object}
 */
export function updateInventorySettingFailed() {
  return {
    type: UPDATE_INVENTORY_SETTING_FAILED,
  }
}
/**
 * Delete user
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteInventorySetting(payload, onSuccess, onError) {
  return {
    type: DELETE_INVENTORY_SETTING_START,
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
export function deleteInventorySettingSuccess(payload) {
  return {
    type: DELETE_INVENTORY_SETTING_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete user failed action
 * @returns {object}
 */
export function deleteInventorySettingFailed() {
  return {
    type: DELETE_INVENTORY_SETTING_FAILED,
  }
}

/**
 * Get user details
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getDetailInventorySettingById(payload, onSuccess, onError) {
  return {
    type: GET_INVENTORY_SETTING_START,
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
export function getDetailInventorySettingByIdSuccess(payload) {
  return {
    type: GET_INVENTORY_SETTING_SUCCESS,
    payload: payload,
  }
}

/**
 * Get user details by id failed action
 * @returns {object}
 */
export function getDetailInventorySettingByIdFailed() {
  return {
    type: GET_INVENTORY_SETTING_FAILED,
  }
}

export function resetInventorySettingState() {
  return {
    type: RESET_INVENTORY_SETTING_STATE,
  }
}

export default {
  searchInventorySetting,
  searchInventorySettingSuccess,
  searchInventorySettingFailed,
  createInventorySetting,
  createInventorySettingSuccess,
  createInventorySettingFailed,
  updateInventorySetting,
  updateInventorySettingSuccess,
  updateInventorySettingFailed,
  deleteInventorySetting,
  deleteInventorySettingSuccess,
  deleteInventorySettingFailed,
  getDetailInventorySettingById,
  getDetailInventorySettingByIdSuccess,
  getDetailInventorySettingByIdFailed,
  resetInventorySettingState,
}
