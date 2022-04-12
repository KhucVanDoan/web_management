import {call, put, takeLatest} from 'redux-saga/effects'

import {PRODUCTION_INPUT_TYPE} from '~/modules/qmsx/constants'
import {
  SEARCH_PROD_INPUT_PRODUCT_PREV_QUALITY_REPORT_START,
  searchProdInputProductPrevQualityReportFail,
  searchProdInputProductPrevQualityReportSuccess,
} from '~/modules/qmsx/redux/actions/quality-report'
import {api} from '~/services/api'

/**
 * Search production input product previous quality report API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchProdInputProductPrevQualityReportApi = (params) => {
  const uri = `/v1/quality-controls/reports/list-qc-produce-input`
  return api.get(uri, {
    ...params,
    type: PRODUCTION_INPUT_TYPE.PRODUCT_PREVIOUS,
  })
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchProdInputProductPrevQualityReport(action) {
  try {
    const response = yield call(
      searchProdInputProductPrevQualityReportApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      const payload = {
        list: response?.data?.items,
        total: response?.data?.meta?.total,
      }

      yield put(searchProdInputProductPrevQualityReportSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(payload)
      }
    }
  } catch (error) {
    yield put(searchProdInputProductPrevQualityReportFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search production input (product of previous stage) quality report
 */
export default function* watchSearchProdInputProductPrevQualityReport() {
  yield takeLatest(
    SEARCH_PROD_INPUT_PRODUCT_PREV_QUALITY_REPORT_START,
    doSearchProdInputProductPrevQualityReport,
  )
}
