//@Define Action
export const SEARCH_OUTPUT_QUALITY_CONTROL_PLAN_START =
  'SEARCH_OUTPUT_QUALITY_CONTROL_PLAN_START'
export const SEARCH_OUTPUT_QUALITY_CONTROL_PLAN_SUCCESS =
  'SEARCH_OUTPUT_QUALITY_CONTROL_PLAN_SUCCESS'
export const SEARCH_OUTPUT_QUALITY_CONTROL_PLAN_FAIL =
  'SEARCH_OUTPUT_QUALITY_CONTROL_PLAN_FAIL'
// Action: Get List
export const CREATE_OUTPUT_QUALITY_CONTROL_PLAN_START =
  'CREATE_OUTPUT_QUALITY_CONTROL_PLAN_START'
export const CREATE_OUTPUT_QUALITY_CONTROL_PLAN_SUCCESS =
  'CREATE_OUTPUT_QUALITY_CONTROL_PLAN_SUCCESS'
export const CREATE_OUTPUT_QUALITY_CONTROL_PLAN_FAIL =
  'CREATE_OUTPUT_QUALITY_CONTROL_PLAN_FAIL'
// Action: Update
export const UPDATE_OUTPUT_QUALITY_CONTROL_PLAN_START =
  'UPDATE_OUTPUT_QUALITY_CONTROL_PLAN_START'
export const UPDATE_OUTPUT_QUALITY_CONTROL_PLAN_SUCCESS =
  'UPDATE_OUTPUT_QUALITY_CONTROL_PLAN_SUCCESS'
export const UPDATE_OUTPUT_QUALITY_CONTROL_PLAN_FAIL =
  'UPDATE_OUTPUT_QUALITY_CONTROL_PLAN_FAIL'
// Action: Delete
export const DELETE_OUTPUT_QUALITY_CONTROL_PLAN_START =
  'DELETE_OUTPUT_QUALITY_CONTROL_PLAN_START'
export const DELETE_OUTPUT_QUALITY_CONTROL_PLAN_SUCCESS =
  'DELETE_OUTPUT_QUALITY_CONTROL_PLAN_SUCCESS'
export const DELETE_OUTPUT_QUALITY_CONTROL_PLAN_FAIL =
  'DELETE_OUTPUT_QUALITY_CONTROL_PLAN_FAIL'
// Action: Get detail
export const GET_OUTPUT_QUALITY_CONTROL_PLAN_DETAIL_START =
  'GET_OUTPUT_QUALITY_CONTROL_PLAN_DETAIL_START'
export const GET_OUTPUT_QUALITY_CONTROL_PLAN_DETAIL_SUCCESS =
  'GET_OUTPUT_QUALITY_CONTROL_PLAN_DETAIL_SUCCESS'
export const GET_OUTPUT_QUALITY_CONTROL_PLAN_DETAIL_FAIL =
  'GET_OUTPUT_QUALITY_CONTROL_PLAN_DETAIL_FAIL'
// Action: Confirm
export const CONFIRM_OUTPUT_QUALITY_CONTROL_PLAN_START =
  'CONFIRM_OUTPUT_QUALITY_CONTROL_PLAN_START'
export const CONFIRM_OUTPUT_QUALITY_CONTROL_PLAN_SUCCESS =
  'CONFIRM_OUTPUT_QUALITY_CONTROL_PLAN_SUCCESS'
export const CONFIRM_OUTPUT_QUALITY_CONTROL_PLAN_FAIL =
  'CONFIRM_OUTPUT_QUALITY_CONTROL_PLAN_FAIL'
// Action: Get reset detail
export const RESET_OUTPUT_QUALITY_CONTROL_PLAN_DETAIL_STATE =
  'RESET_OUTPUT_QUALITY_CONTROL_PLAN_DETAIL_STATE'
//---Form: Action
// Action: Get output-order by stageQcValue
export const GET_OUTPUT_ORDER_BY_STAGE_QC_START =
  'GET_OUTPUT_ORDER_BY_STAGE_QC_START'
export const GET_OUTPUT_ORDER_BY_STAGE_QC_SUCCESS =
  'GET_OUTPUT_ORDER_BY_STAGE_QC_SUCCESS'
export const GET_OUTPUT_ORDER_BY_STAGE_QC_FAIL =
  'GET_OUTPUT_ORDER_BY_STAGE_QC_FAIL'
// Action: Get output-plan (MESX) by orderId
export const GET_OUTPUT_PLAN_BY_ORDER_ID_START =
  'GET_OUTPUT_PLAN_BY_ORDER_ID_START'
export const GET_OUTPUT_PLAN_BY_ORDER_ID_SUCCESS =
  'GET_OUTPUT_PLAN_BY_ORDER_ID_SUCCESS'
export const GET_OUTPUT_PLAN_BY_ORDER_ID_FAIL =
  'GET_OUTPUT_PLAN_BY_ORDER_ID_FAIL'

/**
 * Search output QC plan start action
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchOutputQcPlan(payload, onSuccess, onError) {
  return {
    type: SEARCH_OUTPUT_QUALITY_CONTROL_PLAN_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search output QC plan success action
 * @param {*} payload
 * @returns {object}
 */
export function searchOutputQcPlanSuccess(payload) {
  return {
    type: SEARCH_OUTPUT_QUALITY_CONTROL_PLAN_SUCCESS,
    payload: payload,
  }
}

/**
 * Search output QC plan fail action
 * @returns {object}
 */
export function searchOutputQcPlanFail() {
  return {
    type: SEARCH_OUTPUT_QUALITY_CONTROL_PLAN_FAIL,
  }
}

/**
 * Create output QC plan start action
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createOutputQcPlan(payload, onSuccess, onError) {
  return {
    type: CREATE_OUTPUT_QUALITY_CONTROL_PLAN_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Create output QC plan success action
 * @param {*} payload
 * @returns {object}
 */
export function createOutputQcPlanSuccess(payload) {
  return {
    type: CREATE_OUTPUT_QUALITY_CONTROL_PLAN_SUCCESS,
    payload: payload,
  }
}

/**
 * Create output QC plan fail action
 * @returns {object}
 */
export function createOutputQcPlanFail() {
  return {
    type: CREATE_OUTPUT_QUALITY_CONTROL_PLAN_FAIL,
  }
}

/**
 * Update output QC plan start action
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateOutputQcPlan(payload, onSuccess, onError) {
  return {
    type: UPDATE_OUTPUT_QUALITY_CONTROL_PLAN_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Update output QC plan success action
 * @param {*} payload
 * @returns {object}
 */
export function updateOutputQcPlanSuccess(payload) {
  return {
    type: UPDATE_OUTPUT_QUALITY_CONTROL_PLAN_SUCCESS,
    payload: payload,
  }
}

/**
 * Update output QC plan fail action
 * @returns {object}
 */
export function updateOutputQcPlanFail() {
  return {
    type: UPDATE_OUTPUT_QUALITY_CONTROL_PLAN_FAIL,
  }
}
/**
 * Delete output QC plan start action
 * @param {object} params
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteOutputQcPlan(params, onSuccess, onError) {
  return {
    type: DELETE_OUTPUT_QUALITY_CONTROL_PLAN_START,
    payload: params,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete output QC plan success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteOutputQcPlanSuccess(payload) {
  return {
    type: DELETE_OUTPUT_QUALITY_CONTROL_PLAN_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete output QC plan fail action
 * @returns {object}
 */
export function deleteOutputQcPlanFail() {
  return {
    type: DELETE_OUTPUT_QUALITY_CONTROL_PLAN_FAIL,
  }
}

/**
 * Get output QC plan detail start action
 * @param {object} params
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getOutputQcPlanDetailById(params, onSuccess, onError) {
  return {
    type: GET_OUTPUT_QUALITY_CONTROL_PLAN_DETAIL_START,
    payload: params,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get output QC plan detail success action
 * @param {*} payload
 * @returns {object}
 */
export function getOutputQcPlanDetailByIdSuccess(payload) {
  return {
    type: GET_OUTPUT_QUALITY_CONTROL_PLAN_DETAIL_SUCCESS,
    payload: payload,
  }
}

/**
 * Get output QC plan detail fail action
 * @returns {object}
 */
export function getOutputQcPlanDetailByIdFail() {
  return {
    type: GET_OUTPUT_QUALITY_CONTROL_PLAN_DETAIL_FAIL,
  }
}

/**
 * Get confirm output QC plan start action
 * @param {object} params
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function confirmOutputQcPlan(params, onSuccess, onError) {
  return {
    type: CONFIRM_OUTPUT_QUALITY_CONTROL_PLAN_START,
    payload: params,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get confirm output QC plan success action
 * @param {*} payload
 * @returns {object}
 */
export function confirmOutputQcPlanSuccess(payload) {
  return {
    type: CONFIRM_OUTPUT_QUALITY_CONTROL_PLAN_SUCCESS,
    payload: payload,
  }
}

/**
 * Get confirm output QC plan fail action
 * @returns {object}
 */
export function confirmOutputQcPlanFail() {
  return {
    type: CONFIRM_OUTPUT_QUALITY_CONTROL_PLAN_FAIL,
  }
}

/**
 * Reset detail state action
 * @returns {object}
 */
export function resetOutputQcPlanDetailState() {
  return {
    type: RESET_OUTPUT_QUALITY_CONTROL_PLAN_DETAIL_STATE,
  }
}

//--Form--
/**
 * Get get output-order by stageQcValue start action
 * @param {object} params
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getOutputOrderByStageQc(params, onSuccess, onError) {
  return {
    type: GET_OUTPUT_ORDER_BY_STAGE_QC_START,
    payload: params,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get get output-order by stageQcValue success action
 * @param {*} payload
 * @returns {object}
 */
export function getOutputOrderByStageQcSuccess(payload) {
  return {
    type: GET_OUTPUT_ORDER_BY_STAGE_QC_SUCCESS,
    payload: payload,
  }
}

/**
 * Get get output-order by stageQcValue fail action
 * @returns {object}
 */
export function getOutputOrderByStageQcFail() {
  return {
    type: GET_OUTPUT_ORDER_BY_STAGE_QC_FAIL,
  }
}

/**
 * Get get output-plan by orderId start action
 * @param {object} params
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getOutputPlanByOrderId(params, onSuccess, onError) {
  return {
    type: GET_OUTPUT_PLAN_BY_ORDER_ID_START,
    payload: params,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get get output-plan by orderId success action
 * @param {*} payload
 * @returns {object}
 */
export function getOutputPlanByOrderIdSuccess(payload) {
  return {
    type: GET_OUTPUT_PLAN_BY_ORDER_ID_SUCCESS,
    payload: payload,
  }
}

/**
 * Get get output-plan by orderId fail action
 * @returns {object}
 */
export function getOutputPlanByOrderIdFail() {
  return {
    type: GET_OUTPUT_PLAN_BY_ORDER_ID_FAIL,
  }
}

export default {
  searchOutputQcPlan,
  searchOutputQcPlanSuccess,
  searchOutputQcPlanFail,
  createOutputQcPlan,
  createOutputQcPlanSuccess,
  createOutputQcPlanFail,
  getOutputQcPlanDetailById,
  getOutputQcPlanDetailByIdSuccess,
  getOutputQcPlanDetailByIdFail,
  updateOutputQcPlan,
  updateOutputQcPlanSuccess,
  updateOutputQcPlanFail,
  deleteOutputQcPlan,
  deleteOutputQcPlanSuccess,
  deleteOutputQcPlanFail,
  confirmOutputQcPlan,
  confirmOutputQcPlanSuccess,
  confirmOutputQcPlanFail,
  resetOutputQcPlanDetailState,
  getOutputOrderByStageQc,
  getOutputOrderByStageQcSuccess,
  getOutputOrderByStageQcFail,
  getOutputPlanByOrderId,
  getOutputPlanByOrderIdSuccess,
  getOutputPlanByOrderIdFail,
}
