import {
  CONFIRM_QUALITY_ALERT_FAIL,
  CONFIRM_QUALITY_ALERT_START,
  CONFIRM_QUALITY_ALERT_SUCCESS,
  CREATE_QUALITY_ALERT_FAIL,
  CREATE_QUALITY_ALERT_START,
  CREATE_QUALITY_ALERT_SUCCESS,
  DELETE_QUALITY_ALERT_FAIL,
  DELETE_QUALITY_ALERT_START,
  DELETE_QUALITY_ALERT_SUCCESS,
  GET_QUALITY_ALERT_DETAIL_FAIL,
  GET_QUALITY_ALERT_DETAIL_START,
  GET_QUALITY_ALERT_DETAIL_SUCCESS,
  SEARCH_QUALITY_ALERT_FAIL,
  SEARCH_QUALITY_ALERT_START,
  SEARCH_QUALITY_ALERT_SUCCESS,
  UPDATE_QUALITY_ALERT_FAIL,
  UPDATE_QUALITY_ALERT_START,
  UPDATE_QUALITY_ALERT_SUCCESS,
  RESET_QUALITY_ALERT_DETAIL_STATE,
  GET_MO_START,
  GET_MO_SUCCESS,
  GET_MO_FAIL,
  GET_PRODUCTS_BY_MO_SUCCESS,
  GET_PRODUCTS_BY_MO_FAIL,
  GET_PRODUCTS_BY_MO_START,
  GET_ROUTING_BY_PRODUCT_START,
  GET_ROUTING_BY_PRODUCT_SUCCESS,
  GET_ROUTING_BY_PRODUCT_FAIL,
  GET_PRODUCING_STEP_BY_ROUTING_START,
  GET_PRODUCING_STEP_BY_ROUTING_SUCCESS,
  GET_PRODUCING_STEP_BY_ROUTING_FAIL,
  //---
  GET_ORDER_BY_STAGE_QC_VALUES_START,
  GET_ORDER_BY_STAGE_QC_VALUES_SUCCESS,
  GET_ORDER_BY_STAGE_QC_VALUES_FAIL,
  GET_PRODUCT_BY_ORDER_ID_START,
  GET_PRODUCT_BY_ORDER_ID_SUCCESS,
  GET_PRODUCT_BY_ORDER_ID_FAIL,
  GET_WAREHOUSE_BY_ORDER_ID_AND_PRODUCT_ID_START,
  GET_WAREHOUSE_BY_ORDER_ID_AND_PRODUCT_ID_SUCCESS,
  GET_WAREHOUSE_BY_ORDER_ID_AND_PRODUCT_ID_FAIL,
  GET_ERROR_REPORT_BY_STAGE_QC_VALUE_ORDER_ID_PRODUCT_ID_AND_WAREHOUSE_ID_START,
  GET_ERROR_REPORT_BY_STAGE_QC_VALUE_ORDER_ID_PRODUCT_ID_AND_WAREHOUSE_ID_SUCCESS,
  GET_ERROR_REPORT_BY_STAGE_QC_VALUE_ORDER_ID_PRODUCT_ID_AND_WAREHOUSE_ID_FAIL,
  GET_RELATED_USER_BY_WAREHOUSE_ID_START,
  GET_RELATED_USER_BY_WAREHOUSE_ID_SUCCESS,
  GET_RELATED_USER_BY_WAREHOUSE_ID_FAIL,
} from '~/modules/qmsx/redux/actions/define-quality-alert'

const initialState = {
  isLoading: false,
  qualityAlertList: [],
  qualityAlertDetail: {},
  total: null,
  moList: [],
  productByMoList: [],
  routingByProductList: [],
  producingStepByRoutingList: [],
  //--
  orderByStageQcList: [],
  productByOrderList: [],
  wareHouseByOrderAndProductList: [],
  errorReportByStageQcOrderProductAndWarehouseList: [],
  relatedUser: [],
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function defineQualityAlert(state = initialState, action) {
  switch (action.type) {
    case SEARCH_QUALITY_ALERT_START:
    case CREATE_QUALITY_ALERT_START:
    case UPDATE_QUALITY_ALERT_START:
    case DELETE_QUALITY_ALERT_START:
    case CONFIRM_QUALITY_ALERT_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_QUALITY_ALERT_DETAIL_START:
      return {
        ...state,
        isLoading: true, //TODO
      }
    case GET_MO_START:
    case GET_PRODUCTS_BY_MO_START:
    case GET_ROUTING_BY_PRODUCT_START:
    case GET_PRODUCING_STEP_BY_ROUTING_START:
      return {
        ...state,
        isLoading: false, //@TODO
      }
    case SEARCH_QUALITY_ALERT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        qualityAlertList: action?.payload?.list,
        total: action?.payload?.total,
      }
    case CREATE_QUALITY_ALERT_SUCCESS:
    case UPDATE_QUALITY_ALERT_SUCCESS:
    case DELETE_QUALITY_ALERT_SUCCESS:
    case CONFIRM_QUALITY_ALERT_SUCCESS:
    case SEARCH_QUALITY_ALERT_FAIL:
    case CREATE_QUALITY_ALERT_FAIL:
    case UPDATE_QUALITY_ALERT_FAIL:
    case DELETE_QUALITY_ALERT_FAIL:
    case GET_QUALITY_ALERT_DETAIL_FAIL:
    case CONFIRM_QUALITY_ALERT_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case GET_QUALITY_ALERT_DETAIL_SUCCESS:
      return {
        ...state,
        qualityAlertDetail: action?.payload,
        isLoading: false,
      }
    case RESET_QUALITY_ALERT_DETAIL_STATE:
      return {
        ...state,
        qualityAlertDetail: {},
      }
    case GET_MO_SUCCESS:
      return {
        ...state,
        moList: action.payload,
        isLoading: false,
      }
    case GET_MO_FAIL:
      return {
        ...state,
        moList: [],
        isLoading: false,
      }
    case GET_PRODUCTS_BY_MO_SUCCESS:
      return {
        ...state,
        productByMoList: action.payload,
        isLoading: false,
      }
    case GET_PRODUCTS_BY_MO_FAIL:
      return {
        ...state,
        productByMoList: [],
        isLoading: false,
      }
    case GET_ROUTING_BY_PRODUCT_SUCCESS:
      return {
        ...state,
        routingByProductList: action.payload,
        isLoading: false,
      }
    case GET_ROUTING_BY_PRODUCT_FAIL:
      return {
        ...state,
        routingByProductList: [],
        isLoading: false,
      }
    case GET_PRODUCING_STEP_BY_ROUTING_SUCCESS:
      return {
        ...state,
        producingStepByRoutingList: action.payload,
        isLoading: false,
      }
    case GET_PRODUCING_STEP_BY_ROUTING_FAIL:
      return {
        ...state,
        producingStepByRoutingList: [],
        isLoading: false,
      }
    //--
    case GET_ORDER_BY_STAGE_QC_VALUES_START:
    case GET_PRODUCT_BY_ORDER_ID_START:
    case GET_WAREHOUSE_BY_ORDER_ID_AND_PRODUCT_ID_START:
    case GET_ERROR_REPORT_BY_STAGE_QC_VALUE_ORDER_ID_PRODUCT_ID_AND_WAREHOUSE_ID_START:
    case GET_RELATED_USER_BY_WAREHOUSE_ID_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_ORDER_BY_STAGE_QC_VALUES_SUCCESS:
      return {
        ...state,
        orderByStageQcList: action.payload,
        isLoading: false,
      }
    case GET_PRODUCT_BY_ORDER_ID_SUCCESS:
      return {
        ...state,
        productByOrderList: action.payload,
        isLoading: false,
      }
    case GET_WAREHOUSE_BY_ORDER_ID_AND_PRODUCT_ID_SUCCESS:
      return {
        ...state,
        wareHouseByOrderAndProductList: action.payload,
        isLoading: false,
      }
    case GET_ERROR_REPORT_BY_STAGE_QC_VALUE_ORDER_ID_PRODUCT_ID_AND_WAREHOUSE_ID_SUCCESS:
      return {
        ...state,
        errorReportByStageQcOrderProductAndWarehouseList: action.payload,
        isLoading: false,
      }
    case GET_RELATED_USER_BY_WAREHOUSE_ID_SUCCESS:
      return {
        ...state,
        relatedUser: action.payload,
        isLoading: false,
      }
    case GET_ORDER_BY_STAGE_QC_VALUES_FAIL:
    case GET_PRODUCT_BY_ORDER_ID_FAIL:
    case GET_WAREHOUSE_BY_ORDER_ID_AND_PRODUCT_ID_FAIL:
    case GET_ERROR_REPORT_BY_STAGE_QC_VALUE_ORDER_ID_PRODUCT_ID_AND_WAREHOUSE_ID_FAIL:
    case GET_RELATED_USER_BY_WAREHOUSE_ID_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}
