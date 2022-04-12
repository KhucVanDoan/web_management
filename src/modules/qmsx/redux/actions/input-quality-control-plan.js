//@Define Action
export const SEARCH_INPUT_QUALITY_CONTROL_PLAN_START =
  'SEARCH_INPUT_QUALITY_CONTROL_PLAN_START'
export const SEARCH_INPUT_QUALITY_CONTROL_PLAN_SUCCESS =
  'SEARCH_INPUT_QUALITY_CONTROL_PLAN_SUCCESS'
export const SEARCH_INPUT_QUALITY_CONTROL_PLAN_FAIL =
  'SEARCH_INPUT_QUALITY_CONTROL_PLAN_FAIL'
// Action: Get List
export const CREATE_INPUT_QUALITY_CONTROL_PLAN_START =
  'CREATE_INPUT_QUALITY_CONTROL_PLAN_START'
export const CREATE_INPUT_QUALITY_CONTROL_PLAN_SUCCESS =
  'CREATE_INPUT_QUALITY_CONTROL_PLAN_SUCCESS'
export const CREATE_INPUT_QUALITY_CONTROL_PLAN_FAIL =
  'CREATE_INPUT_QUALITY_CONTROL_PLAN_FAIL'
// Action: Update
export const UPDATE_INPUT_QUALITY_CONTROL_PLAN_START =
  'UPDATE_INPUT_QUALITY_CONTROL_PLAN_START'
export const UPDATE_INPUT_QUALITY_CONTROL_PLAN_SUCCESS =
  'UPDATE_INPUT_QUALITY_CONTROL_PLAN_SUCCESS'
export const UPDATE_INPUT_QUALITY_CONTROL_PLAN_FAIL =
  'UPDATE_INPUT_QUALITY_CONTROL_PLAN_FAIL'
// Action: Delete
export const DELETE_INPUT_QUALITY_CONTROL_PLAN_START =
  'DELETE_INPUT_QUALITY_CONTROL_PLAN_START'
export const DELETE_INPUT_QUALITY_CONTROL_PLAN_SUCCESS =
  'DELETE_INPUT_QUALITY_CONTROL_PLAN_SUCCESS'
export const DELETE_INPUT_QUALITY_CONTROL_PLAN_FAIL =
  'DELETE_INPUT_QUALITY_CONTROL_PLAN_FAIL'
// Action: Get detail
export const GET_INPUT_QUALITY_CONTROL_PLAN_DETAIL_START =
  'GET_INPUT_QUALITY_CONTROL_PLAN_DETAIL_START'
export const GET_INPUT_QUALITY_CONTROL_PLAN_DETAIL_SUCCESS =
  'GET_INPUT_QUALITY_CONTROL_PLAN_DETAIL_SUCCESS'
export const GET_INPUT_QUALITY_CONTROL_PLAN_DETAIL_FAIL =
  'GET_INPUT_QUALITY_CONTROL_PLAN_DETAIL_FAIL'
// Action: Confirm
export const CONFIRM_INPUT_QUALITY_CONTROL_PLAN_START =
  'CONFIRM_INPUT_QUALITY_CONTROL_PLAN_START'
export const CONFIRM_INPUT_QUALITY_CONTROL_PLAN_SUCCESS =
  'CONFIRM_INPUT_QUALITY_CONTROL_PLAN_SUCCESS'
export const CONFIRM_INPUT_QUALITY_CONTROL_PLAN_FAIL =
  'CONFIRM_INPUT_QUALITY_CONTROL_PLAN_FAIL'
// Action: Get reset detail
export const RESET_INPUT_QUALITY_CONTROL_PLAN_DETAIL_STATE =
  'RESET_INPUT_QUALITY_CONTROL_PLAN_DETAIL_STATE'
//---Form: Action
// Action: Get input-order by stageQcValue
export const GET_INPUT_ORDER_BY_STAGE_QC_START =
  'GET_INPUT_ORDER_BY_STAGE_QC_START'
export const GET_INPUT_ORDER_BY_STAGE_QC_SUCCESS =
  'GET_INPUT_ORDER_BY_STAGE_QC_SUCCESS'
export const GET_INPUT_ORDER_BY_STAGE_QC_FAIL =
  'GET_INPUT_ORDER_BY_STAGE_QC_FAIL'
// Action: Get input-plan (MESX) by orderId
export const GET_INPUT_PLAN_BY_ORDER_ID_START =
  'GET_INPUT_PLAN_BY_ORDER_ID_START'
export const GET_INPUT_PLAN_BY_ORDER_ID_SUCCESS =
  'GET_INPUT_PLAN_BY_ORDER_ID_SUCCESS'
export const GET_INPUT_PLAN_BY_ORDER_ID_FAIL = 'GET_INPUT_PLAN_BY_ORDER_ID_FAIL'

/**
 * Search input QC plan start action
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchInputQcPlan(payload, onSuccess, onError) {
  return {
    type: SEARCH_INPUT_QUALITY_CONTROL_PLAN_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search input QC plan success action
 * @param {*} payload
 * @returns {object}
 */
export function searchInputQcPlanSuccess(payload) {
  return {
    type: SEARCH_INPUT_QUALITY_CONTROL_PLAN_SUCCESS,
    payload: payload,
  }
}

/**
 * Search input QC plan fail action
 * @returns {object}
 */
export function searchInputQcPlanFail() {
  return {
    type: SEARCH_INPUT_QUALITY_CONTROL_PLAN_FAIL,
  }
}

/**
 * Create input QC plan start action
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createInputQcPlan(payload, onSuccess, onError) {
  return {
    type: CREATE_INPUT_QUALITY_CONTROL_PLAN_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Create input QC plan success action
 * @param {*} payload
 * @returns {object}
 */
export function createInputQcPlanSuccess(payload) {
  return {
    type: CREATE_INPUT_QUALITY_CONTROL_PLAN_SUCCESS,
    payload: payload,
  }
}

/**
 * Create input QC plan fail action
 * @returns {object}
 */
export function createInputQcPlanFail() {
  return {
    type: CREATE_INPUT_QUALITY_CONTROL_PLAN_FAIL,
  }
}

/**
 * Update input QC plan start action
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateInputQcPlan(payload, onSuccess, onError) {
  return {
    type: UPDATE_INPUT_QUALITY_CONTROL_PLAN_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Update input QC plan success action
 * @param {*} payload
 * @returns {object}
 */
export function updateInputQcPlanSuccess(payload) {
  return {
    type: UPDATE_INPUT_QUALITY_CONTROL_PLAN_SUCCESS,
    payload: payload,
  }
}

/**
 * Update input QC plan fail action
 * @returns {object}
 */
export function updateInputQcPlanFail() {
  return {
    type: UPDATE_INPUT_QUALITY_CONTROL_PLAN_FAIL,
  }
}
/**
 * Delete input QC plan start action
 * @param {object} params
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteInputQcPlan(params, onSuccess, onError) {
  return {
    type: DELETE_INPUT_QUALITY_CONTROL_PLAN_START,
    payload: params,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete input QC plan success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteInputQcPlanSuccess(payload) {
  return {
    type: DELETE_INPUT_QUALITY_CONTROL_PLAN_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete input QC plan fail action
 * @returns {object}
 */
export function deleteInputQcPlanFail() {
  return {
    type: DELETE_INPUT_QUALITY_CONTROL_PLAN_FAIL,
  }
}

/**
 * Get input QC plan detail start action
 * @param {object} params
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getInputQcPlanDetailById(params, onSuccess, onError) {
  return {
    type: GET_INPUT_QUALITY_CONTROL_PLAN_DETAIL_START,
    payload: params,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get input QC plan detail success action
 * @param {*} payload
 * @returns {object}
 */
export function getInputQcPlanDetailByIdSuccess(payload) {
  return {
    type: GET_INPUT_QUALITY_CONTROL_PLAN_DETAIL_SUCCESS,
    payload: payload,
  }
}

/**
 * Get input QC plan detail fail action
 * @returns {object}
 */
export function getInputQcPlanDetailByIdFail() {
  return {
    type: GET_INPUT_QUALITY_CONTROL_PLAN_DETAIL_FAIL,
  }
}

/**
 * Get confirm input QC plan start action
 * @param {object} params
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function confirmInputQcPlan(params, onSuccess, onError) {
  return {
    type: CONFIRM_INPUT_QUALITY_CONTROL_PLAN_START,
    payload: params,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get confirm input QC plan success action
 * @param {*} payload
 * @returns {object}
 */
export function confirmInputQcPlanSuccess(payload) {
  return {
    type: CONFIRM_INPUT_QUALITY_CONTROL_PLAN_SUCCESS,
    payload: payload,
  }
}

/**
 * Get confirm input QC plan fail action
 * @returns {object}
 */
export function confirmInputQcPlanFail() {
  return {
    type: CONFIRM_INPUT_QUALITY_CONTROL_PLAN_FAIL,
  }
}

/**
 * Reset detail state action
 * @returns {object}
 */
export function resetInputQcPlanDetailState() {
  return {
    type: RESET_INPUT_QUALITY_CONTROL_PLAN_DETAIL_STATE,
  }
}

//--Form--
/**
 * Get get input-order by stageQcValue start action
 * @param {object} params
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getInputOrderByStageQc(params, onSuccess, onError) {
  return {
    type: GET_INPUT_ORDER_BY_STAGE_QC_START,
    payload: params,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get get input-order by stageQcValue success action
 * @param {*} payload
 * @returns {object}
 */
export function getInputOrderByStageQcSuccess(payload) {
  return {
    type: GET_INPUT_ORDER_BY_STAGE_QC_SUCCESS,
    payload: payload,
  }
}

/**
 * Get get input-order by stageQcValue fail action
 * @returns {object}
 */
export function getInputOrderByStageQcFail() {
  return {
    type: GET_INPUT_ORDER_BY_STAGE_QC_FAIL,
  }
}

/**
 * Get get input-plan by orderId start action
 * @param {object} params
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getInputPlanByOrderId(params, onSuccess, onError) {
  return {
    type: GET_INPUT_PLAN_BY_ORDER_ID_START,
    payload: params,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get get input-plan by orderId success action
 * @param {*} payload
 * @returns {object}
 */
export function getInputPlanByOrderIdSuccess(payload) {
  return {
    type: GET_INPUT_PLAN_BY_ORDER_ID_SUCCESS,
    payload: payload,
  }
}

/**
 * Get get input-plan by orderId fail action
 * @returns {object}
 */
export function getInputPlanByOrderIdFail() {
  return {
    type: GET_INPUT_PLAN_BY_ORDER_ID_FAIL,
  }
}

export default {
  searchInputQcPlan,
  searchInputQcPlanSuccess,
  searchInputQcPlanFail,
  createInputQcPlan,
  createInputQcPlanSuccess,
  createInputQcPlanFail,
  getInputQcPlanDetailById,
  getInputQcPlanDetailByIdSuccess,
  getInputQcPlanDetailByIdFail,
  updateInputQcPlan,
  updateInputQcPlanSuccess,
  updateInputQcPlanFail,
  deleteInputQcPlan,
  deleteInputQcPlanSuccess,
  deleteInputQcPlanFail,
  confirmInputQcPlan,
  confirmInputQcPlanSuccess,
  confirmInputQcPlanFail,
  resetInputQcPlanDetailState,
  getInputOrderByStageQc,
  getInputOrderByStageQcSuccess,
  getInputOrderByStageQcFail,
  getInputPlanByOrderId,
  getInputPlanByOrderIdSuccess,
  getInputPlanByOrderIdFail,
}
