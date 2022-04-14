export const SEARCH_MATERIAL_DETAIL_PLAN_START =
  'MESX_MATERIAL_DETAIL_PLAN_START'
export const SEARCH_MATERIAL_DETAIL_PLAN_SUCCESS =
  'MESX_MATERIAL_DETAIL_PLAN_SUCCESS'
export const SEARCH_MATERIAL_DETAIL_PLAN_FAILED =
  'MESX_MATERIAL_DETAIL_PLAN_FAILED'

/*
 * Search material detail plan success action
 */
export function searchMaterialDetailPlan(payload, onSuccess, onError) {
  return {
    type: SEARCH_MATERIAL_DETAIL_PLAN_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search material detail plan success action
 * @param {*} payload
 * @returns {object}
 */
export function searchMaterialDetailPlanSuccess(payload) {
  return {
    type: SEARCH_MATERIAL_DETAIL_PLAN_SUCCESS,
    payload: payload,
  }
}

/**
 * Search material detail plan failed action
 * @returns {object}
 */
export function searchMaterialDetailPlanFailed() {
  return {
    type: SEARCH_MATERIAL_DETAIL_PLAN_FAILED,
  }
}
