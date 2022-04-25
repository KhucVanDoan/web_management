export const GET_PROGRESS_MANUFACTURING_BY_ORDER_START =
  'MESX_GET_PRODUCING_STEP_DASHBOARD_START'
export const GET_PROGRESS_MANUFACTURING_BY_ORDER_SUCCESS =
  'MESX_GET_PRODUCING_STEP_DASHBOARD_SUCCESS'
export const GET_PROGRESS_MANUFACTURING_BY_ORDERD_FAILED =
  'MESX_GET_PRODUCING_STEP_DASHBOARD_FAILED'
export const getProgressManufacturingByOrder = (
  payload,
  onSuccess,
  onError,
) => ({
  type: GET_PROGRESS_MANUFACTURING_BY_ORDER_START,
  payload,
  onSuccess,
  onError,
})

export const getProgressManufacturingByOrderSuccess = (payload) => ({
  type: GET_PROGRESS_MANUFACTURING_BY_ORDER_SUCCESS,
  payload,
})

export const getProgressManufacturingByOrderFailed = (payload) => ({
  type: GET_PROGRESS_MANUFACTURING_BY_ORDERD_FAILED,
  payload,
})

export default {
  getProgressManufacturingByOrder,
  getProgressManufacturingByOrderSuccess,
  getProgressManufacturingByOrderFailed,
}
