export const SEARCH_MO_START = 'MESX_MO_START'
export const SEARCH_MO_SUCCESS = 'MESX_MO_SUCCESS'
export const SEARCH_MO_FAILED = 'MESX_MO_FAILED'

export const CREATE_MO_START = 'MESX_CREATE_MO_START'
export const CREATE_MO_SUCCESS = 'MESX_CREATE_MO_SUCCESS'
export const CREATE_MO_FAILED = 'MESX_CREATE_MO_FAILED'

export const UPDATE_MO_START = 'MESX_UPDATE_MO_START'
export const UPDATE_MO_SUCCESS = 'MESX_UPDATE_MO_SUCCESS'
export const UPDATE_MO_FAILED = 'MESX_UPDATE_MO_FAILED'

export const DELETE_MO_START = 'MESX_DELETE_MO_START'
export const DELETE_MO_SUCCESS = 'MESX_DELETE_MO_SUCCESS'
export const DELETE_MO_FAILED = 'MESX_DELETE_MO_FAILED'

export const GET_MO_DETAILS_START = 'MESX_GET_MO_DETAILS_START'
export const GET_MO_DETAILS_SUCCESS = 'MESX_GET_MO_DETAILS_SUCCESS'
export const GET_MO_DETAILS_FAILED = 'MESX_GET_MO_DETAILS_FAILED'

export const CONFIRM_MO_START = 'MESX_CONFIRM_MO_START'
export const CONFIRM_MO_SUCCESS = 'MESX_CONFIRM_MO_SUCCESS'
export const CONFIRM_MO_FAILED = 'MESX_CONFIRM_MO_FAILED'

export const REJECT_MO_START = 'MESX_REJECT_MO_START'
export const REJECT_MO_SUCCESS = 'MESX_REJECT_MO_SUCCESS'
export const REJECT_MO_FAILED = 'MESX_REJECT_MO_FAILED'

export const GET_BOM_PRODUCING_STEP_STRUCTURE_START =
  'MESX_GET_BOM_PRODUCING_STEP_STRUCTURE_START'
export const GET_BOM_PRODUCING_STEP_STRUCTURE_SUCCESS =
  'MESX_GET_BOM_PRODUCING_STEP_STRUCTURE_SUCCESS'
export const GET_BOM_PRODUCING_STEP_STRUCTURE_FAILED =
  'MESX_GET_BOM_PRODUCING_STEP_STRUCTURE_FAILED'

export const CHECK_MATERIAL_PLAN_START = 'MESX_CHECK_MATERIAL_PLAN_START'
export const CHECK_MATERIAL_PLAN_SUCCESS = 'MESX_CHECK_MATERIAL_PLAN_SUCCESS'
export const CHECK_MATERIAL_PLAN_FAILED = 'MESX_CHECK_MATERIAL_PLAN_FAILED'
export const RESET_CHECK_MATERIAL_PLAN = 'MESX_RESET_CHECK_MATERIAL_PLAN'

export const GET_LIST_MO_PRODUCING_STEP_BY_ID =
  'MESX_GET_LIST_MO_PRODUCING_STEP_BY_ID'
export const GET_LIST_MO_PRODUCING_STEP_BY_ID_SUCCESS =
  'MESX_GET_LIST_MO_PRODUCING_STEP_BY_ID_SUCCESS'
export const GET_LIST_MO_PRODUCING_STEP_BY_ID_FAILED =
  'MESX_GET_LIST_MO_PRODUCING_STEP_BY_ID_FAILED'

export const GET_MO_ITEMS_START = 'MESX_GET_MO_ITEMS_START'
export const GET_MO_ITEMS_SUCCESS = 'MESX_GET_MO_ITEMS_SUCCESS'
export const GET_MO_ITEMS_FAILED = 'MESX_GET_MO_ITEMS_FAILED'

export const GET_PRICE_STRUCTURE_START = 'MESX_GET_PRICE_STRUCTURE_START'
export const GET_PRICE_STRUCTURE_SUCCESS = 'MESX_GET_PRICE_STRUCTURE_SUCCESS'
export const GET_PRICE_STRUCTURE_FAILED = 'MESX_GET_PRICE_STRUCTURE_FAILED'

export const RESET_MO_DETAIL_STATE = 'MESX_RESET_MO_DETAIL_STATE'
export const RESET_MO_PRODUCING_STEP = 'MESX_RESET_MO_PRODUCING_STEP'

export function searchMO(payload, onSuccess, onError) {
  return {
    type: SEARCH_MO_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search MO success action
 * @param {*} payload
 * @returns {object}
 */
export function searchMOSuccess(payload) {
  return {
    type: SEARCH_MO_SUCCESS,
    payload: payload,
  }
}

/**
 * Search MO failed action
 * @returns {object}
 */
export function searchMOFailed() {
  return {
    type: SEARCH_MO_FAILED,
  }
}

/**
 * Create MO
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createMO(payload, onSuccess, onError) {
  return {
    type: CREATE_MO_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Create MO success action
 * @param {*} payload
 * @returns {object}
 */
export function createMOSuccess(payload) {
  return {
    type: CREATE_MO_SUCCESS,
    payload: payload,
  }
}

/**
 * Create MO failed action
 * @returns {object}
 */
export function createMOFailed() {
  return {
    type: CREATE_MO_FAILED,
  }
}

/**
 * Update MO
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateMO(payload, onSuccess, onError) {
  return {
    type: UPDATE_MO_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Update MO success action
 * @param {*} payload
 * @returns {object}
 */
export function updateMOSuccess(payload) {
  return {
    type: UPDATE_MO_SUCCESS,
    payload: payload,
  }
}

/**
 * Update MO failed action
 * @returns {object}
 */
export function updateMOFailed() {
  return {
    type: UPDATE_MO_FAILED,
  }
}
/**
 * Delete MO
 * @param {int} MOId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteMO(MOId, onSuccess, onError) {
  return {
    type: DELETE_MO_START,
    payload: MOId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete MO success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteMOSuccess(payload) {
  return {
    type: DELETE_MO_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete MO failed action
 * @returns {object}
 */
export function deleteMOFailed() {
  return {
    type: DELETE_MO_FAILED,
  }
}

/**
 * Get MO details
 * @param {int} MOId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getMODetailsById(MOId, onSuccess, onError) {
  return {
    type: GET_MO_DETAILS_START,
    payload: MOId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get MO details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getMODetailsByIdSuccess(payload) {
  return {
    type: GET_MO_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get MO details by id failed action
 * @returns {object}
 */
export function getMODetailsByIdFailed() {
  return {
    type: GET_MO_DETAILS_FAILED,
  }
}

/**
 * Get confirm MO
 * @param {int} MOId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function confirmMOById(MOId, onSuccess, onError) {
  return {
    type: CONFIRM_MO_START,
    payload: MOId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get confirm MO by id success action
 * @param {*} payload
 * @returns {object}
 */
export function confirmMOByIdSuccess(payload) {
  return {
    type: CONFIRM_MO_SUCCESS,
    payload: payload,
  }
}

/**
 * Get confirm MO by id failed action
 * @returns {object}
 */
export function confirmMOByIdFailed() {
  return {
    type: CONFIRM_MO_FAILED,
  }
}

/**
 * Get reject MO
 * @param {int} MOId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function rejectMOById(MOId, onSuccess, onError) {
  return {
    type: REJECT_MO_START,
    payload: MOId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get reject MO by id success action
 * @param {*} payload
 * @returns {object}
 */
export function rejectMOByIdSuccess(payload) {
  return {
    type: REJECT_MO_SUCCESS,
    payload: payload,
  }
}

/**
 * Get reject MO by id failed action
 * @returns {object}
 */
export function rejectMOByIdFailed() {
  return {
    type: REJECT_MO_FAILED,
  }
}

/**
 * Get BOM details
 * @param {int} BOMId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getBOMProducingStepStructureById(BOMId, onSuccess, onError) {
  return {
    type: GET_BOM_PRODUCING_STEP_STRUCTURE_START,
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
export function getBOMProducingStepStructureByIdSuccess(payload) {
  return {
    type: GET_BOM_PRODUCING_STEP_STRUCTURE_SUCCESS,
    payload: payload,
  }
}

/**
 * Get BOM Structure by id failed action
 * @returns {object}
 */
export function getBOMProducingStepStructureByIdFailed() {
  return {
    type: GET_BOM_PRODUCING_STEP_STRUCTURE_FAILED,
  }
}

/**
 * Check material plan
 * @param {int} MOId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function checkMaterialPlanById(MOId, onSuccess, onError) {
  return {
    type: CHECK_MATERIAL_PLAN_START,
    payload: MOId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * check material plan by id success action
 * @param {*} payload
 * @returns {object}
 */
export function checkMaterialPlanByIdSuccess(payload) {
  return {
    type: CHECK_MATERIAL_PLAN_SUCCESS,
    payload: payload,
  }
}

/**
 * check material plan by id failed action
 * @returns {object}
 */
export function checkMaterialPlanByIdFailed() {
  return {
    type: CHECK_MATERIAL_PLAN_FAILED,
  }
}

export function getListMoProducingStepById(MOId, onSuccess, onError) {
  return {
    type: GET_LIST_MO_PRODUCING_STEP_BY_ID,
    payload: MOId,
    onSuccess,
    onError,
  }
}

export function getListMoProducingStepByIdSuccess(payload) {
  return {
    type: GET_LIST_MO_PRODUCING_STEP_BY_ID_SUCCESS,
    payload,
  }
}

export function getListMoProducingStepByIdFailed() {
  return {
    type: GET_LIST_MO_PRODUCING_STEP_BY_ID_FAILED,
  }
}

export function getMoItemsById(payload, onSuccess, onError) {
  return {
    type: GET_MO_ITEMS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * get MO items success action
 * @param {*} payload
 * @returns {object}
 */
export function getMoItemsByIdSuccess(payload) {
  return {
    type: GET_MO_ITEMS_SUCCESS,
    payload: payload,
  }
}

/**
 * get MO items failed action
 * @returns {object}
 */
export function getMoItemsByIdFailed() {
  return {
    type: GET_MO_ITEMS_FAILED,
  }
}

export function getPriceStructureById(payload, onSuccess, onError) {
  return {
    type: GET_PRICE_STRUCTURE_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get BOM Structure by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getPriceStructureByIdSuccess(payload) {
  return {
    type: GET_PRICE_STRUCTURE_SUCCESS,
    payload: payload,
  }
}

/**
 * Get BOM Structure by id failed action
 * @returns {object}
 */
export function getPriceStructureByIdFailed() {
  return {
    type: GET_PRICE_STRUCTURE_FAILED,
  }
}

export function resetMoDetail() {
  return {
    type: RESET_MO_DETAIL_STATE,
  }
}

export function resetMaterialCheck() {
  return {
    type: RESET_CHECK_MATERIAL_PLAN,
  }
}

export function resetMoProducingStep() {
  return {
    type: RESET_MO_PRODUCING_STEP,
  }
}

export default {
  getMoItemsById,
  getMoItemsByIdSuccess,
  getMoItemsByIdFailed,
}
