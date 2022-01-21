export const GET_DASHBOARD_SUMMARY_START = 'GET_DASHBOARD_SUMMARY_START'
export const GET_DASHBOARD_IN_PROGRESS_MOS_START =
  'GET_DASHBOARD_IN_PROGRESS_MOS_START'
export const GET_DASHBOARD_IN_PROGRESS_MOS_SUCCESS =
  'GET_DASHBOARD_IN_PROGRESS_MOS_SUCCESS'
export const GET_DASHBOARD_SUMMARY_SUCCESS = 'GET_DASHBOARD_SUMMARY_SUCCESS'
export const GET_DASHBOARD_MO_STATUS_START = 'GET_DASHBOARD_MO_STATUS_START'
export const GET_DASHBOARD_MO_STATUS_SUCCESS = 'GET_DASHBOARD_MO_STATUS_SUCCESS'
export const GET_DASHBOARD_FINISHED_ITEM_PROGRESS_START =
  'GET_DASHBOARD_FINISHED_ITEM_PROGRESS_START'
export const GET_DASHBOARD_FINISHED_ITEM_PROGRESS_SUCCESS =
  'GET_DASHBOARD_FINISHED_ITEM_PROGRESS_SUCCESS'
export const GET_DASHBOARD_QC_PRODUCING_STEP_PROGRESS_START =
  'GET_DASHBOARD_QC_PRODUCING_STEP_PROGRESS_START'
export const GET_DASHBOARD_QC_PRODUCING_STEP_PROGRESS_START_SUCCESS =
  'GET_DASHBOARD_QC_PRODUCING_STEP_PROGRESS_START_SUCCESS'
export const GET_DASHBOARD_PRODUCING_STEP_PROGRESS_START =
  'GET_DASHBOARD_PRODUCING_STEP_PROGRESS_START'
export const GET_DASHBOARD_PRODUCING_STEP_PROGRESS_START_SUCCESS =
  'GET_DASHBOARD_PRODUCING_STEP_PROGRESS_START_SUCCESS'
export const GET_DASHBOARD_FINISHED_ITEM_BY_MO_START =
  'GET_DASHBOARD_FINISHED_ITEM_BY_MO_START'
export const GET_DASHBOARD_ALL_ITEM_BY_MO_START =
  'GET_DASHBOARD_ALL_ITEM_BY_MO_START'
export const GET_DASHBOARD_BOM_ITEM_ROUTING_BY_MO_START =
  'GET_DASHBOARD_BOM_ITEM_ROUTING_BY_MO_START'

export function getDashboardSummary(payload, onSuccess, onError) {
  return {
    type: GET_DASHBOARD_SUMMARY_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getDashboardSummarySuccess(payload) {
  return {
    type: GET_DASHBOARD_SUMMARY_SUCCESS,
    payload: payload,
  }
}

export function getDashboardMoStatus(payload, onSuccess, onError) {
  return {
    type: GET_DASHBOARD_MO_STATUS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getDashboardMoStatusSuccess(payload) {
  return {
    type: GET_DASHBOARD_MO_STATUS_SUCCESS,
    payload: payload,
  }
}

export function getDashboardQCProducingStepProgress(
  payload,
  onSuccess,
  onError,
) {
  return {
    type: GET_DASHBOARD_QC_PRODUCING_STEP_PROGRESS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getDashboardQCProducingStepProgressSuccess(payload) {
  return {
    type: GET_DASHBOARD_QC_PRODUCING_STEP_PROGRESS_START_SUCCESS,
    payload: payload,
  }
}

export function getDashboardProducingStepProgress(payload, onSuccess, onError) {
  return {
    type: GET_DASHBOARD_PRODUCING_STEP_PROGRESS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getDashboardProducingStepProgressSuccess(payload) {
  return {
    type: GET_DASHBOARD_PRODUCING_STEP_PROGRESS_START_SUCCESS,
    payload: payload,
  }
}

export function getDashboardFinishedItemProgress(payload, onSuccess, onError) {
  return {
    type: GET_DASHBOARD_FINISHED_ITEM_PROGRESS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getDashboardFinishedItemByMo(payload, onSuccess, onError) {
  return {
    type: GET_DASHBOARD_FINISHED_ITEM_BY_MO_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getDashboardFinishedItemProgressSuccess(payload) {
  return {
    type: GET_DASHBOARD_FINISHED_ITEM_PROGRESS_SUCCESS,
    payload: payload,
  }
}

export function getDashboardInProgressMos(payload) {
  return {
    type: GET_DASHBOARD_IN_PROGRESS_MOS_START,
    payload: payload,
  }
}

export function getDashboardInProgressMosSuccess(payload) {
  return {
    type: GET_DASHBOARD_IN_PROGRESS_MOS_SUCCESS,
    payload: payload,
  }
}

export function getDashboardAllItemByMo(payload, onSuccess, onError) {
  return {
    type: GET_DASHBOARD_ALL_ITEM_BY_MO_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getDashboardBomItemRoutingByMo(payload, onSuccess, onError) {
  return {
    type: GET_DASHBOARD_BOM_ITEM_ROUTING_BY_MO_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export default {
  getDashboardSummary,
  getDashboardSummarySuccess,
  getDashboardMoStatus,
  getDashboardMoStatusSuccess,
  getDashboardQCProducingStepProgress,
  getDashboardQCProducingStepProgressSuccess,
  getDashboardProducingStepProgress,
  getDashboardProducingStepProgressSuccess,
  getDashboardFinishedItemProgress,
  getDashboardFinishedItemByMo,
  getDashboardFinishedItemProgressSuccess,
  getDashboardInProgressMos,
  getDashboardInProgressMosSuccess,
  getDashboardAllItemByMo,
  getDashboardBomItemRoutingByMo,
}
