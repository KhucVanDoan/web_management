export const WMSX_GET_TRANSFER_REPORT = 'WMSX_GET_TRANSFER_REPORT'
export const WMSX_GET_TRANSFER_REPORT_SUCCESS =
  'WMSX_GET_TRANSFER_REPORT_SUCCESS'
export const WMSX_GET_ITEM_STOCK_REPORT = 'WMSX_GET_ITEM_STOCK_REPORT'
export const WMSX_GET_ITEM_STOCK_REPORT_SUCCESS =
  'WMSX_GET_ITEM_STOCK_REPORT_SUCCESS'
export const WMSX_GET_MOVEMENT_REPORT = 'WMSX_GET_MOVEMENT_REPORT'
export const WMSX_GET_MOVEMENT_REPORT_SUCCESS =
  'WMSX_GET_MOVEMENT_REPORT_SUCCESS'
export const WMSX_GET_ITEM_SUMMARY_REPORT = 'WMSX_GET_ITEM_SUMMARY_REPORT'
export const WMSX_GET_ITEM_SUMMARY_REPORT_SUCCESS =
  'WMSX_GET_ITEM_SUMMARY_REPORT_SUCCESS'
export const WMSX_GET_TOTAL_ITEM_SUMMARY_REPORT =
  'WMSX_GET_TOTAL_ITEM_SUMMARY_REPORT'
export const WMSX_GET_TOTAL_ITEM_SUMMARY_REPORT_SUCCESS =
  'WMSX_GET_TOTAL_ITEM_SUMMARY_REPORT_SUCCESS'
export const WMSX_GET_OTHER_ITEM_SUMMARY_REPORT =
  'WMSX_GET_OTHER_ITEM_SUMMARY_REPORT'
export const WMSX_GET_OTHER_ITEM_SUMMARY_REPORT_SUCCESS =
  'WMSX_GET_OTHER_ITEM_SUMMARY_REPORT_SUCCESS'
export const WMSX_GET_ITEM_GROUP_STOCK_SUMMARY =
  'WMSX_GET_ITEM_GROUP_STOCK_SUMMARY'
export const WMSX_GET_ITEM_GROUP_STOCK_SUMMARY_SUCCESS =
  'WMSX_GET_ITEM_GROUP_STOCK_SUMMARY_SUCCESS'
export const WMSX_GET_REPORT_GAP_IN_STOCK = 'WMSX_GET_REPORT_GAP_IN_STOCK'
export const WMSX_GET_REPORT_GAP_IN_STOCK_SUCCESS =
  'WMSX_GET_REPORT_GAP_IN_STOCK_SUCCESS'
export const WMSX_GET_PURCHASED_ORDER_IMPORTS =
  'WMSX_GET_PURCHASED_ORDER_IMPORTS'
export const WMSX_GET_PURCHASED_ORDER_IMPORTS_SUCCESS =
  'WMSX_GET_PURCHASED_ORDER_IMPORTS_SUCCESS'
export const WMSX_GET_SALE_ORDER_EXPORTS = 'WMSX_GET_SALE_ORDER_EXPORTS'
export const WMSX_GET_SALE_ORDER_EXPORTS_SUCCESS =
  'WMSX_GET_SALE_ORDER_EXPORTS_SUCCESS'

export function getPurchasedOrderImports(payload) {
  return {
    type: WMSX_GET_PURCHASED_ORDER_IMPORTS,
    payload: payload,
  }
}

export function setPurchasedOrderImports(payload) {
  return {
    type: WMSX_GET_PURCHASED_ORDER_IMPORTS_SUCCESS,
    payload: payload,
  }
}

export function getSaleOrderExports(payload) {
  return {
    type: WMSX_GET_SALE_ORDER_EXPORTS,
    payload: payload,
  }
}

export function setSaleOrderExports(payload) {
  return {
    type: WMSX_GET_SALE_ORDER_EXPORTS_SUCCESS,
    payload: payload,
  }
}

export function getItemGroupStockSummary(payload) {
  return {
    type: WMSX_GET_ITEM_GROUP_STOCK_SUMMARY,
    payload: payload,
  }
}

export function setItemGroupStockSummary(payload) {
  return {
    type: WMSX_GET_ITEM_GROUP_STOCK_SUMMARY_SUCCESS,
    payload: payload,
  }
}

export function getTransferReport(payload) {
  return {
    type: WMSX_GET_TRANSFER_REPORT,
    payload: payload,
  }
}

export function setTransferReport(payload) {
  return {
    type: WMSX_GET_TRANSFER_REPORT_SUCCESS,
    payload: payload,
  }
}

export function getItemStockReport(payload) {
  return {
    type: WMSX_GET_ITEM_STOCK_REPORT,
    payload: payload,
  }
}

export function setItemStockReport(payload) {
  return {
    type: WMSX_GET_ITEM_STOCK_REPORT_SUCCESS,
    payload: payload,
  }
}

export function getMovementReport(payload) {
  return {
    type: WMSX_GET_MOVEMENT_REPORT,
    payload: payload,
  }
}

export function setMovementReport(payload) {
  return {
    type: WMSX_GET_MOVEMENT_REPORT_SUCCESS,
    payload: payload,
  }
}

export function getItemSummaryReport(payload) {
  return {
    type: WMSX_GET_ITEM_SUMMARY_REPORT,
    payload: payload,
  }
}

export function setItemSummaryReport(payload) {
  return {
    type: WMSX_GET_ITEM_SUMMARY_REPORT_SUCCESS,
    payload: payload,
  }
}

export function getTotalItemSummaryReport(payload) {
  return {
    type: WMSX_GET_TOTAL_ITEM_SUMMARY_REPORT,
    payload: payload,
  }
}

export function setTotalItemSummaryReport(payload) {
  return {
    type: WMSX_GET_TOTAL_ITEM_SUMMARY_REPORT_SUCCESS,
    payload: payload,
  }
}

export function getOrtherItemSummaryReport(payload) {
  return {
    type: WMSX_GET_OTHER_ITEM_SUMMARY_REPORT,
    payload: payload,
  }
}

export function setOrtherItemSummaryReport(payload) {
  return {
    type: WMSX_GET_OTHER_ITEM_SUMMARY_REPORT_SUCCESS,
    payload: payload,
  }
}

export const getReportGapInstock = (payload, onSuccess, onError) => ({
  type: WMSX_GET_REPORT_GAP_IN_STOCK,
  payload,
  onError,
  onSuccess,
})

export const getReportGapInstockSuccess = (payload) => ({
  type: WMSX_GET_REPORT_GAP_IN_STOCK_SUCCESS,
  payload,
})

export default {
  getItemGroupStockSummary,
  setItemGroupStockSummary,
  getTransferReport,
  setTransferReport,
  getItemStockReport,
  setItemStockReport,
  getMovementReport,
  setMovementReport,
  getItemSummaryReport,
  setItemSummaryReport,
  getTotalItemSummaryReport,
  setTotalItemSummaryReport,
  getOrtherItemSummaryReport,
  setOrtherItemSummaryReport,
  getReportGapInstock,
  getReportGapInstockSuccess,
  getPurchasedOrderImports,
  setPurchasedOrderImports,
  getSaleOrderExports,
  setSaleOrderExports,
}
