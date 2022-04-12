import {call, put, takeLatest} from 'redux-saga/effects'

import {PRODUCTION_INPUT_TYPE} from '~/modules/qmsx/constants'
import {
  SEARCH_PRODUCTION_INPUT_QUALITY_PRODUCT_PREVIOUS_TRANSACTION_HISTORY_START,
  searchProductionInputQualityProductPreviousTransactionHistoryFail,
  searchProductionInputQualityProductPreviousTransactionHistorySuccess,
} from '~/modules/qmsx/redux/actions/transaction-history'
import {api} from '~/services/api'

/**
 * Search production input quality (product of previous step) quality transaction history API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchProductionInputQualityProductPreviousTransactionHistoryApi = (
  params,
) => {
  const uri = `/v1/quality-controls/producing-steps/transaction-histories/input/list`
  return api.get(uri, {
    ...params,
    type: PRODUCTION_INPUT_TYPE.PRODUCT_PREVIOUS,
  })
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchProductionInputQualityProductPreviousTransactionHistory(
  action,
) {
  try {
    const response = yield call(
      searchProductionInputQualityProductPreviousTransactionHistoryApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      const payload = {
        list: response?.data?.items,
        total: response?.data?.meta?.total,
      }

      yield put(
        searchProductionInputQualityProductPreviousTransactionHistorySuccess(
          payload,
        ),
      )

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    }
  } catch (error) {
    yield put(
      searchProductionInputQualityProductPreviousTransactionHistoryFail(),
    )
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search production input quality (product of previous step) transaction history
 */
export default function* watchSearchProductionInputQualityProductPreviousTransactionHistory() {
  yield takeLatest(
    SEARCH_PRODUCTION_INPUT_QUALITY_PRODUCT_PREVIOUS_TRANSACTION_HISTORY_START,
    doSearchProductionInputQualityProductPreviousTransactionHistory,
  )
}
