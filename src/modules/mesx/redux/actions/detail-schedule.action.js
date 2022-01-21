export const SEARCH_DETAIL_SCHEDULE_START = 'SEARCH_DETAIL_SCHEDULE_START';
export const SEARCH_DETAIL_SCHEDULE_SUCCESS = 'SEARCH_DETAIL_SCHEDULE_SUCCESS';
export const SEARCH_DETAIL_SCHEDULE_FAILED = 'SEARCH_DETAIL_SCHEDULE_FAILED';

export const CREATE_DETAIL_SCHEDULE_START = 'CREATE_DETAIL_SCHEDULE_START';
export const CREATE_DETAIL_SCHEDULE_SUCCESS = 'CREATE_DETAIL_SCHEDULE_SUCCESS';
export const CREATE_DETAIL_SCHEDULE_FAILED = 'CREATE_DETAIL_SCHEDULE_FAILED';

export const UPDATE_DETAIL_SCHEDULE_START = 'UPDATE_DETAIL_SCHEDULE_START';
export const UPDATE_DETAIL_SCHEDULE_SUCCESS = 'UPDATE_DETAIL_SCHEDULE_SUCCESS';
export const UPDATE_DETAIL_SCHEDULE_FAILED = 'UPDATE_DETAIL_SCHEDULE_FAILED';

export const DELETE_DETAIL_SCHEDULE_START = 'DELETE_DETAIL_SCHEDULE_START';
export const DELETE_DETAIL_SCHEDULE_SUCCESS = 'DELETE_DETAIL_SCHEDULE_SUCCESS';
export const DELETE_DETAIL_SCHEDULE_FAILED = 'DELETE_DETAIL_SCHEDULE_FAILED';

export const GET_DETAIL_SCHEDULE_DETAILS_START =
  'GET_DETAIL_SCHEDULE_DETAILS_START';
export const GET_DETAIL_SCHEDULE_DETAILS_SUCCESS =
  'GET_DETAIL_SCHEDULE_DETAILS_SUCCESS';
export const GET_DETAIL_SCHEDULE_DETAILS_FAILED =
  'GET_DETAIL_SCHEDULE_DETAILS_FAILED';

export const APPROVE_DETAIL_SCHEDULE_START = 'APPROVE_DETAIL_SCHEDULE_START';
export const APPROVE_DETAIL_SCHEDULE_SUCCESS =
  'APPROVE_DETAIL_SCHEDULE_SUCCESS';
export const APPROVE_DETAIL_SCHEDULE_FAILED = 'APPROVE_DETAIL_SCHEDULE_FAILED';

export const GENERATE_DETAIL_SCHEDULE_START = 'GENERATE_DETAIL_SCHEDULE_START';
export const GENERATE_DETAIL_SCHEDULE_SUCCESS =
  'GENERATE_DETAIL_SCHEDULE_SUCCESS';
export const GENERATE_DETAIL_SCHEDULE_FAILED =
  'GENERATE_DETAIL_SCHEDULE_FAILED';

export const REJECT_DETAIL_SCHEDULE_START = 'REJECT_DETAIL_SCHEDULE_START';
export const REJECT_DETAIL_SCHEDULE_SUCCESS = 'REJECT_DETAIL_SCHEDULE_SUCCESS';
export const REJECT_DETAIL_SCHEDULE_FAILED = 'REJECT_DETAIL_SCHEDULE_FAILED';

/**
 * Search Detail Schedule
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchDetailSchedule(payload, onSuccess, onError) {
  return {
    type: SEARCH_DETAIL_SCHEDULE_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  };
}

/**
 * Search Detail Schedule success action
 * @param {*} payload
 * @returns {object}
 */
export function searchDetailScheduleSuccess(payload) {
  return {
    type: SEARCH_DETAIL_SCHEDULE_SUCCESS,
    payload: payload,
  };
}

/**
 * Search Detail Schedule failed action
 * @returns {object}
 */
export function searchDetailScheduleFailed() {
  return {
    type: SEARCH_DETAIL_SCHEDULE_FAILED,
  };
}

/**
 * Create detail schedule
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createDetailSchedule(payload, onSuccess, onError) {
  return {
    type: CREATE_DETAIL_SCHEDULE_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  };
}

/**
 * Create detail schedule success action
 * @param {*} payload
 * @returns {object}
 */
export function createDetailScheduleSuccess(payload) {
  return {
    type: CREATE_DETAIL_SCHEDULE_SUCCESS,
    payload: payload,
  };
}

/**
 * Create detail schedule failed action
 * @returns {object}
 */
export function createDetailScheduleFailed() {
  return {
    type: CREATE_DETAIL_SCHEDULE_FAILED,
  };
}

/**
 * Update detail schedule
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateDetailSchedule(payload, onSuccess, onError) {
  return {
    type: UPDATE_DETAIL_SCHEDULE_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  };
}
/**
 * Update detail schedule success action
 * @param {*} payload
 * @returns {object}
 */
export function updateDetailScheduleSuccess(payload) {
  return {
    type: UPDATE_DETAIL_SCHEDULE_SUCCESS,
    payload: payload,
  };
}

/**
 * Update detail schedule failed action
 * @returns {object}
 */
export function updateDetailScheduleFailed() {
  return {
    type: UPDATE_DETAIL_SCHEDULE_FAILED,
  };
}
/**
 * Delete detail schedule
 * @param {int} DetailScheduleId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteDetailSchedule(DetailScheduleId, onSuccess, onError) {
  return {
    type: DELETE_DETAIL_SCHEDULE_START,
    payload: DetailScheduleId,
    onSuccess: onSuccess,
    onError: onError,
  };
}

/**
 * Delete detail schedule success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteDetailScheduleSuccess(payload) {
  return {
    type: DELETE_DETAIL_SCHEDULE_SUCCESS,
    payload: payload,
  };
}

/**
 * Delete detail schedule failed action
 * @returns {object}
 */
export function deleteDetailScheduleFailed() {
  return {
    type: DELETE_DETAIL_SCHEDULE_FAILED,
  };
}

/**
 * Get detail schedule details
 * @param {int} DetailScheduleId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getDetailScheduleDetailsById(
  DetailScheduleId,
  onSuccess,
  onError,
) {
  return {
    type: GET_DETAIL_SCHEDULE_DETAILS_START,
    payload: DetailScheduleId,
    onSuccess: onSuccess,
    onError: onError,
  };
}

/**
 * Get detail schedule details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getDetailScheduleDetailsByIdSuccess(payload) {
  return {
    type: GET_DETAIL_SCHEDULE_DETAILS_SUCCESS,
    payload: payload,
  };
}

/**
 * Get detail schedule details by id failed action
 * @returns {object}
 */
export function getDetailScheduleDetailsByIdFailed() {
  return {
    type: GET_DETAIL_SCHEDULE_DETAILS_FAILED,
  };
}

/**
 * approve detail schedule
 * @param {int} DetailScheduleId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function approveDetailScheduleById(
  DetailScheduleId,
  onSuccess,
  onError,
) {
  return {
    type: APPROVE_DETAIL_SCHEDULE_START,
    payload: DetailScheduleId,
    onSuccess: onSuccess,
    onError: onError,
  };
}

/**
 * Get approve detail schedule by id success action
 * @param {*} payload
 * @returns {object}
 */
export function approveDetailScheduleByIdSuccess(payload) {
  return {
    type: APPROVE_DETAIL_SCHEDULE_SUCCESS,
    payload: payload,
  };
}

/**
 * Get approve detail schedule by id failed action
 * @returns {object}
 */
export function approveDetailScheduleByIdFailed() {
  return {
    type: APPROVE_DETAIL_SCHEDULE_FAILED,
  };
}
/**
 * generate detail schedule
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function generateDetailSchedule(payload, onSuccess, onError) {
  return {
    type: GENERATE_DETAIL_SCHEDULE_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  };
}

/**
 * generate detail schedule success action
 * @param {*} payload
 * @returns {object}
 */
export function generateDetailScheduleSuccess(payload) {
  return {
    type: GENERATE_DETAIL_SCHEDULE_SUCCESS,
    payload: payload,
  };
}

/**
 * generate detail schedule failed action
 * @returns {object}
 */
export function generateDetailScheduleFailed() {
  return {
    type: GENERATE_DETAIL_SCHEDULE_FAILED,
  };
}

/**
 * Get reject detail schedule
 * @param {int} DetailScheduleId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function rejectDetailScheduleById(DetailScheduleId, onSuccess, onError) {
  return {
    type: REJECT_DETAIL_SCHEDULE_START,
    payload: DetailScheduleId,
    onSuccess: onSuccess,
    onError: onError,
  };
}

/**
 * Get reject detail schedule by id success action
 * @param {*} payload
 * @returns {object}
 */
export function rejectDetailScheduleByIdSuccess(payload) {
  return {
    type: REJECT_DETAIL_SCHEDULE_SUCCESS,
    payload: payload,
  };
}

/**
 * Get reject detail schedule by id failed action
 * @returns {object}
 */
export function rejectDetailScheduleByIdFailed() {
  return {
    type: REJECT_DETAIL_SCHEDULE_FAILED,
  };
}
