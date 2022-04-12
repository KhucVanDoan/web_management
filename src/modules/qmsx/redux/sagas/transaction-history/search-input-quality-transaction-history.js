import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchInputQualityTransactionHistoryFail,
  searchInputQualityTransactionHistorySuccess,
  SEARCH_INPUT_QUALITY_TRANSACTION_HISTORY_START,
} from '~/modules/qmsx/redux/actions/transaction-history'
import { api } from '~/services/api'

/**
 * Search input transaction history API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchInputQualityTransactionHistoryApi = (params) => {
  const uri = `/v1/quality-controls/qc-input/web/transaction-histories/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchInputQualityTransactionHistory(action) {
  try {
    const response = yield call(searchInputQualityTransactionHistoryApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response?.data?.items,
        total: response?.data?.meta?.total,
      }

      yield put(searchInputQualityTransactionHistorySuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    }
  } catch (error) {
    yield put(searchInputQualityTransactionHistoryFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search input transaction history
 */
export default function* watchSearchInputQualityTransactionHistory() {
  yield takeLatest(SEARCH_INPUT_QUALITY_TRANSACTION_HISTORY_START, doSearchInputQualityTransactionHistory)
}
