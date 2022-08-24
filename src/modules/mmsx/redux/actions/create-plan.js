export const GET_CREATE_PLAN_LIST = 'MMSX_GET_CREATE_PLAN_LIST'
export const GET_CREATE_PLAN_LIST_SUCCESS = 'MMSX_GET_CREATE_PLAN_LIST_SUCCESS'
export const GET_CREATE_PLAN_LIST_FAIL = 'MMSX_GET_CREATE_PLAN_LIST_FAIL'

export const CREATE_PLAN = 'MMSX_CREATE_PLAN'
export const CREATE_PLAN_SUCCESS = 'MMSX_CREATE_PLAN_SUCCESS'
export const CREATE_PLAN_FAIL = 'MMSX_CREATE_PLAN_FAIL'

export const CONFIRM_PLAN_START = 'MMSX_CONFIRM_PLAN_START'
export const CONFIRM_PLAN_SUCCESS = 'MMSX_CONFIRM_PLAN_SUCCESS'
export const CONFIRM_PLAN_FAIL = 'MMSX_CONFIRM_PLAN_FAIL'

export const REJECT_PLAN_START = 'MMSX_REJECT_PLAN_START'
export const REJECT_PLAN_SUCCESS = 'MMSX_REJECT_PLAN_SUCCESS'
export const REJECT_PLAN_FAIL = 'MMSX_REJECT_PLAN_FAIL'

export const GET_PLAN_DETAIL_START = 'MMSX_GET_PLAN_DETAIL_START'
export const GET_PLAN_DETAIL_SUCCESS = 'MMSX_GET_PLAN_DETAIL_SUCCESS'
export const GET_PLAN_DETAIL_FAIL = 'MMSX_GET_PLAN_DETAIL_FAIL'

export const UPDATE_MAKE_PLAN_START = 'MMSX_UPDATE_MAKE_PLAN_START'
export const UPDATE_MAKE_PLAN_SUCCESS = 'MMSX_UPDATE_MAKE_PLAN_SUCCESS'
export const UPDATE_MAKE_PLAN_FAIL = 'MMSX_UPDATE_MAKE_PLAN_FAIL'

export const DELETE_MAKE_PLAN_START = 'MMSX_DELETE_MAKE_PLAN_START'
export const DELETE_MAKE_PLAN_SUCCESS = 'MMSX_DELETE_MAKE_PLAN_SUCCESS'
export const DELETE_MAKE_PLAN_FAIL = 'MMSX_DELETE_MAKE_PLAN_FAIL'

export const GET_GANTT_CHART_DATA = 'MMSX_GET_GANTT_CHART_DATA'
export const GET_GANTT_CHART_DATA_SUCCESS = 'MMSX_GET_GANTT_CHART_DATA_SUCCESS'
export const GET_GANTT_CHART_DATA_FAIL = 'MMSX_GET_GANTT_CHART_DATA_FAIL'

export const GET_JOB_DRAFT_LIST = 'MMSX_GET_JOB_DRAFT_LIST'
export const GET_JOB_DRAFT_LIST_SUCCESS = 'MMSX_GET_JOB_DRAFT_LIST_SUCCESS'
export const GET_JOB_DRAFT_LIST_FAIL = 'MMSX_GET_JOB_DRAFT_LIST_FAIL'

export const DELETE_JOB_DRAFT_START = 'MMSX_DELETE_JOB_DRAFT_START'
export const DELETE_JOB_DRAFT_SUCCESS = 'MMSX_DELETE_JOB_DRAFT_SUCCESS'
export const DELETE_JOB_DRAFT_FAIL = 'MMSX_DELETE_JOB_DRAFT_FAIL'
export const RESET_STATE_CREATE_PLAN = 'MMSX_RESET_STATE_CREATE_PLAN'
export const RESET_STATE_JOB_DRAFT = 'MMSX_RESET_STATE_JOB_DRAFT'

export function getCreatePlanList(payload, onSuccess, onError) {
  return {
    type: GET_CREATE_PLAN_LIST,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function getCreatePlanListSuccess(payload) {
  return {
    type: GET_CREATE_PLAN_LIST_SUCCESS,
    payload,
  }
}

export function getCreatePlanListFail(payload) {
  return {
    type: GET_CREATE_PLAN_LIST_FAIL,
    payload,
  }
}

export function createPlan(payload, onSuccess, onError) {
  return {
    type: CREATE_PLAN,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function createPlanSuccess(payload) {
  return {
    type: CREATE_PLAN_SUCCESS,
    payload,
  }
}

export function createPlanFail(payload) {
  return {
    type: CREATE_PLAN_FAIL,
    payload,
  }
}

// Confirm
export function confirmPlan(payload, onSuccess, onError) {
  return {
    type: CONFIRM_PLAN_START,
    payload,
    onSuccess,
    onError,
  }
}

export function confirmPlanSuccess(payload) {
  return {
    type: CONFIRM_PLAN_SUCCESS,
    payload,
  }
}

export function confirmPlanFail() {
  return {
    type: CONFIRM_PLAN_FAIL,
  }
}

// reject
export function rejectPlan(payload, onSuccess, onError) {
  return {
    type: REJECT_PLAN_START,
    payload,
    onSuccess,
    onError,
  }
}

export function rejectPlanSuccess(payload) {
  return {
    type: REJECT_PLAN_SUCCESS,
    payload,
  }
}

export function rejectPlanFail() {
  return {
    type: REJECT_PLAN_FAIL,
  }
}

// detail
export function getDetailPlan(payload, onSuccess, onError) {
  return {
    type: GET_PLAN_DETAIL_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getDetailPlanSuccess(payload) {
  return {
    type: GET_PLAN_DETAIL_SUCCESS,
    payload,
  }
}

export function getDetailPlanFail() {
  return {
    type: GET_PLAN_DETAIL_FAIL,
  }
}

// update
export function updateMakePlan(payload, onSuccess, onError) {
  return {
    type: UPDATE_MAKE_PLAN_START,
    payload,
    onSuccess,
    onError,
  }
}

export function updateMakePlanSuccess(payload) {
  return {
    type: UPDATE_MAKE_PLAN_SUCCESS,
    payload,
  }
}

export function updateMakePlanFail() {
  return {
    type: UPDATE_MAKE_PLAN_FAIL,
  }
}
// delete
export function deleteMakePlan(payload, onSuccess, onError) {
  return {
    type: DELETE_MAKE_PLAN_START,
    payload,
    onSuccess,
    onError,
  }
}

export function deleteMakePlanSuccess(payload) {
  return {
    type: DELETE_MAKE_PLAN_SUCCESS,
    payload,
  }
}

export function deleteMakePlanFail() {
  return {
    type: DELETE_MAKE_PLAN_FAIL,
  }
}

// gantt chart
export function getGanttChartData(payload, onSuccess, onError) {
  return {
    type: GET_GANTT_CHART_DATA,
    payload,
    onSuccess,
    onError,
  }
}

export function getGanttChartDataSuccess(payload) {
  return {
    type: GET_GANTT_CHART_DATA_SUCCESS,
    payload,
  }
}

export function getGanttChartDataFail() {
  return {
    type: GET_GANTT_CHART_DATA_FAIL,
  }
}
export function resetStateCreatePlan() {
  return {
    type: RESET_STATE_CREATE_PLAN,
  }
}
export function resetJobDraftList() {
  return {
    type: RESET_STATE_JOB_DRAFT,
  }
}
export function getJobDraftList(payload, onSuccess, onError) {
  return {
    type: GET_JOB_DRAFT_LIST,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function getJobDraftListSuccess(payload) {
  return {
    type: GET_JOB_DRAFT_LIST_SUCCESS,
    payload,
  }
}

export function getJobDraftListFail(payload) {
  return {
    type: GET_JOB_DRAFT_LIST_FAIL,
    payload,
  }
}

export function deleteJobDraft(payload, onSuccess, onError) {
  return {
    type: DELETE_JOB_DRAFT_START,
    payload,
    onSuccess,
    onError,
  }
}

export function deleteJobDraftSuccess(payload) {
  return {
    type: DELETE_JOB_DRAFT_SUCCESS,
    payload,
  }
}

export function deleteJobDraftFail() {
  return {
    type: DELETE_JOB_DRAFT_FAIL,
  }
}
export default {
  getCreatePlanList,
  getCreatePlanListSuccess,
  getCreatePlanListFail,
  createPlan,
  createPlanSuccess,
  createPlanFail,
  rejectPlan,
  rejectPlanFail,
  rejectPlanSuccess,
  confirmPlan,
  confirmPlanFail,
  confirmPlanSuccess,
  getDetailPlan,
  getDetailPlanSuccess,
  getDetailPlanFail,
  updateMakePlan,
  updateMakePlanFail,
  updateMakePlanSuccess,
  deleteJobDraft,
  deleteJobDraftFail,
  deleteJobDraftSuccess,
  deleteMakePlan,
  deleteMakePlanFail,
  deleteMakePlanSuccess,
  getGanttChartData,
  getGanttChartDataSuccess,
  getGanttChartDataFail,
  resetStateCreatePlan,
  getJobDraftList,
  getJobDraftListSuccess,
  getJobDraftListFail,
  resetJobDraftList,
}
