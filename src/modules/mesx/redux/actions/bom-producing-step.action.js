export const SEARCH_BOM_PRODUCING_STEP_START =
  'SEARCH_BOM_PRODUCING_STEP_START';
export const SEARCH_BOM_PRODUCING_STEP_SUCCESS =
  'SEARCH_BOM_PRODUCING_STEP_SUCCESS';
export const SEARCH_BOM_PRODUCING_STEP_FAILED =
  'SEARCH_BOM_PRODUCING_STEP_SUCCESS';

export const CREATE_BOM_PRODUCING_STEP_START =
  'CREATE_BOM_PRODUCING_STEP_START';
export const CREATE_BOM_PRODUCING_STEP_SUCCESS =
  'CREATE_BOM_PRODUCING_STEP_SUCCESS';
export const CREATE_BOM_PRODUCING_STEP_FAILED =
  'CREATE_BOM_PRODUCING_STEP_FAILED';

export const UPDATE_BOM_PRODUCING_STEP_START =
  'UPDATE_BOM_PRODUCING_STEP_START';
export const UPDATE_BOM_PRODUCING_STEP_SUCCESS =
  'UPDATE_BOM_PRODUCING_STEP_SUCCESS';
export const UPDATE_BOM_PRODUCING_STEP_FAILED =
  'UPDATE_BOM_PRODUCING_STEP_FAILED';

export const DELETE_BOM_PRODUCING_STEP_START =
  'DELETE_BOM_PRODUCING_STEP_START';
export const DELETE_BOM_PRODUCING_STEP_SUCCESS =
  'DELETE_BOM_PRODUCING_STEP_SUCCESS';
export const DELETE_BOM_PRODUCING_STEP_FAILED =
  'DELETE_BOM_PRODUCING_STEP_FAILED';

export const GET_BOM_PRODUCING_STEP_DETAILS_START =
  'GET_BOM_PRODUCING_STEP_DETAILS_START';
export const GET_BOM_PRODUCING_STEP_DETAILS_SUCCESS =
  'GET_BOM_PRODUCING_STEP_DETAILS_SUCCESS';
export const GET_BOM_PRODUCING_STEP_DETAILS_FAILED =
  'GET_BOM_PRODUCING_STEP_DETAILS_FAILED';

export const CONFIRM_BOM_PRODUCING_STEP_START =
  'CONFIRM_BOM_PRODUCING_STEP_START';
export const CONFIRM_BOM_PRODUCING_STEP_SUCCESS =
  'CONFIRM_BOM_PRODUCING_STEP_SUCCESS';
export const CONFIRM_BOM_PRODUCING_STEP_FAILED =
  'CONFIRM_BOM_PRODUCING_STEP_FAILED';

export const REJECT_BOM_PRODUCING_STEP_START =
  'REJECT_BOM_PRODUCING_STEP_START';
export const REJECT_BOM_PRODUCING_STEP_SUCCESS =
  'REJECT_BOM_PRODUCING_STEP_SUCCESS';
export const REJECT_BOM_PRODUCING_STEP_FAILED =
  'REJECT_BOM_PRODUCING_STEP_FAILED';

export const GET_BOM_PRODUCING_STEP_STRUCTURE_START =
  'GET_BOM_PRODUCING_STEP_STRUCTURE_START';
export const GET_BOM_PRODUCING_STEP_STRUCTURE_SUCCESS =
  'GET_BOM_PRODUCING_STEP_STRUCTURE_SUCCESS';
export const GET_BOM_PRODUCING_STEP_STRUCTURE_FAILED =
  'GET_BOM_PRODUCING_STEP_STRUCTURE_FAILED';

export const GET_BOM_PRODUCING_STEP_BOM_DETAILS_START =
  'GET_BOM_PRODUCING_STEP_BOM_DETAILS_START';
export const GET_BOM_PRODUCING_STEP_BOM_DETAILS_SUCCESS =
  'GET_BOM_PRODUCING_STEP_BOM_DETAILS_SUCCESS';
export const GET_BOM_PRODUCING_STEP_BOM_DETAILS_FAILED =
  'GET_BOM_PRODUCING_STEP_BOM_DETAILS_FAILED';

/**
 * Search BomProducingStep
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchBomProducingStep(payload, onSuccess, onError) {
  return {
    type: SEARCH_BOM_PRODUCING_STEP_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  };
}

/**
 * Search BomProducingStep success action
 * @param {*} payload
 * @returns {object}
 */
export function searchBomProducingStepSuccess(payload) {
  return {
    type: SEARCH_BOM_PRODUCING_STEP_SUCCESS,
    payload: payload,
  };
}

/**
 * Search BomProducingStep failed action
 * @returns {object}
 */
export function searchBomProducingStepFailed() {
  return {
    type: SEARCH_BOM_PRODUCING_STEP_FAILED,
  };
}

/**
 * Create BomProducingStep
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createBomProducingStep(payload, onSuccess, onError) {
  return {
    type: CREATE_BOM_PRODUCING_STEP_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  };
}

/**
 * Create BomProducingStep success action
 * @param {*} payload
 * @returns {object}
 */
export function createBomProducingStepSuccess(payload) {
  return {
    type: CREATE_BOM_PRODUCING_STEP_SUCCESS,
    payload: payload,
  };
}

/**
 * Create BomProducingStep failed action
 * @returns {object}
 */
export function createBomProducingStepFailed() {
  return {
    type: CREATE_BOM_PRODUCING_STEP_FAILED,
  };
}

/**
 * Update BomProducingStep
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateBomProducingStep(payload, onSuccess, onError) {
  return {
    type: UPDATE_BOM_PRODUCING_STEP_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  };
}
/**
 * Update BomProducingStep success action
 * @param {*} payload
 * @returns {object}
 */
export function updateBomProducingStepSuccess(payload) {
  return {
    type: UPDATE_BOM_PRODUCING_STEP_SUCCESS,
    payload: payload,
  };
}

/**
 * Update BomProducingStep failed action
 * @returns {object}
 */
export function updateBomProducingStepFailed() {
  return {
    type: UPDATE_BOM_PRODUCING_STEP_FAILED,
  };
}
/**
 * Delete BomProducingStep
 * @param {int} BomProducingStepId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteBomProducingStep(BomProducingStepId, onSuccess, onError) {
  return {
    type: DELETE_BOM_PRODUCING_STEP_START,
    payload: BomProducingStepId,
    onSuccess: onSuccess,
    onError: onError,
  };
}

/**
 * Delete BomProducingStep success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteBomProducingStepSuccess(payload) {
  return {
    type: DELETE_BOM_PRODUCING_STEP_SUCCESS,
    payload: payload,
  };
}

/**
 * Delete BomProducingStep failed action
 * @returns {object}
 */
export function deleteBomProducingStepFailed() {
  return {
    type: DELETE_BOM_PRODUCING_STEP_FAILED,
  };
}

/**
 * Get BomProducingStep details
 * @param {int} BomProducingStepId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getBomProducingStepDetailsById(
  BomProducingStepId,
  onSuccess,
  onError,
) {
  return {
    type: GET_BOM_PRODUCING_STEP_DETAILS_START,
    payload: BomProducingStepId,
    onSuccess: onSuccess,
    onError: onError,
  };
}

/**
 * Get BomProducingStep details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getBomProducingStepDetailsByIdSuccess(payload) {
  return {
    type: GET_BOM_PRODUCING_STEP_DETAILS_SUCCESS,
    payload: payload,
  };
}

/**
 * Get BomProducingStep details by id failed action
 * @returns {object}
 */
export function getBomProducingStepDetailsByIdFailed() {
  return {
    type: GET_BOM_PRODUCING_STEP_DETAILS_FAILED,
  };
}

/**
 * Get confirm BomProducingStep
 * @param {int} BomProducingStepId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function confirmBomProducingStepById(
  BomProducingStepId,
  onSuccess,
  onError,
) {
  return {
    type: CONFIRM_BOM_PRODUCING_STEP_START,
    payload: BomProducingStepId,
    onSuccess: onSuccess,
    onError: onError,
  };
}

/**
 * Get confirm BomProducingStep by id success action
 * @param {*} payload
 * @returns {object}
 */
export function confirmBomProducingStepByIdSuccess(payload) {
  return {
    type: CONFIRM_BOM_PRODUCING_STEP_SUCCESS,
    payload: payload,
  };
}

/**
 * Get confirm BomProducingStep by id failed action
 * @returns {object}
 */
export function confirmBomProducingStepByIdFailed() {
  return {
    type: CONFIRM_BOM_PRODUCING_STEP_FAILED,
  };
}

/**
 * Get reject BomProducingStep
 * @param {int} BomProducingStepId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function rejectBomProducingStepById(
  BomProducingStepId,
  onSuccess,
  onError,
) {
  return {
    type: REJECT_BOM_PRODUCING_STEP_START,
    payload: BomProducingStepId,
    onSuccess: onSuccess,
    onError: onError,
  };
}

/**
 * Get reject BomProducingStep by id success action
 * @param {*} payload
 * @returns {object}
 */
export function rejectBomProducingStepByIdSuccess(payload) {
  return {
    type: REJECT_BOM_PRODUCING_STEP_SUCCESS,
    payload: payload,
  };
}

/**
 * Get reject BomProducingStep by id failed action
 * @returns {object}
 */
export function rejectBomProducingStepByIdFailed() {
  return {
    type: REJECT_BOM_PRODUCING_STEP_FAILED,
  };
}

/**
 * Get BomProducingStep details
 * @param {int} BomProducingStepId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getBomProducingStepBomDetails(
  params,
  onSuccess,
  onError,
) {
  return {
    type: GET_BOM_PRODUCING_STEP_BOM_DETAILS_START,
    payload: params,
    onSuccess: onSuccess,
    onError: onError,
  };
}

/**
 * Get BomProducingStep details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getBomProducingStepBomDetailsSuccess(payload) {
  return {
    type: GET_BOM_PRODUCING_STEP_BOM_DETAILS_SUCCESS,
    payload: payload,
  };
}

/**
 * Get BomProducingStep details by id failed action
 * @returns {object}
 */
export function getBomProducingStepBomDetailsFailed() {
  return {
    type: GET_BOM_PRODUCING_STEP_BOM_DETAILS_FAILED,
  };
}
