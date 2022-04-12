import { call, put, takeLatest } from 'redux-saga/effects'

import {
  GET_DETAIL_PRODUCTION_INPUT_QUALITY_PRODUCT_PREVIOUS_TRANSACTION_HISTORY_START,
  getDetailProductionInputQualityProductPreviousTransactionHistoryFail,
  getDetailProductionInputQualityProductPreviousTransactionHistorySuccess,
} from '~/modules/qmsx/redux/actions/transaction-history'
import { api } from '~/services/api'

/**
 * Get detail production input quality (product of previous step) transaction history API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getDetailProductionInputQualityProductPreviousTransactionHistoryApi = (
  params,
) => {
  const uri = `/v1/quality-controls/producing-steps/transaction-histories/${params.id}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetDetailProductionInputQualityProductPreviousTransactionHistory(action) {
  try {
    const response = yield call(
      getDetailProductionInputQualityProductPreviousTransactionHistoryApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(
        getDetailProductionInputQualityProductPreviousTransactionHistorySuccess(
          response?.data,
        ),
      )

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    }
  } catch (error) {
    yield put(getDetailProductionInputQualityProductPreviousTransactionHistoryFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get detail production input quality (product of previous step) transaction history
 */
export default function* watchGetDetailProductionInputQualityProductPreviousTransactionHistory() {
  yield takeLatest(
    GET_DETAIL_PRODUCTION_INPUT_QUALITY_PRODUCT_PREVIOUS_TRANSACTION_HISTORY_START,
    doGetDetailProductionInputQualityProductPreviousTransactionHistory,
  )
}
