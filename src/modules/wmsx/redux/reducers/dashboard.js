import {
  WMSX_GET_ITEM_STOCK_REPORT_SUCCESS,
  WMSX_GET_MOVEMENT_REPORT_SUCCESS,
  WMSX_GET_TRANSFER_REPORT_SUCCESS,
  WMSX_GET_ITEM_SUMMARY_REPORT_SUCCESS,
  WMSX_GET_TOTAL_ITEM_SUMMARY_REPORT_SUCCESS,
  WMSX_GET_OTHER_ITEM_SUMMARY_REPORT_SUCCESS,
  WMSX_GET_ITEM_GROUP_STOCK_SUMMARY_SUCCESS,
  WMSX_GET_REPORT_GAP_IN_STOCK_SUCCESS,
  WMSX_GET_PURCHASED_ORDER_IMPORTS_SUCCESS,
  WMSX_GET_SALE_ORDER_EXPORTS_SUCCESS,
  WMSX_GET_ITEM_STOCK_HISTORIES_SUCCESS,
} from '../actions/dashboard'

const initialState = {
  isLoading: false,
  transferReport: [],
  itemStockReport: [],
  movementReport: [],
  itemSummaryReport: [],
  otherItemSummaryReport: {},
  totalItemSummaryReport: {},
  itemGroupStockSummary: {},
  gapInStock: [],
  purchasedOrderImports: {},
  saleOrderExports: {},
  itemStockHistories: [],
}

export default function dashboard(state = initialState, action) {
  switch (action.type) {
    case WMSX_GET_TRANSFER_REPORT_SUCCESS:
      return {
        ...state,
        transferReport: action.payload,
      }
    case WMSX_GET_ITEM_STOCK_REPORT_SUCCESS:
      return {
        ...state,
        itemStockReport: action.payload,
      }
    case WMSX_GET_MOVEMENT_REPORT_SUCCESS:
      return {
        ...state,
        movementReport: action.payload,
      }
    case WMSX_GET_ITEM_SUMMARY_REPORT_SUCCESS:
      return {
        ...state,
        itemSummaryReport: action.payload,
      }
    case WMSX_GET_TOTAL_ITEM_SUMMARY_REPORT_SUCCESS:
      return {
        ...state,
        totalItemSummaryReport: action.payload,
      }
    case WMSX_GET_OTHER_ITEM_SUMMARY_REPORT_SUCCESS:
      return {
        ...state,
        otherItemSummaryReport: action.payload,
      }
    case WMSX_GET_ITEM_GROUP_STOCK_SUMMARY_SUCCESS:
      return {
        ...state,
        itemGroupStockSummary: action.payload,
      }
    case WMSX_GET_REPORT_GAP_IN_STOCK_SUCCESS:
      return {
        ...state,
        gapInStock: action.payload,
      }
    case WMSX_GET_PURCHASED_ORDER_IMPORTS_SUCCESS:
      return {
        ...state,
        purchasedOrderImports: action.payload,
      }
    case WMSX_GET_SALE_ORDER_EXPORTS_SUCCESS:
      return {
        ...state,
        saleOrderExports: action.payload,
      }
    case WMSX_GET_ITEM_STOCK_HISTORIES_SUCCESS:
      return {
        ...state,
        itemStockHistories: action.payload,
      }
    default:
      return state
  }
}
