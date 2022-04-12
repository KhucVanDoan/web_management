import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchProductionOutputQualityTransactionHistoryFail,
  searchProductionOutputQualityTransactionHistorySuccess,
  SEARCH_PRODUCTION_OUTPUT_QUALITY_TRANSACTION_HISTORY_START,
} from '~/modules/qmsx/redux/actions/transaction-history'
import { api } from '~/services/api'

/**
 * Search production output quality transaction history API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchProductionOutputQualityTransactionHistoryApi = (params) => {
  const uri = `/v1/quality-controls/producing-steps/transaction-histories/output/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchProductionOutputQualityTransactionHistory(action) {
  try {
    const response = yield call(searchProductionOutputQualityTransactionHistoryApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response?.data?.items,
        total: response?.data?.meta?.total,
      }

      yield put(searchProductionOutputQualityTransactionHistorySuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    }
  } catch (error) {
    yield put(searchProductionOutputQualityTransactionHistoryFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search production output transaction history
 */
export default function* watchSearchProductionOutputQualityTransactionHistory() {
  yield takeLatest(SEARCH_PRODUCTION_OUTPUT_QUALITY_TRANSACTION_HISTORY_START, doSearchProductionOutputQualityTransactionHistory)
}
