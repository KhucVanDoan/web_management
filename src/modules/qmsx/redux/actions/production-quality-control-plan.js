//@Define Action
export const SEARCH_PRODUCTION_QUALITY_CONTROL_PLAN_START =
  'QMSX_SEARCH_PRODUCTION_QUALITY_CONTROL_PLAN_START'
export const SEARCH_PRODUCTION_QUALITY_CONTROL_PLAN_SUCCESS =
  'QMSX_SEARCH_PRODUCTION_QUALITY_CONTROL_PLAN_SUCCESS'
export const SEARCH_PRODUCTION_QUALITY_CONTROL_PLAN_FAIL =
  'QMSX_SEARCH_PRODUCTION_QUALITY_CONTROL_PLAN_FAIL'
// Action: Get List
export const CREATE_PRODUCTION_QUALITY_CONTROL_PLAN_START =
  'QMSX_CREATE_PRODUCTION_QUALITY_CONTROL_PLAN_START'
export const CREATE_PRODUCTION_QUALITY_CONTROL_PLAN_SUCCESS =
  'QMSX_CREATE_PRODUCTION_QUALITY_CONTROL_PLAN_SUCCESS'
export const CREATE_PRODUCTION_QUALITY_CONTROL_PLAN_FAIL =
  'QMSX_CREATE_PRODUCTION_QUALITY_CONTROL_PLAN_FAIL'
// Action: Update
export const UPDATE_PRODUCTION_QUALITY_CONTROL_PLAN_START =
  'QMSX_UPDATE_PRODUCTION_QUALITY_CONTROL_PLAN_START'
export const UPDATE_PRODUCTION_QUALITY_CONTROL_PLAN_SUCCESS =
  'QMSX_UPDATE_PRODUCTION_QUALITY_CONTROL_PLAN_SUCCESS'
export const UPDATE_PRODUCTION_QUALITY_CONTROL_PLAN_FAIL =
  'QMSX_UPDATE_PRODUCTION_QUALITY_CONTROL_PLAN_FAIL'
// Action: Delete
export const DELETE_PRODUCTION_QUALITY_CONTROL_PLAN_START =
  'QMSX_DELETE_PRODUCTION_QUALITY_CONTROL_PLAN_START'
export const DELETE_PRODUCTION_QUALITY_CONTROL_PLAN_SUCCESS =
  'QMSX_DELETE_PRODUCTION_QUALITY_CONTROL_PLAN_SUCCESS'
export const DELETE_PRODUCTION_QUALITY_CONTROL_PLAN_FAIL =
  'QMSX_DELETE_PRODUCTION_QUALITY_CONTROL_PLAN_FAIL'
// Action: Get detail
export const GET_PRODUCTION_QUALITY_CONTROL_PLAN_DETAIL_START =
  'QMSX_GET_PRODUCTION_QUALITY_CONTROL_PLAN_DETAIL_START'
export const GET_PRODUCTION_QUALITY_CONTROL_PLAN_DETAIL_SUCCESS =
  'QMSX_GET_PRODUCTION_QUALITY_CONTROL_PLAN_DETAIL_SUCCESS'
export const GET_PRODUCTION_QUALITY_CONTROL_PLAN_DETAIL_FAIL =
  'QMSX_GET_PRODUCTION_QUALITY_CONTROL_PLAN_DETAIL_FAIL'
// Action: Confirm
export const CONFIRM_PRODUCTION_QUALITY_CONTROL_PLAN_START =
  'QMSX_CONFIRM_PRODUCTION_QUALITY_CONTROL_PLAN_START'
export const CONFIRM_PRODUCTION_QUALITY_CONTROL_PLAN_SUCCESS =
  'QMSX_CONFIRM_PRODUCTION_QUALITY_CONTROL_PLAN_SUCCESS'
export const CONFIRM_PRODUCTION_QUALITY_CONTROL_PLAN_FAIL =
  'QMSX_CONFIRM_PRODUCTION_QUALITY_CONTROL_PLAN_FAIL'
// Action: Get reset detail
export const RESET_PRODUCTION_QUALITY_CONTROL_PLAN_DETAIL_STATE =
  'QMSX_RESET_PRODUCTION_QUALITY_CONTROL_PLAN_DETAIL_STATE'
//---Form: Action
// Action: Get input mo
export const GET_INPUT_MO_PRODUCTION_QC_PLAN_START =
  'QMSX_GET_INPUT_MO_PRODUCTION_QC_PLAN_START'
export const GET_INPUT_MO_PRODUCTION_QC_PLAN_SUCCESS =
  'QMSX_GET_INPUT_MO_PRODUCTION_QC_PLAN_SUCCESS'
export const GET_INPUT_MO_PRODUCTION_QC_PLAN_FAIL =
  'QMSX_GET_INPUT_MO_PRODUCTION_QC_PLAN_FAIL'
// Action: Get output mo
export const GET_OUTPUT_MO_PRODUCTION_QC_PLAN_START =
  'QMSX_GET_OUTPUT_MO_PRODUCTION_QC_PLAN_START'
export const GET_OUTPUT_MO_PRODUCTION_QC_PLAN_SUCCESS =
  'QMSX_GET_OUTPUT_MO_PRODUCTION_QC_PLAN_SUCCESS'
export const GET_OUTPUT_MO_PRODUCTION_QC_PLAN_FAIL =
  'QMSX_GET_OUTPUT_MO_PRODUCTION_QC_PLAN_FAIL'
// Action: Get production-plan (MESx) by moId
export const GET_PRODUCTION_PLAN_BY_MO_ID_START =
  'QMSX_GET_PRODUCTION_PLAN_BY_MO_ID_START'
export const GET_PRODUCTION_PLAN_BY_MO_ID_SUCCESS =
  'QMSX_GET_PRODUCTION_PLAN_BY_MO_ID_SUCCESS'
export const GET_PRODUCTION_PLAN_BY_MO_ID_FAIL =
  'QMSX_GET_PRODUCTION_PLAN_BY_MO_ID_FAIL'
// Action: Get production-plan-detail (MESx) by production-plan-Id
export const GET_PRODUCTION_PLAN_DETAIL_BY_PRODUCTION_PLAN_ID_START =
  'QMSX_GET_PRODUCTION_PLAN_DETAIL_BY_PRODUCTION_PLAN_ID_START'
export const GET_PRODUCTION_PLAN_DETAIL_BY_PRODUCTION_PLAN_ID_SUCCESS =
  'QMSX_GET_PRODUCTION_PLAN_DETAIL_BY_PRODUCTION_PLAN_ID_SUCCESS'
export const GET_PRODUCTION_PLAN_DETAIL_BY_PRODUCTION_PLAN_ID_FAIL =
  'QMSX_GET_PRODUCTION_PLAN_DETAIL_BY_PRODUCTION_PLAN_ID_FAIL'

/**
 * Search production QC plan start action
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchProductionQcPlan(payload, onSuccess, onError) {
  return {
    type: SEARCH_PRODUCTION_QUALITY_CONTROL_PLAN_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search production QC plan success action
 * @param {*} payload
 * @returns {object}
 */
export function searchProductionQcPlanSuccess(payload) {
  return {
    type: SEARCH_PRODUCTION_QUALITY_CONTROL_PLAN_SUCCESS,
    payload: payload,
  }
}

/**
 * Search production QC plan fail action
 * @returns {object}
 */
export function searchProductionQcPlanFail() {
  return {
    type: SEARCH_PRODUCTION_QUALITY_CONTROL_PLAN_FAIL,
  }
}

/**
 * Create production QC plan start action
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createProductionQcPlan(payload, onSuccess, onError) {
  return {
    type: CREATE_PRODUCTION_QUALITY_CONTROL_PLAN_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Create production QC plan success action
 * @param {*} payload
 * @returns {object}
 */
export function createProductionQcPlanSuccess(payload) {
  return {
    type: CREATE_PRODUCTION_QUALITY_CONTROL_PLAN_SUCCESS,
    payload: payload,
  }
}

/**
 * Create production QC plan fail action
 * @returns {object}
 */
export function createProductionQcPlanFail() {
  return {
    type: CREATE_PRODUCTION_QUALITY_CONTROL_PLAN_FAIL,
  }
}

/**
 * Update production QC plan start action
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateProductionQcPlan(payload, onSuccess, onError) {
  return {
    type: UPDATE_PRODUCTION_QUALITY_CONTROL_PLAN_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Update production QC plan success action
 * @param {*} payload
 * @returns {object}
 */
export function updateProductionQcPlanSuccess(payload) {
  return {
    type: UPDATE_PRODUCTION_QUALITY_CONTROL_PLAN_SUCCESS,
    payload: payload,
  }
}

/**
 * Update production QC plan fail action
 * @returns {object}
 */
export function updateProductionQcPlanFail() {
  return {
    type: UPDATE_PRODUCTION_QUALITY_CONTROL_PLAN_FAIL,
  }
}
/**
 * Delete production QC plan start action
 * @param {object} params
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteProductionQcPlan(params, onSuccess, onError) {
  return {
    type: DELETE_PRODUCTION_QUALITY_CONTROL_PLAN_START,
    payload: params,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete production QC plan success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteProductionQcPlanSuccess(payload) {
  return {
    type: DELETE_PRODUCTION_QUALITY_CONTROL_PLAN_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete production QC plan fail action
 * @returns {object}
 */
export function deleteProductionQcPlanFail() {
  return {
    type: DELETE_PRODUCTION_QUALITY_CONTROL_PLAN_FAIL,
  }
}

/**
 * Get production QC plan detail start action
 * @param {object} params
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getProductionQcPlanDetailById(params, onSuccess, onError) {
  return {
    type: GET_PRODUCTION_QUALITY_CONTROL_PLAN_DETAIL_START,
    payload: params,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get production QC plan detail success action
 * @param {*} payload
 * @returns {object}
 */
export function getProductionQcPlanDetailByIdSuccess(payload) {
  return {
    type: GET_PRODUCTION_QUALITY_CONTROL_PLAN_DETAIL_SUCCESS,
    payload: payload,
  }
}

/**
 * Get production QC plan detail fail action
 * @returns {object}
 */
export function getProductionQcPlanDetailByIdFail() {
  return {
    type: GET_PRODUCTION_QUALITY_CONTROL_PLAN_DETAIL_FAIL,
  }
}

/**
 * Get confirm production QC plan start action
 * @param {object} params
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function confirmProductionQcPlan(params, onSuccess, onError) {
  return {
    type: CONFIRM_PRODUCTION_QUALITY_CONTROL_PLAN_START,
    payload: params,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get confirm production QC plan success action
 * @param {*} payload
 * @returns {object}
 */
export function confirmProductionQcPlanSuccess(payload) {
  return {
    type: CONFIRM_PRODUCTION_QUALITY_CONTROL_PLAN_SUCCESS,
    payload: payload,
  }
}

/**
 * Get confirm production QC plan fail action
 * @returns {object}
 */
export function confirmProductionQcPlanFail() {
  return {
    type: CONFIRM_PRODUCTION_QUALITY_CONTROL_PLAN_FAIL,
  }
}

/**
 * Reset detail state action
 * @returns {object}
 */
export function resetProductionQcPlanDetailState() {
  return {
    type: RESET_PRODUCTION_QUALITY_CONTROL_PLAN_DETAIL_STATE,
  }
}

//--Form--
/**
 * Get get input mo by stageQcValue start action
 * @param {object} params
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getInputMo(params, onSuccess, onError) {
  return {
    type: GET_INPUT_MO_PRODUCTION_QC_PLAN_START,
    payload: params,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get get input mo by stageQcValue success action
 * @param {*} payload
 * @returns {object}
 */
export function getInputMoSuccess(payload) {
  return {
    type: GET_INPUT_MO_PRODUCTION_QC_PLAN_SUCCESS,
    payload: payload,
  }
}

/**
 * Get get input mo by stageQcValue fail action
 * @returns {object}
 */
export function getInputMoFail() {
  return {
    type: GET_INPUT_MO_PRODUCTION_QC_PLAN_FAIL,
  }
}

/**
 * Get get output mo by stageQcValue start action
 * @param {object} params
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getOutputMo(params, onSuccess, onError) {
  return {
    type: GET_OUTPUT_MO_PRODUCTION_QC_PLAN_START,
    payload: params,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get get output mo by stageQcValue success action
 * @param {*} payload
 * @returns {object}
 */
export function getOutputMoSuccess(payload) {
  return {
    type: GET_OUTPUT_MO_PRODUCTION_QC_PLAN_SUCCESS,
    payload: payload,
  }
}

/**
 * Get get output mo by stageQcValue fail action
 * @returns {object}
 */
export function getOutputMoFail() {
  return {
    type: GET_OUTPUT_MO_PRODUCTION_QC_PLAN_FAIL,
  }
}

/**
 * Get get production-plan by moId start action
 * @param {object} params
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getProductionPlanByMoId(params, onSuccess, onError) {
  return {
    type: GET_PRODUCTION_PLAN_BY_MO_ID_START,
    payload: params,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get get production-plan by moId success action
 * @param {*} payload
 * @returns {object}
 */
export function getProductionPlanByMoIdSuccess(payload) {
  return {
    type: GET_PRODUCTION_PLAN_BY_MO_ID_SUCCESS,
    payload: payload,
  }
}

/**
 * Get get production-plan by moId fail action
 * @returns {object}
 */
export function getProductionPlanByMoIdFail() {
  return {
    type: GET_PRODUCTION_PLAN_BY_MO_ID_FAIL,
  }
}

/**
 * Get production plan detail start action
 * @param {int} params
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getProductionPlanDetail(params, onSuccess, onError) {
  return {
    type: GET_PRODUCTION_PLAN_DETAIL_BY_PRODUCTION_PLAN_ID_START,
    payload: params,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get production plan detail success action
 * @param {*} payload
 * @returns {object}
 */
export function getProductionPlanDetailSuccess(payload) {
  return {
    type: GET_PRODUCTION_PLAN_DETAIL_BY_PRODUCTION_PLAN_ID_SUCCESS,
    payload: payload,
  }
}

/**
 * Get production plan detail fail action
 * @returns {object}
 */
export function getProductionPlanDetailFail() {
  return {
    type: GET_PRODUCTION_PLAN_DETAIL_BY_PRODUCTION_PLAN_ID_FAIL,
  }
}

export default {
  searchProductionQcPlan,
  searchProductionQcPlanSuccess,
  searchProductionQcPlanFail,
  createProductionQcPlan,
  createProductionQcPlanSuccess,
  createProductionQcPlanFail,
  getProductionQcPlanDetailById,
  getProductionQcPlanDetailByIdSuccess,
  getProductionQcPlanDetailByIdFail,
  updateProductionQcPlan,
  updateProductionQcPlanSuccess,
  updateProductionQcPlanFail,
  deleteProductionQcPlan,
  deleteProductionQcPlanSuccess,
  deleteProductionQcPlanFail,
  confirmProductionQcPlan,
  confirmProductionQcPlanSuccess,
  confirmProductionQcPlanFail,
  resetProductionQcPlanDetailState,
  getInputMo,
  getInputMoSuccess,
  getInputMoFail,
  getOutputMo,
  getOutputMoSuccess,
  getOutputMoFail,
  getProductionPlanByMoId,
  getProductionPlanByMoIdSuccess,
  getProductionPlanByMoIdFail,
  getProductionPlanDetail,
  getProductionPlanDetailSuccess,
  getProductionPlanDetailFail,
}
