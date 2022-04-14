export const SEARCH_WORK_CENTER_QC_PLAN_START =
  'QMSX_SEARCH_WORK_CENTER_QC_PLAN_START'
export const SEARCH_WORK_CENTER_QC_PLAN_SUCCESS =
  'QMSX_SEARCH_WORK_CENTER_QC_PLAN_SUCCESS'
export const SEARCH_WORK_CENTER_QC_PLAN_FAIL =
  'QMSX_SEARCH_WORK_CENTER_QC_PLAN_FAIL'

//work center plan
export const GET_WORK_CENTER_QC_PLAN_DETAIL_START =
  'QMSX_GET_WORK_CENTER_QC_PLAN_DETAIL_START'
export const GET_WORK_CENTER_QC_PLAN_DETAIL_SUCCESS =
  'QMSX_GET_WORK_CENTER_QC_PLAN_DETAIL_SUCCESS'
export const GET_WORK_CENTER_QC_PLAN_DETAIL_FAIL =
  'QMSX_GET_WORK_CENTER_QC_PLAN_DETAIL_FAIL'

//work center plan
export const UPDATE_WORK_CENTER_QC_PLAN_START =
  'QMSX_UPDATE_WORK_CENTER_QC_PLAN_START'
export const UPDATE_WORK_CENTER_QC_PLAN_SUCCESS =
  'QMSX_UPDATE_WORK_CENTER_QC_PLAN_SUCCESS'
export const UPDATE_WORK_CENTER_QC_PLAN_FAIL =
  'QMSX_UPDATE_WORK_CENTER_QC_PLAN_FAIL'

// Action: reset detail
export const RESET_WORK_CENTER_QC_PLAN_DETAIL_STATE =
  'QMSX_RESET_WORK_CENTER_QC_PLAN_DETAIL_STATE'

/**
 * Search work center qc plan
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchWorkCenterQualityControlPlan(
  payload,
  onSuccess,
  onError,
) {
  return {
    type: SEARCH_WORK_CENTER_QC_PLAN_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search work center qc plan success action
 * @param {*} payload
 * @returns {object}
 */
export function searchWorkCenterQualityControlPlanSuccess(payload) {
  return {
    type: SEARCH_WORK_CENTER_QC_PLAN_SUCCESS,
    payload: payload,
  }
}

/**
 * Search work center qc plan fail action
 * @returns {object}
 */
export function searchWorkCenterQualityControlPlanFail() {
  return {
    type: SEARCH_WORK_CENTER_QC_PLAN_FAIL,
  }
}

/**
 * ACTION: Get work center plan QC detail
 * @param {object} params
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getWorkCenterQualityControlPlanDetail(
  params,
  onSuccess,
  onError,
) {
  return {
    type: GET_WORK_CENTER_QC_PLAN_DETAIL_START,
    payload: params,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * ACTION: Get work center plan detail
 * @param {*} payload
 * @returns {object}
 */
export function getWorkCenterQualityControlPlanDetailSuccess(payload) {
  return {
    type: GET_WORK_CENTER_QC_PLAN_DETAIL_SUCCESS,
    payload: payload,
  }
}

/**
 * ACTION: Get work center plan detail
 * @returns {object}
 */
export function getWorkCenterQualityControlPlanDetailFail() {
  return {
    type: GET_WORK_CENTER_QC_PLAN_DETAIL_FAIL,
  }
}

/**
 *
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateWorkCenterQualityControlPlan(
  payload,
  onSuccess,
  onError,
) {
  return {
    type: UPDATE_WORK_CENTER_QC_PLAN_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Update quality plan success action
 * @param {*} payload
 * @returns {object}
 */
export function updateWorkCenterQualityControlPlanSuccess(payload) {
  return {
    type: UPDATE_WORK_CENTER_QC_PLAN_SUCCESS,
    payload: payload,
  }
}

/**
 * Update quality plan failed action
 * @returns {object}
 */
export function updateWorkCenterQualityControlPlanFail() {
  return {
    type: UPDATE_WORK_CENTER_QC_PLAN_FAIL,
  }
}

/**
 * Reset state action
 * @returns {object}
 */
export function resetWorkCenterQualityControlPlanDetailState() {
  return {
    type: RESET_WORK_CENTER_QC_PLAN_DETAIL_STATE,
  }
}

export default {
  searchWorkCenterQualityControlPlan,
  searchWorkCenterQualityControlPlanSuccess,
  searchWorkCenterQualityControlPlanFail,
  getWorkCenterQualityControlPlanDetail,
  getWorkCenterQualityControlPlanDetailSuccess,
  getWorkCenterQualityControlPlanDetailFail,
  updateWorkCenterQualityControlPlan,
  updateWorkCenterQualityControlPlanSuccess,
  updateWorkCenterQualityControlPlanFail,
  resetWorkCenterQualityControlPlanDetailState,
}
