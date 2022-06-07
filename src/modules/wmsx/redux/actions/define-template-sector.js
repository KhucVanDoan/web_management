export const SEARCH_TEMPLATE_SECTORS_START =
  'WMSX_SEARCH_TEMPLATE_SECTORS_START'
export const SEARCH_TEMPLATE_SECTORS_SUCCESS =
  'WMSX_SEARCH_TEMPLATE_SECTORS_SUCCESS'
export const SEARCH_TEMPLATE_SECTORS_FAILED =
  'WMSX_SEARCH_TEMPLATE_SECTORS_FAILED'

export const GET_TEMPLATE_SECTOR_DETAIL_START =
  'WMSX_GET_TEMPLATE_SECTOR_DETAIL_START'
export const GET_TEMPLATE_SECTOR_DETAIL_SUCCESS =
  'WMSX_GET_TEMPLATE_SECTOR_DETAIL_SUCCESS'
export const GET_TEMPLATE_SECTOR_DETAIL_FAILED =
  'WMSX_GET_TEMPLATE_SECTOR_DETAIL_FAILED'

export const CREATE_TEMPLATE_SECTOR_START = 'WMSX_CREATE_TEMPLATE_SECTOR_START'
export const CREATE_TEMPLATE_SECTOR_SUCCESS =
  'WMSX_CREATE_TEMPLATE_SECTOR_SUCCESS'
export const CREATE_TEMPLATE_SECTOR_FAILED =
  'WMSX_CREATE_TEMPLATE_SECTOR_FAILED'

export const UPDATE_TEMPLATE_SECTOR_START = 'WMSX_UPDATE_TEMPLATE_SECTOR_START'
export const UPDATE_TEMPLATE_SECTOR_SUCCESS =
  'WMSX_UPDATE_TEMPLATE_SECTOR_SUCCESS'
export const UPDATE_TEMPLATE_SECTOR_FAILED =
  'WMSX_UPDATE_TEMPLATE_SECTOR_FAILED'

export const DELETE_TEMPLATE_SECTOR_START = 'WMSX_DELETE_TEMPLATE_SECTOR_START'
export const DELETE_TEMPLATE_SECTOR_SUCCESS =
  'WMSX_DELETE_TEMPLATE_SECTOR_SUCCESS'
export const DELETE_TEMPLATE_SECTOR_FAILED =
  'WMSX_DELETE_TEMPLATE_SECTOR_FAILED'
export const RESET_STATE_TEMPLATE_SECTOR =
  'WMSX_RESET_STATE_TEMPLATE_SECTORWMSX_'
/**
 * Search template sector
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchTemplateSectors(payload, onSuccess, onError) {
  return {
    type: SEARCH_TEMPLATE_SECTORS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search template sector success action
 * @param {*} payload
 * @returns {object}
 */
export function searchTemplateSectorsSuccess(payload) {
  return {
    type: SEARCH_TEMPLATE_SECTORS_SUCCESS,
    payload: payload,
  }
}

/**
 * Search template sector failed action
 * @returns {object}
 */
export function searchTemplateSectorsFailed() {
  return {
    type: SEARCH_TEMPLATE_SECTORS_FAILED,
  }
}

/**
 * Get template sector details
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getTemplateSectorDetailById(payload, onSuccess, onError) {
  return {
    type: GET_TEMPLATE_SECTOR_DETAIL_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get template sector details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getTemplateSectorDetailByIdSuccess(payload) {
  return {
    type: GET_TEMPLATE_SECTOR_DETAIL_SUCCESS,
    payload: payload,
  }
}

/**
 * Get template sector details by id failed action
 * @returns {object}
 */
export function getTemplateSectorDetailByIdFailed() {
  return {
    type: GET_TEMPLATE_SECTOR_DETAIL_FAILED,
  }
}

/**
 * Create template sector
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createTemplateSector(payload, onSuccess, onError) {
  return {
    type: CREATE_TEMPLATE_SECTOR_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Create template sector success action
 * @param {*} payload
 * @returns {object}
 */
export function createTemplateSectorSuccess(payload) {
  return {
    type: CREATE_TEMPLATE_SECTOR_SUCCESS,
    payload: payload,
  }
}

/**
 * Create template sector failed action
 * @returns {object}
 */
export function createTemplateSectorFailed() {
  return {
    type: CREATE_TEMPLATE_SECTOR_FAILED,
  }
}

/**
 * Update template sector
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateTemplateSector(payload, onSuccess, onError) {
  return {
    type: UPDATE_TEMPLATE_SECTOR_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Update template sector success action
 * @param {*} payload
 * @returns {object}
 */
export function updateTemplateSectorSuccess(payload) {
  return {
    type: UPDATE_TEMPLATE_SECTOR_SUCCESS,
    payload: payload,
  }
}

/**
 * Update template sector failed action
 * @returns {object}
 */
export function updateTemplateSectorFailed() {
  return {
    type: UPDATE_TEMPLATE_SECTOR_FAILED,
  }
}

/**
 * Delete template sector
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteTemplateSector(payload, onSuccess, onError) {
  return {
    type: DELETE_TEMPLATE_SECTOR_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete template sector success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteTemplateSectorSuccess(payload) {
  return {
    type: DELETE_TEMPLATE_SECTOR_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete template sector failed action
 * @returns {object}
 */
export function deleteTemplateSectorFailed() {
  return {
    type: DELETE_TEMPLATE_SECTOR_FAILED,
  }
}
export function resetTemplateSectorState() {
  return {
    type: RESET_STATE_TEMPLATE_SECTOR,
  }
}
export default {
  searchTemplateSectors,
  searchTemplateSectorsSuccess,
  searchTemplateSectorsFailed,
  getTemplateSectorDetailById,
  getTemplateSectorDetailByIdSuccess,
  getTemplateSectorDetailByIdFailed,
  createTemplateSector,
  createTemplateSectorSuccess,
  createTemplateSectorFailed,
  updateTemplateSector,
  updateTemplateSectorSuccess,
  updateTemplateSectorFailed,
  deleteTemplateSector,
  deleteTemplateSectorSuccess,
  deleteTemplateSectorFailed,
  resetTemplateSectorState,
}
