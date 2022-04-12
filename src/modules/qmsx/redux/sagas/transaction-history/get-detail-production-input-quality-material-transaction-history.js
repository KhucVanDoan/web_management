import { call, put, takeLatest } from 'redux-saga/effects'

import {
  GET_DETAIL_PRODUCTION_INPUT_QUALITY_MATERIAL_TRANSACTION_HISTORY_START,
  getDetailProductionInputQualityMaterialTransactionHistoryFail,
  getDetailProductionInputQualityMaterialTransactionHistorySuccess,
} from '~/modules/qmsx/redux/actions/transaction-history'
import { api } from '~/services/api'

/**
 * Get detail production input quality (material) transaction history API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getDetailProductionInputQualityMaterialTransactionHistoryApi = (
  params,
) => {
  const uri = `/v1/quality-controls/producing-steps/transaction-histories/${params.id}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetDetailProductionInputQualityMaterialTransactionHistory(action) {
  try {
    const response = yield call(
      getDetailProductionInputQualityMaterialTransactionHistoryApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(
        getDetailProductionInputQualityMaterialTransactionHistorySuccess(
          response?.data,
        ),
      )

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    }
  } catch (error) {
    yield put(getDetailProductionInputQualityMaterialTransactionHistoryFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get detail production input quality (material) transaction history
 */
export default function* watchGetDetailProductionInputQualityMaterialTransactionHistory() {
  yield takeLatest(
    GET_DETAIL_PRODUCTION_INPUT_QUALITY_MATERIAL_TRANSACTION_HISTORY_START,
    doGetDetailProductionInputQualityMaterialTransactionHistory,
  )
}
