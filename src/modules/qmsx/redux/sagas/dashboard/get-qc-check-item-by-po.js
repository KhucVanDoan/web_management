import { call, put, takeLatest } from 'redux-saga/effects'

import {
  GET_QC_CHECK_ITEM_BY_PO_START,
  getQcCheckItemByPoFail,
  getQcCheckItemByPoSuccess,
} from '~/modules/qmsx/redux/actions/dashboard'
import { api } from '~/services/api'

/**
 * Get QC check item by PO API
 * @returns {Promise}
 */
const getQcCheckItemByPoApi = (params) => {
  const uri = `/v1/quality-controls/alerts/env-qc-check-item-by-po/${params.poId}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetQcCheckItemByPo(action) {
  try {
    const response = yield call(getQcCheckItemByPoApi, action?.payload)

    if (response?.statusCode === 200) {
      const responseData = response?.data

      yield put(getQcCheckItemByPoSuccess(responseData))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(responseData)
      }
    }
  } catch (error) {
    yield put(getQcCheckItemByPoFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get QC check item by PO
 */
export default function* watchGetQcCheckItemByPo() {
  yield takeLatest(GET_QC_CHECK_ITEM_BY_PO_START, doGetQcCheckItemByPo)
}
