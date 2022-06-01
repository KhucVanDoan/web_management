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
  setTotalItemSummaryReport,
  setOrtherItemSummaryReport,
  setItemGroupStockSummary,
  WMSX_GET_REPORT_GAP_IN_STOCK,
  getReportGapInstockSuccess,
} from '~/modules/wmsx/redux/actions/dashboard'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Confirm sale order
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getTransferReport = (params) => {
  const uri = `/v1/reports/warehouses/report-tranfer`
  return api.get(uri, params)
}

const getItemSummaryReport = (params) => {
  const uri = `/v1/reports/items/count-by-type`
  return api.get(uri, params)
}

const getTotalItemSummaryReport = (params) => {
  const uri = `/v1/items/reports/item-types/summary`
  return api.get(uri, params)
}

const getOrtherItemSummaryReport = (params) => {
  const uri = `/v1/items/reports/item-types/others/summary`
  return api.get(uri, params)
}

const getItemStockReport = (params) => {
  const uri = `/v1/reports/warehouses/report-stock`
  return api.get(uri, params)
}

const getMovementReport = (params) => {
  const uri = `/v1/reports/warehouses/month-movement`
  return api.get(uri, params)
}

const getItemGroupStockSummary = (params) => {
  const uri = `/v1/items/reports/item-group/stocks`
  return api.get(uri, params)
}

const getReportGapsInStockApi = (params) => {
  const uri = `/v1/reports/warehouses/sectors-fullments`
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

export default function* watchDashboard() {
  yield takeLatest(WMSX_GET_TRANSFER_REPORT, doGetTransferReport)
  yield takeLatest(WMSX_GET_ITEM_STOCK_REPORT, doGetItemStockReport)
  yield takeLatest(WMSX_GET_MOVEMENT_REPORT, doGetMovementReport)
  yield takeLatest(WMSX_GET_ITEM_SUMMARY_REPORT, doGetItemSummaryReport)
  yield takeLatest(WMSX_GET_ITEM_SUMMARY_REPORT, doGetTotalItemSummaryReport)
  yield takeLatest(WMSX_GET_ITEM_SUMMARY_REPORT, doGetOrtherItemSummaryReport)
  yield takeLatest(
    WMSX_GET_ITEM_GROUP_STOCK_SUMMARY,
    doGetItemGroupStockSummary,
  )
  yield takeLatest(WMSX_GET_REPORT_GAP_IN_STOCK, doReportGapInStock)
}
