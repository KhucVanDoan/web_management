import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getProductsByStageQCFailed,
  getProductsByStageQCSuccess,
  GET_PRODUCTS_BY_STAGEQC_START,
} from '~/modules/qmsx/redux/actions/common'
import { api } from '~/services/api'

/**
 * get Products By StageQC API
 * @param {any} params Params will be sent to server (params is idQC)
 * @returns {Promise}
 */
const getProductsByStageQCApi = (params) => {
  const uri = `/v1/quality-controls/quality-points/env-item/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetProductsByStageQC(action) {
  try {
    const response = yield call(getProductsByStageQCApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getProductsByStageQCSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getProductsByStageQCFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get StageQC
 */
export default function* watchGetProductsByStageQC() {
  yield takeLatest(GET_PRODUCTS_BY_STAGEQC_START, doGetProductsByStageQC)
}
