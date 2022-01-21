export const SEARCH_PRODUCING_STEPS_START = 'SEARCH_PRODUCING_STEPS_START';
export const SEARCH_PRODUCING_STEPS_SUCCESS = 'SEARCH_PRODUCING_STEPS_SUCCESS';
export const SEARCH_PRODUCING_STEPS_FAILED = 'SEARCH_PRODUCING_STEPS_FAILED';

export const CREATE_PRODUCING_STEP_START = 'CREATE_PRODUCING_STEP_START';
export const CREATE_PRODUCING_STEP_SUCCESS = 'CREATE_PRODUCING_STEP_SUCCESS';
export const CREATE_PRODUCING_STEP_FAILED = 'CREATE_PRODUCING_STEP_FAILED';

export const UPDATE_PRODUCING_STEP_START = 'UPDATE_PRODUCING_STEP_START';
export const UPDATE_PRODUCING_STEP_SUCCESS = 'UPDATE_PRODUCING_STEP_SUCCESS';
export const UPDATE_PRODUCING_STEP_FAILED = 'UPDATE_PRODUCING_STEP_FAILED';

export const DELETE_PRODUCING_STEP_START = 'DELETE_PRODUCING_STEP_START';
export const DELETE_PRODUCING_STEP_SUCCESS = 'DELETE_PRODUCING_STEP_SUCCESS';
export const DELETE_PRODUCING_STEP_FAILED = 'DELETE_PRODUCING_STEP_FAILED';

export const GET_PRODUCING_STEP_DETAILS_START =
  'GET_PRODUCING_STEP_DETAILS_START';
export const GET_PRODUCING_STEP_DETAILS_SUCCESS =
  'GET_PRODUCING_STEP_DETAILS_SUCCESS';
export const GET_PRODUCING_STEP_DETAILS_FAILED =
  'GET_PRODUCING_STEP_DETAILS_FAILED';

export const GET_BY_ROUTING_VERSION_START = 'GET_BY_ROUTING_VERSION_START';
export const GET_BY_ROUTING_VERSION_SUCCESS = 'GET_BY_ROUTING_VERSION_SUCCESS';
export const GET_BY_ROUTING_VERSION_FAILED = 'GET_BY_ROUTING_VERSION_FAILED';

export const CONFIRM_PRODUCING_STEP_START = 'CONFIRM_PRODUCING_STEP_START';
export const CONFIRM_PRODUCING_STEP_SUCCESS = 'CONFIRM_PRODUCING_STEP_SUCCESS';
export const CONFIRM_PRODUCING_STEP_FAILED = 'CONFIRM_PRODUCING_STEP_FAILED';
/**
 * Search producing step
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchProducingSteps(payload, onSuccess, onError) {
  return {
    type: SEARCH_PRODUCING_STEPS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  };
}

/**
 * Search producing step success action
 * @param {*} payload
 * @returns {object}
 */
export function searchProducingStepsSuccess(payload) {
  return {
    type: SEARCH_PRODUCING_STEPS_SUCCESS,
    payload: payload,
  };
}

/**
 * Search producing step failed action
 * @returns {object}
 */
export function searchProducingStepsFailed() {
  return {
    type: SEARCH_PRODUCING_STEPS_FAILED,
  };
}

/**
 * Create producing step
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createProducingStep(payload, onSuccess, onError) {
  return {
    type: CREATE_PRODUCING_STEP_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  };
}

/**
 * Create producing step success action
 * @param {*} payload
 * @returns {object}
 */
export function createProducingStepSuccess(payload) {
  return {
    type: CREATE_PRODUCING_STEP_SUCCESS,
    payload: payload,
  };
}

/**
 * Create producing step failed action
 * @returns {object}
 */
export function createProducingStepFailed() {
  return {
    type: CREATE_PRODUCING_STEP_FAILED,
  };
}

/**
 * Update producing step
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateProducingStep(payload, onSuccess, onError) {
  return {
    type: UPDATE_PRODUCING_STEP_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  };
}
/**
 * Update producing step success action
 * @param {*} payload
 * @returns {object}
 */
export function updateProducingStepSuccess(payload) {
  return {
    type: UPDATE_PRODUCING_STEP_SUCCESS,
    payload: payload,
  };
}

/**
 * Update producing step failed action
 * @returns {object}
 */
export function updateProducingStepFailed() {
  return {
    type: UPDATE_PRODUCING_STEP_FAILED,
  };
}
/**
 * Delete producing step
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteProducingStep(payload, onSuccess, onError) {
  return {
    type: DELETE_PRODUCING_STEP_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  };
}

/**
 * Delete producing step success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteProducingStepSuccess(payload) {
  return {
    type: DELETE_PRODUCING_STEP_SUCCESS,
    payload: payload,
  };
}

/**
 * Delete producing step failed action
 * @returns {object}
 */
export function deleteProducingStepFailed() {
  return {
    type: DELETE_PRODUCING_STEP_FAILED,
  };
}

/**
 * Get producing step details
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getProducingStepDetailsById(payload, onSuccess, onError) {
  return {
    type: GET_PRODUCING_STEP_DETAILS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  };
}

/**
 * Get producing step details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getProducingStepDetailsByIdSuccess(payload) {
  return {
    type: GET_PRODUCING_STEP_DETAILS_SUCCESS,
    payload: payload,
  };
}

/**
 * Get producing step details by id failed action
 * @returns {object}
 */
export function getProducingStepDetailsByIdFailed() {
  return {
    type: GET_PRODUCING_STEP_DETAILS_FAILED,
  };
}
export function getProducingSteps(payload, onSuccess, onError) {
  return {
    type: GET_BY_ROUTING_VERSION_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  };
}

/**
 * Search producing step success action
 * @param {*} payload
 * @returns {object}
 */
export function getProducingStepsSuccess(payload) {
  return {
    type: GET_BY_ROUTING_VERSION_SUCCESS,
    payload: payload,
  };
}

/**
 * Search producing step failed action
 * @returns {object}
 */
export function getProducingStepsFailed() {
  return {
    type: GET_BY_ROUTING_VERSION_FAILED,
  };
}
/**
 * Confirm producing step
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function confirmProducingStep(payload, onSuccess, onError) {
  return {
    type: CONFIRM_PRODUCING_STEP_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  };
}

/**
 * Get confirm success action
 * @param {*} payload
 * @returns {object}
 */
export function confirmProducingStepSuccess(payload) {
  return {
    type: CONFIRM_PRODUCING_STEP_SUCCESS,
    payload: payload,
  };
}

/**
 * Get confirm failed action
 * @returns {object}
 */
export function confirmProducingStepFailed() {
  return {
    type: CONFIRM_PRODUCING_STEP_FAILED,
  };
}
