import { call, put, takeLatest } from 'redux-saga/effects'

import {
  GET_QC_CHECK_ITEM_BY_SO_START,
  getQcCheckItemBySoFail,
  getQcCheckItemBySoSuccess,
} from '~/modules/qmsx/redux/actions/dashboard'
import { api } from '~/services/api'

/**
 * Get QC check item by SO API
 * @returns {Promise}
 */
const getQcCheckItemBySoApi = (params) => {
  const uri = `/v1/quality-controls/alerts/env-qc-check-item-by-so/${params.soId}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetQcCheckItemBySo(action) {
  try {
    const response = yield call(getQcCheckItemBySoApi, action?.payload)

    if (response?.statusCode === 200) {
      const responseData = response?.data

      yield put(getQcCheckItemBySoSuccess(responseData))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(responseData)
      }
    }
  } catch (error) {
    yield put(getQcCheckItemBySoFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get QC check item by SO
 */
export default function* watchGetQcCheckItemBySo() {
  yield takeLatest(GET_QC_CHECK_ITEM_BY_SO_START, doGetQcCheckItemBySo)
}
