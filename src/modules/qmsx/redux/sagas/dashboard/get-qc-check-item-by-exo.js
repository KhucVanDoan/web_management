import { call, put, takeLatest } from 'redux-saga/effects'

import {
  GET_QC_CHECK_ITEM_BY_EXO_START,
  getQcCheckItemByExoFail,
  getQcCheckItemByExoSuccess,
} from '~/modules/qmsx/redux/actions/dashboard'
import { api } from '~/services/api'

/**
 * Get QC check item by Exo API
 * @returns {Promise}
 */
const getQcCheckItemByExoApi = (params) => {
  const uri = `/v1/quality-controls/alerts/env-qc-check-item-by-exo/${params.exoId}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetQcCheckItemByExo(action) {
  try {
    const response = yield call(getQcCheckItemByExoApi, action?.payload)

    if (response?.statusCode === 200) {
      const responseData = response?.data

      yield put(getQcCheckItemByExoSuccess(responseData))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(responseData)
      }
    }
  } catch (error) {
    yield put(getQcCheckItemByExoFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get QC check item by Exo
 */
export default function* watchGetQcCheckItemByExo() {
  yield takeLatest(GET_QC_CHECK_ITEM_BY_EXO_START, doGetQcCheckItemByExo)
}
