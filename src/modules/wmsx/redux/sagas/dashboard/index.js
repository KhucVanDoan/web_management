import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  WMSX_GET_ITEM_STOCK_REPORT,
  WMSX_GET_TRANSFER_REPORT,
  setTransferReport,
  setItemStockReport,
  WMSX_GET_MOVEMENT_REPORT,
  WMSX_GET_ITEM_SUMMARY_REPORT,
  WMSX_GET_ITEM_GROUP_STOCK_SUMMARY,
  setMovementReport,
  setItemSummaryReport,
  setOrtherItemSummaryReport,
  setItemGroupStockSummary,
  WMSX_GET_REPORT_GAP_IN_STOCK,
  getReportGapInstockSuccess,
  WMSX_GET_PURCHASED_ORDER_IMPORTS,
  setPurchasedOrderImports,
  WMSX_GET_SALE_ORDER_EXPORTS,
  setSaleOrderExports,
  WMSX_GET_TOTAL_ITEM_SUMMARY_REPORT,
  setTotalItemSummaryReport,
  setItemStockHistories,
  WMSX_GET_ITEM_STOCK_HISTORIES,
  setItemStockConstructionScl,
  WMSX_GET_ITEM_CONSTRUCTION_SCL,
} from '~/modules/wmsx/redux/actions/dashboard'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const getTransferReport = (params) => {
  const uri = `/v1/items/dashboard/item-movements`
  return api.get(uri, params)
}

const getItemSummaryReport = (params) => {
  const uri = `/v1/items/reports/count-by-type`
  return api.get(uri, params)
}

const getTotalItemSummaryReport = (params) => {
  const uri = `/v1/warehouses/dashboard/orders/total`
  return api.get(uri, params)
}

const getOrtherItemSummaryReport = (params) => {
  const uri = `/v1/items/reports/item-types/others/summary`
  return api.get(uri, params)
}

const getItemStockReport = (params) => {
  const uri = `/v1/warehouses/reports/report-stock`
  return api.get(uri, params)
}

const getMovementReport = (params) => {
  const uri = `/v1/warehouses/reports/month-movement`
  return api.get(uri, params)
}

const getItemGroupStockSummary = (params) => {
  const uri = `/v1/items/dashboard/item-stocks`
  return api.get(uri, params)
}

const getReportGapsInStockApi = (params) => {
  const uri = `/v1/warehouses/reports/sectors-fullments`
  return api.get(uri, params)
}

const getPurchasedOrderImports = (params) => {
  const uri = `/v1/sales/dashboard/purchased-order-imports/total`
  return api.get(uri, params)
}

const getSaleOrderExports = (params) => {
  const uri = `/v1/sales/dashboard/sale-order-exports/total`
  return api.get(uri, params)
}

export const getDashboardItems = (params) => {
  const uri = `/v1/items/dashboard/items/list`
  return api.get(uri, params)
}

export const getDashboardWarehouses = (params) => {
  const uri = `/v1/warehouses/dashboard/warehouse/list`
  return api.get(uri, params)
}
export const getDashboardItemStockHistories = (params) => {
  const uri = `/v1/reports/dashboard/item-stock-histories`
  return api.get(uri, params)
}
export const getDashboardItemStockConstructionScl = (params) => {
  const uri = '/v1/items/dashboard/item-stock-construction-scl'
  return api.get(uri, params)
}
/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetTransferReport(action) {
  try {
    const response = yield call(getTransferReport, action?.payload)
    if (response?.statusCode === 200) {
      yield put(setTransferReport(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 *
 * @param {*} action
 */
function* doGetItemStockReport(action) {
  try {
    const response = yield call(getItemStockReport, action?.payload)
    if (response?.statusCode === 200) {
      yield put(setItemStockReport(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

function* doGetMovementReport(action) {
  try {
    const response = yield call(getMovementReport, action?.payload)
    if (response?.statusCode === 200) {
      yield put(setMovementReport(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

function* doGetItemSummaryReport(action) {
  try {
    const response = yield call(getItemSummaryReport, action?.payload)
    if (response?.statusCode === 200) {
      yield put(setItemSummaryReport(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

function* doGetOrtherItemSummaryReport(action) {
  try {
    const response = yield call(getOrtherItemSummaryReport)
    if (response?.statusCode === 200) {
      yield put(setOrtherItemSummaryReport(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

function* doGetTotalItemSummaryReport(action) {
  try {
    const response = yield call(getTotalItemSummaryReport, action?.payload)
    if (response?.statusCode === 200) {
      yield put(setTotalItemSummaryReport(response.data))
      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

function* doGetItemGroupStockSummary(action) {
  try {
    const response = yield call(getItemGroupStockSummary, action?.payload)
    if (response?.statusCode === 200) {
      yield put(setItemGroupStockSummary(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

function* doReportGapInStock(action) {
  try {
    const response = yield call(getReportGapsInStockApi, action?.payload)
    if (response?.statusCode === 200) {
      yield put(getReportGapInstockSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

function* doGetPurchasedOrderImports(action) {
  try {
    const response = yield call(getPurchasedOrderImports, action?.payload)
    if (response?.statusCode === 200) {
      yield put(setPurchasedOrderImports(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

function* doGetSaleOrderExports(action) {
  try {
    const response = yield call(getSaleOrderExports, action?.payload)
    if (response?.statusCode === 200) {
      yield put(setSaleOrderExports(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

function* doGetItemStockHistories(action) {
  try {
    const response = yield call(getDashboardItemStockHistories, action?.payload)
    if (response?.statusCode === 200) {
      yield put(setItemStockHistories(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}
function* doGetItemStockConstrucitonScl(action) {
  try {
    const response = yield call(
      getDashboardItemStockConstructionScl,
      action?.payload,
    )
    if (response?.statusCode === 200) {
      yield put(setItemStockConstructionScl(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}
export default function* watchDashboard() {
  yield takeLatest(WMSX_GET_TRANSFER_REPORT, doGetTransferReport)
  yield takeLatest(WMSX_GET_ITEM_STOCK_REPORT, doGetItemStockReport)
  yield takeLatest(WMSX_GET_MOVEMENT_REPORT, doGetMovementReport)
  yield takeLatest(WMSX_GET_ITEM_SUMMARY_REPORT, doGetItemSummaryReport)
  yield takeLatest(
    WMSX_GET_TOTAL_ITEM_SUMMARY_REPORT,
    doGetTotalItemSummaryReport,
  )
  yield takeLatest(WMSX_GET_ITEM_SUMMARY_REPORT, doGetOrtherItemSummaryReport)
  yield takeLatest(
    WMSX_GET_ITEM_GROUP_STOCK_SUMMARY,
    doGetItemGroupStockSummary,
  )
  yield takeLatest(WMSX_GET_REPORT_GAP_IN_STOCK, doReportGapInStock)
  yield takeLatest(WMSX_GET_PURCHASED_ORDER_IMPORTS, doGetPurchasedOrderImports)
  yield takeLatest(WMSX_GET_SALE_ORDER_EXPORTS, doGetSaleOrderExports)
  yield takeLatest(WMSX_GET_ITEM_STOCK_HISTORIES, doGetItemStockHistories)
  yield takeLatest(
    WMSX_GET_ITEM_CONSTRUCTION_SCL,
    doGetItemStockConstrucitonScl,
  )
}
