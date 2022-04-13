import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  getErrorReportByStageQcValueOrderIdProductIdWarehouseIdFail,
  getErrorReportByStageQcValueOrderIdProductIdWarehouseIdSuccess,
  GET_ERROR_REPORT_BY_STAGE_QC_VALUE_ORDER_ID_PRODUCT_ID_AND_WAREHOUSE_ID_START,
} from '~/modules/qmsx/redux/actions/define-quality-alert'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * get Get error-report  API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getErrorReportByStageQcValueOrderIdProductIdWarehouseIdApi = (params) => {
  const uri = `/v1/quality-controls/alerts/env-error-report-by-command-item-warehouse/${params.stageQcValue}/${params.orderId}/${params.productId}/${params.warehouseId}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetErrorReportByStageQcValueOrderIdProductIdWarehouseId(action) {
  try {
    const response = yield call(
      getErrorReportByStageQcValueOrderIdProductIdWarehouseIdApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(
        getErrorReportByStageQcValueOrderIdProductIdWarehouseIdSuccess(
          response?.data,
        ),
      )

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getErrorReportByStageQcValueOrderIdProductIdWarehouseIdFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get error-report
 */
export default function* watchGetErrorReportByStageQcValueOrderIdProductIdWarehouseId() {
  yield takeLatest(
    GET_ERROR_REPORT_BY_STAGE_QC_VALUE_ORDER_ID_PRODUCT_ID_AND_WAREHOUSE_ID_START,
    doGetErrorReportByStageQcValueOrderIdProductIdWarehouseId,
  )
}
