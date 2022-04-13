import {
  GET_ITEM_LIST_BY_MO_FAIL,
  GET_ITEM_LIST_BY_MO_START,
  GET_ITEM_LIST_BY_MO_SUCCESS,
  GET_ITEM_LIST_BY_PO_FAIL,
  GET_ITEM_LIST_BY_PO_START,
  GET_ITEM_LIST_BY_PO_SUCCESS,
  GET_ITEM_LIST_BY_PRO_FAIL,
  GET_ITEM_LIST_BY_PRO_START,
  GET_ITEM_LIST_BY_PRO_SUCCESS,
  GET_ITEM_LIST_BY_SO_FAIL,
  GET_ITEM_LIST_BY_SO_START,
  GET_ITEM_LIST_BY_SO_SUCCESS,
  GET_MO_LIST_FAIL,
  GET_MO_LIST_START,
  GET_MO_LIST_SUCCESS,
  GET_ORDER_LIST_BY_STAGE_FAIL,
  GET_ORDER_LIST_BY_STAGE_START,
  GET_ORDER_LIST_BY_STAGE_SUCCESS,
  SEARCH_INPUT_QUALITY_REPORT_FAIL,
  SEARCH_INPUT_QUALITY_REPORT_START,
  SEARCH_INPUT_QUALITY_REPORT_SUCCESS,
  SEARCH_OUTPUT_QUALITY_REPORT_FAIL,
  SEARCH_OUTPUT_QUALITY_REPORT_START,
  SEARCH_OUTPUT_QUALITY_REPORT_SUCCESS,
  SEARCH_PROD_INPUT_MATERIAL_QUALITY_REPORT_FAIL,
  SEARCH_PROD_INPUT_MATERIAL_QUALITY_REPORT_START,
  SEARCH_PROD_INPUT_MATERIAL_QUALITY_REPORT_SUCCESS,
  SEARCH_PROD_INPUT_PRODUCT_PREV_QUALITY_REPORT_FAIL,
  SEARCH_PROD_INPUT_PRODUCT_PREV_QUALITY_REPORT_START,
  SEARCH_PROD_INPUT_PRODUCT_PREV_QUALITY_REPORT_SUCCESS,
  SEARCH_PRODUCTION_OUTPUT_QUALITY_REPORT_FAIL,
  SEARCH_PRODUCTION_OUTPUT_QUALITY_REPORT_START,
  SEARCH_PRODUCTION_OUTPUT_QUALITY_REPORT_SUCCESS,
} from '~/modules/qmsx/redux/actions/quality-report'

const initialState = {
  isLoading: false,
  itemList: [],
  orderList: [],
  total: null,
  qualityReportInputList: [],
  qualityReportOutputList: [],
  qualityReportProductionOutputList: [],
  qualityReportMaterialList: [],
  qualityReportProductPreviousList: [],
}

export default function qualityReport(state = initialState, action) {
  switch (action.type) {
    /** Input quality report **/
    case SEARCH_INPUT_QUALITY_REPORT_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_INPUT_QUALITY_REPORT_SUCCESS:
      return {
        ...state,
        qualityReportInputList: action?.payload?.list,
        isLoading: false,
        total: action?.payload?.total,
      }
    case SEARCH_INPUT_QUALITY_REPORT_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    /** Output quality report **/
    case SEARCH_OUTPUT_QUALITY_REPORT_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_OUTPUT_QUALITY_REPORT_SUCCESS:
      return {
        ...state,
        qualityReportOutputList: action?.payload?.list,
        isLoading: false,
        total: action?.payload?.total,
      }
    case SEARCH_OUTPUT_QUALITY_REPORT_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    /** Production output quality report **/
    case SEARCH_PRODUCTION_OUTPUT_QUALITY_REPORT_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_PRODUCTION_OUTPUT_QUALITY_REPORT_SUCCESS:
      return {
        ...state,
        qualityReportProductionOutputList: action?.payload?.list,
        isLoading: false,
        total: action?.payload?.total,
      }
    case SEARCH_PRODUCTION_OUTPUT_QUALITY_REPORT_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    /** Production input product previous quality report **/
    case SEARCH_PROD_INPUT_PRODUCT_PREV_QUALITY_REPORT_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_PROD_INPUT_PRODUCT_PREV_QUALITY_REPORT_SUCCESS:
      return {
        ...state,
        qualityReportProductPreviousList: action?.payload?.list,
        isLoading: false,
        total: action?.payload?.total,
      }
    case SEARCH_PROD_INPUT_PRODUCT_PREV_QUALITY_REPORT_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    /** Production input material quality report **/
    case SEARCH_PROD_INPUT_MATERIAL_QUALITY_REPORT_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_PROD_INPUT_MATERIAL_QUALITY_REPORT_SUCCESS:
      return {
        ...state,
        qualityReportMaterialList: action?.payload?.list,
        isLoading: false,
        total: action?.payload?.total,
      }
    case SEARCH_PROD_INPUT_MATERIAL_QUALITY_REPORT_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    /** Get MO list **/
    case GET_MO_LIST_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_MO_LIST_SUCCESS:
      return {
        ...state,
        orderList: action?.payload,
        isLoading: false,
      }
    case GET_MO_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    /** Get item list by MO **/
    case GET_ITEM_LIST_BY_MO_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_ITEM_LIST_BY_MO_SUCCESS:
      return {
        ...state,
        itemList: action?.payload,
        isLoading: false,
      }
    case GET_ITEM_LIST_BY_MO_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    /** Get item list by PO **/
    case GET_ITEM_LIST_BY_PO_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_ITEM_LIST_BY_PO_SUCCESS:
      return {
        ...state,
        itemList: action?.payload,
        isLoading: false,
      }
    case GET_ITEM_LIST_BY_PO_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    /** Get item list by SO **/
    case GET_ITEM_LIST_BY_SO_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_ITEM_LIST_BY_SO_SUCCESS:
      return {
        ...state,
        itemList: action?.payload,
        isLoading: false,
      }
    case GET_ITEM_LIST_BY_SO_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    /** Get item list by PRO **/
    case GET_ITEM_LIST_BY_PRO_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_ITEM_LIST_BY_PRO_SUCCESS:
      return {
        ...state,
        itemList: action?.payload,
        isLoading: false,
      }
    case GET_ITEM_LIST_BY_PRO_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    /** Get order list by stage **/
    case GET_ORDER_LIST_BY_STAGE_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_ORDER_LIST_BY_STAGE_SUCCESS:
      return {
        ...state,
        orderList: action?.payload,
        isLoading: false,
      }
    case GET_ORDER_LIST_BY_STAGE_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}
