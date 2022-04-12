export const GET_PRICE_REPORT = 'GET_PRICE_REPORT'
export const GET_PRICE_REPORT_SUCCESS = 'GET_PRICE_REPORT_SUCCESS'
export const GET_PRICE_REPORT_FAILED = 'GET_PRICE_REPORT_FAILED'
export const EXPORT_PRICE_REPORT = 'EXPORT_PRICE_REPORT'
export const EXPORT_PRICE_REPORT_SUCCESS = 'EXPORT_PRICE_REPORT_SUCCESS'
export const EXPORT_PRICE_REPORT_FAILED = 'EXPORT_PRICE_REPORT_FAILED'
/**
 * get price report
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getPriceReport(payload, onSuccess, onError) {
  return {
    type: GET_PRICE_REPORT,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * get price success action
 * @param {*} payload
 * @returns {object}
 */
export function getPriceReportSuccess(payload) {
  return {
    type: GET_PRICE_REPORT_SUCCESS,
    payload: payload,
  }
}

export function getPriceReportFailed() {
  return {
    type: GET_PRICE_REPORT_FAILED,
  }
}

export function exportPriceReport(payload, onSuccess, onError) {
  return {
    type: EXPORT_PRICE_REPORT,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function exportPriceReportSuccess(payload) {
  return {
    type: EXPORT_PRICE_REPORT_SUCCESS,
    payload: payload,
  }
}
export function exportPriceReportFailed() {
  return {
    type: EXPORT_PRICE_REPORT_FAILED,
  }
}
