import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getDetailInputQualityTransactionHistoryFail,
  getDetailInputQualityTransactionHistorySuccess,
  GET_DETAIL_INPUT_QUALITY_TRANSACTION_HISTORY_START,
} from '~/modules/qmsx/redux/actions/transaction-history'
import { api } from '~/services/api'

/**
 * Get detail input transaction history API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getDetailInputQualityTransactionHistoryApi = (params) => {
  const uri = `/v1/quality-controls/qc-input/web/transaction-history/${params.id}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetDetailInputQualityTransactionHistory(action) {
  try {
    const response = yield call(getDetailInputQualityTransactionHistoryApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getDetailInputQualityTransactionHistorySuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    }
  } catch (error) {
    yield put(getDetailInputQualityTransactionHistoryFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get detail input transaction history
 */
export default function* watchGetDetailInputQualityTransactionHistory() {
  yield takeLatest(GET_DETAIL_INPUT_QUALITY_TRANSACTION_HISTORY_START, doGetDetailInputQualityTransactionHistory)
}
