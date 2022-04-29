export const GET_MATERIAL_REPORT = 'MESX_GET_MATERIAL_REPORT'
export const GET_MATERIAL_REPORT_SUCCESS = 'MESX_GET_MATERIAL_REPORT_SUCCESS'
export const GET_MATERIAL_REPORT_FAILED = 'GET_MATERIAL_REPORT_FAILED'

export const EXPORT_MATERIAL_REPORT = 'MESX_EXPORT_MATERIAL_REPORT'
export const EXPORT_MATERIAL_REPORT_SUCCESS =
  'MESX_EXPORT_MATERIAL_REPORT_SUCCESS'
export const EXPORT_MATERIAL_REPORT_FAILED =
  'MESX_EXPORT_MATERIAL_REPORT_FAILED'
/**
 * get material report
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getMaterialReport(payload, onSuccess, onError) {
  return {
    type: GET_MATERIAL_REPORT,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * get material report success action
 * @param {*} payload
 * @returns {object}
 */
export function getMaterialReportSuccess(payload) {
  return {
    type: GET_MATERIAL_REPORT_SUCCESS,
    payload: payload,
  }
}

/**
 * get material report failed action
 * @param {*} payload
 * @returns {object}
 */
export function getMaterialReportFailed() {
  return {
    type: GET_MATERIAL_REPORT_FAILED,
  }
}

export function exportMaterialReport(payload, onSuccess, onError) {
  return {
    type: EXPORT_MATERIAL_REPORT,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function exportMaterialReportSuccess(payload) {
  return {
    type: EXPORT_MATERIAL_REPORT_SUCCESS,
    payload: payload,
  }
}
export function exportMaterialReportFailed() {
  return {
    type: EXPORT_MATERIAL_REPORT_FAILED,
  }
}
