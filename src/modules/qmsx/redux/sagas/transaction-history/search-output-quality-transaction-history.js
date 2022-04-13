import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchOutputQualityTransactionHistoryFail,
  searchOutputQualityTransactionHistorySuccess,
  SEARCH_OUTPUT_QUALITY_TRANSACTION_HISTORY_START,
} from '~/modules/qmsx/redux/actions/transaction-history'
import { api } from '~/services/api'

/**
 * Search output transaction history API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchOutputQualityTransactionHistoryApi = (params) => {
  const uri = `/v1/quality-controls/qc-output/web/transaction-histories/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchOutputQualityTransactionHistory(action) {
  try {
    const response = yield call(searchOutputQualityTransactionHistoryApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response?.data?.items,
        total: response?.data?.meta?.total,
      }

      yield put(searchOutputQualityTransactionHistorySuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    }
  } catch (error) {
    yield put(searchOutputQualityTransactionHistoryFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search output transaction history
 */
export default function* watchSearchOutputQualityTransactionHistory() {
  yield takeLatest(SEARCH_OUTPUT_QUALITY_TRANSACTION_HISTORY_START, doSearchOutputQualityTransactionHistory)
}
