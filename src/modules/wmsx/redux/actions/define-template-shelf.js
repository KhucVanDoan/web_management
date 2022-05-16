export const SEARCH_TEMPLATE_SHELFS_START = 'WMSX_SEARCH_TEMPLATE_SHELFS_START'
export const SEARCH_TEMPLATE_SHELFS_SUCCESS =
  'WMSX_SEARCH_TEMPLATE_SHELFS_SUCCESS'
export const SEARCH_TEMPLATE_SHELFS_FAILED =
  'WMSX_SEARCH_TEMPLATE_SHELFS_FAILED'

export const GET_TEMPLATE_SHELF_DETAIL_START =
  'WMSX_GET_TEMPLATE_SHELF_DETAIL_START'
export const GET_TEMPLATE_SHELF_DETAIL_SUCCESS =
  'WMSX_GET_TEMPLATE_SHELF_DETAIL_SUCCESS'
export const GET_TEMPLATE_SHELF_DETAIL_FAILED =
  'WMSX_GET_TEMPLATE_SHELF_DETAIL_FAILED'

export const CREATE_TEMPLATE_SHELF_START = 'WMSX_CREATE_TEMPLATE_SHELF_START'
export const CREATE_TEMPLATE_SHELF_SUCCESS =
  'WMSX_CREATE_TEMPLATE_SHELF_SUCCESS'
export const CREATE_TEMPLATE_SHELF_FAILED = 'WMSX_CREATE_TEMPLATE_SHELF_FAILED'

export const UPDATE_TEMPLATE_SHELF_START = 'WMSX_UPDATE_TEMPLATE_SHELF_START'
export const UPDATE_TEMPLATE_SHELF_SUCCESS =
  'WMSX_UPDATE_TEMPLATE_SHELF_SUCCESS'
export const UPDATE_TEMPLATE_SHELF_FAILED = 'WMSX_UPDATE_TEMPLATE_SHELF_FAILED'

export const DELETE_TEMPLATE_SHELF_START = 'WMSX_DELETE_TEMPLATE_SHELF_START'
export const DELETE_TEMPLATE_SHELF_SUCCESS =
  'WMSX_DELETE_TEMPLATE_SHELF_SUCCESS'
export const DELETE_TEMPLATE_SHELF_FAILED = 'WMSX_DELETE_TEMPLATE_SHELF_FAILED'

export const RESET_TEMPLATE_SHELF_DETAILS_STATE =
  'WMSX_RESET_TEMPLATE_SHELF_DETAILS_STATE'
/**
 * Search template shelf
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchTemplateShelfs(payload, onSuccess, onError) {
  return {
    type: SEARCH_TEMPLATE_SHELFS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search template shelf success action
 * @param {*} payload
 * @returns {object}
 */
export function searchTemplateShelfsSuccess(payload) {
  return {
    type: SEARCH_TEMPLATE_SHELFS_SUCCESS,
    payload: payload,
  }
}

/**
 * Search template shelf failed action
 * @returns {object}
 */
export function searchTemplateShelfsFailed() {
  return {
    type: SEARCH_TEMPLATE_SHELFS_FAILED,
  }
}

/**
 * Get template shelf details
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getTemplateShelfDetailById(payload, onSuccess, onError) {
  return {
    type: GET_TEMPLATE_SHELF_DETAIL_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get template shelf details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getTemplateShelfDetailByIdSuccess(payload) {
  return {
    type: GET_TEMPLATE_SHELF_DETAIL_SUCCESS,
    payload: payload,
  }
}

/**
 * Get template shelf details by id failed action
 * @returns {object}
 */
export function getTemplateShelfDetailByIdFailed() {
  return {
    type: GET_TEMPLATE_SHELF_DETAIL_FAILED,
  }
}

/**
 * Create template shelf
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createTemplateShelf(payload, onSuccess, onError) {
  return {
    type: CREATE_TEMPLATE_SHELF_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Create template shelf success action
 * @param {*} payload
 * @returns {object}
 */
export function createTemplateShelfSuccess(payload) {
  return {
    type: CREATE_TEMPLATE_SHELF_SUCCESS,
    payload: payload,
  }
}

/**
 * Create template shelf failed action
 * @returns {object}
 */
export function createTemplateShelfFailed() {
  return {
    type: CREATE_TEMPLATE_SHELF_FAILED,
  }
}

/**
 * Update template shelf
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateTemplateShelf(payload, onSuccess, onError) {
  return {
    type: UPDATE_TEMPLATE_SHELF_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Update template shelf success action
 * @param {*} payload
 * @returns {object}
 */
export function updateTemplateShelfSuccess(payload) {
  return {
    type: UPDATE_TEMPLATE_SHELF_SUCCESS,
    payload: payload,
  }
}

/**
 * Update template shelf failed action
 * @returns {object}
 */
export function updateTemplateShelfFailed() {
  return {
    type: UPDATE_TEMPLATE_SHELF_FAILED,
  }
}

/**
 * Delete template shelf
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteTemplateShelf(payload, onSuccess, onError) {
  return {
    type: DELETE_TEMPLATE_SHELF_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete template shelf success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteTemplateShelfSuccess(payload) {
  return {
    type: DELETE_TEMPLATE_SHELF_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete template shelf failed action
 * @returns {object}
 */
export function deleteTemplateShelfFailed() {
  return {
    type: DELETE_TEMPLATE_SHELF_FAILED,
  }
}

export function resetTemplateShelfDetailsState() {
  return {
    type: RESET_TEMPLATE_SHELF_DETAILS_STATE,
  }
}

export default {
  searchTemplateShelfs,
  searchTemplateShelfsSuccess,
  searchTemplateShelfsFailed,
  getTemplateShelfDetailById,
  getTemplateShelfDetailByIdSuccess,
  getTemplateShelfDetailByIdFailed,
  createTemplateShelf,
  createTemplateShelfSuccess,
  createTemplateShelfFailed,
  updateTemplateShelf,
  updateTemplateShelfSuccess,
  updateTemplateShelfFailed,
  deleteTemplateShelf,
  deleteTemplateShelfSuccess,
  deleteTemplateShelfFailed,
  resetTemplateShelfDetailsState,
}
