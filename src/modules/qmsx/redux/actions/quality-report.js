export const SEARCH_INPUT_QUALITY_REPORT_START =
  'SEARCH_INPUT_QUALITY_REPORT_START'
export const SEARCH_INPUT_QUALITY_REPORT_SUCCESS =
  'SEARCH_INPUT_QUALITY_REPORT_SUCCESS'
export const SEARCH_INPUT_QUALITY_REPORT_FAIL =
  'SEARCH_INPUT_QUALITY_REPORT_FAIL'

// Action: Search output quality report
export const SEARCH_OUTPUT_QUALITY_REPORT_START =
  'SEARCH_OUTPUT_QUALITY_REPORT_START'
export const SEARCH_OUTPUT_QUALITY_REPORT_SUCCESS =
  'SEARCH_OUTPUT_QUALITY_REPORT_SUCCESS'
export const SEARCH_OUTPUT_QUALITY_REPORT_FAIL =
  'SEARCH_OUTPUT_QUALITY_REPORT_FAIL'

// Action: Search production output quality report
export const SEARCH_PRODUCTION_OUTPUT_QUALITY_REPORT_START =
  'SEARCH_PRODUCTION_OUTPUT_QUALITY_REPORT_START'
export const SEARCH_PRODUCTION_OUTPUT_QUALITY_REPORT_SUCCESS =
  'SEARCH_PRODUCTION_OUTPUT_QUALITY_REPORT_SUCCESS'
export const SEARCH_PRODUCTION_OUTPUT_QUALITY_REPORT_FAIL =
  'SEARCH_PRODUCTION_OUTPUT_QUALITY_REPORT_FAIL'

// Action: Search production input product of previous stage quality report
export const SEARCH_PROD_INPUT_PRODUCT_PREV_QUALITY_REPORT_START =
  'SEARCH_PROD_INPUT_PRODUCT_PREV_QUALITY_REPORT_START'
export const SEARCH_PROD_INPUT_PRODUCT_PREV_QUALITY_REPORT_SUCCESS =
  'SEARCH_PROD_INPUT_PRODUCT_PREV_QUALITY_REPORT_SUCCESS'
export const SEARCH_PROD_INPUT_PRODUCT_PREV_QUALITY_REPORT_FAIL =
  'SEARCH_PROD_INPUT_PRODUCT_PREV_QUALITY_REPORT_FAIL'

// Action: Search production input material quality report
export const SEARCH_PROD_INPUT_MATERIAL_QUALITY_REPORT_START =
  'SEARCH_PROD_INPUT_MATERIAL_QUALITY_REPORT_START'
export const SEARCH_PROD_INPUT_MATERIAL_QUALITY_REPORT_SUCCESS =
  'SEARCH_PROD_INPUT_MATERIAL_QUALITY_REPORT_SUCCESS'
export const SEARCH_PROD_INPUT_MATERIAL_QUALITY_REPORT_FAIL =
  'SEARCH_PROD_INPUT_MATERIAL_QUALITY_REPORT_FAIL'

// Action: Get MO list for production QC
export const GET_MO_LIST_START = 'GET_MO_LIST_START'
export const GET_MO_LIST_SUCCESS = 'GET_MO_LIST_SUCCESS'
export const GET_MO_LIST_FAIL = 'GET_MO_LIST_FAIL'

// Action: Get item list by MO
export const GET_ITEM_LIST_BY_MO_START = 'GET_ITEM_LIST_BY_MO_START'
export const GET_ITEM_LIST_BY_MO_SUCCESS = 'GET_ITEM_LIST_BY_MO_SUCCESS'
export const GET_ITEM_LIST_BY_MO_FAIL = 'GET_ITEM_LIST_BY_MO_FAIL'

// Action: Get item list by PO
export const GET_ITEM_LIST_BY_PO_START = 'GET_ITEM_LIST_BY_PO_START'
export const GET_ITEM_LIST_BY_PO_SUCCESS = 'GET_ITEM_LIST_BY_PO_SUCCESS'
export const GET_ITEM_LIST_BY_PO_FAIL = 'GET_ITEM_LIST_BY_PO_FAIL'

// Action: Get item list by SO
export const GET_ITEM_LIST_BY_SO_START = 'GET_ITEM_LIST_BY_SO_START'
export const GET_ITEM_LIST_BY_SO_SUCCESS = 'GET_ITEM_LIST_BY_SO_SUCCESS'
export const GET_ITEM_LIST_BY_SO_FAIL = 'GET_ITEM_LIST_BY_SO_FAIL'

// Action: Get item list by PRO
export const GET_ITEM_LIST_BY_PRO_START = 'GET_ITEM_LIST_BY_PRO_START'
export const GET_ITEM_LIST_BY_PRO_SUCCESS = 'GET_ITEM_LIST_BY_PRO_SUCCESS'
export const GET_ITEM_LIST_BY_PRO_FAIL = 'GET_ITEM_LIST_BY_PRO_FAIL'

// Action: Get order list by stage
export const GET_ORDER_LIST_BY_STAGE_START = 'SEARCH_ORDER_BY_STAGE_START'
export const GET_ORDER_LIST_BY_STAGE_SUCCESS = 'SEARCH_ORDER_BY_STAGE_SUCCESS'
export const GET_ORDER_LIST_BY_STAGE_FAIL = 'SEARCH_ORDER_BY_STAGE_FAIL'

// Action: reset state
export const RESET_QUALITY_REPORT_STATE = 'RESET_QUALITY_REPORT_STATE'

/**
 * Search input quality report start action
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchInputQualityReport(payload, onSuccess, onError) {
  return {
    type: SEARCH_INPUT_QUALITY_REPORT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search input quality report success action
 * @param {*} payload
 * @returns {object}
 */
export function searchInputQualityReportSuccess(payload) {
  return {
    type: SEARCH_INPUT_QUALITY_REPORT_SUCCESS,
    payload: payload,
  }
}

/**
 * Search input quality report fail action
 * @returns {object}
 */
export function searchInputQualityReportFail() {
  return {
    type: SEARCH_INPUT_QUALITY_REPORT_FAIL,
  }
}

/**
 * Search output quality report start action
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchOutputQualityReport(payload, onSuccess, onError) {
  return {
    type: SEARCH_OUTPUT_QUALITY_REPORT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search output quality report success action
 * @param {*} payload
 * @returns {object}
 */
export function searchOutputQualityReportSuccess(payload) {
  return {
    type: SEARCH_OUTPUT_QUALITY_REPORT_SUCCESS,
    payload: payload,
  }
}

/**
 * Search output quality report fail action
 * @returns {object}
 */
export function searchOutputQualityReportFail() {
  return {
    type: SEARCH_OUTPUT_QUALITY_REPORT_FAIL,
  }
}

/**
 * Search production output quality report start action
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchProductionOutputQualityReport(
  payload,
  onSuccess,
  onError,
) {
  return {
    type: SEARCH_PRODUCTION_OUTPUT_QUALITY_REPORT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search production output quality report success action
 * @param {*} payload
 * @returns {object}
 */
export function searchProductionOutputQualityReportSuccess(payload) {
  return {
    type: SEARCH_PRODUCTION_OUTPUT_QUALITY_REPORT_SUCCESS,
    payload: payload,
  }
}

/**
 * Search production output quality report fail action
 * @returns {object}
 */
export function searchProductionOutputQualityReportFail() {
  return {
    type: SEARCH_PRODUCTION_OUTPUT_QUALITY_REPORT_FAIL,
  }
}

/**
 * Search production input (product of previous stage) quality report start action
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchProdInputProductPrevQualityReport(
  payload,
  onSuccess,
  onError,
) {
  return {
    type: SEARCH_PROD_INPUT_PRODUCT_PREV_QUALITY_REPORT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search production input (product of previous stage) quality report success action
 * @param {*} payload
 * @returns {object}
 */
export function searchProdInputProductPrevQualityReportSuccess(payload) {
  return {
    type: SEARCH_PROD_INPUT_PRODUCT_PREV_QUALITY_REPORT_SUCCESS,
    payload: payload,
  }
}

/**
 * Search production input (product of previous stage) quality report fail action
 * @returns {object}
 */
export function searchProdInputProductPrevQualityReportFail() {
  return {
    type: SEARCH_PROD_INPUT_PRODUCT_PREV_QUALITY_REPORT_FAIL,
  }
}

/**
 * Search production input (material) quality report start action
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchProdInputMaterialQualityReport(
  payload,
  onSuccess,
  onError,
) {
  return {
    type: SEARCH_PROD_INPUT_MATERIAL_QUALITY_REPORT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search production input (material) quality report success action
 * @param {*} payload
 * @returns {object}
 */
export function searchProdInputMaterialQualityReportSuccess(payload) {
  return {
    type: SEARCH_PROD_INPUT_MATERIAL_QUALITY_REPORT_SUCCESS,
    payload: payload,
  }
}

/**
 * Search production input (material) quality report fail action
 * @returns {object}
 */
export function searchProdInputMaterialQualityReportFail() {
  return {
    type: SEARCH_PROD_INPUT_MATERIAL_QUALITY_REPORT_FAIL,
  }
}

/**
 * Get MO list start action
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getMoList(payload, onSuccess, onError) {
  return {
    type: GET_MO_LIST_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get MO list success action
 * @param {*} payload
 * @returns {object}
 */
export function getMoListSuccess(payload) {
  return {
    type: GET_MO_LIST_SUCCESS,
    payload: payload,
  }
}

/**
 * Get MO list fail action
 * @returns {object}
 */
export function getMoListFail() {
  return {
    type: GET_MO_LIST_FAIL,
  }
}

/**
 * Get item list by MO start action
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getItemListByMo(payload, onSuccess, onError) {
  return {
    type: GET_ITEM_LIST_BY_MO_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get item list by MO success action
 * @param {*} payload
 * @returns {object}
 */
export function getItemListByMoSuccess(payload) {
  return {
    type: GET_ITEM_LIST_BY_MO_SUCCESS,
    payload: payload,
  }
}

/**
 * Get item list by MO fail action
 * @returns {object}
 */
export function getItemListByMoFail() {
  return {
    type: GET_ITEM_LIST_BY_MO_FAIL,
  }
}

/**
 * Get item list by PO start action
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getItemListByPo(payload, onSuccess, onError) {
  return {
    type: GET_ITEM_LIST_BY_PO_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get item list by PO success action
 * @param {*} payload
 * @returns {object}
 */
export function getItemListByPoSuccess(payload) {
  return {
    type: GET_ITEM_LIST_BY_PO_SUCCESS,
    payload: payload,
  }
}

/**
 * Get item list by PO fail action
 * @returns {object}
 */
export function getItemListByPoFail() {
  return {
    type: GET_ITEM_LIST_BY_PO_FAIL,
  }
}

/**
 * Get item list by SO start action
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getItemListBySo(payload, onSuccess, onError) {
  return {
    type: GET_ITEM_LIST_BY_SO_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get item list by SO success action
 * @param {*} payload
 * @returns {object}
 */
export function getItemListBySoSuccess(payload) {
  return {
    type: GET_ITEM_LIST_BY_SO_SUCCESS,
    payload: payload,
  }
}

/**
 * Get item list by SO fail action
 * @returns {object}
 */
export function getItemListBySoFail() {
  return {
    type: GET_ITEM_LIST_BY_SO_FAIL,
  }
}

/**
 * Get item list by PRO start action
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getItemListByPro(payload, onSuccess, onError) {
  return {
    type: GET_ITEM_LIST_BY_PRO_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get item list by PRO success action
 * @param {*} payload
 * @returns {object}
 */
export function getItemListByProSuccess(payload) {
  return {
    type: GET_ITEM_LIST_BY_PRO_SUCCESS,
    payload: payload,
  }
}

/**
 * Get item list by PRO fail action
 * @returns {object}
 */
export function getItemListByProFail() {
  return {
    type: GET_ITEM_LIST_BY_PRO_FAIL,
  }
}


/**
 * Get order list by stage start action
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getOrderListByStage(payload, onSuccess, onError) {
  return {
    type: GET_ORDER_LIST_BY_STAGE_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get order list by stage success action
 * @param {*} payload
 * @returns {object}
 */
export function getOrderListByStageSuccess(payload) {
  return {
    type: GET_ORDER_LIST_BY_STAGE_SUCCESS,
    payload: payload,
  }
}

/**
 * Get order list by stage fail action
 * @returns {object}
 */
export function getOrderListByStageFail() {
  return {
    type: GET_ORDER_LIST_BY_STAGE_FAIL,
  }
}

/**
 * Reset state action
 * @returns {object}
 */
export function resetQualityReportState() {
  return {
    type: RESET_QUALITY_REPORT_STATE,
  }
}

export default {
  searchInputQualityReport,
  searchInputQualityReportSuccess,
  searchInputQualityReportFail,
  searchOutputQualityReport,
  searchOutputQualityReportSuccess,
  searchOutputQualityReportFail,
  searchProductionOutputQualityReport,
  searchProductionOutputQualityReportSuccess,
  searchProductionOutputQualityReportFail,
  searchProdInputProductPrevQualityReport,
  searchProdInputProductPrevQualityReportSuccess,
  searchProdInputProductPrevQualityReportFail,
  searchProdInputMaterialQualityReport,
  searchProdInputMaterialQualityReportSuccess,
  searchProdInputMaterialQualityReportFail,
  getMoList,
  getMoListSuccess,
  getMoListFail,
  getItemListByMo,
  getItemListByMoSuccess,
  getItemListByMoFail,
  getItemListByPo,
  getItemListByPoSuccess,
  getItemListByPoFail,
  getItemListBySo,
  getItemListBySoSuccess,
  getItemListBySoFail,
  getItemListByPro,
  getItemListByProSuccess,
  getItemListByProFail,
  getOrderListByStage,
  getOrderListByStageSuccess,
  getOrderListByStageFail,
}
