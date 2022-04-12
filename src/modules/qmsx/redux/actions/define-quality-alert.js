// Action: Get list
export const SEARCH_QUALITY_ALERT_START = 'SEARCH_QUALITY_ALERT_START'
export const SEARCH_QUALITY_ALERT_SUCCESS = 'SEARCH_QUALITY_ALERT_SUCCESS'
export const SEARCH_QUALITY_ALERT_FAIL = 'SEARCH_QUALITY_ALERT_FAIL'
// Action: Create
export const CREATE_QUALITY_ALERT_START = 'CREATE_QUALITY_ALERT_START'
export const CREATE_QUALITY_ALERT_SUCCESS = 'CREATE_QUALITY_ALERT_SUCCESS'
export const CREATE_QUALITY_ALERT_FAIL = 'CREATE_QUALITY_ALERT_FAIL'
// Action: Update
export const UPDATE_QUALITY_ALERT_START = 'UPDATE_QUALITY_ALERT_START'
export const UPDATE_QUALITY_ALERT_SUCCESS = 'UPDATE_QUALITY_ALERT_SUCCESS'
export const UPDATE_QUALITY_ALERT_FAIL = 'UPDATE_QUALITY_ALERT_FAIL'
// Action: Delete
export const DELETE_QUALITY_ALERT_START = 'DELETE_QUALITY_ALERT_START'
export const DELETE_QUALITY_ALERT_SUCCESS = 'DELETE_QUALITY_ALERT_SUCCESS'
export const DELETE_QUALITY_ALERT_FAIL = 'DELETE_QUALITY_ALERT_FAIL'
// Action: Get detail
export const GET_QUALITY_ALERT_DETAIL_START = 'GET_QUALITY_ALERT_DETAIL_START'
export const GET_QUALITY_ALERT_DETAIL_SUCCESS =
  'GET_QUALITY_ALERT_DETAIL_SUCCESS'
export const GET_QUALITY_ALERT_DETAIL_FAIL = 'GET_QUALITY_ALERT_DETAIL_FAIL'
// Action: Confirm list
export const CONFIRM_QUALITY_ALERT_START = 'CONFIRM_QUALITY_ALERT_START'
export const CONFIRM_QUALITY_ALERT_SUCCESS = 'CONFIRM_QUALITY_ALERT_SUCCESS'
export const CONFIRM_QUALITY_ALERT_FAIL = 'CONFIRM_QUALITY_ALERT_FAIL'
// Action: reset detail
export const RESET_QUALITY_ALERT_DETAIL_STATE =
  'RESET_QUALITY_ALERT_DETAIL_STATE'
// Action: Get Mo
export const GET_MO_START = 'GET_MO_START'
export const GET_MO_SUCCESS = 'GET_MO_SUCCESS'
export const GET_MO_FAIL = 'GET_MO_FAIL'
// Action: Get product by mo-id
export const GET_PRODUCTS_BY_MO_START = 'GET_PRODUCTS_BY_MO_START'
export const GET_PRODUCTS_BY_MO_SUCCESS = 'GET_PRODUCTS_BY_MO_SUCCESS'
export const GET_PRODUCTS_BY_MO_FAIL = 'GET_PRODUCTS_BY_MO_FAIL'
// Action: Get routing by product-id
export const GET_ROUTING_BY_PRODUCT_START = 'GET_ROUTING_BY_PRODUCT_START'
export const GET_ROUTING_BY_PRODUCT_SUCCESS = 'GET_ROUTING_BY_PRODUCT_SUCCESS'
export const GET_ROUTING_BY_PRODUCT_FAIL = 'GET_ROUTING_BY_PRODUCT_FAIL'
// Action: Get producing-step by routing-id
export const GET_PRODUCING_STEP_BY_ROUTING_START =
  'GET_PRODUCING_STEP_BY_ROUTING_START'
export const GET_PRODUCING_STEP_BY_ROUTING_SUCCESS =
  'GET_PRODUCING_STEP_BY_ROUTING_SUCCESS'
export const GET_PRODUCING_STEP_BY_ROUTING_FAIL =
  'GET_PRODUCING_STEP_BY_ROUTING_FAIL'
// Action: Get Order by StageQcValue
export const GET_ORDER_BY_STAGE_QC_VALUES_START =
  'GET_ORDER_BY_STAGE_QC_VALUES_START'
export const GET_ORDER_BY_STAGE_QC_VALUES_SUCCESS =
  'GET_ORDER_BY_STAGE_QC_VALUES_SUCCESS'
export const GET_ORDER_BY_STAGE_QC_VALUES_FAIL =
  'GET_ORDER_BY_STAGE_QC_VALUES_FAIL'
// Action: Get product by orderId
export const GET_PRODUCT_BY_ORDER_ID_START = 'GET_PRODUCT_BY_ORDER_ID_START'
export const GET_PRODUCT_BY_ORDER_ID_SUCCESS = 'GET_PRODUCT_BY_ORDER_ID_SUCCESS'
export const GET_PRODUCT_BY_ORDER_ID_FAIL = 'GET_PRODUCT_BY_ORDER_ID_FAIL'
// Action: Get warehouse by orderId and productId
export const GET_WAREHOUSE_BY_ORDER_ID_AND_PRODUCT_ID_START =
  'GET_WAREHOUSE_BY_ORDER_ID_AND_PRODUCT_ID_START'
export const GET_WAREHOUSE_BY_ORDER_ID_AND_PRODUCT_ID_SUCCESS =
  'GET_WAREHOUSE_BY_ORDER_ID_AND_PRODUCT_ID_SUCCESS'
export const GET_WAREHOUSE_BY_ORDER_ID_AND_PRODUCT_ID_FAIL =
  'GET_WAREHOUSE_BY_ORDER_ID_AND_PRODUCT_ID_FAIL'
// Action: Get error-report by stageQcValue - orderId - productId and warehouseId start action
export const GET_ERROR_REPORT_BY_STAGE_QC_VALUE_ORDER_ID_PRODUCT_ID_AND_WAREHOUSE_ID_START =
  'GET_ERROR_REPORT_BY_STAGE_QC_VALUE_ORDER_ID_PRODUCT_ID_AND_WAREHOUSE_ID_START'
export const GET_ERROR_REPORT_BY_STAGE_QC_VALUE_ORDER_ID_PRODUCT_ID_AND_WAREHOUSE_ID_SUCCESS =
  'GET_ERROR_REPORT_BY_STAGE_QC_VALUE_ORDER_ID_PRODUCT_ID_AND_WAREHOUSE_ID_SUCCESS'
export const GET_ERROR_REPORT_BY_STAGE_QC_VALUE_ORDER_ID_PRODUCT_ID_AND_WAREHOUSE_ID_FAIL =
  'GET_ERROR_REPORT_BY_STAGE_QC_VALUE_ORDER_ID_PRODUCT_ID_AND_WAREHOUSE_ID_FAIL'
// Action: Get related-user by warehouseId start action
export const GET_RELATED_USER_BY_WAREHOUSE_ID_START =
  'GET_RELATED_USER_BY_WAREHOUSE_ID_START'
export const GET_RELATED_USER_BY_WAREHOUSE_ID_SUCCESS =
  'GET_RELATED_USER_BY_WAREHOUSE_ID_SUCCESS'
export const GET_RELATED_USER_BY_WAREHOUSE_ID_FAIL =
  'GET_RELATED_USER_BY_WAREHOUSE_ID_FAIL'

/**
 * Search quality-alert start action
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function searchQualityAlert(payload, onSuccess, onError) {
  return {
    type: SEARCH_QUALITY_ALERT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search quality-alert success action
 * @param {*} payload
 * @returns {object}
 */
export function searchQualityAlertSuccess(payload) {
  return {
    type: SEARCH_QUALITY_ALERT_SUCCESS,
    payload: payload,
  }
}

/**
 * Search quality-alert fail action
 * @returns {object}
 */
export function searchQualityAlertFail() {
  return {
    type: SEARCH_QUALITY_ALERT_FAIL,
  }
}

/**
 * Create quality-alert start action
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createQualityAlert(payload, onSuccess, onError) {
  return {
    type: CREATE_QUALITY_ALERT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Create quality-alert success action
 * @param {*} payload
 * @returns {object}
 */
export function createQualityAlertSuccess(payload) {
  return {
    type: CREATE_QUALITY_ALERT_SUCCESS,
    payload: payload,
  }
}

/**
 * Create quality-alert fail action
 * @returns {object}
 */
export function createQualityAlertFail() {
  return {
    type: CREATE_QUALITY_ALERT_FAIL,
  }
}

/**
 * Update quality-alert start action
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateQualityAlert(payload, onSuccess, onError) {
  return {
    type: UPDATE_QUALITY_ALERT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Update quality-alert success action
 * @param {*} payload
 * @returns {object}
 */
export function updateQualityAlertSuccess(payload) {
  return {
    type: UPDATE_QUALITY_ALERT_SUCCESS,
    payload: payload,
  }
}

/**
 * Update quality-alert fail action
 * @returns {object}
 */
export function updateQualityAlertFail() {
  return {
    type: UPDATE_QUALITY_ALERT_FAIL,
  }
}
/**
 * Delete quality-alert start action
 * @param {int} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteQualityAlert(payload, onSuccess, onError) {
  return {
    type: DELETE_QUALITY_ALERT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete quality-alert success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteQualityAlertSuccess(payload) {
  return {
    type: DELETE_QUALITY_ALERT_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete quality-alert fail action
 * @returns {object}
 */
export function deleteQualityAlertFail() {
  return {
    type: DELETE_QUALITY_ALERT_FAIL,
  }
}

/**
 * Get quality-alert detail start action
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getQualityAlertDetailById(payload, onSuccess, onError) {
  return {
    type: GET_QUALITY_ALERT_DETAIL_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get quality-alert detail start action
 * @param {*} payload
 * @returns {object}
 */
export function getQualityAlertDetailByIdSuccess(payload) {
  return {
    type: GET_QUALITY_ALERT_DETAIL_SUCCESS,
    payload: payload,
  }
}

/**
 * Get quality-alert detail fail action
 * @returns {object}
 */
export function getQualityAlertDetailByIdFail() {
  return {
    type: GET_QUALITY_ALERT_DETAIL_FAIL,
  }
}

/**
 * Confirm quality-alert start action
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function confirmQualityAlert(payload, onSuccess, onError) {
  return {
    type: CONFIRM_QUALITY_ALERT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Confirm quality-alert success action
 * @param {*} payload
 * @returns {object}
 */
export function confirmQualityAlertSuccess(payload) {
  return {
    type: CONFIRM_QUALITY_ALERT_SUCCESS,
    payload: payload,
  }
}

/**
 * Confirm quality-alert fail action
 * @returns {object}
 */
export function confirmQualityAlertFail() {
  return {
    type: CONFIRM_QUALITY_ALERT_FAIL,
  }
}

/**
 * Reset state action
 * @returns {object}
 */
export function resetQualityAlertDetailState() {
  return {
    type: RESET_QUALITY_ALERT_DETAIL_STATE,
  }
}

//--
//---Form---//
/**
 * get mo start action
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getMo(payload, onSuccess, onError) {
  return {
    type: GET_MO_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * get mo success action
 * @param {*} payload
 * @returns {object}
 */
export function getMoSuccess(payload) {
  return {
    type: GET_MO_SUCCESS,
    payload: payload,
  }
}

/**
 * GET mo fail action
 * @returns {object}
 */
export function getMoFail() {
  return {
    type: GET_MO_FAIL,
  }
}

/**
 * get products By mo-id start action
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getProductsByMo(payload, onSuccess, onError) {
  return {
    type: GET_PRODUCTS_BY_MO_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * get products By mo-id success action
 * @param {*} payload
 * @returns {object}
 */
export function getProductsByMoSuccess(payload) {
  return {
    type: GET_PRODUCTS_BY_MO_SUCCESS,
    payload: payload,
  }
}

/**
 * get products by mo-id fail action
 * @returns {object}
 */
export function getProductsByMoFail() {
  return {
    type: GET_PRODUCTS_BY_MO_FAIL,
  }
}

/**
 * get routing by product-id start action
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getRoutingByProduct(payload, onSuccess, onError) {
  return {
    type: GET_ROUTING_BY_PRODUCT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * get routing by product-id success action
 * @param {*} payload
 * @returns {object}
 */
export function getRoutingByProductSuccess(payload) {
  return {
    type: GET_ROUTING_BY_PRODUCT_SUCCESS,
    payload: payload,
  }
}

/**
 * get routing by product-id fail action
 * @returns {object}
 */
export function getRoutingByProductFail() {
  return {
    type: GET_ROUTING_BY_PRODUCT_FAIL,
  }
}

/**
 * get producing-step by routing-id start action
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getProducingStepByRouting(payload, onSuccess, onError) {
  return {
    type: GET_PRODUCING_STEP_BY_ROUTING_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * get producing-step by routing-id success action
 * @param {*} payload
 * @returns {object}
 */
export function getProducingStepByRoutingSuccess(payload) {
  return {
    type: GET_PRODUCING_STEP_BY_ROUTING_SUCCESS,
    payload: payload,
  }
}

/**
 * get producing-step by routing-id fail action
 * @returns {object}
 */
export function getProducingStepByRoutingFail() {
  return {
    type: GET_PRODUCING_STEP_BY_ROUTING_FAIL,
  }
}

/**
 * input-output: GET Order(Lệnh) by StageQcValue start action
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getOrderByStageQcValue(payload, onSuccess, onError) {
  return {
    type: GET_ORDER_BY_STAGE_QC_VALUES_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Input-output: GET Order(Lệnh) by StageQcValue success action
 * @param {*} payload
 * @returns {object}
 */
export function getOrderByStageQcValueSuccess(payload) {
  return {
    type: GET_ORDER_BY_STAGE_QC_VALUES_SUCCESS,
    payload: payload,
  }
}

/**
 * Input-output: GET Order(Lệnh) by StageQcValue fail action
 * @returns {object}
 */
export function getOrderByStageQcValueFail() {
  return {
    type: GET_ORDER_BY_STAGE_QC_VALUES_FAIL,
  }
}

/**
 * Input-output: GET product by orderId start action
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getProductByOrderId(payload, onSuccess, onError) {
  return {
    type: GET_PRODUCT_BY_ORDER_ID_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Input-output: GET product by orderId success action
 * @param {*} payload
 * @returns {object}
 */
export function getProductByOrderIdSuccess(payload) {
  return {
    type: GET_PRODUCT_BY_ORDER_ID_SUCCESS,
    payload: payload,
  }
}

/**
 * Input-output: GET product by orderId fail action
 * @returns {object}
 */
export function getProductByOrderIdFail() {
  return {
    type: GET_PRODUCT_BY_ORDER_ID_FAIL,
  }
}

/**
 * Input-output: GET warehouse by orderId and productId start action
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getWarehouseByOrderIdAndProductId(payload, onSuccess, onError) {
  return {
    type: GET_WAREHOUSE_BY_ORDER_ID_AND_PRODUCT_ID_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Input-output: GET warehouse by orderId and productId success action
 * @param {*} payload
 * @returns {object}
 */
export function getWarehouseByOrderIdAndProductIdSuccess(payload) {
  return {
    type: GET_WAREHOUSE_BY_ORDER_ID_AND_PRODUCT_ID_SUCCESS,
    payload: payload,
  }
}

/**
 * Input-output: GET warehouse by orderId and productId fail action
 * @returns {object}
 */
export function getWarehouseByOrderIdAndProductIdFail() {
  return {
    type: GET_WAREHOUSE_BY_ORDER_ID_AND_PRODUCT_ID_FAIL,
  }
}

/**
 * Input-output: GET error-report by stageQcValue - orderId - productId and warehouseId start action
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getErrorReportByStageQcValueOrderIdProductIdWarehouseId(
  payload,
  onSuccess,
  onError,
) {
  return {
    type: GET_ERROR_REPORT_BY_STAGE_QC_VALUE_ORDER_ID_PRODUCT_ID_AND_WAREHOUSE_ID_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 *  Input-output: GET error-report by stageQcValue - orderId - productId and warehouseId success action
 * @param {*} payload
 * @returns {object}
 */
export function getErrorReportByStageQcValueOrderIdProductIdWarehouseIdSuccess(
  payload,
) {
  return {
    type: GET_ERROR_REPORT_BY_STAGE_QC_VALUE_ORDER_ID_PRODUCT_ID_AND_WAREHOUSE_ID_SUCCESS,
    payload: payload,
  }
}

/**
 * Input-output: GET error-report by stageQcValue - orderId - productId and warehouseId fail action
 * @returns {object}
 */
export function getErrorReportByStageQcValueOrderIdProductIdWarehouseIdFail() {
  return {
    type: GET_ERROR_REPORT_BY_STAGE_QC_VALUE_ORDER_ID_PRODUCT_ID_AND_WAREHOUSE_ID_FAIL,
  }
}

/**
 * input-output: GET related-user by warehouseId start action
 * @param {object} payload
 * @param {function} onSuccess Callback function on success
 * @param {function} onError Callback function on error
 * @returns {object}
 */
export function getRelatedUserByWarehouseId(payload, onSuccess, onError) {
  return {
    type: GET_RELATED_USER_BY_WAREHOUSE_ID_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Input-output: GET related-user by warehouseId success action
 * @param {*} payload
 * @returns {object}
 */
export function getRelatedUserByWarehouseIdSuccess(payload) {
  return {
    type: GET_RELATED_USER_BY_WAREHOUSE_ID_SUCCESS,
    payload: payload,
  }
}

/**
 * Input-output: GET related-user by warehouseId fail action
 * @returns {object}
 */
export function getRelatedUserByWarehouseIdFail() {
  return {
    type: GET_RELATED_USER_BY_WAREHOUSE_ID_FAIL,
  }
}

export default {
  searchQualityAlert,
  searchQualityAlertSuccess,
  searchQualityAlertFail,
  createQualityAlert,
  createQualityAlertSuccess,
  createQualityAlertFail,
  getQualityAlertDetailById,
  getQualityAlertDetailByIdSuccess,
  getQualityAlertDetailByIdFail,
  updateQualityAlert,
  updateQualityAlertSuccess,
  updateQualityAlertFail,
  deleteQualityAlert,
  deleteQualityAlertSuccess,
  deleteQualityAlertFail,
  confirmQualityAlert,
  confirmQualityAlertSuccess,
  confirmQualityAlertFail,
  resetQualityAlertDetailState,
  //Production
  getMo,
  getMoSuccess,
  getMoFail,
  getProductsByMo,
  getProductsByMoSuccess,
  getProductsByMoFail,
  getRoutingByProduct,
  getRoutingByProductSuccess,
  getRoutingByProductFail,
  getProducingStepByRouting,
  getProducingStepByRoutingSuccess,
  getProducingStepByRoutingFail,
  //In-out
  getOrderByStageQcValue,
  getOrderByStageQcValueSuccess,
  getOrderByStageQcValueFail,
  getProductByOrderId,
  getProductByOrderIdSuccess,
  getProductByOrderIdFail,
  getWarehouseByOrderIdAndProductId,
  getWarehouseByOrderIdAndProductIdSuccess,
  getWarehouseByOrderIdAndProductIdFail,
  getErrorReportByStageQcValueOrderIdProductIdWarehouseId,
  getErrorReportByStageQcValueOrderIdProductIdWarehouseIdSuccess,
  getErrorReportByStageQcValueOrderIdProductIdWarehouseIdFail,
  getRelatedUserByWarehouseId,
  getRelatedUserByWarehouseIdSuccess,
  getRelatedUserByWarehouseIdFail,
}
