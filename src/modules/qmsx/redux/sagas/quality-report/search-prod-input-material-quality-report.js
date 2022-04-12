import {call, put, takeLatest} from 'redux-saga/effects'

import {PRODUCTION_INPUT_TYPE} from '~/modules/qmsx/constants'
import {
  SEARCH_PROD_INPUT_MATERIAL_QUALITY_REPORT_START,
  searchProdInputMaterialQualityReportFail,
  searchProdInputMaterialQualityReportSuccess,
} from '~/modules/qmsx/redux/actions/quality-report'
import {api} from '~/services/api'

/**
 * Search production input material report API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchProdInputMaterialQualityReportApi = (params) => {
  const uri = `/v1/quality-controls/reports/list-qc-produce-input`
  return api.get(uri, {
    ...params,
    type: PRODUCTION_INPUT_TYPE.MATERIAL,
  })
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchProdInputMaterialQualityReport(action) {
  try {
    const response = yield call(
      searchProdInputMaterialQualityReportApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      const payload = {
        list: response?.data?.items,
        total: response?.data?.meta?.total,
      }

      yield put(searchProdInputMaterialQualityReportSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(payload)
      }
    }
  } catch (error) {
    yield put(searchProdInputMaterialQualityReportFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search production input material quality report
 */
export default function* watchSearchProdInputMaterialQualityReport() {
  yield takeLatest(
    SEARCH_PROD_INPUT_MATERIAL_QUALITY_REPORT_START,
    doSearchProdInputMaterialQualityReport,
  )
}
