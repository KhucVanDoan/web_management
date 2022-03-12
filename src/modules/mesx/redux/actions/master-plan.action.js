export const SEARCH_MASTER_PLANS_START = 'SEARCH_MASTER_PLANS_START'
export const SEARCH_MASTER_PLANS_SUCCESS = 'SEARCH_MASTER_PLANS_SUCCESS'
export const SEARCH_MASTER_PLANS_FAILED = 'SEARCH_MASTER_PLANS_FAILED'

export const GET_MASTER_PLAN_DETAILS_START = 'GET_MASTER_PLAN_DETAILS_START'
export const GET_MASTER_PLAN_DETAILS_SUCCESS = 'GET_MASTER_PLAN_DETAILS_SUCCESS'
export const GET_MASTER_PLAN_DETAILS_FAILED = 'GET_MASTER_PLAN_DETAILS_FAILED'

export const CREATE_MASTER_PLAN_START = 'CREATE_MASTER_PLAN_START'
export const CREATE_MASTER_PLAN_SUCCESS = 'CREATE_MASTER_PLAN_SUCCESS'
export const CREATE_MASTER_PLAN_FAILED = 'CREATE_MASTER_PLAN_FAILED'

export const GET_MODERATION_SUGGEST_SPREAD_START =
  'GET_MODERATION_SUGGEST_SPREAD_START'
export const GET_MODERATION_SUGGEST_SPREAD_SUCCESS =
  'GET_MODERATION_SUGGEST_SPREAD_SUCCESS'
export const GET_MODERATION_SUGGEST_SPREAD_FAILED =
  'GET_MODERATION_SUGGEST_SPREAD_FAILED'

export const SUBMIT_MODERATION_INPUT_START = 'SUBMIT_MODERATION_INPUT_START'
export const SUBMIT_MODERATION_INPUT_SUCCESS = 'SUBMIT_MODERATION_INPUT_SUCCESS'
export const SUBMIT_MODERATION_INPUT_FAILED = 'SUBMIT_MODERATION_INPUT_FAILED'

export const RESET_MODERATION_SUGGEST_SPREAD = 'RESET_MODERATION_SUGGEST_SPREAD'
export const RESET_MASTER_PLAN_DETAIL = 'RESET_MASTER_PLAN_DETAIL'

export const EXTEND_DEADLINE_START = 'EXTEND_DEADLINE_START'
export const EXTEND_DEADLINE_SUCCESS = 'EXTEND_DEADLINE_SUCCESS'
export const EXTEND_DEADLINE_FAILED = 'EXTEND_DEADLINE_FAILED'

export const GET_PRODUCING_STEP_DETAIL_START = 'GET_PRODUCING_STEP_DETAIL_START'
export const GET_PRODUCING_STEP_DETAIL_SUCCESS =
  'GET_PRODUCING_STEP_DETAIL_SUCCESS'
export const GET_PRODUCING_STEP_DETAIL_FAILED =
  'GET_PRODUCING_STEP_DETAIL_FAILED'

export const APPROVE_MASTER_PLAN = 'APPROVE_MASTER_PLAN'
export const APPROVE_MASTER_PLAN_SUCCESS = 'APPROVE_MASTER_PLAN_SUCCESS'
export const APPROVE_MASTER_PLAN_FAILED = 'APPROVE_MASTER_PLAN_FAILED'

export const REJECT_MASTER_PLAN = 'REJECT_MASTER_PLAN'
export const REJECT_MASTER_PLAN_SUCCESS = 'REJECT_MASTER_PLAN_SUCCESS'
export const REJECT_MASTER_PLAN_FAILED = 'REJECT_MASTER_PLAN_FAILED'

export const DELETE_MASTER_PLAN_START = 'DELETE_MASTER_PLAN_START'
export const DELETE_MASTER_PLAN_SUCCESS = 'DELETE_MASTER_PLAN_SUCCESS'
export const DELETE_MASTER_PLAN_FAILED = 'DELETE_MASTER_PLAN_FAILED'

/**
 * Search master plans
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchMasterPlans(payload, onSuccess, onError) {
  return {
    type: SEARCH_MASTER_PLANS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search master plan success action
 * @param {*} payload
 * @returns {object}
 */
export function searchMasterPlansSuccess(payload) {
  return {
    type: SEARCH_MASTER_PLANS_SUCCESS,
    payload: payload,
  }
}

/**
 * Search master plan failed action
 * @returns {object}
 */
export function searchMasterPlansFailed() {
  return {
    type: SEARCH_MASTER_PLANS_FAILED,
  }
}

/**
 * Get master plan details
 * @param {int} masterPlanId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getMasterPlanDetailsById(masterPlanId, onSuccess, onError) {
  return {
    type: GET_MASTER_PLAN_DETAILS_START,
    payload: masterPlanId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get master plan details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getMasterPlanDetailsByIdSuccess(payload) {
  return {
    type: GET_MASTER_PLAN_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get master plan details by id failed action
 * @returns {object}
 */
export function getMasterPlanDetailsByIdFailed() {
  return {
    type: GET_MASTER_PLAN_DETAILS_FAILED,
  }
}

/**
 * Get moderation suggest spread
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getModerationSuggestSpread(payload, onSuccess, onError) {
  return {
    type: GET_MODERATION_SUGGEST_SPREAD_START,
    payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get moderation suggest spread success action
 * @param {*} payload
 * @returns {object}
 */
export function getModerationSuggestSpreadSuccess(payload) {
  return {
    type: GET_MODERATION_SUGGEST_SPREAD_SUCCESS,
    payload: payload,
  }
}

/**
 * Get moderation suggest spread failed action
 * @returns {object}
 */
export function getModerationSuggestSpreadFailed() {
  return {
    type: GET_MODERATION_SUGGEST_SPREAD_FAILED,
  }
}

/**
 * Submit moderation input
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function submitModerationInput(payload, onSuccess, onError) {
  return {
    type: SUBMIT_MODERATION_INPUT_START,
    payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Submit moderation input success action
 * @param {*} payload
 * @returns {object}
 */
export function submitModerationInputSuccess(payload) {
  return {
    type: SUBMIT_MODERATION_INPUT_SUCCESS,
    payload: payload,
  }
}

/**
 * Submit moderation input failed action
 * @returns {object}
 */
export function submitModerationInputFailed() {
  return {
    type: SUBMIT_MODERATION_INPUT_FAILED,
  }
}

/**
 * Create plan
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createMasterPlan(payload, onSuccess, onError) {
  return {
    type: CREATE_MASTER_PLAN_START,
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
export function createMasterPlanSuccess(payload) {
  return {
    type: CREATE_MASTER_PLAN_SUCCESS,
    payload: payload,
  }
}

/**
 * Create plan failed action
 * @returns {object}
 */
export function createMasterPlanFailed() {
  return {
    type: CREATE_MASTER_PLAN_FAILED,
  }
}

/**
 * Extend deadline
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function extendDeadline(payload, onSuccess, onError) {
  return {
    type: EXTEND_DEADLINE_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Extend deadline success action
 * @param {*} payload
 * @returns {object}
 */
export function extendDeadlineSuccess(payload) {
  return {
    type: EXTEND_DEADLINE_SUCCESS,
    payload: payload,
  }
}

/**
 * Extend deadline failed action
 * @returns {object}
 */
export function extendDeadlineFailed() {
  return {
    type: EXTEND_DEADLINE_FAILED,
  }
}

export function resetModerationSuggestSpread() {
  return {
    type: RESET_MODERATION_SUGGEST_SPREAD,
  }
}

export function resetMasterPlanDetails() {
  return {
    type: RESET_MASTER_PLAN_DETAIL,
  }
}

/**
 * Get producing step detail
 * @param {string} itemProducingStepIds
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getProducingStepDetail(
  itemProducingStepIds,
  onSuccess,
  onError,
) {
  return {
    type: GET_PRODUCING_STEP_DETAIL_START,
    payload: itemProducingStepIds,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get producing step detail success action
 * @param {*} payload
 * @returns {object}
 */
export function getProducingStepDetailSuccess(payload) {
  return {
    type: GET_PRODUCING_STEP_DETAIL_SUCCESS,
    payload: payload,
  }
}

/**
 * Get producing step detail failed action
 * @returns {object}
 */
export function getProducingStepDetailFailed() {
  return {
    type: GET_PRODUCING_STEP_DETAIL_FAILED,
  }
}

export function approveMasterPlan(payload, onSuccess, onError) {
  return {
    type: APPROVE_MASTER_PLAN,
    payload,
    onSuccess,
    onError,
  }
}

export function approveMasterPlanSuccess(payload) {
  return {
    type: APPROVE_MASTER_PLAN_SUCCESS,
    payload,
  }
}

export function approveMasterPlanFailed() {
  return {
    type: APPROVE_MASTER_PLAN_FAILED,
  }
}

export function rejectMasterPlan(payload, onSuccess, onError) {
  return {
    type: REJECT_MASTER_PLAN,
    payload,
    onSuccess,
    onError,
  }
}

export function rejectMasterPlanSuccess(payload) {
  return {
    type: REJECT_MASTER_PLAN_SUCCESS,
    payload,
  }
}

export function rejectMasterPlanFailed() {
  return {
    type: REJECT_MASTER_PLAN_FAILED,
  }
}

export function deleteMasterPlan(id, onSuccess, onError) {
  return {
    type: DELETE_MASTER_PLAN_START,
    payload: id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function deleteMasterPlanSuccess(payload) {
  return {
    type: DELETE_MASTER_PLAN_SUCCESS,
    payload: payload,
  }
}

export function deleteMasterPlanFailed() {
  return {
    type: DELETE_MASTER_PLAN_FAILED,
  }
}

export default {
  approveMasterPlan,
  approveMasterPlanSuccess,
  approveMasterPlanFailed,
  rejectMasterPlan,
  rejectMasterPlanSuccess,
  rejectMasterPlanFailed,
  searchMasterPlans,
  searchMasterPlansSuccess,
  searchMasterPlansFailed,
  getMasterPlanDetailsById,
  getMasterPlanDetailsByIdSuccess,
  getMasterPlanDetailsByIdFailed,
  getModerationSuggestSpread,
  getModerationSuggestSpreadSuccess,
  getModerationSuggestSpreadFailed,
  submitModerationInput,
  submitModerationInputSuccess,
  submitModerationInputFailed,
  createMasterPlan,
  createMasterPlanSuccess,
  createMasterPlanFailed,
  resetModerationSuggestSpread,
  resetMasterPlanDetails,
  extendDeadline,
  extendDeadlineSuccess,
  extendDeadlineFailed,
  getProducingStepDetail,
  getProducingStepDetailSuccess,
  getProducingStepDetailFailed,
  deleteMasterPlan,
  deleteMasterPlanFailed,
  deleteMasterPlanSuccess,
}
