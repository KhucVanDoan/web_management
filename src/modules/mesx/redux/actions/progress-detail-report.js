export const GET_PRODUCING_STEP_DASHBOARD_START =
  'MESX_GET_PRODUCING_STEP_DASHBOARD_START'
export const GET_PRODUCING_STEP_DASHBOARD_SUCCESS =
  'MESX_GET_PRODUCING_STEP_DASHBOARD_SUCCESS'
export const GET_PRODUCING_STEP_DASHBOARD_FAILED =
  'MESX_GET_PRODUCING_STEP_DASHBOARD_FAILED'
export const getProducingStepDashboard = (payload, onSuccess, onError) => ({
  type: GET_PRODUCING_STEP_DASHBOARD_START,
  payload,
  onSuccess,
  onError,
})

export const getProducingStepDashboardSuccess = (payload) => ({
  type: GET_PRODUCING_STEP_DASHBOARD_SUCCESS,
  payload,
})

export const getProducingStepDashboardFailed = (payload) => ({
  type: GET_PRODUCING_STEP_DASHBOARD_FAILED,
  payload,
})

export default {
  getProducingStepDashboard,
  getProducingStepDashboardSuccess,
  getProducingStepDashboardFailed,
}
