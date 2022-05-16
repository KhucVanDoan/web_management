export const SEARCH_WORK_CENTER_PLAN_START =
  'MESX_SEARCH_WORK_CENTER_PLAN_START'
export const SEARCH_WORK_CENTER_PLAN_SUCCESS =
  'MESX_SEARCH_WORK_CENTER_PLAN_SUCCESS'
export const SEARCH_WORK_CENTER_PLAN_FAILED =
  'MESX_SEARCH_WORK_CENTER_PLAN_FAILED'

export const CREATE_WORK_CENTER_PLAN_START =
  'MESX_CREATE_WORK_CENTER_PLAN_START'
export const CREATE_WORK_CENTER_PLAN_SUCCESS =
  'MESX_CREATE_WORK_CENTER_PLAN_SUCCESS'
export const CREATE_WORK_CENTER_PLAN_FAILED =
  'MESX_CREATE_WORK_CENTER_PLAN_FAILED'

export const UPDATE_WORK_CENTER_PLAN_START =
  'MESX_UPDATE_WORK_CENTER_PLAN_START'
export const UPDATE_WORK_CENTER_PLAN_SUCCESS =
  'MESX_UPDATE_WORK_CENTER_PLAN_SUCCESS'
export const UPDATE_WORK_CENTER_PLAN_FAILED =
  'MESX_UPDATE_WORK_CENTER_PLAN_FAILED'

export const DELETE_WORK_CENTER_PLAN_START =
  'MESX_DELETE_WORK_CENTER_PLAN_START'
export const DELETE_WORK_CENTER_PLAN_SUCCESS =
  'MESX_DELETE_WORK_CENTER_PLAN_SUCCESS'
export const DELETE_WORK_CENTER_PLAN_FAILED =
  'MESX_DELETE_WORK_CENTER_PLAN_FAILED'

export const GET_WORK_CENTER_PLAN_DETAILS_START =
  'MESX_GET_WORK_CENTER_PLAN_DETAILS_START'
export const GET_WORK_CENTER_PLAN_DETAILS_SUCCESS =
  'MESX_GET_WORK_CENTER_PLAN_DETAILS_SUCCESS'
export const GET_WORK_CENTER_PLAN_DETAILS_FAILED =
  'MESX_GET_WORK_CENTER_PLAN_DETAILS_FAILED'

export const GENERATE_WORK_CENTER_PLAN_START =
  'MESX_GENERATE_WORK_CENTER_PLAN_START'
export const GENERATE_WORK_CENTER_PLAN_SUCCESS =
  'MESX_GENERATE_WORK_CENTER_PLAN_SUCCESS'
export const GENERATE_WORK_CENTER_PLAN_FAILED =
  'MESX_GENERATE_WORK_CENTER_PLAN_FAILED'

export const CONFIRM_WORK_CENTER_PLAN_START =
  'MESX_CONFIRM_WORK_CENTER_PLAN_START'
export const CONFIRM_WORK_CENTER_PLAN_SUCCESS =
  'MESX_CONFIRM_WORK_CENTER_PLAN_SUCCESS'
export const CONFIRM_WORK_CENTER_PLAN_FAILED =
  'MESX_CONFIRM_WORK_CENTER_PLAN_FAILED'

/**
 * Search work center
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchWorkCenterPlan(payload, onSuccess, onError) {
  return {
    type: SEARCH_WORK_CENTER_PLAN_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search work center success action
 * @param {*} payload
 * @returns {object}
 */
export function searchWorkCenterPlanSuccess(payload) {
  return {
    type: SEARCH_WORK_CENTER_PLAN_SUCCESS,
    payload: payload,
  }
}

/**
 * Search work center failed action
 * @returns {object}
 */
export function searchWorkCenterPlanFailed() {
  return {
    type: SEARCH_WORK_CENTER_PLAN_FAILED,
  }
}

/**
 * Create work center
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createWorkCenterPlan(payload, onSuccess, onError) {
  return {
    type: CREATE_WORK_CENTER_PLAN_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Create work center success action
 * @param {*} payload
 * @returns {object}
 */
export function createWorkCenterPlanSuccess(payload) {
  return {
    type: CREATE_WORK_CENTER_PLAN_SUCCESS,
    payload: payload,
  }
}

/**
 * Create work center failed action
 * @returns {object}
 */
export function createWorkCenterPlanFailed() {
  return {
    type: CREATE_WORK_CENTER_PLAN_FAILED,
  }
}

/**
 * Update WorkCenterPlan
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateWorkCenterPlan(payload, onSuccess, onError) {
  return {
    type: UPDATE_WORK_CENTER_PLAN_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Update WorkCenterPlan success action
 * @param {*} payload
 * @returns {object}
 */
export function updateWorkCenterPlanSuccess(payload) {
  return {
    type: UPDATE_WORK_CENTER_PLAN_SUCCESS,
    payload: payload,
  }
}

/**
 * Update WorkCenterPlan failed action
 * @returns {object}
 */
export function updateWorkCenterPlanFailed() {
  return {
    type: UPDATE_WORK_CENTER_PLAN_FAILED,
  }
}
/**
 * Delete WorkCenterPlan
 * @param {int} WorkCenterPlanId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteWorkCenterPlan(WorkCenterPlanId, onSuccess, onError) {
  return {
    type: DELETE_WORK_CENTER_PLAN_START,
    payload: WorkCenterPlanId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete WorkCenterPlan success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteWorkCenterPlanSuccess(payload) {
  return {
    type: DELETE_WORK_CENTER_PLAN_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete WorkCenterPlan failed action
 * @returns {object}
 */
export function deleteWorkCenterPlanFailed() {
  return {
    type: DELETE_WORK_CENTER_PLAN_FAILED,
  }
}

/**
 * Get WorkCenterPlan detail
 * @param {int} WorkCenterPlanId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function geWorkCenterPlanDetailById(
  WorkCenterPlanId,
  onSuccess,
  onError,
) {
  return {
    type: GET_WORK_CENTER_PLAN_DETAILS_START,
    payload: WorkCenterPlanId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get WorkCenterPlan detail by id success actio
 * @param {*} payload
 * @returns {object}
 */
export function getWorkCenterPlanDetailByIdSuccess(payload) {
  return {
    type: GET_WORK_CENTER_PLAN_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get WorkCenterPlan detail by id failed action
 * @returns {object}
 */
export function getWorkCenterPlanDetailByIdFailed() {
  return {
    type: GET_WORK_CENTER_PLAN_DETAILS_FAILED,
  }
}

/**
 * Get WorkCenterPlan detail
 * @param {int} WorkCenterPlanId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function generateWorkCenterPlan(WorkCenterPlanId, onSuccess, onError) {
  return {
    type: GENERATE_WORK_CENTER_PLAN_START,
    payload: WorkCenterPlanId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get WorkCenterPlan detail by id success actio
 * @param {*} payload
 * @returns {object}
 */
export function generateWorkCenterPlanSuccess(payload) {
  return {
    type: GENERATE_WORK_CENTER_PLAN_SUCCESS,
    payload: payload,
  }
}

/**
 * Get WorkCenterPlan detail by id failed action
 * @returns {object}
 */
export function generateWorkCenterPlanFailed() {
  return {
    type: GENERATE_WORK_CENTER_PLAN_FAILED,
  }
}
/**
 * Get confirm work center plan
 * @param {int} MOId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function confirmWorkCenterPlan(MOId, onSuccess, onError) {
  return {
    type: CONFIRM_WORK_CENTER_PLAN_START,
    payload: MOId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get confirm work center plan by id success action
 * @param {*} payload
 * @returns {object}
 */
export function confirmWorkCenterPlanSuccess(payload) {
  return {
    type: CONFIRM_WORK_CENTER_PLAN_SUCCESS,
    payload: payload,
  }
}

/**
 * Get confirm work center plan by id failed action
 * @returns {object}
 */
export function confirmWorkCenterPlanFailed() {
  return {
    type: CONFIRM_WORK_CENTER_PLAN_FAILED,
  }
}
export default {
  searchWorkCenterPlan,
  searchWorkCenterPlanSuccess,
  searchWorkCenterPlanFailed,
  createWorkCenterPlan,
  createWorkCenterPlanSuccess,
  createWorkCenterPlanFailed,
  updateWorkCenterPlan,
  updateWorkCenterPlanSuccess,
  updateWorkCenterPlanFailed,
  deleteWorkCenterPlan,
  deleteWorkCenterPlanSuccess,
  deleteWorkCenterPlanFailed,
  geWorkCenterPlanDetailById,
  getWorkCenterPlanDetailByIdFailed,
  getWorkCenterPlanDetailByIdSuccess,
  generateWorkCenterPlan,
  generateWorkCenterPlanSuccess,
  generateWorkCenterPlanFailed,
  confirmWorkCenterPlan,
  confirmWorkCenterPlanSuccess,
  confirmWorkCenterPlanFailed,
}
