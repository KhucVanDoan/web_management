import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getDetailOutputQualityTransactionHistoryFail,
  getDetailOutputQualityTransactionHistorySuccess,
  GET_DETAIL_OUTPUT_QUALITY_TRANSACTION_HISTORY_START,
} from '~/modules/qmsx/redux/actions/transaction-history'
import { api } from '~/services/api'

/**
 * Get detail output transaction history API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getDetailOutputQualityTransactionHistoryApi = (params) => {
  const uri = `/v1/quality-controls/qc-output/web/transaction-history/${params.id}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetDetailOutputQualityTransactionHistory(action) {
  try {
    const response = yield call(getDetailOutputQualityTransactionHistoryApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getDetailOutputQualityTransactionHistorySuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    }
  } catch (error) {
    yield put(getDetailOutputQualityTransactionHistoryFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get detail output transaction history
 */
export default function* watchGetDetailOutputQualityTransactionHistory() {
  yield takeLatest(GET_DETAIL_OUTPUT_QUALITY_TRANSACTION_HISTORY_START, doGetDetailOutputQualityTransactionHistory)
}
