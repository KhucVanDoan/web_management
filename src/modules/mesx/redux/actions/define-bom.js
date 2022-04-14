export const SEARCH_BOM_START = 'MESX_SEARCH_BOM_START'
export const SEARCH_BOM_SUCCESS = 'MESX_SEARCH_BOM_SUCCESS'
export const SEARCH_BOM_FAILED = 'MESX_SEARCH_BOM_SUCCESS'

export const CREATE_BOM_START = 'MESX_CREATE_BOM_START'
export const CREATE_BOM_SUCCESS = 'MESX_CREATE_BOM_SUCCESS'
export const CREATE_BOM_FAILED = 'MESX_CREATE_BOM_FAILED'

export const UPDATE_BOM_START = 'MESX_UPDATE_BOM_START'
export const UPDATE_BOM_SUCCESS = 'MESX_UPDATE_BOM_SUCCESS'
export const UPDATE_BOM_FAILED = 'MESX_UPDATE_BOM_FAILED'

export const DELETE_BOM_START = 'MESX_DELETE_BOM_START'
export const DELETE_BOM_SUCCESS = 'MESX_DELETE_BOM_SUCCESS'
export const DELETE_BOM_FAILED = 'MESX_DELETE_BOM_FAILED'

export const GET_BOM_DETAILS_START = 'MESX_GET_BOM_DETAILS_START'
export const GET_BOM_DETAILS_SUCCESS = 'MESX_GET_BOM_DETAILS_SUCCESS'
export const GET_BOM_DETAILS_FAILED = 'MESX_GET_BOM_DETAILS_FAILED'

export const CONFIRM_BOM_START = 'MESX_CONFIRM_BOM_START'
export const CONFIRM_BOM_SUCCESS = 'MESX_CONFIRM_BOM_SUCCESS'
export const CONFIRM_BOM_FAILED = 'MESX_CONFIRM_BOM_FAILED'

export const REJECT_BOM_START = 'MESX_REJECT_BOM_START'
export const REJECT_BOM_SUCCESS = 'MESX_REJECT_BOM_SUCCESS'
export const REJECT_BOM_FAILED = 'MESX_REJECT_BOM_FAILED'

export const GET_BOM_STRUCTURE_START = 'MESX_GET_BOM_STRUCTURE_START'
export const GET_BOM_STRUCTURE_SUCCESS = 'MESX_GET_BOM_STRUCTURE_SUCCESS'
export const GET_BOM_STRUCTURE_FAILED = 'MESX_GET_BOM_STRUCTURE_FAILED'

export const GET_BOM_BY_ITEM_START = 'MESX_GET_BOM_BY_ITEM_START'
export const GET_BOM_BY_ITEM_SUCCESS = 'MESX_GET_BOM_BY_ITEM_SUCCESS'
export const GET_BOM_BY_ITEM_FAILED = 'MESX_GET_BOM_BY_ITEM_FAILED'

export const RESET_BOM_DETAIL_STATE = 'MESX_RESET_BOM_DETAIL_STATE'
/**
 * Search BOM
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchBOM(payload, onSuccess, onError) {
  return {
    type: SEARCH_BOM_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search BOM success action
 * @param {*} payload
 * @returns {object}
 */
export function searchBOMSuccess(payload) {
  return {
    type: SEARCH_BOM_SUCCESS,
    payload: payload,
  }
}

/**
 * Search BOM failed action
 * @returns {object}
 */
export function searchBOMFailed() {
  return {
    type: SEARCH_BOM_FAILED,
  }
}

/**
 * Create BOM
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createBOM(payload, onSuccess, onError) {
  return {
    type: CREATE_BOM_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Create BOM success action
 * @param {*} payload
 * @returns {object}
 */
export function createBOMSuccess(payload) {
  return {
    type: CREATE_BOM_SUCCESS,
    payload: payload,
  }
}

/**
 * Create BOM failed action
 * @returns {object}
 */
export function createBOMFailed() {
  return {
    type: CREATE_BOM_FAILED,
  }
}

/**
 * Update BOM
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateBOM(payload, onSuccess, onError) {
  return {
    type: UPDATE_BOM_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Update BOM success action
 * @param {*} payload
 * @returns {object}
 */
export function updateBOMSuccess(payload) {
  return {
    type: UPDATE_BOM_SUCCESS,
    payload: payload,
  }
}

/**
 * Update BOM failed action
 * @returns {object}
 */
export function updateBOMFailed() {
  return {
    type: UPDATE_BOM_FAILED,
  }
}
/**
 * Delete BOM
 * @param {int} BOMId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteBOM(BOMId, onSuccess, onError) {
  return {
    type: DELETE_BOM_START,
    payload: BOMId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete BOM success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteBOMSuccess(payload) {
  return {
    type: DELETE_BOM_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete BOM failed action
 * @returns {object}
 */
export function deleteBOMFailed() {
  return {
    type: DELETE_BOM_FAILED,
  }
}

/**
 * Get BOM details
 * @param {int} BOMId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getBOMDetailsById(BOMId, onSuccess, onError) {
  return {
    type: GET_BOM_DETAILS_START,
    payload: BOMId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get BOM details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getBOMDetailsByIdSuccess(payload) {
  return {
    type: GET_BOM_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get BOM details by id failed action
 * @returns {object}
 */
export function getBOMDetailsByIdFailed() {
  return {
    type: GET_BOM_DETAILS_FAILED,
  }
}

/**
 * Get confirm BOM
 * @param {int} BOMId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function confirmBOMById(BOMId, onSuccess, onError) {
  return {
    type: CONFIRM_BOM_START,
    payload: BOMId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get confirm BOM by id success action
 * @param {*} payload
 * @returns {object}
 */
export function confirmBOMByIdSuccess(payload) {
  return {
    type: CONFIRM_BOM_SUCCESS,
    payload: payload,
  }
}

/**
 * Get confirm BOM by id failed action
 * @returns {object}
 */
export function confirmBOMByIdFailed() {
  return {
    type: CONFIRM_BOM_FAILED,
  }
}

/**
 * Get reject BOM
 * @param {int} BOMId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function rejectBOMById(BOMId, onSuccess, onError) {
  return {
    type: REJECT_BOM_START,
    payload: BOMId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get reject BOM by id success action
 * @param {*} payload
 * @returns {object}
 */
export function rejectBOMByIdSuccess(payload) {
  return {
    type: REJECT_BOM_SUCCESS,
    payload: payload,
  }
}

/**
 * Get reject BOM by id failed action
 * @returns {object}
 */
export function rejectBOMByIdFailed() {
  return {
    type: REJECT_BOM_FAILED,
  }
}

/**
 * Get BOM details
 * @param {int} BOMId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getBOMStructureById(BOMId, onSuccess, onError) {
  return {
    type: GET_BOM_STRUCTURE_START,
    payload: BOMId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get BOM Structure by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getBOMStructureByIdSuccess(payload) {
  return {
    type: GET_BOM_STRUCTURE_SUCCESS,
    payload: payload,
  }
}

/**
 * Get BOM Structure by id failed action
 * @returns {object}
 */
export function getBOMStructureByIdFailed() {
  return {
    type: GET_BOM_STRUCTURE_FAILED,
  }
}

/**
 * Get bom by item
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getBomByItem(payload, onSuccess, onError) {
  return {
    type: GET_BOM_BY_ITEM_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get bom by item success action
 * @param {*} payload
 * @returns {object}
 */
export function getBomByItemSuccess(payload) {
  return {
    type: GET_BOM_BY_ITEM_SUCCESS,
    payload: payload,
  }
}

/**
 * Get bom by item failed action
 * @returns {object}
 */
export function getBomByItemFailed() {
  return {
    type: GET_BOM_BY_ITEM_FAILED,
  }
}

export function resetBomState() {
  return {
    type: RESET_BOM_DETAIL_STATE,
  }
}

export default {
  searchBOM,
  searchBOMSuccess,
  searchBOMFailed,
  createBOM,
  createBOMSuccess,
  createBOMFailed,
  deleteBOM,
  deleteBOMSuccess,
  deleteBOMFailed,
  updateBOM,
  updateBOMSuccess,
  updateBOMFailed,
  getBOMDetailsById,
  getBOMDetailsByIdSuccess,
  getBOMDetailsByIdFailed,
  confirmBOMById,
  confirmBOMByIdSuccess,
  confirmBOMByIdFailed,
  rejectBOMById,
  rejectBOMByIdSuccess,
  rejectBOMByIdFailed,
  getBOMStructureById,
  getBOMStructureByIdFailed,
  getBOMStructureByIdSuccess,
  getBomByItem,
  getBomByItemSuccess,
  getBomByItemFailed,
  resetBomState,
}
