import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getPriceReportSuccess,
  getPriceReportFailed,
  GET_PRICE_REPORT,
} from '~/modules/mesx/redux/actions/price-report'
import { api } from '~/services/api'

/**
 * get price detail
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getPriceReportApi = (params) => {
  const uri = `/v1/produces/manufacturing-orders/price-report`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetPriceReport(action) {
  try {
    const response = yield call(getPriceReportApi, action?.payload)
    if (response?.data) {
      yield put(getPriceReportSuccess(response.data))
      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getPriceReportFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get price detail
 */
export default function* watchGetPriceReport() {
  yield takeLatest(GET_PRICE_REPORT, doGetPriceReport)
}
