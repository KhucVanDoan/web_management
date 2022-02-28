export const SEARCH_MASTER_PLANS_START = 'SEARCH_MASTER_PLANS_START'
export const SEARCH_MASTER_PLANS_SUCCESS = 'SEARCH_MASTER_PLANS_SUCCESS'
export const SEARCH_MASTER_PLANS_FAILED = 'SEARCH_MASTER_PLANS_FAILED'

export const GET_MASTER_PLAN_DETAILS_START = 'GET_MASTER_PLAN_DETAILS_START'
export const GET_MASTER_PLAN_DETAILS_SUCCESS = 'GET_MASTER_PLAN_DETAILS_SUCCESS'
export const GET_MASTER_PLAN_DETAILS_FAILED = 'GET_MASTER_PLAN_DETAILS_FAILED'

export const CREATE_MASTER_PLAN_START = 'CREATE_MASTER_PLAN_START'
export const CREATE_MASTER_PLAN_SUCCESS = 'CREATE_MASTER_PLAN_SUCCESS'
export const CREATE_MASTER_PLAN_FAILED = 'CREATE_MASTER_PLAN_FAILED'

export const GET_MODERATION_SUGGEST_SPREAD_START = 'GET_MODERATION_SUGGEST_SPREAD_START'
export const GET_MODERATION_SUGGEST_SPREAD_SUCCESS = 'GET_MODERATION_SUGGEST_SPREAD_SUCCESS'
export const GET_MODERATION_SUGGEST_SPREAD_FAILED = 'GET_MODERATION_SUGGEST_SPREAD_FAILED'

export const SUBMIT_MODERATION_INPUT_START = 'SUBMIT_MODERATION_INPUT_START'
export const SUBMIT_MODERATION_INPUT_SUCCESS = 'SUBMIT_MODERATION_INPUT_SUCCESS'
export const SUBMIT_MODERATION_INPUT_FAILED = 'SUBMIT_MODERATION_INPUT_FAILED'

export const RESET_MODERATION_SUGGEST_SPREAD = 'RESET_MODERATION_SUGGEST_SPREAD'

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
 * @param {int} masterPlanId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
 export function getModerationSuggestSpread(masterPlanId, onSuccess, onError) {
  return {
    type: GET_MODERATION_SUGGEST_SPREAD_START,
    payload: masterPlanId,
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

export function resetModerationSuggestSpread() {
  return {
    type: RESET_MODERATION_SUGGEST_SPREAD
  }
}

export default {
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
}
