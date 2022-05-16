export const SEARCH_PROGRESS_MANUFACTURING_BY_WORK_CENTER_START =
  'MESX_SEARCH_PROGRESS_MANUFACTURING_BY_WORK_CENTER_START'
export const SEARCH_PROGRESS_MANUFACTURING_BY_WORK_CENTER_SUCCESS =
  'MESX_SEARCH_PROGRESS_MANUFACTURING_BY_WORK_CENTER_SUCCESS'
export const SEARCH_PROGRESS_MANUFACTURING_BY_WORK_CENTER_FAILED =
  'MESX_SEARCH_PROGRESS_MANUFACTURING_BY_WORK_CENTER_FAILED'

export function searchProgressManufacturingByWorkCenter(
  payload,
  onSuccess,
  onError,
) {
  return {
    type: SEARCH_PROGRESS_MANUFACTURING_BY_WORK_CENTER_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search user success action
 * @param {*} payload
 * @returns {object}
 */
export function searchProgressManufacturingByWorkCenterSuccess(payload) {
  return {
    type: SEARCH_PROGRESS_MANUFACTURING_BY_WORK_CENTER_SUCCESS,
    payload: payload,
  }
}

/**
 * Search user failed action
 * @returns {object}
 */
export function searchProgressManufacturingByWorkCenterFailed() {
  return {
    type: SEARCH_PROGRESS_MANUFACTURING_BY_WORK_CENTER_FAILED,
  }
}

export default {
  searchProgressManufacturingByWorkCenter,
  searchProgressManufacturingByWorkCenterSuccess,
  searchProgressManufacturingByWorkCenterFailed,
}
