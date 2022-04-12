import { call, put, takeLatest } from 'redux-saga/effects'

import {
  GET_QC_CHECK_ITEM_BY_PRO_START,
  getQcCheckItemByProFail,
  getQcCheckItemByProSuccess,
} from '~/modules/qmsx/redux/actions/dashboard'
import { api } from '~/services/api'

/**
 * Get QC check item by PRO API
 * @returns {Promise}
 */
const getQcCheckItemByProApi = (params) => {
  const uri = `/v1/quality-controls/alerts/env-qc-check-item-by-pro/${params.proId}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetQcCheckItemByPro(action) {
  try {
    const response = yield call(getQcCheckItemByProApi, action?.payload)

    if (response?.statusCode === 200) {
      const responseData = response?.data

      yield put(getQcCheckItemByProSuccess(responseData))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(responseData)
      }
    }
  } catch (error) {
    yield put(getQcCheckItemByProFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get QC check item by PRO
 */
export default function* watchGetQcCheckItemByPro() {
  yield takeLatest(GET_QC_CHECK_ITEM_BY_PRO_START, doGetQcCheckItemByPro)
}
