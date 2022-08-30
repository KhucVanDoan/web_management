export const SEARCH_JOB_LIST_START = 'MMSX_SEARCH_JOB_LIST_START'
export const SEARCH_JOB_LIST_SUCCESS = 'MMSX_SEARCH_JOB_LIST_SUCCESS'
export const SEARCH_JOB_LIST_FAIL = 'MMSX_SEARCH_JOB_LIST_FAIL'

export const GET_JOB_LIST_START = 'MMSX_GET_JOB_LIST_START'
export const GET_JOB_LIST_SUCCESS = 'MMSX_GET_JOB_LIST_SUCCESS'
export const GET_JOB_LIST_FAIL = 'MMSX_GET_JOB_LIST_FAIL'

export const GET_JOB_DETAIL_START = 'MMSX_GET_JOB_DETAIL_START'
export const GET_JOB_DETAIL_SUCCESS = 'MMSX_GET_JOB_DETAIL_SUCCESS'
export const GET_JOB_DETAIL_FAIL = 'MMSX_GET_JOB_DETAIL_FAIL'

export const UPDATE_PLAN_START = 'MMSX_UPDATE_PLAN_START'
export const UPDATE_PLAN_SUCCESS = 'MMSX_UPDATE_PLAN_SUCCESS'
export const UPDATE_PLAN_FAIL = 'MMSX_UPDATE_PLAN_FAIL'

export const DELETE_JOB_START = 'MMSX_DELETE_JOB_START'
export const DELETE_JOB_SUCCESS = 'MMSX_DELETE_JOB_SUCCESS'
export const DELETE_JOB_FAIL = 'MMSX_DELETE_MAKE_PLAN_FAIL'

export const RESET_JOB = 'MMSX_RESET_JOB'

/**
 * Search block
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchJobList(payload, onSuccess, onError) {
  return {
    type: SEARCH_JOB_LIST_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function searchJobListSuccess(payload) {
  return {
    type: SEARCH_JOB_LIST_SUCCESS,
    payload: payload,
  }
}

export function searchJobListFail() {
  return {
    type: SEARCH_JOB_LIST_FAIL,
  }
}

export function getJobList(payload, onSuccess, onError) {
  return {
    type: GET_JOB_LIST_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function getJobListSuccess(payload) {
  return {
    type: GET_JOB_LIST_SUCCESS,
    payload,
  }
}

export function getJobListFail() {
  return {
    type: GET_JOB_LIST_FAIL,
  }
}

export function getJobDetail(payload, onSuccess, onError) {
  return {
    type: GET_JOB_DETAIL_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function getJobDetailSuccess(payload) {
  return {
    type: GET_JOB_DETAIL_SUCCESS,
    payload,
  }
}

export function getJobDetailFail() {
  return {
    type: GET_JOB_DETAIL_FAIL,
  }
}

export function updatePlan(payload, onSuccess, onError) {
  return {
    type: UPDATE_PLAN_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function updatePlanSuccess(payload) {
  return {
    type: UPDATE_PLAN_SUCCESS,
    payload,
  }
}

export function updatePlanFail() {
  return {
    type: UPDATE_PLAN_FAIL,
  }
}

export function resetJob() {
  return {
    type: RESET_JOB,
  }
}

export function deleteJob(payload, onSuccess, onError) {
  return {
    type: DELETE_JOB_START,
    payload,
    onSuccess,
    onError,
  }
}

export function deleteJobSuccess(payload) {
  return {
    type: DELETE_JOB_SUCCESS,
    payload,
  }
}

export function deleteJobFail() {
  return {
    type: DELETE_JOB_FAIL,
  }
}

export default {
  searchJobList,
  searchJobListSuccess,
  searchJobListFail,
  getJobList,
  getJobListSuccess,
  getJobListFail,
  getJobDetail,
  getJobDetailSuccess,
  getJobDetailFail,
  updatePlanFail,
  updatePlanSuccess,
  updatePlan,
  resetJob,
  deleteJob,
  deleteJobSuccess,
  deleteJobFail,
}
