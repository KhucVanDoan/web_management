import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchQualityPointFail,
  searchQualityPointSuccess,
  SEARCH_QUALITY_POINT_START,
} from '~/modules/qmsx/redux/actions/define-quality-point'
import { api } from '~/services/api'

/**
 * Search quality-point API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchQualityPoint = (params) => {
  const uri = `/v1/quality-controls/quality-points/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchQualityPoint(action) {
  try {
    const response = yield call(searchQualityPoint, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response?.data?.items,
        total: response?.data?.meta?.total,
      }
      // Call callback action if provided
      yield put(searchQualityPointSuccess(payload))
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchQualityPointFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search quality-point
 */
export default function* watchSearchQualityPoint() {
  yield takeLatest(SEARCH_QUALITY_POINT_START, doSearchQualityPoint)
}
