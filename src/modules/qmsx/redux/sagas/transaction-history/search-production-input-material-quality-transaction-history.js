import {call, put, takeLatest} from 'redux-saga/effects'

import {PRODUCTION_INPUT_TYPE} from '~/modules/qmsx/constants'
import {
  SEARCH_PRODUCTION_INPUT_QUALITY_MATERIAL_TRANSACTION_HISTORY_START,
  searchProductionInputQualityMaterialTransactionHistoryFail,
  searchProductionInputQualityMaterialTransactionHistorySuccess,
} from '~/modules/qmsx/redux/actions/transaction-history'
import {api} from '~/services/api'

/**
 * Search production input quality (material) transaction history API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchProductionInputQualityMaterialTransactionHistoryApi = (params) => {
  const uri = `/v1/quality-controls/producing-steps/transaction-histories/input/list`
  return api.get(uri, {
    ...params,
    type: PRODUCTION_INPUT_TYPE.MATERIAL,
  })
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchProductionInputQualityMaterialTransactionHistory(action) {
  try {
    const response = yield call(
      searchProductionInputQualityMaterialTransactionHistoryApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      const payload = {
        list: response?.data?.items,
        total: response?.data?.meta?.total,
      }

      yield put(
        searchProductionInputQualityMaterialTransactionHistorySuccess(payload),
      )

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    }
  } catch (error) {
    yield put(searchProductionInputQualityMaterialTransactionHistoryFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search production input quality (material) transaction history
 */
export default function* watchSearchProductionInputQualityMaterialTransactionHistory() {
  yield takeLatest(
    SEARCH_PRODUCTION_INPUT_QUALITY_MATERIAL_TRANSACTION_HISTORY_START,
    doSearchProductionInputQualityMaterialTransactionHistory,
  )
}
