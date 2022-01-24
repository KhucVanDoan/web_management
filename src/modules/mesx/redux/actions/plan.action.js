export const SEARCH_PLANS_START = 'SEARCH_PLANS_START'
export const SEARCH_PLANS_SUCCESS = 'SEARCH_PLANS_SUCCESS'
export const SEARCH_PLANS_FAILED = 'SEARCH_PLANS_FAILED'

export const CREATE_PLAN_START = 'CREATE_PLAN_START'
export const CREATE_PLAN_SUCCESS = 'CREATE_PLAN_SUCCESS'
export const CREATE_PLAN_FAILED = 'CREATE_PLAN_FAILED'

export const UPDATE_PLAN_START = 'UPDATE_PLAN_START'
export const UPDATE_PLAN_SUCCESS = 'UPDATE_PLAN_SUCCESS'
export const UPDATE_PLAN_FAILED = 'UPDATE_PLAN_FAILED'

export const DELETE_PLAN_START = 'DELETE_PLAN_START'
export const DELETE_PLAN_SUCCESS = 'DELETE_PLAN_SUCCESS'
export const DELETE_PLAN_FAILED = 'DELETE_PLAN_FAILED'

export const GET_PLAN_DETAILS_START = 'GET_PLAN_DETAILS_START'
export const GET_PLAN_DETAILS_SUCCESS = 'GET_PLAN_DETAILS_SUCCESS'
export const GET_PLAN_DETAILS_FAILED = 'GET_PLAN_DETAILS_FAILED'

export const GET_MO_BY_PLAN_START = 'GET_MO_BY_PLAN_START'
export const GET_MO_BY_PLAN_SUCCESS = 'GET_MO_BY_PLAN_SUCCESS'
export const GET_MO_BY_PLAN_FAILED = 'GET_MO_BY_PLAN_FAILED'

export const CONFIRM_PLAN_START = 'CONFIRM_PLAN_START'
export const CONFIRM_PLAN_SUCCESS = 'CONFIRM_PLAN_SUCCESS'
export const CONFIRM_PLAN_FAILED = 'CONFIRM_PLAN_FAILED'

/**
 * Search plan
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchPlans(payload, onSuccess, onError) {
  return {
    type: SEARCH_PLANS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search plan success action
 * @param {*} payload
 * @returns {object}
 */
export function searchPlansSuccess(payload) {
  return {
    type: SEARCH_PLANS_SUCCESS,
    payload: payload,
  }
}

/**
 * Search plan failed action
 * @returns {object}
 */
export function searchPlansFailed() {
  return {
    type: SEARCH_PLANS_FAILED,
  }
}

/**
 * Create plan
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createPlan(payload, onSuccess, onError) {
  return {
    type: CREATE_PLAN_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Create plan success action
 * @param {*} payload
 * @returns {object}
 */
export function createPlanSuccess(payload) {
  return {
    type: CREATE_PLAN_SUCCESS,
    payload: payload,
  }
}

/**
 * Create plan failed action
 * @returns {object}
 */
export function createPlanFailed() {
  return {
    type: CREATE_PLAN_FAILED,
  }
}

/**
 * Update plan
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updatePlan(payload, onSuccess, onError) {
  return {
    type: UPDATE_PLAN_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Update plan success action
 * @param {*} payload
 * @returns {object}
 */
export function updatePlanSuccess(payload) {
  return {
    type: UPDATE_PLAN_SUCCESS,
    payload: payload,
  }
}

/**
 * Update plan failed action
 * @returns {object}
 */
export function updatePlanFailed() {
  return {
    type: UPDATE_PLAN_FAILED,
  }
}
/**
 * Delete plan
 * @param {int} planId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deletePlan(planId, onSuccess, onError) {
  return {
    type: DELETE_PLAN_START,
    payload: planId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete plan success action
 * @param {*} payload
 * @returns {object}
 */
export function deletePlanSuccess(payload) {
  return {
    type: DELETE_PLAN_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete plan failed action
 * @returns {object}
 */
export function deletePlanFailed() {
  return {
    type: DELETE_PLAN_FAILED,
  }
}

/**
 * Get plan details
 * @param {int} planId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getPlanDetailsById(planId, onSuccess, onError) {
  return {
    type: GET_PLAN_DETAILS_START,
    payload: planId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get plan details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getPlanDetailsByIdSuccess(payload) {
  return {
    type: GET_PLAN_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get plan details by id failed action
 * @returns {object}
 */
export function getPlanDetailsByIdFailed() {
  return {
    type: GET_PLAN_DETAILS_FAILED,
  }
}

/**
 * Search get boq by plan action
 * @param {*} payload
 * @returns {object}
 */
export function getMoByPlanId(payload, onSuccess, onError) {
  return {
    type: GET_MO_BY_PLAN_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search get boq by plan success action
 * @param {*} payload
 * @returns {object}
 */
export function getMoByPlanIdSuccess(payload) {
  return {
    type: GET_MO_BY_PLAN_SUCCESS,
    payload: payload,
  }
}

/**
 * Search get boq by plan action
 * @returns {object}
 */
export function getMoByPlanIdFailed() {
  return {
    type: GET_MO_BY_PLAN_FAILED,
  }
}

/**
 * confirm plan
 * @param {*} payload
 * @returns {object}
 */
export function confirmPlanById(payload, onSuccess, onError) {
  return {
    type: CONFIRM_PLAN_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * confirm plan success
 * @param {*} payload
 * @returns {object}
 */
export function confirmPlanByIdSuccess(payload) {
  return {
    type: CONFIRM_PLAN_SUCCESS,
    payload: payload,
  }
}

/**
 * confirm plan failed
 * @returns {object}
 */
export function confirmPlanByIdFailed() {
  return {
    type: CONFIRM_PLAN_FAILED,
  }
}

export default {
  searchPlans,
  searchPlansSuccess,
  searchPlansFailed,
  createPlan,
  createPlanSuccess,
  createPlanFailed,
  updatePlan,
  updatePlanSuccess,
  updatePlanFailed,
  deletePlan,
  deletePlanSuccess,
  deletePlanFailed,
  getPlanDetailsById,
  getPlanDetailsByIdSuccess,
  getPlanDetailsByIdFailed,
  getMoByPlanId,
  getMoByPlanIdSuccess,
  getMoByPlanIdFailed,
  confirmPlanById,
  confirmPlanByIdSuccess,
  confirmPlanByIdFailed,
}
