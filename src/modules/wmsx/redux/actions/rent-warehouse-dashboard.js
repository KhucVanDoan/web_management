export const WMSX_GET_RENT_WAREHOUSE_DASHBOARD_LIST =
  'WMSX_GET_RENT_WAREHOUSE_DASHBOARD_LIST'
export const WMSX_GET_RENT_WAREHOUSE_DASHBOARD_LIST_SUCCESS =
  'WMSX_GET_RENT_WAREHOUSE_DASHBOARD_LIST_SUCCESS'
export const WMSX_GET_RENT_WAREHOUSE_DASHBOARD_LIST_FAILED =
  'WMSX_GET_RENT_WAREHOUSE_DASHBOARD_LIST_FAILED'

export function getRentWarehouseDashboardList(payload, onSuccess, onError) {
  return {
    type: WMSX_GET_RENT_WAREHOUSE_DASHBOARD_LIST,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getRentWarehouseDashboardListSuccess(payload) {
  return {
    type: WMSX_GET_RENT_WAREHOUSE_DASHBOARD_LIST_SUCCESS,
    payload: payload,
  }
}
export function getRentWarehouseDashboardListFailed() {
  return {
    type: WMSX_GET_RENT_WAREHOUSE_DASHBOARD_LIST_FAILED,
  }
}

export default {
  getRentWarehouseDashboardList,
  getRentWarehouseDashboardListSuccess,
  getRentWarehouseDashboardListFailed,
}
