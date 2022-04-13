import { call, put, takeLatest } from 'redux-saga/effects'

import {
  GET_DETAIL_PRODUCTION_OUTPUT_QUALITY_TRANSACTION_HISTORY_START,
  getDetailProductionOutputQualityTransactionHistoryFail,
  getDetailProductionOutputQualityTransactionHistorySuccess,
} from '~/modules/qmsx/redux/actions/transaction-history'
import { api } from '~/services/api'

/**
 * Get detail production output quality transaction history API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getDetailProductionOutputQualityTransactionHistoryApi = (
  params,
) => {
  const uri = `/v1/quality-controls/producing-steps/transaction-histories/${params.id}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetDetailProductionOutputQualityTransactionHistory(action) {
  try {
    const response = yield call(
      getDetailProductionOutputQualityTransactionHistoryApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(
        getDetailProductionOutputQualityTransactionHistorySuccess(
          response?.data,
        ),
      )

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    }
  } catch (error) {
    yield put(getDetailProductionOutputQualityTransactionHistoryFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get detail production output quality transaction history
 */
export default function* watchGetDetailProductionOutputQualityTransactionHistory() {
  yield takeLatest(
    GET_DETAIL_PRODUCTION_OUTPUT_QUALITY_TRANSACTION_HISTORY_START,
    doGetDetailProductionOutputQualityTransactionHistory,
  )
}
