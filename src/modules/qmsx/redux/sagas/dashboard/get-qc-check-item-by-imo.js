import { call, put, takeLatest } from 'redux-saga/effects'

import {
  GET_QC_CHECK_ITEM_BY_IMO_START,
  getQcCheckItemByImoFail,
  getQcCheckItemByImoSuccess,
} from '~/modules/qmsx/redux/actions/dashboard'
import { api } from '~/services/api'

/**
 * Get QC check item by Imo API
 * @returns {Promise}
 */
const getQcCheckItemByImoApi = (params) => {
  const uri = `/v1/quality-controls/alerts/env-qc-check-item-by-imo/${params.imoId}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetQcCheckItemByImo(action) {
  try {
    const response = yield call(getQcCheckItemByImoApi, action?.payload)

    if (response?.statusCode === 200) {
      const responseData = response?.data

      yield put(getQcCheckItemByImoSuccess(responseData))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(responseData)
      }
    }
  } catch (error) {
    yield put(getQcCheckItemByImoFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get QC check item by Imo
 */
export default function* watchGetQcCheckItemByImo() {
  yield takeLatest(GET_QC_CHECK_ITEM_BY_IMO_START, doGetQcCheckItemByImo)
}
